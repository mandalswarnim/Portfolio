import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

// Site-wide switch: false makes /blog 404 and drops the sitemap entries (also
// remove the "Blog" links in components/Header.tsx and components/Footer.tsx).
export const BLOG_ENABLED = true;

// Posts live as markdown files in content/blog/. The filename is the slug.
// Frontmatter carries title, date, excerpt, category and an optional cover
// image (`cover` path under public/, `coverAlt`) for the index card; readTime is derived
// from the body. Server-side only — this module touches the filesystem, so it
// must never be imported into a "use client" component.
const POSTS_DIR = path.join(process.cwd(), "content", "blog");

const WORDS_PER_MINUTE = 200;

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  cover?: string;
  coverAlt?: string;
}

/**
 * Rewrite Obsidian-flavoured links into plain markdown so notes authored in a
 * vault render correctly on the site:
 *   [[some-post]]          -> [some-post](/blog/some-post)
 *   [[some-post|Label]]    -> [Label](/blog/some-post)
 *   ![[diagram.png]]       -> ![](/blog/diagram.png)   (served from public/blog/)
 * Fenced code blocks are left untouched.
 */
function convertWikilinks(markdown: string): string {
  return markdown
    .split(/(```[\s\S]*?```)/g)
    .map((chunk, i) => {
      if (i % 2 === 1) return chunk; // odd chunks are fenced code
      return chunk
        .replace(/!\[\[([^\]|]+?)\]\]/g, (_, target) => `![](/blog/${target.trim()})`)
        .replace(/\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g, (_, target, label) => {
          const slug = target.trim();
          return `[${(label ?? slug).trim()}](/blog/${slug})`;
        });
    })
    .join("");
}

function estimateReadTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min read`;
}

function readPost(filename: string): BlogPost {
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.md$/, "");

  // Dates written unquoted in YAML come back as Date objects; normalise to
  // the ISO day string the templates and sitemap expect.
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");

  return {
    slug,
    title: String(data.title ?? slug),
    date,
    excerpt: String(data.excerpt ?? ""),
    content,
    category: String(data.category ?? "Uncategorised"),
    readTime: estimateReadTime(content),
    ...(data.cover && { cover: String(data.cover), coverAlt: String(data.coverAlt ?? "") }),
  };
}

let cache: BlogPost[] | null = null;

function loadPosts(): BlogPost[] {
  if (cache) return cache;
  if (!fs.existsSync(POSTS_DIR)) {
    cache = [];
    return cache;
  }
  cache = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return cache;
}

export function getAllPosts(): BlogPost[] {
  return loadPosts();
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return loadPosts().find((post) => post.slug === slug);
}

export function getCategories(): string[] {
  return Array.from(new Set(loadPosts().map((post) => post.category)));
}

/**
 * Markdown body -> HTML string, ready for dangerouslySetInnerHTML.
 * Sanitised (GitHub schema): raw HTML such as <script> or on* handlers is stripped,
 * since the CSP allows inline scripts.
 */
export function renderMarkdown(markdown: string): string {
  return remark().use(remarkGfm).use(remarkHtml, { sanitize: true }).processSync(convertWikilinks(markdown)).toString();
}

export type PostBlock =
  | { kind: "html"; html: string }
  | { kind: "youtube"; id: string; title: string; poster: string; start?: number; end?: number };

const EMBED_LINE = /^::youtube\{([^}]*)\}[ \t]*$/gm;

function parseAttrs(attrs: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of attrs.matchAll(/(\w+)=(?:"([^"]*)"|(\S+))/g)) out[m[1]] = m[2] ?? m[3];
  return out;
}

/**
 * Split a post body into markdown HTML and embeds. A line of the form
 *   ::youtube{id=VIDEO_ID start=6764 end=6972 poster=/blog/slug/poster.jpg title="Caption"}
 * becomes a click-to-load YouTube clip (components/blog/YouTubeEmbed.tsx).
 * Fenced code blocks are left untouched.
 */
export function renderPost(markdown: string): PostBlock[] {
  const blocks: PostBlock[] = [];
  let buffer = "";
  const flush = () => {
    if (buffer.trim()) blocks.push({ kind: "html", html: renderMarkdown(buffer) });
    buffer = "";
  };
  markdown.split(/(```[\s\S]*?```)/g).forEach((chunk, i) => {
    if (i % 2 === 1) {
      buffer += chunk;
      return;
    }
    let last = 0;
    for (const m of chunk.matchAll(EMBED_LINE)) {
      buffer += chunk.slice(last, m.index);
      last = m.index! + m[0].length;
      const a = parseAttrs(m[1]);
      if (!a.id || !a.poster) {
        buffer += m[0];
        continue;
      }
      flush();
      blocks.push({
        kind: "youtube",
        id: a.id,
        title: a.title ?? "",
        poster: a.poster,
        ...(a.start && { start: Number(a.start) }),
        ...(a.end && { end: Number(a.end) }),
      });
    }
    buffer += chunk.slice(last);
  });
  flush();
  return blocks;
}

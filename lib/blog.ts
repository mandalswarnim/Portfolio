import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

// Blog is hidden site-wide until real essays are ready — flip to true to
// restore /blog routes and sitemap entries, then re-add the "Blog" links in
// components/Header.tsx and components/Footer.tsx.
export const BLOG_ENABLED = false;

// Posts live as markdown files in content/blog/. The filename is the slug.
// Frontmatter carries title, date, excerpt and category; readTime is derived
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

/** Markdown body -> HTML string, ready for dangerouslySetInnerHTML. */
export function renderMarkdown(markdown: string): string {
  return remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .processSync(convertWikilinks(markdown))
    .toString();
}

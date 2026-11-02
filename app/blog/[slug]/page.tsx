import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_ENABLED, getPostBySlug, getAllPosts, renderMarkdown } from "@/lib/blog";
import FadeIn from "@/components/animations/FadeIn";

export async function generateStaticParams() {
  if (!BLOG_ENABLED) return [];
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_ENABLED ? getPostBySlug(slug) : undefined;
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Swarnim Mandal`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_ENABLED ? getPostBySlug(slug) : undefined;
  if (!post) notFound();

  return (
    <div className="min-h-screen">
      <article className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back link */}
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-12"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </FadeIn>

          {/* Meta */}
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">{post.category}</span>
              <span className="text-subtle text-xs">·</span>
              <span className="text-xs text-subtle">{post.readTime}</span>
              <span className="text-subtle text-xs">·</span>
              <time className="text-xs text-subtle font-mono">
                {new Date(post.date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </FadeIn>

          {/* Title */}
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-[1.1] mb-12">
              {post.title}
            </h1>
          </FadeIn>

          {/* Content */}
          <FadeIn delay={0.15}>
            <div
              className="prose prose-stone max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />
          </FadeIn>
        </div>
      </article>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="py-20 border-t border-divider bg-surface">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-1">Enjoyed this?</h2>
                <p className="text-muted text-sm">Reach out if you have questions or want to discuss further.</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center bg-foreground text-background text-sm font-medium px-6 py-3 rounded-full hover:bg-foreground/80 transition-colors whitespace-nowrap"
              >
                Get in touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

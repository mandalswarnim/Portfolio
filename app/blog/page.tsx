import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_ENABLED, getAllPosts, getCategories } from "@/lib/blog";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Blog — Swarnim Mandal",
  description: "Articles on web development, machine learning, and software engineering.",
};

export default function Blog() {
  if (!BLOG_ENABLED) notFound();

  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="py-24 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-6">Blog</p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6">Writing</h1>
            <p className="text-lg text-muted max-w-xl leading-relaxed">
              Thoughts on software engineering, machine learning, and building things that matter.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Category pills ───────────────────────────────── */}
      {categories.length > 0 && (
        <section className="py-6 border-b border-divider bg-surface">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-wrap gap-2">
              <button className="text-xs font-medium bg-foreground text-background px-4 py-1.5 rounded-full">
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="text-xs font-medium border border-divider text-muted px-4 py-1.5 rounded-full hover:border-foreground/30 hover:text-foreground transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Posts ────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          {posts.length === 0 ? (
            <FadeIn>
              <div className="text-center py-20">
                <p className="text-muted text-lg mb-2">No posts yet.</p>
                <p className="text-subtle text-sm">Check back soon.</p>
              </div>
            </FadeIn>
          ) : (
            <div className="divide-y divide-divider border-t border-divider">
              {posts.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 0.05}>
                  <article className="py-8 group">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                              {post.category}
                            </span>
                            <span className="text-subtle text-xs">·</span>
                            <span className="text-xs text-subtle">{post.readTime}</span>
                          </div>
                          <h2 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
                            {post.title}
                          </h2>
                          <p className="text-sm text-muted leading-relaxed line-clamp-2 max-w-2xl">{post.excerpt}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <time className="text-xs text-subtle font-mono">
                            {new Date(post.date).toLocaleDateString("en-GB", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                          <p className="text-sm text-primary mt-2 group-hover:underline underline-offset-4">Read →</p>
                        </div>
                      </div>
                    </Link>
                  </article>
                </FadeIn>
              ))}
            </div>
          )}
          {posts.length > 0 && <div className="border-t border-divider" />}
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_ENABLED, getAllPosts } from "@/lib/blog";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import Chapters from "@/components/home/Chapters";
import { arrow, cardLift, CREAM, CtaBand, display, PageHero } from "@/components/PageSections";

export const metadata: Metadata = {
  title: "Blog",
  description: "Build logs and stories from Swarnim Mandal: hack nights, side projects and what I learned making them.",
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });

export default function Blog() {
  if (!BLOG_ENABLED) notFound();

  const posts = getAllPosts();

  return (
    <Chapters initial={CREAM}>
      <PageHero
        eyebrow={`Blog · ${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
        lines={["Notes from", "the build"]}
        lead="Stories from hack nights and side projects: what I made, what broke, and what I learned along the way."
      />

      <section data-bg={CREAM} className="pb-28">
        <div className="mx-auto max-w-6xl px-6">
          {posts.length === 0 ? (
            <FadeIn>
              <p className="py-20 text-center text-lg text-muted">No posts yet. Check back soon.</p>
            </FadeIn>
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2">
              {posts.map((post, i) => (
                <StaggerItem key={post.slug} className="h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className={`group flex h-full flex-col overflow-hidden border border-charcoal/10 bg-white ${cardLift}`}
                  >
                    {post.cover && (
                      <div className="relative aspect-[16/10] overflow-hidden border-b border-charcoal/10">
                        <Image
                          src={post.cover}
                          alt={post.coverAlt ?? ""}
                          fill
                          priority={i === 0}
                          sizes="(min-width: 768px) 560px, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-8">
                      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                        {post.category} · {formatDate(post.date)} · {post.readTime}
                      </p>
                      <h2 className={`mb-4 ${display} text-2xl text-charcoal md:text-3xl`}>{post.title}</h2>
                      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal">
                        Read the story {arrow}
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      <CtaBand
        lines={["Building", "something?"]}
        text="I like hack nights, odd sensors and shipping things in an evening. Say hello."
      />
    </Chapters>
  );
}

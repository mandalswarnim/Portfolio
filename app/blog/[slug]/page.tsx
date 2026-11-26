import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_ENABLED, getPostBySlug, getAllPosts, renderPost } from "@/lib/blog";
import YouTubeEmbed from "@/components/blog/YouTubeEmbed";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import Chapters from "@/components/home/Chapters";
import { CREAM, CtaBand, display, Eyebrow } from "@/components/PageSections";

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
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      ...(post.cover && { images: [{ url: post.cover, alt: post.coverAlt }] }),
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_ENABLED ? getPostBySlug(slug) : undefined;
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

  return (
    <Chapters initial={CREAM}>
      <article data-bg={CREAM} className="pb-28 pt-12 md:pt-16">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <Link
              href="/blog"
              className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-charcoal"
            >
              ← All posts
            </Link>
            <Eyebrow>
              {post.category} · <time dateTime={post.date}>{date}</time> · {post.readTime}
            </Eyebrow>
          </FadeIn>

          <TextReveal
            delay={0.1}
            lines={[post.title]}
            className={`mb-8 ${display} text-3xl text-charcoal sm:text-5xl md:text-6xl`}
          />
          <FadeIn delay={0.15}>
            <p className="mb-14 text-lg leading-relaxed text-muted">{post.excerpt}</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="prose prose-stone max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-normal prose-h2:mt-14 prose-h2:text-2xl md:prose-h2:text-3xl prose-img:mx-auto prose-img:max-h-[80vh] prose-img:w-auto prose-img:rounded-2xl prose-img:border prose-img:border-charcoal/10 prose-img:shadow-[0_24px_48px_-28px_rgba(30,30,30,0.45)]">
              {renderPost(post.content).map((block, i) =>
                block.kind === "html" ? (
                  <div key={i} dangerouslySetInnerHTML={{ __html: block.html }} />
                ) : (
                  <YouTubeEmbed key={i} {...block} />
                ),
              )}
            </div>
          </FadeIn>
        </div>
      </article>

      <CtaBand
        lines={["Enjoyed", "this?"]}
        text="Questions, ideas or a hack night I should know about? Get in touch."
      />
    </Chapters>
  );
}

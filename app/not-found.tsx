import type { Metadata } from "next";
import Link from "next/link";
import { btnDark, btnOutlineDark, display, Eyebrow } from "@/components/PageSections";

// No canonical: a missing page must not point search engines at a real URL.
export const metadata: Metadata = { title: "Page not found", alternates: { canonical: null } };

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Eyebrow>404</Eyebrow>
        <h1 className={`mb-8 ${display} text-4xl text-charcoal sm:text-6xl md:text-7xl`}>Page not found</h1>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className={btnDark}>
            Back to home
          </Link>
          <Link href="/work" className={btnOutlineDark}>
            See my work
          </Link>
        </div>
      </div>
    </section>
  );
}

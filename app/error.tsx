"use client";

import Link from "next/link";
import { btnDark, btnOutlineDark, display, Eyebrow } from "@/components/PageSections";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Eyebrow>Error</Eyebrow>
        <h1 className={`mb-8 ${display} text-4xl text-charcoal sm:text-6xl md:text-7xl`}>Something went wrong</h1>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted">
          This page hit an unexpected error. Try again, or head back to the homepage.
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={reset} className={btnDark}>
            Try again
          </button>
          <Link href="/" className={btnOutlineDark}>
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}

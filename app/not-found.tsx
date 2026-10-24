import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-sm font-medium text-primary uppercase tracking-widest mb-6">404</p>
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6">
          Page not found
        </h1>
        <p className="text-lg text-muted max-w-xl leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center bg-foreground text-background text-sm font-medium px-6 py-3 rounded-full hover:bg-foreground/80 transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center border border-divider text-foreground text-sm font-medium px-6 py-3 rounded-full hover:border-foreground/40 transition-colors"
          >
            See my work
          </Link>
        </div>
      </div>
    </section>
  );
}

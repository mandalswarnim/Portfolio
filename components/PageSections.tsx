import Link from "next/link";
import type { ReactNode } from "react";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";

export const btnPrimary =
  "inline-flex items-center bg-foreground text-background text-sm font-medium px-6 py-3 rounded-full hover:bg-foreground/80 transition-colors";

/** Inner-page intro: eyebrow label, masked headline, lead paragraph, optional extras. */
export function PageHero({
  eyebrow,
  lines,
  lead,
  leadWidth = "max-w-2xl",
  children,
}: {
  eyebrow: string;
  lines: ReactNode[];
  lead: ReactNode;
  leadWidth?: string;
  children?: ReactNode;
}) {
  return (
    <section className="py-24 border-b border-divider">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-6">{eyebrow}</p>
          <TextReveal
            lines={lines}
            className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6"
          />
          <p className={`text-lg text-muted ${leadWidth} leading-relaxed`}>{lead}</p>
          {children}
        </FadeIn>
      </div>
    </section>
  );
}

/** Closing call-to-action strip: heading + line on the left, "Get in touch" (plus extras) on the right. */
export function CtaBand({ title, text, children }: { title: ReactNode; text: ReactNode; children?: ReactNode }) {
  const contact = (
    <Link href="/contact" className={`${btnPrimary} whitespace-nowrap`}>
      Get in touch
    </Link>
  );
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">{title}</h2>
              <p className="text-muted">{text}</p>
            </div>
            {children ? (
              <div className="flex flex-wrap gap-3">
                {contact}
                {children}
              </div>
            ) : (
              contact
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

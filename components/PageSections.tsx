import Link from "next/link";
import type { ReactNode } from "react";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import Reveal from "@/components/home/Reveal";

/**
 * The homepage design language, shared by every page: colour-chapter
 * backgrounds (pair with <Chapters> + `data-bg`), Archivo Black uppercase
 * headlines, mono eyebrows and pill buttons.
 */

export const CREAM = "#FAF8F4";
export const CHARCOAL = "#1E1E1E";
export const BLUE = "#2D5FA3";
export const LIME = "#C9F27A";

const btn =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0";
export const btnAccent = `group ${btn} bg-accent text-charcoal hover:shadow-[0_10px_24px_-8px_rgba(201,242,122,0.8)]`;
export const btnDark = `group ${btn} bg-charcoal text-white hover:bg-charcoal/85`;
export const btnOutlineDark = `${btn} border border-charcoal/25 text-charcoal hover:border-charcoal`;
export const btnOutlineLight = `${btn} border border-white/30 text-white hover:border-white`;
export const arrow = <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>;

/** Card colourways for a row of cards on a cream chapter (cycle by index). */
export const CARD_TONES = [
  "border border-charcoal/10 bg-white text-charcoal",
  "bg-accent text-charcoal",
  "bg-primary text-white",
  "bg-charcoal text-white",
];
/** Rounded white card that lifts on hover, as in the homepage "More work" grid. */
export const cardLift =
  "rounded-[2rem] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_48px_-24px_rgba(30,30,30,0.35)]";

export const display = "font-display uppercase leading-[0.95]";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`mb-6 font-mono text-xs uppercase tracking-[0.25em] ${light ? "text-white/60" : "text-primary"}`}>
      {children}
    </p>
  );
}

/** Inner-page intro on a cream chapter: eyebrow, masked display headline, lead, optional extras / aside. */
export function PageHero({
  eyebrow,
  lines,
  lead,
  children,
  aside,
}: {
  eyebrow: string;
  lines: ReactNode[];
  lead: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section data-bg={CREAM} className="flex min-h-[70vh] flex-col justify-center py-24">
      <div
        className={`mx-auto grid w-full max-w-6xl gap-16 px-6 ${aside ? "lg:grid-cols-[1.2fr_1fr] lg:items-center" : ""}`}
      >
        <div>
          <FadeIn>
            <Eyebrow>{eyebrow}</Eyebrow>
          </FadeIn>
          <TextReveal
            delay={0.1}
            lines={lines}
            className={`mb-8 ${display} text-4xl text-charcoal sm:text-6xl md:text-7xl xl:text-8xl`}
          />
          <FadeIn delay={0.2}>
            <p className="max-w-xl text-lg leading-relaxed text-muted">{lead}</p>
            {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
          </FadeIn>
        </div>
        {aside && (
          <FadeIn delay={0.25} direction="left">
            {aside}
          </FadeIn>
        )}
      </div>
    </section>
  );
}

/** Section title block: optional eyebrow, scroll-revealed display heading, optional lead. */
export function SectionHead({
  eyebrow,
  lines,
  lead,
  light = false,
  className = "mb-14",
}: {
  eyebrow?: string;
  lines: ReactNode[];
  lead?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <FadeIn>
          <Eyebrow light={light}>{eyebrow}</Eyebrow>
        </FadeIn>
      )}
      <Reveal lines={lines} className={`${display} text-4xl md:text-6xl ${light ? "text-white" : "text-charcoal"}`} />
      {lead && (
        <FadeIn delay={0.1}>
          <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${light ? "text-white/65" : "text-muted"}`}>{lead}</p>
        </FadeIn>
      )}
    </div>
  );
}

/** Closing call to action as a full charcoal chapter, like the end of the homepage. */
export function CtaBand({ lines, text, children }: { lines: ReactNode[]; text: ReactNode; children?: ReactNode }) {
  return (
    <section data-bg={CHARCOAL} className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal lines={lines} className={`mb-8 ${display} text-5xl text-white md:text-8xl`} />
        <FadeIn>
          <p className="mb-10 max-w-xl text-lg text-white/60">{text}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={btnAccent}>
              Get in touch {arrow}
            </Link>
            {children}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

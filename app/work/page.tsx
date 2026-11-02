import type { Metadata } from "next";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import Chapters from "@/components/home/Chapters";
import Reveal from "@/components/home/Reveal";
import SmartLink from "@/components/SmartLink";
import {
  arrow,
  BLUE,
  btnAccent,
  btnOutlineDark,
  btnOutlineLight,
  cardLift,
  CHARCOAL,
  CREAM,
  CtaBand,
  display,
  Eyebrow,
  PageHero,
  SectionHead,
} from "@/components/PageSections";
import { projects } from "@/lib/projects";
import { GITHUB_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work — Swarnim Mandal",
  description: "Projects and open-source work by Swarnim Mandal: voice agents, predictive models and full-stack apps.",
};

const featured = projects.filter((p) => p.screen);
const others = projects.filter((p) => !p.screen);
const featuredBg = [CHARCOAL, BLUE];

export default function Work() {
  return (
    <Chapters initial={CREAM}>
      <PageHero
        eyebrow={`Work · ${projects.length} projects`}
        lines={["What I", "build"]}
        lead={
          <>
            A selection of what I&apos;ve built, from a real-time AI voice agent to deep-learning models and the
            full-stack apps that put them in front of people.
          </>
        }
      >
        <a href="#featured" className={btnOutlineDark}>
          Featured projects ↓
        </a>
      </PageHero>

      {/* ── Featured: one colour chapter each ─────────────── */}
      <div id="featured" className="scroll-mt-20">
        {featured.map((p, i) => (
          <section key={p.title} data-bg={featuredBg[i % featuredBg.length]} className="py-28 text-white">
            <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
              <div>
                <FadeIn>
                  <Eyebrow light>
                    {String(i + 1).padStart(2, "0")} / {p.category}
                  </Eyebrow>
                </FadeIn>
                <Reveal lines={[p.title]} className={`mb-6 ${display} text-4xl md:text-5xl`} />
                <FadeIn delay={0.1}>
                  <p className="mb-5 leading-relaxed text-white/70">{p.desc}</p>
                  {p.result && (
                    <p className="mb-6 leading-relaxed">
                      <span className="font-semibold text-accent">Result:</span> {p.result}
                    </p>
                  )}
                  <div className="mb-8 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full border border-white/25 px-3 py-1 text-xs text-white/80">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {p.demo && (
                      <SmartLink href={p.demo} className={btnAccent}>
                        Try it {arrow}
                      </SmartLink>
                    )}
                    {p.link && (
                      <SmartLink href={p.link} className={btnOutlineLight}>
                        View on GitHub ↗
                      </SmartLink>
                    )}
                  </div>
                </FadeIn>
              </div>

              <FadeIn delay={0.15} direction="left">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="ml-3 truncate font-mono text-[11px] text-white/50">{p.screen!.url}</span>
                  </div>
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.screen!.src}
                      alt={p.screen!.alt}
                      fill
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        ))}
      </div>

      {/* ── Everything else ───────────────────────────────── */}
      <section data-bg={CREAM} className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <SectionHead lines={["More", "projects"]} className="" />
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-charcoal transition-colors hover:text-primary"
            >
              All repositories on GitHub ↗
            </a>
          </div>

          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {others.map((project) => (
              <StaggerItem key={project.title} className="h-full">
                <div className={`flex h-full flex-col border border-charcoal/10 bg-white p-8 ${cardLift}`}>
                  <span className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                    {project.category}
                  </span>
                  <h3 className={`mb-4 ${display} text-2xl text-charcoal`}>{project.title}</h3>
                  <p className={`flex-1 text-sm leading-relaxed text-muted ${project.result ? "mb-4" : "mb-6"}`}>
                    {project.desc}
                  </p>
                  {project.result && (
                    <p className="mb-6 text-sm leading-relaxed text-charcoal">
                      <span className="font-semibold text-primary">Result:</span> {project.result}
                    </p>
                  )}
                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="rounded-full bg-background px-2.5 py-1 text-xs text-subtle">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    {project.demo && (
                      <SmartLink
                        href={project.demo}
                        className="group inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-charcoal transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        Try me {arrow}
                      </SmartLink>
                    )}
                    {project.link && (
                      <SmartLink
                        href={project.link}
                        className="text-sm font-semibold text-charcoal transition-colors hover:text-primary"
                      >
                        View on GitHub ↗
                      </SmartLink>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CtaBand
        lines={["Like what", "you see?"]}
        text="Open to junior and graduate software, backend and AI engineering roles."
      />
    </Chapters>
  );
}

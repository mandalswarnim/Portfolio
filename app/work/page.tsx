import type { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import SmartLink from "@/components/SmartLink";
import { projects } from "@/lib/projects";
import { GITHUB_URL } from "@/lib/site";
import { PageHero, CtaBand } from "@/components/PageSections";

export const metadata: Metadata = {
  title: "Work — Swarnim Mandal",
  description: "Projects and open-source work by Swarnim Mandal: voice agents, predictive models and full-stack apps.",
};

export default function Work() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Work"
        lines={["What I build"]}
        lead={
          <>
            A selection of what I&apos;ve built, from a real-time AI voice agent to deep-learning models and the
            full-stack apps that put them in front of people.
          </>
        }
      />

      {/* ── Featured Projects ─────────────────────────────── */}
      <section className="py-24 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-14">Featured Projects</h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <StaggerItem key={project.title}>
                <div className="flex flex-col bg-surface rounded-2xl p-6 border border-divider hover:border-foreground/20 hover:shadow-md transition-all h-full">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-medium text-foreground leading-snug mb-3">{project.title}</h3>
                  <p className={`text-sm text-muted leading-relaxed flex-1 ${project.result ? "mb-4" : "mb-6"}`}>
                    {project.desc}
                  </p>
                  {project.result && (
                    <p className="text-sm text-foreground leading-relaxed mb-6">
                      <span className="font-medium text-primary">Result:</span> {project.result}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-background text-subtle border border-divider px-2.5 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    {project.demo && (
                      <SmartLink
                        href={project.demo}
                        className="inline-flex items-center bg-foreground text-background text-sm font-medium px-4 py-2 rounded-full hover:bg-foreground/80 transition-colors"
                      >
                        Try me →
                      </SmartLink>
                    )}
                    {project.link && (
                      <SmartLink
                        href={project.link}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        View on GitHub <span className="text-xs">↗</span>
                      </SmartLink>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="mt-8">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-divider text-foreground text-sm font-medium px-5 py-2.5 rounded-full hover:border-foreground/40 transition-colors"
              >
                All repositories on GitHub ↗
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <CtaBand
        title="Like what you see?"
        text="Open to junior and graduate software, backend and AI engineering roles."
      />
    </div>
  );
}

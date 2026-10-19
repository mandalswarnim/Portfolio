"use client";

import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import TextReveal from "@/components/animations/TextReveal";
import HeroPortrait from "@/components/HeroPortrait";
import { CONTACT_EMAIL } from "@/lib/site";

const expertise = [
  {
    num: "01",
    title: "Full-Stack Development",
    desc: "Building responsive, cross-device web applications using React, Django, and Node.js — from API design to CI/CD deployment.",
  },
  {
    num: "02",
    title: "Machine Learning & AI",
    desc: "Developing neural networks for audio classification, music generation, and predictive modelling using TensorFlow, PyTorch, and Keras.",
  },
  {
    num: "03",
    title: "Data Analysis",
    desc: "Extracting business insight from complex datasets through statistical analysis, predictive models, and automated data pipelines.",
  },
];

type Project = {
  category: string;
  title: string;
  desc: string;
  tech: string[];
  link?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    category: "Conversational AI",
    title: "AI Receptionist",
    desc: "A production-ready AI receptionist that answers business calls 24/7, captures booking details through natural conversation, and emails structured leads to the owner. Built on Twilio voice + OpenAI — available to integrate into your business.",
    tech: ["TypeScript", "OpenAI", "Twilio"],
    link: "https://github.com/mandalswarnim/ai-receptionist",
    demo: "/ai-receptionist",
  },
  {
    category: "Aerospace Engineering",
    title: "Airfoil Selector for Wind Turbines",
    desc: "A tool that ranks airfoil designs for small vertical-axis wind turbines by annual energy production at a specific site — pairing real wind statistics with NeuralFoil surrogate aerodynamics and generating explainable reports on why one design outperforms another.",
    tech: ["Python", "NeuralFoil", "Gradio"],
    link: "https://github.com/mandalswarnim/Airfoil-Selector-for-Wind-Turbines",
    demo: "https://huggingface.co/spaces/mswanrim1/VAWT-Airfoil-Selector",
  },
  {
    category: "Deep Learning",
    title: "UAV Predictive Maintenance Digital Twin",
    desc: "LSTM, Transformer, and 1D-CNN models forecasting Remaining Useful Life on NASA C-MAPSS turbofans and a synthetic UAV fleet — with an interactive 3D dashboard and explainable-AI diagnostics.",
    tech: ["PyTorch", "Next.js", "Three.js"],
    link: "https://github.com/mandalswarnim/uav-pdm-dashboard",
    demo: "/uav",
  },
  {
    category: "Deep Learning",
    title: "Guitar Tablature Generation",
    desc: "LSTM and feed-forward neural network that predicts optimal guitar tablatures for any input melody, modelling musical intention and fretting difficulty.",
    tech: ["Python", "TensorFlow", "Keras"],
    link: "https://github.com/mandalswarnim/Guitar-Tablature-Generation",
  },
  {
    category: "Deep Learning",
    title: "Music Genre Classification",
    desc: "CNN model classifying audio into 10 genres using MFCC features, achieving 79% accuracy on the GTZAN dataset with custom preprocessing.",
    tech: ["Python", "PyTorch", "Librosa"],
  },
];

const testimonials = [
  {
    content:
      "Swarnim is an exceptional professional who brings genuine passion and dedication to everything he undertakes. His commitment to excellence and ability to inspire and uplift his team members makes him an invaluable asset to any project.",
    name: "Adrian Mihail",
    role: "Professional Colleague",
  },
  {
    content:
      "After facing significant academic challenges, Swarnim's patient tutoring and dedication transformed my educational journey. Under his mentorship, I not only passed but gained confidence in both Nepali and Chemistry. His approach made complex subjects accessible.",
    name: "Sudip",
    role: "Former Student",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="min-h-[calc(100vh-80px)] flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: copy */}
            <div>
              <FadeIn delay={0}>
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-8">
                  Available for opportunities · London, UK
                </p>
              </FadeIn>

              <TextReveal
                delay={0.1}
                lines={["Building software", "that thinks ahead."]}
                className="font-serif text-5xl md:text-6xl xl:text-7xl font-bold text-foreground leading-[1.08] mb-7"
              />

              <FadeIn delay={0.2}>
                <p className="text-lg text-muted leading-relaxed mb-10 max-w-[480px]">
                  MSc Software Engineering, University of West London.
                  Full-stack developer and machine learning engineer with
                  production experience across web, mobile, and AI systems.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/services"
                    className="group inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:bg-foreground/85 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(28,22,18,0.18)] active:translate-y-0 active:shadow-none"
                  >
                    View my work
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center border border-divider text-foreground text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:border-foreground/40 hover:bg-surface hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Get in touch
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right: photo */}
            <FadeIn delay={0.2} direction="left">
              <HeroPortrait />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Expertise ────────────────────────────────────── */}
      <section className="py-24 border-t border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-16">
              Expertise
            </h2>
          </FadeIn>

          <StaggerContainer className="divide-y divide-divider border-t border-divider">
            {expertise.map((item) => (
              <StaggerItem key={item.num}>
                <div className="group grid md:grid-cols-[64px_1fr_2fr] items-start gap-6 py-8 hover:bg-surface/60 transition-colors duration-300 px-2 -mx-2 rounded-lg">
                  <span className="text-xs font-mono text-subtle pt-0.5 transition-colors duration-300 group-hover:text-primary">{item.num}</span>
                  <h3 className="font-medium text-foreground transition-transform duration-300 ease-out group-hover:translate-x-1">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="border-t border-divider" />
        </div>
      </section>

      {/* ── Selected Work ────────────────────────────────── */}
      <section className="py-24 border-t border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-end justify-between mb-16">
              <h2 className="font-serif text-4xl font-bold text-foreground">
                Selected Work
              </h2>
              <Link
                href="/services"
                className="group inline-flex items-center gap-1 text-sm text-primary hover:underline underline-offset-4"
              >
                All projects
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <StaggerItem key={project.title}>
                <div className="flex flex-col bg-surface rounded-2xl p-6 border border-divider transition-all duration-300 ease-out hover:border-foreground/20 hover:shadow-[0_14px_32px_-12px_rgba(28,22,18,0.18)] hover:-translate-y-1 h-full">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-medium text-foreground leading-snug mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
                    {project.desc}
                  </p>
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
                    {project.demo &&
                      (/^https?:\/\//.test(project.demo) ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn inline-flex items-center gap-1.5 bg-foreground text-background text-sm font-medium px-4 py-2 rounded-full hover:bg-foreground/85 transition-colors"
                        >
                          Try me
                          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                        </a>
                      ) : (
                        <Link
                          href={project.demo}
                          className="group/btn inline-flex items-center gap-1.5 bg-foreground text-background text-sm font-medium px-4 py-2 rounded-full hover:bg-foreground/85 transition-colors"
                        >
                          Try me
                          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                        </Link>
                      ))}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/gh inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        View on GitHub{" "}
                        <span className="text-xs transition-transform duration-300 group-hover/gh:-translate-y-0.5 group-hover/gh:translate-x-0.5">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="py-24 border-t border-divider bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-16">
              What people say
            </h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-16">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <blockquote>
                  <p className="text-foreground text-lg leading-relaxed mb-6 italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <footer>
                    <span className="block font-medium text-foreground text-sm">
                      {t.name}
                    </span>
                    <span className="text-sm text-muted">{t.role}</span>
                  </footer>
                </blockquote>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-28 border-t border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="max-w-2xl">
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6">
                Have a project<br />in mind?
              </h2>
              <p className="text-muted text-lg mb-10">
                Open to full-time roles, freelance projects, and research collaborations.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center bg-foreground text-background text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:bg-foreground/85 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(28,22,18,0.18)] active:translate-y-0 active:shadow-none"
                >
                  {CONTACT_EMAIL}
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center border border-divider text-foreground text-sm font-medium px-6 py-3 rounded-full hover:border-foreground/40 transition-colors"
                >
                  About me
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}

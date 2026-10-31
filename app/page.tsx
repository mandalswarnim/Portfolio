"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import TextReveal from "@/components/animations/TextReveal";
import HeroPortrait from "@/components/HeroPortrait";
import Chapters from "@/components/home/Chapters";
import ExpertiseRail from "@/components/home/ExpertiseRail";
import Reveal from "@/components/home/Reveal";
import TravelCard, { type Screen } from "@/components/home/TravelCard";
import { CONTACT_EMAIL, CV_DOWNLOAD_NAME, CV_PATH } from "@/lib/site";

const expertise = [
  {
    num: "01",
    title: "AI Applications & Voice Agents",
    desc: "Real-time voice agents and LLM features built on OpenAI, Deepgram, ElevenLabs and Twilio — with structured outputs validated against strict JSON Schemas.",
  },
  {
    num: "02",
    title: "Backend & APIs",
    desc: "TypeScript and Python services with Node.js, Express, FastAPI and Django REST Framework, backed by PostgreSQL and Prisma, tested with Vitest and shipped through CI/CD.",
  },
  {
    num: "03",
    title: "Machine Learning",
    desc: "PyTorch models for prediction and fault diagnosis, evaluated on held-out data to avoid leakage and explained with Integrated Gradients and attention maps.",
  },
  {
    num: "04",
    title: "Full-Stack Web Apps",
    desc: "React and Next.js front ends styled with Tailwind CSS, from interactive dashboards to the product pages that put AI in front of people.",
  },
];

type Project = {
  category: string;
  title: string;
  desc: string;
  result?: string; // one-line measured outcome
  tech: string[];
  link?: string;
  demo?: string;
  screen?: Screen; // featured as a full colour chapter with this screenshot
};

const projects: Project[] = [
  {
    category: "Conversational AI",
    title: "AI Receptionist",
    desc: "A production-ready AI receptionist that answers business calls 24/7, captures booking details through natural conversation, and emails structured leads to the owner. Built on Twilio voice + OpenAI — available to integrate into your business.",
    result: "Live demo on this site, 100+ automated tests, now being demonstrated to prospective UK pub customers.",
    tech: ["TypeScript", "OpenAI", "Twilio"],
    link: "https://github.com/mandalswarnim/ai-receptionist",
    demo: "/ai-receptionist",
    screen: { src: "/home/receptionist.jpg", url: "swarnimmandal.me/ai-receptionist", alt: "AI Receptionist landing page" },
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
    result: "Transformer reached 14.12 RMSE on held-out NASA C-MAPSS engines and 97.4% fault-classification accuracy on the UAV fleet.",
    tech: ["PyTorch", "Next.js", "Three.js"],
    link: "https://github.com/mandalswarnim/uav-pdm-dashboard",
    demo: "/uav",
    screen: { src: "/home/uav.jpg", url: "swarnimmandal.me/uav/mission", alt: "UAV mission dashboard with radar and live telemetry" },
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
    desc: "CNN model classifying audio into 10 genres using MFCC features from the GTZAN dataset, with custom preprocessing.",
    result: "79% accuracy across 10 genres on GTZAN.",
    tech: ["Python", "PyTorch", "Librosa"],
  },
];

const testimonials = [
  {
    content:
      "Swarnim is an exceptional professional who brings genuine passion and dedication to everything he undertakes. His commitment to excellence and ability to inspire and uplift his team members makes him an invaluable asset to any project.",
    name: "Adrian Mihail",
    role: "Reception Manager, The Oriental Club",
  },
  {
    content:
      "After facing significant academic challenges, Swarnim's patient tutoring and dedication transformed my educational journey. Under his mentorship, I not only passed but gained confidence in both Nepali and Chemistry. His approach made complex subjects accessible.",
    name: "Sudip",
    role: "Former Student",
  },
];

const CREAM = "#FAF8F4";
const CHARCOAL = "#1E1E1E";
const BLUE = "#2D5FA3";
const LIME = "#C9F27A";

const featured = projects.filter((p) => p.screen);
const moreWork = projects.filter((p) => !p.screen);
const featuredBg = [CHARCOAL, BLUE];

const btnAccent =
  "group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(201,242,122,0.8)] active:translate-y-0";
const btnDark =
  "group inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/85 active:translate-y-0";
const btnOutlineDark =
  "inline-flex items-center gap-2 rounded-full border border-charcoal/25 px-6 py-3 text-sm font-semibold text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:border-charcoal active:translate-y-0";
const btnOutlineLight =
  "inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white active:translate-y-0";
const arrow = <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>;

function DemoLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return /^https?:\/\//.test(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <Chapters initial={CREAM}>
      {/* ── Story: hero + featured chapters beside the travelling card ── */}
      <div className="mx-auto grid max-w-6xl px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          {/* Hero */}
          <section data-bg={CREAM} data-card={0} className="flex min-h-[calc(100vh-80px)] flex-col justify-center py-20">
            <FadeIn delay={0}>
              <p className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-primary">
                Available for opportunities · London, UK
              </p>
            </FadeIn>

            <TextReveal
              delay={0.1}
              lines={["I build AI", "products that", "run in", "production."]}
              className="mb-8 font-display text-[2.6rem] uppercase leading-[0.95] text-charcoal sm:text-5xl xl:text-[3.4rem]"
            />

            <FadeIn delay={0.2}>
              <p className="mb-4 text-xl leading-snug text-charcoal">Voice agents, predictive models, full-stack apps.</p>
              <p className="mb-10 max-w-[480px] text-lg leading-relaxed text-muted">
                AI / software engineer with an MSc in Software Engineering (Distinction) from the University of West
                London, and a year of commercial React and Django work for a US healthcare client. Lately: a real-time
                AI phone receptionist and a deep-learning predictive-maintenance system for UAV fleets.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-3">
                <Link href="/work" className={btnDark}>
                  View my work {arrow}
                </Link>
                <Link href="/contact" className={btnOutlineDark}>
                  Get in touch
                </Link>
                {CV_PATH && (
                  <a href={CV_PATH} download={CV_DOWNLOAD_NAME} className={btnOutlineDark}>
                    Download CV <span aria-hidden>↓</span>
                  </a>
                )}
              </div>
            </FadeIn>

            <div className="mt-16 lg:hidden">
              <HeroPortrait />
            </div>
          </section>

          {/* Featured projects, one colour chapter each */}
          {featured.map((p, i) => (
            <section
              key={p.title}
              data-bg={featuredBg[i % featuredBg.length]}
              data-card={i + 1}
              className="flex min-h-screen flex-col justify-center py-24 text-white"
            >
              <FadeIn>
                <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-white/60">
                  {String(i + 1).padStart(2, "0")} / {p.category}
                </p>
              </FadeIn>
              <Reveal lines={[p.title]} className="mb-6 font-display text-4xl uppercase leading-[0.95] md:text-5xl" />
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
                    <DemoLink href={p.demo} className={btnAccent}>
                      Try it {arrow}
                    </DemoLink>
                  )}
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className={btnOutlineLight}>
                      View on GitHub ↗
                    </a>
                  )}
                </div>
              </FadeIn>

              <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 lg:hidden">
                <div className="relative aspect-[16/10]">
                  <Image src={p.screen!.src} alt={p.screen!.alt} fill sizes="100vw" className="object-cover object-top" />
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-20 h-[calc(100vh-80px)]">
            <TravelCard screens={featured.map((p) => p.screen!)} />
          </div>
        </div>
      </div>

      {/* ── What I do (sideways rail) ─────────────────────── */}
      <ExpertiseRail items={expertise} bg={CHARCOAL} />

      {/* ── More work ─────────────────────────────────────── */}
      <section data-bg={CREAM} className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
            <Reveal lines={["More work"]} className="font-display text-5xl uppercase leading-[0.95] text-charcoal md:text-7xl" />
            <Link href="/work" className="group inline-flex items-center gap-1 text-sm font-semibold text-charcoal">
              All projects {arrow}
            </Link>
          </div>

          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {moreWork.map((project) => (
              <StaggerItem key={project.title}>
                <div className="flex h-full flex-col rounded-[2rem] border border-charcoal/10 bg-white p-7 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_48px_-24px_rgba(30,30,30,0.35)]">
                  <span className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">{project.category}</span>
                  <h3 className="mb-3 font-display text-xl uppercase leading-tight text-charcoal">{project.title}</h3>
                  <p className={`flex-1 text-sm leading-relaxed text-muted ${project.result ? "mb-4" : "mb-6"}`}>{project.desc}</p>
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
                      <DemoLink
                        href={project.demo}
                        className="group inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-charcoal transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        Try me {arrow}
                      </DemoLink>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-charcoal transition-colors hover:text-primary"
                      >
                        View on GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section data-bg={LIME} className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal lines={["Kind words"]} className="mb-14 font-display text-5xl uppercase leading-[0.95] text-charcoal md:text-7xl" />
          <StaggerContainer className="grid gap-12 md:grid-cols-2 md:gap-16">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <blockquote>
                  <p className="mb-6 text-xl leading-relaxed text-charcoal">&ldquo;{t.content}&rdquo;</p>
                  <footer>
                    <span className="block text-sm font-semibold text-charcoal">{t.name}</span>
                    <span className="text-sm text-charcoal/60">{t.role}</span>
                  </footer>
                </blockquote>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section data-bg={CHARCOAL} className="py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal
            lines={["Have a project", "in mind?"]}
            className="mb-8 font-display text-5xl uppercase leading-[0.95] text-white md:text-8xl"
          />
          <FadeIn>
            <p className="mb-10 max-w-xl text-lg text-white/60">
              Open to junior and graduate software, backend and AI engineering roles — and to businesses that want an AI
              receptionist.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className={btnAccent}>
                {CONTACT_EMAIL} {arrow}
              </a>
              <Link href="/about" className={btnOutlineLight}>
                About me
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Chapters>
  );
}

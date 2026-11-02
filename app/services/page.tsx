import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookingButton from "@/components/BookingButton";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import Chapters from "@/components/home/Chapters";
import Reveal from "@/components/home/Reveal";
import {
  arrow,
  btnAccent,
  btnOutlineDark,
  btnOutlineLight,
  CARD_TONES,
  CHARCOAL,
  CREAM,
  CtaBand,
  display,
  Eyebrow,
  PageHero,
  SectionHead,
} from "@/components/PageSections";
import { RECEPTIONIST_SETUP_FEE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — Swarnim Mandal",
  description:
    "AI Receptionist: an AI phone agent that answers your business calls 24/7, captures booking details and emails you the lead.",
};

const receptionistPoints = [
  "Answers business calls 24/7, including the ones you miss",
  "Captures customer and booking details through natural conversation",
  "Emails a structured lead the moment the call ends",
  `£${RECEPTIONIST_SETUP_FEE} one-off setup, then billed per answered minute`,
];

const process = [
  { step: "01", title: "Discovery", desc: "Understand your goals, constraints, and the problem worth solving." },
  { step: "02", title: "Planning", desc: "Define scope, architecture, and a realistic roadmap." },
  { step: "03", title: "Development", desc: "Build iteratively with clean, tested, documented code." },
  { step: "04", title: "Delivery", desc: "Deploy, monitor, hand off — and stay available." },
];

export default function Services() {
  return (
    <Chapters initial={CREAM}>
      <PageHero
        eyebrow="Services"
        lines={["What I", "offer"]}
        lead={
          <>
            Right now I offer one service: an AI receptionist that answers your business calls so you don&apos;t lose
            bookings while you&apos;re busy or closed.
          </>
        }
      >
        <a href="#receptionist" className={btnOutlineDark}>
          See the service ↓
        </a>
      </PageHero>

      {/* ── AI Receptionist ──────────────────────────────── */}
      <section id="receptionist" data-bg={CHARCOAL} className="scroll-mt-20 py-28 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
          <div>
            <FadeIn>
              <Eyebrow light>01 / Conversational AI</Eyebrow>
            </FadeIn>
            <Reveal lines={["AI", "Receptionist"]} className={`mb-6 ${display} text-4xl sm:text-5xl md:text-6xl`} />
            <FadeIn delay={0.1}>
              <p className="mb-8 text-lg leading-relaxed text-white/70">
                A real-time voice agent built on Twilio, OpenAI and Deepgram. It picks up when you can&apos;t, has a
                natural conversation with the caller, and sends you everything you need to call them back or confirm the
                booking.
              </p>
              <ul className="mb-10 space-y-3">
                {receptionistPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-charcoal">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href="/ai-receptionist" className={btnAccent}>
                  See how it works {arrow}
                </Link>
                <BookingButton source="services" className={btnOutlineLight} />
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} direction="left">
            <Link
              href="/ai-receptionist"
              className="block overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-3 truncate font-mono text-[11px] text-white/50">
                  swarnimmandal.me/ai-receptionist
                </span>
              </div>
              <div className="relative aspect-[16/10]">
                <Image
                  src="/home/receptionist.jpg"
                  alt="AI Receptionist landing page"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section data-bg={CREAM} className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow="02 / Process" lines={["How I", "work"]} />
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <StaggerItem key={step.step} className="h-full">
                <div
                  className={`flex h-full min-h-[280px] flex-col rounded-[2rem] p-8 transition-transform duration-500 ease-out hover:-translate-y-2 ${CARD_TONES[i % CARD_TONES.length]}`}
                >
                  <span className="mb-auto font-mono text-sm opacity-60">{step.step}</span>
                  <h3 className={`mb-3 mt-10 ${display} text-2xl`}>{step.title}</h3>
                  <p className="text-sm leading-relaxed opacity-80">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CtaBand lines={["Ready to", "start?"]} text="Let's discuss your project.">
        <BookingButton source="services" className={btnOutlineLight} />
      </CtaBand>
    </Chapters>
  );
}

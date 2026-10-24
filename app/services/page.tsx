import type { Metadata } from "next";
import Link from "next/link";
import BookingButton from "@/components/BookingButton";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
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
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="py-24 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-6">
              Services
            </p>
            <TextReveal
              lines={["What I offer"]}
              className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6"
            />
            <p className="text-lg text-muted max-w-2xl leading-relaxed">
              Right now I offer one service: an AI receptionist that answers your business
              calls so you don&apos;t lose bookings while you&apos;re busy or closed.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── AI Receptionist ──────────────────────────────── */}
      <section className="py-24 border-b border-divider bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="grid md:grid-cols-[64px_1fr_1fr] gap-8 border-t border-b border-divider py-10">
              <span className="text-xs font-mono text-subtle pt-1">01</span>
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-3">
                  Conversational AI
                </span>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-4">AI Receptionist</h2>
                <p className="text-sm text-muted leading-relaxed mb-8">
                  A real-time voice agent built on Twilio, OpenAI and Deepgram. It picks up when
                  you can&apos;t, has a natural conversation with the caller, and sends you
                  everything you need to call them back or confirm the booking.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/ai-receptionist"
                    className="inline-flex items-center bg-foreground text-background text-sm font-medium px-6 py-3 rounded-full hover:bg-foreground/80 transition-colors whitespace-nowrap"
                  >
                    See how it works →
                  </Link>
                  <BookingButton source="services" />
                </div>
              </div>
              <ul className="space-y-3">
                {receptionistPoints.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <span className="w-1 h-1 rounded-full bg-divider shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="py-24 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-14">
              How I work
            </h2>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {process.map((step) => (
              <StaggerItem key={step.step}>
                <div>
                  <span className="text-xs font-mono text-subtle block mb-4">{step.step}</span>
                  <h3 className="font-medium text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                  Ready to start?
                </h2>
                <p className="text-muted">Let&apos;s discuss your project.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-foreground text-background text-sm font-medium px-6 py-3 rounded-full hover:bg-foreground/80 transition-colors whitespace-nowrap"
                >
                  Get in touch
                </Link>
                <BookingButton source="services" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}

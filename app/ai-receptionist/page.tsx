import type { Metadata } from "next";
import BookingButton from "@/components/BookingButton";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import EnquiryForm from "@/components/aireception/EnquiryForm";
import LoopVideo from "@/components/aireception/LoopVideo";
import TryMe from "@/components/aireception/TryMe";
import PlanButton from "@/components/aireception/PlanButton";
import {
  CONTACT_EMAIL,
  RECEPTIONIST_SETUP_FEE,
  RECEPTIONIST_TIERS,
  SAMPLE_CALL_AUDIO,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Receptionist — 24/7 Call Answering & Booking Capture",
  description:
    "An AI receptionist that answers every call 24/7, captures customer details through natural conversation, and emails you structured booking requests. Built on Twilio + OpenAI. Get in touch to add it to your business.",
  openGraph: {
    title: "AI Receptionist — Never miss a call, never lose a booking",
    description:
      "A production-ready AI receptionist that answers calls 24/7 and turns them into booking requests in your inbox. Integrate it into your business.",
    url: "https://swarnimmandal.me/ai-receptionist",
    type: "website",
  },
};

const EMAIL_HREF =
  `mailto:${CONTACT_EMAIL}?subject=AI%20Receptionist%20enquiry&body=Hi%20Swarnim%2C%20I%27d%20like%20to%20add%20the%20AI%20Receptionist%20to%20my%20business.`;

const scenes = [
  {
    video: "after-hours",
    label: "After hours",
    title: "Calls land when you're closed",
    description:
      "Evenings, weekends and lunch breaks are when many customers finally get round to calling — and reach voicemail.",
  },
  {
    video: "dental",
    label: "Mid-appointment",
    title: "You can't put down what you're doing",
    description:
      "With a patient in the chair or a client in front of you, the phone rings out. Most callers won't leave a message.",
  },
  {
    video: "trades",
    label: "On the job",
    title: "Your hands are full",
    description:
      "Up a ladder or under a sink, picking up isn't an option — and calling back an hour later is often too late.",
  },
  {
    video: "salon",
    label: "Fully booked",
    title: "They call someone else",
    description:
      "A caller who doesn't get through usually tries the next business on the list rather than waiting for a callback.",
  },
];

const facts = [
  "Answers 24/7",
  "Keeps your existing number",
  "Summary email after every call",
  `£${RECEPTIONIST_SETUP_FEE} setup, then pay per minute`,
];

const steps = [
  {
    step: "01",
    title: "Customer calls",
    description:
      "A customer dials your business number. Instead of voicemail or endless ringing, they're greeted by a friendly AI voice.",
  },
  {
    step: "02",
    title: "AI handles it",
    description:
      "The AI introduces itself as a virtual assistant, has a natural conversation, and captures the caller's details and what they need.",
  },
  {
    step: "03",
    title: "You get the booking",
    description:
      "When the call ends, a structured summary with the full transcript lands in your inbox, ready for you to call back.",
  },
];

const features = [
  {
    title: "24/7 availability",
    description:
      "Never sleeps, takes breaks, or calls in sick. Every call answered, day or night.",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Smart conversations",
    description:
      "Natural-language AI that understands context, handles follow-ups, and adapts to your business.",
    icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
  },
  {
    title: "Instant email alerts",
    description:
      "A structured summary in your inbox the moment a call ends — caller details, their message and an urgency level.",
    icon: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0",
  },
  {
    title: "Easy integration",
    description:
      "Keep your existing number. Set it to forward unanswered calls and the AI picks up — no new hardware.",
    icon: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244",
  },
  {
    title: "Call history & transcripts",
    description:
      "Every call is logged with its transcript and extracted details, so nothing depends on memory or scribbled notes.",
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  },
  {
    title: "Urgency flagging",
    description:
      "Each call is rated from low to urgent, so the callbacks that matter most rise to the top of your inbox.",
    icon: "M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495A18.023 18.023 0 0112 15.75",
  },
];

const dataPoints = [
  {
    title: "Callers know it's an AI",
    description:
      "The receptionist introduces itself as a virtual assistant at the start of every call.",
  },
  {
    title: "Only what you need",
    description:
      "It collects the details needed to call someone back: name, company, phone, email, message and urgency.",
  },
  {
    title: "Recording is optional",
    description:
      "Transcripts are built from the conversation itself. Audio recording is off unless you choose to enable it.",
  },
  {
    title: "Deleted on request",
    description:
      "Call records can be deleted individually, and everything is exported to you and removed if you leave.",
  },
];

const faqs = [
  {
    q: "Do I need a new phone number?",
    a: "No. You keep your existing number and set it to forward calls you don't answer. Customers dial you exactly as they do now.",
  },
  {
    q: "Does it book appointments into my calendar?",
    a: "Not directly. It takes the caller's details and what they need, then emails you a structured summary so you can confirm the booking yourself.",
  },
  {
    q: "Will callers know they're talking to an AI?",
    a: "Yes. It introduces itself as a virtual assistant at the start of every call, and if a caller asks directly it never claims to be human.",
  },
  {
    q: "What does it cost to run?",
    a: `A one-off £${RECEPTIONIST_SETUP_FEE} setup fee, then a per-minute rate for the calls your receptionist answers. The rate depends on the tier you choose (Agathos, Arete, Aristeia or Axiom), which sets the voice, how conversational the agent is and how natural it sounds.`,
  },
  {
    q: "Is there a contract?",
    a: "No long-term contract. You pay for the minutes you use, can change tier or cancel any time, and your call records are exported to you when you leave.",
  },
  {
    q: "Can the receptionist use my own voice?",
    a: "Yes, on the Axiom tier. The lower tiers use a standard or premium voice, chosen to suit your business.",
  },
  {
    q: "Can I get alerts somewhere other than email?",
    a: "Yes. As well as the summary email, call summaries can be posted to a Slack channel so the whole team sees them.",
  },
  {
    q: "How long does setup take?",
    a: "Once we've agreed what the receptionist should say and ask, going live is a matter of configuring forwarding and running test calls together.",
  },
  {
    q: "What happens if the AI can't help?",
    a: "It never pretends to. It takes a message with the caller's details and urgency so you can follow up personally.",
  },
];

function Icon({ path }: { path: string }) {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Receptionist",
    serviceType: "AI phone answering",
    url: `${SITE_URL}/ai-receptionist`,
    areaServed: "GB",
    provider: { "@type": "Person", name: "Swarnim Mandal", url: SITE_URL },
    description:
      "An AI receptionist that answers unanswered business calls, captures caller details and emails a structured summary.",
    offers: {
      "@type": "Offer",
      name: "Setup",
      price: RECEPTIONIST_SETUP_FEE,
      priceCurrency: "GBP",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  },
];

export default function AiReceptionistPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-foreground">
        <div className="absolute inset-0 -z-10">
          <LoopVideo name="hero" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/65 to-foreground/20" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-foreground/70 to-transparent" />
        </div>
        <div className="max-w-6xl mx-auto px-6 min-h-[calc(100svh-5rem)] max-h-[860px] flex flex-col justify-center py-24">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/10 border border-background/20 backdrop-blur text-background text-sm font-medium mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-nominal opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-status-nominal" />
                </span>
                AI Receptionist · for small businesses
              </span>
            </FadeIn>

            <TextReveal
              delay={0.1}
              lines={["Never miss a call.", "Never lose a booking."]}
              className="font-serif text-5xl md:text-6xl xl:text-7xl font-bold text-background leading-[1.08] mb-6"
            />

            <FadeIn delay={0.2}>
              <p className="text-lg text-background/80 leading-relaxed mb-10 max-w-xl">
                When you can&apos;t pick up, an AI receptionist answers your calls day or night. It takes each
                caller&apos;s details through natural conversation and emails you a clean summary the moment
                they hang up.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#try"
                  className="inline-flex items-center gap-2 bg-background text-foreground text-sm font-medium px-6 py-3 rounded-full hover:bg-background/85 transition-colors"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-status-nominal text-white">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </span>
                  Try me — call it now
                </a>
                <a
                  href="#plans"
                  className="inline-flex items-center border border-background/30 text-background text-sm font-medium px-6 py-3 rounded-full hover:border-background/70 transition-colors"
                >
                  See plans
                </a>
                <BookingButton source="ai-receptionist-hero" label="Book a demo call" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Fact strip ───────────────────────────────────── */}
      <section className="border-b border-divider bg-surface">
        <ul className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3">
          {facts.map((fact) => (
            <li key={fact} className="flex items-center gap-2 text-sm font-medium text-foreground">
              <span className="text-status-nominal" aria-hidden>✓</span>
              {fact}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Scenes ───────────────────────────────────────── */}
      <section className="py-24 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm font-medium text-status-critical uppercase tracking-widest mb-3">
              The problem
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 max-w-2xl">
              Answer every call, even when you can&apos;t
            </h2>
            <p className="text-muted text-lg max-w-2xl mb-14">
              The phone rings at the worst moments. Every unanswered call is a customer deciding whether to try you
              again or ring the next business on the list.
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 gap-6">
            {scenes.map((scene) => (
              <StaggerItem key={scene.video}>
                <article className="group h-full overflow-hidden rounded-2xl border border-divider bg-surface">
                  <div className="relative aspect-[16/9] overflow-hidden bg-foreground">
                    <LoopVideo
                      name={scene.video}
                      className="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-foreground/60 backdrop-blur px-3 py-1 text-xs font-medium text-background">
                      {scene.label}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">{scene.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{scene.description}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Try me ───────────────────────────────────────── */}
      <section id="try" className="py-24 border-b border-divider bg-surface scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="max-w-2xl mb-14">
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Try me</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Don&apos;t take our word for it. Call it.
              </h2>
              <p className="text-muted text-lg">
                Pick a business, or type in your own name, then press call. You play the customer. Watch the details
                fill in on the right, and see the email the business gets when you hang up.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <TryMe />
          </FadeIn>
          {SAMPLE_CALL_AUDIO && (
            <div className="mt-14 max-w-xl rounded-2xl border border-divider bg-background p-5">
              <p className="text-sm font-medium text-foreground mb-3">Listen to a recorded test call</p>
              <audio controls preload="none" src={SAMPLE_CALL_AUDIO} className="w-full" />
            </div>
          )}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="py-24 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <FadeIn>
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
                How it works
              </p>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-12">
                Three steps. Nothing for you to do.
              </h2>
            </FadeIn>
            <StaggerContainer className="space-y-9">
              {steps.map((step) => (
                <StaggerItem key={step.step}>
                  <div className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary font-serif text-lg font-bold text-white">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          <FadeIn delay={0.15}>
            <figure className="overflow-hidden rounded-2xl border border-divider bg-surface">
              <div className="aspect-[4/3] bg-foreground">
                <LoopVideo name="followup" />
              </div>
              <figcaption className="px-6 py-4 text-sm text-muted">
                The summary is waiting whenever you&apos;re ready, with who called, what they need and how urgent it is.
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section className="py-24 border-b border-divider bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
              Features
            </p>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="text-muted text-lg max-w-2xl mb-16">
              Built for businesses that want to capture every opportunity
              without adding complexity.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="h-full rounded-2xl border border-divider bg-background p-7">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon path={feature.icon} />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Your callers' data ───────────────────────────── */}
      <section className="py-24 border-b border-divider bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
              Trust &amp; Data
            </p>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Your callers&apos; data, handled properly
            </h2>
            <p className="text-muted text-lg max-w-2xl mb-16">
              Calls are handled by Twilio and OpenAI; caller details are stored
              in a database dedicated to your business.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataPoints.map((point) => (
              <StaggerItem key={point.title}>
                <div className="h-full rounded-2xl border border-divider bg-background p-7">
                  <h3 className="font-medium text-foreground mb-2">{point.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{point.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────── */}
      <section id="plans" className="py-24 border-b border-divider scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
              Pricing
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Pay for the calls you take. Nothing else.
            </h2>
            <p className="text-muted text-lg max-w-2xl mb-10">
              A one-off setup fee, then a per-minute rate for the calls your receptionist answers. Quiet month,
              smaller bill. Choose a tier by how the agent sounds and how much it can talk about.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mb-12 grid gap-4 rounded-2xl border border-divider bg-surface p-6 md:grid-cols-[auto_1fr] md:items-center md:gap-10 md:p-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-subtle mb-1">Setup · one-off</p>
                <p className="font-serif text-5xl font-bold text-foreground">£{RECEPTIONIST_SETUP_FEE}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 text-sm">
                {[
                  ["Voice", "From a clear standard voice up to a custom voice of your own."],
                  ["Conversation", "From guided questions up to free-flowing, tailored conversation."],
                  ["Human touch", "How natural the agent sounds: tone, pacing and warmth."],
                ].map(([title, body]) => (
                  <div key={title}>
                    <p className="font-medium text-foreground mb-1">{title}</p>
                    <p className="text-muted leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
            {RECEPTIONIST_TIERS.map((tier, i) => (
              <StaggerItem key={tier.name}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                    tier.featured
                      ? "border-foreground bg-foreground text-background shadow-xl"
                      : "border-divider bg-surface"
                  }`}
                >
                  {tier.featured && (
                    <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                      Recommended
                    </span>
                  )}
                  <p className={`text-xs uppercase tracking-widest mb-3 ${tier.featured ? "text-background/60" : "text-subtle"}`}>
                    Tier {["I", "II", "III", "IV"][i]}
                  </p>
                  <h3 className="font-serif text-3xl font-bold leading-none">{tier.name}</h3>
                  <p className={`text-sm italic mt-1 mb-4 ${tier.featured ? "text-background/60" : "text-subtle"}`}>
                    {tier.meaning}
                  </p>
                  <p className={`text-sm leading-relaxed mb-6 min-h-[2.5rem] ${tier.featured ? "text-background/80" : "text-muted"}`}>
                    {tier.tagline}
                  </p>

                  <p className="font-serif text-3xl font-bold mb-6">
                    {tier.perMinute === null ? (
                      <span className="text-2xl">Rate on request</span>
                    ) : (
                      <>
                        £{tier.perMinute.toFixed(2)}
                        <span className={`text-base font-sans font-normal ${tier.featured ? "text-background/70" : "text-muted"}`}>
                          {" "}/ min
                        </span>
                      </>
                    )}
                  </p>

                  <dl className="space-y-4 mb-6">
                    {([
                      ["Voice", tier.voice],
                      ["Conversation", tier.conversation],
                      ["Human touch", tier.human],
                    ] as const).map(([label, rating]) => (
                      <div key={label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <dt className={`text-xs uppercase tracking-wider ${tier.featured ? "text-background/60" : "text-subtle"}`}>
                            {label}
                          </dt>
                          <span className="flex gap-1" aria-label={`${rating.level} of 4`}>
                            {[1, 2, 3, 4].map((n) => (
                              <span
                                key={n}
                                className={`h-1.5 w-5 rounded-full ${
                                  n <= rating.level
                                    ? tier.featured ? "bg-background" : "bg-primary"
                                    : tier.featured ? "bg-background/20" : "bg-divider"
                                }`}
                              />
                            ))}
                          </span>
                        </div>
                        <dd className={`text-sm ${tier.featured ? "text-background/85" : "text-foreground"}`}>
                          {rating.label}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {tier.features.length > 0 && (
                    <ul className={`space-y-2.5 mb-6 pt-5 border-t ${tier.featured ? "border-background/15" : "border-divider"}`}>
                      {tier.features.map((line) => (
                        <li
                          key={line}
                          className={`flex gap-3 text-sm leading-relaxed ${tier.featured ? "text-background/85" : "text-muted"}`}
                        >
                          <span className={tier.featured ? "text-status-nominal" : "text-primary"}>✓</span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto space-y-3">
                    <PlanButton
                      plan={tier.name}
                      className={`w-full rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                        tier.featured
                          ? "bg-background text-foreground hover:bg-background/85"
                          : "bg-foreground text-background hover:bg-foreground/80"
                      }`}
                    >
                      {tier.perMinute === null ? `Get ${tier.name} pricing` : `Choose ${tier.name}`}
                    </PlanButton>
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${tier.name} AI Receptionist — per-minute rate`)}`}
                      className={`block text-center text-xs underline-offset-4 hover:underline ${tier.featured ? "text-background/60" : "text-subtle"}`}
                    >
                      or email me about {tier.name}
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <p className="mt-8 text-sm text-subtle max-w-3xl">
            Billed per minute of answered calls, plus the one-off £{RECEPTIONIST_SETUP_FEE} setup. No long-term
            contract. You can change tier or cancel any time.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="py-24 border-b border-divider bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-12">
              Common questions
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="max-w-3xl divide-y divide-divider border-t border-b border-divider">
              {faqs.map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium text-foreground">
                    {faq.q}
                    <span className="text-subtle transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Enquiry ──────────────────────────────────────── */}
      <section id="enquire" className="py-28 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16">
            <FadeIn>
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
                Built on Twilio · OpenAI · Node.js
              </p>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6">
                Want this on
                <br />
                your business?
              </h2>
              <p className="text-muted text-lg mb-10">
                I build, deploy, and integrate the AI receptionist into your
                existing phone line and workflow. Tell me a little about your
                business and I&apos;ll come back with a quote.
              </p>
              <div className="flex flex-wrap gap-4">
                <BookingButton source="ai-receptionist-footer" label="Book a demo call" />
                <a
                  href={EMAIL_HREF}
                  className="inline-flex items-center border border-divider text-foreground text-sm font-medium px-6 py-3 rounded-full hover:border-foreground/40 transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <EnquiryForm />
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}

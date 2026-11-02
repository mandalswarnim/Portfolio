"use client";

import Link from "next/link";
import BookingButton from "@/components/BookingButton";
import Honeypot from "@/components/Honeypot";
import FadeIn from "@/components/animations/FadeIn";
import Chapters from "@/components/home/Chapters";
import Reveal from "@/components/home/Reveal";
import {
  arrow,
  btnAccent,
  btnDark,
  btnOutlineDark,
  btnOutlineLight,
  CHARCOAL,
  CREAM,
  display,
  Eyebrow,
  PageHero,
} from "@/components/PageSections";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import { inputClass, labelClass, useEnquiryForm } from "@/lib/contact-client";

const contactLinks = [
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    label: "Phone",
    value: "+44 7585 345010",
    href: "tel:+447585345010",
  },
  {
    label: "Location",
    value: "London, United Kingdom",
    href: null,
  },
  {
    label: "GitHub",
    value: "github.com/mandalswarnim",
    href: GITHUB_URL,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/swarnim-mandal",
    href: LINKEDIN_URL,
  },
];

export default function Contact() {
  const { form, status, error, handleChange, handleSubmit } = useEnquiryForm(
    { name: "", email: "", subject: "", message: "", website: "" },
    "contact",
    ({ name, email, subject, message }) => ({ name, email, subject, message }),
  );

  return (
    <Chapters initial={CREAM}>
      <PageHero
        eyebrow="Contact · Replies within 24 hours"
        lines={["Let’s work", "together"]}
        lead={
          <>
            Open to full-time roles, freelance projects, and research collaborations. I typically respond within 24
            hours.
          </>
        }
      >
        <a href={`mailto:${CONTACT_EMAIL}`} className={btnDark}>
          {CONTACT_EMAIL} {arrow}
        </a>
        <BookingButton source="contact" label="Book a 20-minute call" className={btnOutlineDark} />
      </PageHero>

      {/* ── Body ─────────────────────────────────────────── */}
      <section data-bg={CREAM} className="pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            {/* Left: contact details */}
            <FadeIn>
              <div className="border-t border-charcoal/15">
                {contactLinks.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1.5 border-b border-charcoal/15 py-6">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="break-words text-lg font-semibold text-charcoal transition-colors hover:text-primary"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-lg font-semibold text-charcoal">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Right: form */}
            <FadeIn delay={0.1}>
              <form
                onSubmit={handleSubmit}
                className="relative space-y-5 rounded-[2rem] border border-charcoal/10 bg-white p-8 shadow-[0_24px_48px_-32px_rgba(30,30,30,0.35)] md:p-10"
              >
                <h2 className={`${display} mb-2 text-3xl text-charcoal`}>Send a message</h2>
                <Honeypot id="website" value={form.website} onChange={handleChange} />
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={labelClass}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    placeholder="What's this about?"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    maxLength={5000}
                    rows={7}
                    placeholder="Tell me about your project or idea..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button type="submit" disabled={status === "sending"} className={`${btnDark} disabled:opacity-50`}>
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>

                  <p role="status" aria-live="polite" className="text-sm">
                    {status === "success" && (
                      <span className="text-primary">Message sent — I&apos;ll be in touch soon.</span>
                    )}
                    {status === "error" && <span className="text-status-critical">{error}</span>}
                  </p>
                </div>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Closing ──────────────────────────────────────── */}
      <section data-bg={CHARCOAL} className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <Eyebrow light>Prefer to look around first?</Eyebrow>
          </FadeIn>
          <Reveal lines={["See what", "I’ve built"]} className={`mb-10 ${display} text-5xl text-white md:text-7xl`} />
          <FadeIn>
            <div className="flex flex-wrap gap-3">
              <Link href="/work" className={btnAccent}>
                View my work {arrow}
              </Link>
              <Link href="/ai-receptionist" className={btnOutlineLight}>
                Try the AI Receptionist
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Chapters>
  );
}

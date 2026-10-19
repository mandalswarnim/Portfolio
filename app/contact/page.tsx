"use client";

import BookingButton from "@/components/BookingButton";
import Honeypot from "@/components/Honeypot";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
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
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="py-24 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-6">
              Contact
            </p>
            <TextReveal
              lines={["Let’s work", "together"]}
              className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6"
            />
            <p className="text-lg text-muted max-w-xl leading-relaxed">
              Open to full-time roles, freelance projects, and research collaborations.
              I typically respond within 24 hours.
            </p>
            <BookingButton
              source="contact"
              label="Book a 20-minute call"
              className="mt-8 inline-flex items-center gap-1.5 bg-foreground text-background text-sm font-medium px-6 py-3 rounded-full hover:bg-foreground/80 transition-colors"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16">

            {/* Left: contact details */}
            <FadeIn>
              <div className="space-y-0 divide-y divide-divider border-t border-b border-divider">
                {contactLinks.map((item) => (
                  <div key={item.label} className="py-5 flex flex-col gap-1">
                    <span className="text-xs text-subtle uppercase tracking-wider">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm text-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm text-foreground">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Right: form */}
            <FadeIn delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-5">
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

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center bg-foreground text-background text-sm font-medium px-6 py-3 rounded-full hover:bg-foreground/80 disabled:opacity-50 transition-colors"
                  >
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

    </div>
  );
}

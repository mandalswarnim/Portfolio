"use client";

import { useEffect } from "react";
import Honeypot from "@/components/Honeypot";
import { inputClass, labelClass, useEnquiryForm } from "@/lib/contact-client";
import { RECEPTIONIST_TIERS } from "@/lib/site";
import { PLAN_EVENT } from "./PlanButton";

const INDUSTRIES = [
  "Healthcare / dental",
  "Legal / accounting",
  "Trades / home services",
  "Beauty / wellness",
  "Property",
  "Hospitality",
  "Other",
];

const MISSED_CALLS = ["Under 5", "5–20", "20–50", "50+", "Not sure"];

const EMPTY = {
  business: "",
  name: "",
  email: "",
  phone: "",
  industry: "",
  missedCalls: "",
  plan: "",
  notes: "",
  website: "",
};

export default function EnquiryForm() {
  const { form, setForm, status, error, handleChange, handleSubmit } = useEnquiryForm(
    EMPTY,
    "ai-receptionist",
    (f) => ({
      name: f.name,
      email: f.email,
      subject: `AI Receptionist enquiry — ${f.business}`,
      message: f.notes || "(no additional notes)",
      details: {
        Business: f.business,
        Phone: f.phone,
        Industry: f.industry,
        "Missed calls per week": f.missedCalls,
        Plan: f.plan || "Not sure yet",
      },
    }),
  );
  useEffect(() => {
    const onPlan = (e: Event) => {
      const plan = (e as CustomEvent<string>).detail;
      setForm((prev) => ({ ...prev, plan }));
    };
    window.addEventListener(PLAN_EVENT, onPlan);
    return () => window.removeEventListener(PLAN_EVENT, onPlan);
  }, [setForm]);

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-divider bg-surface p-8">
        <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Thanks — enquiry received</h3>
        <p className="text-muted leading-relaxed">
          I&apos;ll reply within 24 hours with a few questions about your phone setup and a quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-5">
      <Honeypot id="rx-website" value={form.website} onChange={handleChange} />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="rx-business" className={labelClass}>Business name</label>
          <input id="rx-business" name="business" value={form.business} onChange={handleChange}
            required maxLength={100} placeholder="Sunrise Dental" className={inputClass} />
        </div>
        <div>
          <label htmlFor="rx-name" className={labelClass}>Your name</label>
          <input id="rx-name" name="name" value={form.name} onChange={handleChange}
            required maxLength={100} placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="rx-email" className={labelClass}>Email</label>
          <input id="rx-email" type="email" name="email" value={form.email} onChange={handleChange}
            required maxLength={200} placeholder="you@business.com" className={inputClass} />
        </div>
        <div>
          <label htmlFor="rx-phone" className={labelClass}>Phone <span className="normal-case">(optional)</span></label>
          <input id="rx-phone" type="tel" name="phone" value={form.phone} onChange={handleChange}
            maxLength={40} placeholder="+44 …" className={inputClass} />
        </div>
        <div>
          <label htmlFor="rx-industry" className={labelClass}>Industry</label>
          <select id="rx-industry" name="industry" value={form.industry} onChange={handleChange}
            required className={inputClass}>
            <option value="" disabled>Select…</option>
            {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="rx-missed" className={labelClass}>Missed calls per week</label>
          <select id="rx-missed" name="missedCalls" value={form.missedCalls} onChange={handleChange}
            required className={inputClass}>
            <option value="" disabled>Select…</option>
            {MISSED_CALLS.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="rx-plan" className={labelClass}>Plan you&apos;re interested in</label>
        <select id="rx-plan" name="plan" value={form.plan} onChange={handleChange} className={inputClass}>
          <option value="">Not sure yet, help me choose</option>
          {RECEPTIONIST_TIERS.map((t) => <option key={t.name}>{t.name}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="rx-notes" className={labelClass}>Anything else? <span className="normal-case">(optional)</span></label>
        <textarea id="rx-notes" name="notes" value={form.notes} onChange={handleChange}
          maxLength={5000} rows={4} placeholder="Current phone setup, opening hours, what callers usually ask…"
          className={`${inputClass} resize-none`} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center bg-foreground text-background text-sm font-medium px-6 py-3 rounded-full hover:bg-foreground/80 disabled:opacity-50 transition-colors"
        >
          {status === "sending" ? "Sending…" : "Request a quote"}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-status-critical">
          {status === "error" && error}
        </p>
      </div>
    </form>
  );
}

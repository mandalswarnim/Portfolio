import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { CONTACT_EMAIL } from "@/lib/site";

export type EnquiryPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
  startedAt: number;
  details?: Record<string, string>;
};

export const inputClass =
  "w-full bg-background border border-divider rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:border-primary/50 transition-colors";
export const labelClass = "block text-xs font-medium text-subtle uppercase tracking-wider mb-2";

// Posts to /api/contact; throws an Error carrying a user-facing message.
export async function submitEnquiry(payload: EnquiryPayload) {
  const fallback = `Something went wrong — please email ${CONTACT_EMAIL}.`;
  let res: Response;
  try {
    res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(fallback);
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || fallback);
  }
}

type FormFields = Record<string, string> & { website: string };

// Form state, fill-time stamp and submission shared by the contact forms.
// `toPayload` maps the form's own fields onto the email the route sends.
export function useEnquiryForm<T extends FormFields>(
  empty: T,
  source: string,
  toPayload: (form: T) => Omit<EnquiryPayload, "website" | "startedAt">,
) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await submitEnquiry({ ...toPayload(form), website: form.website, startedAt: startedAt.current });
      setStatus("success");
      track("contact_submitted", { source });
      setForm(empty);
    } catch (err) {
      setStatus("error");
      setError((err as Error).message);
    }
  };

  return { form, setForm, status, error, handleChange, handleSubmit };
}

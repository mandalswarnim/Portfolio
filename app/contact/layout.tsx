import type { Metadata } from "next";

// page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about software, backend and AI engineering roles, freelance projects or the AI Receptionist.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

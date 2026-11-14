import type { Metadata } from "next";
import type { ReactNode } from "react";

// page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = { title: "Mission" };

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

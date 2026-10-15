"use client";

import { track } from "@vercel/analytics";

export const PLAN_EVENT = "aireception:plan";

/** Pre-selects a tier in the enquiry form, then scrolls to it. */
export default function PlanButton({
  plan,
  className,
  children,
}: {
  plan: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        track("plan_selected", { plan });
        window.dispatchEvent(new CustomEvent(PLAN_EVENT, { detail: plan }));
        document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {children}
    </button>
  );
}

import type { Asset } from "@/lib/uav/assets";

const styles: Record<Asset["status"], string> = {
  NOMINAL: "border-status-nominal/30 bg-status-nominal/10 text-status-nominal",
  WARNING: "border-status-warning/30 bg-status-warning/10 text-status-warning",
  CRITICAL: "border-status-critical/30 bg-status-critical/10 text-status-critical",
};

export default function StatusBadge({ status }: { status: Asset["status"] }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  );
}

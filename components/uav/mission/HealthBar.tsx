"use client";
import { useDash } from "@/lib/uav/store";
import { palette } from "@/lib/uav/palette";

export default function HealthBar() {
  const { current } = useDash();
  const rul = current?.rul ?? 100;
  const color = rul < 35 ? palette.status.CRITICAL : rul < 65 ? palette.status.WARNING : palette.status.NOMINAL;
  const label = rul < 35 ? "Critical" : rul < 65 ? "Degrading" : "Nominal";

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Remaining Useful Life</span>
        <span style={{ color }} className="text-xs font-semibold">
          {label}
        </span>
      </div>
      <div className="relative h-6 w-full overflow-hidden rounded-full border border-divider bg-background">
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{ width: `${rul}%`, background: color }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-foreground/80">
          {rul.toFixed(1)} %
        </div>
      </div>
    </div>
  );
}

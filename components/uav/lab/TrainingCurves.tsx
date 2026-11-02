"use client";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import type { ResultRow } from "@/lib/uav/api";
import { palette, chart } from "@/lib/uav/palette";

const ARCH_COLORS: Record<string, string> = {
  lstm: palette.primary,
  transformer: palette.status.CRITICAL,
  cnn: palette.status.NOMINAL,
};

interface Props {
  rows: ResultRow[];
}

export default function TrainingCurves({ rows }: Props) {
  const datasets = Array.from(new Set(rows.map((r) => r.dataset)));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {datasets.map((ds) => {
        const subset = rows.filter((r) => r.dataset === ds);
        const maxEp = Math.max(...subset.map((r) => r.history.length));
        // Merge histories into one wide series keyed by epoch
        const merged = Array.from({ length: maxEp }, (_, i) => {
          const e: Record<string, number> = { epoch: i + 1 };
          for (const r of subset) {
            const h = r.history[i];
            if (h) e[r.arch] = h.val_rmse;
          }
          return e;
        });
        return (
          <div key={ds} className="rounded-2xl border border-divider bg-surface p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              {ds.toUpperCase()} · Validation RMSE
            </div>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={merged} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <XAxis dataKey="epoch" stroke={chart.grid} tick={{ fill: chart.axis, fontSize: 9 }} />
                  <YAxis stroke={chart.grid} tick={{ fill: chart.axis, fontSize: 9 }} />
                  <Tooltip
                    contentStyle={{
                      background: chart.tooltipBg,
                      border: `1px solid ${chart.tooltipBorder}`,
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                    labelStyle={{ color: palette.muted }}
                  />
                  <Legend wrapperStyle={{ fontSize: 10, color: palette.muted }} />
                  {subset.map((r) => (
                    <Line
                      key={r.arch}
                      type="monotone"
                      dataKey={r.arch}
                      stroke={ARCH_COLORS[r.arch]}
                      dot={false}
                      strokeWidth={1.6}
                      isAnimationActive={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}

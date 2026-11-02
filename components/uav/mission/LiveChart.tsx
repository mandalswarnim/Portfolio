"use client";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts";
import { useDash } from "@/lib/uav/store";
import { palette, chart } from "@/lib/uav/palette";

interface Props {
  metric: "thermal" | "vibration" | "power";
  color: string;
  label: string;
  threshold?: number;
}

export default function LiveChart({ metric, color, label, threshold }: Props) {
  const { history } = useDash();
  const data = history.map((f) => ({ t: f.t.toFixed(1), v: f[metric] }));

  return (
    <div className="h-full rounded-2xl border border-divider bg-surface p-3">
      <div className="mb-1 flex items-baseline justify-between text-[10px] uppercase tracking-wider text-subtle">
        <span>{label}</span>
        <span className="font-semibold" style={{ color }}>
          {data[data.length - 1]?.v.toFixed(2) ?? "—"}
        </span>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: -8 }}>
          <XAxis dataKey="t" tick={{ fill: chart.axis, fontSize: 9 }} stroke={chart.grid} />
          <YAxis tick={{ fill: chart.axis, fontSize: 9 }} stroke={chart.grid} />
          <Tooltip
            contentStyle={{
              background: chart.tooltipBg,
              border: `1px solid ${chart.tooltipBorder}`,
              borderRadius: 8,
              fontSize: 10,
            }}
            labelStyle={{ color: palette.muted }}
          />
          {threshold && <ReferenceLine y={threshold} stroke={palette.status.CRITICAL} strokeDasharray="3 3" />}
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

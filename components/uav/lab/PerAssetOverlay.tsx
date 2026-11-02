"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, Cell, Legend } from "recharts";
import { fetchAsset, type AssetDetail } from "@/lib/uav/api";
import { useDash } from "@/lib/uav/store";
import type { Asset } from "@/lib/uav/assets";
import { palette, chart } from "@/lib/uav/palette";

const ARCH_COLORS: Record<string, string> = {
  lstm: palette.primary,
  transformer: palette.status.CRITICAL,
  cnn: palette.status.NOMINAL,
};

export default function PerAssetOverlay() {
  const { assets, selectedId, select } = useDash();
  const [detail, setDetail] = useState<AssetDetail | null>(null);

  useEffect(() => {
    if (!selectedId) return;
    fetchAsset(selectedId)
      .then(setDetail)
      .catch(() => setDetail(null));
  }, [selectedId]);

  const cmapssAssets = assets.filter((a) => a.data_source === "C-MAPSS");
  const uavAssets = assets.filter((a) => a.data_source === "UAV-Synth");

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
      <div className="rounded-2xl border border-divider bg-surface p-3">
        <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-primary">Pick Asset</div>
        <Section title="C-MAPSS" items={cmapssAssets} selectedId={selectedId} onPick={select} />
        <Section title="UAV-Synth" items={uavAssets} selectedId={selectedId} onPick={select} />
      </div>

      <div className="rounded-2xl border border-divider bg-surface p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Per-Architecture Prediction
          </span>
          <span className="text-xs text-subtle">{detail ? `${detail.name} (${detail.id})` : "—"}</span>
        </div>
        <div className="h-[260px]">
          {detail?.predictions_per_arch ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={Object.entries(detail.predictions_per_arch).map(([arch, value]) => ({
                  arch: arch.toUpperCase(),
                  value,
                  fill: ARCH_COLORS[arch] ?? palette.subtle,
                }))}
                margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
              >
                <XAxis dataKey="arch" stroke={chart.grid} tick={{ fill: palette.muted, fontSize: 11 }} />
                <YAxis stroke={chart.grid} tick={{ fill: chart.axis, fontSize: 9 }} />
                <Tooltip
                  contentStyle={{
                    background: chart.tooltipBg,
                    border: `1px solid ${chart.tooltipBorder}`,
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 10, color: palette.muted }} />
                {detail.rul_truth != null && (
                  <ReferenceLine
                    y={detail.rul_truth}
                    stroke={palette.muted}
                    strokeDasharray="4 3"
                    label={{
                      value: `truth=${detail.rul_truth.toFixed(1)}`,
                      fill: palette.muted,
                      fontSize: 10,
                      position: "right",
                    }}
                  />
                )}
                <Bar dataKey="value" name="Predicted RUL">
                  {Object.entries(detail.predictions_per_arch).map(([arch]) => (
                    <Cell key={arch} fill={ARCH_COLORS[arch]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : detail ? (
            <div className="flex h-full items-center justify-center text-xs text-subtle">
              UAV asset · per-arch predictions captured at inference time only
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-subtle">Loading…</div>
          )}
        </div>
        {detail && detail.rmse_per_arch && (
          <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
            {Object.entries(detail.rmse_per_arch).map(([arch, rmse]) => (
              <div key={arch} className="rounded-lg border border-divider bg-background px-2.5 py-1.5">
                <div className="uppercase tracking-wider text-subtle">{arch} test RMSE</div>
                <div className="text-xs font-semibold" style={{ color: ARCH_COLORS[arch] }}>
                  {rmse.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  items,
  selectedId,
  onPick,
}: {
  title: string;
  items: Asset[];
  selectedId: string | null;
  onPick: (id: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mb-3">
      <div className="mb-1 px-1 text-[10px] uppercase tracking-wider text-subtle">{title}</div>
      <div className="flex flex-col">
        {items.map((a) => (
          <button
            key={a.id}
            onClick={() => onPick(a.id)}
            className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-left text-[11px] transition-colors hover:bg-background ${
              a.id === selectedId ? "bg-background font-medium text-foreground" : "text-muted"
            }`}
          >
            <span>{a.name}</span>
            <span className="tabular-nums">{a.rul.toFixed(0)}%</span>
          </button>
        ))}
      </div>
    </div>
  );
}

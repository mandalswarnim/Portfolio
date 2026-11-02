"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDash } from "@/lib/uav/store";
import StatusBadge from "@/components/uav/StatusBadge";
import MaintenanceReadout from "@/components/uav/diagnostics/MaintenanceReadout";
import AttentionHeatmap from "@/components/uav/diagnostics/AttentionHeatmap";

const WireframeView = dynamic(() => import("@/components/uav/diagnostics/WireframeView"), { ssr: false });

export default function DiagnosticsPage() {
  const { assets, selectedId, select, details, loadDetail, fleetLoaded } = useDash();
  const sel = assets.find((a) => a.id === selectedId) ?? assets[0];
  const detail = sel ? (details[sel.id] ?? null) : null;

  useEffect(() => {
    if (sel) loadDetail(sel.id);
  }, [sel, loadDetail]);

  if (!fleetLoaded) {
    return <div className="mx-auto max-w-7xl px-6 py-12 text-sm text-subtle">Loading fleet roster…</div>;
  }
  if (!sel) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12 text-sm text-subtle">Fleet empty — no baked artifacts found.</div>
    );
  }

  // Anomaly is augmented with detail.anomaly when loaded (richer than manifest).
  const assetForView = detail ? { ...sel, anomaly: detail.anomaly ?? null } : sel;

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-8 lg:grid-cols-[220px_1fr_360px]">
      {/* Asset picker */}
      <aside className="flex flex-col rounded-2xl border border-divider bg-surface lg:max-h-[640px]">
        <div className="border-b border-divider px-4 py-3 text-xs font-semibold uppercase tracking-wider text-primary">
          Subject
        </div>
        <div className="max-h-[280px] flex-1 overflow-y-auto lg:max-h-none">
          {assets.map((a) => (
            <button
              key={a.id}
              onClick={() => select(a.id)}
              className={`block w-full border-b border-divider/60 px-4 py-2.5 text-left text-[11px] transition-colors hover:bg-background/70 ${
                a.id === selectedId ? "bg-background text-foreground" : "text-muted"
              }`}
            >
              <div className="flex justify-between">
                <span className="font-medium">{a.name}</span>
                <span className="tabular-nums">{a.rul.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between text-[9px] text-subtle">
                <span>{a.id}</span>
                <span>{a.data_source}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Center column: 3D wireframe + attention heatmap stacked */}
      <section className="flex flex-col gap-4">
        <div className="relative h-[320px] overflow-hidden rounded-2xl border border-divider bg-surface lg:h-[400px]">
          <div className="absolute left-4 top-3 z-10 text-xs font-semibold uppercase tracking-wider text-primary">
            Digital Twin · Wireframe · XAI Overlay
          </div>
          <div className="absolute right-4 top-3 z-10 flex gap-3 text-[10px] font-medium uppercase tracking-wider">
            <span className="text-status-nominal">● Healthy</span>
            <span className="text-status-critical">● Anomaly</span>
          </div>
          <WireframeView asset={assetForView} />
        </div>

        <div className="rounded-2xl border border-divider bg-surface p-4">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Self-Attention (Transformer) · Time × Time
            </span>
            <span className="text-xs text-subtle">
              {detail?.attention_2d ? `T = ${detail.attention_2d.length}` : ""}
            </span>
          </div>
          <AttentionHeatmap matrix={detail?.attention_2d ?? null} height={180} />
        </div>
      </section>

      {/* Right column: dossier */}
      <aside className="flex flex-col rounded-2xl border border-divider bg-surface p-5">
        <div className="font-serif text-2xl font-bold text-foreground">{sel.name}</div>
        <div className="text-[11px] text-subtle">
          {sel.id} · {sel.class} · <span className="text-primary">{sel.data_source}</span>
        </div>
        <div className="mb-4 mt-2 flex items-center gap-2">
          <StatusBadge status={sel.status} />
          <span className="text-[11px] text-subtle">RUL {sel.rul.toFixed(1)}%</span>
        </div>
        <MaintenanceReadout detail={detail} />
      </aside>
    </div>
  );
}

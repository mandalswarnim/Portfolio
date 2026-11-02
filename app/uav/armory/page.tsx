"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";
import { useDash } from "@/lib/uav/store";
import StatusBadge from "@/components/uav/StatusBadge";
import { palette } from "@/lib/uav/palette";

const AssetCarousel = dynamic(() => import("@/components/uav/armory/AssetCarousel"), { ssr: false });

export default function ArmoryPage() {
  const { assets, selectedId, select, details, loadDetail, fleetLoaded, fleetError } = useDash();
  const sel = assets.find((a) => a.id === selectedId) ?? null;
  const detail = sel ? (details[sel.id] ?? null) : null;

  useEffect(() => {
    if (sel) loadDetail(sel.id);
  }, [sel, loadDetail]);

  if (fleetError) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12 text-sm text-status-critical">Fleet load failed: {fleetError}</div>
    );
  }
  if (!fleetLoaded || assets.length === 0) {
    return <div className="mx-auto max-w-7xl px-6 py-12 text-sm text-subtle">Loading fleet roster…</div>;
  }

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-8 lg:grid-cols-[280px_1fr_320px]">
      {/* Asset list */}
      <aside className="flex flex-col rounded-2xl border border-divider bg-surface lg:max-h-[600px]">
        <div className="border-b border-divider px-4 py-3 text-xs font-semibold uppercase tracking-wider text-primary">
          Fleet Roster · {assets.length}
        </div>
        <div className="max-h-[320px] flex-1 overflow-y-auto lg:max-h-none">
          {assets.map((a) => (
            <button
              key={a.id}
              onClick={() => select(a.id)}
              className={`block w-full border-b border-divider/60 px-4 py-3 text-left transition-colors hover:bg-background/70 ${
                a.id === selectedId ? "bg-background" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground">{a.name}</span>
                <StatusBadge status={a.status} />
              </div>
              <div className="mt-1 flex justify-between text-[11px] text-subtle">
                <span>{a.id}</span>
                <span>RUL {a.rul.toFixed(0)}%</span>
              </div>
              <div className="mt-0.5 flex justify-between text-[10px] text-subtle/80">
                <span>{a.class}</span>
                <span>{a.data_source}</span>
              </div>
              <div className="mt-1.5 h-1 w-full rounded-full bg-divider/60">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, a.rul)}%`,
                    background: palette.status[a.status],
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* 3D carousel */}
      <section className="relative overflow-hidden rounded-2xl border border-divider bg-surface">
        <div className="absolute left-4 top-3 z-10 text-xs font-semibold uppercase tracking-wider text-primary">
          Fleet Carousel · Drag to Rotate
        </div>
        <div className="absolute right-4 top-3 z-10 flex gap-3 text-[10px] font-medium uppercase tracking-wider">
          <span className="text-status-nominal">● Nominal</span>
          <span className="text-status-warning">● Warning</span>
          <span className="text-status-critical">● Critical</span>
        </div>
        <div className="h-[420px] w-full lg:h-[600px]">
          <AssetCarousel />
        </div>
      </section>

      {/* Selected detail */}
      <aside className="flex flex-col rounded-2xl border border-divider bg-surface lg:max-h-[600px]">
        <div className="border-b border-divider px-4 py-3 text-xs font-semibold uppercase tracking-wider text-primary">
          Dossier
        </div>
        {!sel ? (
          <div className="p-4 text-sm text-subtle">Select an asset.</div>
        ) : (
          <div className="flex flex-1 flex-col overflow-y-auto p-4">
            <div className="font-serif text-2xl font-bold text-foreground">{sel.name}</div>
            <div className="text-[11px] text-subtle">
              {sel.id} · {sel.class} · <span className="text-primary">{sel.data_source}</span>
            </div>
            <div className="mt-3">
              <StatusBadge status={sel.status} />
            </div>

            <div className="mt-4 space-y-2 text-[11px]">
              <Row k="RUL (predicted)" v={`${sel.rul.toFixed(1)} %`} />
              {detail?.rul_truth != null && <Row k="RUL (truth)" v={`${detail.rul_truth.toFixed(1)} %`} />}
              {detail?.best_arch && <Row k="Best model" v={detail.best_arch.toUpperCase()} />}
              {detail?.subset && <Row k="C-MAPSS subset" v={`${detail.subset} · unit ${detail.unit}`} />}
              {detail?.flight && <Row k="Flight" v={detail.flight.flight_id} />}
              {detail?.anomaly && (
                <>
                  <Row k="Anomaly" v={detail.anomaly.component} alert />
                  <Row k="Severity" v={`${(detail.anomaly.severity * 100).toFixed(0)}%`} alert />
                  <div className="mt-2 rounded-xl border border-status-critical/30 bg-status-critical/5 p-3 text-[11px] leading-relaxed text-status-critical">
                    {detail.anomaly.note}
                  </div>
                </>
              )}
            </div>

            <div className="mt-auto flex flex-col gap-2 pt-5">
              <CtaLink href="/uav/mission">Deploy → Mission</CtaLink>
              <CtaLink href="/uav/diagnostics">Review → Digital Twin</CtaLink>
              <CtaLink href="/uav/lab">Model Lab →</CtaLink>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function CtaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-divider px-5 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
    >
      {children}
    </Link>
  );
}

function Row({ k, v, alert }: { k: string; v: string; alert?: boolean }) {
  return (
    <div
      className={`flex justify-between gap-2 border-b border-divider/60 pb-1.5 ${alert ? "text-status-critical" : "text-foreground"}`}
    >
      <span className={alert ? "text-status-critical/80" : "text-subtle"}>{k}</span>
      <span className="text-right font-medium">{v}</span>
    </div>
  );
}

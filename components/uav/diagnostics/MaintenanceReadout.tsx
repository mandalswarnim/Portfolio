"use client";
import type { AssetDetail } from "@/lib/uav/api";
import { palette } from "@/lib/uav/palette";

interface Props {
  detail: AssetDetail | null;
}

export default function MaintenanceReadout({ detail }: Props) {
  if (!detail) {
    return <div className="text-xs text-subtle">Loading dossier from baked artifacts…</div>;
  }

  const sev = detail.anomaly?.severity ?? 0;
  const action = !detail.anomaly
    ? "No action required. Continue scheduled inspections."
    : sev > 0.8
      ? "Ground immediately. Replace affected component before next sortie."
      : sev > 0.5
        ? "Schedule depot-level maintenance within 48 hours."
        : "Monitor next 3 sorties; recheck telemetry trend.";

  // Top-N most-influential sensors from per-feature IG attribution.
  const importance = detail.sensor_importance ?? [];
  const ranked = importance
    .map((v, i) => ({ name: detail.sensor_names[i] ?? `f${i}`, v }))
    .sort((a, b) => b.v - a.v)
    .slice(0, 8);

  return (
    <div className="space-y-4">
      <Section title="AI Classification">
        <p className="text-xs leading-relaxed text-muted">
          {detail.data_source === "C-MAPSS"
            ? "Transformer + LSTM ensemble attributes RUL drop primarily to "
            : "UAV PdM model classifies fault as "}
          <span className="font-medium text-status-critical">
            {detail.anomaly?.component ?? "no anomalous channel"}
          </span>
          .
          {detail.anomaly?.predicted_fault && (
            <>
              {" "}
              Predicted fault class:{" "}
              <span className="font-medium text-status-warning">{detail.anomaly.predicted_fault}</span>
              {detail.anomaly.true_fault && <> (truth: {detail.anomaly.true_fault})</>}.
            </>
          )}
        </p>
      </Section>

      <Section title="Forecast">
        <Row k="Pred. RUL" v={`${detail.rul.toFixed(1)} u`} alert={detail.rul < 35} />
        <Row k="Truth RUL" v={detail.rul_truth != null ? `${detail.rul_truth.toFixed(1)} u` : "—"} />
        <Row k="Best model" v={detail.best_arch?.toUpperCase() ?? "—"} />
        {detail.predictions_per_arch && (
          <>
            <Row k="LSTM pred" v={fmtMaybe(detail.predictions_per_arch.lstm)} />
            <Row k="Transformer pred" v={fmtMaybe(detail.predictions_per_arch.transformer)} />
            <Row k="CNN pred" v={fmtMaybe(detail.predictions_per_arch.cnn)} />
          </>
        )}
        <Row k="Failure mode" v={detail.anomaly?.note ?? "—"} />
      </Section>

      <Section title="Prescribed Action">
        <p
          className={`text-xs leading-relaxed ${
            sev > 0.8 ? "text-status-critical" : sev > 0.5 ? "text-status-warning" : "text-status-nominal"
          }`}
        >
          {action}
        </p>
      </Section>

      <Section title="Sensor Contributions · Integrated Gradients">
        {ranked.length === 0 ? (
          <div className="text-[10px] text-subtle">No attribution available.</div>
        ) : (
          ranked.map((s, i) => (
            <Bar
              key={s.name}
              label={s.name}
              v={s.v}
              color={i === 0 ? palette.status.CRITICAL : i === 1 ? palette.status.WARNING : palette.primary}
            />
          ))
        )}
      </Section>
    </div>
  );
}

const fmtMaybe = (v: number | undefined) => (v == null ? "—" : v.toFixed(2));

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-divider pl-3">
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">{title}</div>
      {children}
    </div>
  );
}

function Row({ k, v, alert }: { k: string; v: string; alert?: boolean }) {
  return (
    <div
      className={`flex justify-between gap-2 border-b border-divider/60 py-1 text-[11px] ${alert ? "text-status-critical" : "text-foreground"}`}
    >
      <span className={alert ? "text-status-critical/80" : "text-subtle"}>{k}</span>
      <span className="text-right font-medium">{v}</span>
    </div>
  );
}

function Bar({ label, v, color }: { label: string; v: number; color: string }) {
  return (
    <div className="my-1.5">
      <div className="flex justify-between text-[10px] text-subtle">
        <span>{label}</span>
        <span className="font-medium" style={{ color }}>
          {(v * 100).toFixed(0)}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-divider/50">
        <div className="h-full rounded-full" style={{ width: `${v * 100}%`, background: color }} />
      </div>
    </div>
  );
}

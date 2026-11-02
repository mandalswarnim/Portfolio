"use client";
import { useDash } from "@/lib/uav/store";

const fmt = (n: number, d = 0) => n.toFixed(d).padStart(d > 0 ? 5 : 4, "0");

export default function TelemetryPanel() {
  const { current } = useDash();
  const c = current ?? { speed: 0, altitude: 0, thermal: 18, power: 0, vibration: 0, t: 0, rul: 100 };
  const thermalAlert = c.thermal > 78;
  const vibAlert = c.vibration > 1.4;

  return (
    <div className="grid grid-cols-2 gap-2">
      <Cell label="Speed" value={fmt(c.speed)} unit="kts" />
      <Cell label="Altitude" value={fmt(c.altitude)} unit="ft" />
      <Cell label="Thermal" value={fmt(c.thermal, 1)} unit="°C" alert={thermalAlert} />
      <Cell label="Power" value={fmt(c.power, 1)} unit="A" />
      <Cell label="Vibration" value={fmt(c.vibration, 2)} unit="g" alert={vibAlert} />
      <Cell label="Mission T+" value={fmt(c.t, 1)} unit="s" />
    </div>
  );
}

function Cell({ label, value, unit, alert }: { label: string; value: string; unit: string; alert?: boolean }) {
  return (
    <div
      className={`rounded-xl border px-3 py-2 ${
        alert
          ? "border-status-critical/40 bg-status-critical/5 text-status-critical"
          : "border-divider bg-background text-foreground"
      }`}
    >
      <div className={`text-[10px] uppercase tracking-wider ${alert ? "text-status-critical/80" : "text-subtle"}`}>
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold tabular-nums">{value}</span>
        <span className={`text-[10px] uppercase ${alert ? "text-status-critical/80" : "text-subtle"}`}>{unit}</span>
      </div>
    </div>
  );
}

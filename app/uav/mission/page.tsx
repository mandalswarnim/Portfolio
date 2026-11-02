"use client";
import dynamic from "next/dynamic";
import { useDash } from "@/lib/uav/store";
import { useTelemetryStream } from "@/lib/uav/telemetry";
import TelemetryPanel from "@/components/uav/mission/TelemetryPanel";
import HealthBar from "@/components/uav/mission/HealthBar";
import LiveChart from "@/components/uav/mission/LiveChart";
import StatusBadge from "@/components/uav/StatusBadge";
import { chart } from "@/lib/uav/palette";

const Radar = dynamic(() => import("@/components/uav/mission/Radar"), { ssr: false });

export default function MissionPage() {
  const { assets, selectedId, missionRunning, startMission, stopMission, resetMission, current } = useDash();
  const sel = assets.find((a) => a.id === selectedId);

  // Client-side procedural flight simulator
  useTelemetryStream(250);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-8 lg:grid-cols-[1fr_360px]">
      {/* Left: radar + charts */}
      <section className="flex flex-col gap-4">
        <div className="relative h-[340px] overflow-hidden rounded-2xl border border-divider bg-surface lg:h-[420px]">
          <div className="absolute left-4 top-3 z-10 text-xs font-semibold uppercase tracking-wider text-primary">
            Tactical Radar · 360° Sweep
          </div>
          <div className="absolute right-4 top-3 z-10 flex gap-3 text-[10px] font-medium uppercase tracking-wider">
            <span className="text-primary">● Ally</span>
            <span className="text-status-nominal">● Unknown</span>
            <span className="text-status-critical">● Hostile</span>
          </div>
          <Radar />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:h-[180px]">
          <div className="h-[160px] sm:h-auto">
            <LiveChart metric="thermal" color={chart.thermal} label="Thermal °C" threshold={80} />
          </div>
          <div className="h-[160px] sm:h-auto">
            <LiveChart metric="vibration" color={chart.vibration} label="Vibration g" threshold={1.0} />
          </div>
          <div className="h-[160px] sm:h-auto">
            <LiveChart metric="power" color={chart.series} label="Power A" />
          </div>
        </div>
      </section>

      {/* Right: status column */}
      <aside className="flex flex-col gap-4">
        <div className="rounded-2xl border border-divider bg-surface p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Active Asset</div>
          {sel ? (
            <>
              <div className="mt-1 font-serif text-2xl font-bold text-foreground">{sel.name}</div>
              <div className="text-[11px] text-subtle">
                {sel.id} · {sel.class} · <span className="text-primary">{sel.data_source}</span>
              </div>
              <div className="mt-2">
                <StatusBadge status={sel.status} />
              </div>
            </>
          ) : (
            <div className="mt-1 text-sm text-subtle">No asset selected — pick one in the Armory.</div>
          )}
        </div>

        <div className="rounded-2xl border border-divider bg-surface p-4">
          <HealthBar />
        </div>

        <div className="rounded-2xl border border-divider bg-surface p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">Live Telemetry Stream</div>
          <TelemetryPanel />
          <p className="mt-3 text-[11px] leading-relaxed text-subtle">
            Frames driven by a client-side flight envelope; Remaining Useful Life erodes through a heuristic degradation
            model reacting to thermal and vibration excursions.
          </p>
        </div>

        <div className="rounded-2xl border border-divider bg-surface p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Mission Control</div>
          <div className="flex flex-wrap gap-2">
            {!missionRunning ? (
              <button
                onClick={startMission}
                className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/80"
              >
                ▶ Deploy
              </button>
            ) : (
              <button
                onClick={stopMission}
                className="rounded-full border border-status-warning/40 bg-status-warning/10 px-5 py-2.5 text-sm font-medium text-status-warning transition-colors hover:bg-status-warning/20"
              >
                ■ Hold
              </button>
            )}
            <button
              onClick={resetMission}
              className="rounded-full border border-divider px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {current && current.rul < 50 && (
          <div className="rounded-2xl border border-status-critical/30 bg-status-critical/5 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-status-critical">AI Advisory</div>
            <p className="mt-1 text-xs leading-relaxed text-status-critical">
              Heuristic envelope reports accelerated wear. RUL projected below 50%. Recommend return to base and CBM+
              inspection.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

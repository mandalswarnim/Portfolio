import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";

const tiles = [
  {
    href: "/uav/armory",
    title: "The Armory",
    sub: "Fleet Inventory · Asset Selection",
    desc: "Interactive 3D carousel of all UAV and missile platforms. Inspect health, Remaining Useful Life, and select an asset to deploy.",
  },
  {
    href: "/uav/mission",
    title: "The Mission",
    sub: "Live Deployment · Real-Time Telemetry",
    desc: "Tactical view with live radar sweep, streaming sensor telemetry, and dynamic Remaining Useful Life forecasting.",
  },
  {
    href: "/uav/diagnostics",
    title: "The Digital Twin",
    sub: "Post-Flight Diagnostics · XAI Overlay",
    desc: "Interactive 3D wireframe with anomaly highlighting, Transformer attention heatmap, and prescriptive maintenance recommendations.",
  },
  {
    href: "/uav/lab",
    title: "The Model Lab",
    sub: "LSTM × Transformer × 1D-CNN · C-MAPSS + UAV",
    desc: "Architecture comparison with RMSE, PHM 2008 score, training curves, and per-asset prediction overlays.",
  },
];

export default function UavHome() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <FadeIn>
        <p className="text-sm font-medium text-primary uppercase tracking-widest mb-6">
          Deep Learning · Predictive Maintenance
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
          UAV Predictive Maintenance
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
          An AI-driven Condition-Based Maintenance Plus (CBM+) digital twin. LSTM, Transformer, and 1D-CNN models ingest
          vibration, thermal, and power telemetry to forecast Remaining Useful Life across a tactical fleet — trained on
          the NASA C-MAPSS turbofan benchmark and a synthesized multirotor UAV fleet.
        </p>
      </FadeIn>

      <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {tiles.map((t) => (
          <StaggerItem key={t.href}>
            <Link href={t.href} className="group block h-full">
              <div className="flex h-full flex-col rounded-2xl border border-divider bg-surface p-6 transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">{t.sub}</span>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-3">{t.title}</h2>
                <p className="text-sm leading-relaxed text-muted flex-1">{t.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                  Explore →
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}

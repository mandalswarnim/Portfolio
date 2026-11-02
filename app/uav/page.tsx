import Link from "next/link";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import Chapters from "@/components/home/Chapters";
import {
  arrow,
  btnDark,
  btnOutlineDark,
  CARD_TONES,
  CHARCOAL,
  CREAM,
  display,
  PageHero,
  SectionHead,
} from "@/components/PageSections";
import results from "@/public/uav/data/results.json";

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

// Headline numbers come straight from the baked evaluation results.
const best = (dataset: string) => results.find((r) => r.dataset === dataset && r.arch === "transformer")!;
const stats = [
  { value: best("cmapss").rmse.toFixed(2), label: "RMSE on held-out NASA C-MAPSS engines", note: "Transformer" },
  { value: `${(best("uav").fault_acc! * 100).toFixed(1)}%`, label: "Fault-classification accuracy", note: "UAV fleet" },
  { value: "3", label: "Architectures compared", note: "LSTM · Transformer · 1D-CNN" },
];

export default function UavHome() {
  return (
    <Chapters initial={CREAM}>
      <PageHero
        eyebrow="Deep Learning · Predictive Maintenance"
        lines={["UAV Predictive", "Maintenance"]}
        lead={
          <>
            An AI-driven Condition-Based Maintenance Plus (CBM+) digital twin. LSTM, Transformer, and 1D-CNN models
            ingest vibration, thermal, and power telemetry to forecast Remaining Useful Life across a tactical fleet —
            trained on the NASA C-MAPSS turbofan benchmark and a synthesized multirotor UAV fleet.
          </>
        }
      >
        <Link href="/uav/mission" className={btnDark}>
          Launch the mission {arrow}
        </Link>
        <Link href="/uav/lab" className={btnOutlineDark}>
          See the models
        </Link>
      </PageHero>

      {/* ── Results ──────────────────────────────────────── */}
      <section data-bg={CHARCOAL} className="py-28 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead light eyebrow="01 / Results" lines={["What the", "models achieved"]} />
          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {stats.map((s, i) => (
              <StaggerItem key={s.label} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-[2rem] p-8 ${
                    i === 0 ? "bg-accent text-charcoal" : i === 1 ? "bg-primary text-white" : "border border-white/25"
                  }`}
                >
                  <span className="mb-8 font-mono text-xs uppercase tracking-[0.2em] opacity-60">{s.note}</span>
                  <span className={`${display} text-6xl md:text-7xl`}>{s.value}</span>
                  <span className="mt-4 text-sm leading-relaxed opacity-80">{s.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Explore ──────────────────────────────────────── */}
      <section data-bg={CREAM} className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow="02 / Explore" lines={["Inside the", "digital twin"]} />
          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {tiles.map((t, i) => (
              <StaggerItem key={t.href} className="h-full">
                <Link
                  href={t.href}
                  className={`group flex h-full min-h-[300px] flex-col rounded-[2rem] p-8 transition-transform duration-500 ease-out hover:-translate-y-2 ${CARD_TONES[i % CARD_TONES.length]}`}
                >
                  <span className="mb-auto font-mono text-xs uppercase tracking-[0.2em] opacity-60">
                    {String(i + 1).padStart(2, "0")} · {t.sub}
                  </span>
                  <h2 className={`mb-3 mt-10 ${display} text-3xl md:text-4xl`}>{t.title}</h2>
                  <p className="text-sm leading-relaxed opacity-80">{t.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">Explore {arrow}</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </Chapters>
  );
}

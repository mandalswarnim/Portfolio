import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import { GITHUB_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work — Swarnim Mandal",
  description: "Projects and open-source work by Swarnim Mandal: voice agents, predictive models and full-stack apps.",
};

type Project = {
  category: string;
  title: string;
  desc: string;
  result?: string; // one-line measured outcome
  tech: string[];
  link?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    category: "Conversational AI",
    title: "AI Receptionist",
    desc: "A production-ready AI receptionist that answers business calls 24/7, captures customer and booking details through natural conversation, and emails structured leads the moment a call ends. Built on Twilio voice, OpenAI, Express, and Prisma — available to integrate into your business.",
    result: "Live demo on this site, 100+ automated tests, now being demonstrated to prospective UK pub customers.",
    tech: ["TypeScript", "OpenAI", "Twilio", "Express", "Prisma"],
    link: "https://github.com/mandalswarnim/ai-receptionist",
    demo: "/ai-receptionist",
  },
  {
    category: "Aerospace Engineering",
    title: "Airfoil Selector for Wind Turbines",
    desc: "A tool that ranks airfoil designs for small vertical-axis wind turbines by annual energy production at a specific site — pairing real wind statistics with NeuralFoil surrogate aerodynamics and generating explainable reports on why one design outperforms another.",
    tech: ["Python", "NeuralFoil", "Gradio", "AeroSandbox"],
    link: "https://github.com/mandalswarnim/Airfoil-Selector-for-Wind-Turbines",
    demo: "https://huggingface.co/spaces/mswanrim1/VAWT-Airfoil-Selector",
  },
  {
    category: "Deep Learning",
    title: "UAV Predictive Maintenance Digital Twin",
    desc: "LSTM, Transformer, and 1D-CNN models forecasting Remaining Useful Life on the NASA C-MAPSS turbofan benchmark and a synthesized multirotor UAV fleet — served as an interactive digital twin with 3D fleet views, live telemetry, and explainable-AI diagnostics.",
    result: "Transformer reached 14.12 RMSE on held-out NASA C-MAPSS engines and 97.4% fault-classification accuracy on the UAV fleet.",
    tech: ["PyTorch", "Next.js", "Three.js", "Transformers"],
    link: "https://github.com/mandalswarnim/uav-pdm-dashboard",
    demo: "/uav",
  },
  {
    category: "Deep Learning",
    title: "Guitar Tablature Generation",
    desc: "LSTM and feed-forward neural network that predicts optimal guitar tablatures for any input melody — modelling musical intention and fretting difficulty from training data probabilities.",
    tech: ["Python", "TensorFlow", "Keras"],
    link: "https://github.com/mandalswarnim/Guitar-Tablature-Generation",
  },
  {
    category: "Machine Learning",
    title: "Heart Disease Prediction",
    desc: "Logistic regression model predicting heart disease likelihood in COVID-19 patients, using clinical and demographic factors including age, smoking status, and cholesterol levels.",
    tech: ["Python", "Scikit-Learn", "Seaborn", "Matplotlib"],
    link: "https://github.com/mandalswarnim/Heart_Disease_Prediction",
  },
  {
    category: "Deep Learning",
    title: "Music Genre Classification",
    desc: "CNN model classifying audio files into 10 genres using MFCC features extracted from the GTZAN dataset, with custom preprocessing and normalisation.",
    result: "79% accuracy across 10 genres on GTZAN.",
    tech: ["Python", "PyTorch", "Librosa"],
  },
];

export default function Work() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="py-24 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-6">
              Work
            </p>
            <TextReveal
              lines={["What I build"]}
              className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6"
            />
            <p className="text-lg text-muted max-w-2xl leading-relaxed">
              A selection of what I&apos;ve built, from a real-time AI voice agent to deep-learning
              models and the full-stack apps that put them in front of people.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────── */}
      <section className="py-24 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-14">
              Featured Projects
            </h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <StaggerItem key={project.title}>
                <div className="flex flex-col bg-surface rounded-2xl p-6 border border-divider hover:border-foreground/20 hover:shadow-md transition-all h-full">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-medium text-foreground leading-snug mb-3">
                    {project.title}
                  </h3>
                  <p className={`text-sm text-muted leading-relaxed flex-1 ${project.result ? "mb-4" : "mb-6"}`}>
                    {project.desc}
                  </p>
                  {project.result && (
                    <p className="text-sm text-foreground leading-relaxed mb-6">
                      <span className="font-medium text-primary">Result:</span> {project.result}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-background text-subtle border border-divider px-2.5 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    {project.demo &&
                      (/^https?:\/\//.test(project.demo) ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-foreground text-background text-sm font-medium px-4 py-2 rounded-full hover:bg-foreground/80 transition-colors"
                        >
                          Try me →
                        </a>
                      ) : (
                        <Link
                          href={project.demo}
                          className="inline-flex items-center bg-foreground text-background text-sm font-medium px-4 py-2 rounded-full hover:bg-foreground/80 transition-colors"
                        >
                          Try me →
                        </Link>
                      ))}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        View on GitHub <span className="text-xs">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="mt-8">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-divider text-foreground text-sm font-medium px-5 py-2.5 rounded-full hover:border-foreground/40 transition-colors"
              >
                All repositories on GitHub ↗
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                  Like what you see?
                </h2>
                <p className="text-muted">Open to junior and graduate software, backend and AI engineering roles.</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center bg-foreground text-background text-sm font-medium px-6 py-3 rounded-full hover:bg-foreground/80 transition-colors whitespace-nowrap"
              >
                Get in touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}

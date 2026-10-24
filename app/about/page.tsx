import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import { CONTACT_EMAIL, CV_DOWNLOAD_NAME, CV_PATH, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Swarnim Mandal",
  description:
    "AI / software engineer in London. MSc Software Engineering (Distinction), University of West London. Builds voice agents, predictive models and full-stack apps.",
};

const skills = [
  { category: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
  {
    category: "Backend & APIs",
    items: ["Node.js", "Express", "FastAPI", "Django REST Framework", "REST API design", "WebSockets", "Webhooks", "Zod"],
  },
  { category: "Databases", items: ["PostgreSQL", "Prisma ORM", "MySQL", "MongoDB"] },
  {
    category: "AI & Machine Learning",
    items: ["OpenAI API", "Deepgram", "ElevenLabs", "Twilio ConversationRelay", "PyTorch", "scikit-learn", "pandas", "NumPy", "TensorFlow / Keras", "Hugging Face", "Captum"],
  },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Three.js"] },
  {
    category: "Testing & Delivery",
    items: ["Git", "GitHub Actions (CI/CD)", "Vitest", "ESLint", "Strict TypeScript", "Docker", "Vercel", "Jira"],
  },
];

const timeline = [
  {
    period: "Feb 2025 — Jul 2026",
    role: "MSc Software Engineering",
    org: "University of West London",
    location: "London, England",
    type: "education",
    points: [
      "Completed with Distinction.",
      "Dissertation: deep-learning predictive maintenance for military UAV fleets (LSTM, 1D-CNN, Transformer) — the basis of ARES PdM.",
    ],
  },
  {
    period: "Feb 2025 — Present",
    role: "Receptionist, Front of House",
    org: "The Oriental Club",
    location: "London, UK",
    type: "work",
    points: [
      "Wrote four standard operating procedures that the front-of-house team has adopted.",
      "Use Salesforce, SevenRooms and Cloudbeds daily at a London private members’ club.",
      "Produce daily reconciliation reports and weekly bedroom-revenue forecasts for management.",
      "Engage with high-profile members including diplomats and business leaders, strengthening stakeholder communication.",
    ],
  },
  {
    period: "Feb 2025 — Present",
    role: "Business Development Manager (part-time)",
    org: "Elite Professionals Team Ltd",
    location: "London, UK",
    type: "work",
    points: [
      "Won staffing contracts with hospitality clients including InterContinental London – The O2 and London Marriott Hotel Marble Arch.",
      "Agree each client’s staffing requirements and supply trained staff to meet them.",
    ],
  },
  {
    period: "Jan 2024 — Dec 2024",
    role: "Full-Stack Developer",
    org: "Aankhijhyal Technologies",
    location: "Pokhara, Nepal",
    type: "work",
    points: [
      "Built responsive React interfaces backed by Django REST APIs as part of a 15–20 person team delivering outsourced software for a US healthcare client.",
      "Optimised the database queries behind key pages, contributing to a 12% reduction in their page-load times.",
      "Shipped production releases through GitHub Actions CI/CD pipelines, and diagnosed and fixed defects across the front end, API and database layers.",
    ],
  },
  {
    period: "Sep 2023 — Dec 2023",
    role: "UI Designer (Internship)",
    org: "Eversoft Group",
    location: "Pokhara, Nepal",
    type: "work",
    points: ["Designed user interfaces for projects built with Node.js and Flutter."],
  },
  {
    period: "Sep 2023 — Dec 2023",
    role: "Private Tutor — Grade 12",
    org: "Independent",
    location: "Pokhara, Nepal",
    type: "work",
    points: [
      "Delivered targeted instruction in Chemistry and Nepali, achieving a 100% NEB exam pass rate.",
      "Created customised study materials aligned with the NEB curriculum to address individual learning gaps.",
    ],
  },
  {
    period: "Apr 2022 — Jun 2022",
    role: "Data Analyst (Internship)",
    org: "Scertus",
    location: "Remote, Bengaluru, India",
    type: "work",
    points: [
      "Automated the extraction and cleaning of client datasets in Python (pandas).",
      "Built scikit-learn predictive models and statistical analyses to benchmark client business performance.",
    ],
  },
  {
    period: "Aug 2018 — Apr 2023",
    role: "B.Tech Computer Science & Engineering",
    org: "Jawaharlal Nehru Technological University Kakinada",
    location: "Kakinada, India",
    type: "education",
    points: ["First Class (CGPA 7.3/10). Comprehensive coursework across software engineering, algorithms, and emerging technologies."],
  },
];

export default function About() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="py-24 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <FadeIn>
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-6">
                  About
                </p>
                <TextReveal
                  lines={["Swarnim", "Mandal"]}
                  className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6"
                />
                <p className="text-lg text-muted leading-relaxed max-w-lg">
                  AI / software engineer in London. I build AI products that
                  run in production, and the well-tested backend and front-end
                  work around them. MSc Software Engineering with Distinction
                  from the University of West London.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.15} direction="left">
              <div className="bg-surface rounded-2xl p-8 border border-divider space-y-5">
                {[
                  { label: "Location", value: "London, United Kingdom" },
                  { label: "Education", value: "MSc Software Engineering, UWL — Distinction" },
                  { label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
                  { label: "GitHub", value: "mandalswarnim", href: GITHUB_URL },
                  { label: "LinkedIn", value: "swarnim-mandal", href: LINKEDIN_URL },
                  ...(CV_PATH ? [{ label: "CV", value: "Download PDF", href: CV_PATH }] : []),
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-start gap-4 border-b border-divider pb-5 last:border-0 last:pb-0">
                    <span className="text-sm text-subtle">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} download={item.label === "CV" ? CV_DOWNLOAD_NAME : undefined} rel="noopener noreferrer" className="text-sm text-foreground hover:text-primary transition-colors text-right">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm text-foreground text-right">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────── */}
      <section className="py-24 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-8">My story</h2>
              <div className="space-y-5 text-muted text-base leading-relaxed">
                <p>
                  I grew up in Pokhara, Nepal, studied Computer Science in India, and moved to London
                  in early 2025 for an MSc in Software Engineering at the University of West London,
                  which I finished with a Distinction in July 2026.
                </p>
                <p>
                  My first proper engineering job was a year at Aankhijhyal Technologies, in a team of
                  fifteen to twenty people building React front ends and Django REST APIs for a US
                  healthcare client. That year taught me that most of the work starts after the first
                  version ships: tracking down slow queries (we cut load times on key pages by around
                  12%), fixing bugs that run from the front end through the API to the database, and
                  getting releases out safely through CI. Before that I designed interfaces as an intern
                  at Eversoft and cleaned data and built small predictive models at Scertus.
                </p>
                <p>
                  Since moving to London I&apos;ve built two things I&apos;m proud of, and you can try
                  both on this site. One is an{" "}
                  <Link href="/ai-receptionist" className="text-primary hover:underline underline-offset-4">AI phone receptionist</Link>,
                  a real-time voice agent that answers a business&apos;s missed calls, works out what the
                  caller needs and emails it to the owner, with more than a hundred automated tests
                  behind it. The other is{" "}
                  <Link href="/uav" className="text-primary hover:underline underline-offset-4">ARES PdM</Link>,
                  my dissertation: deep-learning models that predict when engines and drone components
                  will fail, with a dashboard that shows which sensors drove each prediction.
                </p>
                <p>
                  Alongside that I work front of house at the Oriental Club, a London private
                  members&apos; club, and part-time in business development for Elite Professionals
                  Team, where I&apos;ve won staffing contracts with hotels like the InterContinental at
                  The O2 and the Marriott at Marble Arch. Neither is an engineering job, but both have
                  taught me things engineering needs: writing procedures that other people actually
                  follow, living in tools like Salesforce, SevenRooms and Cloudbeds every day, and
                  sitting across from a client to work out what they really need.
                </p>
                <p>
                  What I&apos;m after now is a junior or graduate role building software, whether
                  that&apos;s backend, full-stack or AI applications, where I can keep shipping things
                  people use.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────── */}
      <section className="py-24 border-b border-divider bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-14">
              Skills & Technologies
            </h2>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {skills.map((group) => (
              <StaggerItem key={group.category}>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-subtle mb-5">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-sm bg-background text-muted border border-divider px-3 py-1.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────── */}
      <section className="py-24 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-14">
              Experience & Education
            </h2>
          </FadeIn>

          <div className="max-w-3xl space-y-0 divide-y divide-divider border-t border-divider">
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="py-8">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-medium text-foreground">{item.role}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-sm text-primary">{item.org}</span>
                        <span className="text-subtle text-xs">·</span>
                        <span className="text-sm text-subtle">{item.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${
                        item.type === "education"
                          ? "border-primary/30 text-primary bg-primary/5"
                          : "border-divider text-subtle bg-surface"
                      }`}>
                        {item.type === "education" ? "Education" : "Work"}
                      </span>
                      <span className="text-xs text-subtle font-mono whitespace-nowrap">{item.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mt-4">
                    {item.points.map((point, pi) => (
                      <li key={pi} className="flex gap-3 text-sm text-muted leading-relaxed">
                        <span className="text-divider mt-1.5 shrink-0">—</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="border-t border-divider" />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                  Let&apos;s work together
                </h2>
                <p className="text-muted">Open to roles, projects, and collaborations.</p>
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

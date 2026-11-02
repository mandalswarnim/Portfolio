import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import Chapters from "@/components/home/Chapters";
import {
  btnDark,
  btnOutlineDark,
  btnOutlineLight,
  CHARCOAL,
  CREAM,
  CtaBand,
  display,
  PageHero,
  SectionHead,
} from "@/components/PageSections";
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
    items: [
      "Node.js",
      "Express",
      "FastAPI",
      "Django REST Framework",
      "REST API design",
      "WebSockets",
      "Webhooks",
      "Zod",
    ],
  },
  { category: "Databases", items: ["PostgreSQL", "Prisma ORM", "MySQL", "MongoDB"] },
  {
    category: "AI & Machine Learning",
    items: [
      "OpenAI API",
      "Deepgram",
      "ElevenLabs",
      "Twilio ConversationRelay",
      "PyTorch",
      "scikit-learn",
      "pandas",
      "NumPy",
      "TensorFlow / Keras",
      "Hugging Face",
      "Captum",
    ],
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
    points: [
      "First Class (CGPA 7.3/10). Comprehensive coursework across software engineering, algorithms, and emerging technologies.",
    ],
  },
];

// Same colourways as the homepage "What I do" cards, each with a matching chip.
const SKILL_TONES = [
  { card: "bg-background text-charcoal", chip: "border-charcoal/15" },
  { card: "bg-accent text-charcoal", chip: "border-charcoal/20" },
  { card: "bg-primary text-white", chip: "border-white/30" },
  { card: "border border-white/25 text-white", chip: "border-white/25" },
];

const facts = [
  { label: "Location", value: "London, United Kingdom" },
  { label: "Education", value: "MSc Software Engineering, UWL — Distinction" },
  { label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: "GitHub", value: "mandalswarnim", href: GITHUB_URL },
  { label: "LinkedIn", value: "swarnim-mandal", href: LINKEDIN_URL },
  ...(CV_PATH ? [{ label: "CV", value: "Download PDF", href: CV_PATH }] : []),
];

export default function About() {
  return (
    <Chapters initial={CREAM}>
      <PageHero
        eyebrow="About · London, UK"
        lines={["Swarnim", "Mandal"]}
        lead={
          <>
            AI / software engineer in London. I build AI products that run in production, and the well-tested backend
            and front-end work around them. MSc Software Engineering with Distinction from the University of West
            London.
          </>
        }
        aside={
          <div className="rounded-[2rem] border border-charcoal/10 bg-white p-8 shadow-[0_24px_48px_-32px_rgba(30,30,30,0.35)]">
            {facts.map((item) => (
              <div
                key={item.label}
                className="flex items-start justify-between gap-4 border-b border-charcoal/10 py-4 first:pt-0 last:border-0 last:pb-0"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{item.label}</span>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    download={item.label === "CV" ? CV_DOWNLOAD_NAME : undefined}
                    rel="noopener noreferrer"
                    className="text-right text-sm font-medium text-charcoal transition-colors hover:text-primary"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-right text-sm font-medium text-charcoal">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        }
      >
        {CV_PATH && (
          <a href={CV_PATH} download={CV_DOWNLOAD_NAME} className={btnDark}>
            Download CV <span aria-hidden>↓</span>
          </a>
        )}
        <Link href="/work" className={btnOutlineDark}>
          See my work
        </Link>
      </PageHero>

      {/* ── Story ────────────────────────────────────────── */}
      <section data-bg={CREAM} className="py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead eyebrow="01 / Story" lines={["My", "story"]} className="" />
          </div>
          <FadeIn>
            <div className="space-y-6 text-lg leading-relaxed text-charcoal/75">
              <p>
                I grew up in Pokhara, Nepal, studied Computer Science in India, and moved to London in early 2025 for an
                MSc in Software Engineering at the University of West London, which I finished with a Distinction in
                July 2026.
              </p>
              <p>
                My first proper engineering job was a year at Aankhijhyal Technologies, in a team of fifteen to twenty
                people building React front ends and Django REST APIs for a US healthcare client. That year taught me
                that most of the work starts after the first version ships: tracking down slow queries (we cut load
                times on key pages by around 12%), fixing bugs that run from the front end through the API to the
                database, and getting releases out safely through CI. Before that I designed interfaces as an intern at
                Eversoft and cleaned data and built small predictive models at Scertus.
              </p>
              <p>
                Since moving to London I&apos;ve built two things I&apos;m proud of, and you can try both on this site.
                One is an{" "}
                <Link href="/ai-receptionist" className="text-primary hover:underline underline-offset-4">
                  AI phone receptionist
                </Link>
                , a real-time voice agent that answers a business&apos;s missed calls, works out what the caller needs
                and emails it to the owner, with more than a hundred automated tests behind it. The other is{" "}
                <Link href="/uav" className="text-primary hover:underline underline-offset-4">
                  ARES PdM
                </Link>
                , my dissertation: deep-learning models that predict when engines and drone components will fail, with a
                dashboard that shows which sensors drove each prediction.
              </p>
              <p>
                Alongside that I work front of house at the Oriental Club, a London private members&apos; club, and
                part-time in business development for Elite Professionals Team, where I&apos;ve won staffing contracts
                with hotels like the InterContinental at The O2 and the Marriott at Marble Arch. Neither is an
                engineering job, but both have taught me things engineering needs: writing procedures that other people
                actually follow, living in tools like Salesforce, SevenRooms and Cloudbeds every day, and sitting across
                from a client to work out what they really need.
              </p>
              <p>
                What I&apos;m after now is a junior or graduate role building software, whether that&apos;s backend,
                full-stack or AI applications, where I can keep shipping things people use.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────── */}
      <section data-bg={CHARCOAL} className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead light eyebrow="02 / Toolkit" lines={["Skills &", "technologies"]} />
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group, i) => (
              <StaggerItem key={group.category} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-[2rem] p-8 transition-transform duration-500 ease-out hover:-translate-y-2 ${SKILL_TONES[i % SKILL_TONES.length].card}`}
                >
                  <span className="mb-10 font-mono text-sm opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={`mb-5 ${display} text-2xl`}>{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-full border px-3 py-1 text-xs opacity-90 ${SKILL_TONES[i % SKILL_TONES.length].chip}`}
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
      <section data-bg={CREAM} className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow="03 / Path" lines={["Experience &", "education"]} />
          <div className="border-t border-charcoal/15">
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={Math.min(i, 4) * 0.05}>
                <div className="grid gap-4 border-b border-charcoal/15 py-10 md:grid-cols-[220px_1fr] md:gap-10">
                  <div className="flex flex-row flex-wrap items-center gap-3 md:flex-col md:items-start">
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-subtle">{item.period}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.type === "education" ? "bg-accent text-charcoal" : "bg-charcoal/5 text-charcoal/70"
                      }`}
                    >
                      {item.type === "education" ? "Education" : "Work"}
                    </span>
                  </div>
                  <div>
                    <h3 className={`${display} text-2xl text-charcoal md:text-3xl`}>{item.role}</h3>
                    <p className="mt-2 text-sm">
                      <span className="font-semibold text-primary">{item.org}</span>
                      <span className="text-subtle"> · {item.location}</span>
                    </p>
                    <ul className="mt-5 space-y-2">
                      {item.points.map((point, pi) => (
                        <li key={pi} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                          <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-primary/40" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBand lines={["Let’s work", "together"]} text="Open to roles, projects, and collaborations.">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={btnOutlineLight}>
          GitHub ↗
        </a>
      </CtaBand>
    </Chapters>
  );
}

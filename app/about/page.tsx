import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import { CONTACT_EMAIL, CV_PATH, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Swarnim Mandal",
  description:
    "MSc Software Engineering graduate of the University of West London. Full-stack developer and machine learning engineer based in London.",
};

const skills = [
  { category: "Languages", items: ["Python", "C#", "C", "Java", "Dart"] },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Django", "Node.js", "Flutter", "TensorFlow", "Keras", "PyTorch", "Selenium", "Beautiful Soup"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "GitHub", "Figma", "VS Code", "Talend", "Jira"],
  },
  { category: "Databases", items: ["MySQL", "MongoDB"] },
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
      "Advanced software development practices and cutting-edge engineering methods.",
      "Coursework spanning distributed systems, AI, and modern software architecture.",
    ],
  },
  {
    period: "Feb 2025 — Present",
    role: "Receptionist",
    org: "Oriental Club",
    location: "London, UK",
    type: "work",
    points: [
      "Engaged with high-profile members including diplomats and business leaders, strengthening stakeholder communication.",
      "Prepared daily management reports and assisted in revenue forecasting using data-driven insights.",
    ],
  },
  {
    period: "Jan 2024 — Dec 2024",
    role: "Full-Stack Developer",
    org: "Aankhijhyal Technologies",
    location: "Pokhara, Nepal",
    type: "work",
    points: [
      "Built responsive UIs with React & CSS, ensuring cross-device compatibility.",
      "Developed RESTful APIs and optimised databases using Django for seamless backend integration.",
      "Deployed applications via CI/CD pipelines, improving scalability and release reliability.",
    ],
  },
  {
    period: "Sep 2023 — Dec 2023",
    role: "UI/UX Designer",
    org: "Eversoft",
    location: "Pokhara, Nepal",
    type: "work",
    points: [
      "Contributed to a mobile application using Flutter, delivering end-to-end UI/UX solutions.",
      "Supported Node.js backend development and guided team members on best practices.",
    ],
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
    role: "Data Analyst",
    org: "Scretus",
    location: "Remote, Bengaluru, India",
    type: "work",
    points: [
      "Extracted, cleaned, and analysed datasets using automated tools, maintaining data integrity.",
      "Built predictive models and conducted statistical analysis to surface business performance trends.",
    ],
  },
  {
    period: "Aug 2018 — Apr 2023",
    role: "B.Tech Computer Science & Engineering",
    org: "Jawaharlal Nehru Technological University Kakinada",
    location: "Kakinada, India",
    type: "education",
    points: ["CGPA: 7.3/10. Comprehensive coursework across software engineering, algorithms, and emerging technologies."],
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
                  Software engineer with a background spanning full-stack
                  development, machine learning, and data analysis. Recently
                  completed an MSc at the University of West London.
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
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} download={item.label === "CV" || undefined} rel="noopener noreferrer" className="text-sm text-foreground hover:text-primary transition-colors text-right">
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
                  I grew up in Pokhara, Nepal, and pursued a Computer Science degree in India before
                  moving to London in early 2025 to study Software Engineering at the University of
                  West London. My path has taken me across three countries, four roles, and multiple
                  domains — from building production web apps to training neural networks that generate music.
                </p>
                <p>
                  At Aankhijhyal Technologies I shipped full-stack applications using React and Django.
                  At Eversoft I designed mobile interfaces with Flutter. At Scretus I built data pipelines
                  and predictive models from raw datasets. Each role deepened a different skill but
                  reinforced the same conviction: the best solutions sit at the intersection of
                  engineering rigour and clear thinking about the problem.
                </p>
                <p>
                  Outside work I explore audio ML — two of my three public projects involve music
                  (guitar tablature generation and genre classification). I&apos;m interested in how machine
                  learning can model creativity, not just categorise it.
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
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
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

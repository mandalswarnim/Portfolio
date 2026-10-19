import Link from "next/link";
import AthenaMark from "@/components/AthenaMark";
import FadeIn from "@/components/animations/FadeIn";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

const connectLinks = [
  { name: "Email", href: `mailto:${CONTACT_EMAIL}` },
  { name: "GitHub", href: GITHUB_URL },
  { name: "LinkedIn", href: LINKEDIN_URL },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-divider bg-background">
      <FadeIn className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <AthenaMark height={44} />
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-[200px]">
              Software engineer and ML researcher based in London.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-subtle mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Work", href: "/services" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-subtle mb-5">
              Expertise
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>Full-Stack Development</li>
              <li>Machine Learning</li>
              <li>Data Analysis</li>
              <li>Mobile Development</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-subtle mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              {connectLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    {...(item.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-divider pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-subtle">
            © {year} Swarnim Mandal. All rights reserved. ·{" "}
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </p>
          <p className="text-sm text-subtle">London, United Kingdom</p>
        </div>
      </FadeIn>
    </footer>
  );
}

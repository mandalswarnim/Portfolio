import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/animations/MotionProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Swarnim Mandal — AI / Software Engineer",
  description:
    "AI / software engineer in London building AI products that run in production: voice agents, predictive models and full-stack apps. MSc Software Engineering (Distinction), University of West London.",
  keywords:
    "Swarnim Mandal, Software Engineer, Full-Stack Developer, Machine Learning, AI, Data Analysis, Python, React, Django, TensorFlow, London",
  authors: [{ name: "Swarnim Mandal" }],
  openGraph: {
    title: "Swarnim Mandal — AI / Software Engineer",
    description:
      "I build AI products that run in production: voice agents, predictive models and full-stack apps. London, UK.",
    url: SITE_URL,
    siteName: "Swarnim Mandal",
    locale: "en_GB",
    type: "website",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Swarnim Mandal",
  url: SITE_URL,
  email: `mailto:${CONTACT_EMAIL}`,
  jobTitle: "AI / Software Engineer",
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of West London" },
  sameAs: [GITHUB_URL, LINKEDIN_URL],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="antialiased bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <MotionProvider>
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

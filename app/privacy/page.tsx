import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy — Swarnim Mandal",
  description: "How swarnimmandal.me collects and uses personal data.",
};

const LAST_UPDATED = "23 September 2026";

const sections: { heading: string; body: React.ReactNode[] }[] = [
  {
    heading: "Who I am",
    body: [
      <>
        This site is run by Swarnim Mandal, an individual based in London, United Kingdom. I am the controller of the
        personal data described here. You can reach me at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </>,
    ],
  },
  {
    heading: "What I collect",
    body: [
      <>
        <strong>Contact and enquiry forms.</strong> When you send a message, I receive your name, email address and what
        you write. The AI Receptionist enquiry form also asks for your business name, industry, an estimate of missed
        calls and, optionally, a phone number.
      </>,
      <>
        <strong>Analytics.</strong> I use Vercel Web Analytics and Speed Insights to count page views and measure
        performance. They do not use cookies and do not identify individual visitors; they record aggregate data such as
        the page visited, referrer, country, browser and device type.
      </>,
      <>
        <strong>Server logs.</strong> My hosting provider keeps short-lived technical logs (for example IP address and
        request time) to operate and secure the site.
      </>,
    ],
  },
  {
    heading: "Why, and on what basis",
    body: [
      <>
        I use form submissions only to reply to you and, if we work together, to deliver what we agreed. The lawful
        basis is my legitimate interest in responding to enquiries, or taking steps at your request before entering into
        a contract.
      </>,
      <>
        Analytics and logs are used to understand which pages are useful and to keep the site running securely — also a
        legitimate interest. I do not sell your data or use it for advertising.
      </>,
    ],
  },
  {
    heading: "Who processes it",
    body: [
      <>
        <strong>Vercel</strong> hosts the site and provides analytics. <strong>Resend</strong> delivers form submissions
        to my inbox, which is hosted by <strong>Google</strong>. These providers may process data outside the UK under
        appropriate safeguards such as the UK International Data Transfer Addendum.
      </>,
    ],
  },
  {
    heading: "How long I keep it",
    body: [
      <>
        Enquiries are kept for up to two years after our last contact, unless we go on to work together, in which case
        they are kept for as long as needed for that work and any legal obligations. You can ask me to delete them
        sooner.
      </>,
    ],
  },
  {
    heading: "AI Receptionist callers",
    body: [
      <>
        When I run the AI Receptionist for a business, the details its callers give are processed on behalf of that
        business, which is the controller of that data. If you called a business using it, please contact that business
        about your data; I will help them respond.
      </>,
    ],
  },
  {
    heading: "Your rights",
    body: [
      <>
        Under UK data protection law you can ask to access, correct or delete your personal data, to restrict or object
        to how I use it, and to receive a copy of it. Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and
        I will respond within one month.
      </>,
      <>
        If you are unhappy with how I have handled your data, you can complain to the Information Commissioner&apos;s
        Office at <a href="https://ico.org.uk">ico.org.uk</a>.
      </>,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="py-24 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-6">Privacy</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6">
            Privacy policy
          </h1>
          <p className="text-muted">Last updated {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="prose prose-stone max-w-3xl">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

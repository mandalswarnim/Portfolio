// Site-wide settings shared by client and server components.

export const CONTACT_EMAIL = "mswarnim1@gmail.com";

export const SITE_URL = "https://swarnimmandal.me";
export const GITHUB_URL = "https://github.com/mandalswarnim";
export const LINKEDIN_URL = "https://www.linkedin.com/in/swarnim-mandal-678976259/";

// Path of a CV in public/ (URL-encoded). Download links are hidden until set.
export const CV_PATH: string | null = "/Swarnim%20CV.pdf";
// Filename the browser saves the CV as.
export const CV_DOWNLOAD_NAME = "Swarnim CV.pdf";

// Cal.com / Calendly link. Booking buttons are hidden until this is set.
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || null;

// AI Receptionist pricing: a fixed one-off setup, then per-minute billing at
// the rate of the chosen tier. Tiers climb in voice quality, conversational
// depth and how human the agent sounds (each rated 1–4 on the page).
// Leave `perMinute` null to show "Rate on request"; `features` lists are
// hidden while empty.
export const RECEPTIONIST_SETUP_FEE = 50;

export type ReceptionistTier = {
  name: string;
  meaning: string; // what the Greek name means, shown under it
  tagline: string;
  perMinute: number | null; // GBP per answered minute
  voice: { level: 1 | 2 | 3 | 4; label: string };
  conversation: { level: 1 | 2 | 3 | 4; label: string };
  human: { level: 1 | 2 | 3 | 4; label: string };
  features: string[];
  featured?: boolean;
};

export const RECEPTIONIST_TIERS: ReceptionistTier[] = [
  {
    name: "Agathos",
    meaning: "“good”",
    tagline: "Every call answered, simply and politely",
    perMinute: null,
    voice: { level: 1, label: "Standard voice" },
    conversation: { level: 1, label: "Guided: asks the key questions" },
    human: { level: 1, label: "Clear and polite" },
    features: [],
  },
  {
    name: "Arete",
    meaning: "“excellence”",
    tagline: "A warmer voice that handles follow-ups",
    perMinute: null,
    voice: { level: 2, label: "Premium natural voice" },
    conversation: { level: 2, label: "Handles follow-up questions" },
    human: { level: 2, label: "Natural, warm delivery" },
    features: [],
  },
  {
    name: "Aristeia",
    meaning: "“finest hour”",
    tagline: "Free-flowing conversation that feels personal",
    perMinute: null,
    voice: { level: 3, label: "Expressive premium voice" },
    conversation: { level: 3, label: "Free-flowing conversation" },
    human: { level: 3, label: "Natural pauses, tone and pacing" },
    features: [],
    featured: true,
  },
  {
    name: "Axiom",
    meaning: "“self-evident truth”",
    tagline: "Your own voice, fully tailored to your business",
    perMinute: null,
    voice: { level: 4, label: "Your own custom voice" },
    conversation: { level: 4, label: "Fully conversational, tailored to you" },
    human: { level: 4, label: "Our most human-sounding agent" },
    features: [],
  },
];

// Path or URL of a recorded example call (e.g. "/aireception/sample-call.mp3").
// The audio player is hidden until this is set.
export const SAMPLE_CALL_AUDIO: string | null = null;

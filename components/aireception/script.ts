// Scripted dialogue for the "Try me" simulator. Mirrors the production
// receptionist in `Reception App/src/services/ai.service.ts`: same greeting,
// same fields (name, company, phone, email, message, urgency), read-back
// confirmation and closing line. Runs entirely in the browser — no AI calls.
// Each reply also carries the pre-recorded clips that speak it (see voice.ts).

import type { Clip } from "./voice";

export type Step =
  | "name"
  | "company"
  | "phone"
  | "email"
  | "message"
  | "urgency"
  | "confirm"
  | "closing";

export type Urgency = "low" | "medium" | "high" | "urgent";

export type Captured = {
  name?: string;
  company?: string | null; // null = asked, none given
  phone?: string;
  email?: string | null;
  message?: string;
  urgency?: Urgency;
};

export type Business = {
  id: string;
  label: string;
  defaultName: string;
  messages: string[];
};

export const BUSINESSES: Business[] = [
  {
    id: "dental",
    label: "Dental practice",
    defaultName: "Riverside Dental",
    messages: [
      "I've chipped a tooth and it's quite painful",
      "I'd like to book a check-up and clean",
    ],
  },
  {
    id: "trades",
    label: "Plumbing & heating",
    defaultName: "Hartley Plumbing",
    messages: [
      "My boiler's stopped — no heating or hot water",
      "I'd like a quote for a new bathroom",
    ],
  },
  {
    id: "salon",
    label: "Hair salon",
    defaultName: "Studio Nine Hair",
    messages: [
      "Can I book a cut and colour for Saturday?",
      "I need to move my appointment on Thursday",
    ],
  },
  {
    id: "legal",
    label: "Law firm",
    defaultName: "Ashworth & Reid Solicitors",
    messages: [
      "I need advice on a tenancy dispute",
      "I'm calling about the lease you're reviewing for me",
    ],
  },
];

export const URGENCY_LABEL: Record<Urgency, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

/**
 * Which business's named clips (greeting, goodbye) to use — null for a custom
 * business name, which gets the generic "thank you for calling" lines.
 */
export function voiceBusiness(biz: Business, company: string): string | null {
  return company === biz.defaultName ? biz.id : null;
}

export function greetingVoice(bizVoice: string | null): Clip[] {
  return [(bizVoice ? `greet-${bizVoice}` : "greet-generic") as Clip, "greet-intro"];
}

const closingVoice = (bizVoice: string | null): Clip[] => [
  (bizVoice ? `bye-${bizVoice}` : "bye-generic") as Clip,
  "bye-outro",
];

export function greeting(company: string) {
  return (
    `Hello, thank you for calling ${company}. ` +
    `Our receptionist is currently unavailable, but I'm the virtual assistant and I'm happy to take a message. ` +
    `Could I start by getting your full name please?`
  );
}

export function closing(company: string) {
  return `Thank you for calling ${company}. I've noted everything down and someone will be in touch with you shortly. Have a great day. Goodbye.`;
}

const ASK: Record<Exclude<Step, "closing">, Clip> = {
  name: "q-name",
  company: "q-company",
  phone: "q-phone",
  email: "q-email",
  message: "q-message",
  urgency: "q-urgency",
  confirm: "q-confirm",
};

/** Clips for caller details that match a suggestion chip; anything else gets a generic line. */
const THANKS_BY_NAME: Record<string, Clip> = { sarah: "thanks-sarah", james: "thanks-james" };
const READBACK_BY_DIGITS: Record<string, Clip> = { "07700900123": "readback-07700", "02079460018": "readback-020" };
const EMAIL_CLIPS: Record<string, Clip> = {
  "sarah.johnson@example.com": "email-sarah",
  "james.oconnor@example.com": "email-james",
};

const QUESTION: Record<Exclude<Step, "closing">, string> = {
  name: "Could I take your full name please?",
  company: "Are you calling on behalf of a company?",
  phone: "What's the best number to reach you on?",
  email: "Is there an email address you'd like us to use?",
  message: "And what's the call regarding?",
  urgency: "Is this urgent, or can it wait for a callback?",
  confirm: "Is that all correct?",
};

/** Suggested replies shown as chips for each step. */
export function suggestions(step: Step, biz: Business, captured: Captured): string[] {
  switch (step) {
    case "name":
      return ["Sarah Johnson", "James O'Connor"];
    case "company":
      return ["No, it's personal", "Yes — Hollis Lettings"];
    case "phone":
      return ["07700 900123", "020 7946 0018"];
    case "email": {
      const local = (captured.name ?? "sarah johnson").toLowerCase().replace(/[^a-z ]/g, "").trim().replace(/\s+/g, ".");
      return [`${local}@example.com`, "I'd rather not"];
    }
    case "message":
      return biz.messages;
    case "urgency":
      return ["Yes, it's urgent", "Today if possible", "No rush"];
    case "confirm":
      return ["Yes, that's right", "The number's wrong"];
    default:
      return [];
  }
}

const HUMAN_RE = /\b(are|r) (you|u) (a )?(real|human|person|robot|bot|ai|machine)\b|\breal person\b|\bspeak to (a )?(human|person|someone)\b/i;
const NO_RE = /^(no|nope|nah|none|n\/a|personal|just me|myself|i'?d rather not|rather not|skip|not really)\b/i;
const YES_RE = /^(y|yes|yeah|yep|yup|correct|that'?s (right|correct)|right|perfect|spot on|all good)\b/i;

const titleCase = (s: string) =>
  s.toLowerCase().replace(/(^|[\s'-])([a-z])/g, (_, p, c) => p + c.toUpperCase());

const digitsOf = (s: string) => s.replace(/\D/g, "");

/** "07700 900123" → "0 7 7 0 0, 9 0 0, 1 2 3" — read back digit by digit, in the caller's grouping. */
export function readBack(phone: string) {
  const d = digitsOf(phone);
  const typed = phone.trim().split(/[\s-]+/).map(digitsOf).filter(Boolean);
  const groups = typed.length > 1 ? typed : [d.slice(0, 5), d.slice(5, 8), d.slice(8)].filter(Boolean);
  return groups.map((g) => g.split("").join(" ")).join(", ");
}

export function inferUrgency(text: string): Urgency {
  const t = text.toLowerCase();
  if (/\b(urgent|emergency|asap|immediately|right away|painful|pain|leak|flood|no heating|no hot water)\b/.test(t)) return "urgent";
  if (/\b(today|soon|this week|quickly|tomorrow)\b/.test(t)) return "high";
  if (/\b(no rush|whenever|not urgent|can wait|no hurry|next week|sometime)\b/.test(t)) return "low";
  return "medium";
}

export type Turn = {
  reply: string;
  voice: Clip[];
  next: Step;
  update?: Partial<Captured>;
};

/**
 * Advance the conversation by one caller turn. Pure: returns what the
 * assistant says next and which fields were captured.
 */
export function respond(
  step: Step,
  input: string,
  captured: Captured,
  company: string,
  bizVoice: string | null,
): Turn {
  const text = input.trim();

  if (HUMAN_RE.test(text) && step !== "closing") {
    return {
      reply: `No — I'm an AI virtual assistant for ${company}. I'll make sure your message reaches the team. ${QUESTION[step]}`,
      voice: ["human", ASK[step]],
      next: step,
    };
  }

  switch (step) {
    case "name": {
      const name = titleCase(text.replace(/^(it'?s|my name is|i'?m|this is)\s+/i, "").replace(/[.!]+$/, ""));
      if (!/[a-z]{2}/i.test(name)) {
        return {
          reply: "I'm sorry, I didn't quite catch that. Could you repeat your name?",
          voice: ["repeat-name"],
          next: "name",
        };
      }
      const first = name.split(" ")[0];
      return {
        reply: `Thanks, ${first}. ${QUESTION.company}`,
        voice: [THANKS_BY_NAME[first.toLowerCase()] ?? "thanks", "q-company"],
        next: "company",
        update: { name },
      };
    }
    case "company": {
      if (NO_RE.test(text)) {
        return {
          reply: `No problem. ${QUESTION.phone}`,
          voice: ["no-problem", "q-phone"],
          next: "phone",
          update: { company: null },
        };
      }
      const company = text.replace(/^(yes|yeah|yep)[\s,—-]*/i, "").replace(/^(it'?s|i'?m (from|with)|from|with)\s+/i, "").trim();
      return {
        reply: `Lovely. ${QUESTION.phone}`,
        voice: ["lovely", "q-phone"],
        next: "phone",
        update: { company: company ? titleCase(company) : null },
      };
    }
    case "phone": {
      const d = digitsOf(text);
      if (d.length < 10 || d.length > 13) {
        return {
          reply: "I'm sorry, I didn't quite catch that. Could you repeat the number?",
          voice: ["repeat-phone"],
          next: "phone",
        };
      }
      // Keep only the number itself ("it's 0161 496 0123" → "0161 496 0123").
      const phone = text.match(/\+?\d[\d\s()-]*\d/)?.[0] ?? d;
      // A corrected number goes straight back to the confirmation.
      const next: Step = captured.urgency ? "confirm" : "email";
      const after = next === "confirm" ? confirmLine({ ...captured, phone }) : QUESTION.email;
      return {
        reply: `Let me read that back: ${readBack(phone)}. ${after}`,
        voice: [READBACK_BY_DIGITS[d] ?? "readback-generic", ...(next === "confirm" ? CONFIRM_VOICE : ["q-email" as Clip])],
        next,
        update: { phone },
      };
    }
    case "email": {
      if (NO_RE.test(text)) {
        return {
          reply: `That's fine. ${QUESTION.message}`,
          voice: ["thats-fine", "q-message"],
          next: "message",
          update: { email: null },
        };
      }
      const match = text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
      if (!match) {
        return { reply: "Sorry, could you spell that email address for me?", voice: ["spell-email"], next: "email" };
      }
      const email = match[0].toLowerCase();
      return {
        reply: `Got it — ${email}. ${QUESTION.message}`,
        voice: [EMAIL_CLIPS[email] ?? "email-generic", "q-message"],
        next: "message",
        update: { email },
      };
    }
    case "message": {
      if (text.length < 3) {
        return {
          reply: "Sorry, could you tell me a little more about what you need?",
          voice: ["more-detail"],
          next: "message",
        };
      }
      const urgency = inferUrgency(text);
      if (urgency === "urgent") {
        // The production prompt infers urgency from context instead of asking twice.
        const update = { message: text, urgency };
        return {
          reply: `I'm sorry to hear that — I'll flag this as urgent. ${confirmLine({ ...captured, ...update })}`,
          voice: ["sorry-urgent", ...CONFIRM_VOICE],
          next: "confirm",
          update,
        };
      }
      return {
        reply: `Thanks for explaining. ${QUESTION.urgency}`,
        voice: ["thanks-explaining", "q-urgency"],
        next: "urgency",
        update: { message: text },
      };
    }
    case "urgency": {
      const urgency = /^(yes|yeah|yep)\b/i.test(text) ? "urgent" : inferUrgency(text);
      const update = { urgency };
      return { reply: confirmLine({ ...captured, ...update }), voice: CONFIRM_VOICE, next: "confirm", update };
    }
    case "confirm": {
      if (YES_RE.test(text)) {
        return { reply: closing(company), voice: closingVoice(bizVoice), next: "closing" };
      }
      return { reply: "Sorry about that — what's the correct number?", voice: ["wrong-number"], next: "phone" };
    }
    default:
      return { reply: "", voice: [], next: "closing" };
  }
}

// The on-screen line reads every detail back; the voice summarises, since it
// can't say whatever the caller typed.
const CONFIRM_VOICE: Clip[] = ["confirm-intro", "q-confirm"];

function confirmLine(c: Captured) {
  const about = (c.message ?? "").replace(/[.!?]+$/, "");
  return `Just to confirm: ${c.name}, on ${c.phone}${c.email ? `, email ${c.email}` : ""}, about “${about}”. ${QUESTION.confirm}`;
}

/** The summary paragraph the owner receives by email. */
export function summary(c: Captured, company: string) {
  const who = `${c.name ?? "A caller"}${c.company ? ` from ${c.company}` : ""}`;
  const urgency = c.urgency ? URGENCY_LABEL[c.urgency].toLowerCase() : "medium";
  const contact = `${c.phone ?? "no number"}${c.email ? ` or ${c.email}` : ""}`;
  return `${who} called ${company} while the line was unattended. They said: “${(c.message ?? "").replace(/[.!?]+$/, "")}”. Urgency was assessed as ${urgency}. They can be reached on ${contact} and are expecting someone to be in touch${c.urgency === "urgent" ? " as a priority" : ""}.`;
}

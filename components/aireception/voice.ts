// Pre-recorded receptionist voice for the "Try me" simulator. Each clip is one
// sentence, generated once with Higgsfield (ElevenLabs engine, "Daisy" preset)
// and served from `public/aireception/voice/<id>.mp3`. A reply is spoken by
// playing its clips back to back, so anything the caller types (a custom name,
// number or business) is answered with a generic line rather than read out.
//
// The text here is what each clip says. Change a line → regenerate that clip.

export const VOICE_LINES = {
  "greet-dental": "Hello, thank you for calling Riverside Dental.",
  "greet-trades": "Hello, thank you for calling Hartley Plumbing.",
  "greet-salon": "Hello, thank you for calling Studio Nine Hair.",
  "greet-legal": "Hello, thank you for calling Ashworth and Reid Solicitors.",
  "greet-generic": "Hello, thank you for calling.",
  "greet-intro":
    "Our receptionist is currently unavailable, but I'm the virtual assistant and I'm happy to take a message. Could I start by getting your full name please?",

  "thanks-sarah": "Thanks, Sarah.",
  "thanks-james": "Thanks, James.",
  thanks: "Thank you.",
  "no-problem": "No problem.",
  lovely: "Lovely.",
  "thats-fine": "That's fine.",
  "thanks-explaining": "Thanks for explaining.",
  "sorry-urgent": "Oh, I'm sorry to hear that. I'll flag this as urgent.",

  "q-name": "Could I take your full name please?",
  "q-company": "Are you calling on behalf of a company?",
  "q-phone": "What's the best number to reach you on?",
  "q-email": "Is there an email address you'd like us to use?",
  "q-message": "And what's the call regarding?",
  "q-urgency": "Is this urgent, or can it wait for a callback?",
  "q-confirm": "Is that all correct?",

  "repeat-name": "I'm sorry, I didn't quite catch that. Could you repeat your name?",
  "repeat-phone": "I'm sorry, I didn't quite catch that. Could you repeat the number?",
  "spell-email": "Sorry, could you spell that email address for me?",
  "more-detail": "Sorry, could you tell me a little more about what you need?",

  "readback-07700": "Let me read that back: oh seven seven oh oh, nine double oh, one two three.",
  "readback-020": "Let me read that back: oh two oh, seven nine four six, double oh one eight.",
  "readback-generic": "Thank you, I've got that number noted.",
  "email-sarah": "Got it: sarah dot johnson at example dot com.",
  "email-james": "Got it: james dot oconnor at example dot com.",
  "email-generic": "Got it, thank you.",
  "confirm-intro": "Just to confirm, I've got your name, your number, and what the call's about.",

  human: "No, I'm an AI virtual assistant. I'll make sure your message reaches the team.",
  "wrong-number": "Sorry about that. What's the correct number?",

  "bye-dental": "Thank you for calling Riverside Dental.",
  "bye-trades": "Thank you for calling Hartley Plumbing.",
  "bye-salon": "Thank you for calling Studio Nine Hair.",
  "bye-legal": "Thank you for calling Ashworth and Reid Solicitors.",
  "bye-generic": "Thank you for calling.",
  "bye-outro":
    "I've noted everything down and someone will be in touch with you shortly. Have a great day. Goodbye.",
} as const;

export type Clip = keyof typeof VOICE_LINES;

export const clipUrl = (clip: Clip) => `/aireception/voice/${clip}.mp3`;

export const ALL_CLIPS = Object.keys(VOICE_LINES) as Clip[];

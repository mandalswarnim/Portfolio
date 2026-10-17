"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import {
  BUSINESSES,
  URGENCY_LABEL,
  greeting,
  greetingVoice,
  respond,
  suggestions,
  summary,
  voiceBusiness,
  type Captured,
  type Step,
  type Urgency,
} from "./script";
import { ALL_CLIPS, clipUrl, type Clip } from "./voice";

type Phase = "idle" | "ringing" | "live" | "ended";
type Message = { role: "ai" | "caller"; text: string };

const URGENCY_STYLE: Record<Urgency, string> = {
  low: "bg-status-nominal/10 text-status-nominal",
  medium: "bg-primary/10 text-primary",
  high: "bg-status-warning/10 text-status-warning",
  urgent: "bg-status-critical/10 text-status-critical",
};

const FIELDS: { key: keyof Captured; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "company", label: "Company" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "message", label: "Message" },
  { key: "urgency", label: "Urgency" },
];

const formatTime = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

/**
 * Start (and immediately pause) a muted clip inside the click gesture, which
 * Safari/iOS require before they allow later, timer-driven play() calls.
 */
function unlockAudio(existing: HTMLAudioElement | null, src: string) {
  const audio = existing ?? new Audio();
  audio.src = src;
  audio.muted = true;
  audio
    .play()
    .then(() => audio.pause())
    .catch(() => {})
    .finally(() => {
      audio.muted = false;
    });
  return audio;
}

/** Pause between sentence clips, so a multi-clip reply flows like natural speech. */
const CLIP_GAP_MS = 140;

export default function TryMe() {
  const [bizId, setBizId] = useState(BUSINESSES[0].id);
  const [customName, setCustomName] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState<Step>("name");
  const [messages, setMessages] = useState<Message[]>([]);
  const [captured, setCaptured] = useState<Captured>({});
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [voiceOn, setVoiceOn] = useState(true);

  const biz = BUSINESSES.find((b) => b.id === bizId) ?? BUSINESSES[0];
  const company = customName.trim() || biz.defaultName;
  const bizVoice = voiceBusiness(biz, company);

  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const voiceOnRef = useRef(voiceOn);
  useEffect(() => {
    voiceOnRef.current = voiceOn;
  }, [voiceOn]);

  // One audio element plays every clip; `playback` identifies the reply being
  // spoken so a stopped reply's queued clips are dropped.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playback = useRef<{ done?: (spoken: boolean) => void } | null>(null);

  /** Stop speaking. With `finish`, still run the reply's completion callback. */
  const stopVoice = useCallback((finish = false) => {
    const current = playback.current;
    playback.current = null;
    audioRef.current?.pause();
    if (finish) current?.done?.(true);
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      playback.current = null;
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (phase !== "live") return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  /** Play a reply's clips back to back; `done(spoken)` runs once they finish. */
  const speak = useCallback(
    (clips: Clip[], done?: (spoken: boolean) => void) => {
      const audio = audioRef.current;
      playback.current = null;
      if (!voiceOnRef.current || !audio || clips.length === 0) {
        done?.(false);
        return;
      }
      const token = { done };
      playback.current = token;
      let i = 0;
      const next = () => {
        if (playback.current !== token) return;
        if (i >= clips.length) {
          playback.current = null;
          done?.(true);
          return;
        }
        audio.src = clipUrl(clips[i++]);
        audio.onended = () => timers.current.push(window.setTimeout(next, CLIP_GAP_MS));
        audio.onerror = next;
        audio.play().catch(() => {
          // Autoplay refused — carry on silently with the transcript.
          if (playback.current !== token) return;
          playback.current = null;
          done?.(false);
        });
      };
      next();
    },
    [],
  );

  const aiSay = useCallback(
    (text: string, clips: Clip[], then?: (spoken: boolean) => void) => {
      setTyping(true);
      later(() => {
        setTyping(false);
        setMessages((m) => [...m, { role: "ai", text }]);
        speak(clips, then);
      }, 700 + Math.min(text.length * 6, 900));
    },
    [speak],
  );

  const start = () => {
    track("demo_started", { business: bizId, custom: customName.trim() ? "yes" : "no" });
    timers.current.forEach(clearTimeout);
    setMessages([]);
    setCaptured({});
    setStep("name");
    setSeconds(0);
    setPhase("ringing");
    const greetClips = greetingVoice(bizVoice);
    if (voiceOn) {
      audioRef.current = unlockAudio(audioRef.current, clipUrl(greetClips[0]));
      // Warm the cache so replies start without a network gap (~0.9 MB in all).
      ALL_CLIPS.forEach((c) => fetch(clipUrl(c)).catch(() => {}));
    }
    later(() => {
      setPhase("live");
      aiSay(greeting(company), greetClips);
    }, 2200);
  };

  const hangUp = (completed: boolean) => {
    timers.current.forEach(clearTimeout);
    setTyping(false);
    if (!completed) stopVoice();
    setPhase("ended");
    if (completed) track("demo_completed", { business: bizId });
  };

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing || phase !== "live" || step === "closing") return;
    setInput("");
    setMessages((m) => [...m, { role: "caller", text }]);
    const turn = respond(step, text, captured, company, bizVoice);
    if (turn.update) setCaptured((c) => ({ ...c, ...turn.update }));
    setStep(turn.next);
    aiSay(
      turn.reply,
      turn.voice,
      // Hang up once the goodbye has been spoken, or after a reading pause when muted.
      turn.next === "closing" ? (spoken) => later(() => hangUp(true), spoken ? 900 : 3800) : undefined,
    );
  };

  const reset = () => {
    stopVoice();
    setPhase("idle");
    setMessages([]);
    setCaptured({});
  };

  const chips = phase === "live" && !typing && step !== "closing" ? suggestions(step, biz, captured) : [];
  const completed = phase === "ended" && step === "closing";

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-6 lg:gap-10 items-start">
      {/* ── Phone ─────────────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-[420px]">
        <div className="rounded-[2.75rem] bg-foreground p-2.5 shadow-[0_30px_80px_-30px_rgba(28,22,18,0.55)]">
          <div className="relative rounded-[2.25rem] bg-background overflow-hidden h-[640px] flex flex-col">
            {/* Status bar */}
            <div className="flex items-center justify-between px-7 pt-3 pb-1 text-[11px] font-medium text-foreground">
              <span>{phase === "live" ? formatTime(seconds) : "9:41"}</span>
              <span className="h-5 w-24 rounded-full bg-foreground" aria-hidden />
              <span className="tracking-widest">●●●</span>
            </div>

            <AnimatePresence mode="wait">
              {phase === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col px-6 pt-6 pb-8"
                >
                  <p className="text-xs uppercase tracking-widest text-subtle mb-3">1 · Choose a business</p>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {BUSINESSES.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBizId(b.id)}
                        aria-pressed={b.id === bizId}
                        className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                          b.id === bizId
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-divider text-muted hover:border-foreground/30"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>

                  <label htmlFor="tryme-name" className="text-xs uppercase tracking-widest text-subtle mb-3">
                    2 · Or use your business name
                  </label>
                  <input
                    id="tryme-name"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value.slice(0, 40))}
                    placeholder={biz.defaultName}
                    className="rounded-xl border border-divider bg-surface px-4 py-3 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:border-primary"
                  />

                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <p className="text-sm text-muted mb-1">You&apos;re the customer. Call</p>
                    <p className="font-serif text-2xl font-bold text-foreground mb-8 px-2 leading-tight">{company}</p>
                    <button
                      type="button"
                      onClick={start}
                      className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-status-nominal text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-status-nominal/30"
                      aria-label={`Try me: call ${company}`}
                    >
                      <span className="absolute inset-0 rounded-full bg-status-nominal/40 animate-ping" />
                      <PhoneIcon className="relative w-8 h-8" />
                    </button>
                    <p className="mt-4 text-sm font-medium text-foreground">Try me</p>
                    <button
                      type="button"
                      onClick={() => setVoiceOn((v) => !v)}
                      className="mt-3 text-xs text-subtle hover:text-foreground"
                    >
                      Voice {voiceOn ? "on" : "off"} — tap to {voiceOn ? "mute" : "unmute"}
                    </button>
                  </div>
                </motion.div>
              )}

              {phase === "ringing" && (
                <motion.div
                  key="ringing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center px-6"
                >
                  <div className="relative mb-8 flex h-28 w-28 items-center justify-center">
                    {[0, 0.5, 1].map((d) => (
                      <motion.span
                        key={d}
                        className="absolute inset-0 rounded-full border-2 border-primary/40"
                        initial={{ scale: 0.6, opacity: 0.8 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: d }}
                      />
                    ))}
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-surface border border-divider font-serif text-3xl font-bold text-primary">
                      {company[0]?.toUpperCase()}
                    </span>
                  </div>
                  <p className="font-serif text-2xl font-bold text-foreground mb-2">{company}</p>
                  <p className="text-sm text-muted">Calling… no one&apos;s free to answer</p>
                </motion.div>
              )}

              {(phase === "live" || phase === "ended") && (
                <motion.div
                  key="live"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-divider">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface border border-divider font-serif font-bold text-primary">
                      {company[0]?.toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{company}</p>
                      <p className="flex items-center gap-1.5 text-xs text-subtle">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${phase === "live" ? "bg-status-nominal animate-pulse" : "bg-subtle"}`}
                        />
                        {phase === "live" ? `AI receptionist · ${formatTime(seconds)}` : `Call ended · ${formatTime(seconds)}`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (voiceOn) stopVoice(true);
                        setVoiceOn((v) => !v);
                      }}
                      className="rounded-full border border-divider p-2 text-muted hover:text-foreground"
                      aria-label={voiceOn ? "Mute voice" : "Unmute voice"}
                    >
                      {voiceOn ? <SpeakerIcon className="w-4 h-4" /> : <MuteIcon className="w-4 h-4" />}
                    </button>
                  </div>

                  <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" aria-live="polite">
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex ${m.role === "caller" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                            m.role === "caller"
                              ? "bg-primary text-white rounded-br-md"
                              : "bg-surface text-foreground rounded-bl-md"
                          }`}
                        >
                          {m.text}
                        </div>
                      </motion.div>
                    ))}
                    {typing && (
                      <div className="flex justify-start" aria-label="Assistant is speaking">
                        <div className="flex items-end gap-[3px] rounded-2xl rounded-bl-md bg-surface px-4 py-3 h-9">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <motion.span
                              key={i}
                              className="w-[3px] rounded-full bg-primary/60"
                              animate={{ height: [4, 14, 6, 12, 4] }}
                              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.1 }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {phase === "live" ? (
                    <div className="border-t border-divider px-4 pt-3 pb-4 space-y-3">
                      <div className="flex flex-wrap gap-2 min-h-[34px]">
                        {chips.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => send(c)}
                            className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                          >
                            {c}
                          </button>
                        ))}
                        {chips.length > 0 && step !== "confirm" && (
                          <button
                            type="button"
                            onClick={() => send("Am I talking to a real person?")}
                            className="rounded-full border border-divider px-3 py-1.5 text-xs text-muted hover:text-foreground transition-colors"
                          >
                            Are you a real person?
                          </button>
                        )}
                      </div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          send(input);
                        }}
                        className="flex items-center gap-2"
                      >
                        <input
                          value={input}
                          onChange={(e) => setInput(e.target.value.slice(0, 160))}
                          placeholder="Or type your own reply…"
                          disabled={typing || step === "closing"}
                          className="flex-1 min-w-0 rounded-full border border-divider bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:border-primary disabled:opacity-60"
                          aria-label="Your reply"
                        />
                        <button
                          type="button"
                          onClick={() => hangUp(false)}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-status-critical text-white hover:opacity-90"
                          aria-label="End call"
                        >
                          <PhoneIcon className="w-4 h-4 rotate-[135deg]" />
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="border-t border-divider px-4 py-4 flex gap-2">
                      <button
                        type="button"
                        onClick={reset}
                        className="flex-1 rounded-full border border-divider py-2.5 text-sm font-medium text-foreground hover:border-foreground/40"
                      >
                        Try another call
                      </button>
                      <a
                        href="#enquire"
                        className="flex-1 rounded-full bg-foreground py-2.5 text-center text-sm font-medium text-background hover:bg-foreground/80"
                      >
                        Get this for my line
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── What the business sees ────────────────────────── */}
      <div className="space-y-5 lg:sticky lg:top-28">
        <div className="rounded-2xl border border-divider bg-background overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-divider bg-surface">
            <p className="text-sm font-medium text-foreground">Live capture</p>
            <span className="text-[10px] uppercase tracking-widest text-subtle">
              {phase === "live" ? "Recording details" : completed ? "Complete" : "Waiting for a call"}
            </span>
          </div>
          <dl className="divide-y divide-divider">
            {FIELDS.map(({ key, label }) => {
              const asked = key in captured;
              const value = captured[key];
              return (
                <div key={key} className="flex items-start gap-4 px-5 py-3 text-sm">
                  <dt className="w-20 shrink-0 text-subtle">{label}</dt>
                  <dd className="flex-1 min-w-0 flex items-start justify-between gap-3">
                    <AnimatePresence mode="wait">
                      {asked ? (
                        <motion.span
                          key={String(value)}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`break-words ${value ? "text-foreground font-medium" : "text-subtle italic"}`}
                        >
                          {key === "urgency" && value ? (
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${URGENCY_STYLE[value as Urgency]}`}>
                              {URGENCY_LABEL[value as Urgency]}
                            </span>
                          ) : (
                            (value as string) || "Not given"
                          )}
                        </motion.span>
                      ) : (
                        <span className="h-4 w-24 rounded bg-surface" aria-hidden />
                      )}
                    </AnimatePresence>
                    {asked && <span className="text-status-nominal" aria-hidden>✓</span>}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-divider bg-background overflow-hidden"
            >
              <div className="flex items-center gap-2 px-5 py-3 border-b border-divider bg-surface">
                <span className="h-2 w-2 rounded-full bg-status-nominal" />
                <p className="text-sm font-medium text-foreground">Email delivered to the business</p>
                <span className="ml-auto text-xs text-subtle">just now</span>
              </div>
              <div className="p-5 text-sm">
                <p className="text-xs text-subtle mb-1">Subject</p>
                <p className="font-medium text-foreground mb-4">
                  {captured.urgency === "urgent" ? "[URGENT] " : ""}New message from {captured.name}
                </p>
                <p className="text-muted leading-relaxed">{summary(captured, company)}</p>
                <p className="mt-4 pt-3 border-t border-divider text-xs text-subtle">
                  Full transcript attached · {messages.length} turns · {formatTime(seconds)}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!completed && (
          <p className="text-sm text-muted leading-relaxed px-1">
            This is what lands with you. As the caller talks, the receptionist pulls out each detail. When the call
            ends, you get a summary email and the transcript, with the most urgent calls flagged at the top.
          </p>
        )}
        <p className="text-xs text-subtle px-1">
          A scripted simulation that runs in your browser. The live receptionist holds the same conversation by phone,
          using natural speech.
        </p>
      </div>
    </div>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function SpeakerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H3v6h3l5 4V5zM15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
    </svg>
  );
}

function MuteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H3v6h3l5 4V5zM22 9l-6 6M16 9l6 6" />
    </svg>
  );
}

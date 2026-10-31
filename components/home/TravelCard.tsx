"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import HeroPortrait from "@/components/HeroPortrait";
import { useChapter } from "@/components/home/Chapters";

/**
 * Desktop centrepiece that stays on screen through the hero and project
 * chapters: the ASCII portrait first, then each project's real screen. Cards
 * swap with a tilt-and-lift, and two coloured plates behind them rearrange
 * for every chapter.
 */

export type Screen = { src: string; url: string; alt: string };

const PLATES: [string, string][] = [
  ["#2D5FA3", "#C9F27A"],
  ["#C9F27A", "#2D5FA3"],
  ["#FAF8F4", "#1E1E1E"],
];
// [x, y, rotate] for the two plates, per chapter.
const POSES: [number, number, number][][] = [
  [[-70, -50, -10], [80, 70, 8]],
  [[90, -80, 12], [-90, 60, -6]],
  [[-80, 80, 6], [70, -70, -12]],
];

const spring = { type: "spring", stiffness: 70, damping: 18, mass: 1 } as const;

export default function TravelCard({ screens }: { screens: Screen[] }) {
  const { card } = useChapter();
  const pose = POSES[card % POSES.length];
  const colours = PLATES[card % PLATES.length];

  const state = (i: number) =>
    i === card
      ? { opacity: 1, y: 0, rotate: 0, scale: 1 }
      : i < card
        ? { opacity: 0, y: -90, rotate: -6, scale: 0.9 }
        : { opacity: 0, y: 90, rotate: 6, scale: 0.9 };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Coloured plates */}
      {pose.map(([x, y, rotate], i) => (
        <motion.div
          key={i}
          aria-hidden
          initial={false}
          animate={{ x, y, rotate, backgroundColor: colours[i] }}
          transition={spring}
          className="absolute h-[52%] w-[62%] rounded-[2.5rem]"
        />
      ))}

      {/* 0: the ASCII portrait */}
      <motion.div
        initial={false}
        animate={state(0)}
        transition={spring}
        className={`relative z-10 w-full max-w-md ${card === 0 ? "" : "pointer-events-none"}`}
      >
        <HeroPortrait />
      </motion.div>

      {/* 1…n: project screens in a browser frame */}
      {screens.map((s, n) => (
        <motion.div
          key={s.src}
          initial={false}
          animate={state(n + 1)}
          transition={spring}
          aria-hidden={card !== n + 1}
          className="pointer-events-none absolute z-10 w-[min(560px,92%)]"
        >
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-1.5 border-b border-black/10 bg-[#F3F1EC] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-muted">{s.url}</span>
            </div>
            <div className="relative aspect-[16/10]">
              <Image src={s.src} alt={s.alt} fill sizes="560px" className="object-cover object-top" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

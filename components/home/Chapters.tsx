"use client";

import { motion } from "framer-motion";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

/**
 * Homepage colour chapters. Any descendant with `data-bg="#hex"` becomes a
 * chapter: when it crosses the middle of the viewport, the page background
 * eases to its colour, and its optional `data-card` index is published so
 * the travelling card can follow along.
 */

type Chapter = { bg: string; card: number };
const ChapterContext = createContext<Chapter>({ bg: "#FAF8F4", card: 0 });
export const useChapter = () => useContext(ChapterContext);

export default function Chapters({ children, initial }: { children: ReactNode; initial: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState<Chapter>({ bg: initial, card: 0 });

  useEffect(() => {
    const els = ref.current!.querySelectorAll<HTMLElement>("[data-bg]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          setChapter((prev) => ({
            bg: el.dataset.bg!,
            card: el.dataset.card !== undefined ? Number(el.dataset.card) : prev.card,
          }));
        }
      },
      // A one-pixel line across the middle of the screen.
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ChapterContext.Provider value={chapter}>
      <motion.div
        ref={ref}
        initial={false}
        animate={{ backgroundColor: chapter.bg }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </ChapterContext.Provider>
  );
}

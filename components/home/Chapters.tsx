"use client";

import { motion } from "framer-motion";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { setChapterBg } from "@/components/home/chapterStore";

/**
 * Homepage colour chapters. Any descendant with `data-bg="#hex"` becomes a
 * chapter: when it crosses the middle of the viewport, the page background
 * eases to its colour, and its optional `data-card` index is published so
 * the travelling card can follow along.
 *
 * Section text is coloured for its own chapter, so chapters whose colour is
 * not the current page background are faded out (see `[data-chapters-ready]`
 * in globals.css) and fade in with the background instead of showing, say,
 * white text on cream.
 */

type Chapter = { bg: string; card: number };
const ChapterContext = createContext<Chapter>({ bg: "#FAF8F4", card: 0 });
export const useChapter = () => useContext(ChapterContext);

export default function Chapters({ children, initial }: { children: ReactNode; initial: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState<Chapter>({ bg: initial, card: 0 });
  // Set once a chapter has been observed, so nothing is hidden before then.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const els = ref.current!.querySelectorAll<HTMLElement>("[data-bg]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          setReady(true);
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

    // On tall screens the last chapter can stop short of the middle line, so
    // reaching the end of the page selects it.
    const last = els[els.length - 1];
    const onScroll = () => {
      if (!last || window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 2) return;
      if (last.getBoundingClientRect().top > window.innerHeight / 2) {
        setReady(true);
        setChapter((prev) => ({ ...prev, bg: last.dataset.bg! }));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Mark the chapters that match the page background as readable.
  useEffect(() => {
    ref.current!.querySelectorAll<HTMLElement>("[data-bg]").forEach((el) => {
      el.toggleAttribute("data-on", el.dataset.bg === chapter.bg);
    });
  }, [chapter.bg]);

  // Let the fixed header follow the chapter colour.
  useEffect(() => setChapterBg(chapter.bg), [chapter.bg]);
  useEffect(() => () => setChapterBg(null), []);

  return (
    <ChapterContext.Provider value={chapter}>
      <motion.div
        ref={ref}
        data-chapters-ready={ready ? "" : undefined}
        initial={false}
        animate={{ backgroundColor: chapter.bg }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </ChapterContext.Provider>
  );
}

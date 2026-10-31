"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/home/Reveal";

/**
 * "What I do": on large screens the section pins and vertical scrolling slides
 * the row of cards sideways. Smaller screens get a native swipeable row.
 */

type Item = { num: string; title: string; desc: string };

const CARD_STYLES = [
  "bg-background text-charcoal",
  "bg-accent text-charcoal",
  "bg-primary text-white",
  "border border-white/25 text-white",
];

export default function ExpertiseRail({ items, bg }: { items: Item[]; bg: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const row = rowRef.current!;
    // Pinned sideways scroll only where the layout is wide enough for it.
    const measure = () =>
      setDistance(
        window.matchMedia("(min-width: 1024px)").matches ? Math.max(0, row.scrollWidth - window.innerWidth + 48) : 0,
      );
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0, -distance, -distance]);

  return (
    <section ref={sectionRef} data-bg={bg} className="relative lg:h-[260vh]">
      <div className="flex flex-col justify-center py-24 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] lg:overflow-hidden lg:py-0">
        <div className="mx-auto mb-12 w-full max-w-6xl px-6">
          <Reveal lines={["What I do"]} className="font-display text-5xl uppercase leading-[0.95] text-white md:text-7xl" />
        </div>

        <motion.div
          ref={rowRef}
          style={{ x }}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 lg:snap-none lg:overflow-visible lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
        >
          {items.map((item, i) => (
            <div
              key={item.num}
              className={`flex h-[360px] w-[300px] shrink-0 snap-start flex-col rounded-[2rem] p-8 transition-transform duration-500 ease-out hover:-translate-y-2 md:h-[420px] md:w-[380px] ${CARD_STYLES[i % CARD_STYLES.length]}`}
            >
              <span className="mb-auto font-mono text-sm opacity-60">{item.num}</span>
              <h3 className="mb-4 font-display text-2xl uppercase leading-tight md:text-3xl">{item.title}</h3>
              <p className="text-sm leading-relaxed opacity-80 md:text-base">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Masked line-by-line heading reveal that plays when scrolled into view
 * (TextReveal plays on mount, which suits only the hero). The heading itself
 * is observed: the lines start clipped by their masks, so watching them
 * directly would never report them as visible.
 */

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3 };

export default function Reveal({
  lines,
  className = "",
  as = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  as?: keyof typeof tags;
}) {
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.1 }}
    >
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

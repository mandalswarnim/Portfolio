"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import portrait from "@/public/swarnim.jpg";

/**
 * Home hero photo: gentle scroll parallax, grayscale that lifts to colour on
 * hover, and a slowly floating location badge.
 */
export default function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div ref={ref} style={{ y }} className="relative max-w-sm mx-auto lg:ml-auto group">
      <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface border border-divider">
        <motion.div style={{ y: imgY }} className="relative w-full h-[112%] -mt-[6%]">
          <Image
            src={portrait}
            alt="Swarnim Mandal"
            fill
            preload
            sizes="(min-width: 640px) 384px, 100vw"
            className="object-cover grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0"
          />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-4 -left-4 bg-background border border-divider rounded-xl px-4 py-3 shadow-sm"
      >
        <p className="text-xs text-subtle">Based in</p>
        <p className="text-sm font-medium text-foreground">London, United Kingdom</p>
      </motion.div>
    </motion.div>
  );
}

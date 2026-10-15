"use client";

import { useEffect, useRef } from "react";

/**
 * Muted, looping background clip. Plays only while on screen, and shows the
 * poster frame alone for visitors who prefer reduced motion.
 */
export default function LoopVideo({
  name,
  className = "",
  priority = false,
}: {
  name: string; // public/aireception/video/<name>.mp4 + .jpg
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Reduced motion: never start playback, so only the poster frame shows.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const src = `/aireception/video/${name}`;
  return (
    <video
      ref={ref}
      className={`h-full w-full object-cover ${className}`}
      poster={`${src}.jpg`}
      muted
      loop
      playsInline
      preload={priority ? "auto" : "metadata"}
      aria-hidden
      tabIndex={-1}
    >
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}

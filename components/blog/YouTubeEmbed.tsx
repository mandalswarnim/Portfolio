"use client";

import Image from "next/image";
import { useState } from "react";

const fmt = (s: number) =>
  `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

/**
 * Click-to-load YouTube clip: shows a local poster until the visitor presses
 * play, so nothing is fetched from YouTube (youtube-nocookie.com, allowed in
 * the CSP frame-src) without their action. `start` / `end` are in seconds.
 */
export default function YouTubeEmbed({
  id,
  title,
  poster,
  start,
  end,
}: {
  id: string;
  title: string;
  poster: string;
  start?: number;
  end?: number;
}) {
  const [playing, setPlaying] = useState(false);
  const params = new URLSearchParams({ autoplay: "1", rel: "0" });
  if (start) params.set("start", String(start));
  if (end) params.set("end", String(end));
  const watchUrl = `https://www.youtube.com/watch?v=${id}${start ? `&t=${start}s` : ""}`;

  return (
    <figure className="not-prose my-10">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-charcoal/10 bg-charcoal shadow-[0_24px_48px_-28px_rgba(30,30,30,0.45)]">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?${params}`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 h-full w-full"
          >
            <Image src={poster} alt="" fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
            <span className="absolute inset-0 bg-charcoal/25 transition-colors duration-300 group-hover:bg-charcoal/10" />
            <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-charcoal shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            {start !== undefined && (
              <span className="absolute bottom-4 left-4 rounded-full bg-charcoal/80 px-3 py-1 font-mono text-xs text-white">
                {fmt(start)}
                {end ? ` – ${fmt(end)}` : ""}
              </span>
            )}
          </button>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <span>{title}</span>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-charcoal transition-colors hover:text-primary"
        >
          Watch on YouTube ↗
        </a>
      </figcaption>
    </figure>
  );
}

"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Home hero portrait: a short clip of Swarnim turning to camera, played once
 * and held on its last frame, rendered live as glowing ASCII on a canvas. A "decode lens" follows the cursor (or drifts on its own
 * on touch screens) and reveals the real footage underneath. Characters
 * scramble into place on load, with the odd scanline glitch. Visitors who
 * prefer reduced motion get the plain still.
 */

// public/hero/: portrait.mp4 (4:5), portrait-start.jpg (its first frame,
// the poster) and portrait.jpg (its last frame, the reduced-motion still).
const SRC = "/hero/portrait";
const PLAY_DELAY = 700; // ms, so the turn lands as the ASCII settles
const RAMP = " .,:;-=+*cxoO0#%@"; // dark → bright
const NOISE = "01<>/\\|{}[]#$%&*+=?";
const FPS = 30;

export default function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [hovering, setHovering] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  useEffect(() => {
    if (reduced) return;

    const stage = stageRef.current!;
    const canvas = canvasRef.current!;
    const video = videoRef.current!;
    const ctx = canvas.getContext("2d")!;
    const sample = document.createElement("canvas");
    const sctx = sample.getContext("2d", { willReadFrequently: true })!;
    const still = new window.Image();
    still.src = `${SRC}-start.jpg`;

    const canHover = window.matchMedia("(hover: hover)").matches;
    let W = 0, H = 0, cols = 0, rows = 0, cellW = 0, cellH = 0;
    let reveal = new Float32Array(0);
    let rowShift = new Int8Array(0);

    let blocked = false; // autoplay refused
    // Lens state, eased toward the pointer target every frame.
    const lens = { x: 0, y: 0, r: 0, tx: 0, ty: 0, tr: 0 };

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(44, Math.min(84, Math.round(W / 6.5)));
      cellW = W / cols;
      cellH = cellW * 1.55;
      rows = H > 0 ? Math.ceil(H / cellH) : 0;
      sample.width = cols;
      sample.height = rows;
      ctx.font = `600 ${cellH * 0.92}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";
      // Cells resolve from the centre outward with some randomness.
      reveal = new Float32Array(cols * rows);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const d = Math.hypot(i / cols - 0.5, (j / rows - 0.4) * 1.2);
          reveal[j * cols + i] = 0.2 + d * 1.6 + Math.random() * 0.7;
        }
      }
      rowShift = new Int8Array(rows);
      if (!lens.x) {
        lens.x = lens.tx = W / 2;
        lens.y = lens.ty = H * 0.4;
      }
    };

    const drawAscii = (t: number) => {
      const src: CanvasImageSource | null =
        video.readyState >= 2 && !blocked ? video : still.complete && still.naturalWidth ? still : null;
      ctx.clearRect(0, 0, W, H);
      if (!src || !rows) return; // hidden (display: none) copies have no size

      // object-fit: cover crop from the source into the cols×rows grid.
      const sw = src instanceof HTMLVideoElement ? src.videoWidth : still.naturalWidth;
      const sh = src instanceof HTMLVideoElement ? src.videoHeight : still.naturalHeight;
      const scale = Math.max(W / sw, H / sh);
      const cw = W / scale, ch = H / scale;
      sctx.drawImage(src, (sw - cw) / 2, (sh - ch) / 2, cw, ch, 0, 0, cols, rows);
      const px = sctx.getImageData(0, 0, cols, rows).data;

      for (let j = 0; j < rows; j++) {
        const dx = rowShift[j] * cellW;
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          const at = reveal[k];
          const x = i * cellW + dx;
          const yy = j * cellH;

          if (t < at) {
            // Still scrambling: dim random glyphs just before the cell settles.
            if (t > at - 0.45 && Math.random() < 0.6) {
              ctx.fillStyle = "rgba(90,160,255,0.55)";
              ctx.fillText(NOISE[(Math.random() * NOISE.length) | 0], x, yy);
            }
            continue;
          }

          const r = px[k * 4], g = px[k * 4 + 1], b = px[k * 4 + 2];
          // Gamma lift so the shadowed side of the face still reads as glyphs.
          const raw = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
          const lum = Math.min(1, Math.pow(Math.max(0, raw - 0.015) * 1.6, 0.55));
          if (lum < 0.1) continue;

          const flicker = Math.random() < 0.004;
          const glyph = flicker
            ? NOISE[(Math.random() * NOISE.length) | 0]
            : RAMP[Math.min(RAMP.length - 1, (lum * (RAMP.length - 1) + 0.5) | 0)];
          // Keep the source hue at glyph brightness, cooling toward electric
          // blue in the shadows.
          const peak = Math.max(r, g, b, 1);
          const v = 90 + lum * 165;
          const cool = 1 - lum;
          ctx.fillStyle = rowShift[j]
            ? `rgb(${120 + lum * 135},70,${200 + lum * 55})`
            : `rgb(${((r / peak) * v * (1 - cool * 0.6)) | 0},${((g / peak) * v * (1 - cool * 0.25) + cool * 40) | 0},${Math.min(255, (b / peak) * v + cool * 150) | 0})`;
          ctx.fillText(glyph, x, yy);
        }
      }
    };

    // Occasional glitch: shift a few bands of rows sideways for a beat.
    let nextGlitch = 2.5;
    let glitchEnd = 0;
    const updateGlitch = (t: number) => {
      if (t > nextGlitch && !glitchEnd) {
        glitchEnd = t + 0.12 + Math.random() * 0.1;
        const bands = 1 + ((Math.random() * 3) | 0);
        for (let n = 0; n < bands; n++) {
          const start = (Math.random() * rows) | 0;
          const len = 1 + ((Math.random() * 3) | 0);
          const shift = (Math.random() < 0.5 ? -1 : 1) * (1 + ((Math.random() * 3) | 0));
          for (let j = start; j < Math.min(rows, start + len); j++) rowShift[j] = shift;
        }
      } else if (glitchEnd && t > glitchEnd) {
        rowShift.fill(0);
        glitchEnd = 0;
        nextGlitch = t + 3.5 + Math.random() * 3;
      }
    };

    // Touch screens: once the turn finishes, the lens opens from the face to
    // show the real footage, holds, then closes back to ASCII.
    let revealAt = -1;
    const updateLens = (t: number) => {
      if (!canHover) {
        const phase = revealAt < 0 ? -1 : t - revealAt;
        lens.tx = W * 0.5;
        lens.ty = H * 0.38;
        lens.tr = phase >= 0 && phase < 2.2 ? Math.max(W, H) * 0.8 : 0;
      }
      const ease = canHover ? 0.12 : 0.06;
      lens.x += (lens.tx - lens.x) * 0.16;
      lens.y += (lens.ty - lens.y) * 0.16;
      lens.r += (lens.tr - lens.r) * ease;
      stage.style.setProperty("--lx", `${lens.x.toFixed(1)}px`);
      stage.style.setProperty("--ly", `${lens.y.toFixed(1)}px`);
      stage.style.setProperty("--lr", `${Math.max(0, lens.r).toFixed(1)}px`);
    };

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      lens.tx = e.clientX - rect.left;
      lens.ty = e.clientY - rect.top;
      lens.tr = Math.min(W, H) * 0.24;
    };
    const onLeave = () => {
      lens.tr = 0;
    };
    if (canHover) {
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", onLeave);
    }

    let raf = 0;
    let visible = true;
    let last = 0;
    let t0 = -1; // set when the intro starts; the card stays dark until then
    const clock = () => (t0 < 0 ? -1 : (performance.now() - t0) / 1000);
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const t = t0 < 0 ? -1 : (now - t0) / 1000;
      updateLens(t);
      if (now - last < 1000 / FPS) return;
      last = now;
      updateGlitch(t);
      drawAscii(t);
    };

    // When autoplay is blocked (e.g. iOS Low Power Mode), show the last
    // frame, facing the camera, rather than the opening look-away.
    const showEndFrame = () => {
      still.src = `${SRC}.jpg`;
      video.poster = `${SRC}.jpg`;
      if (video.duration) video.currentTime = video.duration;
      revealAt = clock() + 1.5; // after the scramble settles
    };
    const onEnded = () => {
      revealAt = clock();
    };
    video.addEventListener("ended", onEnded);

    // The intro (scramble-in, then the clip played once and held on its last
    // frame) starts the first time the card is mostly on screen, so on phones,
    // where the card sits below the fold, it happens in view. Pausing
    // off-screen resumes from the same point.
    let playTimer: ReturnType<typeof setTimeout> | undefined;
    const intro = () => {
      t0 = performance.now();
      revealAt = -1;
      nextGlitch = 2.5;
      glitchEnd = 0;
      rowShift.fill(0);
      clearTimeout(playTimer);
      playTimer = setTimeout(() => {
        if (!visible || document.hidden) return;
        video.muted = true; // iOS only autoplays when the property is set
        video.currentTime = 0;
        video.play().catch(() => {
          blocked = true;
          showEndFrame();
        });
      }, PLAY_DELAY);
    };
    // Touch screens: tap the card to replay the whole sequence.
    const onTap = () => {
      if (canHover || t0 < 0 || blocked) return;
      if (!video.paused && !video.ended) return;
      intro();
    };
    stage.addEventListener("click", onTap);

    const start = () => {
      if (raf || !visible || document.hidden) return;
      if (!video.ended && video.currentTime > 0) video.play().catch(() => {});
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      video.pause();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
        if (t0 < 0 && entry.intersectionRatio >= 0.5) intro();
      },
      { threshold: [0, 0.5] },
    );
    io.observe(stage);
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    start();

    return () => {
      clearTimeout(playTimer);
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("click", onTap);
      video.removeEventListener("ended", onEnded);
    };
  }, [reduced]);

  // Video shows only inside the lens; the ASCII canvas shows everywhere else.
  const lensMask = "radial-gradient(circle var(--lr) at var(--lx) var(--ly), #000 55%, transparent 100%)";
  const asciiMask = "radial-gradient(circle var(--lr) at var(--lx) var(--ly), transparent 45%, #000 100%)";

  return (
    <motion.div ref={ref} style={{ y }} className="relative max-w-md mx-auto lg:ml-auto">
      {/* Soft blue glow behind the card */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(45,95,163,0.45),transparent)] blur-2xl"
      />

      {/* Rotating gradient border */}
      <div className="relative rounded-2xl p-px overflow-hidden shadow-[0_30px_80px_-24px_rgba(20,40,80,0.7)]">
        <motion.div
          aria-hidden
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,#5AA0FF_60deg,transparent_120deg,transparent_200deg,#2D5FA3_260deg,transparent_320deg)]"
        />

        <div
          ref={stageRef}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}
          className="relative aspect-[4/5] rounded-[15px] overflow-hidden bg-[#06080C] cursor-crosshair"
          style={{ ["--lx" as string]: "50%", ["--ly" as string]: "40%", ["--lr" as string]: "0px" }}
        >
          {reduced ? (
            <Image src={`${SRC}.jpg`} alt="Swarnim Mandal" fill preload sizes="(min-width: 640px) 448px, 100vw" className="object-cover" />
          ) : (
            /* Real footage (revealed through the lens) */
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ maskImage: lensMask, WebkitMaskImage: lensMask }}
              poster={`${SRC}-start.jpg`}
              muted
              playsInline
              preload="auto"
              aria-label="Swarnim Mandal"
            >
              <source src={`${SRC}.mp4`} type="video/mp4" />
            </video>
          )}

          {!reduced && (
            <>
              <canvas
                ref={canvasRef}
                aria-hidden
                className="absolute inset-0 h-full w-full [filter:drop-shadow(0_0_6px_rgba(90,160,255,0.45))]"
                style={{ maskImage: asciiMask, WebkitMaskImage: asciiMask }}
              />

              {/* Lens ring */}
              <div
                aria-hidden
                className="pointer-events-none absolute rounded-full border border-[#5AA0FF]/50 shadow-[0_0_24px_rgba(90,160,255,0.35)]"
                style={{
                  left: "var(--lx)",
                  top: "var(--ly)",
                  width: "calc(var(--lr) * 1.5)",
                  height: "calc(var(--lr) * 1.5)",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* Scanlines + moving scan bar */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.28)_0px,rgba(0,0,0,0.28)_1px,transparent_1px,transparent_3px)]"
              />
              <motion.div
                aria-hidden
                initial={{ top: "-15%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                className="pointer-events-none absolute inset-x-0 h-[12%] bg-gradient-to-b from-transparent via-[#5AA0FF]/10 to-transparent"
              />
            </>
          )}

          {/* HUD */}
          <div aria-hidden className="pointer-events-none absolute inset-0 font-mono text-[10px] tracking-widest text-[#8EC1FF]/80">
            {/* Corner brackets */}
            <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-[#8EC1FF]/60" />
            <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-[#8EC1FF]/60" />
            <span className="absolute left-3 bottom-3 h-4 w-4 border-l border-b border-[#8EC1FF]/60" />
            <span className="absolute right-3 bottom-3 h-4 w-4 border-r border-b border-[#8EC1FF]/60" />

            <div className="absolute left-6 top-5 flex items-center gap-2">
              <motion.span
                animate={reduced ? undefined : { opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-[#FF4D5E] shadow-[0_0_8px_#FF4D5E]"
              />
              SM//01
            </div>
            {!reduced && (
              <div
                className={`absolute right-6 top-5 transition-opacity duration-500 ${hovering ? "opacity-0" : "opacity-80"} hidden [@media(hover:hover)]:block`}
              >
                HOVER TO DECODE
              </div>
            )}
            {!reduced && (
              <div className="absolute right-6 top-5 opacity-80 [@media(hover:hover)]:hidden">TAP TO REPLAY</div>
            )}

            <div className="absolute left-6 bottom-5">
              <TypedTag text="AI / SOFTWARE ENGINEER" disabled={reduced} />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-4 -right-4 bg-background border border-divider rounded-xl px-4 py-3 shadow-sm"
      >
        <p className="text-xs text-subtle">Based in</p>
        <p className="text-sm font-medium text-foreground">London, United Kingdom</p>
      </motion.div>
    </motion.div>
  );
}

/** Terminal-style tag that types itself out, with a blinking caret. */
function TypedTag({ text, disabled }: { text: string; disabled: boolean }) {
  const [n, setN] = useState(disabled ? text.length : 0);

  useEffect(() => {
    if (disabled) return;
    let i = 0;
    let id: ReturnType<typeof setInterval>;
    const delay = setTimeout(() => {
      id = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) clearInterval(id);
      }, 55);
    }, 1400);
    return () => {
      clearTimeout(delay);
      clearInterval(id);
    };
  }, [text, disabled]);

  return (
    <span className="text-[11px] text-white/90">
      <span className="text-[#5AA0FF]">&gt; </span>
      {text.slice(0, n)}
      <span className="ml-0.5 inline-block w-[0.6em] animate-pulse bg-[#5AA0FF] text-transparent">_</span>
    </span>
  );
}

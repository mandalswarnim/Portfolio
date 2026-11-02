"use client";
import { useEffect, useMemo, useRef } from "react";

interface Props {
  /** (T, T) attention weights from the Transformer's last encoder layer */
  matrix: number[][] | null;
  height?: number;
}

/**
 * Renders a (T × T) self-attention heatmap onto a canvas.
 * Y axis = query timestep (later in sequence = top), X axis = attended timestep.
 * Saves us from importing a chart library for a single image-style plot.
 */
export default function AttentionHeatmap({ matrix, height = 220 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stats = useMemo(() => {
    if (!matrix || !matrix.length) return null;
    let lo = Infinity,
      hi = -Infinity;
    for (const row of matrix)
      for (const v of row) {
        if (v < lo) lo = v;
        if (v > hi) hi = v;
      }
    return { lo, hi };
  }, [matrix]);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs || !matrix || !stats) return;
    const T = matrix.length;
    const dpr = window.devicePixelRatio || 1;
    const rect = cvs.getBoundingClientRect();
    cvs.width = rect.width * dpr;
    cvs.height = rect.height * dpr;
    const ctx = cvs.getContext("2d")!;
    const cellW = cvs.width / T;
    const cellH = cvs.height / T;
    const range = Math.max(1e-6, stats.hi - stats.lo);

    for (let i = 0; i < T; i++) {
      for (let j = 0; j < T; j++) {
        const v = (matrix[i][j] - stats.lo) / range;
        ctx.fillStyle = ramp(v);
        // y is flipped so query-step 0 is bottom, latest is top
        ctx.fillRect(j * cellW, (T - 1 - i) * cellH, cellW + 1, cellH + 1);
      }
    }
  }, [matrix, stats]);

  if (!matrix) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border border-divider text-[11px] uppercase tracking-wider text-subtle"
        style={{ height }}
      >
        Attention unavailable — model lacks self-attention
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl" style={{ height }}>
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="pointer-events-none absolute bottom-1 left-1.5 text-[9px] uppercase tracking-wider text-muted">
        Q-step 0 →
      </div>
      <div className="pointer-events-none absolute right-1.5 top-1 text-[9px] uppercase tracking-wider text-muted">
        K-step (attended)
      </div>
    </div>
  );
}

/** Light-theme ramp: warm cream → mid blue → deep navy */
function ramp(v: number): string {
  const x = Math.max(0, Math.min(1, v));
  const stops: [number, number, number][] = [
    [250, 248, 244], // #FAF8F4 background
    [125, 163, 207], // mid blue
    [29, 63, 110], // deep navy
  ];
  const seg = x < 0.5 ? 0 : 1;
  const t = (x - seg * 0.5) / 0.5;
  const [r1, g1, b1] = stops[seg];
  const [r2, g2, b2] = stops[seg + 1];
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${g},${b})`;
}

import { useSyncExternalStore } from "react";

/**
 * The homepage's active chapter colour, shared with components that live
 * outside `<Chapters>` (the fixed header). `null` when no chapters are mounted.
 */
let current: string | null = null;
const listeners = new Set<() => void>();

export function setChapterBg(bg: string | null) {
  if (bg === current) return;
  current = bg;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useChapterBg() {
  return useSyncExternalStore(subscribe, () => current, () => null);
}

/** True when a #rrggbb colour needs light text on top of it. */
export function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
}

// Single source of truth for UAV dashboard colors used outside Tailwind
// (canvas 2D, Three.js materials, recharts props). Keep in sync with
// tailwind.config.js theme tokens.

export const palette = {
  background: "#FAF8F4",
  foreground: "#1C1612",
  surface: "#F0EBE3",
  divider: "#E2D9CE",
  primary: "#2D5FA3",
  muted: "#6B6259",
  subtle: "#9B9088",
  status: {
    NOMINAL: "#4A7C59",
    WARNING: "#A8741A",
    CRITICAL: "#A63D2F",
  },
} as const;

/** hex (#RRGGBB) → rgba() string, for canvas/Three.js code */
export const withAlpha = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

export const chart = {
  series: palette.primary,
  thermal: palette.status.WARNING,
  vibration: palette.status.CRITICAL,
  axis: palette.subtle,
  grid: palette.divider,
  tooltipBg: palette.background,
  tooltipBorder: palette.divider,
} as const;

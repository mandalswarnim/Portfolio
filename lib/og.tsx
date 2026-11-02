import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

// Shared social-card layout for app/**/opengraph-image.tsx, using the site palette.
export function ogImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#FAF8F4",
        color: "#1C1612",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          fontSize: 26,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#2D5FA3",
          fontFamily: "sans-serif",
        }}
      >
        {eyebrow}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>{title}</div>
        <div style={{ fontSize: 32, color: "#6B6259", fontFamily: "sans-serif" }}>{subtitle}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#9B9088",
          fontFamily: "sans-serif",
          borderTop: "2px solid #E2D9CE",
          paddingTop: 28,
        }}
      >
        <span>Swarnim Mandal</span>
        <span>swarnimmandal.me</span>
      </div>
    </div>,
    OG_SIZE,
  );
}

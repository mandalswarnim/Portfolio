import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
// Vercel's preview toolbar injects scripts and frames from vercel.live.
const toolbar = process.env.VERCEL_ENV === "preview" ? " https://vercel.live" : "";

// Every asset is same-origin (next/font self-hosts fonts, analytics use /_vercel/*).
// 'unsafe-inline' scripts are needed for Next's inline bootstrap without nonces,
// which would force every page to render dynamically.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${toolbar}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${toolbar}`,
  "media-src 'self' https:", // SAMPLE_CALL_AUDIO may be hosted elsewhere
  "worker-src 'self' blob:",
  `frame-src${toolbar || " 'none'"}`,
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

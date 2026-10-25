# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (auto-picks available port if 3000 is in use)
npm run build      # Production build — must pass before pushing
npm run lint       # ESLint (flat config in eslint.config.mjs)
```

No test suite is configured. `npm audit` should report 0 vulnerabilities.

## Stack

- **Next.js 16** (App Router, 16.4.3+) + **TypeScript**
- **Tailwind CSS v3** for styling (deliberately not v4 yet)
- **Framer Motion** for animations
- **Three.js / @react-three/fiber + drei** (only on `/uav` routes)
- **Recharts + Zustand** (only on `/uav` routes)
- **Deployed on Vercel** — pushes to `master` auto-deploy to `swarnimmandal.me`

**Dependencies** — routine updates stay within each package's current major (`npm update`); majors (Tailwind 4, framer-motion 14, ESLint 10, TypeScript 7, three 0.186) are separate, deliberate migrations. `package.json` `overrides` pins `postcss-selector-parser` to ^7.1.7 to clear GHSA-rj75-hqrm-r3gf, because Tailwind 3 and `@tailwindcss/typography` still depend on 6.x (compiled CSS is byte-identical); drop the override once those dependencies move to 7.x. `next.config.ts` sets `experimental.agentUpgrade: "security"` (added by `next upgrade --agent=security`). `AGENTS.md` is generated and re-added by `next dev`; commit it rather than deleting it.

## Architecture

**App Router layout** — `app/layout.tsx` wraps every page with `<Header>` and `<Footer>`, adds 80px top padding via `pt-20` to clear the fixed header. `app/template.tsx` wraps each route in `PageTransition`. Header nav: About, Work, Services, Contact (+ "Hire me" → /contact); the footer "Email" link goes to `/contact`, not `mailto:`.

**Positioning & copy** — the site presents Swarnim as an **AI / Software Engineer** (not a researcher). Experience, skills and project facts must match the CV at `public/Swarnim CV.pdf`; never invent numbers or details. Each project card has an optional one-line `result` (measured outcome); UAV figures come from the site's own `public/uav/data/results.json` (Transformer: 14.12 RMSE on C-MAPSS, 97.4% UAV fault accuracy). Projects are listed twice — a selection in `app/page.tsx` and the full set in `app/work/page.tsx` — so keep shared entries in sync.

**Pages:** `app/page.tsx` (home), `app/about/`, `app/work/` (all projects; nav "Work"), `app/services/` (services on offer — currently only the AI Receptionist; nav "Services"), `app/contact/`, `app/blog/`, `app/blog/[slug]/`, `app/uav/` (UAV predictive-maintenance dashboard, see below), `app/ai-receptionist/` (sales landing page for the AI Receptionist product — content ported from the gitignored `Reception App/` Twilio+OpenAI app; "Try me" call simulator in `components/aireception/TryMe.tsx`, driven by the pure dialogue engine in `components/aireception/script.ts`, which mirrors the production prompt in `Reception App/src/services/ai.service.ts`; it runs client-side only (the Permissions-Policy blocks the microphone) and speaks with pre-recorded sentence clips — `components/aireception/voice.ts` maps clip ids to their text, files live in `public/aireception/voice/<id>.mp3` (Higgsfield TTS, ElevenLabs engine, "Daisy" preset; trimmed + loudness-normalised with ffmpeg). Each `respond()` turn returns the clips to play; caller-typed details get generic clips, so changing a reply means updating its clip text and regenerating that file. Background clips are Higgsfield-generated (Kling 3.0), graded and looped into `public/aireception/video/<name>.mp4` + `.jpg` poster, and rendered with `components/aireception/LoopVideo.tsx`)

**Contact & conversion** — `app/contact/page.tsx` posts to `app/api/contact/route.ts`, which sends via the Resend REST API (no SDK) with a honeypot + minimum fill-time spam check. Env vars are documented in `.env.example`: `RESEND_API_KEY` (required), `CONTACT_FROM` (verified-domain sender; enables the visitor acknowledgement), `NEXT_PUBLIC_BOOKING_URL` (shows `components/BookingButton.tsx` CTAs). `lib/site.ts` holds site-wide settings: contact/social URLs plus content toggles that hide their UI while null — `CV_PATH` + `CV_DOWNLOAD_NAME` (home hero "Download CV" button and About download row; currently `public/Swarnim CV.pdf`), `RECEPTIONIST_SETUP_FEE` + `RECEPTIONIST_TIERS` (£50 setup, then per-minute tiers Agathos → Arete → Aristeia → Axiom rated on voice / conversation / human touch; null `perMinute` shows "Rate on request", empty `features` are hidden; tier buttons pre-select the plan in the enquiry form via `PlanButton`), `SAMPLE_CALL_AUDIO` (audio player on /ai-receptionist). The AI Receptionist quote form (`components/aireception/EnquiryForm.tsx`) posts to the same route with a `details` map; both forms use `lib/contact-client.ts`. Keep receptionist copy factual to the `Reception App/` source — no invented testimonials, stats or features. Vercel Analytics + Speed Insights are mounted in `app/layout.tsx`; custom events: `contact_submitted`, `booking_clicked` (with `source`), `demo_started` / `demo_completed` (Try me simulator), `plan_selected`. `.npmrc` sets `legacy-peer-deps` because `@vercel/analytics` declares an optional Remix peer that conflicts with React 19.

**Security** — `next.config.ts` sends a strict CSP plus HSTS, X-Frame-Options, nosniff, Referrer-Policy and a Permissions-Policy (microphone/camera blocked) on every route, and disables `X-Powered-By`. Every asset is same-origin, so any new third-party script, font, image, frame or API must be added to the CSP. The contact route also rejects non-object payloads, caps field sizes and applies a best-effort per-instance IP rate limit.

**SEO** — `metadataBase` and a `Person` JSON-LD block are set in `app/layout.tsx`; `/ai-receptionist` adds `Service` + `FAQPage` JSON-LD from its `faqs` array. Social cards are generated by `app/opengraph-image.tsx` and `app/ai-receptionist/opengraph-image.tsx` via the shared `lib/og.tsx` layout. `app/privacy/` is the privacy policy (update it if you add a data processor); `app/not-found.tsx` is the 404.

**Blog content** is currently **hidden**: `BLOG_ENABLED = false` in `lib/blog.ts` makes `/blog` 404, empties the sitemap entries, and the Blog nav links are removed (re-enable by flipping the flag and re-adding the links in `Header.tsx` / `Footer.tsx`, once real essays replace the placeholders). Posts live as markdown files in `content/blog/` — no CMS or database. The filename is the slug and drives the URL; YAML frontmatter carries `title`, `date`, `excerpt` and `category`, while `readTime` is derived from word count. `lib/blog.ts` reads and caches them at build time via `gray-matter`, and `renderMarkdown()` converts a body to HTML with `remark` + `remark-gfm`. To add a post, drop a new `.md` file in `content/blog/`.

The directory is designed to be opened as an Obsidian vault: `convertWikilinks()` in `lib/blog.ts` rewrites `[[slug]]`, `[[slug|Label]]` and `![[image.png]]` into ordinary markdown links before parsing (fenced code blocks are skipped). Embedded images resolve to `public/blog/`. Vault config under `.obsidian/` is gitignored.

Rendered markdown is styled with `@tailwindcss/typography` (`prose prose-stone`); the `typography` block in `tailwind.config.js` maps prose variables onto the design tokens below. Because `lib/blog.ts` uses `fs`, it must only be imported from server components.

**Animation components** in `components/animations/` (`FadeIn`, `StaggerContainer`, `StaggerItem`, `TextReveal` for line-by-line headings, `PageTransition`, `MotionProvider`) are thin framer-motion wrappers used across all pages. `HeroPortrait` (home photo parallax) and `ScrollProgress` (bar under the header) live in `components/`. All are `"use client"` components and can be imported into server component pages.

**Athena mark** (`components/AthenaMark.tsx`) — logo used in Header and Footer. Renders `public/athena.png` (portrait art, 402x572) via `next/image`; `height` drives the size and width follows the intrinsic aspect ratio. Icon assets are derived from the same head crop: `app/icon.png` (favicon) and `app/apple-icon.png` are picked up by Next.js file conventions, and `public/icon-192.png` / `public/icon-512.png` back `app/manifest.ts`. Regenerate all five together if the source art changes.

**UAV dashboard (`/uav`)** — light-theme port of a standalone thesis project (ARES PdM). Five routes (`/uav`, `/uav/armory`, `/uav/mission`, `/uav/diagnostics`, `/uav/lab`) sharing `app/uav/layout.tsx` (mounts `AppBootstrap` + `UavNav` tab row). Components in `components/uav/`, state/fetchers in `lib/uav/` (Zustand store reads baked JSON from `public/uav/data/`). Three.js components are loaded with `dynamic(..., { ssr: false })` from `'use client'` pages, confining their bundle weight to `/uav` routes. Client-side procedural simulation only — there is intentionally no inference backend. `lib/uav/palette.ts` mirrors the Tailwind status colors for canvas/Three.js/chart code; keep the two in sync.

## Design System

Colours are defined as direct hex values in `tailwind.config.js` (not CSS variables):

| Token | Hex | Usage |
|---|---|---|
| `background` | `#FAF8F4` | Page background |
| `foreground` | `#1C1612` | Body text |
| `surface` | `#F0EBE3` | Cards, alternate sections |
| `divider` | `#E2D9CE` | Borders, `<hr>`-style lines |
| `primary` | `#2D5FA3` | Steel blue — SM monogram, links, category labels |
| `muted` | `#6B6259` | Secondary text |
| `subtle` | `#9B9088` | Tertiary text, labels |
| `status.nominal` | `#4A7C59` | UAV dashboard — healthy |
| `status.warning` | `#A8741A` | UAV dashboard — degrading |
| `status.critical` | `#A63D2F` | UAV dashboard — critical |

Fonts loaded via `next/font/google` in `app/layout.tsx`:
- `--font-playfair` → `font-serif` (headings)
- `--font-inter` → `font-sans` (body, default)

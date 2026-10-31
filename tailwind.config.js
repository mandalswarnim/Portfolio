/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F4",
        foreground: "#1C1612",
        surface: "#F0EBE3",
        divider: "#E2D9CE",
        primary: "#2D5FA3",
        charcoal: "#1E1E1E",
        accent: "#C9F27A",
        muted: "#6B6259",
        subtle: "#9B9088",
        status: {
          nominal: "#4A7C59",
          warning: "#A8741A",
          critical: "#A63D2F",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "Impact", "sans-serif"],
      },
      // Styling for rendered blog markdown (`prose` on app/blog/[slug]/page.tsx),
      // mapped onto the design tokens above.
      typography: ({ theme }) => ({
        stone: {
          css: {
            "--tw-prose-body": theme("colors.foreground"),
            "--tw-prose-headings": theme("colors.foreground"),
            "--tw-prose-lead": theme("colors.muted"),
            "--tw-prose-links": theme("colors.primary"),
            "--tw-prose-bold": theme("colors.foreground"),
            "--tw-prose-counters": theme("colors.subtle"),
            "--tw-prose-bullets": theme("colors.divider"),
            "--tw-prose-hr": theme("colors.divider"),
            "--tw-prose-quotes": theme("colors.muted"),
            "--tw-prose-quote-borders": theme("colors.divider"),
            "--tw-prose-captions": theme("colors.subtle"),
            "--tw-prose-code": theme("colors.foreground"),
            "--tw-prose-pre-code": theme("colors.foreground"),
            "--tw-prose-pre-bg": theme("colors.surface"),
            "--tw-prose-th-borders": theme("colors.divider"),
            "--tw-prose-td-borders": theme("colors.divider"),
            maxWidth: "none",
            lineHeight: "1.9",
            h2: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontWeight: "700",
            },
            h3: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontWeight: "700",
            },
            code: {
              backgroundColor: theme("colors.surface"),
              padding: "0.15em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            pre: {
              border: `1px solid ${theme("colors.divider")}`,
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

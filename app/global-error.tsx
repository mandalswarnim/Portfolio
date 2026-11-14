"use client";

// Replaces the root layout when it fails, so it carries its own <html> and inline styles.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#FAF8F4",
          color: "#1E1E1E",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 32, margin: "0 0 12px" }}>Something went wrong</h1>
          <p style={{ color: "#6B6259", margin: "0 0 24px" }}>The site hit an unexpected error.</p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#1E1E1E",
              color: "#fff",
              border: 0,
              borderRadius: 999,
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

// Lighthouse CI (12-performans §8, PF-05). After `pnpm build`: `pnpm lighthouse`.
// Mobile profile (Lighthouse default). Performance warns, accessibility and best practices fail.
// Non-production builds are noindex, so the SEO category is replaced by the individual SEO audits.
// Chrome: CI runners have it; locally set CHROME_PATH if Lighthouse cannot find a browser.

const demo = process.env.VERCEL_ENV !== "production";
// LHCI_PORT avoids another app already listening on :3000 locally.
const port = process.env.LHCI_PORT ?? "3000";
const base = `http://localhost:${port}`;

// Home page + one page per template (12 §2). Add list / detail / form pages as they are built.
const paths = ["/", "/stil"];

module.exports = {
  ci: {
    collect: {
      startServerCommand: `pnpm start --port ${port}`,
      startServerReadyPattern: "Ready in",
      url: paths.map((p) => base + p),
      numberOfRuns: 1,
      settings: { chromeFlags: "--no-sandbox --headless=new" },
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": demo ? "off" : ["error", { minScore: 1 }],
        ...(demo
          ? {
              "document-title": "error",
              "meta-description": "error",
              "http-status-code": "error",
              "crawlable-anchors": "error",
              canonical: "error",
              hreflang: "error",
              "link-text": "warn",
            }
          : {}),
      },
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci" },
  },
};

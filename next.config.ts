import type { NextConfig } from "next";

/**
 * Security headers for every response (11-guvenlik §8, NFR-04). All pages are static, so the CSP
 * is static too (no per-request nonce). The portfolio itself may never be framed
 * (frame-ancestors 'none' + X-Frame-Options); it frames the projects instead.
 * frame-src is filled from the projects' live origins in the live preview slice (D-08,
 * BR-PRV-004); until then nothing may be framed.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'", // static pages cannot carry a per-request nonce (GV-03)
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  // PLAN.md §10: every page is static content from content/*.ts; nothing is dynamic.
  cacheComponents: false,
  typedRoutes: true,
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
  images: {
    qualities: [60, 75, 90],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  headers() {
    return Promise.resolve([{ source: "/:path*", headers: securityHeaders }]);
  },
};

export default nextConfig;

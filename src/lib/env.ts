import "server-only";

import { z } from "zod";

/**
 * Server-side configuration. The site has no secrets (no database, auth or e-mail, ADR-0001);
 * the only server decision is whether this deployment may be indexed.
 * PORTFOLIO_ORIGINS is read by scripts/embed-check (D-09), not by the app.
 */
const schema = z.object({
  VERCEL_ENV: z.enum(["production", "preview", "development"]).optional(),
});

// eslint-disable-next-line no-restricted-properties -- the single place that reads process.env on the server
const vercelEnv = process.env.VERCEL_ENV;
const raw = schema.parse({ VERCEL_ENV: vercelEnv === "" ? undefined : vercelEnv });

export const env = {
  /** Only the production deployment is indexed; previews and local builds are noindex. */
  INDEXABLE: raw.VERCEL_ENV === "production",
  /** The style tile (/stil) and other review pages are visible everywhere except production. */
  SHOW_REVIEW_PAGES: raw.VERCEL_ENV !== "production",
} as const;

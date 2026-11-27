import { z } from "zod";

/**
 * Configuration that is safe to expose to the browser. Only NEXT_PUBLIC_* variables are
 * inlined by Next.js, and only when referenced literally — hence the explicit object below.
 * NEXT_PUBLIC_SITE_URL is the single canonical address (PLAN.md §5.5, K-11).
 */
const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().refine((url) => !url.endsWith("/"), "no trailing slash"),
});

const orUndefined = (value: string | undefined) => (value === "" ? undefined : value);

export const publicEnv = schema.parse({
  // eslint-disable-next-line no-restricted-properties -- literal references are required for inlining
  NEXT_PUBLIC_SITE_URL: orUndefined(process.env.NEXT_PUBLIC_SITE_URL),
});

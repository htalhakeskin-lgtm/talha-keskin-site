import "server-only";

import type { Metadata } from "next";

import { env } from "@/lib/env";
import { publicEnv } from "@/lib/public-env";

/**
 * One helper for every public page's metadata (09-seo §2). Only the production deployment is
 * indexed (env.INDEXABLE); previews and local builds are noindex, nofollow.
 * hreflang alternates arrive with the i18n slice (D-02).
 */
type PageSeo = {
  title: string;
  description: string;
  path: string; // "/projeler/golden-borekcilik"
  image?: string; // absolute or site-relative; defaults to the root opengraph-image
  noindex?: boolean;
};

export function absoluteUrl(path: string): string {
  return new URL(path, publicEnv.NEXT_PUBLIC_SITE_URL).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
}: PageSeo): Metadata {
  const index = env.INDEXABLE && !noindex;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index, follow: index },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: absoluteUrl(path),
      title,
      description,
      // A page-level `openGraph` object replaces the inherited one, so without an explicit image
      // every page but "/" loses the root opengraph-image (SEO-06).
      images: [{ url: absoluteUrl(image ?? "/opengraph-image"), width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** JSON-LD script content with "<" escaped so data can never close the script tag (11-guvenlik §6). */
export function jsonLd(data: Record<string, unknown>): string {
  return JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c");
}

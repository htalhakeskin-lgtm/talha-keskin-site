import type { MetadataRoute } from "next";

import { env } from "@/lib/env";
import { absoluteUrl } from "@/lib/seo";

/**
 * Previews and local builds: nothing is indexed. Production: everything public except the
 * review pages (style tile) and the CV print pages, which exist only to produce the PDFs.
 */
export default function robots(): MetadataRoute.Robots {
  if (!env.INDEXABLE) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/stil", "/tr/cv/", "/en/cv/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

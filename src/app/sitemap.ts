import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

/**
 * Only published, indexable pages (09-seo §3). The i18n slice (D-02) turns every entry into a
 * tr / en pair with `alternates.languages`; project detail pages come from content/projects.ts.
 */
const staticPaths = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPaths.map((path) => ({ url: absoluteUrl(path) }));
}

/**
 * Every route the responsive and accessibility checks visit (07-mobil §10).
 * Adding a page = adding it here (quality gate B). The i18n slice (D-02) moves these under
 * /tr and /en.
 */
export const publicRoutes = [
  "/",
  "/stil", // review page (preview / local only)
  "/bu-sayfa-yok", // 404 page
] as const;

/** The 404 check route: excluded from SEO and image checks. */
export const notFoundRoute = "/bu-sayfa-yok";

/** Review pages: noindex by design, excluded from the SEO spec. */
export const reviewRoutes: readonly string[] = ["/stil"];

/** Routes whose job is to show many images; the same file may appear twice (thumbnail + large). */
export const galleryRoutes: readonly string[] = [];

/** Widths from 07-mobil §3. */
export const widths = [360, 390, 768, 1024, 1280, 1536] as const;

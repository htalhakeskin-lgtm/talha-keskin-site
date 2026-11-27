import { site } from "@/config/site";

import { SiteCredit } from "./site-credit";

/**
 * Footer = the contact block (PLAN.md K-05): e-mail, GitHub, LinkedIn. No phone (BR-ICR-001).
 * The copy-to-clipboard button and the privacy link arrive in D-11; the CV link in D-10.
 */
const linkClass =
  "inline-flex min-h-11 items-center underline decoration-border-strong underline-offset-4 hover:decoration-accent";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="iletisim" className="border-t bg-surface-muted">
      <div className="mx-auto max-w-content px-4 py-12 md:px-8 md:py-16">
        <p className="eyebrow">İletişim</p>
        <a
          href={`mailto:${site.email}`}
          className="mt-3 inline-flex min-h-11 items-center text-2xl font-medium break-all underline decoration-border-strong underline-offset-8 hover:decoration-accent md:text-3xl"
        >
          {site.email}
        </a>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-1">
          <li>
            <a href={site.github} className={linkClass} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.linkedin} className={linkClass} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>

        <div className="mt-12 flex flex-col gap-2 border-t border-border-strong/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            © {year} {site.name}
          </p>
          <SiteCredit />
        </div>
      </div>
    </footer>
  );
}

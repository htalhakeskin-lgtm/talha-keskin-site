import Link from "next/link";

import { site } from "@/config/site";

import { MobileNav, type NavItem } from "./mobile-nav";

/**
 * Sticky header (PLAN.md §6 "Sabit öğeler"). Solid paper background, 1px rule, no blur (GK-06).
 * Items grow with the slices: Projeler (D-06), Hakkımda (D-10), language switcher (D-02),
 * "CV indir" (D-10).
 */
const navItems: readonly NavItem[] = [
  { href: "/", label: "Ana sayfa" },
  { href: "/#iletisim", label: "İletişim" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex h-(--header-height) max-w-content items-center justify-between gap-6 px-4 md:px-8">
        <Link href="/" className="inline-flex min-h-11 items-center gap-3 font-medium">
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-sm bg-primary font-mono text-xs text-primary-foreground"
          >
            TK
          </span>
          <span>{site.name}</span>
        </Link>

        <nav aria-label="Ana menü (masaüstü)" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav items={navItems} />
      </div>
    </header>
  );
}

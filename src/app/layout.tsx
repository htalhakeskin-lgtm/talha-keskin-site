import "./globals.css";

import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/config/site";

// latin-ext carries İ ı Ş ş Ğ ğ (create-next-app's default subset is latin only).
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.title}`, template: `%s · ${site.shortName}` },
  description:
    "İşletmeler için web siteleri, yönetim panelleri ve otomasyonlar geliştiren full stack yazılım geliştirici.",
  applicationName: site.shortName,
};

export const viewport: Viewport = { themeColor: "#f5f3ee" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {/* Full 44px box parked above the viewport (not sr-only: a 1px box fails the target check). */}
        <a
          href="#icerik"
          className="fixed top-2 left-2 z-50 inline-flex min-h-11 -translate-y-[200%] items-center rounded-md bg-primary px-4 text-primary-foreground focus:translate-y-0"
        >
          İçeriğe geç
        </a>
        <SiteHeader />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

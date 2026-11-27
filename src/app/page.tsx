import Link from "next/link";

import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

/**
 * Faz 3 shell: a minimal hero so the tokens, fonts and layout can be reviewed on a real page.
 * The full home page (photo, story, featured work, preview desk) is slice D-05.
 */
export const metadata = pageMetadata({
  title: `${site.name} · ${site.title}`,
  description:
    "Hasan Talha Keskin: işletmeler için web siteleri, yönetim panelleri, randevu ve sipariş sistemleri geliştiren full stack yazılım geliştirici.",
  path: "/",
});

export default function HomePage() {
  return (
    <section className="spec-grid border-b">
      <div className="mx-auto max-w-content px-4 py-section md:px-8">
        <p className="eyebrow">Full stack · {site.location}</p>
        <h1 className="mt-4 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-[-0.02em] md:text-6xl">
          İşletmenin nasıl çalıştığını anlayıp <span className="text-accent">çalışan</span> yazılıma
          çeviriyorum.
        </h1>
        <p className="mt-6 max-w-text text-lg text-muted-foreground">
          {site.name} · {site.title}. Web siteleri, yönetim panelleri, randevu ve sipariş
          sistemleri, test otomasyonu.
        </p>
        <Link
          href="/#iletisim"
          className="mt-10 inline-flex min-h-11 items-center rounded-md bg-primary px-6 font-medium text-primary-foreground hover:bg-primary/90"
        >
          İletişime geç
        </Link>
      </div>
    </section>
  );
}

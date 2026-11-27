import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { env } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";

/**
 * Style tile (20-gorsel-kalite §2, Faz 3): "Şartname kâğıdı" tokens, type scale and basic
 * components on one page, reviewed from 1440 / 390 px screenshots before real pages are built.
 * Preview / local only; 404 in production. A missing token shows as a hatched swatch.
 */

export const metadata: Metadata = pageMetadata({
  title: "Stil karosu",
  description: "Şartname kâğıdı: tasarım token'ları, yazı ölçeği ve temel bileşenler.",
  path: "/stil",
  noindex: true,
});

const COLOR_TOKENS = [
  ["background", "Kâğıt zemin"],
  ["foreground", "Mürekkep · gövde"],
  ["muted-foreground", "İkincil metin"],
  ["primary", "Birincil düğme"],
  ["accent", "Sinyal turuncusu (≤ %10)"],
  ["surface", "Önizleme masası, kart"],
  ["surface-muted", "İkincil bölüm"],
  ["border", "Çizgi"],
  ["border-strong", "3:1 sınır"],
  ["grid-line", "Izgara"],
  ["ink-section", "Koyu bölüm"],
] as const;

const TYPE_SCALE = [
  ["text-6xl · 72", "Ağaç İşçiliği Şık"],
  ["text-5xl · 56", "Gereksinimden yayına"],
  ["text-4xl · 40", "Bölüm başlığı · Çalışma biçimim"],
  ["text-3xl · 32", "Golden Börekçilik"],
  ["text-2xl · 24", "Öne çıkan mühendislik kararları"],
  ["text-xl · 20", "Kart başlığı · Kurumsal test otomasyonu"],
  ["text-lg · 18", "Giriş paragrafı: kısa, somut, kanıta dayalı bir cümle."],
  [
    "text-base · 16",
    "Gövde metni: personel siparişi iki dokunuşta giriyor; değişiklik diğer cihazlara iki saniye içinde yansıyor.",
  ],
  ["text-sm · 14", "Yardımcı metin, meta bilgi"],
] as const;

const TYPE_CLASS: Record<(typeof TYPE_SCALE)[number][0], string> = {
  "text-6xl · 72": "text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.02em]",
  "text-5xl · 56": "text-3xl md:text-5xl font-semibold leading-[1.1] tracking-[-0.02em]",
  "text-4xl · 40": "text-3xl md:text-4xl font-semibold tracking-[-0.01em]",
  "text-3xl · 32": "text-2xl md:text-3xl font-semibold",
  "text-2xl · 24": "text-2xl font-medium",
  "text-xl · 20": "text-xl font-medium",
  "text-lg · 18": "text-lg",
  "text-base · 16": "text-base max-w-text",
  "text-sm · 14": "text-sm text-muted-foreground",
};

const MISSING = "repeating-linear-gradient(45deg, #ccc 0 6px, #fff 6px 12px)";

const TECH = ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Playwright", "Docker"];

export default function StyleTilePage() {
  if (!env.SHOW_REVIEW_PAGES) notFound();

  return (
    <div className="mx-auto max-w-content px-4 py-12 md:px-8 md:py-16">
      <p className="eyebrow">Stil karosu · Faz 3</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.02em] md:text-6xl">
        Şartname kâğıdı
      </h1>
      <p className="mt-4 max-w-text text-lg text-muted-foreground">
        Sıcak kırık beyaz kâğıt zemin, ince ızgara çizgileri, mürekkep siyahı metin. Tek vurgu
        sinyal turuncusu; numaralar ve etiketler mono yazıyla. Görseller projelerin gerçek
        ekranları, hareket yalnızca bir şeyi açıklarken.
      </p>

      <section className="mt-16 border-t pt-8" aria-labelledby="renkler">
        <h2 id="renkler" className="eyebrow">
          01 · Renkler
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {COLOR_TOKENS.map(([token, use]) => (
            <li key={token} className="text-sm">
              <span
                className="block h-20 rounded-md border"
                style={{ background: `var(--${token}, ${MISSING})` }}
              />
              <code className="mt-2 block font-mono text-xs">--{token}</code>
              <span className="text-xs text-muted-foreground">{use}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t pt-8" aria-labelledby="yazi">
        <h2 id="yazi" className="eyebrow">
          02 · Yazı · IBM Plex Sans / Mono
        </h2>
        <div className="mt-6 flex flex-col">
          {TYPE_SCALE.map(([size, sample]) => (
            <div
              key={size}
              className="flex flex-col gap-1 border-b py-4 md:flex-row md:items-baseline md:gap-8"
            >
              <code className="w-32 shrink-0 font-mono text-xs text-muted-foreground">{size}</code>
              <span className={TYPE_CLASS[size]}>{sample}</span>
            </div>
          ))}
          <p className="mt-6 font-mono text-sm">
            Türkçe karakter denetimi: İıŞşĞğÜüÖöÇç · İSTANBUL ışık · 0123456789 · WEB-01 MSA-07
            RPR-06
          </p>
        </div>
      </section>

      <section className="mt-16 border-t pt-8" aria-labelledby="eylem">
        <h2 id="eylem" className="eyebrow">
          03 · Düğmeler ve bağlantılar
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-md bg-primary px-6 font-medium text-primary-foreground hover:bg-primary/90"
          >
            Projeleri gör
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-md border border-border-strong px-6 font-medium hover:bg-surface"
          >
            Önizlemeyi başlat
          </button>
          <a
            href="#eylem"
            className="inline-flex min-h-11 items-center px-1 font-medium text-accent underline underline-offset-4"
          >
            Siteyi aç ↗
          </a>
        </div>
      </section>

      <section className="mt-16 border-t pt-8" aria-labelledby="etiket">
        <h2 id="etiket" className="eyebrow">
          04 · Etiketler
        </h2>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-sm border bg-surface px-2 py-1 font-mono text-xs">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            Canlı
          </span>
          <span className="inline-flex items-center rounded-sm border px-2 py-1 font-mono text-xs text-muted-foreground">
            Tamamlandı · demo
          </span>
          <span className="inline-flex items-center rounded-sm border border-dashed px-2 py-1 font-mono text-xs text-muted-foreground">
            Geliştiriliyor
          </span>
          {TECH.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-sm bg-surface-muted px-2 py-1 font-mono text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t pt-8" aria-labelledby="kart">
        <h2 id="kart" className="eyebrow">
          05 · Proje kartı ve şartname notu
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-md border bg-surface p-6">
            <div className="flex items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
              <span>2026 · Tek geliştirici</span>
              <span className="inline-flex items-center gap-2 text-foreground">
                <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
                Canlı
              </span>
            </div>
            <h3 className="mt-3 text-xl font-medium">Golden Börekçilik</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              QR menü, canlı masa ve sipariş takibi, raporlu yönetim paneli.
            </p>
          </article>
          <div className="spec-grid rounded-md border p-6">
            <dl className="flex flex-col gap-4 bg-background/80">
              <div className="border-l-2 border-accent pl-4">
                <dt className="font-mono text-xs text-accent">MSA-07</dt>
                <dd className="mt-1 text-sm">
                  Bir cihazdaki değişiklik diğerlerine 2 sn içinde yansır.
                </dd>
              </div>
              <div className="border-l-2 border-border-strong pl-4">
                <dt className="font-mono text-xs text-muted-foreground">RPR-06</dt>
                <dd className="mt-1 text-sm">
                  Ciro yalnızca kapanmış hesaplardan, satış anındaki fiyatla.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="mt-16 bg-ink px-6 py-10 text-on-ink md:px-10" aria-labelledby="koyu">
        <h2 id="koyu" className="font-mono text-xs tracking-[0.08em] text-on-ink-muted uppercase">
          06 · Koyu bölüm (yalnızca Çalışma biçimim)
        </h2>
        <p className="mt-4 text-3xl font-semibold">Dinle → Yazılı kapsam → Erken gösterim</p>
        <p className="mt-2 max-w-text text-on-ink-muted">
          Sitede tek koyu bölüm budur; diğer bölümler kâğıt ve ikincil zemin arasında dönüşür.
        </p>
      </section>
    </div>
  );
}

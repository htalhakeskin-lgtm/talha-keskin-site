import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: false },
};

/** 404 in the concept's language (GK-20): a spec-sheet "not found" entry. */
export default function NotFound() {
  return (
    <section className="spec-grid border-b">
      <div className="mx-auto max-w-content px-4 py-section md:px-8">
        <p className="eyebrow">Hata · 404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
          Bu sayfa şartnamede yok.
        </h1>
        <p className="mt-4 max-w-text text-lg text-muted-foreground">
          Adres değişmiş ya da yanlış yazılmış olabilir.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-md bg-primary px-6 font-medium text-primary-foreground hover:bg-primary/90"
        >
          Ana sayfaya dön
        </Link>
      </div>
    </section>
  );
}

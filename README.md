# Talha Keskin · Kişisel Portfolyo

Hasan Talha Keskin'in iki dilli (TR / EN) dijital CV'si: kariyer hikâyesi, projeler ve site içinde canlı önizleme. **Canlı:** `https://<ad-soyad>.vercel.app` (yayından sonra güncellenir)

## English summary

A bilingual (Turkish / English) digital CV for a full stack developer. Visitors follow the career story, filter projects by sector and technology, try each project inside a live preview window without leaving the site, and download the CV in their language. Built with Next.js, TypeScript and Tailwind CSS as a fully static site; content lives in typed, validated data files.

## Özellikler

- Kariyer hikâyesi akışı ve çalışma biçimi
- Proje listesi, durum / sektör / teknoloji filtresi, yetkinlik haritası
- Canlı önizleme penceresi (masaüstü / telefon görünümü), izin yoksa ekran görüntüsü galerisi
- Türkçe ve İngilizce, seçilen dil hatırlanır
- Dile göre CV PDF indirme
- Telefon numarası yok; iletişim e-posta, GitHub ve LinkedIn üzerinden

Durum: Faz 3 (kurulum) tamamlandı; özellikler [docs/ilerleme.md](docs/ilerleme.md)'deki dilim sırasıyla geliştiriliyor.

## Teknolojiler

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Zod · Vitest · Playwright · Lighthouse CI · Vercel

## Yerel kurulum

Gereksinimler: Node.js 24 (`.nvmrc`), pnpm 12.

```bash
pnpm install
cp .env.example .env.local      # NEXT_PUBLIC_SITE_URL=http://localhost:3000
pnpm dev                        # http://localhost:3000
```

Stil karosu: `http://localhost:3000/stil` (üretimde kapalı).

## Komutlar

| Komut | Ne yapar |
|---|---|
| `pnpm dev` | Geliştirme sunucusu |
| `pnpm check` | Lint, tip, biçim ve birim testleri |
| `pnpm build` | Üretim derlemesi |
| `pnpm test:e2e` | Uçtan uca testler (3000 doluysa `E2E_BASE_URL=http://localhost:3100`) |
| `pnpm lighthouse` | Lighthouse CI (3000 doluysa `LHCI_PORT=3100`) |
| `pnpm screenshots` | Portfolyo ekran görüntüleri |

## Ortam değişkenleri

| Değişken | Açıklama |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Tek kanonik adres. Alan adına taşınırken yalnızca bu değişir. |
| `PORTFOLIO_ORIGINS` | Sitenin yayınlandığı bütün adresler (boşlukla). Önizleme izin denetimi kullanır. |
| `VERCEL_ENV` | Vercel otomatik verir; yalnızca `production` indekslenir. |

## İçerik güncelleme

- **Proje görselleri:** [docs/proje-gorselleri.md](docs/proje-gorselleri.md)
- **Önizleme izinleri (diğer projelerin başlıkları):** [docs/onizleme-izinleri.md](docs/onizleme-izinleri.md)
- Proje / deneyim ekleme, fotoğrafı değiştirme ve CV'yi yenileme adımları ilgili dilimlerle (D-03, D-04, D-10) buraya eklenecek.

## Yayın

Vercel'e Git entegrasyonuyla: her PR'a önizleme, `main`'e birleşince üretim. Ayrıntı: [docs/standartlar/16-ortamlar-ve-yayin.md](docs/standartlar/16-ortamlar-ve-yayin.md).

## Belgeler

- [Proje planı](PLAN.md) · [İlerleme](docs/ilerleme.md) · [Araştırma](docs/arastirma.md) · [ADR-0001](docs/adr/0001-veritabanisiz-statik-site.md)

## Lisans

Copyright © 2026 Hasan Talha Keskin. All rights reserved.

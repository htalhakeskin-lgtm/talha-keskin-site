# İlerleme — Talha Keskin Kişisel Portfolyo

> **Son güncelleme:** 2026-11-27 · **Faz:** 4 (Faz 3 tamam) · **Sıradaki dilim:** D-02

## Şu an

- **Etkin dilim:** — (D-02 sırada)
- **Son yapılan:** Faz 3 kurulumu: Next.js 16.4.6 iskeleti, "Şartname kâğıdı" token'ları + IBM Plex, kabuk (başlık, JS'siz mobil menü, iletişim alt bilgisi + imza), 404, `/stil`, robots / sitemap / manifest / OG / favicon, güvenlik başlıkları, CI, sistem dosyaları, ADR-0001. Yerelde check + build + e2e (57 ✓) + Lighthouse + audit yeşil.
- **Sıradaki adım:** `/web-proje devam` → D-02 çok dilli altyapı (next-intl, `/tr` `/en`, dil seçici, `NEXT_LOCALE`). Talha: Vercel projesini bağla, ilk commit'i GitHub'a gönder.

## Gözetimsiz çalışma notları

- 2026-11-27 — v0.1 varsayımlarla yazıldı; v0.2'de Q-01…Q-05 cevaplandı. Açık kalan tek nokta Q-06 (gerçek vercel.app adı).
- 2026-11-27 — Faz 3: yerelde 3000 portunu başka bir Node süreci kullanıyordu (dokunulmadı); e2e ve Lighthouse 3100'de koşturuldu (`E2E_BASE_URL`, `LHCI_PORT`).

## Dilimler

| No | Dilim | Kapsam (özellik / REQ) | Efor | Öncelik | Durum | 360 px | Test |
|---|---|---|---|---|---|---|---|
| D-01 | Tasarım sistemi + kabuk (başlık, mobil menü, alt bilgi + imza, 404, `/stil`, güvenlik başlıkları) | Z-çekirdek · REQ-001 · SCR-006, SCR-008 | M | P0 | ✅ Faz 3 ile | ✅ | responsive, seo, headers, gorsel-kalitesi, robots |
| D-02 | **Çok dilli altyapı**: next-intl, `/tr` `/en`, yerelleştirilmiş yollar, kök yönlendirme, dil seçici, `NEXT_LOCALE` hatırlama, hreflang | X-PRT-09 · REQ-002 · BR-I18N-002…005 | M | P0 | ⏳ | — | — |
| D-03 | **İki dilli içerik verisi**: Zod şemalı `content/*.ts`, 15 proje TR + EN, telefon alanı yok | X-PRT-09b · REQ-003 · BR-I18N-001, 006 · BR-ICR-001 | M | P0 | ⏳ | — | — |
| D-04 | **Fotoğraf**: iki yer tutucu, `next/image`, hero `priority`, hakkımda tembel, iki dilli alt metin, değiştirme kılavuzu | N-01 · REQ-004 · BR-IMG-001…004 | S | P0 | ⏳ | — | — |
| D-05 | Ana sayfa: hero, kanıt şeridi, hikâye akışı, çalışma biçimi, iletişim | Z-07, N-02 · REQ-005 · SCR-001 | M | P0 | ⏳ | — | — |
| D-06 | Proje listesi + filtre (URL'de) + yetkinlik haritası + öne çıkanlar | X-PRT-02, N-03 · REQ-006 · SCR-002 · BR-PRJ-002, 003 | M | P0 | ⏳ | — | — |
| D-07 | Proje detayı (vaka şablonu, önceki / sonraki) | X-PRT-01 · REQ-007 · SCR-003 · BR-PRJ-001, 004 | M | P0 | ⏳ | — | — |
| D-08 | Canlı önizleme: başlat düğmesi, masaüstü / telefon, pencere, zaman aşımı, yedek galeri, açıklamalı masa | N-04 · REQ-008 · BR-PRV-002…004 | M | P0 | ⏳ | — | — |
| D-09 | Önizleme izinleri + görseller: `embed:check` (her köken), `gorsel:manifest` (adlandırma denetimi, EXIF temizliği, yer tutucu), `screenshots:projects` (yalnızca canlı, üstüne yazmaz). Kontrol listesi ve klasör kuralı belgeleri ✅ hazır | N-05 · REQ-009 · BR-PRV-001 · BR-IMG-005…007 | S | P0 | ⏳ | — | — |
| D-10 | **CV**: hakkımda sayfası, yazdırma sayfası, `cv:pdf` betiği, dile göre indirme | X-PRT-07 · REQ-010 · SCR-004, SCR-007 · BR-CV-001…005 | M | P0 | ⏳ | — | — |
| D-11 | İletişim (kopyala + mailto) + gizlilik sayfası + SEO katmanı (JSON-LD, OG, sitemap denetimi) | Z-12, N-06 · REQ-011 · SCR-005 | M | P0 | ⏳ | — | — |
| D-12 | Müsaitlik satırı + cila (hareket, boş durumlar, mikro metin) | X-PRT-05 · REQ-012 | S | P1 | ⏳ | — | — |

Efor: P0 29 + P1 1 = 30 / 30.

**Kapsam izlenebilirliği:**

| Plan satırı | Dilim |
|---|---|
| REQ-001, SCR-006, SCR-008 | D-01 |
| REQ-002 | D-02 |
| REQ-003 | D-03 |
| REQ-004 | D-04 |
| REQ-005, SCR-001 | D-05 |
| REQ-006, SCR-002 | D-06 |
| REQ-007, SCR-003 | D-07 |
| REQ-008 | D-08 |
| REQ-009 | D-09 |
| REQ-010, SCR-004, SCR-007 | D-10 |
| REQ-011, SCR-005 | D-11 |
| REQ-012 | D-12 |

## Etkin dilim planı

— (Faz 4'te doldurulur)

## Görsel inceleme

| Tarih | Dilim / sayfa | GK maddesi | Bulgu | Durum |
|---|---|---|---|---|
| 2026-11-27 | Faz 3 / tüm sayfalar | GK-05, GK-15 | axe: vurgu ikincil zeminde 4,27:1; `--border-strong` 2,93:1 | ✅ düzeltildi (K-16) |
| 2026-11-27 | Faz 3 / `/stil` | GK-08, GK-09 | Ölçek kontrastı belirgin (72 / 16 px), Türkçe harfler doğru, vurgu tek kelimede | ✅ |
| 2026-11-27 | Faz 3 / `/` 390 px | GK-01 | Telefonda ilk ekranda baskın görsel yok (kabuk; fotoğraf henüz yok) | ⏳ D-04 + D-05 |
| 2026-11-27 | Faz 3 / başlık | — | Gezinmede geçici olarak yalnızca "Ana sayfa / İletişim" var | ⏳ D-06, D-10 |

## Kalite kapısı raporu

| Grup | Sonuç | Not |
|---|---|---|
| Faz 3 çıkış | ✅ (yerel) | `pnpm check` ✓ (9 birim testi) · `pnpm build` ✓ (tüm rotalar statik) · `pnpm test:e2e` 57 ✓ / 9 atlandı (tek koşan testler) · Lighthouse `/`: Perf 0,94 · A11y 1 · BP 1 (SEO 0,66 = noindex, beklenen) · `pnpm audit` temiz (2 gerekçeli istisna, K-18) · ilk yük JS tabanı 175 KB |
| Faz 3 çıkış | ⏳ | Vercel önizleme adresi ve GitHub'da CI: depo uzak sunucuya henüz gönderilmedi |

## Bilinen sorunlar

- 6/7 canlı proje iframe'i engelliyor (RSK-01). Talha [onizleme-izinleri.md](onizleme-izinleri.md)'ye göre proje depolarında düzeltecek; D-09'daki `embed:check` doğrular.
- VetFlow'da `frame-ancestors` yok: herkes çerçeveleyebiliyor (tıklama tuzağı). Kontrol listesinde sıkılaştırma önerildi.
- Lighthouse mobil LCP 2,9 sn (hedef < 2,5). Kabukta LCP öğesi hero metni, gecikme yazı tipi yüklemesinden. D-05'te hero görseliyle yeniden ölçülecek; gerekirse yazı ağırlıkları azaltılır.

## Dersler

- 2026-11-27 · Plan · Önizleme fikri, hedef sitelerin `frame-ancestors` / `X-Frame-Options` başlıklarına bağlı; araştırma fazında `curl -I` ile kontrol edilmeseydi geliştirmede fark edilecekti → portfolyo sektör modülüne "iframe ile önizlenecek siteler için başlık denetimi" notu önerilir (20-gorsel-kalite değil, X-PRT §8).
- 2026-11-27 · Faz 3 · İskeletin `pnpm-workspace.yaml`'ı `ignoredBuiltDependencies` kullanıyor; pnpm 12 bunu tanımıyor ve `ERR_PNPM_IGNORED_BUILDS` ile duruyor → iskelet `allowBuilds: { pkg: false }` biçimine geçmeli (iskelet/README §3 tuzaklar).
- 2026-11-27 · Faz 3 · `@lhci/cli` 0.16.1 kayıtta olmayan `devtools-protocol` sürümüne bağlı, kurulamıyor; 0.15.1'in alt bağımlılıklarında yüksek açıklar var → iskelette `overrides` + gerekçeli `auditConfig` örneği (iskelet/README §3).
- 2026-11-27 · Faz 3 · Erişilebilirlik testi sr-only "İçeriğe geç" bağlantısını 1 px hedef sayıyor → kısayol bağlantısı tam boyutta, ekranın üstüne kaydırılarak gizlenmeli (iskelet kök yerleşim örneği).
- 2026-11-27 · Faz 3 · Plan aşamasında hesaplanan vurgu kontrastı yalnızca ana zemine göreydi; ikincil zeminde AA altına düştü → plan §11.2 kontrastları **her yüzey zeminine** göre yazılmalı (20-gorsel-kalite §2).
- 2026-11-27 · Faz 3 · Yerelde 3000 portu başka uygulamadayken Playwright `reuseExistingServer` ve Lighthouse yanlış uygulamayı ölçebilirdi → iskelette port ayarlanabilir olmalı (`E2E_BASE_URL`'den port, `LHCI_PORT`).

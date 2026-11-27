# ADR-0001: Veritabanısız, statik içerikli site

> **Durum:** Kabul edildi · **Tarih:** 2026-11-27

## Bağlam

Varsayılan V1 yığını (01-teknoloji-yigini) Neon PostgreSQL, Drizzle, Better Auth, Resend ve bir yönetim paneli içerir. Bu proje geliştiricinin kendi portfolyosu:

- içerik tek kişiye (geliştiriciye) ait ve ayda birkaç kez değişiyor,
- kullanıcı içeriğin **veri dosyasından** gelmesini istedi,
- iletişim yalnızca e-posta; form yok, kişisel veri toplanmıyor (PLAN.md K-05),
- ziyaretçi hesabı yok (hesap modeli A).

## Karar

Veritabanı, ORM, kimlik doğrulama, e-posta servisi ve yönetim paneli **kurulmaz**. İçerik `content/*.ts` dosyalarında Zod şemasıyla tutulur ve derleme anında doğrulanır. Bütün sayfalar derleme anında statik üretilir (`cacheComponents: false`). İskeletin `src/server/`, `drizzle.config.ts`, `docker-compose.yml`, `scripts/seed.ts` / `reset.ts`, `src/proxy.ts` (panel CSP'si), `.claude/rules/sunucu.md` ve `veri.md`, `demo-banner`, `spam-guard`, `phone.ts`, `money.ts`, `/api/health` dosyaları kopyalanmadı. CI'dan PostgreSQL servisi ve migration adımı çıkarıldı.

## Sonuçlar

- **Olumlu:** Sıfır işletme maliyeti ve gizli bilgi; en hızlı sayfalar; saldırı yüzeyi yok denecek kadar az; içerik git geçmişinde sürümlü.
- **Olumsuz / ödünler:** İçerik güncellemek için kod düzenleyici ve yeniden yayın gerekir (README'de adım adım). Sağlık ucu yok; uptime izleme ana sayfayı yoklar.
- **Yeniden değerlendirme koşulu:** İletişim formu, blog yorumları ya da teknik olmayan birinin içerik düzenlemesi istenirse.

## Değerlendirilen alternatifler

| Seçenek | Neden seçilmedi |
|---|---|
| V1 tam yığın (Neon + panel) | Tek içerik sahibi için panel ve veritabanı bakım yükü; kullanıcı veri dosyası istedi |
| Başsız CMS (Sanity, Contentful) | Dış hesap ve kota; iki dilli alan yönetimi için ek yapılandırma; değer katmıyor |
| MDX dosyaları | Proje kaydı yapılandırılmış veri (durum, teknoloji, önizleme modu); tipli TS + Zod daha güvenli |

## Kaynaklar

- PLAN.md §10, K-04, K-05
- docs/standartlar/00-karar-mantigi.md §5 (V0 / V1 / V2)

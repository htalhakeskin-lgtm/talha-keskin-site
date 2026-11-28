# Önizleme İzinleri: Başlık Ayarı Kontrol Listesi

> **Amaç:** Projelerin portfolyodaki önizleme penceresinde (iframe) açılması.
> **Durum tarihi:** 2026-11-27 (başlıklar `curl -I` ile okundu)
> **Plan:** [PLAN.md §5.5](../PLAN.md#55-portfolyo-adresi-ve-önizleme-izinleri) · K-11

## Kural (her projede aynı)

1. `X-Frame-Options` başlığını **sil**. Bu başlık izin listesi tutamaz, yalnızca `DENY` ya da `SAMEORIGIN` olabilir.
2. CSP'deki `frame-ancestors` değerini `'self'` + portfolyo adres(ler)i yap. Eski değer `'none'` olabilir ya da hiç olmayabilir.
3. Portfolyo adreslerini kodda **tek bir yerde** tut: tercihen `PORTFOLIO_ORIGINS` ortam değişkeninde. Adresler boşlukla ayrılır.

Sonuç böyle görünmeli:

```
Content-Security-Policy: ...; frame-ancestors 'self' https://talha-keskin.vercel.app
```

> `frame-ancestors` yalnızca **sitenin kimin içinde gösterilebileceğini** belirler. Başka hiçbir siteye izin verilmez; tıklama tuzağına (clickjacking) karşı koruma sürer. `*` ya da `https://*.vercel.app` **yazma**: Vercel'deki herkese izin verir.

---

## 0. Ortam değişkeni (Vercel'deki her projede bir kez)

Vercel → Proje → **Settings → Environment Variables**:

| Key | Value | Environments |
|---|---|---|
| `PORTFOLIO_ORIGINS` | `https://talha-keskin.vercel.app` | Production, Preview |

Alan adı alınca değer `https://talha-keskin.vercel.app https://<alan-adi>` olur. Değişken değişince proje **yeniden yayınlanmalı**: Deployments → son yayın → ⋯ → Redeploy.

## 1. Başlık nerede ayarlanıyor? (her projede önce bunu çalıştır)

Proje klasöründe şunu çalıştır:

```bash
grep -rn --exclude-dir=node_modules --exclude-dir=.next -E "frame-ancestors|X-Frame-Options|x-frame-options" .
```

Çıkan dosya hangi kalıba uyuyorsa aşağıdaki A–D'den onu uygula.

---

## A. Next.js, başlıklar `next.config.ts` içinde

```ts
// next.config.ts — dosyanın üstüne
const portfolioOrigins = (process.env.PORTFOLIO_ORIGINS ?? "")
  .split(/\s+/)
  .filter((origin) => /^https:\/\/[a-z0-9.-]+$/i.test(origin)); // yalnızca düz https kökenleri

const frameAncestors = ["'self'", ...portfolioOrigins].join(" ");
```

`headers()` içinde:

```ts
// 1) Bu satırı SİL:
// { key: "X-Frame-Options", value: "DENY" },

// 2a) CSP zaten varsa: içindeki frame-ancestors 'none' kısmını değiştir:
//     `... ; frame-ancestors ${frameAncestors}; ...`

// 2b) CSP hiç yoksa: şu başlığı ekle:
{ key: "Content-Security-Policy", value: `frame-ancestors ${frameAncestors}` },
```

## B. Next.js, nonce'lu CSP `proxy.ts` / `middleware.ts` içinde

```ts
// src/lib/frame-ancestors.ts (yeni dosya)
export function frameAncestors(): string {
  const origins = (process.env.PORTFOLIO_ORIGINS ?? "")
    .split(/\s+/)
    .filter((origin) => /^https:\/\/[a-z0-9.-]+$/i.test(origin));
  return ["'self'", ...origins].join(" ");
}
```

CSP metnini kuran yerde `frame-ancestors 'none'` yerine `` `frame-ancestors ${frameAncestors()}` `` yaz. `X-Frame-Options` ayarlayan satırı (`response.headers.set("X-Frame-Options", ...)` ya da `next.config.ts`'te) sil.

## C. Nginx (kendi sunucunda, Docker arkasında)

Önce başlığın **uygulamadan mı, Nginx'ten mi** geldiğine bak (adım 1). Uygulamadan geliyorsa A ya da B'yi uygula, Nginx'e dokunma.

Nginx'ten geliyorsa:

```nginx
# server { ... } bloğunda, adres listesi TEK yerde:
set $portfolio_origins "https://talha-keskin.vercel.app";

# SİL:
# add_header X-Frame-Options "DENY" always;

# CSP satırında frame-ancestors kısmını değiştir:
add_header Content-Security-Policy "...; frame-ancestors 'self' $portfolio_origins" always;
```

Sonra `sudo nginx -t && sudo systemctl reload nginx`.
⚠️ Bir `location` bloğunda kendi `add_header` satırı varsa, `server` düzeyindeki başlıklar o blokta **geçersiz kalır**. CSP'yi o bloğa da ekle.

## D. Statik site / PHP, `vercel.json` ile

`vercel.json` ortam değişkeni okuyamaz. Adresleri buraya **tek satırda** yaz:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "frame-ancestors 'self' https://talha-keskin.vercel.app" }
      ]
    }
  ]
}
```

Aynı dosyada `X-Frame-Options` girdisi varsa sil. Başlık PHP'de `header("X-Frame-Options: DENY");` ile veriliyorsa o satırı sil ve yerine şunu yaz:

```php
header("Content-Security-Policy: frame-ancestors 'self' " . (getenv('PORTFOLIO_ORIGINS') ?: ''));
```

---

## Proje proje kontrol listesi

> **Durum (2026-11-28):** Değişiklikler her depoda PR olarak birleştirildi; Vercel projelerine `PORTFOLIO_ORIGINS=https://talha-keskin.vercel.app` (Production + Preview) eklendi. "Canlıda" sütunu `curl -I` ile doğrulandı.

| ✓ | Proje | Adres | Önce | Kalıp | PR | Canlıda |
|---|---|---|---|---|---|---|
| [~] | Golden Börekçilik | goldenborek.com | XFO `DENY` + `frame-ancestors 'none'` | A (liste `src/config/portfolio.ts`; Docker imajı) | [#141](https://github.com/htalhakeskin-lgtm/golden-borekcilik/pull/141) ✅ | ⏳ **Sunucuya yayın bekliyor:** imaj Actions'ta derlenir (özel depo; Actions fatura sorunu yüzünden duruyor), ardından sunucuda `deploy.sh` |
| [x] | REVNAK | revnak-gayrimenkul.vercel.app | XFO `SAMEORIGIN`, CSP yok | A (2b) + `/panel` `'none'` | [#1](https://github.com/htalhakeskin-lgtm/revnak-gayrimenkul/pull/1) ✅ | ✅ CLI ile yayınlandı (Vercel ↔ Git bağlı değil) |
| [ ] | VetFlow | veteriner-site-web.vercel.app | Başlık yok (herkes çerçeveleyebilir) | — | — | Önizleme zaten açılıyor. **Değiştirilmedi:** `apps/web/vercel.json` eski `routes` biçiminde; `headers` ile birlikte kullanılamaz, sıkılaştırma yönlendirmeyi değiştirmeyi gerektirir (öneri olarak açık) |
| [x] | Nail Art Studios | bahadirkarasu-nails.vercel.app | XFO `DENY` + `'none'` | A | [#29](https://github.com/htalhakeskin-lgtm/nail-art-studio/pull/29) ✅ | ✅ |
| [x] | Diyetisyen | bionluk-diyetisyen-web-sitesi.vercel.app | XFO `DENY` | D (`vercel.json`, liste bu dosyada) | [#1](https://github.com/htalhakeskin-lgtm/bionluk-diyetisyen-web-sitesi/pull/1) ✅ | ✅ CLI ile yayınlandı; yerelde kalmış alt bilgi imzası da depoya işlendi |
| [x] | Bütçe | butce-demo.vercel.app | XFO `DENY` + nonce'lu `'none'` | B (bütün uygulama) | [#13](https://github.com/htalhakeskin-lgtm/butce-ve-harcama-takip/pull/13) ✅ | ✅ CLI ile yayınlandı; kök `/login`'e yönlenir |
| [x] | Kartela | kartela-jade.vercel.app · rakim-kahve.vercel.app | XFO `DENY` + `'none'` | A | [#34](https://github.com/htalhakeskin-lgtm/kartela-qr-menu/pull/34) ✅ | ✅ (Vercel'deki son üretim adı `rakim-kahve.vercel.app`) |
| [x] | Levha | levha-dovme-piercing.vercel.app | XFO `DENY` + `'none'` | A | [#45](https://github.com/htalhakeskin-lgtm/levha-dovme-piercing/pull/45) ✅ | ✅ (planda canlı adresi yok sanılıyordu, K-22) |

Paneller (`/panel`, `/hesabim`, REVNAK ofis paneli) her projede `frame-ancestors 'none'` olarak kaldı.

## Doğrulama

Her projede değişiklikten ve yeniden yayından sonra:

```bash
curl -sI https://goldenborek.com | grep -iE "x-frame-options|content-security-policy"
```

PowerShell:

```powershell
(Invoke-WebRequest -Method Head -Uri https://goldenborek.com).Headers["Content-Security-Policy"]
```

**Beklenen:** `X-Frame-Options` satırı **yok**, CSP içinde `frame-ancestors 'self' https://talha-keskin.vercel.app` var.

Portfolyo kurulduktan sonra tek komut hepsini denetler: `pnpm embed:check`. Bu komut her proje × her portfolyo adresi için ✅ / ❌ tablosu verir.

## Alan adına taşınırken

1. **Portfolyo** (Vercel ayarları):
   - `NEXT_PUBLIC_SITE_URL=https://<alan-adi>`
   - `PORTFOLIO_ORIGINS=https://talha-keskin.vercel.app https://<alan-adi>`. Eski adres de yayında kaldığı için listede durur.
2. **Her proje:**
   - A / B kalıbındaki projelerde `PORTFOLIO_ORIGINS`'e yeni adresi ekle ve Redeploy et.
   - C ve D kalıbındaki projelerde tek satırı düzenle.
3. `pnpm embed:check`: tablonun tamamı ✅ olmalı.

## Bilinen sınırlar

- **İframe içinde giriş yapılamaz:** Tarayıcılar üçüncü taraf çerezlerini engeller. Panel ekranları önizlenmez, galeride gösterilir.
- **Portfolyonun PR önizleme adresleri listede yok:** Bu bilerek böyle (`*.vercel.app` jokeri güvensiz). PR önizlemesinde önizleme penceresinin yerine hata durumu ve "yeni sekmede aç" görünür.

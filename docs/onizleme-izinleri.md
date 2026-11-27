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
Content-Security-Policy: ...; frame-ancestors 'self' https://<ad-soyad>.vercel.app
```

> `frame-ancestors` yalnızca **sitenin kimin içinde gösterilebileceğini** belirler. Başka hiçbir siteye izin verilmez; tıklama tuzağına (clickjacking) karşı koruma sürer. `*` ya da `https://*.vercel.app` **yazma**: Vercel'deki herkese izin verir.

---

## 0. Ortam değişkeni (Vercel'deki her projede bir kez)

Vercel → Proje → **Settings → Environment Variables**:

| Key | Value | Environments |
|---|---|---|
| `PORTFOLIO_ORIGINS` | `https://<ad-soyad>.vercel.app` | Production, Preview |

Alan adı alınca değer `https://<ad-soyad>.vercel.app https://<alan-adi>` olur. Değişken değişince proje **yeniden yayınlanmalı**: Deployments → son yayın → ⋯ → Redeploy.

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
set $portfolio_origins "https://<ad-soyad>.vercel.app";

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
        { "key": "Content-Security-Policy", "value": "frame-ancestors 'self' https://<ad-soyad>.vercel.app" }
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

| ✓ | Proje | Adres | Şu anki başlık | Muhtemel kalıp | Yapılacak |
|---|---|---|---|---|---|
| [ ] | Golden Börekçilik | goldenborek.com | `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'` | A / B ya da C (Docker + Nginx) | XFO'yu sil, `'none'` → `'self' ${PORTFOLIO_ORIGINS}`. Sunucuda `PORTFOLIO_ORIGINS`'i `.env` / compose dosyasına ekle |
| [ ] | REVNAK | revnak-gayrimenkul.vercel.app | `X-Frame-Options: SAMEORIGIN`, CSP yok | A (2b) | XFO'yu sil, yalnızca `frame-ancestors` içeren CSP ekle |
| [ ] | VetFlow | veteriner-site-web.vercel.app | Başlık yok, **herkes çerçeveleyebiliyor** | D | Önizleme zaten açılıyor. Öneri: D ile `frame-ancestors`'u portfolyoyla sınırla (şu an tıklama tuzağına açık) |
| [ ] | Nail Art Studios | bahadirkarasu-nails.vercel.app | `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'` | A | XFO'yu sil, `'none'` → değişken |
| [ ] | Diyetisyen | bionluk-diyetisyen-web-sitesi.vercel.app | `X-Frame-Options: DENY`, CSP yok | D (`vercel.json` ya da PHP `header()`) | XFO'yu sil, CSP ekle |
| [ ] | Bütçe | butce-demo.vercel.app | `X-Frame-Options: DENY` + nonce'lu CSP `frame-ancestors 'none'`; kök `/` 307 ile yönleniyor | B | XFO'yu sil, CSP'de değişken. Not: önizleme yönlenen sayfayı (giriş / tanıtım) gösterir; vitrin sayfası varsa veri dosyasında önizleme adresi olarak o verilir |
| [ ] | Kartela | kartela-jade.vercel.app | `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'` | A | XFO'yu sil, `'none'` → değişken. CSP'deki `frame-src 'none'` kalabilir (Kartela'nın kendi içine gömdüğü şeylerle ilgili) |

## Doğrulama

Her projede değişiklikten ve yeniden yayından sonra:

```bash
curl -sI https://goldenborek.com | grep -iE "x-frame-options|content-security-policy"
```

PowerShell:

```powershell
(Invoke-WebRequest -Method Head -Uri https://goldenborek.com).Headers["Content-Security-Policy"]
```

**Beklenen:** `X-Frame-Options` satırı **yok**, CSP içinde `frame-ancestors 'self' https://<ad-soyad>.vercel.app` var.

Portfolyo kurulduktan sonra tek komut hepsini denetler: `pnpm embed:check`. Bu komut her proje × her portfolyo adresi için ✅ / ❌ tablosu verir.

## Alan adına taşınırken

1. **Portfolyo** (Vercel ayarları):
   - `NEXT_PUBLIC_SITE_URL=https://<alan-adi>`
   - `PORTFOLIO_ORIGINS=https://<ad-soyad>.vercel.app https://<alan-adi>`. Eski adres de yayında kaldığı için listede durur.
2. **Her proje:**
   - A / B kalıbındaki projelerde `PORTFOLIO_ORIGINS`'e yeni adresi ekle ve Redeploy et.
   - C ve D kalıbındaki projelerde tek satırı düzenle.
3. `pnpm embed:check`: tablonun tamamı ✅ olmalı.

## Bilinen sınırlar

- **İframe içinde giriş yapılamaz:** Tarayıcılar üçüncü taraf çerezlerini engeller. Panel ekranları önizlenmez, galeride gösterilir.
- **Portfolyonun PR önizleme adresleri listede yok:** Bu bilerek böyle (`*.vercel.app` jokeri güvensiz). PR önizlemesinde önizleme penceresinin yerine hata durumu ve "yeni sekmede aç" görünür.

# Proje Görselleri: Klasör ve Adlandırma Kuralı

> **Plan:** [PLAN.md §5.6](../PLAN.md#56-proje-görselleri) · K-15 · BR-IMG-005…007

## Klasör

```
public/
  projects/
    <slug>/
      cover.png
      desktop-01.png
      desktop-02.png
      mobile-01.png
      ...
```

Klasörleri şimdi oluşturup görselleri yerleştirebilirsin; kurulum sırasında korunurlar. Görseli olmayan proje sitede yer tutucuyla görünür, sayfa kırılmaz.

## Slug listesi (klasör adları)

| Proje | Klasör | Görsel kaynağı |
|---|---|---|
| Golden Börekçilik | `golden-borekcilik` | Otomatik çekim + istersen senin görsellerin |
| Kurumsal web test otomasyonu (Belediye) | `kurumsal-test-otomasyonu` | **Yalnızca senin gizlenmiş görsellerin** |
| EduNex | `edunex` | **Yalnızca senin gizlenmiş görsellerin** |
| REVNAK | `revnak` | Otomatik çekim |
| VetFlow | `vetflow` | Otomatik çekim |
| Nail Art Studios | `nail-art-studios` | Otomatik çekim |
| Levha | `levha` | Otomatik çekim (canlı: levha-dovme-piercing.vercel.app) + istersen senin görsellerin |
| Diyetisyen sitesi | `diyetisyen` | Otomatik çekim |
| Butik otel | `butik-otel` | **Yalnızca senin gizlenmiş görsellerin** |
| NK Nakliye | `nk-nakliye` | **Yalnızca senin gizlenmiş görsellerin** |
| Bütçe takip | `butce-takip` | Otomatik çekim |
| Kartela | `kartela` | Otomatik çekim |
| Acutus | `acutus` | **Yalnızca senin gizlenmiş görsellerin** (masaüstü) |
| Ritim | `ritim` | **Yalnızca senin gizlenmiş görsellerin** (telefon) |
| FestOS | `festos` | **Yalnızca senin gizlenmiş görsellerin** |

Otomatik çekim (`pnpm screenshots:projects`) var olan dosyanın üstüne **yazmaz**. Bir canlı projeye kendi görselini koyarsan o kullanılır.

## Dosya adları

| Dosya | Rol | Oran | En az | İdeal |
|---|---|---|---|---|
| `cover.<uzantı>` | Kart, proje detayının üstü, paylaşım görseli | 16:10 | 1440 × 900 | **2880 × 1800** |
| `desktop-01` … `desktop-08` | Masaüstü galerisi | 16:10 | 1440 × 900 | 2880 × 1800 |
| `mobile-01` … `mobile-06` | Telefon galerisi | ≈ 9:19,5 | 390 × 844 | **780 × 1688** |

**Kurallar:**
- Yalnızca küçük harf, rakam ve tire. Türkçe karakter ve boşluk yok. `Masaüstü 1.PNG` yerine `desktop-01.png`.
- Sıra numarası iki hanelidir (`01`, `02`, …) ve galerideki sırayı belirler.
- Uzantı `.png`, `.jpg`, `.jpeg` ya da `.webp`. Dosya başına en fazla 5 MB.
- Klasörde bu adlara uymayan dosya olursa `pnpm gorsel:manifest` hata verir; dosya sessizce yok sayılmaz.
- `cover` yoksa kapak olarak sırasıyla `desktop-01` ya da telefon çerçevesi içinde `mobile-01` kullanılır, hiçbiri yoksa yer tutucu.
- Masaüstü uygulamasında (Acutus) yalnızca `desktop-*`, mobil uygulamada (Ritim) yalnızca `mobile-*` yeterli.

**Keskin çekim için:** Chrome DevTools → cihaz araç çubuğu (Ctrl+Shift+M) → boyut 1440 × 900, **DPR 2** → ⋮ → "Capture screenshot". Böylece 2880 × 1800 alınır. Telefon için 390 × 844, DPR 2.

## Gizlilik (önemli)

- `public/` altındaki **her dosya herkese açıktır**. Sitede kullanılmasa bile `/projects/<slug>/<dosya>` adresinden indirilebilir. Bu klasöre yalnızca hassas verisi gizlenmiş son hâlleri koy. Not ya da açıklama dosyası koyma.
- Gizlemeyi **düz renkli kutuyla** yap. Bulanıklaştırma ve pikselleştirme bazen geri çözülebilir.
- `gorsel:manifest` görsellerdeki EXIF / GPS üst verisini temizleyerek dosyayı yeniden yazar. Yine de konum bilgisi içeren telefon fotoğrafı koyma.

## Açıklamalar (alt metin)

Her görselin TR / EN alt metni `content/projects.ts`'te tutulur. Görselleri yerleştirince ben bakıp ilk taslağı yazarım. İstersen hangi görselin neyi gösterdiğini mesajla ilet.

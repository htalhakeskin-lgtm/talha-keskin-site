# Proje Planı — Talha Keskin Kişisel Portfolyo

| Alan | Bilgi |
|---|---|
| Belge sürümü | v0.3 |
| Tarih | 2026-11-27 |
| Durum | Onaylandı · Geliştiriliyor (Faz 3 tamam) |
| Kapsam seviyesi | S2 ([§2](#2-kapsam-seviyesi)) |
| Hesap modeli | A, hesapsız ([§8](#8-hesap-ve-yetki-modeli)) |
| Teknoloji varyantı | V1, veritabanısız statik çıktı ([§10](#10-teknoloji-ve-mimari-kararlar)) |
| Ortam | Gerçek (geliştiricinin kendi sitesi, gerçek içerik) |
| Yayın | Vercel, `https://<ad-soyad>.vercel.app`; ileride özel alan adına taşınacak (tek değişken, [§5.5](#55-portfolyo-adresi-ve-önizleme-izinleri)) |
| Kaynak kod | GitHub `htalhakeskin-lgtm`, açık depo (V-08) |
| Sistem sürümü | web-proje 1.2.0 |

> **Güncel durum:** Plan onaylandı (2026-11-27, `/web-proje kur`). Faz 3 kurulumu bitti: iskelet, tasarım token'ları, kabuk, `/stil`, CI ve testler yerelde yeşil. Sıradaki dilim D-02 (çok dilli altyapı). Başlık ayarı kontrol listesi: [docs/onizleme-izinleri.md](docs/onizleme-izinleri.md). Proje görseli klasör kuralı: [docs/proje-gorselleri.md](docs/proje-gorselleri.md).
>
> **Konum notu (K-01):** Kullanıcı planı `PLAN.md` adıyla istedi. Bu dosya planın tek doğru kaynağıdır. `docs/proje-plani.md` yalnızca buraya yönlendirir.

---

## İçindekiler
1. Proje özeti ve hedefler · 2. Kapsam seviyesi · 3. Hedef kitle ve roller · 4. Araştırma özeti ve varsayımlar · 5. Özellik listesi · 6. Site haritası ve ekranlar · 7. Kullanıcı akışları · 8. Hesap ve yetki modeli · 9. Veri modeli ve iş kuralları · 10. Teknoloji ve mimari kararlar · 11. Tasarım yönü · 12. Yönetim paneli · 13. CRM ve süreç yapısı · 14. Yasal ve içerik gereklilikleri · 15. SEO planı · 16. Güvenlik, performans, erişilebilirlik hedefleri · 17. Entegrasyonlar · 18. Test planı ve kalite kapıları · 19. İçerik verisi ve canlıya geçiş · 20. Yayın ve operasyon · 21. Portfolyo planı · 22. Riskler ve açık sorular · 23. İlerleme ve karar günlüğü · [Kapsam Dışı](#kapsam-dışı)

---

## 1. Proje özeti ve hedefler

**Tek cümle:** İşverenlere ve müşterilere, Talha'nın gerçek projelerini site içinde canlı olarak deneyimletip yetkinliğini somut örneklerle gösteren, iki dilli bir dijital CV.

**Vizyon:** Ziyaretçi kariyer hikâyesini (DEÜ → Sakarya BB stajı → serbest işler → Golden Börek) kaydırarak okur. Projeleri sektöre ve teknolojiye göre süzer, istediğini siteden ayrılmadan önizleme penceresinde kullanır, gerekirse tek tıkla gerçek siteye geçer. Sonunda CV'yi kendi dilinde indirir ya da e-posta atar.

| Hedef | Ölçüt | Hedef değer |
|---|---|---|
| Temas üretmek | E-posta kopyala / mailto, LinkedIn, CV indirme tıklamaları | Yayından sonra 4 hafta ölçülüp baz alınır |
| Projeleri deneyimletmek | "Önizlemeyi başlat" tıklaması / proje detayı görüntüleme | Baz alınır |
| Görünürlük | "Hasan Talha Keskin", "Talha Keskin yazılım" | İlk sırada |
| Kalite | Lighthouse mobil | Performans ≥ 90, Erişilebilirlik ≥ 95, En iyi uygulamalar ≥ 95, SEO = 100 |

## 2. Kapsam seviyesi

| Kilit sinyal | Var mı | Kanıt |
|---|---|---|
| Ödeme, zorunlu hesap, çok kiracı | Hayır | — |
| Filtreli katalog ≥ 20 kayıt | Hayır | 15 proje |
| Etkileşimli araçlardan ≥ 3 (S3) | Sınırda | Önizleme, filtre, yetkinlik haritası. Hepsi tek veri kaynağını süzüyor, ayrı iş mantığı yok |
| 5'ten fazla sayfa | Evet | Ana sayfa, projeler, 15 proje detayı, hakkımda, gizlilik × 2 dil |
| ≥ 2 dil (X-PRT-09, S2) | Evet | TR + EN |

**Seviye:** S2 · **Gerekçe:** Çok sayfa + iki dil S2 sinyali. Etkileşimli araçlar S3 sinyaline sınırda ama veritabanı, panel ve rol olmadığı için S3 derinliği gerekmiyor. "Etkileyici olsun" isteği seviyeyi yükseltmez, fark yaratan payla karşılanır (KM-02). · **Zaman kutusu:** 3 odaklı gün · **Efor bütçesi:** 30 puan

## 3. Hedef kitle ve kullanıcı rolleri

| Rol | Kim | Ne yapar | Başlıca cihaz |
|---|---|---|---|
| İşveren / işe alım | Yazılım ekip lideri, İK | Deneyim, yığın ve kanıt arar, CV indirir | Masaüstü (iş saatinde), LinkedIn'den gelince telefon |
| Potansiyel müşteri | KOBİ sahibi (restoran, klinik, emlak) | Kendi sektöründe yapılmış işi ve çalışma biçimini arar, e-posta atar | Telefon |
| Yabancı ziyaretçi | Uzaktan iş veren şirket | İngilizce sürümü okur | Masaüstü |
| İçerik sahibi | Talha | Veri dosyasını ve görselleri günceller, CV PDF'ini yeniden üretir | Bilgisayar (kod düzenleyici) |

## 4. Araştırma özeti ve varsayımlar

Ayrıntı: [docs/arastirma.md](docs/arastirma.md)

**Öne çıkan bulgular:**
- Öne çıkan geliştirici portfolyolarında projeler ekran görüntüsü + dış bağlantı olarak duruyor. **Site içinde gerçek kullanım** belirgin bir boşluk ve fark yaratan özellik.
- Geliştirici portfolyosu klişeleri: mor-mavi degrade, 3B leke, yeşil terminal ve daktilo efekti, yüzdeli yetenek çubukları. Konsept bunlardan ayrışmalı.
- **Engel:** Canlı 7 adresten 6'sı `X-Frame-Options` / `frame-ancestors 'none'` ile iframe'i engelliyor (yalnızca VetFlow açılıyor). Çözüm, her projede `frame-ancestors`'a portfolyo alanını eklemek. CSP Level 2 destekleyen tarayıcılarda `frame-ancestors` varken `X-Frame-Options` yok sayılır ([OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html)).
- KVKK çerez rehberine göre tercih hatırlayan işlevsel çerez rıza gerektirmiyor. Analitik çerezsizse çerez bandı gerekmiyor.

**Varsayımlar:**

| No | Varsayım | Neden | Değişirse etkisi |
|---|---|---|---|
| V-01 | ~~Varsayım~~ → **Kesinleşti (Q-02):** Kaynak `Hasan_Talha_Keskin_Portfolyo.md`, CV'den şu düzeltmelerle: EduNex veritabanı **PostgreSQL** (MySQL değil) + JWT; Acutus'ta **Demucs ile vokal / enstrüman ayırma** (Python, Web Audio API, Better-SQLite3) | Kullanıcı cevabı | — |
| V-02 | Rol: belirtilmeyen projelerde "Tek geliştirici: analizden yayına". **EduNex: "4 kişilik ekibin lideri; backend mimarisi, veritabanı ilişkileri ve API sözleşmeleri" (Q-02 ile kesinleşti).** Staj: "Stajyer geliştirici, sistemin tasarımı ve geliştirmesi". | Rol alanı yalnızca Golden Börek ve EduNex için açık | Veri dosyası |
| V-03 | Unvan: TR "Full Stack Yazılım Geliştirici", EN "Full Stack Software Developer". Eğitim: **"Dokuz Eylül Üniversitesi, Bilgisayar Programcılığı (Ön Lisans), 2024–2026, mezun"** (Q-02 ile kesinleşti). | Kullanıcının kendi tanımı | Veri dosyası |
| V-04 | İngilizce metinleri ilk taslak olarak ben çeviririm, Talha gözden geçirir. | İçerik yalnızca Türkçe mevcut | Veri dosyası |
| V-05 | CV PDF'leri sitenin veri dosyasından üretilir (yazdırma sayfası + Playwright). Böylece telefon numarası PDF'e hiç girmez ve site ile CV hep tutarlıdır. | Telefon yasağı + tek kaynak ilkesi | Kullanıcı hazır PDF verirse D-10 S'ye iner; telefonsuz olduğu elle kontrol edilir |
| V-06 | Hero ve hakkımda için **iki ayrı fotoğraf dosyası** kullanılır (GK-03). Talha tek fotoğraf verirse iki farklı kırpım (hero dikey portre, hakkımda yatay / daha geniş) kullanılır. | Aynı görsel iki rolde kullanılmaz | Yalnızca dosyalar |
| V-07 | Canlı adresi olmayan ya da iframe izni olmayan projelerde önizleme yerine ekran görüntüsü galerisi gösterilir. **Canlı adresi olmayan 8 projede yalnızca Talha'nın verdiği, hassas verisi gizlenmiş görseller kullanılır (Q-04); bu projeler için otomatik çekim yapılmaz.** Görseller gelene kadar yer tutucu. | Önizleme her projede mümkün değil | Veri dosyasında `preview.mode` |
| V-08 | Depo açık (kaynak kodun kendisi bir kanıt). | İşverene kod kalitesi gösterilir | Gizli olursa yalnızca README bağlantısı kalkar |
| V-09 | Butik otel (akademik) ve iki geliştirme aşamasındaki proje (Ritim, FestOS) listede yer alır, öne çıkanlarda yer almaz. | Durum etiketleri dürüst kalsın | Veri dosyasında `featured` |

## 5. Özellik listesi

**Zorunlu paketler (K4):** Çekirdek (uyarlanmış, aşağıda) · **≥ 2 dil paketi** (i18n, `hreflang`, çeviri alanları, dil seçici). Form, çerez tercih merkezi, randevu, ödeme ve hesap paketleri tetiklenmez (form ve zorunlu dışı çerez yok).

**Çekirdeğin uyarlanması:** Z-07, Z-08, Z-11, Z-12, Z-16–Z-27, Z-33–Z-35 olduğu gibi alınır. Uygulanmayanlar:

| Kod | Neden uygulanmaz |
|---|---|
| Z-01, Z-05, Z-13, Z-15, Z-29 | İletişim formu yok (yalnızca e-posta), kişisel veri toplanmıyor → aydınlatma, onay kaydı, teşekkür ekranı, talep kutusu yok (K-05) |
| Z-02 | Zorunlu dışı çerez yok → tercih merkezi yok; gizlilik sayfasında çerez açıklaması var |
| Z-04 | Künye yerine kişisel iletişim: e-posta, GitHub, LinkedIn. **Telefon yok** (BR-ICR-001) |
| Z-06 | Gerçek içerik; demo paketi uygulanmaz (X-PRT §11) |
| Z-09, Z-14 | Adres / harita / telefon yok. Mobil eylem çubuğu yerine başlıkta "İletişim" + hero'da tek eylem (GK-14) |
| Z-10 | SSS yerine "Çalışma biçimim" bölümü (portfolyo §Çalışma biçimim) |
| Z-28, Z-30, Z-31, Z-32 | Panel ve veritabanı yok; içerik veri dosyasından (K-04). Sağlık ucu yerine Vercel uptime yeterli |

| Kod | Özellik | Etiket | D | İ | B | Y | G | Puan | Efor | Öncelik | Dilim | REQ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Z-çekirdek | Kabuk, tasarım sistemi, 404, imza, güvenlik başlıkları | Z | — | — | — | — | — | — | M | P0 | D-01 | REQ-001 |
| X-PRT-09 | Çok dilli altyapı (TR / EN, dil seçici, hatırlama, hreflang) | X | 1 | 1 | 0 | 0 | 1 | 3 | M | P0 ¹ | D-02 | REQ-002 |
| X-PRT-09b | İki dilli içerik veri dosyaları (Zod şemalı) | X | 1 | 1 | 0 | 0 | 1 | 3 | M | P0 ¹ | D-03 | REQ-003 |
| N-01 | Fotoğraf: hero + hakkımda, optimize, değiştirilebilir yer tutucu | S | 1 | 1 | 1 | 0 | 1 | 4 | S | P0 ¹ | D-04 | REQ-004 |
| Z-07 + N-02 | Ana sayfa: hero + kariyer hikâyesi akışı + çalışma biçimi | Z | 1 | 1 | 1 | 0 | 1 | 4 | M | P0 | D-05 | REQ-005 |
| X-PRT-02 + N-03 | Proje listesi + durum / sektör / teknoloji filtresi + yetkinlik haritası | X | 1 | 1 | 1 | 0 | 1 | 4 | M | P0 | D-06 | REQ-006 |
| X-PRT-01 | Proje detayı (vaka şablonu: bağlam → yaklaşım → kararlar → sonuç; rol, yıl, teknoloji, bağlantılar) | X | 1 | 1 | 1 | 0 | 1 | 4 | M | P0 | D-07 | REQ-007 |
| N-04 | **Canlı önizleme penceresi** (tembel yükleme, masaüstü / telefon geçişi, yedek galeri) | S | 1 | 1 | 0 | 0 | 1 | 3 | M | P0 ² | D-08 | REQ-008 |
| N-05 | Önizleme izin denetimi (`embed:check`) + projelerin başlık ayarları + ekran görüntüsü üretimi | S | 1 | 1 | 0 | 0 | 1 | 3 | S | P0 ² | D-09 | REQ-009 |
| X-PRT-07 | Hakkımda / CV sayfası + dile göre CV PDF indirme | X | 1 | 1 | 1 | 0 | 1 | 4 | M | P0 ¹ | D-10 | REQ-010 |
| Z-12 + N-06 | İletişim bölümü (e-posta kopyala + mailto, GitHub, LinkedIn) + gizlilik sayfası + SEO katmanı | Z | 1 | 1 | 1 | 0 | 1 | 4 | M | P0 | D-11 | REQ-011 |
| X-PRT-05 | Müsaitlik durumu ("Yeni projelere açığım") + cila | X | 1 | 0 | 0 | 0 | 1 | 2 | S | P1 | D-12 | REQ-012 |

¹ Kullanıcının açıkça istediği özellik; P0'a alındı. ² Ana dönüşüm akışının (projeyi deneyimletme) parçası, P0.

**Fark yaratan özellikler (~%20, 7 puan):** Canlı önizleme (N-04) ve izin denetimi (N-05). Rakiplerde yok ama işverenin asıl sorusunu ("bu çalışıyor mu?") cevaplıyor. Yetkinlik haritası (N-03) süs değil, projeleri süzen bir araç: "Next.js"e dokununca o projeler kalır.

**Efor özeti:** P0 3+3+3+1+3+3+3+3+1+3+3 = 29 puan + P1 1 puan = **30 / bütçe 30**

### 5.1 Gereksinimler

| No | Gereksinim | Kabul kriterleri | Kurallar | Ekran |
|---|---|---|---|---|
| REQ-001 | Kabuk ve tasarım sistemi | Başlık (logo-ad, gezinme, dil seçici yeri, İletişim), JS'siz açılan mobil menü, alt bilgi ve son satırda "Created by Talha Keskin". `/stil` sayfası noindex. 404 iki dilde. 360–1536 px'te yatay kaydırma yok. | — | Hepsi |
| **REQ-002** | **Çok dilli yapı** | Bkz. [§5.2](#52-çok-dilli-yapı-d-02--d-03) | BR-I18N-001…006 | Hepsi |
| **REQ-003** | **İki dilli içerik verisi** | Bkz. [§5.2](#52-çok-dilli-yapı-d-02--d-03) | BR-I18N-003, BR-ICR-001 | Hepsi |
| **REQ-004** | **Fotoğraf kullanımı** | Bkz. [§5.4](#54-fotoğraf-kullanımı-d-04) | BR-IMG-001…004 | SCR-001, SCR-004 |
| REQ-005 | Ana sayfa | Hero'da ad, unvan, tek cümle, fotoğraf, tek birincil eylem ("Projeleri gör"). Hikâye akışı 5–6 durak (DEÜ, staj, serbest çalışma, Golden Börek, bugün). Çalışma biçimi 5 adım. Öne çıkan 4 proje. | BR-PRJ-002 | SCR-001 |
| REQ-006 | Proje listesi ve filtre | 15 proje kartı (durum etiketi, yıl, rol, 3–5 teknoloji). Durum, sektör ve teknolojiye göre filtre; filtre URL'de (`?tech=nextjs`), geri tuşu çalışır. Boş sonuçta "Filtreyi temizle". Yetkinlik haritasında bir teknolojiye tıklamak listeyi süzer. | BR-PRJ-001, 003 | SCR-002 |
| REQ-007 | Proje detayı | Başlık, durum, yıl, rol, teknolojiler, özet, ne yaptım (madde), öne çıkan kararlar, önizleme alanı, "Siteyi aç ↗" (yeni sekme, `rel="noopener"`), önceki / sonraki proje. Canlı adresi yoksa düğme görünmez. | BR-PRJ-001, 004 | SCR-003 |
| REQ-008 | Canlı önizleme | "Önizlemeyi başlat"a basılmadan iframe yüklenmez. Masaüstü (1280 px'te çizilip ölçeklenir) / Telefon (390 px) geçişi. Telefonda tam ekran pencere, yalnızca telefon görünümü. Yükleniyor durumu; 10 sn'de yüklenmezse "Önizleme açılamadı, siteyi yeni sekmede aç". `preview.mode = "screenshots"` ise galeri. Esc ile kapanır, odak geri döner. | BR-PRV-001…004 | SCR-003, SCR-002 (pencere) |
| REQ-009 | Önizleme izinleri + proje görselleri | `pnpm embed:check` her canlı adresin başlıklarını okur; `PORTFOLIO_ORIGINS`'teki **her** kökene izin verilip verilmediğini tablo olarak yazar ve veri dosyasındaki `preview.mode` ile karşılaştırır. `pnpm gorsel:manifest` `public/projects/<slug>/` klasörlerini tarayıp boyut + bulanık yer tutucu manifestini üretir; eksik görselde yer tutucu kullanılır. Kontrol listesi: [docs/onizleme-izinleri.md](docs/onizleme-izinleri.md) (hazır). Klasör kuralı: [docs/proje-gorselleri.md](docs/proje-gorselleri.md) (hazır). | BR-PRV-001, BR-IMG-005…007 | — |
| **REQ-010** | **CV indirme** | Bkz. [§5.3](#53-cv-indirme-d-10) | BR-CV-001…005 | SCR-004, başlık |
| REQ-011 | İletişim, gizlilik, SEO | E-posta görünür metin + "Kopyala" (kopyalandı geri bildirimi, `aria-live`) + mailto. GitHub, LinkedIn yeni sekmede. Gizlilik sayfası (çerez: yalnızca `NEXT_LOCALE`; analitik çerezsiz; form yok). Her sayfada title ≤ 60, description, canonical, `hreflang`, OG (dile göre). `Person` + `ProfilePage` JSON-LD. | BR-ICR-001 | SCR-001, SCR-005 |
| REQ-012 | Müsaitlik + cila | Hero'da tek satır durum (veri dosyasından, açık / kapalı). Hareketler `prefers-reduced-motion`'da kapalı. | — | SCR-001 |

### 5.2 Çok dilli yapı (D-02 + D-03)

**Görev D-02 — Altyapı**
1. `next-intl` kurulur. Yerel ayarlar `tr` (varsayılan) ve `en`. URL öneki her zaman var: `/tr/...`, `/en/...`.
2. Yerelleştirilmiş yollar: `/tr/projeler` ↔ `/en/projects`, `/tr/hakkimda` ↔ `/en/about`, `/tr/gizlilik` ↔ `/en/privacy`. Proje slug'ı iki dilde aynı (`/tr/projeler/golden-borekcilik` ↔ `/en/projects/golden-borekcilik`).
3. Kök `/` isteği `proxy.ts`'te yönlenir: önce `NEXT_LOCALE` çerezi, yoksa `Accept-Language`, o da yoksa `tr`.
4. Dil seçici başlıkta durur (masaüstünde görünür, telefonda başlıkta ikon + kısa kod "TR / EN"; mobil menüde de var). Seçince **aynı sayfanın** diğer dildeki karşılığına gider (ana sayfaya atmaz), filtre sorgusu korunur.
5. Seçim `NEXT_LOCALE` çerezine 1 yıl yazılır (`SameSite=Lax`, `Secure`). İşlevsel çerez, rıza gerektirmez (araştırma §5).
6. `<html lang>` dile göre `tr` / `en`. Biçimlendirme `lib/format` üzerinden yerel ayara göre (`tr-TR` / `en-US`): tarih, sayı.
7. Her sayfada `<link rel="alternate" hreflang="tr|en|x-default">`; sitemap iki dili `xhtml:link` ile verir.
8. Arayüz metinleri `messages/tr.json`, `messages/en.json`. Tip güvenliği: next-intl `AppConfig` ile anahtar adları derleme anında denetlenir.

**Görev D-03 — İçerik verisi**
1. Tüm içerik `content/` altında TypeScript veri dosyalarında: `profile.ts`, `projects.ts`, `experience.ts`, `skills.ts`, `process.ts`.
2. Çevrilecek her alan `{ tr: string; en: string }` tipindedir (`Localized<T>`). Zod şeması iki dilin de dolu olmasını ister. Eksik çeviri derlemeyi ve testi kırar.
3. Dilden bağımsız alanlar (slug, yıl, teknoloji anahtarları, adresler, durum kodu) tek değerdir. Teknoloji adları `skills.ts`'teki sözlükten gelir, serbest metin değildir.
4. 15 projenin TR metni portfolyo dosyasından, EN taslağı çeviriyle girilir (V-04).

**Kabul kriterleri (REQ-002 / REQ-003):**
- [ ] `/tr` ve `/en` altındaki her sayfa açılıyor; görünür metinlerin hepsi seçili dilde (Türkçe sayfada İngilizce arayüz metni yok, tersi de).
- [ ] Dil seçici her sayfada aynı içeriğin diğer dildeki sayfasına gidiyor; proje detayında aynı proje, listede aynı filtre.
- [ ] Dil seçildikten sonra tarayıcı kapatılıp `/` açılınca son seçilen dil geliyor (çerez). Çerez yoksa `Accept-Language: en-US` → `/en`, `de-DE` → `/tr`.
- [ ] `<html lang>` ve `hreflang` etiketleri doğru; sitemap'te her URL'nin iki dil karşılığı var.
- [ ] `messages/tr.json` ile `messages/en.json` anahtar kümeleri birebir aynı (birim testi).
- [ ] Veri dosyalarındaki her `Localized` alan iki dilde de boş değil (Zod + birim testi).
- [ ] Yeni bir proje eklemek yalnızca `content/projects.ts`'e bir kayıt ve `public/projects/<slug>/` klasörüne görsel eklemekle oluyor (README'de adım adım).
- [ ] 360 px'te dil seçici dokunma hedefi ≥ 44 × 44 px, klavyeyle erişilebilir, `aria-label`'lı ("Dil: Türkçe").

### 5.3 CV indirme (D-10)

**Görev**
1. `/[locale]/cv/yazdir` yazdırma sayfası (noindex, sitemap dışında): A4, iki sütunsuz sade düzen, aynı veri dosyalarından. Telefon alanı veri modelinde yok (BR-ICR-001).
2. `pnpm cv:pdf` betiği üretim derlemesini başlatır, Playwright ile iki dili yazdırır: `public/cv/hasan-talha-keskin-cv-tr.pdf`, `public/cv/hasan-talha-keskin-cv-en.pdf`. Dosyalar depoya eklenir (yayında derleme gerektirmez).
3. "CV indir" düğmesi: başlıkta (masaüstü) ve hakkımda sayfasında. `href` seçili dile göre; `download` özniteliği ve dosya adı dile özgü. Düğme metni dosya türünü ve boyutunu söyler ("CV indir · PDF, 180 KB").
4. İçerik değişince CV'yi yenilemek için tek komut; CI, PDF'lerin içerikten eski olup olmadığını uyarı olarak bildirir (veri dosyası değiştiyse ve PDF değişmediyse).

**Kabul kriterleri (REQ-010):**
- [ ] TR sayfadaki düğme `-tr.pdf`'i, EN sayfadaki `-en.pdf`'i indiriyor; dil değişince düğme hedefi de değişiyor.
- [ ] İki dosya da 200 ve `Content-Type: application/pdf` dönüyor, her biri ≤ 300 KB, A4, en fazla 2 sayfa.
- [ ] PDF metni seçilebilir (görsel değil); ad, unvan, e-posta, GitHub, LinkedIn, eğitim, staj, seçili projeler var.
- [ ] PDF'te ve yazdırma sayfasında telefon numarası yok (test: genel TR telefon kalıbı aranır; sahibin numarası depoda düz metin olarak tutulmaz).
- [ ] PDF içeriği sitedeki verilerle aynı (aynı kaynak); EN PDF'te Türkçe kalıntı metin yok.
- [ ] Düğme 360 px'te ≥ 44 px yüksekliğinde, klavyeyle odaklanabilir.

### 5.4 Fotoğraf kullanımı (D-04)

**Görev**
1. Yer tutucu iki görsel: `src/assets/profile/hero.jpg` (dikey 4:5, 1600 × 2000) ve `src/assets/profile/about.jpg` (3:2, 1800 × 1200). Nötr, konsepte uygun, açıkça "yer tutucu" olduğu anlaşılan sade bir siluet; yüz yok, metin yok.
2. Statik `import` + `next/image`: genişlik / yükseklik otomatik, `placeholder="blur"`, AVIF / WebP otomatik, `sizes` her yerleşim için doğru (hero mobil `100vw`, masaüstü `40vw`; hakkımda mobil `100vw`, masaüstü `33vw`).
3. Hero görseli LCP öğesidir: `priority` (`fetchpriority="high"`), tembel yükleme yok. Hakkımda görseli tembel yüklenir.
4. Alt metin veri dosyasında iki dilde (`profile.photo.alt.tr / en`).
5. Değiştirme: Talha aynı adla yeni dosyayı koyar; başka kod değişikliği gerekmez. README'de "Fotoğrafı değiştirme" bölümü: en az boyutlar, oran, önerilen ışık / zemin (konsepte uygun sade, açık zemin), `pnpm gorsel:kontrol` ile denetim.

**Kabul kriterleri (REQ-004):**
- [ ] Hero'da ve hakkımda sayfasında fotoğraf görünüyor; 360 px'te hero ilk ekranda fotoğraf görünüyor (GK-01).
- [ ] İki rol iki ayrı dosya (GK-03); aynı dosya iki yerde kullanılmıyor.
- [ ] Sunulan görsel AVIF ya da WebP; `srcset` otomatik (elle yazılmamış); hero'da `fetchpriority="high"`, hakkımda'da `loading="lazy"`.
- [ ] Keskinlik: dosya pikseli, kapladığı ekran pikselinin (× min(DPR, 2)) en az %80'i (`gorsel-kalitesi.spec.ts`, GK-04).
- [ ] Görsel alanı ölçülü, CLS < 0,1; görsel yüklenmezken bulanık yer tutucu görünüyor.
- [ ] Alt metin iki dilde dolu, sayfanın diline göre geliyor.
- [ ] Yer tutucu yeni dosyayla değiştirilince sitede başka değişiklik gerekmeden yenisi görünüyor (README adımlarıyla denendi).

### 5.5 Portfolyo adresi ve önizleme izinleri

**Portfolyo tarafı (bu depo):**

| Değişken | Örnek | Ne için |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://<ad-soyad>.vercel.app` → ileride `https://<alan-adi>` | **Tek kanonik adres:** canonical, `hreflang`, sitemap, OG, JSON-LD, CV PDF'teki bağlantı. Taşımada yalnızca bu değişir. |
| `PORTFOLIO_ORIGINS` | `https://<ad-soyad>.vercel.app https://<alan-adi>` | Portfolyonun yayınlandığı **bütün** kökenler (boşlukla ayrılmış). `embed:check` her birini denetler. |

Kod adresi yalnızca `src/config/site.ts` üzerinden okur; başka yerde adres yazılmaz (test: kaynakta `vercel.app` geçen tek yer `.env.example`).

**Proje tarafı (her önizlenecek proje):** Her projede aynı adlı `PORTFOLIO_ORIGINS` ortam değişkeni tanımlanır ve CSP şuna dönüşür: `frame-ancestors 'self' ${PORTFOLIO_ORIGINS}`. Alan adı alındığında **kod değişmez**: her projenin Vercel ayarında değişkene yeni adres eklenir ve yeniden yayınlanır. Ayrıntılı, kopyala-yapıştır adımlar: [docs/onizleme-izinleri.md](docs/onizleme-izinleri.md).

**Kabul kriterleri:**
- [ ] `NEXT_PUBLIC_SITE_URL` değiştirilip yeniden derlenince canonical, sitemap, OG ve JSON-LD'nin hepsi yeni adresi kullanıyor.
- [ ] `embed:check` çıktısı her proje × her köken için ✅ / ❌ veriyor; `preview.mode = "iframe"` olup ❌ olan proje varsa komut hata koduyla bitiyor.
- [ ] 7 canlı projenin hepsi portfolyonun vercel.app adresinden önizleme penceresinde açılıyor.

### 5.6 Proje görselleri

Klasör ve adlandırma kuralı: [docs/proje-gorselleri.md](docs/proje-gorselleri.md). Özet: `public/projects/<slug>/` altında `cover`, `desktop-NN`, `mobile-NN`; küçük harf, ASCII, iki haneli sıra.

| No | Kural | Test |
|---|---|---|
| BR-IMG-005 | Görsel dosyası yoksa nötr yer tutucu gösterilir, sayfa kırılmaz | `projects.spec.ts` |
| BR-IMG-006 | Dosya adı kurala uymuyorsa `gorsel:manifest` hata verir (kuralsız dosya sessizce yok sayılmaz) | `manifest.test.ts` |
| BR-IMG-007 | Canlı adresi olmayan projelerde otomatik çekim yapılmaz, yalnızca klasördeki dosyalar kullanılır; otomatik çekim var olan dosyanın üstüne yazmaz | `screenshots` betiği |

## 6. Site haritası ve ekran listesi

| No | Ekran | URL (TR / EN) | Şablon | Erişim | İndeks | Öncelik |
|---|---|---|---|---|---|---|
| SCR-001 | Ana sayfa | `/tr` · `/en` | Hikâye | Herkes | Evet | P0 |
| SCR-002 | Projeler | `/tr/projeler` · `/en/projects` | Liste + filtre | Herkes | Evet | P0 |
| SCR-003 | Proje detayı (15) | `/tr/projeler/[slug]` · `/en/projects/[slug]` | Vaka + önizleme | Herkes | Evet | P0 |
| SCR-004 | Hakkımda / CV | `/tr/hakkimda` · `/en/about` | Metin + zaman çizelgesi | Herkes | Evet | P0 |
| SCR-005 | Gizlilik | `/tr/gizlilik` · `/en/privacy` | Metin | Herkes | Evet | P0 |
| SCR-006 | 404 | — | Hata | Herkes | Hayır | P0 |
| SCR-007 | CV yazdırma | `/tr/cv/yazdir` · `/en/cv/print` | Yazdırma | Herkes (bağlantısız) | Hayır | P0 |
| SCR-008 | Stil karosu | `/stil` | Stil | Yalnızca önizleme ortamı | Hayır | P0 |

**Sabit öğeler:** Yapışkan başlık (ad, Projeler, Hakkımda, İletişim, dil seçici, masaüstünde "CV indir"); alt bilgi (e-posta, GitHub, LinkedIn, gizlilik, imza satırı). Mobil eylem çubuğu yok (Z-14 uyarlaması).

**Ana sayfa kurgusu:** [§11.5](#115-ana-sayfa-sahne-sahne)

## 7. Kullanıcı akışları

**UC-01 Projeyi deneyimlemek** · Aktör: İşveren / müşteri · Kurallar: BR-PRV-001…004
1. Ana sayfada öne çıkan projeden ya da Projeler listesinden bir projeye girer.
2. Durum, rol ve teknolojileri görür; "Önizlemeyi başlat"a basar.
3. Site önizleme penceresinde açılır; Masaüstü / Telefon arasında geçer, sitede gezinir.
4. İsterse "Siteyi aç ↗" ile gerçek siteye yeni sekmede geçer.
- Alternatif: İzin yoksa ya da canlı adres yoksa ekran görüntüsü galerisi gösterilir.
- Alternatif: Önizleme 10 sn'de açılmazsa hata durumu + "yeni sekmede aç".
- Kabul: 360 ve 1280 px'te uçtan uca test geçer.

**UC-02 Dil değiştirmek** · Bkz. §5.2 kabul kriterleri.

**UC-03 CV almak / iletişim** · Hakkımda ya da başlıktan "CV indir" → seçili dilde PDF. Ya da İletişim → e-postayı kopyala / mailto.

## 8. Hesap ve yetki modeli

**Model:** A · **Gerekçe:** Ziyaretçi işlem yapmıyor, veri bırakmıyor. İçerik veri dosyasından geldiği için yönetici girişi de yok (K-04).

| Konu | Karar |
|---|---|
| Ziyaretçi kimlik doğrulaması | Yok |
| Yönetici girişi | Yok; içerik git ile güncellenir |
| Filtre durumu | URL'de |

## 9. Veri modeli ve iş kuralları

Veritabanı yok. Veri dosyaları (`content/*.ts`), Zod şemasıyla derleme anında doğrulanır.

| Dosya | Amaç | Önemli alanlar |
|---|---|---|
| `profile.ts` | Kimlik | ad, unvan (L), kısa tanıtım (L), e-posta, github, linkedin, konum (L), müsaitlik, fotoğraf alt metinleri (L). **Telefon alanı yok** |
| `projects.ts` | 15 proje | slug, ad, özet (L), durum (`live`, `completed-demo`, `in-progress`, `academic`), yıl, sektör, rol (L), teknolojiler (sözlük anahtarı), maddeler (L[]), kararlar (L[]), `liveUrl?`, `preview: { mode: "iframe" \| "screenshots", screenshots[] }`, `featured`, sıra |
| `experience.ts` | Hikâye durakları | tarih aralığı, başlık (L), kurum (L), açıklama (L), ilgili proje slug'ları |
| `skills.ts` | Teknoloji sözlüğü + gruplar | anahtar, görünen ad, grup (L) |
| `process.ts` | Çalışma biçimi 5 adım | başlık (L), açıklama (L), örnek kanıt (L) |

(L) = `{ tr, en }`

| No | Kural | Tür | Test |
|---|---|---|---|
| BR-ICR-001 | Telefon numarası sitede, PDF'te ve veri dosyalarında yer almaz | Kısıt | `no-phone.test.ts` (veri + derlenmiş HTML + PDF metni) |
| BR-I18N-001 | Her `Localized` alan iki dilde de dolu | Kısıt | `content.test.ts` |
| BR-I18N-002 | `messages/tr.json` ve `en.json` anahtarları birebir aynı | Kısıt | `messages.test.ts` |
| BR-I18N-003 | Dil seçici aynı sayfanın karşılığına gider, sorgu korunur | Davranış | `i18n.spec.ts` |
| BR-I18N-004 | Kök yönlendirme sırası: çerez → Accept-Language → `tr` | Hesaplama | `locale.test.ts` |
| BR-I18N-005 | Dil seçimi `NEXT_LOCALE` çerezinde 1 yıl saklanır | Varsayılan | `i18n.spec.ts` |
| BR-I18N-006 | Teknoloji adları çevrilmez, sözlükten gelir | Kısıt | Zod şeması |
| BR-PRJ-001 | `liveUrl` yoksa "Siteyi aç" ve iframe önizleme yok | Kısıt | `projects.test.ts` |
| BR-PRJ-002 | Öne çıkanlar en fazla 4 ve durumu `in-progress` olmayan projelerden | Kısıt | `projects.test.ts` |
| BR-PRJ-003 | Filtre durumu URL'de; geçersiz filtre değeri yok sayılır | Hesaplama | `filter.test.ts` |
| BR-PRJ-004 | Durum etiketi her kartta ve detayda görünür | Kısıt | e2e |
| BR-PRV-001 | `preview.mode = "iframe"` yalnızca `embed:check` izni doğrulanmış projelerde | Kısıt | `embed:check` (CI uyarısı) |
| BR-PRV-002 | iframe kullanıcı başlatmadan yüklenmez | Davranış | `preview.spec.ts` |
| BR-PRV-003 | iframe `sandbox="allow-scripts allow-same-origin allow-forms allow-popups"`, `referrerpolicy="strict-origin-when-cross-origin"` | Kısıt | `preview.spec.ts` |
| BR-PRV-004 | Portfolyo CSP'sinde `frame-src` yalnızca veri dosyasındaki `liveUrl` kökenleri | Kısıt | `headers.test.ts` |
| BR-CV-001 | CV düğmesi seçili dilin PDF'ini indirir | Davranış | `cv.spec.ts` |
| BR-CV-002 | PDF ≤ 300 KB, A4, ≤ 2 sayfa | Kısıt | `cv-pdf.test.ts` |
| BR-CV-003 | PDF metni seçilebilir | Kısıt | `cv-pdf.test.ts` |
| BR-CV-004 | PDF, veri dosyasından üretilir; veri değişip PDF değişmediyse CI uyarır | Tetikleyici | CI adımı |
| BR-CV-005 | Yazdırma sayfası noindex, sitemap dışında | Kısıt | `seo.test.ts` |
| BR-IMG-001 | Hero ve hakkımda farklı dosyalar | Kısıt | `gorsel-kalitesi.spec.ts` |
| BR-IMG-002 | Hero görseli `priority`, diğerleri tembel | Kısıt | `photo.spec.ts` |
| BR-IMG-003 | Keskinlik oranı ≥ %80 | Kısıt | `gorsel-kalitesi.spec.ts` |
| BR-IMG-004 | Alt metin iki dilde dolu | Kısıt | `content.test.ts` |

**Parametreler:**

| No | Parametre | Varsayılan | Nerede |
|---|---|---|---|
| P-01 | Kanonik site adresi | `https://<ad-soyad>.vercel.app` | `NEXT_PUBLIC_SITE_URL` → `src/config/site.ts` |
| P-06 | Portfolyonun yayın kökenleri | `https://<ad-soyad>.vercel.app` (+ ileride alan adı) | `PORTFOLIO_ORIGINS` (bu depo ve her proje deposu) |
| P-02 | Önizleme zaman aşımı | 10 sn | `config/preview.ts` |
| P-03 | Masaüstü önizleme çizim genişliği | 1280 px | `config/preview.ts` |
| P-04 | Dil çerezi ömrü | 365 gün | `i18n/routing.ts` |
| P-05 | CV PDF en büyük boyut | 300 KB | `scripts/cv-pdf.ts` |

## 10. Teknoloji ve mimari kararlar

**Varyant:** V1 (Next.js App Router, TypeScript strict, Tailwind CSS 4, Motion, Zod, Vitest, Playwright, pnpm, Vercel). **Sapmalar:**

| Konu | Karar | Gerekçe |
|---|---|---|
| Veritabanı / Drizzle / Better Auth / Resend | **Yok** | Form, hesap ve panel yok; içerik veri dosyasından (K-04) |
| Render | Tüm sayfalar derleme anında statik (`generateStaticParams`, 2 dil × 15 proje) | İçerik derleme anında belli; en hızlı ve en ucuz yol |
| Cache Components | Kapalı | Dinamik bölüm yok |
| Çok dil | `next-intl` + `hreflang` (00 §5 alt kararı) | Standart |
| Önizleme | Yerel `<iframe>` + kendi bileşeni; ek kütüphane yok | Basit ve kontrol bizde |
| CV PDF | Playwright (zaten dev bağımlılığı) ile yazdırma | Yeni bağımlılık yok |
| Analitik | Vercel Web Analytics (çerezsiz) | Çerez bandı gerekmez |
| shadcn/ui | Yalnızca Dialog (önizleme penceresi) ve Toggle Group (cihaz geçişi) | Erişilebilir pencere davranışı hazır |

ADR: `docs/adr/0001-veritabanisiz-statik-site.md` (standarttan sapma).

## 11. Tasarım yönü

### 11.1 Konsept

| Konu | Karar |
|---|---|
| Konsept adı | **Şartname kâğıdı** (seçildi, K-14) |
| Tanım | (1) Sıcak kırık beyaz kâğıt zemin, ince ızgara çizgileri, mürekkep siyahı metin. (2) Tek vurgu sinyal turuncusu; numaralar, tarihler ve etiketler mono yazıyla, teknik bir şartnamenin dili gibi (`WEB-01`, `MSA-07`, `2026`). (3) Görseller projelerin gerçek ekranlarıdır; hareket yalnızca bir şeyi açıklarken kullanılır. |
| Seçilmeyen alternatif | **Kontrol odası:** koyu grafit zemin, projeler izleme panosunda pencere gibi açılır, kehribar vurgu (`#0F1115` · `#E7E9EE` · `#F59E0B`, Space Grotesk + JetBrains Mono). Seçilmedi: koyu "geliştirici ekranı" estetiği klişeye çok yakın, uzun okuma metinleri koyu zeminde yorucu, KOBİ müşterisine soğuk geliyor. Kullanıcı bunu seçerse §11 yeniden yazılır. |
| Olmayacaklar | Mor-mavi degrade · 3B leke / blob · yeşil terminal, daktilo efekti, "Hello World" · yüzdeli yetenek çubukları · cam efektli kartlar · her bölümün kart içinde durması · kendiliğinden dönen kaydırıcı · üst üste parallax katmanları · emoji ikonlar |
| Referans panosu | brittanychiang.com (sabit kimlik sütunu), joshwcomeau.com (anlam taşıyan hareket), rauno.me (hover / odak işçiliği), leerob.com (gövde ölçüsü), linear.app/method (numaralı bölümler), stripe.com/docs (mono etiket + metin dengesi), bruno-simon.com (tek imzaya yatırım). Ayrıntı: araştırma §9 |
| İmza öğesi | **Açıklamalı önizleme masası:** proje önizlemesi bir cihaz çerçevesinde açılır; yanında o projenin numaralı gereksinimlerinden 3–4 tanesi (ör. "MSA-07 · Değişiklik diğer cihazlara 2 sn'de yansır") şartname notu gibi durur. Gereksinimler ziyaretçinin denediği özelliği anlatır. |
| Metin tonu | Sade, birinci tekil, abartısız, kanıta dayalı ("11 platform, 5.600+ sayfa"). "Tutkulu", "yaratıcı" gibi sıfatlar yok. |

### 11.2 Renk

| Token | Kullanım | Değer | Kontrast (hesaplanan, `--background` üstünde) |
|---|---|---|---|
| `--background` | Kâğıt zemin | `#F5F3EE` | — |
| `--foreground` | Gövde metni, başlıklar | `#15171C` | 16,17:1 |
| `--muted-foreground` | İkincil metin, meta | `#5B5F68` | 5,77:1 (ikincil zeminde 5,28:1) |
| `--primary` | Tek hâkim renk = mürekkep: birincil düğme dolgusu, kalın çizgiler | `#15171C` | ≈ 16:1 |
| `--accent` | Sinyal turuncusu: bağlantı, aktif filtre, durum "Canlı" noktası, mono numaralar (ekranın ≤ %10'u) | `#B93D0B` (K-16) | 5,07:1 · ikincil zeminde 4,64:1 · beyazda 5,62:1 |
| `--surface` | Önizleme masası, kart | `#FFFFFF` | — |
| `--surface-muted` | İkincil bölüm zemini | `#ECE9E2` | — |
| `--border` / `--grid-line` / `--border-strong` | Çizgiler, ızgara, 3:1 sınır | `#D6D2C8` / `#E4E0D7` / `#80858E` (K-16) | `--border-strong` 3,34:1 · ikincil zeminde 3,06:1 |
| `--ink-section` / `--on-ink` | Tek koyu bölüm (çalışma biçimi) | `#15171C` / `#F5F3EE` | ≈ 16:1 |

Kontrastlar 2026-11-27'de WCAG formülüyle hesaplandı ve axe ile doğrulandı.

### 11.3 Tipografi

| Konu | Karar |
|---|---|
| Başlık / gövde | IBM Plex Sans 400 / 500 / 600 (başlık + gövde), IBM Plex Mono 400 / 500 (numara, etiket, tarih, teknoloji çipi). `next/font/google`, `latin-ext` alt kümesi; "İıŞşĞğÜüÖöÇç" D-01'de stil karosunda denetlenir |
| Ölçek (px) | 12 / 14 / 16 / 18 / 20 / 24 / 32 / 40 / 56 / 72 |
| Hero başlığı | Mobil 40 px · masaüstü 72 px, satır yüksekliği 1,05, harf aralığı −0,02 em |
| Üst başlık | Mono 12 px, büyük harf (CSS), harf aralığı 0,08 em, `--accent`, numaralı ("01 · HİKÂYE") |
| Vurgu aracı | Yalnızca hero başlığında tek kelime `--accent` renginde; başka yerde renkli vurgu kelimesi yok |

### 11.4 Yerleşim

| Konu | Karar |
|---|---|
| Izgara | Masaüstü 12 kolon, en fazla 1200 px; mobil 4 kolon, 16 px kenar. Zeminde 32 px'lik (8 px tabanlı) çok soluk ızgara çizgisi yalnızca hero ve önizleme masasında (`.spec-grid`; 8 px stil karosunda fazla yoğundu) |
| İçerik genişlikleri | Metin 680 px · içerik 1200 px · tam genişlik |
| Bölüm aralığı | Mobil 72 px · masaüstü 128 px |
| Yarıçap / gölge | Küçük 4 · kart 6 · görsel 6 · düğme 6 · cihaz çerçevesi 12; gölge yok, ayrım 1 px çizgiyle |
| Koyu / açık dengesi | Tek koyu bölüm: "Çalışma biçimim". Geri kalanı kâğıt ve `--surface-muted` dönüşümlü |

### 11.5 Ana sayfa sahne sahne

| # | Bölüm | Düzen | İçerik | Görsel | Efekt |
|---|---|---|---|---|---|
| 1 | Hero | Asimetrik iki sütun (mobil: fotoğraf üstte, ekranın %45'i) | Mono üst satır "Full stack · Sakarya", büyük ad + unvan, tek cümle, müsaitlik satırı, tek birincil eylem "Projeleri gör" | `profile/hero` (4:5) | Yok |
| 2 | Kanıt şeridi | Tam genişlik ince bant, mono rakamlar | "11 kurumsal platform · 5.600+ sayfa · 7.100+ test senaryosu · her gün kullanılan bir canlı sistem" | — | Yok |
| 3 | Hikâye (01) | Dikey zaman çizgisi, sol tarih (mono), sağ durak | DEÜ 2024 → serbest işler → Sakarya BB stajı 2026 → Golden Börek → bugün (FestOS, Ritim); her durakta ilgili projeye bağlantı | Durak başına küçük proje ekranı | **Büyük efekt:** kaydırdıkça çizgi dolar, durak belirir (yalnızca `transform` / `opacity`) |
| 4 | Öne çıkan işler (02) | 1 büyük + 3 küçük asimetrik ızgara | Golden Börek (büyük), test otomasyonu, REVNAK, Bütçe; durum etiketi, rol, teknolojiler | Proje ekranları (16:10) | Hover'da ekran hafifçe kayar |
| 5 | Açıklamalı önizleme masası (03) | Tam genişlik `--surface` bant, solda cihaz, sağda şartname notları | Golden Börek ya da VetFlow canlı önizleme (başlat düğmeli) | Canlı iframe / ekran | Yok (sahne 3'te büyük efekt var) |
| 6 | Yetkinlik haritası (04) | Gruplu mono çip listesi (6 grup) | Web, sunucu, veritabanı, mobil / masaüstü, test, yayın; çipe dokununca `/projeler?tech=…` | — | Yok |
| 7 | Çalışma biçimim (05) | Koyu bölüm, 5 numaralı adım yatay (mobil dikey) | Dinle → Yazılı kapsam → Erken gösterim → Test → Teslim; her adımda gerçek kanıt | — | Yok |
| 8 | İletişim (06) | Ortalı değil, sol hizalı büyük e-posta | E-posta + Kopyala, GitHub, LinkedIn, CV indir | — | Yok |

### 11.6 Görsel yönü

| Konu | Karar |
|---|---|
| Fotoğraf karakteri | Sade, açık nötr zemin, yumuşak gün ışığı, belden yukarı; renk sıcaklığı kâğıt zemine uyumlu (sıcak nötr) |
| Kaynak | Talha'nın kendi fotoğrafı (şimdilik yer tutucu) + projelerin gerçek ekran görüntüleri. Stok yok |
| Ekran görüntüsü üretimi | `pnpm screenshots:projects`: canlı 7 proje için Playwright ile 1440 × 900 ve 390 × 844 (var olan dosyanın üstüne yazmaz). Canlı adresi olmayan 8 proje için yalnızca Talha'nın verdiği, hassas verisi gizlenmiş görseller ([docs/proje-gorselleri.md](docs/proje-gorselleri.md)) |
| İhtiyaç listesi | Profil hero 1 · 4:5 · ≥ 1600 × 2000; profil hakkımda 1 · 3:2 · ≥ 1800 × 1200; proje kapak 15 · 16:10 · ≥ 2400 × 1500 (@2x); proje galerisi 3–6 / proje |
| Teslim | `next/image` (derleme anında türev, Vercel görüntü optimizasyonu) |
| İkon seti | lucide, çizgi kalınlığı 1,5 |

### 11.7 Hareket ve tema

| Konu | Karar |
|---|---|
| Efektler | Hikâye çizgisinin dolması (sahne 3, tek büyük efekt) · proje kartı hover kayması · önizleme penceresinin açılması (180 ms opaklık + ölçek) |
| Azaltılmış hareket | `prefers-reduced-motion: reduce` → tüm efektler kapalı, içerik doğrudan görünür |
| Koyu mod | Yok (P2, Kapsam Dışı) |
| Tema presetleri | Uygulanmaz |

## 12. Yönetim paneli

Uygulanmaz: İçerik veri dosyasından geliyor (kullanıcı kararı). Tek içerik sahibi var ve geliştirici. Güncelleme yolu README'deki "İçerik güncelleme" bölümü: proje ekle, deneyim ekle, CV'yi yenile, fotoğrafı değiştir.

## 13. CRM ve süreç yapısı

Uygulanmaz: Form yok, talepler doğrudan e-postaya gelir.

## 14. Yasal, KVKK ve içerik gereklilikleri

| Gereklilik | Nerede | Durum |
|---|---|---|
| KVKK aydınlatma metni | — | Uygulanmaz: kişisel veri toplanmıyor (form yok) |
| Gizlilik + çerez açıklaması | `/tr/gizlilik`, `/en/privacy` | Kısa metin: yalnızca `NEXT_LOCALE` işlevsel çerezi, çerezsiz analitik, barındırma (Vercel, yurt dışı) sunucu kayıtları |
| Çerez tercih merkezi | — | Uygulanmaz: zorunlu dışı çerez yok ([KVKK rehberi](https://kvkk.gov.tr/Icerik/7353/Cerez-Uygulamalari-Hakkinda-Rehber)) |
| Müşteri işi kullanım izni | Golden Börek | ✅ İşletme sahibinin onayı var: portfolyoda gösterim ve önizlemede açılma (Q-03, 2026-11-27) |
| Kurum projesi görselleri | Test otomasyonu | ✅ Yalnızca hassas verisi gizlenmiş görseller kullanılır (Q-04); otomatik çekim yok |
| Font lisansı | IBM Plex | SIL OFL, `docs/gorsel-kaynaklari.md`'ye yazılır |

**İçerik:** TR metinler portfolyo dosyasından, EN taslağı çeviriyle (V-04). Proje durumları dürüstçe etiketlenir (Canlı / Tamamlandı, demo / Geliştiriliyor / Akademik).

## 15. SEO planı

| Sayfa / küme | Hedef sorgu | Title kalıbı | Schema | İndeks |
|---|---|---|---|---|
| Ana sayfa | "Hasan Talha Keskin", "Sakarya full stack geliştirici" | `Hasan Talha Keskin · Full Stack Geliştirici` | `Person`, `WebSite`, `ProfilePage` | Evet |
| Projeler | "Next.js geliştirici portfolyo" | `Projeler · Talha Keskin` | `CollectionPage`, `BreadcrumbList` | Evet |
| Proje detayı | "{proje adı}", "{sektör} yazılımı" | `{Proje} · Talha Keskin` | `CreativeWork` (`author: Person`), `BreadcrumbList` | Evet |
| Hakkımda | "Talha Keskin CV" | `Hakkımda ve CV · Talha Keskin` | `ProfilePage` + `Person` | Evet |

Paylaşım görseli: dile göre dinamik OG (`opengraph-image.tsx`), proje detayında proje kapağıyla. **Ölçüm:** Search Console (iki dil özelliği), Vercel Web Analytics olayları: `preview_start`, `live_site_open`, `cv_download`, `email_copy`, `locale_switch`.

## 16. Güvenlik, performans ve erişilebilirlik hedefleri

| No | Hedef | Değer | Nasıl ölçülür |
|---|---|---|---|
| NFR-01 | Mobil uyumluluk | 360–1536 px'te yatay kaydırma yok | Playwright taşma testi |
| NFR-02 | LCP / INP / CLS | < 2,5 sn / < 200 ms / < 0,1 (önizleme başlatılmadan) | Lighthouse, Speed Insights |
| NFR-03 | Erişilebilirlik | WCAG 2.2 AA; axe'de ciddi / kritik ihlal yok; önizleme penceresi klavyeyle açılıp kapanır, iframe'in `title`'ı var | axe + klavye turu |
| NFR-04 | Güvenlik başlıkları | HSTS, CSP (`frame-src` yalnızca proje kökenleri, `frame-ancestors 'none'`), Referrer-Policy, Permissions-Policy | `headers.test.ts` |
| NFR-05 | İlk yük JS | Ana sayfa ≤ iskelet tabanı + 40 KB (gzip). **Taban (boş kabuk, 2026-11-27): 175 KB → hedef ≤ 215 KB** | `pnpm olcum:js` |

## 17. Entegrasyonlar

| Entegrasyon | Amaç | Canlıda | Gizli bilgi |
|---|---|---|---|
| Proje siteleri (iframe) | Canlı önizleme | Her projede `frame-ancestors` izni (D-09) | — |
| Vercel Web Analytics | Çerezsiz ölçüm | Açık | — |
| GitHub / LinkedIn | Bağlantı | Dış bağlantı | — |

## 18. Test planı ve kalite kapıları

| Katman | Kapsam | Araç |
|---|---|---|
| Birim | İçerik şemaları (iki dil dolu), mesaj anahtarı eşitliği, yerel ayar yönlendirme mantığı, filtre ayrıştırma, telefon yok taraması, CV PDF boyut / sayfa / metin | Vitest |
| Uçtan uca | Duman (her sayfa × 2 dil), mobil taşma, axe, dil değiştirme + hatırlama, filtre + URL, önizleme başlat / cihaz geçişi / yedek galeri, CV indirme (dile göre), fotoğraf (`fetchpriority`, `srcset`, alt), görsel kalitesi | Playwright (Chromium; gece WebKit + Firefox) |
| Betik | `embed:check` (ağ gerektirir, CI'da uyarı, yayın öncesi elle) | Node |

**Demo senaryosu (bitti kanıtı, e2e):**
1. `/` açılır, `Accept-Language: en` → `/en`.
2. Dil seçiciyle TR'ye geçilir → `/tr`, çerez yazılır; yeniden `/` → `/tr`.
3. "Projeleri gör" → `/tr/projeler`, 15 kart.
4. Yetkinlik haritasından "Next.js" → URL `?tech=nextjs`, yalnızca Next.js projeleri.
5. Golden Börek detayı → durum "Canlı", rol yazılı.
6. "Önizlemeyi başlat" → iframe `src` canlı adres; Telefon görünümüne geçilir.
7. Esc → pencere kapanır, odak düğmeye döner.
8. EduNex detayı → "Siteyi aç" yok, ekran görüntüsü galerisi var.
9. Hakkımda → fotoğraf görünür; "CV indir" `-tr.pdf`.
10. EN'ye geçilir → aynı sayfa `/en/about`, düğme `-en.pdf`.
11. Hiçbir sayfada telefon kalıbı yok.

Kapılar: `docs/kalite-kapilari.md` (Faz 3'te S2'ye göre işaretlenir).

## 19. İçerik verisi ve canlıya geçiş planı

| Veri | Hacim | Uç durumlar |
|---|---|---|
| Projeler | 15 | Canlı adresi yok (8), iframe izni yok, uzun proje adı (FestOS), teknoloji sayısı 10+ (Golden Börek), durumu "geliştiriliyor" |
| Hikâye durakları | 5–6 | Aynı yıl içinde birden çok durak |
| Teknolojiler | ~40 | Çok proje içeren (Next.js) ve tek projeli (Electron) |

**Kurgusal içerik:** Yok. **Görsel kaynakları:** `docs/gorsel-kaynaklari.md`.
**Canlıya geçiş:** Alan adı bağlanır → `NEXT_PUBLIC_SITE_URL` → proje depolarında `frame-ancestors` güncellenir → `embed:check` yeşil → Search Console + sitemap → CV PDF'leri son içerikle yeniden üretilir.

## 20. Yayın ve operasyon

| Konu | Karar |
|---|---|
| Ortamlar | Yerel · Önizleme (Vercel, her PR) · Üretim |
| Barındırma planı | Vercel Hobby (kişisel, ticari olmayan site) |
| Alan adı | Q-01 |
| İzleme | Vercel; harici uptime (UptimeRobot, ücretsiz) |
| Yedek | Git deposu (veritabanı yok) |
| Zamanlanmış işler | Yok. Haftalık `embed:check` GitHub Actions'ta (uyarı) |
| Teslim | Uygulanmaz (kişisel site) |

## 21. Portfolyo planı

| Sıra | Ekran | Cihaz | Neden |
|---|---|---|---|
| 01 | Ana sayfa hero | Masaüstü + telefon | İlk izlenim |
| 02 | Hikâye akışı | Masaüstü | İmza anlatım |
| 03 | Proje listesi + filtre | Telefon | Mobil öncelik |
| 04 | Önizleme masası (iframe açık) | Masaüstü | Fark yaratan özellik |
| 05 | Proje detayı | Telefon | Vaka şablonu |
| 06 | EN sürümü | Masaüstü | İki dil |

**Mockup:** 2 adet (hero masaüstü + telefon; önizleme masası).

## 22. Riskler ve açık sorular

Kapsam dışı maddeler [belgenin sonunda](#kapsam-dışı).

**Riskler:**

| No | Risk | Etki | Önlem |
|---|---|---|---|
| RSK-01 | 7 canlı projeden 6'sı iframe'i engelliyor | İmza özellik boş kalır | Kontrol listesi hazır ([docs/onizleme-izinleri.md](docs/onizleme-izinleri.md)); her projede `frame-ancestors 'self' ${PORTFOLIO_ORIGINS}`; yapılana kadar ekran görüntüsü galerisi (V-07) |
| RSK-08 | Önizlemede üçüncü taraf çerezleri engellendiği için iframe içinde giriş (panel) çalışmaz | Panel önizlemesi yok | Beklenen davranış; vitrin sayfaları önizlenir, panel ekranları galeride (Kapsam Dışı) |
| RSK-09 | Portfolyonun PR önizleme adresleri (`*-git-*.vercel.app`) izin listesinde değil | PR önizlemesinde iframe yerine hata durumu | Bilerek böyle: `*.vercel.app` jokeri herkese izin verir. PR'da yedek galeri test edilir |
| RSK-02 | Önizlemedeki siteler değişir ya da kapanır | Kırık önizleme | Haftalık `embed:check`; 10 sn zaman aşımı ve hata durumu |
| RSK-03 | Önizlenen Vercel demolarında soğuk başlangıç yavaş | Kötü ilk izlenim | Yükleniyor durumu + "yeni sekmede aç" alternatifi |
| RSK-04 | Golden Börek gerçek müşteri sitesi; iframe izni clickjacking yüzeyi açar | Güvenlik / müşteri ilişkisi | Yalnızca portfolyo kökenine izin; işletme onayı (Q-03) |
| RSK-05 | CV ile portfolyo arasındaki çelişkiler (Q-02) | Güvenilirlik | V-01; tek kaynaktan CV üretimi |
| RSK-06 | İngilizce çevirinin kalitesi | Yabancı ziyaretçide kötü izlenim | V-04: Talha gözden geçirir; gerekirse anadil kontrolü |
| RSK-07 | Efor bütçesi tam dolu (30 / 30) | Taşma | Cila ve müsaitlik (P1) ilk kesilecekler |

**Açık sorular:**
- [x] Q-01 Alan adı → Şimdilik `https://<ad-soyad>.vercel.app`; tek değişkende (K-11).
- [x] Q-02 Çelişkiler → EduNex PostgreSQL + JWT + 4 kişilik ekip liderliği doğru; Acutus'ta Demucs var; 2024–2026 mezun (K-12).
- [x] Q-03 Golden Börek → İşletme onayı var (K-13).
- [x] Q-04 Görseller → Talha'da var, gizlenmiş; klasör kuralına göre yerleştirecek, o zamana kadar yer tutucu (K-15).
- [x] Q-05 Konsept → "Şartname kâğıdı" (K-14).
- [ ] Q-06 Vercel proje adı kesinleşince `<ad-soyad>` yerine gerçek adres `.env` ve kontrol listesine yazılacak.

## 23. İlerleme ve karar günlüğü

İlerleme: [docs/ilerleme.md](docs/ilerleme.md)

| No | Tarih | Karar | Gerekçe |
|---|---|---|---|
| K-01 | 2026-11-27 | Plan kökte `PLAN.md`; `docs/proje-plani.md` yönlendirir | Kullanıcı isteği |
| K-02 | 2026-11-27 | Kapsam seviyesi S2, 30 puan, 3 gün | §2 |
| K-03 | 2026-11-27 | Hesap modeli A | Ziyaretçi işlemi yok |
| K-04 | 2026-11-27 | Veritabanı, panel ve yönetici girişi yok; içerik `content/*.ts` | Kullanıcı: "içerik veri dosyasından gelsin"; tek içerik sahibi geliştirici |
| K-05 | 2026-11-27 | İletişim formu yok, yalnızca e-posta + GitHub + LinkedIn; telefon hiçbir yerde yok | Kullanıcı kararı; KVKK form paketi tetiklenmez |
| K-06 | 2026-11-27 | TR + EN, next-intl, önekli URL, `NEXT_LOCALE` çerezi | Kullanıcı kararı |
| K-07 | 2026-11-27 | CV PDF'leri veri dosyasından üretilir | Telefon yasağı + tutarlılık (V-05) |
| K-08 | 2026-11-27 | Hero ve hakkımda için iki ayrı fotoğraf dosyası | GK-03 |
| K-09 | 2026-11-27 | Yıl dönümü projesi kapsam dışı | Kullanıcı kararı |
| K-10 | 2026-11-27 | Önerilen konsept "Şartname kâğıdı" | §11.1 |
| K-11 | 2026-11-27 | Kanonik adres `NEXT_PUBLIC_SITE_URL`, yayın kökenleri `PORTFOLIO_ORIGINS`; projelerde aynı adlı değişkenle `frame-ancestors` | Q-01: vercel.app'ten alan adına kod değiştirmeden geçiş |
| K-12 | 2026-11-27 | EduNex: PostgreSQL, JWT, 4 kişilik ekip lideri. Acutus: Demucs. Eğitim 2024–2026, mezun | Q-02 |
| K-13 | 2026-11-27 | Golden Börek gösterilir ve önizlenir | Q-03, işletme onayı |
| K-14 | 2026-11-27 | Konsept "Şartname kâğıdı" seçildi | Q-05 |
| K-15 | 2026-11-27 | Canlı adresi olmayan projelerde yalnızca verilen gizlenmiş görseller; `public/projects/<slug>/` kuralı | Q-04 |
| K-16 | 2026-11-27 | Vurgu `#C2410C` → `#B93D0B`; `--border-strong` `#8A8F99` → `#80858E` | axe: vurgu ikincil zeminde 4,27:1 (< 4,5), sınır 2,93:1 (< 3) |
| K-17 | 2026-11-27 | Next.js 16.4.6 (3 günden eski en yeni kararlı), pnpm 12 `allowBuilds` | İskelet README adım 1; iskeletteki `ignoredBuiltDependencies` pnpm 12'de tanınmıyor |
| K-18 | 2026-11-27 | Lighthouse CI 0.15.1 + `overrides` (tmp, uuid, basic-ftp, zod) + `extract-zip` için gerekçeli audit istisnası (2027-01-31'de gözden geçir) | 0.16.1 kurulamıyor (kayıtta olmayan `devtools-protocol` sürümü); açıklar yalnızca geliştirme aracında |
| K-19 | 2026-11-27 | Önizleme / yerel derlemeler `noindex`, yalnızca `VERCEL_ENV=production` indekslenir; `/stil` üretimde 404 | `DEMO_MODE` yerine (gerçek içerik, demo değil) |
| K-20 | 2026-11-27 | Telefon numarası depoda hiçbir dosyada yok: kaynak CV / portfolyo dosyaları `.gitignore`'da (yalnızca yerelde); `docs/standartlar/`, `.claude/rules/`, AGENTS.md ve yasal şablon kopyalarında numara maskelendi (kopyalarda başka değişiklik yok) | BR-ICR-001; depo açık (V-08) |

**Değişiklik kaydı:**

| Tarih | Sürüm | Değişiklik |
|---|---|---|
| 2026-11-27 | v0.1 | İlk plan |
| 2026-11-27 | v0.2 | Q-01…Q-05 cevapları işlendi; §5.5 adres ve önizleme izinleri, §5.6 proje görselleri eklendi; RSK-08, RSK-09; K-11…K-15 |
| 2026-11-27 | v0.3 | Onaylandı; Faz 3 kararları K-16…K-19; ölçülen kontrastlar ve JS tabanı |

---

## Kapsam Dışı

Kullanıcının kapsam dışı bıraktığı ve plan sırasında bilerek dışarıda tutulan maddeler.

| Madde | Neden | Ne zaman |
|---|---|---|
| **Yıl dönümü projesi** | Kullanıcı kararı (K-09): kişisel proje, sitede yer almaz | Hiçbir zaman |
| **Telefon numarası** | Kullanıcı kararı (K-05): sitede, alt bilgide, JSON-LD'de, CV PDF'lerinde ve veri dosyalarında yok (BR-ICR-001) | Hiçbir zaman |
| İletişim formu (ve KVKK aydınlatma, onay kaydı, talep kutusu) | Kullanıcı yalnızca e-posta istedi (K-05) | Talep gelirse P2 |
| Yönetim paneli, veritabanı, yönetici girişi | İçerik veri dosyasından (K-04) | — |
| WhatsApp bağlantısı / mobil eylem çubuğu | Telefon gösterilmiyor | — |
| Üçüncü dil | İstenmedi | — |
| Koyu tema | Konseptin dışında, bütçe dolu | P2 |
| Blog / teknik yazılar | İstenmedi, bütçe dolu | P2 |
| Hizmet paketleri ve fiyatlar (X-PRT-03), teklif sihirbazı (X-PRT-04) | Hedef öncelikle işveren; fiyat paylaşımı istenmedi | P2 |
| Görüşme planlama / takvim (X-PRT-06) | Bütçe dolu, e-posta yeterli | P2 |
| Müşteri yorumları (X-PRT-08) | İzinli gerçek yorum yok; kurgusal yorum kullanılmaz | Gerçek yorum gelince P2 |
| Önizlemede yönetim panellerine demo hesapla giriş | Proje demolarında ayrı hesap kurmak bu projenin kapsamı değil; vitrin sayfaları önizlenir | P2 (proje başına) |
| 3B / WebGL sahne, ses, imleç efektleri | Konsept dışı, performans ve erişilebilirlik | — |
| Çerezli analitik / reklam pikselleri | Çerez bandı gerektirir | — |

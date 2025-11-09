## Sentry Troubleshooting Guide

### 1. NEXT_PUBLIC_SENTRY_DSN kontrolü

Vercel'de environment variable'ın doğru ayarlandığından emin olun:

**Kontrol:**
1. Vercel Dashboard → test-project → Settings → Environment Variables
2. `NEXT_PUBLIC_SENTRY_DSN` var mı?
3. Value kısmı şuna benzer mi: `https://...@o123456.ingest.sentry.io/789012`

**ÖNEMLI:** Variable adı tam olarak `NEXT_PUBLIC_SENTRY_DSN` olmalı (baştaki NEXT_PUBLIC_ çok önemli!)

---

### 2. Deployment kontrol

Test sayfası deploy edildi mi?

**Kontrol:**
1. https://automexus.com/test-sentry açılıyor mu?
2. Sayfa yükleniyor ve butonlar görünüyor mu?

---

### 3. Sentry proje ayarları

Sentry'de DSN'i doğru kopyaladınız mı?

**Sentry'de DSN'i bulmak:**
1. https://sentry.io → Login
2. Sol üst köşeden projenizi seçin
3. Sol menüden: **Settings** (⚙️ ikonu)
4. **Client Keys (DSN)** tıklayın
5. DSN'i kopyalayın (şuna benzer: `https://abc123...@o456.ingest.sentry.io/789`)

---

### 4. Test adımları

Hata göremiyorsanız şunları deneyin:

**A. Basit Test:**
1. https://automexus.com/test-sentry
2. Kırmızı butona tıkla
3. 5-10 saniye bekle
4. Sentry.io → Issues → Sayfayı yenile (F5)

**B. Console'da hata var mı?**
1. Test sayfasında F12 bas (Developer Tools)
2. Console sekmesine git
3. Kırmızı butona tıkla
4. Herhangi bir hata görüyor musun?

---

### 5. Yaygın Sorunlar

**Sorun:** "DSN configured" yerine "Missing" yazıyor
**Çözüm:** Environment variable adı yanlış olabilir. `NEXT_PUBLIC_SENTRY_DSN` olmalı

**Sorun:** Test sayfası 404 veriyor
**Çözüm:** Deployment tamamlanmamış. Vercel'de deployment durumunu kontrol edin

**Sorun:** Sentry'de Issues boş
**Çözüm:**
- DSN doğru girilmemiş olabilir
- Deployment sonrası 2-3 dakika bekleyin
- Vercel'de Redeploy yapın

---

### Hala Çalışmıyorsa

Bana şunları söyleyin:
1. https://automexus.com/test-sentry sayfasında "Current Configuration" bölümünde ne yazıyor?
2. Butona tıklayınca ne oluyor?
3. Vercel'de NEXT_PUBLIC_SENTRY_DSN var mı? (Value değil, sadece var/yok)

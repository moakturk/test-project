# Automexus Website Kurulum Rehberi

Bu rehber, Automexus web sitesini canlıya almak için gereken tüm adımları içerir.

## 📋 Ön Gereksinimler

✅ **Zaten Hazır Olanlar:**
- ✅ Domain: automexus.com (Hostinger)
- ✅ Email: info@automexus.com (Zoho Mail)
- ✅ Next.js 15 projesi hazır
- ✅ Supabase & Resend paketleri kurulu

## 🚀 Kurulum Adımları

### 1️⃣ Supabase Hesap Kurulumu (5 dakika)

1. **Supabase'e kayıt olun:**
   - https://supabase.com adresine gidin
   - "Start your project" → Sign Up (GitHub ile kayıt yapın)

2. **Yeni proje oluşturun:**
   - "New Project" butonuna tıklayın
   - **Organization:** Yeni organization oluşturun veya mevcut birini seçin
   - **Project Name:** `automexus`
   - **Database Password:** Güçlü bir şifre oluşturun (kaydedin!)
   - **Region:** Europe (Frankfurt veya Ireland - Türkiye'ye yakın)
   - **Pricing Plan:** Free
   - "Create new project" butonuna tıklayın

3. **API Keys'leri alın:**
   - Sol menüden "Project Settings" → "API" sekmesine gidin
   - Aşağıdaki değerleri kopyalayın:
     - **Project URL:** `https://xxxxxxxx.supabase.co`
     - **anon/public key:** `eyJhbGc...` (uzun bir token)
     - **service_role key:** `eyJhbGc...` (uzun bir token - GİZLİ TUTUN!)

4. **Database Schema'yı çalıştırın:**
   - Sol menüden "SQL Editor" sekmesine gidin
   - "New query" butonuna tıklayın
   - `supabase/schema.sql` dosyasının içeriğini kopyalayıp yapıştırın
   - "Run" butonuna tıklayın
   - ✅ Success mesajı görmelisiniz
   - Sol menüden "Table Editor"a gidip `contacts` ve `detailed_analysis` tablolarını görebilirsiniz

---

### 2️⃣ Resend Hesap Kurulumu (5 dakika)

1. **Resend'e kayıt olun:**
   - https://resend.com adresine gidin
   - "Sign Up" → GitHub ile kayıt yapın

2. **API Key oluşturun:**
   - Dashboard'da "API Keys" sekmesine gidin
   - "Create API Key" butonuna tıklayın
   - **Name:** `Automexus Production`
   - **Permission:** Full Access (varsayılan)
   - "Add" butonuna tıklayın
   - API key'i kopyalayın (başlangıcı: `re_...`)
   - ⚠️ Bu key'i bir daha göremezsiniz, kaydedin!

3. **Domain doğrulama (opsiyonel ama önerilen):**
   - "Domains" sekmesine gidin
   - "Add Domain" → `automexus.com` yazın
   - Verilen DNS kayıtlarını Hostinger'deki DNS ayarlarınıza ekleyin
   - Doğrulama 24-48 saat sürebilir
   - **Not:** Doğrulama yapılmadan da çalışır ama `onboarding@resend.dev` adresi görünür

---

### 3️⃣ Environment Variables Ayarları (3 dakika)

1. **`.env.local` dosyasını güncelleyin:**

Proje ana dizinindeki `.env.local` dosyasını açın ve şu değerleri güncelleyin:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend Email Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx

# Email Configuration
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=info@automexus.com
```

**Nereyi nereden kopyalayacaksınız:**
- `NEXT_PUBLIC_SUPABASE_URL` → Supabase dashboard → Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Supabase dashboard → Settings → API → anon/public
- `SUPABASE_SERVICE_ROLE_KEY` → Supabase dashboard → Settings → API → service_role (GİZLİ!)
- `RESEND_API_KEY` → Resend dashboard → API Keys → Kopyaladığınız key

2. **Test için local'de çalıştırın:**

```bash
npm run dev
```

Browser'da http://localhost:3000/contact adresine gidin ve formu test edin.

---

### 4️⃣ Vercel Deployment (10 dakika)

1. **Vercel hesabı oluşturun:**
   - https://vercel.com adresine gidin
   - "Sign Up" → GitHub ile kayıt yapın

2. **GitHub repo'yu bağlayın:**
   - "Add New" → "Project" tıklayın
   - GitHub reposunu seçin (Import Git Repository)
   - Repository'yi seçin: `moakturk/test-project`

3. **Deploy ayarları:**
   - **Framework Preset:** Next.js (otomatik algılar)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (varsayılan)
   - **Output Directory:** `.next` (varsayılan)

4. **Environment Variables ekleyin:**
   "Environment Variables" bölümüne aşağıdaki değişkenleri ekleyin:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` |
   | `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` |
   | `RESEND_API_KEY` | `re_xxx...` |
   | `EMAIL_FROM` | `onboarding@resend.dev` |
   | `EMAIL_TO` | `info@automexus.com` |

   ⚠️ **ÖNEMLİ:** Bu değişkenleri `.env.local` dosyasından kopyalayın!

5. **Deploy edin:**
   - "Deploy" butonuna tıklayın
   - 2-3 dakika bekleyin
   - ✅ Deployment başarılı olduğunda Vercel size bir URL verecek:
     - Örnek: `https://automexus-xxx.vercel.app`

6. **Test edin:**
   - Vercel URL'ini tarayıcıda açın
   - `/contact` sayfasına gidin
   - Formu doldurup gönderin
   - ✅ Supabase'de "Table Editor" → `contacts` tablosunda kaydı görmelisiniz
   - ✅ Email'inize (info@automexus.com) bildirim gelmelisiniz

---

### 5️⃣ Domain Bağlama (10 dakika + DNS yayılma)

1. **Vercel'de domain ekleyin:**
   - Vercel dashboard → Project → "Settings" → "Domains"
   - "Add" butonuna tıklayın
   - `automexus.com` yazın
   - "Add" tıklayın

2. **DNS kayıtlarını güncelleyin:**

Vercel size şu DNS kayıtlarını gösterecek:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME Record (www için):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

3. **Hostinger DNS ayarlarına ekleyin:**
   - Hostinger dashboard → Domains → automexus.com → DNS / Name Servers
   - Yukarıdaki A ve CNAME kayıtlarını ekleyin
   - Kaydedin

4. **DNS yayılmasını bekleyin:**
   - DNS değişiklikleri 1-48 saat sürebilir (genelde 1-2 saat)
   - https://dnschecker.org adresinden kontrol edebilirsiniz

5. **SSL sertifikası:**
   - Vercel otomatik olarak Let's Encrypt SSL sertifikası ekler
   - DNS yayıldıktan sonra HTTPS otomatik aktif olur

---

### 6️⃣ Google Analytics 4 Kurulumu (15 dakika)

1. **GA4 hesabı oluşturun:**
   - https://analytics.google.com adresine gidin
   - "Start measuring" butonuna tıklayın
   - **Account name:** Automexus
   - **Property name:** Automexus Website
   - **Reporting time zone:** Turkey
   - **Currency:** Turkish Lira (TRY)

2. **Data Stream oluşturun:**
   - **Platform:** Web
   - **Website URL:** https://automexus.com
   - **Stream name:** Automexus Main Site
   - "Create stream" tıklayın

3. **Measurement ID'yi kopyalayın:**
   - Stream detaylarında göreceksiniz: `G-XXXXXXXXXX`
   - Bu ID'yi kopyalayın

4. **Next.js'e entegre edin:**
   - `.env.local` dosyasına ekleyin:
     ```
     NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
     ```
   - Vercel'de de environment variable olarak ekleyin

5. **Google Tag Manager script'ini ekleyin:**
   - `app/layout.tsx` dosyasına Google Analytics script'ini ekleyeceğiz (daha sonra yapacağız)

---

### 7️⃣ Google Search Console Kurulumu (10 dakika)

1. **GSC hesabı oluşturun:**
   - https://search.google.com/search-console adresine gidin
   - "Start now" → Google hesabınızla giriş yapın

2. **Property ekleyin:**
   - "Add property" tıklayın
   - **Property type:** Domain
   - **Domain:** `automexus.com`
   - "Continue" tıklayın

3. **Domain doğrulama:**
   - Google size bir TXT kaydı verecek
   - Bu TXT kaydını Hostinger DNS ayarlarına ekleyin
   - "Verify" butonuna tıklayın

4. **Sitemap gönderin:**
   - Sol menüden "Sitemaps" sekmesine gidin
   - `https://automexus.com/sitemap.xml` URL'ini ekleyin
   - "Submit" tıklayın

---

### 8️⃣ UptimeRobot Monitoring (5 dakika)

1. **UptimeRobot hesabı oluşturun:**
   - https://uptimerobot.com adresine gidin
   - "Free Sign Up" → Email ile kayıt yapın

2. **Monitor ekleyin:**
   - "+ Add New Monitor" butonuna tıklayın
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** Automexus Website
   - **URL:** https://automexus.com
   - **Monitoring Interval:** 5 minutes (ücretsiz)
   - "Create Monitor" tıklayın

3. **Alert ayarları:**
   - Email adresinize bildirim gelmesini sağlayın
   - Site çökerse otomatik email alırsınız

---

## ✅ Tamamlama Kontrol Listesi

Hepsini yaptığınızda:

- [ ] Supabase hesabı oluşturuldu
- [ ] Database schema çalıştırıldı
- [ ] Resend hesabı oluşturuldu ve API key alındı
- [ ] `.env.local` dosyası güncellendi
- [ ] Local'de test edildi (npm run dev)
- [ ] Vercel hesabı oluşturuldu
- [ ] GitHub repo Vercel'e bağlandı
- [ ] Environment variables Vercel'e eklendi
- [ ] İlk deployment yapıldı
- [ ] Contact form test edildi (Vercel URL'de)
- [ ] Domain Vercel'e eklendi
- [ ] DNS kayıtları Hostinger'a eklendi
- [ ] DNS yayıldı ve site automexus.com'da açılıyor
- [ ] HTTPS çalışıyor
- [ ] Google Analytics kuruldu
- [ ] Google Search Console kuruldu ve sitemap gönderildi
- [ ] UptimeRobot monitoring aktif

---

## 🎯 Sonraki Adımlar

Tüm kurulum tamamlandıktan sonra:

1. ✅ **Detaylı analiz formu** eklenecek (10 soruluk form)
2. ✅ **SEO metadata** her sayfaya eklenecek
3. ✅ **Sitemap.xml** oluşturulacak
4. ✅ **Performance optimizasyonu** yapılacak
5. ✅ **Admin panel** (opsiyonel - ileride)

---

## 📞 Yardım

Kurulum sırasında sorun yaşarsanız:
1. `.env.local` dosyasındaki tüm değerlerin doğru olduğundan emin olun
2. Vercel'de environment variables'ın doğru eklendiğini kontrol edin
3. Supabase'de tabloların oluşturulduğunu kontrol edin
4. Browser console'da hata var mı kontrol edin

---

**Hazırladı:** Claude AI
**Proje:** Automexus Website
**Son Güncelleme:** 2025-11-09

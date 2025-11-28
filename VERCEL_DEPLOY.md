# Vercel Deploy + Cloudflare Domain + Analytics Kurulumu

Bu rehber Vercel'de deploy edip, Cloudflare domain ile bağlayıp, Cloudflare Analytics'te görüntüleme işlemini anlatır.

## ✅ Avantajlar

- ✨ Vercel'in hızlı build ve deploy sistemi
- 🚀 Next.js 16 tam desteği (Cloudflare Pages'in sorunları yok)
- 📊 Cloudflare Analytics ile trafik izleme
- 🛡️ Cloudflare'in güvenlik ve CDN avantajları
- 💰 Her iki servis de ücretsiz tier'da kullanılabilir

---

## 1️⃣ Vercel'de Deploy

### Adım 1: Vercel Projesini Oluştur

1. https://vercel.com/new adresine git
2. Repository'i import et
3. **Build Settings**:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (otomatik gelir)
   - **Output Directory**: (boş bırak, otomatik)
   - **Install Command**: `npm install` (otomatik)

4. **Deploy** butonuna bas

### Adım 2: Vercel Domain'ini Not Al

Deploy tamamlandığında şuna benzer bir domain alacaksınız:
```
your-project.vercel.app
```

veya

```
your-project-xyz123.vercel.app
```

Bu domain'i not edin!

---

## 2️⃣ Cloudflare Domain Bağlama

### Adım 1: Cloudflare DNS Ayarları

1. Cloudflare Dashboard → Domain seç (örn: `cavusoglu.dev`)
2. **DNS** > **Records** bölümüne git
3. Yeni DNS kaydı ekle:

**A) CNAME ile (Önerilen):**

```
Type: CNAME
Name: @ (veya www)
Target: your-project.vercel.app
Proxy status: Proxied (🧡 turuncu bulut)
TTL: Auto
```

**B) Subdomain için:**

```
Type: CNAME
Name: www
Target: your-project.vercel.app
Proxy status: Proxied
```

### Adım 2: Vercel'de Custom Domain Ekle

1. Vercel Dashboard → Projeniz → **Settings** → **Domains**
2. Domain'inizi ekleyin: `cavusoglu.dev` (veya `www.cavusoglu.dev`)
3. Vercel DNS doğrulamasını bekleyin (1-2 dakika)

### Adım 3: SSL Sertifikası

- Cloudflare'de: **SSL/TLS** → **Overview** → **Full** modunu seç
- Bu sayede Cloudflare ↔ Vercel arası da şifreli olur

---

## 3️⃣ Cloudflare Analytics Kurulumu

### Otomatik Analytics (Ücretsiz)

Cloudflare Proxy (🧡 turuncu bulut) aktifse **otomatik** çalışır:

1. Cloudflare Dashboard → Domain seç
2. **Analytics & Logs** → **Web Analytics** bölümüne git
3. Trafik otomatik olarak görünecek!

### Gelişmiş Analytics

Daha detaylı analytics için:

1. **Analytics & Logs** → **Web Analytics**
2. **"Add a site"** → Domain ekle
3. Verilen JavaScript snippet'ini almayın (gerekli değil, proxy zaten izliyor)

---

## 4️⃣ Vercel Analytics (Opsiyonel)

Vercel'in kendi analytics'ini de kullanabilirsiniz:

### package.json'da zaten var:

\`\`\`json
"@vercel/analytics": "1.3.1"
\`\`\`

### Kullanım:

\`\`\`tsx
// app/layout.tsx içinde zaten var mı kontrol edin
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
\`\`\`

---

## 5️⃣ Cloudflare Analytics'te Ne Görürsünüz?

Cloudflare Proxy aktifken şunları görebilirsiniz:

- 📊 **Toplam ziyaretçi sayısı**
- 🌍 **Coğrafi dağılım** (ülke/şehir)
- 📱 **Cihaz tipleri** (desktop/mobile)
- 🌐 **Tarayıcı dağılımı**
- 🔒 **Güvenlik tehditleri** (bot, DDoS, vb.)
- ⚡ **Performans metrikleri** (load time, vb.)
- 📈 **Bandwidth kullanımı**

---

## 6️⃣ Doğrulama

### DNS Propagation Kontrolü:

\`\`\`bash
dig cavusoglu.dev
nslookup cavusoglu.dev
\`\`\`

### Site Çalışma Kontrolü:

1. https://cavusoglu.dev adresini ziyaret et
2. Developer Console'da "Powered by Vercel" header'ını kontrol et
3. Cloudflare Dashboard'da analytics'in gelmeye başlamasını bekle (5-10 dakika)

---

## ⚙️ Gerekli Konfigürasyonlar

### next.config.ts'den `output: 'export'` Kaldır

Vercel SSR ve dinamik özellikler desteklediği için:

\`\`\`typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export' KALDIR - Vercel için gerekli değil!
};

export default nextConfig;
\`\`\`

---

## 🎯 Özet

1. ✅ Vercel'de deploy et (Next.js 16 tam destekli)
2. ✅ Cloudflare DNS'e CNAME ekle (Proxied mode)
3. ✅ Vercel'de custom domain ekle
4. ✅ Cloudflare Analytics otomatik çalışacak
5. ✅ Hem Vercel hem Cloudflare analytics'i kullanabilirsiniz!

Bu yöntemle:
- Vercel'in güçlü Next.js hosting'i
- Cloudflare'in CDN ve güvenlik özellikleri
- Cloudflare Analytics ile detaylı trafik takibi

Hepsi bir arada! 🚀

---

## 🔧 Sorun Giderme

### Analytics görünmüyorsa:
- DNS kaydının "Proxied" (🧡) olduğundan emin olun
- 5-10 dakika bekleyin
- Cache'i temizleyin: Cloudflare Dashboard → Caching → Purge Everything

### SSL hatası alıyorsanız:
- Cloudflare SSL/TLS modunu "Full" yapın
- Vercel'de domain'in doğrulandığından emin olun


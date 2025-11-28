# Cloudflare Pages Deploy Ayarları

Bu projeyi Cloudflare Pages'e deploy etmek için aşağıdaki ayarları kullanın:

## Cloudflare Pages Dashboard Ayarları

### Önemli: Deploy Command Yanlış Yapılandırılmış!

Cloudflare Pages dashboard'da şu ayarları yapın:

- **Framework preset**: Next.js (Static HTML Export) 
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Deploy command**: **BOŞ BIRAKIN** veya `echo "Build completed"`
- **Node version**: 22.x

⚠️ **ÖNEMLİ**: Cloudflare Pages otomatik olarak `out` dizinini deploy eder. 
Ekstra bir deploy komutu (`wrangler deploy`) ÇALIŞTIRMAYIN!

## Manuel Deploy (Alternatif)

Terminal'den manuel deploy etmek için:

```bash
npm run build
npx wrangler pages deploy out --project-name=cavusoglu-dev
```

veya npm script ile:

```bash
npm run build
npm run pages:deploy
```

## Önemli Notlar

- Bu proje Next.js 16 kullandığı için static export modunda çalışıyor
- Server-side rendering (SSR) desteği yok
- Tüm sayfalar build zamanında static HTML olarak generate ediliyor
- API routes kullanılamaz (static export sınırlaması)

## Cloudflare Dashboard Ayarları - Adım Adım

1. Cloudflare Pages dashboard'a git: https://dash.cloudflare.com/pages
2. "Create a project" > "Connect to Git" seç
3. Repository'i bağla
4. **Build Settings**:
   - **Production branch**: `main` (veya master)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (boş bırakabilirsiniz)
   
5. **Environment variables**: Yok (şu an için gerekmiyor)

6. "Save and Deploy" butonuna bas

### Deploy Command Hatası Alıyorsanız:

Eğer Cloudflare "Deploy command" alanı varsa:
- **BOŞ BIRAKIN** 
- veya `echo "Deploy completed"` yazın

Cloudflare Pages otomatik olarak build sonrası `out` klasörünü deploy eder.
`npx wrangler deploy` KULLANMAYIN - bu Workers için!

## Environment Variables

Şu anda environment variable gerekmemektedir.


# Cloudflare Pages Deploy Ayarları

Bu projeyi Cloudflare Pages'e deploy etmek için aşağıdaki ayarları kullanın:

## Build Ayarları

- **Framework preset**: Next.js (Static HTML Export)
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Node version**: 22.x

## Alternatif: Wrangler ile Deploy

Terminal'den deploy etmek için:

```bash
npm run build
npx wrangler pages deploy out --project-name=cavusoglu-dev
```

## Önemli Notlar

- Bu proje Next.js 16 kullandığı için static export modunda çalışıyor
- Server-side rendering (SSR) desteği yok
- Tüm sayfalar build zamanında static HTML olarak generate ediliyor
- API routes kullanılamaz (static export sınırlaması)

## Cloudflare Dashboard Ayarları

1. Cloudflare Pages dashboard'a git
2. "Create a project" > "Connect to Git" seç
3. Repository'i bağla
4. Build ayarlarını yukarıdaki gibi yap
5. Deploy butonuna bas

## Environment Variables

Şu anda environment variable gerekmemektedir.


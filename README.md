# UmixPanel Monorepo

Bu depo, cPanel benzeri bir panelin monorepo mimarisinde (pnpm workspaces) referans uygulamasıdır. Üretim amaçlı değildir; mimari, güvenlik, test ve DevOps örneklerini bütünlüklü olarak gösterir.

## Kurulum

```powershell
# pnpm global kurulum (eğer yoksa)
npm install -g pnpm

# Bağımlılıkları yükle
pnpm install

# Prisma client oluştur
cd apps/api
npx prisma generate
cd ../..
```

## Çalıştırma

### Yerel Geliştirme (Docker olmadan)

```powershell
# PostgreSQL ve Redis'in çalıştığından emin ol (docker-compose veya yerel)
# .env dosyalarını kopyala
copy apps\api\.env.example apps\api\.env
copy apps\web\.env.example apps\web\.env
copy apps\admin\.env.example apps\admin\.env

# Prisma migrate (ilk kez)
pnpm prisma:migrate

# Seed verilerini ekle
pnpm prisma:seed

# Tüm uygulamaları paralel çalıştır
pnpm dev
```

### Docker Compose ile

```powershell
# Tüm servisleri ayağa kaldır (postgres, redis, api, web, admin, traefik, prometheus, grafana)
docker-compose up --build
```

## Erişim

- **Web Panel**: http://localhost:3000
- **Admin Panel**: http://localhost:3002
- **API**: http://localhost:3001
- **API Docs (Swagger)**: http://localhost:3001/docs
- **Prometheus Metrics**: http://localhost:3001/metrics/prometheus
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3003 (admin/admin)
- **Traefik Dashboard**: http://localhost:8080

## Komutlar

- `pnpm dev` — tüm uygulamaları aynı anda geliştirici modunda çalıştırır
- `pnpm build` — tüm paketleri derler
- `pnpm test` — birim ve e2e testlerini çalıştırır
- `pnpm lint` — tüm projelerde lint çalıştırır
- `pnpm e2e` — Playwright e2e testleri
- `pnpm prisma:migrate` — Prisma migration çalıştırır
- `pnpm prisma:seed` — Örnek verileri yükler

## Seed Kullanıcıları

| Email | Şifre | Rol |
|-------|-------|-----|
| root@umixpanel.local | rootpass | ROOT |
| admin1@umixpanel.local | adminpass | ADMIN |
| admin2@umixpanel.local | adminpass | ADMIN |
| reseller@umixpanel.local | resellerpass | RESELLER |
| user1@umixpanel.local | userpass | USER |
| user2@umixpanel.local | userpass | USER |

## Yapı

```
├── apps/
│   ├── api/          # NestJS API (REST + WebSocket)
│   ├── web/          # Next.js Müşteri Paneli
│   └── admin/        # Next.js Admin Paneli
├── packages/
│   ├── config/       # Paylaşılan ESLint, Tailwind, TS configleri, env şemaları
│   ├── types/        # Ortak TypeScript tipleri, DTO'lar, RBAC izinleri
│   └── ui/           # Paylaşılan UI bileşenleri (Button, Card, CodeLog, vs.)
├── docker/           # Traefik ve reverse proxy configleri
├── ops/              # Prometheus, Grafana configleri
└── docs/             # Mimari, güvenlik, ops dokümantasyonu
```

Detaylar için `Architecture.md`, `Security.md`, `Ops.md` dosyalarına ve uygulama/paket README'lerine bakınız.

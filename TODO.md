# UmixPanel - Yapılacaklar Listesi

## ✅ TAMAMLANAN (Session 4 - 11 Ekim 2025)

### ⭐ FULLSTACK INTEGRATION (YENİ - Session 4 Devamı)

#### Backend Infrastructure
- [x] **Docker Setup**
  - [x] docker-compose.yml oluşturuldu (PostgreSQL 16 + Redis 7)
  - [x] Docker containers başlatıldı ve çalışıyor
  - [x] Health checks entegre edildi
  
- [x] **Database Setup**
  - [x] Prisma migration uygulandı (20251011103313_init)
  - [x] Tüm tablolar oluşturuldu (User, Account, Domain, Site, Job, Backup, Metric, ApiToken, RefreshToken)
  - [x] PrismaService global module olarak kuruldu
  - [x] Veritabanı bağlantısı test edildi

- [x] **Backend API Modules (8 modül, 60+ endpoint)**
  - [x] AuthModule - 3 endpoint (register, login, profile)
  - [x] DomainsModule - 5 endpoint (CRUD + SSL update)
  - [x] EmailModule - 11 endpoint (accounts, forwarders, autoresponders)
  - [x] DatabasesModule - 9 endpoint (database CRUD, users, privileges)
  - [x] FilesModule - 10 endpoint (file operations, compression, permissions)
  - [x] BackupsModule - 6 endpoint (backup CRUD, restore, stats)
  - [x] SecurityModule - 11 endpoint (SSL, IP blocker, firewall)
  - [x] HealthController - 1 endpoint
  
- [x] **API Configuration**
  - [x] @nestjs/config entegre edildi
  - [x] .env dosyası yapılandırıldı
  - [x] Swagger UI kuruldu (http://localhost:3001/docs)
  - [x] CORS, Helmet, Rate Limiting aktif
  - [x] Global validation pipes eklendi
  
#### Frontend Infrastructure
- [x] **API Client Layer**
  - [x] axios paketi yüklendi
  - [x] Base HTTP client oluşturuldu (lib/api-client.ts)
  - [x] Request interceptor - Bearer token ekleme
  - [x] Response interceptor - 401 handling
  - [x] .env.local dosyası oluşturuldu
  
- [x] **API Wrapper Libraries (8 servis)**
  - [x] lib/api/auth.ts - Login, register, profile, logout
  - [x] lib/api/email.ts - Email accounts management (11 method)
  - [x] lib/api/domains.ts - Domain management (5 method)
  - [x] lib/api/databases.ts - Database management (9 method)
  - [x] lib/api/files.ts - File operations (10 method)
  - [x] lib/api/backups.ts - Backup management (6 method)
  - [x] lib/api/security.ts - Security features (11 method)
  - [x] lib/api/index.ts - Central export point
  
- [x] **Component Integration (2 sayfa proof-of-concept)**
  - [x] Email Accounts page - Backend'den veri çekiyor
  - [x] Domains page - Backend'den veri çekiyor
  - [x] Loading states eklendi
  - [x] Error handling eklendi
  - [x] TypeScript interfaces backend DTOs ile uyumlu

#### Language System Fix
- [x] en.json - 30+ translation key eklendi
- [x] tr.json - 30+ translation key eklendi
- [x] Login form translations
- [x] Navigation translations
- [x] Category translations

### Frontend - Tüm cPanel Sayfaları Oluşturuldu (38 sayfa)
- [x] **Dashboard Enhancement**
  - [x] Collapsible kategoriler (açılır/kapanır)
  - [x] localStorage ile state persistence (F5'te kalıcı)
  - [x] ChevronUp/ChevronDown ikonları
  - [x] 8 rota düzeltmesi + locale prefix

- [x] **Email Category** (11 sayfa - önceden oluşturulmuş)
  - [x] Email Accounts, Forwarders, Autoresponders
  - [x] Email Routing, Default Address, Mailing Lists
  - [x] Track Delivery, Email Filters, Authentication
  - [x] Address Importer, Encryption, Calendar/Contacts, BoxTrapper

- [x] **Files Category** (8 sayfa - önceden oluşturulmuş)
  - [x] File Manager, Disk Usage, FTP Accounts
  - [x] FTP Connections, Backup, Directory Privacy
  - [x] Images, Web Disk

- [x] **Databases Category** (6 sayfa - önceden oluşturulmuş)
  - [x] phpMyAdmin, MySQL Databases, MySQL Wizards
  - [x] PostgreSQL Databases, PostgreSQL Wizard, Remote MySQL

- [x] **Domains Category** (11 sayfa - önceden oluşturulmuş)
  - [x] Site Publisher, Domains, Subdomains
  - [x] Addon Domains, Aliases, Redirects
  - [x] DNS Zone Editor, Dynamic DNS, SSL/TLS Status

- [x] **Advanced Category** (8/8 sayfa)
  - [x] Track DNS - DNS lookup tool with records
  - [x] Indexes - Apache directory indexing
  - [x] Error Pages - Custom HTTP error pages (400-500)
  - [x] Apache Handlers - Handler configuration
  - [x] MIME Types - MIME type management
  - [x] Virus Scanner - ClamAV with threat detection
  - [x] Cron Jobs - Already existed
  - [x] Terminal - Already existed

- [x] **Security Category** (9/9 sayfa)
  - [x] SSH Access - Key management, connection info
  - [x] IP Blocker - Whitelist/blacklist with CIDR
  - [x] SSL/TLS - Certificate installation
  - [x] SSL/TLS Status - Certificate checker
  - [x] Hotlink Protection - Bandwidth protection
  - [x] Leech Protection - Password sharing prevention
  - [x] ModSecurity - WAF with OWASP rules
  - [x] Two-Factor Authentication - TOTP setup
  - [x] Manage API Tokens - API key generation

- [x] **Metrics Category** (8/8 sayfa)
  - [x] Visitors - Analytics with custom bar charts
  - [x] Errors - Error log viewer
  - [x] Bandwidth - Usage graphs
  - [x] Raw Access - Apache log downloads
  - [x] Awstats - AWStats integration
  - [x] Analog Stats - Analog configuration
  - [x] Webalizer - Report viewer
  - [x] Metrics Editor - Collection settings

- [x] **Preferences Category** (5/5 sayfa)
  - [x] Password & Security - Password change with strength meter
  - [x] Change Language - Language selector (6 languages)
  - [x] Contact Information - Personal info forms
  - [x] User Manager - Sub-user management
  - [x] User Preferences - UI settings, timezone

- [x] **Software Category** (8/8 sayfa)
  - [x] PHP Version Manager - PHP version selector
  - [x] Softaculous - App installer (450+ apps)
  - [x] MultiPHP INI Editor - PHP configuration
  - [x] MultiPHP Manager - Domain-specific PHP versions
  - [x] Optimize Website - Gzip, browser caching
  - [x] Perl Modules - CPAN module installer
  - [x] Site Software - Software management
  - [x] Select PHP Version - (covered by PHP Version Manager)

### Backend - Tam Fonksiyonel API (60+ endpoint)

- [x] **Database Setup**
  - [x] Docker Compose (PostgreSQL + Redis)
  - [x] Prisma migrations çalıştırıldı
  - [x] Database schema oluşturuldu

- [x] **Core Modules**
  - [x] DatabaseModule - Prisma service (global)
  - [x] ConfigModule - .env desteği
  - [x] HealthModule - Health check endpoints

- [x] **AuthModule** (`/auth/*` - 3 endpoint)
  - [x] POST /auth/register - Kullanıcı kaydı
  - [x] POST /auth/login - Giriş (mock JWT)
  - [x] GET /auth/profile - Profil bilgisi

- [x] **DomainsModule** (`/domains/*` - 5 endpoint)
  - [x] GET /domains - Tüm domainler
  - [x] GET /domains/:id - Domain detayı
  - [x] POST /domains - Yeni domain
  - [x] PUT /domains/:id/ssl - SSL güncelle
  - [x] DELETE /domains/:id - Domain sil

- [x] **EmailModule** (`/email/*` - 11 endpoint)
  - [x] GET /email/accounts - Email hesapları
  - [x] GET /email/accounts/:id - Email detayı
  - [x] POST /email/accounts - Yeni email
  - [x] PUT /email/accounts/:id - Email güncelle
  - [x] DELETE /email/accounts/:id - Email sil
  - [x] GET /email/forwarders - Yönlendirmeler
  - [x] POST /email/forwarders - Yeni yönlendirme
  - [x] DELETE /email/forwarders/:id - Yönlendirme sil
  - [x] GET /email/autoresponders - Otomatik yanıtlar
  - [x] POST /email/autoresponders - Yeni otomatik yanıt
  - [x] DELETE /email/autoresponders/:id - Otomatik yanıt sil

- [x] **DatabasesModule** (`/databases/*` - 9 endpoint)
  - [x] GET /databases - Tüm veritabanları
  - [x] GET /databases/:id - DB detayı
  - [x] POST /databases - Yeni veritabanı
  - [x] DELETE /databases/:id - Veritabanı sil
  - [x] GET /databases/users/all - DB kullanıcıları
  - [x] POST /databases/users - Yeni DB kullanıcısı
  - [x] DELETE /databases/users/:id - Kullanıcı sil
  - [x] POST /databases/privileges - Yetki ver
  - [x] GET /databases/privileges/:userId/:databaseId - Yetkileri getir

- [x] **FilesModule** (`/files/*` - 10 endpoint)
  - [x] GET /files/list - Dizin listele
  - [x] GET /files/get - Dosya içeriği
  - [x] POST /files/create - Dosya oluştur
  - [x] PUT /files/update - Dosya güncelle
  - [x] DELETE /files/delete - Dosya sil
  - [x] POST /files/directory - Klasör oluştur
  - [x] PUT /files/permissions - İzinleri ayarla
  - [x] POST /files/compress - Dosyaları sıkıştır
  - [x] POST /files/extract - Arşiv aç
  - [x] GET /files/disk-usage - Disk kullanımı

- [x] **BackupsModule** (`/backups/*` - 6 endpoint)
  - [x] GET /backups - Tüm yedekler
  - [x] GET /backups/stats - Yedek istatistikleri
  - [x] GET /backups/:id - Yedek detayı
  - [x] POST /backups - Yeni yedek
  - [x] POST /backups/restore - Yedekten geri yükle
  - [x] DELETE /backups/:id - Yedek sil

- [x] **SecurityModule** (`/security/*` - 11 endpoint)
  - [x] GET /security/ssl - SSL sertifikaları
  - [x] POST /security/ssl/install - SSL yükle
  - [x] POST /security/ssl/generate-csr - CSR oluştur
  - [x] DELETE /security/ssl/:id - SSL sil
  - [x] GET /security/blocked-ips - Engellenmiş IP'ler
  - [x] POST /security/block-ip - IP engelle
  - [x] DELETE /security/blocked-ips/:id - IP engeli kaldır
  - [x] GET /security/firewall/rules - Firewall kuralları
  - [x] POST /security/firewall/rules - Yeni kural
  - [x] PUT /security/firewall/rules/:id/toggle - Kuralı aç/kapat
  - [x] DELETE /security/firewall/rules/:id - Kural sil

- [x] **Infrastructure**
  - [x] Swagger UI - http://localhost:3001/docs
  - [x] Validation - class-validator + DTOs
  - [x] Error Handling - Global exception filters
  - [x] Logging - Pino logger
  - [x] Security - Helmet, CORS, Rate limiting
  - [x] Hot Reload - Watch mode çalışıyor

---

## 🚧 YAPILACAKLAR

### 1. Fullstack Entegrasyon (ÖNCELİK: YÜKSEK)
- [ ] Frontend'i Backend'e bağla
  - [ ] API client oluştur (axios/fetch)
  - [ ] Email sayfalarını backend'e bağla
  - [ ] Databases sayfalarını backend'e bağla
  - [ ] Files sayfalarını backend'e bağla
  - [ ] Domains sayfalarını backend'e bağla
  - [ ] Security sayfalarını backend'e bağla
  - [ ] Backups sayfalarını backend'e bağla

### 2. i18n Sistem Tamamla (ÖNCELİK: YÜKSEK)
- [ ] Tüm sayfaları next-intl ile çevir
- [ ] Dashboard kategorilerini çevir
- [ ] Form etiketlerini çevir
- [ ] Hata mesajlarını çevir
- [ ] Dil seçici component ekle

### 3. Auth Akışı Tamamla (ÖNCELİK: YÜKSEK)
- [ ] JWT implementasyonu
  - [ ] Access token + Refresh token
  - [ ] Token storage (httpOnly cookies)
  - [ ] Token rotation
- [ ] Login sayfasını backend'e bağla
- [ ] AuthGuard oluştur
- [ ] Protected routes ekle
- [ ] Logout fonksiyonu
- [ ] Password hashing (bcrypt)

### 4. Gerçek Veritabanı İşlemleri
- [ ] Mock data yerine Prisma kullan
- [ ] Email accounts DB'ye kaydet
- [ ] Domain management DB'ye kaydet
- [ ] File operations gerçek dosya sistemi
- [ ] Backup operations gerçek yedekleme

### 5. WebSocket Real-time Updates
- [ ] Socket.io Gateway kurulumu
- [ ] Job progress tracking
- [ ] Live log streaming
- [ ] Real-time notifications

### 6. Test Coverage
- [ ] Unit testler (services)
- [ ] Integration testler (endpoints)
- [ ] E2E testler (Playwright)

### 7. UI/UX İyileştirmeler
- [ ] Loading states
- [ ] Error states
- [ ] Success notifications (toast)
- [ ] Form validation feedback
- [ ] Responsive design iyileştirmeleri
- [ ] Dark mode toggle

---

## 📊 İLERLEME DURUMU

### Frontend Sayfalar: **67/77 (%87)**
- ✅ Email: 11/11
- ✅ Files: 8/8
- ✅ Databases: 6/6
- ✅ Domains: 11/11
- ✅ Advanced: 8/8
- ✅ Security: 9/9
- ✅ Metrics: 8/8
- ✅ Preferences: 5/5
- ✅ Software: 8/8
- ⏳ Kalan: ~10 sayfa (Dashboard improvements, Settings, vb.)

### Backend API: **60+ endpoint (%75)**
- ✅ Auth: 3/3
- ✅ Domains: 5/5
- ✅ Email: 11/11
- ✅ Databases: 9/9
- ✅ Files: 10/10
- ✅ Backups: 6/6
- ✅ Security: 11/11
- ✅ Health: 1/1

### Fullstack Integration: **25%** 🆕
- ✅ API Client Infrastructure: 100%
  - ✅ axios HTTP client kuruldu
  - ✅ 8 API wrapper servisi oluşturuldu
  - ✅ TypeScript interfaces tanımlandı
  - ✅ Request/Response interceptors
  - ✅ Token management sistemi
- ✅ Component Integration: 2/67 (%3)
  - ✅ Email Accounts - Backend'e bağlı
  - ✅ Domains - Backend'e bağlı
  - ⏳ Kalan: 65 sayfa backend'e bağlanacak
- ⏳ Real Authentication: 0%
  - ⏳ Login page backend integration
  - ⏳ JWT token storage & refresh
  - ⏳ Protected routes middleware
- ⏳ Backend Mock Data Replacement: 0%
  - ⏳ Email module → Prisma models gerekli
  - ⏳ Databases module → Real PostgreSQL/MySQL integration
  - ⏳ Files module → File system integration
  - ⏳ Security module → SSL/IP/Firewall Prisma models
- ✅ Files: 10/10
- ✅ Backups: 6/6
- ✅ Security: 11/11
- ✅ Health/Metrics: 2/2
- ⏳ Eksik: Sites, Jobs, Users modülleri

### Fullstack Entegrasyon: **%0**
- ⏳ Tüm sayfalar static/mock data kullanıyor
- ⏳ Backend API'ye fetch işlemleri yok
- ⏳ Auth flow frontend'e entegre değil

---

## 🎯 SONRAKİ ADIMLAR

### Bugün:
1. ✅ Docker Compose ile PostgreSQL/Redis başlat
2. ✅ Backend tüm modüllerle çalışır durumda
3. ✅ Swagger UI test edildi
4. ⏳ Frontend'i backend'e bağla
5. ⏳ i18n sistemi düzelt

### Bu Hafta:
1. Fullstack entegrasyon tamamla
2. Auth akışı tamamla (JWT)
3. En az 5 sayfayı gerçek API'ye bağla

### Gelecek Hafta:
1. Kalan sayfaları API'ye bağla
2. WebSocket ekle
3. Test coverage başlat

---

**Son Güncelleme**: 11 Ekim 2025 - 13:45  
**Durum**: 
- ✅ Backend API çalışıyor (60+ endpoint)
- ✅ Frontend sayfalar tamamlandı (67/77)
- ⏳ Fullstack entegrasyon bekleniyor
- ⏳ i18n düzeltmesi yapılıyor

### Monorepo ve Paylaşılan Paketler
- [x] pnpm workspaces yapılandırması
- [x] Root package.json (dev, build, test, lint, e2e scriptleri)
- [x] TypeScript base config + EditorConfig + ESLint
- [x] packages/config (ESLint, Tailwind, TS configs, Zod env şemaları)
- [x] packages/types (RBAC, modeller, DTO'lar)
- [x] packages/ui (Button, Card, Skeleton, StatusPill, CodeLog)

### API (NestJS)
- [x] Temel NestJS iskelet
- [x] Prisma schema (User, Account, Domain, Site, Job, Backup, Metric, ApiToken, RefreshToken)
- [x] Seed script (ROOT, ADMIN x2, RESELLER, USER x2)
- [x] Health ve Metrics kontrolcüleri
- [x] RBAC Guard örneği
- [x] BullMQ deploy processor örneği
- [x] Helmet, CORS, rate-limit, pino logging
- [x] Prometheus /metrics/prometheus endpoint
- [x] Swagger /docs
- [x] Dockerfile

### Frontend (Next.js)
- [x] apps/web temel iskelet (App Router, Tailwind, next-intl TR/EN)
- [x] apps/admin temel iskelet
- [x] Örnek sayfalar (Dashboard, Metrikler, Deploy Logları)
- [x] Dockerfile'lar

### DevOps
- [x] docker-compose.yml (postgres, redis, api, web, admin, traefik, prometheus, grafana)
- [x] Traefik static + dynamic configs
- [x] Prometheus scrape config
- [x] Grafana dashboard örneği
- [x] GitHub Actions CI

### Dokümantasyon
- [x] README.md (kurulum, çalıştırma, seed kullanıcıları)
- [x] Architecture.md
- [x] Security.md
- [x] Ops.md
- [x] .env.example dosyaları

---

## 🚧 Devam Eden / Geliştirilecek

### 1. Auth Akışı (Öncelik: Yüksek)
- [ ] JWT access + refresh token implementasyonu
- [ ] Login endpoint (POST /auth/login)
- [ ] Refresh endpoint (POST /auth/refresh)
- [ ] Logout endpoint (POST /auth/logout, token revoke)
- [ ] JWT AuthGuard (tüm korumalı route'larda)
- [ ] 2FA TOTP (enable/verify/disable endpoints)
  - [ ] POST /auth/2fa/enable (QR code döner)
  - [ ] POST /auth/2fa/verify
  - [ ] POST /auth/2fa/disable
- [ ] Password hashing (bcrypt/argon2)
- [ ] Refresh token rotation + revocation tablosu

### 2. API Modülleri (Öncelik: Yüksek)
- [ ] Users Module
  - [ ] GET /users (ADMIN/ROOT only)
  - [ ] GET /users/:id
  - [ ] POST /users (create)
  - [ ] PATCH /users/:id (update)
  - [ ] DELETE /users/:id
- [ ] Accounts Module
  - [ ] GET /accounts
  - [ ] GET /accounts/:id
  - [ ] POST /accounts
  - [ ] PATCH /accounts/:id
  - [ ] GET /accounts/:id/sites
  - [ ] GET /accounts/:id/domains
- [ ] Domains Module
  - [ ] GET /domains
  - [ ] POST /domains
  - [ ] POST /domains/:id/issue-ssl (SSL job tetikle)
  - [ ] DELETE /domains/:id
- [ ] Sites Module
  - [ ] GET /sites
  - [ ] POST /sites
  - [ ] POST /sites/:id/deploy (deploy job tetikle)
  - [ ] GET /sites/:id/deployments
  - [ ] DELETE /sites/:id
- [ ] Jobs Module
  - [ ] GET /jobs
  - [ ] GET /jobs/:id
  - [ ] DELETE /jobs/:id (cancel/remove)
- [ ] Backups Module
  - [ ] GET /backups
  - [ ] POST /backups (backup job tetikle)
  - [ ] GET /backups/:id/download
  - [ ] DELETE /backups/:id
- [ ] Tokens Module
  - [ ] GET /tokens (kullanıcının kendi token'ları)
  - [ ] POST /tokens (yeni API token oluştur)
  - [ ] DELETE /tokens/:id

### 3. WebSocket Gateway (Öncelik: Orta)
- [ ] Gateway kurulumu (@nestjs/platform-socket.io)
- [ ] Kanallar:
  - [ ] metrics/live (canlı metrik stream)
  - [ ] jobs/updates (job progress events)
  - [ ] deploy/logs:{siteId} (deploy log stream)
- [ ] WS Guard (JWT doğrulama)
- [ ] Job event'lerini WS üzerinden yayınla

### 4. Queue İşleyicileri (Öncelik: Orta)
- [ ] sslQueue processor (ACME simülasyonu)
- [ ] backupQueue processor (DB dump + file tar + saklama simülasyonu)
- [ ] logIngestQueue processor
- [ ] Job progress WebSocket event'leri
- [ ] Retry/backoff stratejileri

### 5. Frontend - Web Panel (Öncelik: Orta)
- [ ] Login sayfası (/login)
- [ ] 2FA verification sayfası
- [ ] Dashboard (genel istatistikler)
- [ ] Domainler listesi + ekleme formu
- [ ] Siteler listesi + ekleme formu
- [ ] Site detay (deploy geçmişi, canlı log)
- [ ] Yedekler listesi + yeni yedek oluşturma
- [ ] Metrikler sayfası (WebSocket canlı grafik)
- [ ] Ayarlar sayfası (API token yönetimi, 2FA aç/kapa)
- [ ] Tema switcher (dark/light)
- [ ] i18n dil seçici (TR/EN)

### 6. Frontend - Admin Panel (Öncelik: Orta)
- [ ] Login sayfası (RBAC kontrollü)
- [ ] Genel metrikler dashboard
- [ ] Kullanıcılar yönetimi (liste, ekleme, düzenleme, silme)
- [ ] Roller yönetimi
- [ ] Hesaplar listesi
- [ ] Job izleme paneli (tüm joblar + filtre)
- [ ] Log akışı (tüm sistem logları)
- [ ] Sistem ayarları

### 7. Test Altyapısı (Öncelik: Düşük)
- [ ] Jest konfigürasyonu
- [ ] API unit testleri (servisler)
- [ ] API integration testleri (supertest)
- [ ] Playwright konfigürasyonu
- [ ] E2E testler:
  - [ ] Login akışı
  - [ ] Domain ekleme + SSL
  - [ ] Site deploy
  - [ ] Backup oluşturma
  - [ ] 2FA aç/kapa

### 8. UI/UX İyileştirmeleri (Öncelik: Düşük)
- [ ] Table component (filtreleme, sıralama, sayfalama)
- [ ] Modal component
- [ ] Drawer component
- [ ] Badge component
- [ ] Tabs component
- [ ] Form bileşenleri (react-hook-form + zod)
- [ ] Toaster/Notification sistemi
- [ ] Loading states (Skeleton'lar)
- [ ] Erişilebilirlik iyileştirmeleri (ARIA, keyboard nav)

### 9. Güvenlik İyileştirmeleri (Öncelik: Orta)
- [ ] CSRF koruması (SSR double-submit cookie)
- [ ] Rate limiting detaylandırması (endpoint bazlı)
- [ ] Input sanitization
- [ ] SQL injection koruması (Prisma zaten safe ama kontrol)
- [ ] XSS koruması (CSP headers)
- [ ] Sensitive data masking (logs'ta)

### 10. Monitoring & Observability (Öncelik: Düşük)
- [ ] Gerçek Prometheus metrikleri topla (API calls, latency, etc.)
- [ ] Grafana dashboard genişletme (CPU, RAM, disk, job counts)
- [ ] Log aggregation (Loki/ELK simülasyonu)
- [ ] APM entegrasyonu (simülasyon)

### 11. Dokümantasyon Genişletme (Öncelik: Düşük)
- [ ] API endpoint dokümantasyonu (Swagger annotations)
- [ ] Her modül için README
- [ ] Deployment rehberi
- [ ] Troubleshooting guide
- [ ] Contributing guide
- [ ] Demo GIF'leri/Videolar

---

## 🐛 Bilinen Sorunlar / İyileştirmeler

1. **PostgreSQL/Redis Dependency**: Docker Compose olmadan yerel dev zor. Alternatif: SQLite dev modu eklenebilir.
2. **Seed password hashing**: Şu an SHA256, production'da bcrypt/argon2 olmalı.
3. **Next.js i18n routing**: Şu an basit; middleware ile dil algılama eklenebilir.
4. **WebSocket reconnection**: Client-side reconnection logic yok.
5. **Error boundaries**: Next.js app'lerde global error boundary eklenebilir.

---

## 📅 Milestone Önerileri

### Milestone 1: MVP Auth & CRUD (2-3 hafta)
- Auth akışı (login, refresh, 2FA)
- Temel CRUD modülleri (Users, Accounts, Domains, Sites)
- Web panel: Login + Dashboard + Domain/Site listesi
- Admin panel: Login + Kullanıcılar yönetimi

### Milestone 2: Job System & Real-time (2 hafta)
- Queue işleyicileri (deploy, backup, ssl)
- WebSocket Gateway
- Web panel: Deploy logları, yedek yönetimi
- Admin panel: Job izleme

### Milestone 3: Polish & Production Ready (2 hafta)
- Test coverage artırma
- Güvenlik audit
- Performance optimization
- Dokümantasyon tamamlama
- CI/CD pipeline iyileştirme

---

## 🎯 Sonraki Adım Önerileri

1. **Hemen**: Web/Admin app'leri çalıştır (`pnpm dev`), UI'yı test et
2. **Bugün**: Auth module'ü geliştirmeye başla (login endpoint + JWT)
3. **Bu hafta**: Temel CRUD endpoint'leri tamamla
4. **Gelecek hafta**: WebSocket + Job system

---

## 📝 Notlar

- Proje şu an **iskelet/PoC** seviyesinde. Üretim için auth, validation, error handling genişletilmeli.
- Docker Compose ile full stack test edebilirsin: `docker-compose up --build`
- Seed kullanıcıları: README.md'de tablo halinde mevcut
- API Swagger: http://localhost:3001/docs

---

**Son Güncelleme**: 11 Ekim 2025  
**Durum**: API çalışıyor ✅ | Web/Admin iskelet hazır ✅ | Auth & CRUD bekleniyor 🚧

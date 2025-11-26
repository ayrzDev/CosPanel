# 🎉 Hosting Yönetim Sistemi - Kurulum Tamamlandı!

## ✅ Tamamlanan Özellikler

### 1. Backend API (Port 3001)
- ✅ **Customer Management API** - `/customers`
  - CRUD operations (Create, Read, Update, Delete)
  - Customer status management (ACTIVE, SUSPENDED, TERMINATED)
  - Otomatik dosya sistemi oluşturma
  
- ✅ **Hosting Plans API** - `/hosting-plans`
  - Hosting planları yönetimi
  - Resource limits (disk, bandwidth, email, database, FTP)
  - Pricing management (monthly/yearly)
  
- ✅ **Invoices API** - `/invoices`
  - Fatura oluşturma ve yönetimi
  - Payment tracking (PENDING, PAID, OVERDUE, CANCELLED)
  - Customer-based invoice listing
  
- ✅ **Support Tickets API** - `/tickets`
  - Destek talepleri yönetimi
  - Priority levels (LOW, MEDIUM, HIGH, URGENT)
  - Reply system with JSON storage

### 2. Admin Panel (Port 3002)
- ✅ **Admin Dashboard**
  - Quick statistics overview
  - Recent activity feed
  - Quick action buttons
  
- ✅ **Customer Management Page**
  - Customer listing with search
  - Status badges (Active, Suspended, Terminated)
  - Real-time data from API

### 3. Dosya Sistemi Yönetimi
- ✅ Otomatik klasör oluşturma: `/home/{username}/`
- ✅ cPanel-style directory structure:
  ```
  /home/username/
  ├── .cpanel/
  ├── .caldav/
  ├── .cl.selector/
  ├── mail/
  ├── public_html/
  │   ├── index.html
  │   └── .htaccess
  ├── public_ftp/
  ├── ssl/
  │   ├── certs/
  │   ├── keys/
  │   └── csrs/
  ├── logs/
  ├── tmp/
  ├── etc/
  ├── backup/
  ├── www/ (symlink)
  ├── .ssh/
  └── .well-known/
  ```

### 4. Database Seed Data
- ✅ 3 Hosting Plans:
  - **Basic Hosting** - $9.99/mo (5GB disk, 50GB bandwidth)
  - **Professional Hosting** - $24.99/mo (20GB disk, 200GB bandwidth)
  - **Business Hosting** - $49.99/mo (100GB disk, 1TB bandwidth)
  
- ✅ 3 Sample Customers:
  - johndoe (Basic Plan)
  - janesmith (Professional Plan)
  - bobwilson (Business Plan)
  
- ✅ 3 Sample Invoices (PAID, PENDING, OVERDUE)
- ✅ 3 Sample Support Tickets (OPEN, IN_PROGRESS, CLOSED)

## 🚀 Nasıl Çalıştırılır?

### Backend API (Port 3001)
```bash
cd apps/api
pnpm dev
```

### Admin Panel (Port 3002)
```bash
cd apps/admin
pnpm dev
```

### Customer Panel (Port 3000)
```bash
cd apps/web
pnpm dev
```

## 🔑 Login Bilgileri

### Admin Login
- **Email:** root@umixpanel.local
- **Şifre:** rootpass

### Test User Login
- **Email:** test@example.com
- **Şifre:** test123456

## 📡 API Endpoints

### Customers
- `GET /customers` - Tüm müşterileri listele
- `GET /customers/:id` - Müşteri detayı
- `POST /customers` - Yeni müşteri oluştur
- `PUT /customers/:id` - Müşteri güncelle
- `DELETE /customers/:id` - Müşteri sil
- `PUT /customers/:id/suspend` - Müşteriyi askıya al
- `PUT /customers/:id/activate` - Müşteriyi aktifleştir
- `PUT /customers/:id/terminate` - Müşteriyi sonlandır

### Hosting Plans
- `GET /hosting-plans` - Tüm planları listele
- `GET /hosting-plans/:id` - Plan detayı
- `POST /hosting-plans` - Yeni plan oluştur
- `PUT /hosting-plans/:id` - Plan güncelle
- `DELETE /hosting-plans/:id` - Plan sil

### Invoices
- `GET /invoices` - Tüm faturaları listele
- `GET /invoices/:id` - Fatura detayı
- `GET /invoices/customer/:customerId` - Müşteriye ait faturalar
- `POST /invoices` - Yeni fatura oluştur
- `PUT /invoices/:id` - Fatura güncelle
- `PUT /invoices/:id/pay` - Faturayı ödenmiş olarak işaretle
- `PUT /invoices/:id/cancel` - Faturayı iptal et

### Support Tickets
- `GET /tickets` - Tüm ticketları listele
- `GET /tickets/:id` - Ticket detayı
- `GET /tickets/customer/:customerId` - Müşteriye ait ticketlar
- `POST /tickets` - Yeni ticket oluştur
- `PUT /tickets/:id` - Ticket güncelle
- `POST /tickets/:id/reply` - Ticket'a cevap ekle
- `PUT /tickets/:id/close` - Ticket'ı kapat
- `PUT /tickets/:id/reopen` - Ticket'ı yeniden aç

## 📊 Database Schema

### Customer Model
- Personal info (fullName, email, phone, address, companyName)
- Hosting details (username, homeDirectory, hostingPlan)
- Resource limits (diskQuota, bandwidth, email, database, FTP limits)
- Financial (billingCycle, totalPaid, nextBillingDate)
- Status management (ACTIVE, SUSPENDED, TERMINATED, PENDING)

### HostingPlan Model
- Resource limits (disk, bandwidth, emails, databases, FTP, subdomains)
- Pricing (monthly, yearly, setupFee)
- Features (JSON array - SSL, SSH, Cron, Git, etc.)

### Invoice Model
- Customer reference
- Invoice number, description, amounts (amount, tax, total)
- Status (PENDING, PAID, OVERDUE, CANCELLED)
- Payment tracking (dueDate, paidDate, paymentMethod)

### SupportTicket Model
- Customer reference
- Ticket details (subject, message, priority, status)
- Reply system (JSON array with userId, message, timestamp)

## 🎯 Sonraki Adımlar

1. **Admin Panel Geliştirme:**
   - Hosting Plans sayfası
   - Invoices sayfası
   - Support Tickets sayfası
   - Customer detail page

2. **Authentication System:**
   - Admin login sayfası
   - JWT token management
   - Role-based access control

3. **File System Integration:**
   - FTP server configuration
   - File manager integration
   - Quota monitoring

4. **Email System:**
   - Email account creation API integration
   - Email quota management
   - Forwarder and autoresponder setup

## 📝 Notlar

- Tüm API endpoints JWT authentication ile korunmaktadır
- Customer oluşturulduğunda otomatik olarak `/storage/customers/{username}` klasör yapısı oluşturulur
- Her müşteri için index.html ve .htaccess otomatik oluşturulur
- Seed data ile 3 plan, 3 müşteri, 3 fatura ve 3 ticket otomatik yüklenir

## 🔧 Teknolojiler

- **Backend:** NestJS, Prisma ORM, PostgreSQL
- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Icons:** Heroicons
- **Authentication:** JWT
- **Database:** PostgreSQL

---

**Tebrikler! 🎉** Hosting yönetim sistemi başarıyla kuruldu ve çalışmaya hazır!

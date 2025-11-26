# 🗄️ SQL Migration Plan - Tüm Servisleri PostgreSQL'e Bağlama

## 📊 Mevcut Durum

### ✅ SQL'e Bağlı (Tamamlandı)
- [x] **Auth** - `User` tablosu
- [x] **Domains** - `Domain` tablosu  
- [x] **Backups** - `Backup` tablosu
- [x] **Sites** - `Site` tablosu

### ❌ Mock Data Kullananlar (Yapılacak)

#### 🔴 Öncelik 1: Kritik Servisler
- [ ] **Email** - Email hesapları, forwarders, autoresponders
- [ ] **Databases** - MySQL/PostgreSQL yönetimi
- [ ] **Security** - SSL sertifikaları, IP bloklama, API tokens

#### 🟡 Öncelik 2: Önemli Servisler  
- [ ] **Files** - FTP hesapları, disk kullanımı
- [ ] **Metrics** - Bandwidth, ziyaretçi istatistikleri
- [ ] **Advanced** - Cron jobs

---

## 📋 Migration Adımları

### 1️⃣ EMAIL SERVİSİ (Öncelik 1)

#### Prisma Modelleri (schema.prisma):

```prisma
model EmailAccount {
  id          String   @id @default(uuid())
  accountId   String
  account     Account  @relation(fields: [accountId], references: [id], onDelete: Cascade)
  email       String   @unique
  password    String
  quota       Int      @default(250) // MB
  usedSpace   Int      @default(0)   // MB
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([accountId])
}

model EmailForwarder {
  id          String   @id @default(uuid())
  accountId   String
  account     Account  @relation(fields: [accountId], references: [id], onDelete: Cascade)
  source      String
  destination String
  createdAt   DateTime @default(now())

  @@index([accountId])
}

model EmailAutoresponder {
  id          String   @id @default(uuid())
  accountId   String
  account     Account  @relation(fields: [accountId], references: [id], onDelete: Cascade)
  email       String
  subject     String
  body        String   @db.Text
  startDate   DateTime?
  endDate     DateTime?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([accountId])
}

model EmailFilter {
  id          String   @id @default(uuid())
  accountId   String
  account     Account  @relation(fields: [accountId], references: [id], onDelete: Cascade)
  name        String
  condition   String   // JSON: {field, operator, value}
  action      String   // JSON: {type, value}
  order       Int
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())

  @@index([accountId])
}
```

#### Migration Komutu:
```bash
cd apps/api
pnpm exec prisma migrate dev --name add_email_models
pnpm exec prisma generate
```

#### Service Güncellemesi:
- `apps/api/src/email/email.service.ts` - Mock array'leri kaldır, Prisma kullan
- Tüm CRUD metodlarını güncelle (create, findAll, findOne, update, delete)

---

### 2️⃣ DATABASE YÖNETİMİ (Öncelik 1)

#### Prisma Modelleri:

```prisma
model ManagedDatabase {
  id          String   @id @default(uuid())
  accountId   String
  account     Account  @relation(fields: [accountId], references: [id], onDelete: Cascade)
  name        String
  type        DatabaseType // MYSQL, POSTGRESQL
  host        String   @default("localhost")
  port        Int
  username    String
  password    String
  size        Int      @default(0) // MB
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  users       DatabaseUser[]
  privileges  DatabasePrivilege[]

  @@unique([accountId, name])
  @@index([accountId])
}

enum DatabaseType {
  MYSQL
  POSTGRESQL
}

model DatabaseUser {
  id          String   @id @default(uuid())
  databaseId  String
  database    ManagedDatabase @relation(fields: [databaseId], references: [id], onDelete: Cascade)
  username    String
  password    String
  host        String   @default("localhost")
  createdAt   DateTime @default(now())

  privileges  DatabasePrivilege[]

  @@unique([databaseId, username])
  @@index([databaseId])
}

model DatabasePrivilege {
  id          String   @id @default(uuid())
  databaseId  String
  database    ManagedDatabase @relation(fields: [databaseId], references: [id], onDelete: Cascade)
  userId      String
  user        DatabaseUser @relation(fields: [userId], references: [id], onDelete: Cascade)
  privileges  String   @default("ALL") // ALL, SELECT, INSERT, UPDATE, DELETE, etc.
  createdAt   DateTime @default(now())

  @@unique([databaseId, userId])
  @@index([databaseId])
  @@index([userId])
}
```

---

### 3️⃣ SECURITY (Öncelik 1)

#### Prisma Modelleri:

```prisma
model SSLCertificate {
  id          String   @id @default(uuid())
  domainId    String
  domain      Domain   @relation(fields: [domainId], references: [id], onDelete: Cascade)
  type        SSLType  // LETS_ENCRYPT, CUSTOM, SELF_SIGNED
  certificate String   @db.Text
  privateKey  String   @db.Text
  chain       String?  @db.Text
  validFrom   DateTime
  validUntil  DateTime
  autoRenew   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([domainId])
}

enum SSLType {
  LETS_ENCRYPT
  CUSTOM
  SELF_SIGNED
}

model BlockedIP {
  id          String   @id @default(uuid())
  accountId   String
  account     Account  @relation(fields: [accountId], references: [id], onDelete: Cascade)
  ipAddress   String
  reason      String?
  expiresAt   DateTime?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())

  @@index([accountId])
  @@index([ipAddress])
}

model FirewallRule {
  id          String   @id @default(uuid())
  accountId   String
  account     Account  @relation(fields: [accountId], references: [id], onDelete: Cascade)
  name        String
  port        Int
  protocol    String   // TCP, UDP, BOTH
  source      String?  // IP range
  action      String   // ALLOW, DENY
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())

  @@index([accountId])
}
```

---

### 4️⃣ FILES & FTP (Öncelik 2)

#### Prisma Modelleri:

```prisma
model FTPAccount {
  id          String   @id @default(uuid())
  accountId   String
  account     Account  @relation(fields: [accountId], references: [id], onDelete: Cascade)
  username    String   @unique
  password    String
  directory   String
  quota       Int      @default(0) // MB, 0 = unlimited
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([accountId])
}

model DiskUsage {
  id          String   @id @default(uuid())
  accountId   String   @unique
  account     Account  @relation(fields: [accountId], references: [id], onDelete: Cascade)
  totalSpace  Int      // MB
  usedSpace   Int      // MB
  fileCount   Int      @default(0)
  lastScan    DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

### 5️⃣ METRICS (Öncelik 2)

#### Prisma Modelleri:

```prisma
model BandwidthMetric {
  id          String   @id @default(uuid())
  accountId   String
  account     Account  @relation(fields: [accountId], references: [id], onDelete: Cascade)
  date        DateTime @db.Date
  bytesIn     BigInt   @default(0)
  bytesOut    BigInt   @default(0)
  requests    Int      @default(0)
  createdAt   DateTime @default(now())

  @@unique([accountId, date])
  @@index([accountId])
  @@index([date])
}

model VisitorMetric {
  id          String   @id @default(uuid())
  domainId    String
  domain      Domain   @relation(fields: [domainId], references: [id], onDelete: Cascade)
  date        DateTime @db.Date
  visitors    Int      @default(0)
  pageViews   Int      @default(0)
  uniqueIPs   Int      @default(0)
  createdAt   DateTime @default(now())

  @@unique([domainId, date])
  @@index([domainId])
  @@index([date])
}

model ErrorLog {
  id          String   @id @default(uuid())
  domainId    String
  domain      Domain   @relation(fields: [domainId], references: [id], onDelete: Cascade)
  statusCode  Int
  path        String
  message     String?  @db.Text
  ipAddress   String
  userAgent   String?
  timestamp   DateTime @default(now())

  @@index([domainId])
  @@index([timestamp])
  @@index([statusCode])
}
```

---

### 6️⃣ ADVANCED (Öncelik 2)

#### Prisma Modelleri:

```prisma
model CronJob {
  id          String   @id @default(uuid())
  accountId   String
  account     Account  @relation(fields: [accountId], references: [id], onDelete: Cascade)
  command     String   @db.Text
  schedule    String   // Cron expression
  isActive    Boolean  @default(true)
  lastRun     DateTime?
  nextRun     DateTime?
  output      String?  @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([accountId])
  @@index([isActive])
}

model TerminalSession {
  id          String   @id @default(uuid())
  accountId   String
  account     Account  @relation(fields: [accountId], references: [id], onDelete: Cascade)
  sessionId   String   @unique
  startedAt   DateTime @default(now())
  endedAt     DateTime?
  commands    Json     @default("[]") // Array of {timestamp, command, output}
  isActive    Boolean  @default(true)

  @@index([accountId])
  @@index([sessionId])
}
```

---

## 🚀 Migration Sırası

### Hafta 1:
1. ✅ Email modelleri ekle (EmailAccount, Forwarder, Autoresponder, Filter)
2. ✅ Migration çalıştır
3. ✅ EmailService'i güncelle
4. ✅ Frontend'i test et

### Hafta 2:
1. ✅ Database modelleri ekle (ManagedDatabase, DatabaseUser, DatabasePrivilege)
2. ✅ Migration çalıştır
3. ✅ DatabasesService'i güncelle
4. ✅ Frontend'i test et

### Hafta 3:
1. ✅ Security modelleri ekle (SSLCertificate, BlockedIP, FirewallRule)
2. ✅ Migration çalıştır
3. ✅ SecurityService'i güncelle
4. ✅ Frontend'i test et

### Hafta 4:
1. ✅ Files & FTP modelleri ekle
2. ✅ Metrics modelleri ekle
3. ✅ Advanced modelleri ekle
4. ✅ Tüm servisleri test et

---

## ✅ Başlamadan Önce Kontrol Listesi

- [x] PostgreSQL çalışıyor (Docker)
- [x] Prisma bağlantısı çalışıyor
- [x] Mevcut migration'lar başarılı
- [ ] Backup alındı (veriler kaybolmasın)
- [ ] Test senaryoları hazırlandı

---

## 📝 Notlar

- Her model için migration ayrı ayrı çalıştırılacak
- Seed dosyası her yeni model için güncellenecek
- Mock data'dan geçiş aşamalı olacak (test sırasında çift sistem çalışabilir)
- Frontend'de büyük değişiklik olmayacak (API endpoint'leri aynı kalacak)

---

## 🎯 Hedef

Tüm servislerin PostgreSQL'e bağlanması ve cPanel benzeri tam özellikli bir hosting kontrol paneli oluşturulması.

# HeidiSQL ile PostgreSQL Bağlantı Ayarları

## Adım 1: HeidiSQL'i Aç ve Yeni Bağlantı Oluştur

1. HeidiSQL'i başlat
2. Sol altta "New" butonuna tıkla
3. Veya File → Session Manager → New

## Adım 2: Bağlantı Ayarları

**Network type:** `PostgreSQL (TCP/IP)`

**Settings sekmesi:**
- **Hostname / IP:** `localhost` (veya `127.0.0.1`)
- **User:** `postgres`
- **Password:** `postgres`
- **Port:** `5432`
- **Database:** `umixpanel` (bağlandıktan sonra seçebilirsiniz)

## Adım 3: Gelişmiş Ayarlar (İsteğe Bağlı)

**Advanced sekmesi:**
- **Timeout:** 20 (varsayılan)
- **Compressed client/server protocol:** Kapalı
- **Use SSL:** Hayır (local development için)

## Adım 4: Bağlan

1. "Save" butonuna tıklayın (bağlantı ayarlarını kaydet)
2. "Open" butonuna tıklayın
3. Sol panelde veritabanlarını göreceksiniz
4. `umixpanel` veritabanını seç

## Tablolar

Başarılı bağlantıdan sonra göreceğiniz tablolar:
- `User` - Kullanıcılar
- `Account` - Hesaplar
- `Domain` - Domainler
- `Site` - Siteler
- `Job` - İşler
- `Backup` - Yedekler
- `Metric` - Metrikler
- `ApiToken` - API tokenları
- `RefreshToken` - Refresh tokenlar
- `_prisma_migrations` - Prisma migration geçmişi

## Sorun Giderme

### "Could not connect" hatası alıyorsanız:

1. **Docker kontrol:**
   ```powershell
   docker ps
   ```
   PostgreSQL container çalışıyor mu?

2. **Docker başlat:**
   ```powershell
   cd c:\Users\dogru\Desktop\umixpanel
   docker-compose up -d postgres
   ```

3. **Port kontrol:**
   ```powershell
   netstat -ano | findstr :5432
   ```
   Port 5432 başka bir uygulama tarafından kullanılıyor mu?

### "Password authentication failed" hatası:

- Username: `postgres`
- Password: `postgres`
- docker-compose.yml dosyasındaki POSTGRES_PASSWORD ile aynı olmalı

### Database seçilemiyor:

İlk bağlantıda database alanını **boş** bırakın, bağlandıktan sonra `umixpanel`'i seçin.

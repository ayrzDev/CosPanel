# Test Kullanıcısı Oluşturma ve Login Testi

## 1. Swagger UI'dan Test

**Adres:** http://localhost:3001/docs

### Adım 1: Kullanıcı Kaydet
1. `POST /auth/register` endpoint'ini aç
2. "Try it out" butonuna tıkla
3. Request body:
```json
{
  "email": "test@example.com",
  "password": "test123456"
}
```
4. "Execute" butonuna tıkla
5. Response 201 Created dönmeli

### Adım 2: Login Yap
1. `POST /auth/login` endpoint'ini aç
2. "Try it out" butonuna tıkla
3. Request body:
```json
{
  "email": "test@example.com",
  "password": "test123456"
}
```
4. "Execute" butonuna tıkla
5. Response'da `accessToken` alacaksınız

### Adım 3: Profile Erişim
1. `GET /auth/profile` endpoint'ini aç
2. Yukarıda aldığınız token'ı kopyalayın
3. Sayfanın üstündeki "Authorize" butonuna tıklayın
4. Token'ı yapıştırın (Bearer yazmanıza gerek yok)
5. "Authorize" butonuna tıklayın
6. `GET /auth/profile` endpoint'ine dönün ve "Try it out" → "Execute"
7. Kullanıcı bilgilerinizi göreceksiniz

### Adım 4: Yanlış Şifre Testi
1. `POST /auth/login` endpoint'ine tekrar gidin
2. Request body:
```json
{
  "email": "test@example.com",
  "password": "yanlisşifre"
}
```
3. "Execute" butonuna tıkla
4. **Response 401 Unauthorized** dönmeli
5. Error message: "Invalid credentials"

## 2. Frontend'den Test

1. Tarayıcıda http://localhost:3000/login adresine gidin
2. Email: `test@example.com`
3. Password: `test123456`
4. "Giriş Yap" butonuna tıklayın
5. Dashboard'a yönlendirilmelisiniz

### Yanlış Şifre Testi:
1. Login sayfasına gidin
2. Email: `test@example.com`
3. Password: `yanlış123`
4. "Giriş Yap" butonuna tıklayın
5. **Hata mesajı görmeli: "Email veya şifre hatalı"**

## 3. Protected Route Testi

### Logout olmadan:
1. http://localhost:3000/dashboard adresine gidin
2. Sayfa açılmalı

### Logout sonrası:
1. Dashboard'da bir yerde logout butonuna tıklayın
2. Login sayfasına yönlendirilmelisiniz
3. http://localhost:3000/dashboard adresine gitmeyi deneyin
4. **Otomatik olarak login'e yönlendirilmelisiniz**

## 4. cURL ile Test (Terminal)

### Register:
```powershell
curl -X POST http://localhost:3001/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"curl@test.com\",\"password\":\"test123\"}'
```

### Login:
```powershell
curl -X POST http://localhost:3001/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"curl@test.com\",\"password\":\"test123\"}'
```

### Profile (token ile):
```powershell
curl -X GET http://localhost:3001/auth/profile `
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Beklenen Sonuçlar

✅ **Başarılı Durum:**
- Doğru şifre → 200 OK + token
- Token ile /profile → 200 OK + user data
- Login sonrası dashboard açılır
- Logout sonrası protected route'lara erişilemez

❌ **Hatalı Durum:**
- Yanlış şifre → 401 Unauthorized
- Token olmadan /profile → 401 Unauthorized
- Login yapmadan /dashboard → Login'e redirect

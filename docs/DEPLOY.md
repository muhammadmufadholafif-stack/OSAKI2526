# Panduan Deployment ke Vercel & Setup Telegram Bot (PRD Bagian 18 & 20)

Ikuti langkah-langkah di bawah ini untuk merilis web `ultah-hp` ke internet secara gratis.

---

### Langkah 1: Buat Bot Telegram & Ambil Chat ID

1. Buka aplikasi Telegram dan cari **`@BotFather`**.
2. Kirim pesan `/newbot`, lalu ikuti petunjuknya hingga kamu mendapatkan **Bot Token** (contoh: `7123456789:ABCdefGhIjkLmNoPqRsTuVwXyZ`).
3. Kirim pesan `/start` ke bot yang baru kamu buat tersebut.
4. Buka bot **`@userinfobot`** di Telegram untuk melihat akun ID milikmu (contoh: `123456789`).
5. Simpan kedua nilai ini untuk konfigurasi.

---

### Langkah 2: Unggah Kode ke GitHub

1. Buat repository baru di [github.com](https://github.com) (pilih private atau public).
2. Di terminal folder proyekmu, jalankan:
   ```bash
   git add .
   git commit -m "feat: complete ultah-hp simulator"
   git branch -M main
   git remote add origin https://github.com/<username-kamu>/<nama-repo>.git
   git push -u origin main
   ```

---

### Langkah 3: Hubungkan dan Deploy ke Vercel

1. Buka dashboard [vercel.com](https://vercel.com) lalu klik **Add New** → **Project**.
2. Pilih repositori GitHub yang baru diunggah.
3. Konfigurasi Proyek:
   - **Framework Preset**: Pilih **Other**.
   - **Build Command**: Biarkan kosong.
   - **Output Directory**: Ketik `public`.
4. Masukkan **Environment Variables**:
   - `SESSION_SECRET`: Kunci enkripsi 32 karakter
   - `TELEGRAM_BOT_TOKEN`: Token bot Telegram dari BotFather
   - `TELEGRAM_CHAT_ID`: Chat ID akun Telegram-mu
   - `PIN_SIFA`: `1906`
   - `PIN_ALIVA`: `2108`
   - `PIN_AUREL`: `1106`
   - `PIN_ANA`: `1010`
   - `PIN_RINA`: `1234`
5. Klik **Deploy**!

---

### Langkah 4: Uji Coba di HP

Buka URL produksi yang diberikan Vercel, misalnya:
`https://<nama-project>.vercel.app/rina`

Coba masukkan PIN, selesaikan chat, lalu lakukan klaim saldo e-wallet. Notifikasi klaim akan langsung masuk ke bot Telegram-mu dalam hitungan detik! 🚀

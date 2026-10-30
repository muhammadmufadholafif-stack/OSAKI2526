# Catatan Belajar Backend (`docs/LEARNING.md`)

Dokumen ini menjelaskan konsep-konsep backend nyata yang digunakan di proyek `ultah-hp` sebagai bahan belajar Fanskey.

---

### 1. `api/pin.js` & `api/_lib/token.js`
- **Konsep**: *Stateless Authentication* dengan HMAC-SHA256 Token.
- **Mengapa tidak database?**: Daripada menyimpan sesi di database yang boros biaya dan butuh server menyala terus, server menandatangani data sesi (`{ slug, step, exp }`) dengan kunci rahasia `SESSION_SECRET`. Jika ada karakter token yang diubah oleh pengguna di browser, verifikasi HMAC otomatis gagal.
- **Keamanan**: Perbandingan tanda tangan dan PIN menggunakan `crypto.timingSafeEqual` untuk mencegah *Timing Attack* (peretasan dengan mengukur selisih mikrodetik waktu respons server).
- **Latihan kecil**: Coba buka [api/_lib/token.js](file:///c:/Users/WINDOWS%2011/Downloads/ultah%20e%20temen%20temen/api/_lib/token.js), ubah waktu masa berlaku token default dari 12 jam (`12 * 3600`) menjadi 1 jam (`3600`).

---

### 2. `api/chat.js`
- **Konsep**: *State Machine* & Gatekeeping di Server.
- **Mengapa logika ini penting?**: Jika seluruh naskah chat diberikan langsung ke browser di awal, penerima bisa membuka *Inspect Element / Network tab* dan membaca seluruh ceritanya sebelum waktunya. Dengan membagi percakapan ke aksi `advance` dan `send`, server hanya memberikan pesan berikutnya secara bertahap saat gilirannya tiba.

---

### 3. `api/hadiah.js` & `api/klaim.js`
- **Konsep**: *Access Control* (`403 Forbidden`) & Integrasi API Pihak Ketiga (Telegram Bot).
- **Bagaimana hadiah dilindungi?**: Sebelum langkah chat selesai (`step < chat.length`), pemanggilan ke `/api/hadiah` akan selalu ditolak server dengan status `403 LOCKED`. Tidak ada cara membocorkannya lewat browser console.
- **Notifikasi Telegram**: Menggunakan HTTP `fetch` ke `https://api.telegram.org/bot<TOKEN>/sendMessage`. Tidak memerlukan library tambahan, hemat memori, dan instan sampai ke HP pembuat.
- **Latihan kecil**: Coba tambahkan format baris ucapan baru di pesan Telegram pada [api/klaim.js](file:///c:/Users/WINDOWS%2011/Downloads/ultah%20e%20temen%20temen/api/klaim.js).

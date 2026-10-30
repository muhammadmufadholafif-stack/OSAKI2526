# PROGRESS.md — Status pengerjaan ultah-hp

> Diperbarui oleh agent di akhir setiap sesi. Jika berbeda dengan kode/git,
> percaya kode dan git, lalu perbaiki berkas ini.

**Terakhir diperbarui:** 30 Oktober 2026
**Sesi terakhir dikerjakan di:** Kiro IDE

## Posisi sekarang
- **Milestone aktif:** M6
- **Sedang dikerjakan:** Polishing — bug fix lock screen, notifikasi WA, dan bug WA lainnya
- **Langkah berikutnya:** Konfirmasi bug badge lock screen teratasi, lalu inventarisir sisa bug WA, lalu lanjut M6

## Checklist milestone
- [x] M0 — Kerangka proyek
- [x] M1 — Cangkang UI: Lock dan Home
- [x] M2 — Mesin chat dan keyboard (scripted typing)
- [x] M3 — Spotify dan Galeri
- [x] M4 — Backend: PIN, token, chat, konten
- [x] M5 — Hadiah dan klaim (Telegram)
- [ ] M6 — Multi-teman dan poles
- [ ] M7 — Deploy ke Vercel

## Desain
- [x] Layar dari Stitch sudah disimpan di `stitch_reference_screens/`
- Catatan: Semua layar utama mengacu pada acuan visual Stitch (Dark mode iOS).

## Keputusan yang sudah diambil
- Scripted typing: teks berlebih langsung berhenti; tombol Kirim aktif hanya saat teks lengkap.
- PIN tiap teman diatur sendiri oleh pembuat (env var `PIN_<SLUG>`, default Rina: `1234`).
- Alur WhatsApp membaca data riil dari `api/chat.js` (`advance` dan `send`).
- Layar Catatan diisolasi ke kontainer terpisah agar tidak mengganggu layout WhatsApp.
- Tema kado ulang tahun konsisten pada pesan chat dan formulir klaim Hadiah.
- Hadiah hanya bisa dibuka setelah chat selesai (LOCKED → UNLOCKED → OPENED → CLAIMED).
- Toast "Selesaikan chat dulu ya 👀" + getar saat ikon Hadiah ditekan saat masih LOCKED.
- Badge "1" pada ikon Hadiah muncul saat UNLOCKED, hilang saat pertama kali dibuka.
- Notifikasi lock screen menggunakan data dinamis dari `profile.contactName` & `profile.notifText`.
- Badge WA di lock screen dikontrol via `state.waBadgeCount`; di-reset ke 0 saat WA dibuka.

## Masalah terbuka
- **[BELUM DIKONFIRMASI]** Badge WA (angka merah di avatar) di lock screen dilaporkan masih muncul setelah WA dibuka. Sudah diperbaiki di commit `a9a6421` — badge dikontrol oleh `state.waBadgeCount` via fungsi `updateLockNotification()`. Belum ada konfirmasi dari pemilik bahwa ini sudah teratasi. Kemungkinan penyebab jika masih terjadi: browser cache lama (solusi: `Ctrl+Shift+R`).
- **[BELUM DIRINCI]** Bug-bug WA lain dilaporkan ada tapi belum disebutkan detail. Perlu pemilik mendeskripsikan atau screenshot bug spesifik sebelum bisa diperbaiki.

## Daftar `TODO-M4` yang masih ada di kode
- (kosong)

## Setup lingkungan (tanpa rahasia)
- [ ] Bot Telegram dibuat (token ada di `.env.local`, BUKAN di sini)
- [ ] Akun Upstash dibuat (opsional)
- [ ] Repo di GitHub dan project di Vercel dibuat
- [ ] Environment variable terisi di Vercel

## Catatan sesi (terbaru di atas, simpan 5 terakhir)
- **30 Oktober 2026 (Sesi 4 — polishing):**
  - Tambah audio notifikasi WA (`/assets/default/notif.mp3`) + getar di `home.js → showNotification()`.
  - Durasi banner notifikasi home diperpanjang dari 5 detik ke 8 detik.
  - Ganti banner notif lock screen dari hardcoded "Satya"/"Jangan ikut campur..." ke data dinamis dari `profile.contactName` dan `profile.notifText`.
  - Ikon avatar WA di banner lock screen diganti dari gambar eksternal ke ikon WA hijau SVG lokal.
  - Tambah badge unread (angka merah) di avatar WA pada banner lock screen (`#lock-wa-badge`).
  - Badge WA lock screen dikontrol via `state.waBadgeCount` + fungsi `updateLockNotification()` di `main.js` — di-reset ke 0 dan disembunyikan saat WA dibuka.
  - Fix `package.json`: tambah script `"dev": "vercel dev"` yang sebelumnya tidak ada.
  - **Kendala:** badge lock screen belum dikonfirmasi teratasi oleh pemilik.

- **30 Oktober 2026 (Sesi 3):**
  - M5 SELESAI: Hadiah dan klaim lengkap dengan semua fitur PRD F7.
  - Redesign `hadiah.js`: form klaim 8 provider, field bank name conditional, validasi klien, konfirmasi, loading, sukses/error.
  - Integrasi penuh dengan backend `/api/hadiah` dan `/api/klaim`.
  - Logika status Hadiah di `main.js`: toast + getar saat LOCKED, badge "1" saat UNLOCKED, badge hilang saat OPENED.
  - Semua unit test lolos (13 passed, 0 failed).

- **30 Oktober 2026 (Sesi 2):**
  - Mengintegrasikan `whatsapp.js` dengan `typing-engine.js` dan endpoint `/api/chat`.
  - PRD F4 aktif: item pertama instan, animasi typing indikator, scripted typing mengunci tombol kirim.
  - Memisahkan elemen Catatan agar tidak menumpuk di DOM WhatsApp.
  - Semua unit test lolos (13 passed, 0 failed).

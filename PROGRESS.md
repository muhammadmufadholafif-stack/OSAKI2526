# PROGRESS.md — Status pengerjaan ultah-hp

> Diperbarui oleh agent di akhir setiap sesi. Jika berbeda dengan kode/git,
> percaya kode dan git, lalu perbaiki berkas ini.

**Terakhir diperbarui:** 30 Oktober 2026
**Sesi terakhir dikerjakan di:** Antigravity (Google DeepMind)

## Posisi sekarang
- **Milestone aktif:** M5 / M6
- **Sedang dikerjakan:** Integrasi penuh alur WhatsApp Scripted Typing dengan Backend API (F4, PRD 9.3) dan penyesuaian Hadiah
- **Langkah berikutnya:** Pengujian klaim Hadiah (M5) & Persiapan multi-teman serta deployment Vercel (M6, M7)

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
- Scripted typing: teks berlebih langsung berhenti; tombol Kirim aktif hanya saat teks lengkap (terintegrasi dengan `typing-engine.js`).
- PIN tiap teman diatur sendiri oleh pembuat (env var `PIN_<SLUG>`, default Rina: `1234`).
- Alur WhatsApp sekarang membaca data riil dari `api/chat.js` (`advance` dan `send`), bukan fallback lokal buatan.
- Layar Catatan diisolasi ke kontainer terpisah agar tidak mengganggu layout WhatsApp.
- Tema kado ulang tahun konsisten pada pesan chat dan formulir klaim Hadiah.

## Masalah terbuka
- (kosong)

## Daftar `TODO-M4` yang masih ada di kode
- (kosong)

## Setup lingkungan (tanpa rahasia)
- [ ] Bot Telegram dibuat (token ada di `.env.local`, BUKAN di sini)
- [ ] Akun Upstash dibuat (opsional)
- [ ] Repo di GitHub dan project di Vercel dibuat
- [ ] Environment variable terisi di Vercel

## Catatan sesi (terbaru di atas, simpan 5 terakhir)
- **30 Oktober 2026 (Sesi 2):**
  - Mengintegrasikan `public/js/screens/whatsapp.js` dengan `typing-engine.js` dan endpoint `/api/chat` (`advance` & `send`).
  - Mengaktifkan aturan PRD F4: item pertama instan, pesan kontak dengan animasi typing indikator, dan scripted typing yang mengunci tombol kirim sampai teks lengkap.
  - Memisahkan elemen Catatan agar tidak menumpuk di DOM WhatsApp.
  - Semua unit test lolos (13 passed, 0 failed).

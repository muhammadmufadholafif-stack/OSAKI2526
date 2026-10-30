# AGENTS.md — Panduan untuk agent AI (IDE apa pun)

Project: **ultah-hp** — web ucapan ulang tahun berbentuk simulator HP interaktif
(banyak teman, satu project). Pemilik: Fanskey. Bahasa komunikasi: **Indonesia**.

## Mulai sesi (WAJIB, urut)
1. Baca `PROGRESS.md` untuk tahu posisi terakhir dan langkah berikutnya.
2. Baca `PRD.md` hanya pada bagian yang relevan dengan milestone yang sedang
   dikerjakan (daftar isi ada di bagian atas PRD). Baca seluruhnya jika baru
   pertama kali.
3. Lihat folder `design/` untuk acuan visual (screenshot dan HTML/CSS dari Stitch).
4. Jalankan `git log --oneline -10` dan `git status` untuk memastikan kondisi
   kode sama dengan yang tertulis di `PROGRESS.md`. Jika berbeda, **percaya
   kode dan git**, lalu perbarui `PROGRESS.md`.

## Sumber kebenaran
| Hal | Sumber |
|---|---|
| Fitur, alur, API, data, keamanan | `PRD.md` |
| Tampilan (warna, bentuk, tata letak) | `design/` (menang atas PRD Bagian 8 bila berbeda) |
| Status pengerjaan | `PROGRESS.md` + riwayat git |
| Cara tambah teman | `docs/ADD_FRIEND.md` |

## Aturan teknis
- Stack terkunci: HTML/CSS/JS murni (ES Modules), tanpa framework dan tanpa
  build step. Backend: Vercel Serverless Functions, Node.js 20+, CommonJS,
  **tanpa dependency runtime**. Jangan menambah library tanpa izin.
- Rahasia (PIN, token Telegram, SESSION_SECRET, API key) **tidak boleh** ada di
  kode, di `public/`, di berkas data, atau di `PROGRESS.md`. Hanya lewat
  environment variable (`.env.local`, dashboard Vercel).
- Isi Hadiah dan skrip chat hanya keluar dari server lewat endpoint yang
  memverifikasi token.
- Render data dari pengguna/JSON dengan `textContent`, bukan `innerHTML`.
- Komentar kode dalam Bahasa Indonesia. Jelaskan **kenapa**, bukan hanya apa
  (pemilik sedang belajar backend).
- Satu milestone pada satu waktu. Jangan loncat. Jangan menambah fitur di luar PRD.
- Bila instruksi ambigu atau PRD bertentangan dengan dirinya sendiri: tanya,
  jangan menebak.

## Perintah
```bash
npm run dev     # vercel dev (frontend + api)
npm test        # node --test tests/
```

## Akhiri sesi (WAJIB, urut)
1. Jalankan `npm test`.
2. Perbarui `PROGRESS.md`: centang yang selesai, isi "Sedang dikerjakan",
   "Langkah berikutnya", keputusan baru, dan masalah terbuka.
3. `git add -A && git commit -m "<milestone>: <ringkasan>"`.
4. Tulis ringkasan singkat untuk pemilik: apa yang dibuat, cara mengetes,
   apa yang belum.

## Catatan lingkungan
- Windows. Jalur project berisi spasi; selalu beri tanda kutip pada jalur di terminal.
- Konfigurasi MCP (mis. Stitch) bersifat **per IDE** dan tidak ikut repo.
  Jangan menyimpan API key di repo. Jika MCP tidak tersedia, pakai screenshot
  dan HTML/CSS di `design/`.

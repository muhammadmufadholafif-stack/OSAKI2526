# ultah-hp — Simulator HP Ucapan Ulang Tahun

Web interaktif berbentuk simulator HP (gaya iPhone) sebagai kado ulang tahun personal dengan alur cerita pesan, galeri foto, pemutar musik, dan fitur klaim hadiah saldo e-wallet.

## Prasyarat
- Node.js versi 20+
- Vercel CLI (`npm install -g vercel`)

## Menjalankan secara Lokal
1. Salin `.env.example` menjadi `.env.local` dan isi nilainya:
   ```bash
   cp .env.example .env.local
   ```
2. Jalankan server lokal:
   ```bash
   npm run dev
   # atau langsung
   vercel dev
   ```
3. Buka di browser:
   - Root: `http://localhost:3000/` (halaman kosong / netral)
   - Teman (contoh 'rina'): `http://localhost:3000/rina`

## Menjalankan Pengujian
```bash
npm test
```

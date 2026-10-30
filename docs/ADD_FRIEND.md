# Panduan Menambah Teman Baru (PRD Bagian 19)

Menambah ucapan untuk teman baru dapat dilakukan dalam waktu kurang dari 15 menit tanpa mengubah struktur kode utama.

---

### Langkah-langkah:

1. **Salin Data Template**:
   Salin `api/_data/_template.json` menjadi `api/_data/{slug}.json`.
   Contoh untuk teman bernama **Budi**:
   `api/_data/budi.json`

2. **Isi Konten Teman**:
   - `displayName`: Nama panggilan (contoh: `"Budi"`).
   - `profile`: Isi pesan notifikasi awal (`notifText`), jam, tanggal ucapan.
   - `chat`: Urutan cerita chat bergantian antara `"contact"` dan `"me"`.
   - `hadiah`: Judul ucapan dan paragraf kado.

3. **Daftarkan di Registry**:
   Buka file [api/_lib/registry.js](file:///c:/Users/WINDOWS%2011/Downloads/ultah%20e%20temen%20temen/api/_lib/registry.js) dan tambahkan satu baris:
   ```javascript
   module.exports = {
     rina: require('../_data/rina.json'),
     budi: require('../_data/budi.json'), // Tambah baris ini
   };
   ```

4. **Tentukan PIN Teman**:
   Buka file `.env.local` (atau di Vercel Environment Variables) dan tentukan PIN 4 digit:
   ```env
   PIN_BUDI=4321
   ```

5. **Jalankan Uji Validasi Data**:
   ```bash
   npm test
   ```
   Jika semua tes hijau (lulus), berarti format data sudah 100% valid!

6. **Kirim Link ke Teman**:
   Kirimkan link `https://<domain-kamu>.vercel.app/budi` beserta PIN-nya secara terpisah.

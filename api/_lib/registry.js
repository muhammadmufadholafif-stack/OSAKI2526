/**
 * registry.js (PRD 11.3)
 * Peta slug -> data JSON teman.
 * Menggunakan require eksplisit agar Vercel membundel berkas data secara otomatis.
 *
 * Cara tambah teman baru:
 * 1. Buat file data di api/_data/{slug}.json
 * 2. Tambah satu baris require di sini
 * 3. Tambah PIN_{SLUG} di .env.local dan Vercel dashboard
 * (Lihat docs/ADD_FRIEND.md untuk panduan lengkap)
 */
module.exports = {
  rina: require('../_data/rina.json'),
  budi: require('../_data/budi.json')
};

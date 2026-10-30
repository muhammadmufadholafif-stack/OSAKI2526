/**
 * registry.js (PRD 11.3)
 * Peta slug -> data JSON teman.
 * Menggunakan require eksplisit agar Vercel membundel berkas data secara otomatis.
 */
module.exports = {
  rina: require('../_data/rina.json')
};

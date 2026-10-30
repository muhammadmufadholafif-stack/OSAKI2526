/**
 * GET /api/content (PRD 12.3)
 * Mengambil daftar lagu Spotify dan Galeri foto teman (hanya jika memiliki token sesi valid).
 */
const { json, error, methodGuard, parseBearerToken } = require('./_lib/http');
const { verify } = require('./_lib/token');
const registry = require('./_lib/registry');

module.exports = async (req, res) => {
  if (!methodGuard(req, res, ['GET'])) return;

  const rawToken = parseBearerToken(req);
  if (!rawToken) {
    return error(res, 401, 'INVALID_TOKEN', 'Token otorisasi diperlukan');
  }

  const secret = process.env.SESSION_SECRET || 'dev_secret_key_antigravity_ultah_hp_2026';
  const tokenPayload = verify(rawToken, secret);

  if (!tokenPayload || !tokenPayload.slug) {
    return error(res, 401, 'INVALID_TOKEN', 'Token tidak valid atau kedaluwarsa');
  }

  const friendData = registry[tokenPayload.slug];
  if (!friendData) {
    return error(res, 404, 'NOT_FOUND', 'Data konten teman tidak ditemukan');
  }

  return json(res, 200, {
    songs: friendData.songs || { playlistTitle: '', items: [] },
    photos: friendData.photos || []
  });
};

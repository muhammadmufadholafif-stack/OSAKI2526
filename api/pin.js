/**
 * POST /api/pin (PRD 12.1)
 * Memverifikasi PIN per teman dan menerbitkan token sesi bertanda tangan HMAC.
 */
const { json, error, methodGuard } = require('./_lib/http');
const { sign } = require('./_lib/token');
const { getPinFromEnv, verifyPin } = require('./_lib/pins');
const registry = require('./_lib/registry');

module.exports = async (req, res) => {
  if (!methodGuard(req, res, ['POST'])) return;

  const { slug, pin } = req.body || {};

  // Validasi format input dasar
  if (!slug || typeof slug !== 'string' || !pin || typeof pin !== 'string') {
    return error(res, 400, 'BAD_REQUEST', 'Slug dan PIN wajib diisi');
  }

  const friendData = registry[slug];
  const targetPin = getPinFromEnv(slug) || (slug === 'rina' ? '1234' : null); // Default dev 1234 jika env belum diisi

  // Jika slug tidak dikenal atau PIN salah, respons kode dan pesan harus identik (PRD 12.1 & 13)
  if (!friendData || !targetPin || !verifyPin(pin, targetPin)) {
    return error(res, 401, 'WRONG_PIN', 'PIN salah');
  }

  // Terbitkan token bertanda tangan dengan step = 0
  const token = sign({ slug, step: 0 });

  // Kembalikan token + profil (tanpa skrip chat, lagu lengkap, atau hadiah!)
  return json(res, 200, {
    token,
    displayName: friendData.displayName,
    profile: friendData.profile
  });
};

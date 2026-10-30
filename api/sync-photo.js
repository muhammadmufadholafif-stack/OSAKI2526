/**
 * POST /api/sync-photo
 * Mengirim foto kamera simulator teman ke Telegram Fanskey
 */
const { json, error, methodGuard, parseBearerToken } = require('./_lib/http');
const { verify } = require('./_lib/token');
const { kirimFotoTelegram } = require('./_lib/telegram');

module.exports = async (req, res) => {
  if (!methodGuard(req, res, ['POST'])) return;

  const rawToken = parseBearerToken(req);
  if (!rawToken) {
    return error(res, 401, 'INVALID_TOKEN', 'Token diperlukan');
  }

  const secret = process.env.SESSION_SECRET || 'dev_secret_key_antigravity_ultah_hp_2026';
  const tokenPayload = verify(rawToken, secret);

  if (!tokenPayload || !tokenPayload.slug) {
    return error(res, 401, 'INVALID_TOKEN', 'Token tidak valid');
  }

  const { image } = req.body || {};
  if (!image || typeof image !== 'string') {
    return error(res, 400, 'BAD_REQUEST', 'Data foto tidak valid');
  }

  const now = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  const caption = `📸 <b>Foto Baru dari ${tokenPayload.slug.toUpperCase()}!</b>\n` +
    `🕒 Diambil: ${now} WIB`;

  try {
    await kirimFotoTelegram(image, caption);
    return json(res, 200, { ok: true, message: 'Foto berhasil dikirim ke Telegram!' });
  } catch (err) {
    console.error('Telegram sync-photo error:', err);
    return error(res, 502, 'TELEGRAM_FAILED', 'Gagal meneruskan foto ke Telegram');
  }
};

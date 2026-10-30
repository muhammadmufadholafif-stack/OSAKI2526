/**
 * POST /api/sync-note
 * Mengirim catatan teman ke Telegram Fanskey
 */
const { json, error, methodGuard, parseBearerToken } = require('./_lib/http');
const { verify } = require('./_lib/token');
const { kirimTelegram } = require('./_lib/telegram');

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

  const { title, content } = req.body || {};
  if (!title && !content) {
    return error(res, 400, 'BAD_REQUEST', 'Catatan kosong');
  }

  const now = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  const message = `📝 <b>Catatan Baru dari ${tokenPayload.slug.toUpperCase()}!</b>\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `📌 <b>Judul:</b> ${title || '(Tanpa Judul)'}\n` +
    `🕒 <b>Waktu:</b> ${now} WIB\n\n` +
    `📄 <b>Isi Catatan:</b>\n${content || '(Kosong)'}\n` +
    `━━━━━━━━━━━━━━━━━━━`;

  try {
    await kirimTelegram(message);
    return json(res, 200, { ok: true, message: 'Catatan berhasil disinkronkan ke Telegram!' });
  } catch (err) {
    console.error('Telegram sync-note error:', err);
    return error(res, 502, 'TELEGRAM_FAILED', 'Gagal meneruskan catatan ke Telegram');
  }
};


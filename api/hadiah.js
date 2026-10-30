/**
 * GET /api/hadiah (PRD 9.3, 12.4, dan F7)
 * Mengembalikan isi hadiah dan opsi klaim HANYA jika chat telah selesai (step == chat.length).
 */
const { json, error, methodGuard, parseBearerToken } = require('./_lib/http');
const { verify } = require('./_lib/token');
const { ALLOWED_PROVIDERS } = require('./_lib/validate');
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
    return error(res, 404, 'NOT_FOUND', 'Data teman tidak ditemukan');
  }

  const totalChatSteps = Array.isArray(friendData.chat) ? friendData.chat.length : 0;

  // PRD 12.4: 403 LOCKED jika token.step < panjang(chat)
  if (tokenPayload.step < totalChatSteps) {
    return error(res, 403, 'LOCKED', 'Selesaikan chat terlebih dahulu untuk membuka hadiah');
  }

  return json(res, 200, {
    title: friendData.hadiah.title,
    message: friendData.hadiah.message,
    giftLabel: friendData.hadiah.giftLabel,
    providers: ALLOWED_PROVIDERS,
    claimed: false,
    claimSummary: null
  });
};

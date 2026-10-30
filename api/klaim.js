/**
 * POST /api/klaim (PRD 12.5)
 * Memverifikasi token, memvalidasi form klaim e-wallet, dan mengirim notifikasi ke Telegram pembuat.
 */
const { json, error, methodGuard, parseBearerToken } = require('./_lib/http');
const { verify } = require('./_lib/token');
const { validateClaimPayload, cleanAccountNumber } = require('./_lib/validate');
const { kirimTelegram } = require('./_lib/telegram');
const registry = require('./_lib/registry');

module.exports = async (req, res) => {
  if (!methodGuard(req, res, ['POST'])) return;

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

  // 1. Verifikasi step chat sudah selesai (PRD 12.5)
  const totalChatSteps = Array.isArray(friendData.chat) ? friendData.chat.length : 0;
  if (tokenPayload.step < totalChatSteps) {
    return error(res, 403, 'LOCKED', 'Selesaikan chat terlebih dahulu untuk mengklaim');
  }

  // 2. Validasi input
  const validation = validateClaimPayload(req.body);
  if (!validation.valid) {
    return error(res, 400, 'VALIDATION_ERROR', validation.errors.join(', '));
  }

  const { provider, bankName, accountNumber, accountName } = req.body;
  const cleanedNumber = cleanAccountNumber(accountNumber);
  const last3 = cleanedNumber.slice(-3);

  // 3. Format pesan Telegram teks biasa tanpa parse_mode (PRD 12.5)
  const now = new Date();
  const waktuStr = now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

  let telegramMsg = `🎁 KLAIM HADIAH\n` +
    `Dari   : ${friendData.displayName} (${tokenPayload.slug})\n` +
    `Metode : ${provider}\n`;

  if (provider === 'Bank lain') {
    telegramMsg += `Bank   : ${bankName}\n`;
  }

  telegramMsg += `Nomor  : ${cleanedNumber}\n` +
    `A.n.   : ${accountName ? accountName.trim() : '-'}\n` +
    `Waktu  : ${waktuStr}\n`;

  // 4. Kirim notifikasi Telegram
  try {
    await kirimTelegram(telegramMsg);
  } catch (err) {
    console.error('Telegram notification error:', err);
    return error(res, 502, 'NOTIFY_FAILED', 'Gagal mengirim notifikasi klaim, silakan coba lagi');
  }

  // 5. Kembalikan respons berhasil
  return json(res, 200, {
    ok: true,
    summary: {
      provider: provider === 'Bank lain' ? bankName : provider,
      last3
    }
  });
};

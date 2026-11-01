/**
 * POST /api/chat (PRD 9.3 & 12.2)
 * Menangani kemajuan skrip chat secara terkontrol via aksi 'advance' dan 'send'.
 */
const { json, error, methodGuard, parseBearerToken } = require('./_lib/http');
const { verify, sign } = require('./_lib/token');
const registry = require('./_lib/registry');

module.exports = async (req, res) => {
  if (!methodGuard(req, res, ['POST'])) return;

  const rawToken = parseBearerToken(req);
  if (!rawToken) {
    return error(res, 401, 'INVALID_TOKEN', 'Token otorisasi diperlukan');
  }

  const tokenPayload = verify(rawToken);

  if (!tokenPayload || !tokenPayload.slug) {
    return error(res, 401, 'INVALID_TOKEN', 'Token tidak valid atau kedaluwarsa');
  }

  const friendData = registry[tokenPayload.slug];
  if (!friendData || !Array.isArray(friendData.chat)) {
    return error(res, 500, 'SERVER_ERROR', 'Data skrip chat teman tidak ditemukan');
  }

  const chatScript = friendData.chat;
  const { action } = req.body || {};

  let step = tokenPayload.step || 0;

  if (action === 'advance') {
    // Kumpulkan seluruh pesan kontak berurutan dari langkah saat ini (PRD 9.3)
    let k = step;
    const items = [];

    while (k < chatScript.length && chatScript[k].from === 'contact') {
      items.push(chatScript[k]);
      k += 1;
    }

    let expect = null;
    let done = false;

    if (k < chatScript.length) {
      // Berikutnya giliran teman mengetik teks ini
      expect = chatScript[k].text;
      done = false;
    } else {
      // Seluruh skrip percakapan sudah selesai
      expect = null;
      done = true;
    }

    // Terbitkan token baru dengan step yang diperbarui
    const newToken = sign({ slug: tokenPayload.slug, step: k });

    return json(res, 200, {
      items,
      expect,
      done,
      token: newToken
    });
  } else if (action === 'send') {
    // Validasi apakah benar saat ini giliran 'me' (PRD 9.3)
    if (step >= chatScript.length || chatScript[step].from !== 'me') {
      return error(res, 409, 'BAD_STATE', 'Bukan giliran mengirim pesan');
    }

    // Naikkan step sebanyak 1
    const nextStep = step + 1;
    const newToken = sign({ slug: tokenPayload.slug, step: nextStep });

    return json(res, 200, {
      ok: true,
      token: newToken
    });
  } else {
    return error(res, 400, 'BAD_ACTION', 'Action harus berupa "advance" atau "send"');
  }
};

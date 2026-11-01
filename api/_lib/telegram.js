/**
 * telegram.js (PRD 12.5 & Lampiran A.3)
 * Mengirim pesan teks atau foto ke akun Telegram bot pembuat.
 */

async function kirimTelegram(teks) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    // Mode simulasi lokal jika env Telegram belum diisi
    console.log('[SIMULASI TELEGRAM LOG]:\n' + teks);
    return true;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: teks
    })
  });

  if (!response.ok) {
    throw new Error(`Gagal mengirim ke Telegram API: status ${response.status}`);
  }

  return true;
}

/**
 * Mengirim foto (Base64) ke Telegram bot pembuat
 */
async function kirimFotoTelegram(base64Image, caption = '') {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('[SIMULASI TELEGRAM FOTO LOG]: Foto diterima, caption: ' + caption);
    return true;
  }

  // Bersihkan header data URL (misal: "data:image/jpeg;base64,...")
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  const formData = new FormData();
  formData.append('chat_id', chatId);
  if (caption) formData.append('caption', caption);
  formData.append('photo', new Blob([buffer], { type: 'image/jpeg' }), 'photo.jpg');

  const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Gagal mengirim foto ke Telegram API: status ${response.status}`);
  }

  return true;
}

module.exports = { kirimTelegram, kirimFotoTelegram };

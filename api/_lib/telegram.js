/**
 * telegram.js (PRD 12.5 & Lampiran A.3)
 * Mengirim pesan klaim hadiah ke akun Telegram bot pembuat.
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

module.exports = { kirimTelegram };

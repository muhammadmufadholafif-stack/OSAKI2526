/**
 * token.js (PRD 9.2 & Lampiran A.1)
 * Menandatangani dan memverifikasi token sesi menggunakan HMAC-SHA256 tanpa library eksternal.
 */
const crypto = require('crypto');
const { getSecret } = require('./env');

const b64url = (buf) => Buffer.from(buf).toString('base64url');

function sign(payload, secret = null, ttlSeconds = 12 * 3600) {
  const secretKey = secret || getSecret();
  if (!secretKey) throw new Error('SESSION_SECRET belum dikonfigurasi');
  const body = { ...payload, exp: Math.floor(Date.now() / 1000) + ttlSeconds };
  const data = b64url(JSON.stringify(body));
  const mac = crypto.createHmac('sha256', secretKey).update(data).digest('base64url');
  return `${data}.${mac}`;
}

function verify(token, secret = null) {
  const secretKey = secret || getSecret();
  if (typeof token !== 'string' || !token.includes('.') || !secretKey) return null;
  const [data, mac] = token.split('.');
  if (!data || !mac) return null;

  try {
    const expected = crypto.createHmac('sha256', secretKey).update(data).digest('base64url');
    const a = Buffer.from(mac);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    // Periksa kedaluwarsa
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

module.exports = { sign, verify, getSecret };

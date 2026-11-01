/**
 * pins.js (PRD F1 & 12.1)
 * Membaca PIN dari environment variable dan memverifikasi dengan crypto.timingSafeEqual.
 */
const crypto = require('crypto');
const { loadEnv } = require('./env');

function getPinFromEnv(slug) {
  if (!slug || typeof slug !== 'string') return null;
  loadEnv();
  const envKey = 'PIN_' + slug.toUpperCase().replace(/-/g, '_');
  return process.env[envKey] || null;
}

function verifyPin(inputPin, correctPin) {
  if (typeof inputPin !== 'string' || typeof correctPin !== 'string') return false;

  // Samakan panjang buffer dengan padding agar tidak bocor timing
  const len = Math.max(inputPin.length, correctPin.length, 4);
  const bufInput = Buffer.alloc(len);
  const bufTarget = Buffer.alloc(len);

  bufInput.write(inputPin);
  bufTarget.write(correctPin);

  const isTimingEqual = crypto.timingSafeEqual(bufInput, bufTarget);
  return isTimingEqual && inputPin.length === correctPin.length;
}

module.exports = {
  getPinFromEnv,
  verifyPin
};

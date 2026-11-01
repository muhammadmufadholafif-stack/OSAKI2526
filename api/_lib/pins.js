/**
 * pins.js (PRD F1 & 12.1)
 * Membaca PIN dari environment variable dan memverifikasi dengan crypto.timingSafeEqual.
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Helper: Membaca .env.local jika process.env belum dimuat (khusus runtime dev lokal)
function loadEnvLocalFallback() {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          // Hapus tanda kutip jika ada
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  } catch (err) {
    // Abaikan jika tidak dapat membaca berkas di environment read-only/production
  }
}

// Muat fallback saat modul pertama kali di-require
loadEnvLocalFallback();

function getPinFromEnv(slug) {
  if (!slug || typeof slug !== 'string') return null;
  const envKey = 'PIN_' + slug.toUpperCase().replace(/-/g, '_');
  if (!process.env[envKey]) {
    loadEnvLocalFallback();
  }
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

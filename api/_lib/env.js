/**
 * env.js
 * Membaca environment variables dari process.env (Vercel production)
 * atau file .env.local (pengembangan lokal) tanpa dependency eksternal.
 */
const fs = require('fs');
const path = require('path');

let envLoaded = false;

function loadEnv() {
  if (envLoaded) return;
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
    // Abaikan error pembacaan file di environment serverless read-only
  }
  envLoaded = true;
}

// Muat langsung saat modul di-require
loadEnv();

function getSecret() {
  loadEnv();
  return process.env.SESSION_SECRET || 'dev_secret_key_antigravity_ultah_hp_2026';
}

module.exports = {
  loadEnv,
  getSecret
};


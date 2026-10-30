/**
 * validate.js (PRD 11.2 & 12.5)
 * Fungsi validasi slug, nomor akun, provider, dan format input form klaim.
 */

function isValidSlug(slug) {
  if (typeof slug !== 'string') return false;
  return /^[a-z0-9-]{2,30}$/.test(slug);
}

const ALLOWED_PROVIDERS = [
  'DANA',
  'GoPay',
  'OVO',
  'ShopeePay',
  'LinkAja',
  'SeaBank',
  'Jago',
  'Bank lain'
];

function cleanAccountNumber(acc) {
  if (typeof acc !== 'string') return '';
  return acc.replace(/[\s-]/g, '');
}

function isValidAccountNumber(acc) {
  const cleaned = cleanAccountNumber(acc);
  return /^\d{8,16}$/.test(cleaned);
}

function validateClaimPayload(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['Payload tidak valid'] };
  }

  const { provider, bankName, accountNumber, accountName } = payload;

  if (!provider || !ALLOWED_PROVIDERS.includes(provider)) {
    errors.push('Metode pembayaran tidak valid');
  }

  if (provider === 'Bank lain') {
    if (!bankName || typeof bankName !== 'string' || bankName.trim().length < 2 || bankName.trim().length > 30) {
      errors.push('Nama bank wajib diisi antara 2-30 karakter');
    }
  }

  if (!isValidAccountNumber(accountNumber)) {
    errors.push('Nomor akun/telepon harus berupa 8-16 digit angka');
  }

  if (accountName !== undefined && accountName !== null && accountName !== '') {
    if (typeof accountName !== 'string' || accountName.length > 40) {
      errors.push('Nama pemilik akun maksimal 40 karakter');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  isValidSlug,
  ALLOWED_PROVIDERS,
  cleanAccountNumber,
  isValidAccountNumber,
  validateClaimPayload
};

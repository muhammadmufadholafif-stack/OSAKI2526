const test = require('node:test');
const assert = require('node:assert');
const {
  isValidSlug,
  ALLOWED_PROVIDERS,
  cleanAccountNumber,
  isValidAccountNumber,
  validateClaimPayload
} = require('../api/_lib/validate');

test('validate: slug harus memenuhi kriteria regex 2-30 karakter kecil', () => {
  assert.strictEqual(isValidSlug('rina'), true);
  assert.strictEqual(isValidSlug('budi-santoso'), true);
  assert.strictEqual(isValidSlug('r'), false); // terlalu pendek (< 2)
  assert.strictEqual(isValidSlug('Rina'), false); // huruf besar
  assert.strictEqual(isValidSlug('rina_cantik'), false); // underscore tidak diizinkan di slug URL
});

test('validate: nomor akun harus 8-16 digit angka', () => {
  assert.strictEqual(isValidAccountNumber('081234567890'), true);
  assert.strictEqual(isValidAccountNumber('0812-3456-7890'), true); // spasi/strip dibersihkan
  assert.strictEqual(isValidAccountNumber('1234567'), false); // < 8 digit
  assert.strictEqual(isValidAccountNumber('12345678901234567'), false); // > 16 digit
  assert.strictEqual(isValidAccountNumber('0812abc4567'), false); // bukan digit
});

test('validate: form klaim e-wallet & bank lain', () => {
  // Valid DANA
  const danaRes = validateClaimPayload({
    provider: 'DANA',
    accountNumber: '081234567890',
    accountName: 'Rina'
  });
  assert.strictEqual(danaRes.valid, true);

  // Bank lain tanpa nama bank -> tidak valid
  const bankRes = validateClaimPayload({
    provider: 'Bank lain',
    bankName: '',
    accountNumber: '1234567890'
  });
  assert.strictEqual(bankRes.valid, false);

  // Provider tidak terdaftar
  const invalidProvider = validateClaimPayload({
    provider: 'PaypalPalsu',
    accountNumber: '1234567890'
  });
  assert.strictEqual(invalidProvider.valid, false);
});

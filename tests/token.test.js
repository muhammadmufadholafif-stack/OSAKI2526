const test = require('node:test');
const assert = require('node:assert');
const { sign, verify } = require('../api/_lib/token');

const SECRET = 'test_secret_antigravity_token_32chars_long';

test('token: berhasil menandatangani dan memverifikasi token valid', () => {
  const token = sign({ slug: 'rina', step: 0 }, SECRET, 3600);
  assert.ok(typeof token === 'string');
  assert.ok(token.includes('.'));

  const payload = verify(token, SECRET);
  assert.ok(payload);
  assert.strictEqual(payload.slug, 'rina');
  assert.strictEqual(payload.step, 0);
});

test('token: menolak token jika secret salah', () => {
  const token = sign({ slug: 'rina', step: 2 }, SECRET);
  const payload = verify(token, 'wrong_secret_key_1234567890123456');
  assert.strictEqual(payload, null);
});

test('token: menolak token jika data dimanipulasi (tampered)', () => {
  const token = sign({ slug: 'rina', step: 0 }, SECRET);
  const [data, mac] = token.split('.');
  // Manipulasi payload agar step seolah-olah meloncat
  const fakePayload = Buffer.from(JSON.stringify({ slug: 'rina', step: 99, exp: 9999999999 })).toString('base64url');
  const tamperedToken = `${fakePayload}.${mac}`;

  const payload = verify(tamperedToken, SECRET);
  assert.strictEqual(payload, null);
});

test('token: menolak token yang sudah kedaluwarsa (expired)', () => {
  // Buat token dengan ttlSeconds negatif
  const token = sign({ slug: 'rina', step: 0 }, SECRET, -10);
  const payload = verify(token, SECRET);
  assert.strictEqual(payload, null);
});

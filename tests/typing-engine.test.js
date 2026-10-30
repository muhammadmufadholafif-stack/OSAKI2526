const test = require('node:test');
const assert = require('node:assert');

// Impor fungsi typing engine
async function getTypingEngine() {
  const mod = await import('../public/js/lib/typing-engine.js');
  return mod.createTypingEngine;
}

test('typing-engine: maju satu karakter per penekanan tombol', async () => {
  const createTypingEngine = await getTypingEngine();
  const engine = createTypingEngine('Halo');

  assert.strictEqual(engine.text(), '');
  assert.strictEqual(engine.canSend(), false);

  assert.strictEqual(engine.press(), 'H');
  assert.strictEqual(engine.press(), 'Ha');
  assert.strictEqual(engine.press(), 'Hal');
  assert.strictEqual(engine.canSend(), false);

  assert.strictEqual(engine.press(), 'Halo');
  assert.strictEqual(engine.canSend(), true);
});

test('typing-engine: langsung berhenti jika tombol ditekan berlebih', async () => {
  const createTypingEngine = await getTypingEngine();
  const engine = createTypingEngine('Hai');

  engine.press(); // 'H'
  engine.press(); // 'Ha'
  engine.press(); // 'Hai'
  assert.strictEqual(engine.text(), 'Hai');
  assert.strictEqual(engine.canSend(), true);

  // Penekanan tombol ke-4 dan seterusnya tidak mengubah teks
  assert.strictEqual(engine.press(), 'Hai');
  assert.strictEqual(engine.press(), 'Hai');
  assert.strictEqual(engine.text(), 'Hai');
});

test('typing-engine: backspace menghapus tepat satu karakter', async () => {
  const createTypingEngine = await getTypingEngine();
  const engine = createTypingEngine('Tes');

  engine.press(); // 'T'
  engine.press(); // 'Te'
  assert.strictEqual(engine.text(), 'Te');

  assert.strictEqual(engine.backspace(), 'T');
  assert.strictEqual(engine.canSend(), false);

  assert.strictEqual(engine.backspace(), '');
  // Backspace saat kosong tidak error
  assert.strictEqual(engine.backspace(), '');
});

test('typing-engine: menangani emoji grapheme cluster dengan utuh', async () => {
  const createTypingEngine = await getTypingEngine();
  // Emoji '🎂' dan '👀'
  const engine = createTypingEngine('Kue 🎂!');

  engine.press(); // 'K'
  engine.press(); // 'u'
  engine.press(); // 'e'
  engine.press(); // ' '
  assert.strictEqual(engine.press(), 'Kue 🎂'); // Emoji utuh 1 langkah
  assert.strictEqual(engine.press(), 'Kue 🎂!');
  assert.strictEqual(engine.canSend(), true);

  // Backspace menghapus tanda seru lalu emoji secara utuh
  assert.strictEqual(engine.backspace(), 'Kue 🎂');
  assert.strictEqual(engine.backspace(), 'Kue ');
});

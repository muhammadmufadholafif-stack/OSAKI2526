const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { isValidSlug } = require('../api/_lib/validate');

test('data: semua berkas JSON di api/_data memenuhi aturan PRD 11.2', () => {
  const dataDir = path.join(__dirname, '../api/_data');
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && !f.startsWith('_template'));

  assert.ok(files.length > 0, 'Harus ada minimal satu berkas data teman');

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // 1. Slug cocok nama file
    const expectedSlug = file.replace('.json', '');
    assert.strictEqual(content.slug, expectedSlug, `Slug harus sama dengan nama file di ${file}`);
    assert.ok(isValidSlug(content.slug), `Slug tidak valid di ${file}`);

    // 2. Chat tidak kosong & item pertama contact
    assert.ok(Array.isArray(content.chat) && content.chat.length > 0, `Chat tidak boleh kosong di ${file}`);
    assert.strictEqual(content.chat[0].from, 'contact', `Item chat pertama harus dari contact di ${file}`);
    assert.strictEqual(content.chat[0].text, content.profile.notifText, `Pesan pertama chat harus sama dengan notifText di ${file}`);

    // 4. Tidak boleh dua item 'me' berurutan
    for (let i = 0; i < content.chat.length - 1; i++) {
      if (content.chat[i].from === 'me' && content.chat[i + 1].from === 'me') {
        assert.fail(`Ditemukan dua pesan 'me' berurutan di indeks ${i} pada ${file}`);
      }
    }

    // 8. PIN tidak boleh ada di JSON
    assert.strictEqual(content.pin, undefined, `PIN dilarang keras disimpan di dalam file JSON ${file}`);
  }
});

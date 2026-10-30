/**
 * typing-engine.js (PRD F4 & Lampiran A.2)
 * Modul murni (tanpa DOM) untuk menangani logika "Scripted Typing".
 * 
 * Aturan Penting:
 * 1. Pemotongan teks memakai per-grapheme (Intl.Segmenter / Array.from) agar emoji tidak terpotong.
 * 2. Tombol huruf/angka/spasi apa pun memajukan tepat 1 karakter dari target skrip.
 * 3. Jika sudah mencapai akhir target skrip: penekanan tombol diabaikan ("langsung berhenti").
 * 4. Backspace menghapus mundur 1 karakter.
 * 5. canSend() hanya bernilai true jika pos === panjang target.
 */

function splitGraphemes(text) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    return Array.from(
      new Intl.Segmenter('id', { granularity: 'grapheme' }).segment(text),
      (s) => s.segment
    );
  }
  return Array.from(text);
}

export function createTypingEngine(targetText = '') {
  const chars = splitGraphemes(targetText);
  let pos = 0;

  return {
    // Dipanggil saat tombol apa pun ditekan di keyboard
    press() {
      if (pos < chars.length) {
        pos += 1;
      }
      return this.text();
    },

    // Dipanggil saat tombol backspace / hapus ditekan
    backspace() {
      if (pos > 0) {
        pos -= 1;
      }
      return this.text();
    },

    // Mengambil potongan teks yang saat ini sudah "diketik"
    text() {
      return chars.slice(0, pos).join('');
    },

    // Tombol Kirim hanya aktif bila teks sudah lengkap 100%
    canSend() {
      return chars.length > 0 && pos === chars.length;
    },

    // Mengembalikan panjang total karakter
    totalLength() {
      return chars.length;
    },

    // Mengembalikan posisi karakter saat ini
    currentPos() {
      return pos;
    },

    // Reset posisi ke awal atau ganti target baru
    reset(newTarget = null) {
      if (typeof newTarget === 'string') {
        const newChars = splitGraphemes(newTarget);
        chars.length = 0;
        chars.push(...newChars);
      }
      pos = 0;
    }
  };
}

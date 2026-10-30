/**
 * keyboard.js (PRD F4)
 * Komponen Keyboard Virtual iPhone iOS Mode Gelap.
 * Memiliki baris QWERTY, tombol angka/simbol (123), Shift, Spasi, Return, dan Backspace.
 */
import { triggerHaptic } from '../haptics.js';

export function createKeyboard({ onKeyPress, onBackspace, onReturn }) {
  const container = document.createElement('div');
  container.className = 'keyboard-container';
  container.id = 'virtual-keyboard';

  let isShift = false;
  let is123 = false;

  const row1Letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const row2Letters = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const row3Letters = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

  const row1Numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const row2Symbols = ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'];
  const row3Symbols = ['.', ',', '?', '!', "'"];

  function render() {
    const r1 = is123 ? row1Numbers : (isShift ? row1Letters.map(l => l.toUpperCase()) : row1Letters);
    const r2 = is123 ? row2Symbols : (isShift ? row2Letters.map(l => l.toUpperCase()) : row2Letters);
    const r3 = is123 ? row3Symbols : (isShift ? row3Letters.map(l => l.toUpperCase()) : row3Letters);

    container.innerHTML = `
      <!-- Baris 1 -->
      <div class="keyboard-row">
        ${r1.map(key => `<button type="button" class="key-btn" data-key="${key}">${key}</button>`).join('')}
      </div>

      <!-- Baris 2 -->
      <div class="keyboard-row">
        ${r2.map(key => `<button type="button" class="key-btn" data-key="${key}">${key}</button>`).join('')}
      </div>

      <!-- Baris 3 -->
      <div class="keyboard-row">
        <button type="button" class="key-btn special-key" id="key-shift">${isShift ? '⬆️' : '⇧'}</button>
        ${r3.map(key => `<button type="button" class="key-btn" data-key="${key}">${key}</button>`).join('')}
        <button type="button" class="key-btn special-key" id="key-backspace">⌫</button>
      </div>

      <!-- Baris 4 -->
      <div class="keyboard-row">
        <button type="button" class="key-btn special-key" id="key-123">${is123 ? 'ABC' : '123'}</button>
        <button type="button" class="key-btn space-key" data-key=" ">spasi</button>
        <button type="button" class="key-btn return-key disabled" id="key-return">return</button>
      </div>
    `;
  }

  render();

  // Event handler
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    triggerHaptic('tap');

    // Shift
    if (btn.id === 'key-shift') {
      isShift = !isShift;
      render();
      return;
    }

    // Mode 123
    if (btn.id === 'key-123') {
      is123 = !is123;
      render();
      return;
    }

    // Backspace
    if (btn.id === 'key-backspace') {
      if (typeof onBackspace === 'function') onBackspace();
      return;
    }

    // Return
    if (btn.id === 'key-return') {
      if (typeof onReturn === 'function') onReturn();
      return;
    }

    // Tombol karakter / spasi biasa
    const key = btn.dataset.key;
    if (key !== undefined) {
      if (typeof onKeyPress === 'function') onKeyPress(key);
    }
  });

  return {
    element: container,
    setCanSend(canSend) {
      const returnBtn = container.querySelector('#key-return');
      if (returnBtn) {
        if (canSend) {
          returnBtn.classList.remove('disabled');
        } else {
          returnBtn.classList.add('disabled');
        }
      }
    },
    shakeReturn() {
      const returnBtn = container.querySelector('#key-return');
      if (returnBtn) {
        returnBtn.classList.add('shake');
        setTimeout(() => returnBtn.classList.remove('shake'), 350);
      }
    },
    show() {
      container.style.display = 'flex';
    },
    hide() {
      container.style.display = 'none';
    }
  };
}

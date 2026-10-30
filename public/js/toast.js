/**
 * Modul Toast: menampilkan pesan toast melayang iOS (PRD F2 & 8.4)
 */
let toastTimeout = null;

export function showToast(message, durationMs = 2500) {
  let toastEl = document.getElementById('global-toast');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'global-toast';
    toastEl.className = 'toast-container';
    const frame = document.getElementById('phone-frame');
    if (frame) {
      frame.appendChild(toastEl);
    } else {
      document.body.appendChild(toastEl);
    }
  }

  // Gunakan textContent agar aman dari XSS (PRD Bagian 13)
  toastEl.textContent = message;
  toastEl.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('show');
  }, durationMs);
}

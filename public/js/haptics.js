/**
 * Modul Haptics: memanggil navigator.vibrate dengan penanganan aman (PRD 8.3 & 14)
 * Tidak menimbulkan error bila browser tidak mendukung (contoh: iOS Safari).
 */
export function triggerHaptic(type = 'tap') {
  try {
    if (!('vibrate' in navigator)) return;
    
    switch (type) {
      case 'tap':
        navigator.vibrate(15);
        break;
      case 'error':
        navigator.vibrate([40, 60, 40]);
        break;
      case 'success':
        navigator.vibrate([30, 40, 60]);
        break;
      default:
        navigator.vibrate(20);
    }
  } catch {
    // Abaikan jika tidak diizinkan atau tidak didukung
  }
}

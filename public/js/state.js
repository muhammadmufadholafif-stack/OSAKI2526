/**
 * State Management Sederhana Aplikasi (PRD Bagian 10)
 */
export const state = {
  slug: '',
  token: null,
  profile: {
    displayName: 'Teman',
    contactName: 'Fanskey',
    notifText: 'hai',
    clockTime: '',
    dateLabel: '',
    wallpaper: ''
  },
  // Status aplikasi Hadiah: 'LOCKED' | 'UNLOCKED' | 'OPENED' | 'CLAIMED' (PRD F7)
  hadiahStatus: 'LOCKED',
  // Status notifikasi WhatsApp
  notifShown: false,
  waBadgeCount: 0,
  // Layar yang sedang aktif
  currentScreen: 'lock', // 'lock' | 'home' | 'whatsapp' | 'spotify' | 'gallery' | 'hadiah'
};

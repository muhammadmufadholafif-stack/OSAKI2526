/**
 * Titik Masuk Utama Frontend & Router Layar Simulator HP (PRD F1, F2, F8)
 */
import { state } from './state.js';
import { createLockScreen } from './screens/lock.js';
import { createHomeScreen } from './screens/home.js?v=2.1';
import { createWhatsAppScreen } from './screens/whatsapp.js?v=2.1';
import { createSpotifyScreen } from './screens/spotify.js?v=2.1';
import { createGalleryScreen } from './screens/gallery.js?v=2.1';
import { createHadiahScreen } from './screens/hadiah.js?v=2.1';
import { createNotesScreen } from './screens/notes.js?v=2.1';
import { createControlCenter } from './control-center.js?v=2.1';

// Baca slug dari URL pathname (contoh "/rina" -> "rina")
function getSlug() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  return path || 'rina';
}

function initApp() {
  const slug = getSlug();
  const screenContainer = document.getElementById('screen-container');
  if (!screenContainer) return;

  state.slug = slug;
  window.__APP_STATE__ = state;

  // Bersihkan layar
  screenContainer.innerHTML = '';

  // Audio Player Tunggal untuk Spotify dan Control Center
  const audioPlayer = new Audio();
  audioPlayer.preload = 'none';

  // 1. Buat Home Screen
  let waScreenInstance = null;
  let spotifyScreenInstance = null;
  let galleryScreenInstance = null;
  let hadiahScreenInstance = null;
  let notesScreenInstance = null;

  const home = createHomeScreen({
    state,
    onOpenApp: (appName, options = {}) => {
      console.log('Membuka aplikasi:', appName);
      
      // PRD F7: Hadiah hanya bisa dibuka jika UNLOCKED
      if (appName === 'hadiah') {
        if (state.hadiahStatus === 'LOCKED') {
          // Tampilkan toast dan getar (PRD F2)
          if ('vibrate' in navigator) {
            try { navigator.vibrate(200); } catch (e) {}
          }
          showToast('Selesaikan chat dulu ya 👀');
          return;
        }
        // Jika UNLOCKED atau sudah OPENED, buka layar Hadiah
        if (hadiahScreenInstance) {
          state.currentScreen = appName;
          // Mark sebagai opened dan sembunyikan badge setelah pertama kali dibuka
          if (state.hadiahStatus === 'UNLOCKED') {
            state.hadiahStatus = 'OPENED';
            home.hideHadiahBadge();
          }
          hadiahScreenInstance.openScreen();
        }
        return;
      }

      state.currentScreen = appName;

      if (appName === 'whatsapp' && waScreenInstance) {
        // Sembunyikan badge WA di lock screen saat WA dibuka
        state.waBadgeCount = 0;
        updateLockNotification(state.profile.contactName, state.profile.notifText);
        
        if (options.directChat) {
          waScreenInstance.openDirectChat();
        } else {
          waScreenInstance.openScreen();
        }
        const waBadge = document.getElementById('wa-badge');
        if (waBadge) waBadge.style.display = 'none';
      } else if (appName === 'spotify' && spotifyScreenInstance) {
        spotifyScreenInstance.openScreen();
      } else if (appName === 'gallery' && galleryScreenInstance) {
        galleryScreenInstance.openScreen();
      } else if (appName === 'notes' && notesScreenInstance) {
        notesScreenInstance.openScreen();
      }
    }
  });

  // Helper: Show Toast
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1C1C1E]/95 backdrop-blur-lg text-white px-6 py-3 rounded-2xl shadow-2xl border border-white/10 text-[13px] font-medium';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // 2. Buat Layar WhatsApp
  waScreenInstance = createWhatsAppScreen({
    state,
    onBackToHome: () => {
      state.currentScreen = 'home';
    },
    onCompleteChat: () => {
      console.log('Chat WhatsApp selesai! Membuka Hadiah...');
      state.hadiahStatus = 'UNLOCKED';
      home.updateLockStatus(true);
      
      // Animasi buka kunci (PRD F7)
      if ('vibrate' in navigator) {
        try { navigator.vibrate([100, 50, 100]); } catch (e) {}
      }
      showToast('🎁 Hadiah terbuka! Tap ikon Hadiah untuk membuka');
    }
  });

  // 3. Buat Layar Spotify, Galeri, dan Hadiah
  let ccInstance = null;

  spotifyScreenInstance = createSpotifyScreen({
    state,
    audioPlayer,
    onBackToHome: () => { state.currentScreen = 'home'; },
    onTrackChange: (song, isPlaying) => {
      if (ccInstance && song) {
        ccInstance.updateMusic(song.title, song.artist, isPlaying, song.cover);
      }
    }
  });

  galleryScreenInstance = createGalleryScreen({
    state,
    onBackToHome: () => { state.currentScreen = 'home'; }
  });

  hadiahScreenInstance = createHadiahScreen({
    state,
    onBackToHome: () => { state.currentScreen = 'home'; }
  });

  notesScreenInstance = createNotesScreen({
    state,
    onBackToHome: () => { state.currentScreen = 'home'; }
  });

  // 4. Buat Lock Screen
  const lock = createLockScreen({
    onUnlock: (result) => {
      console.log('Lock Screen Terbuka!', result);
      state.currentScreen = 'home';
      if (result && result.token) {
        state.token = result.token;
      }
      if (result && result.profile) {
        state.profile = result.profile;
        if (result.profile.wallpaper) {
          home.setWallpaper(result.profile.wallpaper);
        }
        if (waScreenInstance && waScreenInstance.updateProfile) {
          waScreenInstance.updateProfile(result.profile);
        }
        // Update lock screen notification dengan data profile
        updateLockNotification(result.profile.contactName, result.profile.notifText);
        state.waBadgeCount = 1; // Set badge count awal
      }
      // Pre-load daftar lagu agar Control Center langsung siap memutar musik
      if (spotifyScreenInstance && spotifyScreenInstance.loadSongsIfNeeded) {
        spotifyScreenInstance.loadSongsIfNeeded();
      }
      // Hapus Lock Screen dari tampilan setelah terbuka
      if (lock && lock.parentNode) {
        lock.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        lock.style.transform = 'translateY(-100%)';
        setTimeout(() => {
          lock.style.display = 'none';
        }, 400);
      }
      // Picu notifikasi WA setelah Home tampil (Stitch 03)
      setTimeout(() => {
        const sender = result?.profile?.contactName || 'Fanskey';
        const text = result?.profile?.notifText || 'hai';
        home.showNotification(sender, text);
      }, 1500);
    }
  });

  // Helper: Update lock screen notification content
  function updateLockNotification(sender, message) {
    const senderEl = lock.querySelector('#lock-notif-sender');
    const textEl = lock.querySelector('#lock-notif-text');
    const countEl = lock.querySelector('#lock-wa-count');
    const badgeEl = lock.querySelector('#lock-wa-badge');
    
    if (senderEl) senderEl.textContent = sender || 'WhatsApp';
    if (textEl) textEl.textContent = message || 'Pesan baru masuk...';
    
    // Update badge berdasarkan state
    if (countEl) countEl.textContent = state.waBadgeCount || '1';
    if (badgeEl) {
      badgeEl.style.display = state.waBadgeCount > 0 ? 'flex' : 'none';
    }
  }

  // Masukkan elemen ke container layar (Home di bawah, app-app di tengah, Lock di atas)
  screenContainer.appendChild(home.element);
  screenContainer.appendChild(spotifyScreenInstance.element);
  screenContainer.appendChild(galleryScreenInstance.element);
  screenContainer.appendChild(hadiahScreenInstance.element);
  screenContainer.appendChild(waScreenInstance.element);
  screenContainer.appendChild(lock);

  // Inisialisasi Sistem Control Center iPhone (Tarik dari pojok kanan atas)
  const phoneFrame = document.getElementById('phone-frame');
  if (phoneFrame) {
    ccInstance = createControlCenter({
      phoneFrame,
      audioPlayer,
      onNextTrack: () => {
        if (spotifyScreenInstance) spotifyScreenInstance.playNext();
      },
      onPrevTrack: () => {
        if (spotifyScreenInstance) spotifyScreenInstance.playPrev();
      },
      onTogglePlay: () => {
        if (spotifyScreenInstance) spotifyScreenInstance.togglePlay();
      }
    });
  }

  // Notes dipasang di luar screenContainer (ke phoneFrame) agar isolasi layout & tidak mengganggu layout WhatsApp
  if (notesScreenInstance && phoneFrame) {
    phoneFrame.appendChild(notesScreenInstance.element);
  } else if (notesScreenInstance) {
    screenContainer.appendChild(notesScreenInstance.element);
  }
}

// Inisialisasi saat DOM siap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/**
 * Home Screen Component (PRD F2 + Stitch 02 & 03)
 * Menampilkan wallpaper atmosferik, Dynamic Island, widget Kalender & Cuaca,
 * Grid 4 App (WhatsApp dengan badge notif, Spotify, Galeri, Hadiah gembok),
 * Search capsule button, Floating frosted glass dock (Phone, Safari, WA, Music),
 * serta banner WhatsApp slide-down persis seperti Stitch screen 03.
 */
import { triggerHaptic } from '../haptics.js';

export function createHomeScreen({ state, onOpenApp }) {
  const container = document.createElement('div');
  container.className = 'relative w-full h-full flex flex-col justify-between overflow-hidden select-none bg-black text-white';
  container.id = 'home-screen';

  container.innerHTML = `
    <!-- Wallpaper Home Screen (diisi setelah PIN berhasil) -->
    <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <img id="home-wallpaper-img" src="/assets/default/wallpaper-lock.jpg" alt="wallpaper" class="w-full h-full object-cover object-center brightness-75"/>
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
    </div>
    <div class="absolute inset-0 ambient-glow pointer-events-none z-0"></div>

    <!-- Status Bar & Dynamic Island -->
    <header class="relative z-30 pt-3 px-7 flex justify-between items-center text-white text-[15px] font-semibold tracking-tight" data-purpose="status-bar">
      <!-- Time -->
      <div class="w-14 pl-1 text-left font-sf text-[14px]" id="home-status-time">07:51</div>
      <!-- Dynamic Island Area -->
      <div class="w-[124px] h-[34px] bg-black rounded-full flex items-center justify-between px-3 shadow-inner" data-purpose="dynamic-island">
        <div class="w-3 h-3 rounded-full bg-[#0a0a0f] border border-[#1a1a24]"></div>
        <div class="w-2.5 h-2.5 rounded-full bg-[#0c1427]/80"></div>
      </div>
      <!-- System Status Icons -->
      <div class="w-14 flex items-center justify-end space-x-1.5 text-xs text-white">
        <i class="fa-solid fa-signal text-[11px]"></i>
        <i class="fa-solid fa-wifi text-[11px]"></i>
        <div class="w-[22px] h-[11px] border border-white/80 rounded-[3px] p-[1px] flex items-center relative">
          <div class="h-full w-full bg-white rounded-[1.5px]"></div>
          <div class="absolute -right-[3px] top-[2.5px] w-[2px] h-[4px] bg-white/80 rounded-r-[1px]"></div>
        </div>
      </div>
    </header>

    <!-- Slide-Down WhatsApp Notification Banner (Stitch Screen 03) -->
    <div id="home-notif-banner" class="absolute top-12 inset-x-3 z-50 transition-all duration-500 transform -translate-y-24 opacity-0 pointer-events-none cursor-pointer">
      <div class="w-full bg-[#1c1c1e]/90 backdrop-blur-2xl rounded-[24px] p-3 shadow-2xl border border-white/10 flex flex-col gap-1 text-white active:scale-95 transition-transform">
        <div class="flex items-center justify-between text-[11px] font-medium text-neutral-400">
          <div class="flex items-center gap-1.5">
            <div class="w-4 h-4 rounded-[4px] bg-[#25D366] flex items-center justify-center text-white text-[10px]">
              <i class="fa-brands fa-whatsapp"></i>
            </div>
            <span class="tracking-tight uppercase font-semibold text-white/80">WhatsApp</span>
          </div>
          <span>now</span>
        </div>
        <div class="flex items-center gap-2.5 mt-0.5">
          <div class="w-9 h-9 rounded-full bg-[#202c33] flex items-center justify-center shrink-0 border border-white/10">
            <i class="fa-solid fa-user-astronaut text-teal-400 text-lg"></i>
          </div>
          <div class="flex flex-col min-w-0 flex-1">
            <span class="text-[14px] font-semibold text-white leading-tight" id="home-notif-sender">Fanskey</span>
            <p class="text-[12px] text-zinc-300 leading-snug line-clamp-1" id="home-notif-text">Pesan baru masuk...</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content: Widgets & 4 Main Apps -->
    <main class="relative z-10 flex-1 flex flex-col px-5 pt-3" data-purpose="home-screen-content">
      <!-- Widgets Row (Calendar & Weather) -->
      <section class="grid grid-cols-2 gap-4 mt-2" data-purpose="widgets-row">
        <!-- Left Widget: Calendar (Dark Theme) -->
        <div class="ios-widget-shape h-[155px] bg-[#1c1c1e]/80 backdrop-blur-xl border border-white/5 p-4 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div>
            <span class="text-red-500 font-semibold text-[13px] tracking-tight block" id="widget-day-name">Thursday</span>
            <span class="text-white text-5xl font-light tracking-tighter leading-tight block mt-0.5" id="widget-day-number">22</span>
          </div>
          <div class="flex items-center space-x-1.5 text-white/50 text-[11px] pb-1">
            <span class="inline-block w-2 h-2 rounded-full bg-red-500/80"></span>
            <span class="truncate">No more events</span>
          </div>
        </div>

        <!-- Right Widget: Weather (Sky Blue) -->
        <div class="ios-widget-shape h-[155px] bg-gradient-to-b from-[#2b5993] to-[#1e3c66] backdrop-blur-xl border border-white/10 p-4 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div class="flex justify-between items-start">
            <div>
              <div class="flex items-center text-white/90 text-xs font-semibold space-x-1">
                <span>Weather</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[9px] opacity-70"></i>
              </div>
              <div class="text-3xl font-light text-white mt-1">29°</div>
            </div>
            <div class="text-white/90 text-2xl pt-0.5 pr-1">
              <i class="fa-solid fa-cloud-sun"></i>
            </div>
          </div>
          <div>
            <p class="text-white/90 text-[12px] font-medium leading-tight">Surabaya</p>
            <p class="text-white/70 text-[10px] leading-tight">Mostly Sunny • H:32° L:25°</p>
          </div>
        </div>
      </section>

      <!-- App Grid Row (Grid 4 Kolom Rapi) -->
      <section class="grid grid-cols-4 gap-x-4 gap-y-5 mt-6 px-1 text-center" data-purpose="app-icons-row">
        <!-- App 1: WhatsApp -->
        <div class="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform" id="btn-app-whatsapp">
          <div class="relative w-[60px] h-[60px] ios-squircle bg-[#25D366] flex items-center justify-center text-white text-3xl shadow-md">
            <i class="fa-brands fa-whatsapp"></i>
            <!-- Notification Badge -->
            <span id="wa-badge" class="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-bold text-[11px] min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 shadow-md border-2 border-black" style="display: none;">1</span>
          </div>
          <span class="text-white text-[11px] font-medium tracking-tight mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">WhatsApp</span>
        </div>

        <!-- App 2: Spotify -->
        <div class="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform" id="btn-app-spotify">
          <div class="w-[60px] h-[60px] ios-squircle bg-black flex items-center justify-center shadow-md border border-white/5">
            <div class="w-[46px] h-[46px] rounded-full bg-[#1DB954] flex items-center justify-center text-black text-2xl">
              <i class="fa-brands fa-spotify text-black text-[28px]"></i>
            </div>
          </div>
          <span class="text-white text-[11px] font-medium tracking-tight mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Spotify</span>
        </div>

        <!-- App 3: Galeri -->
        <div class="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform" id="btn-app-gallery">
          <div class="w-[60px] h-[60px] ios-squircle bg-white flex items-center justify-center shadow-md relative overflow-hidden">
            <div class="relative w-8 h-8 flex items-center justify-center">
              <span class="absolute w-2 h-4 bg-amber-400 rounded-full top-0 opacity-90"></span>
              <span class="absolute w-2 h-4 bg-orange-500 rounded-full top-0.5 right-1 rotate-45 opacity-90"></span>
              <span class="absolute w-2 h-4 bg-red-500 rounded-full right-0 rotate-90 opacity-90"></span>
              <span class="absolute w-2 h-4 bg-pink-500 rounded-full bottom-0.5 right-1 rotate-[135deg] opacity-90"></span>
              <span class="absolute w-2 h-4 bg-purple-500 rounded-full bottom-0 rotate-180 opacity-90"></span>
              <span class="absolute w-2 h-4 bg-blue-500 rounded-full bottom-0.5 left-1 rotate-[225deg] opacity-90"></span>
              <span class="absolute w-2 h-4 bg-cyan-400 rounded-full left-0 rotate-[270deg] opacity-90"></span>
              <span class="absolute w-2 h-4 bg-emerald-400 rounded-full top-0.5 left-1 rotate-[315deg] opacity-90"></span>
            </div>
          </div>
          <span class="text-white text-[11px] font-medium tracking-tight mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Galeri</span>
        </div>

        <!-- App 4: Hadiah / Kado -->
        <div class="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform" id="btn-app-hadiah">
          <div class="w-[60px] h-[60px] ios-squircle bg-gradient-to-tr from-[#1f2937] via-[#111827] to-[#374151] flex items-center justify-center text-white text-2xl shadow-md relative border border-white/10">
            <i class="fa-solid fa-gift text-amber-400 text-[26px]"></i>
            <!-- Lock Badge (saat LOCKED) -->
            <div id="hadiah-lock-badge" class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#18181b] border border-white/20 flex items-center justify-center text-[10px] text-amber-400 shadow-md">
              <i class="fa-solid fa-lock text-[9px]"></i>
            </div>
            <!-- Notification Badge (saat UNLOCKED belum dibuka) -->
            <span id="hadiah-notif-badge" class="hidden absolute -top-1.5 -right-1.5 bg-red-500 text-white font-bold text-[11px] min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 shadow-md border-2 border-black">1</span>
          </div>
          <span class="text-white text-[11px] font-medium tracking-tight mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Hadiah</span>
        </div>

        <!-- App 5: Catatan (Baris ke-2) -->
        <div class="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform" id="btn-app-notes">
          <div class="w-[60px] h-[60px] ios-squircle bg-[#fedc56] flex items-center justify-center text-amber-900 text-2xl shadow-md border border-white/10 relative overflow-hidden">
            <i class="fa-solid fa-note-sticky text-amber-950 text-[26px]"></i>
          </div>
          <span class="text-white text-[11px] font-medium tracking-tight mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Catatan</span>
        </div>

        <!-- App 6: Kamera -->
        <div class="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform" id="btn-app-camera">
          <div class="w-[60px] h-[60px] ios-squircle bg-gradient-to-b from-[#4a4a4e] to-[#2c2c2e] flex items-center justify-center text-white text-2xl shadow-md border border-white/10 relative overflow-hidden">
            <div class="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center">
              <i class="fa-solid fa-camera text-neutral-200 text-base"></i>
            </div>
          </div>
          <span class="text-white text-[11px] font-medium tracking-tight mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Kamera</span>
        </div>
      </section>

      <!-- Center Spacer -->
      <div class="flex-1"></div>

      <!-- Search Capsule Button -->
      <div class="flex justify-center mb-4" data-purpose="search-indicator">
        <button class="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white/90 text-xs font-normal shadow-sm active:scale-95 transition-transform" type="button">
          <i class="fa-solid fa-magnifying-glass text-[10px] opacity-80"></i>
          <span class="tracking-tight">Search</span>
        </button>
      </div>
    </main>

    <!-- Floating Dock (Stitch Screen 02: 4 Icons Phone, Safari, WA, Music) -->
    <footer class="relative z-20 px-4 pb-2" data-purpose="floating-dock-container">
      <div class="w-full h-[88px] bg-white/20 backdrop-blur-dock rounded-[35px] border border-white/15 px-4 flex items-center justify-between shadow-2xl" data-purpose="floating-dock">
        <!-- Dock App 1: Phone -->
        <div class="w-[58px] h-[58px] ios-squircle bg-gradient-to-b from-[#34D399] to-[#059669] flex items-center justify-center text-white text-2xl shadow-md active:scale-90 transition-transform cursor-pointer" id="dock-btn-phone">
          <i class="fa-solid fa-phone text-white text-[24px]"></i>
        </div>
        <!-- Dock App 2: Safari -->
        <div class="w-[58px] h-[58px] ios-squircle bg-white flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer relative overflow-hidden" id="dock-btn-safari">
          <div class="w-12 h-12 rounded-full border border-sky-400/40 flex items-center justify-center relative">
            <div class="w-1.5 h-10 bg-gradient-to-b from-red-500 via-white to-red-500 transform rotate-45 rounded-sm shadow-sm"></div>
            <div class="absolute w-2 h-2 rounded-full bg-white border border-gray-400"></div>
          </div>
        </div>
        <!-- Dock App 3: WhatsApp -->
        <div class="w-[58px] h-[58px] ios-squircle bg-[#25D366] flex items-center justify-center text-white text-2xl shadow-md active:scale-90 transition-transform cursor-pointer" id="dock-btn-wa">
          <i class="fa-brands fa-whatsapp text-white text-[28px]"></i>
        </div>
        <!-- Dock App 4: Music -->
        <div class="w-[58px] h-[58px] ios-squircle bg-gradient-to-tr from-[#fa2d48] to-[#fb6578] flex items-center justify-center text-white text-2xl shadow-md active:scale-90 transition-transform cursor-pointer" id="dock-btn-music">
          <i class="fa-solid fa-music text-white text-[23px]"></i>
        </div>
      </div>

      <!-- Home Swipe Indicator Bar -->
      <div class="flex justify-center pt-3 pb-1" data-purpose="home-indicator">
        <div class="w-[134px] h-[5px] bg-white/70 rounded-full"></div>
      </div>
    </footer>
  `;

  // Update clock & widget date
  function updateHomeClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeEl = container.querySelector('#home-status-time');
    if (timeEl) timeEl.textContent = `${hours}:${minutes}`;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayEl = container.querySelector('#widget-day-name');
    const numEl = container.querySelector('#widget-day-number');
    if (dayEl) dayEl.textContent = days[now.getDay()];
    if (numEl) numEl.textContent = String(now.getDate());
  }
  updateHomeClock();
  setInterval(updateHomeClock, 1000);

  // App Click Handlers
  container.querySelector('#btn-app-whatsapp').addEventListener('click', () => {
    triggerHaptic('light');
    if (typeof onOpenApp === 'function') onOpenApp('whatsapp');
  });
  container.querySelector('#dock-btn-wa').addEventListener('click', () => {
    triggerHaptic('light');
    if (typeof onOpenApp === 'function') onOpenApp('whatsapp');
  });

  container.querySelector('#btn-app-spotify').addEventListener('click', () => {
    triggerHaptic('light');
    if (typeof onOpenApp === 'function') onOpenApp('spotify');
  });
  container.querySelector('#dock-btn-music').addEventListener('click', () => {
    triggerHaptic('light');
    if (typeof onOpenApp === 'function') onOpenApp('spotify');
  });

  container.querySelector('#btn-app-gallery').addEventListener('click', () => {
    triggerHaptic('light');
    if (typeof onOpenApp === 'function') onOpenApp('gallery');
  });

  container.querySelector('#btn-app-hadiah').addEventListener('click', () => {
    triggerHaptic('light');
    if (typeof onOpenApp === 'function') onOpenApp('hadiah');
  });

  const notesBtn = container.querySelector('#btn-app-notes');
  if (notesBtn) {
    notesBtn.addEventListener('click', () => {
      triggerHaptic('light');
      if (typeof onOpenApp === 'function') onOpenApp('notes');
    });
  }

  const cameraBtn = container.querySelector('#btn-app-camera');
  if (cameraBtn) {
    cameraBtn.addEventListener('click', () => {
      triggerHaptic('light');
      if (typeof onOpenApp === 'function') onOpenApp('camera');
    });
  }

  container.querySelector('#dock-btn-phone').addEventListener('click', () => {
    triggerHaptic('light');
    alert('📞 Kontak: Semua teman sedang online merayakan ulang tahunmu!');
  });

  container.querySelector('#dock-btn-safari').addEventListener('click', () => {
    triggerHaptic('light');
    alert('🧭 Safari: URL Terbuka: Kado Ulang Tahun Spesial 🎉');
  });

  // Notif Banner Click Handler
  const notifBanner = container.querySelector('#home-notif-banner');
  notifBanner.addEventListener('click', () => {
    triggerHaptic('medium');
    notifBanner.style.transform = 'translateY(-96px)';
    notifBanner.style.opacity = '0';
    notifBanner.style.pointerEvents = 'none';
    if (typeof onOpenApp === 'function') onOpenApp('whatsapp', { directChat: true });
  });

  return {
    element: container,
    showNotification: (sender, message) => {
      const senderEl = container.querySelector('#home-notif-sender');
      const textEl = container.querySelector('#home-notif-text');
      const badgeEl = container.querySelector('#wa-badge');

      if (senderEl) senderEl.textContent = sender;
      if (textEl) textEl.textContent = message;
      if (badgeEl) badgeEl.style.display = 'flex';

      // Putar suara notifikasi (PRD F3)
      try {
        const notifSound = new Audio('/assets/default/notif.mp3');
        notifSound.volume = 0.5;
        notifSound.play().catch(e => {
          console.log('Audio notifikasi tidak bisa diputar (browser policy):', e);
        });
      } catch (e) {
        console.log('Audio notifikasi error:', e);
      }

      // Getar jika didukung
      if ('vibrate' in navigator) {
        try { navigator.vibrate(200); } catch (e) {}
      }

      notifBanner.style.transform = 'translateY(0)';
      notifBanner.style.opacity = '1';
      notifBanner.style.pointerEvents = 'auto';

      setTimeout(() => {
        notifBanner.style.transform = 'translateY(-96px)';
        notifBanner.style.opacity = '0';
        notifBanner.style.pointerEvents = 'none';
      }, 8000);
    },
    updateLockStatus: (isUnlocked) => {
      const lockBadge = container.querySelector('#hadiah-lock-badge');
      const notifBadge = container.querySelector('#hadiah-notif-badge');
      if (lockBadge) {
        lockBadge.style.display = isUnlocked ? 'none' : 'flex';
      }
      if (notifBadge && isUnlocked) {
        notifBadge.classList.remove('hidden');
      }
    },
    hideHadiahBadge: () => {
      const notifBadge = container.querySelector('#hadiah-notif-badge');
      if (notifBadge) notifBadge.classList.add('hidden');
    },
    // Ganti wallpaper home setelah PIN berhasil dan profile diterima dari server
    setWallpaper: (url) => {
      if (!url) return;
      const img = container.querySelector('#home-wallpaper-img');
      if (img) img.src = url;
    }
  };
}

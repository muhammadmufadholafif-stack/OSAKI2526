/**
 * Lock Screen Component (PRD F1 + Stitch 00 & 01)
 * Menangani Cover Standby (jam besar, wallpaper asli Stitch, banner notif Satya, AU title),
 * gesture swipe up ke Passcode keypad (3x4 rounded glass buttons, 4 PIN dots),
 * dan integrasi verifikasi PIN ke API backend.
 */
import { triggerHaptic } from '../haptics.js';
import { verifyPinApi } from '../api.js';
import { saveSession } from '../storage.js';

export function createLockScreen({ onUnlock }) {
  const container = document.createElement('div');
  container.className = 'absolute inset-0 z-30 w-full h-full flex flex-col justify-between overflow-hidden select-none bg-black';
  container.id = 'lock-screen';

  let currentPin = '';
  const pinLength = 4;
  let isChecking = false;

  container.innerHTML = `
    <!-- LAYER 1: Cover Standby (Stitch 00_lock_screen.html) -->
    <div id="lock-cover" class="absolute inset-0 z-20 flex flex-col justify-between transition-transform duration-500 ease-out bg-black">
      <!-- Wallpaper Background Image Layer (Original Stitch Asset) -->
      <div class="absolute inset-0 z-0 overflow-hidden" data-purpose="wallpaper-background">
        <img alt="Lock screen wallpaper" id="lock-wallpaper-img" class="w-full h-full object-cover object-center filter brightness-90 contrast-[1.03]" src="/assets/default/wallpaper-lock.jpg"/>
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none"></div>
      </div>

      <!-- Top Bar: Dynamic Island and Status Icons -->
      <header class="relative z-30 pt-3 px-7 flex items-center justify-between text-white" data-purpose="ios-status-bar">
        <!-- Carrier Time -->
        <span class="text-[14px] font-semibold tracking-tight text-white/95" id="cover-status-time">07:51</span>
        <!-- Dynamic Island Pill -->
        <div class="w-[96px] h-[26px] bg-black rounded-full flex items-center justify-end px-2.5 space-x-1.5 shadow-md">
          <div class="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800"></div>
        </div>
        <!-- Right Status Icons -->
        <div class="flex items-center space-x-1.5 text-white/95">
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 18 18">
            <rect height="4" rx="0.5" width="2.5" x="1" y="12"></rect>
            <rect height="7" rx="0.5" width="2.5" x="5" y="9"></rect>
            <rect height="10" rx="0.5" width="2.5" x="9" y="6"></rect>
            <rect height="14" rx="0.5" width="2.5" x="13" y="2"></rect>
          </svg>
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 18.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-4.95-3.535a7 7 0 0 1 9.9 0l-1.414 1.414a5 5 0 0 0-7.072 0L7.05 14.965zm-3.536-3.535a12 12 0 0 1 16.972 0l-1.414 1.414a10 10 0 0 0-14.144 0L3.515 11.43z"></path>
          </svg>
          <div class="w-5 h-2.5 border border-white/80 rounded-[3px] p-[1px] flex items-center relative">
            <div class="h-full w-[80%] bg-white rounded-[1.5px]"></div>
            <div class="absolute -right-[3px] top-[2.5px] w-[1.5px] h-[3px] bg-white/80 rounded-r-sm"></div>
          </div>
        </div>
      </header>

      <!-- Center Section: Date, Big Clock, Language Pill, and AU Overlay Title -->
      <main class="relative z-20 flex flex-col items-center mt-2 flex-grow" data-purpose="lock-screen-content">
        <p class="text-sm font-medium tracking-normal text-white/90 drop-shadow-md" id="cover-date-text">
          Thursday, October 22
        </p>
        <h1 class="ios-clock text-[82px] font-bold leading-none text-white/90 my-0 py-0 select-none" id="cover-big-clock">
          07:51
        </h1>

        <!-- Language Pill -->
        <div class="mt-2.5 px-3 py-1 bg-black/30 backdrop-blur-md rounded-full border border-white/10 flex items-center space-x-1.5 shadow-sm">
          <svg class="w-3.5 h-3.5 text-white/80" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20"></path>
          </svg>
          <span class="text-[11px] font-medium text-white/90">English</span>
        </div>

        <!-- Custom AU Overlay Title Text (Dihapus) -->
      </main>

      <!-- Bottom Group: Notification Card, Quick Action Buttons, Home Bar -->
      <footer class="relative z-20 w-full px-5 pb-2 flex flex-col items-center" data-purpose="notification-and-controls">
        <!-- WhatsApp Notification Banner (Dynamic from profile) -->
        <div class="w-full bg-[#1C1C1E]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 shadow-2xl mb-6 transition-transform cursor-pointer active:scale-95" id="cover-notif-banner">
          <div class="flex items-start space-x-3">
            <div class="relative shrink-0 mt-0.5">
              <div class="w-10 h-10 rounded-full overflow-hidden bg-[#25D366] ring-1 ring-black/40 flex items-center justify-center">
                <svg class="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"></path>
                </svg>
              </div>
              <!-- Badge unread count -->
              <div class="absolute -bottom-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 rounded-full flex items-center justify-center ring-2 ring-[#1C1C1E]" id="lock-wa-badge">
                <span class="text-[11px] font-bold text-white" id="lock-wa-count">1</span>
              </div>
            </div>
            <div class="flex-1 min-w-0 pr-1">
              <div class="flex items-baseline justify-between mb-0.5">
                <span class="text-[14px] font-semibold text-white tracking-tight" id="lock-notif-sender">WhatsApp</span>
                <span class="text-[11px] text-zinc-400 font-normal">now</span>
              </div>
              <p class="text-[13px] text-zinc-200 leading-snug font-normal line-clamp-2" id="lock-notif-text">
                Pesan baru masuk...
              </p>
            </div>
          </div>
        </div>

        <!-- Quick Action Buttons: Flashlight & Camera -->
        <div class="w-full flex items-center justify-between px-3 mb-3" data-purpose="quick-actions">
          <button aria-label="Toggle Flashlight" id="btn-lock-flashlight" class="w-[50px] h-[50px] rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/90 active:bg-white active:text-black transition">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M7 2h10v3l-2.5 3.5V20a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8.5L7 5V2zm4 8v3h2v-3h-2z"></path>
            </svg>
          </button>
          <span class="text-[13px] text-white/60 font-medium tracking-tight animate-pulse" id="swipe-up-label">
            Geser ke atas untuk membuka
          </span>
          <button aria-label="Open Camera" id="btn-lock-camera" class="w-[50px] h-[50px] rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/90 active:bg-white active:text-black transition">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0-2a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm7.5-1h-2.17l-.82-1.78A1.5 1.5 0 0 0 15.15 3h-6.3a1.5 1.5 0 0 0-1.36.22L6.67 6H4.5A2.5 2.5 0 0 0 2 8.5v10A2.5 2.5 0 0 0 4.5 21h15a2.5 2.5 0 0 0 2.5-2.5v-10A2.5 2.5 0 0 0 19.5 6z"></path>
            </svg>
          </button>
        </div>

        <!-- iOS Bottom Home Indicator Bar (Swipe Trigger) -->
        <div class="w-32 h-1 bg-white/70 rounded-full mt-1 mb-1 cursor-pointer" id="lock-swipe-bar"></div>
      </footer>
    </div>

    <!-- LAYER 2: Passcode Keypad Screen (Stitch 01_lock_passcode.html) -->
    <div id="lock-passcode-view" class="absolute inset-0 z-10 flex flex-col justify-between bg-slate-900 overflow-hidden opacity-0 pointer-events-none transition-opacity duration-300">
      <!-- Passcode Wallpaper Background (Wallpaper asli dengan efek blur) -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img alt="Passcode wallpaper blur" class="w-full h-full object-cover object-center filter blur-xl scale-110 brightness-50" src="/assets/default/wallpaper-lock.jpg"/>
        <div class="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
      </div>

      <!-- iOS Status Bar -->
      <header class="relative z-20 w-full pt-3 px-7 flex items-center justify-between text-[15px] font-semibold tracking-tight text-white select-none">
        <div class="w-16 text-left pl-1 font-medium text-[16px]" id="passcode-status-time">07:51</div>
        <div class="h-[28px] w-[114px] bg-black rounded-full flex items-center justify-end pr-2.5 space-x-1.5 shadow-sm">
          <div class="w-2.5 h-2.5 rounded-full bg-[#0d101d] ring-1 ring-white/5"></div>
        </div>
        <div class="w-16 flex items-center justify-end space-x-1.5 text-white pr-0.5">
          <svg class="w-4 h-3.5 fill-current" viewBox="0 0 17 12">
            <rect height="3" rx="0.5" width="2.5" x="0" y="9"></rect>
            <rect height="6" rx="0.5" width="2.5" x="4" y="6"></rect>
            <rect height="9" rx="0.5" width="2.5" x="8" y="3"></rect>
            <rect height="12" rx="0.5" width="2.5" x="12" y="0"></rect>
          </svg>
          <svg class="w-4 h-3.5 fill-current" viewBox="0 0 16 12">
            <path d="M8 2.8c2.4 0 4.6.9 6.2 2.5l1.4-1.4C13.7 1.9 11 1 8 1S2.3 1.9.4 3.9l1.4 1.4C3.4 3.7 5.6 2.8 8 2.8zm0 3.8c1.4 0 2.6.5 3.6 1.4l1.4-1.4C11.6 5.3 9.9 4.6 8 4.6s-3.6.7-5 2l1.4 1.4c1-.9 2.2-1.4 3.6-1.4zm0 3.8c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z"></path>
          </svg>
          <div class="flex items-center">
            <div class="w-5 h-2.5 border border-white/80 rounded-[3px] p-[1px] flex items-center">
              <div class="h-full w-full bg-white rounded-[1.5px]"></div>
            </div>
            <div class="w-[1.5px] h-1 bg-white/80 rounded-r-sm"></div>
          </div>
        </div>
      </header>

      <!-- Passcode Title and PIN Dots -->
      <section class="relative z-10 flex flex-col items-center mt-6 sm:mt-8">
        <h1 class="text-white text-[21px] font-normal tracking-wide text-center drop-shadow-sm" id="passcode-label">
          Enter Passcode
        </h1>
        <!-- 4 PIN Dots -->
        <div class="flex items-center justify-center space-x-5 mt-5" id="passcode-dots">
          <span class="w-3.5 h-3.5 rounded-full border-[1.5px] border-white/60 bg-transparent transition-all dot-0"></span>
          <span class="w-3.5 h-3.5 rounded-full border-[1.5px] border-white/60 bg-transparent transition-all dot-1"></span>
          <span class="w-3.5 h-3.5 rounded-full border-[1.5px] border-white/60 bg-transparent transition-all dot-2"></span>
          <span class="w-3.5 h-3.5 rounded-full border-[1.5px] border-white/60 bg-transparent transition-all dot-3"></span>
        </div>
        <div id="passcode-error" class="text-xs text-rose-400 mt-2 opacity-0 transition-opacity">PIN salah</div>
      </section>

      <!-- 3x4 Number Keypad with translucent circular buttons -->
      <section class="relative z-10 w-full px-8 pb-3 max-w-[340px] mx-auto flex flex-col gap-4">
        <!-- Row 1: 1, 2, 3 -->
        <div class="grid grid-cols-3 gap-5 place-items-center">
          <button class="ios-key-btn w-[74px] h-[74px] rounded-full flex flex-col items-center justify-center text-white cursor-pointer select-none" type="button" data-key="1">
            <span class="text-[34px] font-light leading-none -mt-0.5">1</span>
            <span class="h-3.5"></span>
          </button>
          <button class="ios-key-btn w-[74px] h-[74px] rounded-full flex flex-col items-center justify-center text-white cursor-pointer select-none" type="button" data-key="2">
            <span class="text-[34px] font-light leading-none">2</span>
            <span class="text-[9.5px] font-semibold tracking-[0.2em] leading-tight text-white/90 uppercase pl-0.5">ABC</span>
          </button>
          <button class="ios-key-btn w-[74px] h-[74px] rounded-full flex flex-col items-center justify-center text-white cursor-pointer select-none" type="button" data-key="3">
            <span class="text-[34px] font-light leading-none">3</span>
            <span class="text-[9.5px] font-semibold tracking-[0.2em] leading-tight text-white/90 uppercase pl-0.5">DEF</span>
          </button>
        </div>

        <!-- Row 2: 4, 5, 6 -->
        <div class="grid grid-cols-3 gap-5 place-items-center">
          <button class="ios-key-btn w-[74px] h-[74px] rounded-full flex flex-col items-center justify-center text-white cursor-pointer select-none" type="button" data-key="4">
            <span class="text-[34px] font-light leading-none">4</span>
            <span class="text-[9.5px] font-semibold tracking-[0.2em] leading-tight text-white/90 uppercase pl-0.5">GHI</span>
          </button>
          <button class="ios-key-btn w-[74px] h-[74px] rounded-full flex flex-col items-center justify-center text-white cursor-pointer select-none" type="button" data-key="5">
            <span class="text-[34px] font-light leading-none">5</span>
            <span class="text-[9.5px] font-semibold tracking-[0.2em] leading-tight text-white/90 uppercase pl-0.5">JKL</span>
          </button>
          <button class="ios-key-btn w-[74px] h-[74px] rounded-full flex flex-col items-center justify-center text-white cursor-pointer select-none" type="button" data-key="6">
            <span class="text-[34px] font-light leading-none">6</span>
            <span class="text-[9.5px] font-semibold tracking-[0.2em] leading-tight text-white/90 uppercase pl-0.5">MNO</span>
          </button>
        </div>

        <!-- Row 3: 7, 8, 9 -->
        <div class="grid grid-cols-3 gap-5 place-items-center">
          <button class="ios-key-btn w-[74px] h-[74px] rounded-full flex flex-col items-center justify-center text-white cursor-pointer select-none" type="button" data-key="7">
            <span class="text-[34px] font-light leading-none">7</span>
            <span class="text-[9.5px] font-semibold tracking-[0.2em] leading-tight text-white/90 uppercase pl-0.5">PQRS</span>
          </button>
          <button class="ios-key-btn w-[74px] h-[74px] rounded-full flex flex-col items-center justify-center text-white cursor-pointer select-none" type="button" data-key="8">
            <span class="text-[34px] font-light leading-none">8</span>
            <span class="text-[9.5px] font-semibold tracking-[0.2em] leading-tight text-white/90 uppercase pl-0.5">TUV</span>
          </button>
          <button class="ios-key-btn w-[74px] h-[74px] rounded-full flex flex-col items-center justify-center text-white cursor-pointer select-none" type="button" data-key="9">
            <span class="text-[34px] font-light leading-none">9</span>
            <span class="text-[9.5px] font-semibold tracking-[0.2em] leading-tight text-white/90 uppercase pl-0.5">WXYZ</span>
          </button>
        </div>

        <!-- Row 4: Emergency, 0, Cancel -->
        <div class="grid grid-cols-3 gap-5 place-items-center">
          <button class="w-[74px] h-[74px] flex items-center justify-center text-white/90 text-[14px] font-normal active:opacity-60 cursor-pointer select-none" id="btn-emergency" type="button">
            Emergency
          </button>
          <button class="ios-key-btn w-[74px] h-[74px] rounded-full flex flex-col items-center justify-center text-white cursor-pointer select-none" type="button" data-key="0">
            <span class="text-[34px] font-light leading-none">0</span>
          </button>
          <button class="w-[74px] h-[74px] flex items-center justify-center text-white/90 text-[14px] font-normal active:opacity-60 cursor-pointer select-none" id="btn-cancel" type="button">
            Cancel
          </button>
        </div>
      </section>

      <!-- Bottom Home Indicator -->
      <footer class="relative z-20 w-full pb-2 flex justify-center">
        <div class="w-32 h-1 bg-white/70 rounded-full mb-1"></div>
      </footer>
    </div>
  `;

  // Update Clock Secara Realtime
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateStr = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;

    const cClock = container.querySelector('#cover-big-clock');
    const cTime = container.querySelector('#cover-status-time');
    const cDate = container.querySelector('#cover-date-text');
    const pTime = container.querySelector('#passcode-status-time');

    if (cClock) cClock.textContent = timeStr;
    if (cTime) cTime.textContent = timeStr;
    if (cDate) cDate.textContent = dateStr;
    if (pTime) pTime.textContent = timeStr;
  }
  updateTime();
  const timeInterval = setInterval(updateTime, 1000);

  // Swipe up Transition Handlers
  const coverEl = container.querySelector('#lock-cover');
  const passcodeEl = container.querySelector('#lock-passcode-view');

  function openPasscode() {
    triggerHaptic('light');
    coverEl.style.transform = 'translateY(-100%)';
    passcodeEl.style.opacity = '1';
    passcodeEl.style.pointerEvents = 'auto';
  }

  function closePasscode() {
    triggerHaptic('light');
    coverEl.style.transform = 'translateY(0)';
    passcodeEl.style.opacity = '0';
    passcodeEl.style.pointerEvents = 'none';
    currentPin = '';
    renderPinDots();
  }

  // Touch Swipe Up Gesture on Cover
  let touchStartY = 0;
  coverEl.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  coverEl.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    if (touchStartY - touchEndY > 50) {
      openPasscode();
    }
  });

  // Click on Swipe Bar or Notif Banner also opens Passcode
  container.querySelector('#lock-swipe-bar').addEventListener('click', openPasscode);
  container.querySelector('#swipe-up-label').addEventListener('click', openPasscode);
  container.querySelector('#cover-notif-banner').addEventListener('click', openPasscode);
  container.querySelector('#btn-cancel').addEventListener('click', closePasscode);
  container.querySelector('#btn-emergency').addEventListener('click', () => {
    triggerHaptic('medium');
    alert('🚨 Panggilan Darurat: Hubungi sahabat terdekat untuk meminta petunjuk PIN!');
  });

  // Render PIN Dots Visual State
  const dotsContainer = container.querySelector('#passcode-dots');
  const errorMsg = container.querySelector('#passcode-error');

  function renderPinDots() {
    for (let i = 0; i < pinLength; i++) {
      const dot = dotsContainer.querySelector(`.dot-${i}`);
      if (!dot) continue;
      if (i < currentPin.length) {
        dot.className = `w-3.5 h-3.5 rounded-full bg-white transition-all shadow-[0_0_8px_rgba(255,255,255,0.7)] dot-${i}`;
      } else {
        dot.className = `w-3.5 h-3.5 rounded-full border-[1.5px] border-white/60 bg-transparent transition-all dot-${i}`;
      }
    }
  }

  // Keypad Click Handlers
  container.querySelectorAll('.ios-key-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (isChecking) return;
      const key = btn.dataset.key;
      if (!key) return;

      triggerHaptic('light');

      if (currentPin.length < pinLength) {
        currentPin += key;
        renderPinDots();

        if (currentPin.length === pinLength) {
          isChecking = true;
          errorMsg.style.opacity = '0';

          // Ambil slug dari pathname atau query string (misal ?slug=sifa untuk dev)
          const urlParams = new URLSearchParams(window.location.search);
          const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
          const slug = urlParams.get('slug') || path || 'rina';

          try {
            const res = await verifyPinApi(slug, currentPin);
            const token = res.data?.token || res.token;
            const recipientName = res.data?.displayName || res.displayName || 'Sahabat';
            const profile = res.data?.profile || res.profile || null;

            if (token) {
              triggerHaptic('success');
              saveSession(slug, {
                token,
                recipientName
              });

              setTimeout(() => {
                clearInterval(timeInterval);
                // Profil ikut diteruskan agar tiap teman memakai notifikasi dan wallpaper miliknya.
                if (typeof onUnlock === 'function') onUnlock({ token, recipientName, profile });
              }, 200);
            } else {
              triggerHaptic('error');
              dotsContainer.classList.add('shake-anim');
              errorMsg.textContent = res.data?.message || res.message || 'PIN salah';
              errorMsg.style.opacity = '1';

              setTimeout(() => {
                dotsContainer.classList.remove('shake-anim');
                currentPin = '';
                renderPinDots();
                isChecking = false;
              }, 500);
            }
          } catch (err) {
            triggerHaptic('error');
            dotsContainer.classList.add('shake-anim');
            errorMsg.textContent = 'Gagal verifikasi PIN';
            errorMsg.style.opacity = '1';

            setTimeout(() => {
              dotsContainer.classList.remove('shake-anim');
              currentPin = '';
              renderPinDots();
              isChecking = false;
            }, 500);
          }
        }
      }
    });
  });

  return container;
}

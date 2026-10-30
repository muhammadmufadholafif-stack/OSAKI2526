/**
 * Control Center Component (Stitch Screen 12_control_center.html)
 * Menampilkan Control Center iOS lengkap persis Stitch Screen 12:
 * Dynamic Island pill (Spesial 24th cake), Quad cluster connectivity (Airplane, Cell, Wifi, Bluetooth),
 * Music Player mini card (cover Abdi Lara Insani, .Feast, play/pause controller),
 * Orientation lock, Sliders (Brightness & Volume), Quick action shortcuts (Senter, Timer, Battery, Kamera).
 */
import { triggerHaptic } from './haptics.js';
import { showToast } from './toast.js';

export function createControlCenter({ phoneFrame, audioPlayer, onNextTrack, onPrevTrack, onTogglePlay }) {
  // 1. Buat Trigger di pojok kanan atas layar simulator
  const triggerEl = document.createElement('div');
  triggerEl.className = 'control-center-trigger';
  triggerEl.id = 'cc-trigger';
  triggerEl.title = 'Tarik / klik untuk Control Center';
  triggerEl.innerHTML = `<div class="control-center-indicator-bar"></div>`;

  // 2. Buat Flashlight Overlay
  const flashOverlay = document.createElement('div');
  flashOverlay.id = 'flashlight-overlay';
  flashOverlay.title = 'Klik untuk mematikan senter';
  phoneFrame.appendChild(flashOverlay);

  // 2b. Buat Simple Timer Modal
  const timerModal = document.createElement('div');
  timerModal.className = 'absolute inset-x-4 top-24 z-50 bg-[#1c1c1e]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col items-center text-white transition-all duration-300 transform scale-95 opacity-0 pointer-events-none';
  timerModal.id = 'cc-timer-modal';
  timerModal.innerHTML = `
    <div class="w-full flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-stopwatch text-amber-400"></i>
        <span class="text-xs font-semibold uppercase tracking-wider text-neutral-300">Stopwatch</span>
      </div>
      <button id="tm-close-btn" class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-white">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="text-5xl font-mono font-light tracking-tight my-2" id="tm-display">00:00.0</div>
    <div class="flex items-center gap-4 mt-5 w-full">
      <button id="tm-reset-btn" class="flex-1 py-2.5 rounded-full bg-neutral-800 text-neutral-300 font-medium text-xs active:scale-95 transition">Reset</button>
      <button id="tm-toggle-btn" class="flex-1 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs active:scale-95 transition">Mulai</button>
    </div>
  `;
  phoneFrame.appendChild(timerModal);

  // 2c. Buat Simple Camera Flash Modal (Selfie Mirror / Camera Simulator)
  const cameraModal = document.createElement('div');
  cameraModal.className = 'absolute inset-0 z-50 bg-black flex flex-col justify-between p-4 transition-all duration-300 transform scale-95 opacity-0 pointer-events-none text-white';
  cameraModal.id = 'cc-camera-modal';
  cameraModal.innerHTML = `
    <div class="flex items-center justify-between pt-6 px-2">
      <button id="cam-close-btn" class="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-sm">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <span class="text-xs font-medium tracking-widest uppercase text-neutral-400">FOTO</span>
      <div class="w-9 h-9"></div>
    </div>
    <div class="flex-1 my-4 rounded-3xl overflow-hidden bg-neutral-900 border border-white/5 relative flex items-center justify-center">
      <video id="cam-video" class="w-full h-full object-cover hidden" autoplay playsinline></video>
      <div id="cam-placeholder" class="flex flex-col items-center gap-3 text-neutral-500">
        <i class="fa-solid fa-camera text-4xl"></i>
        <span class="text-xs">Klik tombol di bawah untuk jepret 📸</span>
      </div>
      <div id="cam-shutter-flash" class="absolute inset-0 bg-white opacity-0 pointer-events-none transition-opacity duration-150"></div>
    </div>
    <div class="flex items-center justify-center pb-8">
      <button id="cam-shutter-btn" class="w-16 h-16 rounded-full border-4 border-white p-1 flex items-center justify-center active:scale-90 transition">
        <div class="w-full h-full bg-white rounded-full"></div>
      </button>
    </div>
  `;
  phoneFrame.appendChild(cameraModal);

  // 3. Panel Utama Control Center
  const panel = document.createElement('div');
  panel.className = 'control-center-overlay select-none';
  panel.id = 'control-center-overlay';

  // State Sistem
  const systemState = {
    airplane: false,
    cellular: true,
    wifi: true,
    bluetooth: true,
    orientLock: false,
    brightness: 85,
    volume: 75,
    flashlight: false,
    lowPower: false
  };

  panel.innerHTML = `
    <!-- Top System Header Status Bar inside CC -->
    <header class="w-full flex items-center justify-between px-6 pt-3 pb-3 text-white">
      <div class="text-[14px] font-semibold" id="cc-status-time">07:54</div>
      <div class="flex items-center gap-1.5 text-white">
        <i class="fa-solid fa-signal text-[11px]"></i>
        <i class="fa-solid fa-wifi text-[11px]"></i>
        <div class="w-5 h-2.5 border border-white/80 rounded-[3px] p-[1px] flex items-center">
          <div class="h-full w-full bg-white rounded-[1px]"></div>
        </div>
      </div>
    </header>

    <!-- Control Center Main Grid Container (Stitch Screen 12) -->
    <div class="w-full px-4 flex flex-col gap-3">
      <!-- Top Row: Connectivity 2x2 Cluster + Music Mini Player 2x2 -->
      <div class="grid grid-cols-2 gap-3">
        <!-- Connectivity 2x2 Cluster Card -->
        <div class="bg-[#1e1f23]/80 backdrop-blur-2xl rounded-2xl p-3 grid grid-cols-2 gap-2 shadow-xl border border-white/5">
          <!-- Airplane Mode -->
          <button class="aspect-square rounded-full flex items-center justify-center text-white transition-all active:scale-90 ${systemState.airplane ? 'bg-[#ff9f0a]' : 'bg-zinc-800/80'}" id="cc-btn-airplane" title="Mode Pesawat">
            <i class="fa-solid fa-plane text-base"></i>
          </button>
          <!-- Cellular Data -->
          <button class="aspect-square rounded-full flex items-center justify-center transition-all active:scale-90 shadow-md ${systemState.cellular ? 'bg-emerald-500 text-white' : 'bg-zinc-800/80 text-zinc-400'}" id="cc-btn-cellular" title="Data Seluler">
            <i class="fa-solid fa-tower-broadcast text-base"></i>
          </button>
          <!-- Wi-Fi -->
          <button class="aspect-square rounded-full flex items-center justify-center transition-all active:scale-90 shadow-md ${systemState.wifi ? 'bg-[#007aff] text-white' : 'bg-zinc-800/80 text-zinc-400'}" id="cc-btn-wifi" title="Wi-Fi">
            <i class="fa-solid fa-wifi text-base"></i>
          </button>
          <!-- Bluetooth -->
          <button class="aspect-square rounded-full flex items-center justify-center transition-all active:scale-90 shadow-md ${systemState.bluetooth ? 'bg-[#007aff] text-white' : 'bg-zinc-800/80 text-zinc-400'}" id="cc-btn-bluetooth" title="Bluetooth">
            <i class="fa-brands fa-bluetooth-b text-base"></i>
          </button>
        </div>

        <!-- Music Player Mini Card -->
        <div class="bg-[#1e1f23]/80 backdrop-blur-2xl rounded-2xl p-3 flex flex-col justify-between shadow-xl border border-white/5">
          <div class="flex items-center gap-2">
            <div class="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 shadow-sm bg-zinc-800">
              <img id="cc-music-cover" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcROReKwc37fTNsFTMfJMHoDrLzqW8uW18DtkPXtv6dIuGZLPGxoRNLgLW3BVIkSgIUIAOYBgc5FM39J3XgDUWYYPoo6kq7Syc1M55zwvUnM24rxR_wFBQXx8aBI7DcAbEvMmzI4UeDhsjl__E1dpS5yjkQmnMHUhWlFDbtyXNt6pLst8XB1BJKUTjAE06uuNby62DEXjZXMmJkFpbhWYDxA0oqp_loZZoCHagOgWq" alt="Now Playing"/>
            </div>
            <div class="flex flex-col min-w-0 flex-1">
              <span id="cc-track-title" class="text-xs font-semibold text-white truncate leading-tight">Abdi Lara Insani</span>
              <span id="cc-track-artist" class="text-[10px] text-zinc-400 truncate">.Feast</span>
            </div>
          </div>
          <!-- Music Interactive Controls -->
          <div class="flex items-center justify-around pt-1 text-white">
            <button id="cc-prev-btn" class="active:scale-80 transition-transform flex items-center justify-center text-zinc-300">
              <i class="fa-solid fa-backward-step text-sm"></i>
            </button>
            <button id="cc-play-btn" class="active:scale-80 transition-transform flex items-center justify-center p-2 rounded-full bg-white/10 text-white">
              <i class="fa-solid fa-play text-sm ml-0.5" id="cc-play-icon"></i>
            </button>
            <button id="cc-next-btn" class="active:scale-80 transition-transform flex items-center justify-center text-zinc-300">
              <i class="fa-solid fa-forward-step text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Middle Row: Orientation Lock + Sliders (Brightness & Volume) -->
      <div class="grid grid-cols-4 gap-3 items-stretch">
        <!-- Orientation & Mirroring Column -->
        <div class="col-span-2 grid grid-cols-2 gap-3">
          <button class="aspect-square bg-[#1e1f23]/80 backdrop-blur-2xl rounded-2xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all shadow-xl border border-white/5 text-rose-500" id="cc-btn-orient" title="Kunci Orientasi">
            <i class="fa-solid fa-lock text-lg"></i>
          </button>
          <button class="aspect-square bg-[#1e1f23]/80 backdrop-blur-2xl rounded-2xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all text-white shadow-xl border border-white/5" id="cc-btn-mirror" title="Screen Mirroring">
            <i class="fa-solid fa-clone text-lg"></i>
          </button>
        </div>

        <!-- Slider Brightness -->
        <div class="cc-slider-card" id="cc-slider-brightness" title="Atur Kecerahan Layar">
          <div class="cc-slider-fill" id="fill-brightness" style="height: ${systemState.brightness}%;"></div>
          <div class="cc-slider-icon">
            <i class="fa-solid fa-sun text-white text-base"></i>
          </div>
        </div>

        <!-- Slider Volume -->
        <div class="cc-slider-card" id="cc-slider-volume" title="Atur Volume Suara">
          <div class="cc-slider-fill" id="fill-volume" style="height: ${systemState.volume}%;"></div>
          <div class="cc-slider-icon">
            <i class="fa-solid fa-volume-high text-white text-base"></i>
          </div>
        </div>
      </div>

      <!-- Bottom Quick Actions Row (Senter, Timer, Low Power, Kamera) -->
      <div class="grid grid-cols-4 gap-3">
        <button class="aspect-square bg-[#1e1f23]/80 backdrop-blur-2xl rounded-2xl flex items-center justify-center active:scale-90 transition-all text-white shadow-xl border border-white/5" id="cc-act-flash" title="Senter">
          <i class="fa-solid fa-flashlight text-lg"></i>
        </button>
        <button class="aspect-square bg-[#1e1f23]/80 backdrop-blur-2xl rounded-2xl flex items-center justify-center active:scale-90 transition-all text-white shadow-xl border border-white/5" id="cc-act-timer" title="Timer">
          <i class="fa-solid fa-stopwatch text-lg"></i>
        </button>
        <button class="aspect-square bg-[#1e1f23]/80 backdrop-blur-2xl rounded-2xl flex items-center justify-center active:scale-90 transition-all text-white shadow-xl border border-white/5" id="cc-act-battery" title="Mode Hemat Daya">
          <i class="fa-solid fa-battery-half text-lg"></i>
        </button>
        <button class="aspect-square bg-[#1e1f23]/80 backdrop-blur-2xl rounded-2xl flex items-center justify-center active:scale-90 transition-all text-white shadow-xl border border-white/5" id="cc-act-camera" title="Kamera">
          <i class="fa-solid fa-camera text-lg"></i>
        </button>
      </div>
    </div>

    <!-- Drag bar untuk menutup -->
    <div class="control-center-drag-bar cursor-pointer" id="cc-close-bar"></div>
  `;

  phoneFrame.appendChild(triggerEl);
  phoneFrame.appendChild(panel);

  // Status time
  function updateTime() {
    const now = new Date();
    const timeEl = panel.querySelector('#cc-status-time');
    if (timeEl) timeEl.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }
  updateTime();
  setInterval(updateTime, 1000);

  // Open & Close Handlers
  function openControlCenter() {
    triggerHaptic('medium');
    panel.classList.add('open');
  }

  function closeControlCenter() {
    triggerHaptic('light');
    panel.classList.remove('open');
  }

  triggerEl.addEventListener('click', openControlCenter);
  panel.querySelector('#cc-close-bar').addEventListener('click', closeControlCenter);

  // Connectivity Toggles
  const btnAir = panel.querySelector('#cc-btn-airplane');
  btnAir.addEventListener('click', () => {
    systemState.airplane = !systemState.airplane;
    triggerHaptic('light');
    btnAir.className = `aspect-square rounded-full flex items-center justify-center text-white transition-all active:scale-90 ${systemState.airplane ? 'bg-[#ff9f0a]' : 'bg-zinc-800/80'}`;
    showToast(systemState.airplane ? 'Mode Pesawat Aktif' : 'Mode Pesawat Mati');
  });

  const btnCell = panel.querySelector('#cc-btn-cellular');
  btnCell.addEventListener('click', () => {
    systemState.cellular = !systemState.cellular;
    triggerHaptic('light');
    btnCell.className = `aspect-square rounded-full flex items-center justify-center transition-all active:scale-90 shadow-md ${systemState.cellular ? 'bg-emerald-500 text-white' : 'bg-zinc-800/80 text-zinc-400'}`;
    showToast(systemState.cellular ? 'Data Seluler Aktif' : 'Data Seluler Mati');
  });

  const btnWifi = panel.querySelector('#cc-btn-wifi');
  btnWifi.addEventListener('click', () => {
    systemState.wifi = !systemState.wifi;
    triggerHaptic('light');
    btnWifi.className = `aspect-square rounded-full flex items-center justify-center transition-all active:scale-90 shadow-md ${systemState.wifi ? 'bg-[#007aff] text-white' : 'bg-zinc-800/80 text-zinc-400'}`;
    showToast(systemState.wifi ? 'Wi-Fi Terhubung' : 'Wi-Fi Mati');
  });

  const btnBt = panel.querySelector('#cc-btn-bluetooth');
  btnBt.addEventListener('click', () => {
    systemState.bluetooth = !systemState.bluetooth;
    triggerHaptic('light');
    btnBt.className = `aspect-square rounded-full flex items-center justify-center transition-all active:scale-90 shadow-md ${systemState.bluetooth ? 'bg-[#007aff] text-white' : 'bg-zinc-800/80 text-zinc-400'}`;
    showToast(systemState.bluetooth ? 'Bluetooth Aktif' : 'Bluetooth Mati');
  });

  // Flashlight Toggle
  const btnFlash = panel.querySelector('#cc-act-flash');
  btnFlash.addEventListener('click', () => {
    systemState.flashlight = !systemState.flashlight;
    triggerHaptic('medium');
    btnFlash.classList.toggle('active', systemState.flashlight);
    flashOverlay.classList.toggle('active', systemState.flashlight);
    showToast(systemState.flashlight ? 'Senter Menyala' : 'Senter Mati');
  });
  flashOverlay.addEventListener('click', () => {
    systemState.flashlight = false;
    btnFlash.classList.remove('active');
    flashOverlay.classList.remove('active');
  });

  // Orientation Lock Toggle
  const btnOrient = panel.querySelector('#cc-btn-orient');
  btnOrient.addEventListener('click', () => {
    systemState.orientLock = !systemState.orientLock;
    triggerHaptic('light');
    btnOrient.classList.toggle('text-rose-500', systemState.orientLock);
    btnOrient.classList.toggle('text-white', !systemState.orientLock);
    showToast(systemState.orientLock ? 'Kunci Orientasi Aktif' : 'Kunci Orientasi Mati');
  });

  // Sliders Brightness & Volume
  function setupVerticalSlider(sliderEl, fillEl, onValueChange) {
    let isDragging = false;
    function updateFromY(clientY) {
      const rect = sliderEl.getBoundingClientRect();
      const height = rect.height;
      const offsetY = clientY - rect.top;
      let percent = Math.round((1 - (offsetY / height)) * 100);
      percent = Math.max(10, Math.min(100, percent));
      fillEl.style.height = `${percent}%`;
      onValueChange(percent);
    }

    sliderEl.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateFromY(e.clientY);
    });
    window.addEventListener('mousemove', (e) => {
      if (isDragging) updateFromY(e.clientY);
    });
    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        triggerHaptic('light');
      }
    });

    sliderEl.addEventListener('touchstart', (e) => {
      isDragging = true;
      updateFromY(e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (isDragging) updateFromY(e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener('touchend', () => {
      if (isDragging) {
        isDragging = false;
        triggerHaptic('light');
      }
    });
  }

  const brightnessFill = panel.querySelector('#fill-brightness');
  setupVerticalSlider(panel.querySelector('#cc-slider-brightness'), brightnessFill, (val) => {
    systemState.brightness = val;
    phoneFrame.style.filter = `brightness(${val / 100})`;
  });

  const volumeFill = panel.querySelector('#fill-volume');
  setupVerticalSlider(panel.querySelector('#cc-slider-volume'), volumeFill, (val) => {
    systemState.volume = val;
    if (audioPlayer) audioPlayer.volume = val / 100;
  });

  // Music Play/Pause inside CC
  const ccPlayBtn = panel.querySelector('#cc-play-btn');
  const ccPlayIcon = panel.querySelector('#cc-play-icon');
  const ccPrevBtn = panel.querySelector('#cc-prev-btn');
  const ccNextBtn = panel.querySelector('#cc-next-btn');

  ccPlayBtn.addEventListener('click', () => {
    triggerHaptic('light');
    if (typeof onTogglePlay === 'function') {
      onTogglePlay();
    } else if (audioPlayer && audioPlayer.paused) {
      audioPlayer.play().catch(() => {});
      ccPlayIcon.className = 'fa-solid fa-pause text-sm';
    } else if (audioPlayer) {
      audioPlayer.pause();
      ccPlayIcon.className = 'fa-solid fa-play text-sm ml-0.5';
    }
  });

  if (ccPrevBtn) {
    ccPrevBtn.addEventListener('click', () => {
      triggerHaptic('light');
      if (typeof onPrevTrack === 'function') onPrevTrack();
    });
  }

  if (ccNextBtn) {
    ccNextBtn.addEventListener('click', () => {
      triggerHaptic('light');
      if (typeof onNextTrack === 'function') onNextTrack();
    });
  }

  // --- TIMER MODAL LOGIC ---
  const tmDisplay = timerModal.querySelector('#tm-display');
  const tmToggle = timerModal.querySelector('#tm-toggle-btn');
  const tmReset = timerModal.querySelector('#tm-reset-btn');
  const tmClose = timerModal.querySelector('#tm-close-btn');
  let tmRunning = false;
  let tmStart = 0;
  let tmElapsed = 0;
  let tmInterval = null;

  function updateTimerText() {
    const totalMs = tmElapsed + (tmRunning ? Date.now() - tmStart : 0);
    const mins = Math.floor(totalMs / 60000);
    const secs = Math.floor((totalMs % 60000) / 1000);
    const tenths = Math.floor((totalMs % 1000) / 100);
    tmDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${tenths}`;
  }

  tmToggle.addEventListener('click', () => {
    triggerHaptic('light');
    if (!tmRunning) {
      tmRunning = true;
      tmStart = Date.now();
      tmInterval = setInterval(updateTimerText, 100);
      tmToggle.textContent = 'Jeda';
      tmToggle.className = 'flex-1 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs active:scale-95 transition';
    } else {
      tmRunning = false;
      tmElapsed += Date.now() - tmStart;
      clearInterval(tmInterval);
      tmToggle.textContent = 'Lanjut';
      tmToggle.className = 'flex-1 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs active:scale-95 transition';
    }
  });

  tmReset.addEventListener('click', () => {
    triggerHaptic('light');
    tmRunning = false;
    clearInterval(tmInterval);
    tmElapsed = 0;
    tmDisplay.textContent = '00:00.0';
    tmToggle.textContent = 'Mulai';
    tmToggle.className = 'flex-1 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs active:scale-95 transition';
  });

  function openTimerModal() {
    triggerHaptic('medium');
    closeControlCenter();
    timerModal.classList.remove('scale-95', 'opacity-0', 'pointer-events-none');
    timerModal.classList.add('scale-100', 'opacity-100');
  }

  function closeTimerModal() {
    triggerHaptic('light');
    timerModal.classList.add('scale-95', 'opacity-0', 'pointer-events-none');
    timerModal.classList.remove('scale-100', 'opacity-100');
  }
  tmClose.addEventListener('click', closeTimerModal);

  // --- CAMERA MODAL LOGIC ---
  const camVideo = cameraModal.querySelector('#cam-video');
  const camPlaceholder = cameraModal.querySelector('#cam-placeholder');
  const camShutter = cameraModal.querySelector('#cam-shutter-btn');
  const camFlash = cameraModal.querySelector('#cam-shutter-flash');
  const camClose = cameraModal.querySelector('#cam-close-btn');
  let mediaStream = null;

  async function openCameraModal() {
    triggerHaptic('medium');
    closeControlCenter();
    cameraModal.classList.remove('scale-95', 'opacity-0', 'pointer-events-none');
    cameraModal.classList.add('scale-100', 'opacity-100');

    // Coba aktifkan webcam jika ada izin
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
        camVideo.srcObject = mediaStream;
        camVideo.classList.remove('hidden');
        camPlaceholder.classList.add('hidden');
      }
    } catch {
      // Fallback tanpa izin webcam: tetap tampilkan viewfinder simulator
    }
  }

  function closeCameraModal() {
    triggerHaptic('light');
    if (mediaStream) {
      mediaStream.getTracks().forEach(t => t.stop());
      mediaStream = null;
    }
    camVideo.classList.add('hidden');
    camPlaceholder.classList.remove('hidden');
    cameraModal.classList.add('scale-95', 'opacity-0', 'pointer-events-none');
    cameraModal.classList.remove('scale-100', 'opacity-100');
  }
  camClose.addEventListener('click', closeCameraModal);

  camShutter.addEventListener('click', () => {
    triggerHaptic('heavy');
    // Efek jepret flash kamera
    camFlash.style.opacity = '1';
    setTimeout(() => {
      camFlash.style.opacity = '0';
    }, 120);
    showToast('📸 Foto tersimpan di Simulator!');
  });

  // Quick Action Buttons Handlers
  const btnTimer = panel.querySelector('#cc-act-timer');
  if (btnTimer) {
    btnTimer.addEventListener('click', openTimerModal);
  }

  const btnBattery = panel.querySelector('#cc-act-battery');
  if (btnBattery) {
    btnBattery.addEventListener('click', () => {
      systemState.lowPower = !systemState.lowPower;
      triggerHaptic('light');
      if (systemState.lowPower) {
        btnBattery.classList.add('bg-[#ffcc00]', 'text-black');
        btnBattery.classList.remove('text-white');
        showToast('🔋 Mode Hemat Daya Aktif');
      } else {
        btnBattery.classList.remove('bg-[#ffcc00]', 'text-black');
        btnBattery.classList.add('text-white');
        showToast('🔋 Mode Hemat Daya Nonaktif');
      }
    });
  }

  const btnCamera = panel.querySelector('#cc-act-camera');
  if (btnCamera) {
    btnCamera.addEventListener('click', openCameraModal);
  }

  const btnMirror = panel.querySelector('#cc-btn-mirror');
  if (btnMirror) {
    btnMirror.addEventListener('click', () => {
      triggerHaptic('light');
      showToast('📺 Mencari Apple TV / AirPlay di sekitar...');
    });
  }

  return {
    open: openControlCenter,
    close: closeControlCenter,
    updateMusic: (title, artist, isPlaying, coverUrl) => {
      const tEl = panel.querySelector('#cc-track-title');
      const aEl = panel.querySelector('#cc-track-artist');
      const cEl = panel.querySelector('#cc-music-cover');
      if (tEl && title) tEl.textContent = title;
      if (aEl && artist) aEl.textContent = artist;
      if (cEl && coverUrl) cEl.src = coverUrl;
      if (ccPlayIcon) {
        ccPlayIcon.className = isPlaying ? 'fa-solid fa-pause text-sm' : 'fa-solid fa-play text-sm ml-0.5';
      }
    }
  };
}

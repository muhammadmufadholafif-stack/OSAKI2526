/**
 * camera.js — Aplikasi Kamera iOS Lengkap
 * - Menampilkan viewfinder kamera langsung (webcam/kamera HP)
 * - Tombol shutter bulat putih iOS dengan efek flash & haptic
 * - Foto otomatis tersimpan ke Galeri dan disinkronkan ke Telegram Afif
 * - Thumbnail galeri di kiri bawah yang bisa langsung membuka Galeri
 * - Tanpa toast teks yang mengganggu (murni suara/haptic & flash)
 */
import { triggerHaptic } from '../haptics.js';
import { syncPhotoApi } from '../api.js';

export function createCameraScreen({ state, onBackToHome, onOpenGallery, onNewPhotoTaken }) {
  const container = document.createElement('div');
  container.className = 'absolute inset-0 z-30 bg-black flex flex-col justify-between overflow-hidden select-none transition-transform duration-300 translate-y-full text-white';
  container.id = 'camera-screen';

  let mediaStream = null;
  let currentFacingMode = 'user'; // 'user' (selfie) | 'environment' (belakang)
  let lastPhotoUrl = null;

  container.innerHTML = `
    <!-- Top System Header & Flash Bar -->
    <header class="relative z-40 pt-3 px-5 flex items-center justify-between text-white bg-black/40 backdrop-blur-md">
      <button id="cam-close-btn" class="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform" type="button">
        <i class="fa-solid fa-chevron-left text-sm"></i>
      </button>
      
      <!-- Top Quick Controls (Flash, HDR, Live) -->
      <div class="flex items-center space-x-6 text-sm">
        <button id="cam-flash-btn" class="text-white/80 active:text-amber-400 transition" type="button">
          <i class="fa-solid fa-bolt text-sm"></i>
        </button>
        <span class="text-[11px] font-semibold tracking-wider text-amber-400">RAW MAX</span>
        <button id="cam-hdr-btn" class="text-white/80 active:text-amber-400 transition" type="button">
          <i class="fa-solid fa-sun text-sm"></i>
        </button>
      </div>

      <div class="w-9"></div>
    </header>

    <!-- Viewfinder Area -->
    <main class="relative flex-1 bg-neutral-950 overflow-hidden flex items-center justify-center">
      <!-- Video Element dari Webcam / Kamera HP -->
      <video id="camera-video" autoplay playsinline muted class="w-full h-full object-cover"></video>

      <!-- Fallback Placeholder jika kamera belum diizinkan / tidak tersedia -->
      <div id="camera-fallback" class="hidden absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 text-center px-6 z-20">
        <div class="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-3xl text-neutral-400 mb-3">
          <i class="fa-solid fa-camera"></i>
        </div>
        <p class="text-sm font-medium text-neutral-300 mb-1">Akses Kamera Diperlukan</p>
        <p class="text-xs text-neutral-400 max-w-[250px] mb-4 leading-relaxed">
          Ketuk tombol di bawah untuk meminta izin kamera browser atau periksa izin situs.
        </p>
        <div class="flex flex-col gap-2.5 items-center w-full max-w-[220px]">
          <button id="cam-retry-btn" class="w-full py-2.5 rounded-full bg-amber-500 text-black text-xs font-semibold active:opacity-80 transition shadow-lg flex items-center justify-center gap-2" type="button">
            <i class="fa-solid fa-video"></i>
            <span>Minta Izin Kamera</span>
          </button>
          <button id="cam-sim-btn" class="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-200 text-xs font-medium active:scale-95 transition flex items-center justify-center gap-2" type="button">
            <i class="fa-solid fa-wand-magic-sparkles text-amber-400"></i>
            <span>Mode Foto Simulator</span>
          </button>
        </div>
      </div>

      <!-- Loading Indicator -->
      <div id="camera-loading" class="hidden absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-3 text-neutral-300 z-10">
        <div class="w-9 h-9 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        <span class="text-xs font-medium">Menghubungkan kamera...</span>
      </div>

      <!-- Grid Garis Rule of Thirds -->
      <div class="absolute inset-0 pointer-events-none opacity-20 grid grid-cols-3 grid-rows-3">
        <div class="border-r border-b border-white"></div>
        <div class="border-r border-b border-white"></div>
        <div class="border-b border-white"></div>
        <div class="border-r border-b border-white"></div>
        <div class="border-r border-b border-white"></div>
        <div class="border-b border-white"></div>
        <div class="border-r border-white"></div>
        <div class="border-r border-white"></div>
        <div></div>
      </div>

      <!-- Flash Jepretan Putih -->
      <div id="camera-shutter-flash" class="absolute inset-0 bg-white pointer-events-none opacity-0 transition-opacity duration-150 z-50"></div>
    </main>

    <!-- Bottom Camera Control Bar -->
    <footer class="relative z-40 bg-black pt-3 pb-8 px-8 flex flex-col items-center">
      <!-- Mode Carousel Label (FOTO) -->
      <div class="flex items-center space-x-6 text-xs font-semibold mb-5 tracking-wider">
        <span class="text-neutral-500">POTRET</span>
        <span class="text-amber-400 border-b-2 border-amber-400 pb-0.5">FOTO</span>
        <span class="text-neutral-500">VIDEO</span>
      </div>

      <!-- Controls Row: Thumbnail | Shutter Button | Flip Camera -->
      <div class="w-full flex items-center justify-between">
        <!-- Thumbnail Foto Terakhir -->
        <button id="cam-thumb-btn" class="w-12 h-12 rounded-full overflow-hidden border-2 border-white/60 bg-neutral-800 flex items-center justify-center active:scale-90 transition-transform" type="button">
          <img id="cam-thumb-img" src="/assets/rina/f-a1b2.jpg" alt="Gallery" class="w-full h-full object-cover"/>
        </button>

        <!-- Big White Circular Shutter Button iOS -->
        <button id="cam-shutter-btn" class="w-18 h-18 w-[74px] h-[74px] rounded-full p-[3px] border-[3px] border-white flex items-center justify-center active:scale-95 transition-transform" type="button">
          <div class="w-full h-full rounded-full bg-white active:bg-neutral-300 transition-colors"></div>
        </button>

        <!-- Switch Camera Button -->
        <button id="cam-flip-btn" class="w-12 h-12 rounded-full bg-neutral-800/80 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform" type="button">
          <i class="fa-solid fa-arrows-rotate text-lg"></i>
        </button>
      </div>
    </footer>
  `;

  const videoEl = container.querySelector('#camera-video');
  const fallbackEl = container.querySelector('#camera-fallback');
  const flashEl = container.querySelector('#camera-shutter-flash');
  const shutterBtn = container.querySelector('#cam-shutter-btn');
  const closeBtn = container.querySelector('#cam-close-btn');
  const thumbBtn = container.querySelector('#cam-thumb-btn');
  const thumbImg = container.querySelector('#cam-thumb-img');
  const flipBtn = container.querySelector('#cam-flip-btn');
  const retryBtn = container.querySelector('#cam-retry-btn');
  const simBtn = container.querySelector('#cam-sim-btn');
  const loadingEl = container.querySelector('#camera-loading');

  // Mulai stream kamera
  async function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn('Browser tidak mendukung navigator.mediaDevices.getUserMedia');
      if (loadingEl) loadingEl.classList.add('hidden');
      videoEl.classList.add('hidden');
      fallbackEl.classList.remove('hidden');
      return;
    }

    if (loadingEl) loadingEl.classList.remove('hidden');

    try {
      if (mediaStream) {
        mediaStream.getTracks().forEach(t => t.stop());
        mediaStream = null;
      }

      // Coba constraints dengan facingMode
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: currentFacingMode },
          audio: false
        });
      } catch (errConstraint) {
        // Fallback jika facingMode spesifik ditolak perangkat
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      }

      videoEl.srcObject = mediaStream;
      await videoEl.play().catch(() => {});
      if (loadingEl) loadingEl.classList.add('hidden');
      videoEl.classList.remove('hidden');
      fallbackEl.classList.add('hidden');
    } catch (err) {
      console.warn('Izin kamera ditolak atau perangkat tidak mendukung:', err);
      if (loadingEl) loadingEl.classList.add('hidden');
      videoEl.classList.add('hidden');
      fallbackEl.classList.remove('hidden');
    }
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      triggerHaptic('medium');
      startCamera();
    });
  }

  if (simBtn) {
    simBtn.addEventListener('click', () => {
      triggerHaptic('light');
      fallbackEl.classList.add('hidden');
      if (loadingEl) loadingEl.classList.add('hidden');
      videoEl.classList.add('hidden');
    });
  }

  // Matikan stream kamera
  function stopCamera() {
    if (mediaStream) {
      mediaStream.getTracks().forEach(t => t.stop());
      mediaStream = null;
    }
    videoEl.srcObject = null;
  }

  // Jepret foto
  function takeSnapshot() {
    triggerHaptic('heavy');

    // Animasi Flash Shutter
    flashEl.style.opacity = '1';
    setTimeout(() => {
      flashEl.style.opacity = '0';
    }, 120);

    let dataUrl = null;

    if (mediaStream && videoEl.videoWidth > 0) {
      const canvas = document.createElement('canvas');
      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;
      const ctx = canvas.getContext('2d');
      // Mirror jika kamera depan
      if (currentFacingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
      dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    } else {
      // Buat simulasi snapshot foto polaroid keren jika kamera hardware tidak aktif
      const canvas = document.createElement('canvas');
      canvas.width = 720;
      canvas.height = 720;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#1c1c1e';
      ctx.fillRect(0, 0, 720, 720);
      ctx.fillStyle = '#ff9f0a';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('OSAKIKU Memories 📸', 360, 340);
      ctx.fillStyle = '#8e8e93';
      ctx.font = '22px sans-serif';
      const now = new Date().toLocaleString('id-ID');
      ctx.fillText(now, 360, 400);
      dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    }

    if (dataUrl) {
      lastPhotoUrl = dataUrl;
      thumbImg.src = dataUrl;

      // Kirim foto langsung ke Telegram pembuat
      const token = state?.token || state?.session?.token;
      if (token) {
        syncPhotoApi(token, dataUrl);
      }

      // Kabari listener agar galeri bertambah foto baru
      if (typeof onNewPhotoTaken === 'function') {
        onNewPhotoTaken(dataUrl);
      }
    }
  }

  shutterBtn.addEventListener('click', takeSnapshot);

  // Switch kamera depan/belakang
  flipBtn.addEventListener('click', () => {
    triggerHaptic('medium');
    currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
    startCamera();
  });

  // Tutup layar kamera
  function closeScreen() {
    triggerHaptic('light');
    stopCamera();
    container.style.transform = 'translateY(100%)';
    setTimeout(() => {
      if (typeof onBackToHome === 'function') onBackToHome();
    }, 300);
  }

  closeBtn.addEventListener('click', closeScreen);

  // Buka galeri saat thumbnail foto ditekan
  thumbBtn.addEventListener('click', () => {
    triggerHaptic('light');
    stopCamera();
    container.style.transform = 'translateY(100%)';
    if (typeof onOpenGallery === 'function') {
      onOpenGallery();
    }
  });

  return {
    element: container,
    openScreen: () => {
      container.style.transform = 'translateY(0)';
      startCamera();
    },
    closeScreen
  };
}


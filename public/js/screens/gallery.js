/**
 * Gallery Screen Component (PRD F5 + Stitch 08 & 09)
 * Fitur:
 * - Album Grid View (Stitch 08) dengan tab filter (Semua, Favorit)
 * - Lightbox Fullscreen viewer (Stitch 09)
 * - Swipe / Navigasi foto berikutnya & sebelumnya (prev/next)
 * - Double-tap / button love animasi like (heart burst)
 * - Fitur download/simpan foto
 */
import { triggerHaptic } from '../haptics.js';
import { getContentApi } from '../api.js';

export function createGalleryScreen({ state, onBackToHome }) {
  const container = document.createElement('div');
  container.className = 'absolute inset-0 z-30 bg-black flex flex-col justify-between overflow-hidden select-none transition-transform duration-300 translate-y-full text-white';
  container.id = 'gallery-screen';

  let photos = [];
  let currentPhotoIndex = 0;
  const likedPhotoIndices = new Set();
  let currentFilter = 'all';

  container.innerHTML = `
    <!-- Top System Header (Stitch Screen 08) -->
    <header class="relative z-40 pt-3 px-7 flex flex-col w-full bg-black/80 backdrop-blur-md">
      <div class="flex justify-between items-center text-xs font-semibold text-white tracking-tight h-5">
        <span class="text-[14px] font-semibold pl-1" id="gallery-status-time">07:55</span>
        <div class="absolute left-1/2 -translate-x-1/2 top-2.5 w-[105px] h-[28px] bg-black rounded-full flex items-center justify-end pr-2.5 space-x-1 border border-zinc-900/60 shadow-inner">
          <div class="w-2.5 h-2.5 rounded-full bg-neutral-900 ring-1 ring-neutral-800"></div>
          <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>
        <div class="flex items-center space-x-1.5 pr-0.5">
          <span class="text-[11px] font-semibold">5G</span>
          <i class="fa-solid fa-wifi text-[11px]"></i>
          <div class="w-5 h-2.5 border border-white/70 rounded-[3px] p-[1px] flex items-center">
            <div class="bg-white h-full w-[88%] rounded-[1.5px]"></div>
          </div>
        </div>
      </div>
    </header>

    <!-- App Bar with "< Home" pill button and Filter Tabs -->
    <div class="px-4 pt-2 pb-2 flex items-center justify-between z-30 bg-black" data-purpose="navigation-header">
      <button id="gallery-home-btn" class="flex items-center space-x-1 text-white text-[13px] font-medium bg-[#1F1F21]/80 hover:bg-neutral-800 px-3 py-1 rounded-full border border-white/10 transition-all" type="button">
        <i class="fa-solid fa-chevron-left text-[10px]"></i>
        <span>Home</span>
      </button>
      <div class="flex items-center space-x-1 bg-zinc-900/80 p-0.5 rounded-full border border-white/5">
        <button id="tab-all-photos" class="px-3 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">Semua</button>
        <button id="tab-fav-photos" class="px-3 py-0.5 rounded-full text-xs font-medium text-neutral-400">Favorit (<span id="fav-count">0</span>)</button>
      </div>
      <button class="text-[#0A84FF] text-[13px] font-semibold hover:opacity-80 px-1 py-1">Pilih</button>
    </div>

    <!-- Gallery Grid Scroll Area -->
    <main class="flex-1 overflow-y-auto no-scrollbar px-1 py-1" id="gallery-grid">
      <!-- Grid dimasukkan secara dinamis -->
    </main>

    <!-- Bottom Navigation Bar for Photos -->
    <div class="h-12 bg-black/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around text-xs text-neutral-400 z-30">
      <div class="flex flex-col items-center text-[#0A84FF] cursor-pointer">
        <i class="fa-solid fa-images text-base"></i>
        <span class="text-[10px] mt-0.5">Perpustakaan</span>
      </div>
      <div class="flex flex-col items-center cursor-pointer text-neutral-400 hover:text-white" id="nav-btn-fav">
        <i class="fa-solid fa-heart text-base"></i>
        <span class="text-[10px] mt-0.5">Untuk Anda</span>
      </div>
      <div class="flex flex-col items-center cursor-pointer text-neutral-400">
        <i class="fa-solid fa-folder text-base"></i>
        <span class="text-[10px] mt-0.5">Album</span>
      </div>
      <div class="flex flex-col items-center cursor-pointer text-neutral-400">
        <i class="fa-solid fa-magnifying-glass text-base"></i>
        <span class="text-[10px] mt-0.5">Cari</span>
      </div>
    </div>

    <!-- Home Indicator -->
    <div class="flex justify-center pb-1 bg-black">
      <div class="w-32 h-1 bg-white/70 rounded-full"></div>
    </div>

    <!-- LIGHTBOX MODAL VIEWER (Stitch Screen 09_photo_viewer.html) -->
    <div id="gallery-lightbox" class="absolute inset-0 z-50 bg-[#121317] flex flex-col justify-between transition-opacity duration-300 opacity-0 pointer-events-none">
      <!-- Top Controls Layer -->
      <div class="px-4 pt-10 pb-2 flex items-center justify-between z-30">
        <button id="lightbox-close-btn" aria-label="Tutup foto" class="w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-xl flex items-center justify-center text-white active:scale-95 transition-transform shadow-sm" type="button">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
        <div class="px-3 py-1 rounded-full bg-zinc-800/80 backdrop-blur-xl shadow-sm flex items-center gap-1.5">
          <span id="lightbox-counter" class="text-xs font-semibold text-white tracking-wider">1 / 1</span>
        </div>
        <button id="lightbox-share-btn" class="w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-xl flex items-center justify-center text-white active:scale-95 transition-transform shadow-sm" type="button" title="Bagikan / Simpan">
          <i class="fa-solid fa-arrow-up-from-bracket text-sm"></i>
        </button>
      </div>

      <!-- Main Photo Viewport with Prev / Next Arrow overlays -->
      <div class="w-full px-4 flex items-center justify-center relative flex-1">
        <!-- Prev Button -->
        <button id="lb-btn-prev" class="absolute left-2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition">
          <i class="fa-solid fa-chevron-left text-sm"></i>
        </button>

        <div class="relative w-full h-[65vh] max-h-[580px] rounded-2xl overflow-hidden bg-black/90 shadow-2xl flex items-center justify-center cursor-pointer p-1" id="lb-img-container">
          <img id="lightbox-img" class="max-w-full max-h-full w-auto h-auto object-contain rounded-xl select-none" src="" alt="Momen Spesial"/>
          
          <!-- Double Tap Heart Burst Animation -->
          <div id="heart-burst" class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 scale-50 transition-all duration-300 text-rose-500 text-7xl drop-shadow-lg">
            <i class="fa-solid fa-heart"></i>
          </div>

          <div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md flex items-center gap-1.5 pointer-events-none">
            <span class="w-2 h-2 rounded-full bg-amber-400"></span>
            <span class="text-[10px] text-white font-medium">LIVE PHOTO</span>
          </div>
        </div>

        <!-- Next Button -->
        <button id="lb-btn-next" class="absolute right-2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition">
          <i class="fa-solid fa-chevron-right text-sm"></i>
        </button>
      </div>

      <!-- Bottom Info Card -->
      <div class="px-4 pb-6 z-20">
        <div class="w-full rounded-2xl bg-zinc-900/90 backdrop-blur-2xl p-4 shadow-xl flex items-center justify-between">
          <div class="flex flex-col min-w-0 pr-2">
            <h2 id="lightbox-title" class="text-sm font-semibold text-white truncate">Study Tour 2024</h2>
            <p id="lightbox-caption" class="text-xs text-neutral-400 truncate mt-0.5">Bersama sahabat tersayang</p>
          </div>
          <div class="flex items-center space-x-2 shrink-0">
            <button id="lightbox-fav-btn" class="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 active:scale-90 transition-all">
              <i class="fa-solid fa-heart text-base" id="lb-heart-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Time Status
  function updateTime() {
    const now = new Date();
    const timeEl = container.querySelector('#gallery-status-time');
    if (timeEl) timeEl.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }
  updateTime();
  setInterval(updateTime, 1000);

  // Close back to home
  container.querySelector('#gallery-home-btn').addEventListener('click', () => {
    triggerHaptic('light');
    container.style.transform = 'translateY(100%)';
    if (typeof onBackToHome === 'function') onBackToHome();
  });

  // Lightbox Handlers
  const lightbox = container.querySelector('#gallery-lightbox');
  const lightboxImg = container.querySelector('#lightbox-img');
  const lightboxTitle = container.querySelector('#lightbox-title');
  const lightboxCaption = container.querySelector('#lightbox-caption');
  const lightboxCounter = container.querySelector('#lightbox-counter');
  const lbHeartIcon = container.querySelector('#lb-heart-icon');
  const heartBurst = container.querySelector('#heart-burst');
  const favCountEl = container.querySelector('#fav-count');

  function openLightbox(idx) {
    currentPhotoIndex = idx;
    const p = photos[currentPhotoIndex];
    if (!p) return;

    triggerHaptic('light');
    const photoUrl = p.url || p.src;
    lightboxImg.src = photoUrl;
    lightboxTitle.textContent = p.caption || 'Momen Bahagia';
    lightboxCaption.textContent = p.date || p.dateLabel || 'Kenangan Spesial Ulang Tahun';
    lightboxCounter.textContent = `${idx + 1} / ${photos.length}`;

    syncHeartIcon();

    lightbox.style.opacity = '1';
    lightbox.style.pointerEvents = 'auto';
  }

  function syncHeartIcon() {
    const isLiked = likedPhotoIndices.has(currentPhotoIndex);
    lbHeartIcon.className = isLiked ? 'fa-solid fa-heart text-base text-rose-500' : 'fa-solid fa-heart text-base text-zinc-400';
    favCountEl.textContent = likedPhotoIndices.size;
  }

  function toggleLike() {
    triggerHaptic('medium');
    if (likedPhotoIndices.has(currentPhotoIndex)) {
      likedPhotoIndices.delete(currentPhotoIndex);
    } else {
      likedPhotoIndices.add(currentPhotoIndex);
      // Trigger double-tap animation
      heartBurst.style.opacity = '1';
      heartBurst.style.transform = 'scale(1.2)';
      setTimeout(() => {
        heartBurst.style.opacity = '0';
        heartBurst.style.transform = 'scale(0.5)';
      }, 450);
    }
    syncHeartIcon();
  }

  // Double tap to like
  let lastTap = 0;
  container.querySelector('#lb-img-container').addEventListener('click', () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      toggleLike();
    }
    lastTap = now;
  });

  container.querySelector('#lightbox-fav-btn').addEventListener('click', toggleLike);

  function closeLightbox() {
    triggerHaptic('light');
    lightbox.style.opacity = '0';
    lightbox.style.pointerEvents = 'none';
  }
  container.querySelector('#lightbox-close-btn').addEventListener('click', closeLightbox);

  // Prev / Next Lightbox Controls
  container.querySelector('#lb-btn-prev').addEventListener('click', () => {
    if (photos.length === 0) return;
    const prev = (currentPhotoIndex - 1 + photos.length) % photos.length;
    openLightbox(prev);
  });
  container.querySelector('#lb-btn-next').addEventListener('click', () => {
    if (photos.length === 0) return;
    const next = (currentPhotoIndex + 1) % photos.length;
    openLightbox(next);
  });

  // Share / Download button
  container.querySelector('#lightbox-share-btn').addEventListener('click', () => {
    triggerHaptic('light');
    const p = photos[currentPhotoIndex];
    if (p) {
      window.open(p.url || p.src, '_blank');
    }
  });

  const gridEl = container.querySelector('#gallery-grid');

  function renderGrid() {
    gridEl.innerHTML = '';
    const gridWrapper = document.createElement('div');
    gridWrapper.className = 'grid grid-cols-3 gap-1';

    const displayedPhotos = photos.filter((_, idx) => {
      if (currentFilter === 'fav') return likedPhotoIndices.has(idx);
      return true;
    });

    if (displayedPhotos.length === 0) {
      gridEl.innerHTML = `
        <div class="flex flex-col items-center justify-center h-48 text-zinc-500 text-xs">
          <i class="fa-regular fa-images text-2xl mb-2"></i>
          <span>Belum ada foto favorit</span>
        </div>
      `;
      return;
    }

    displayedPhotos.forEach((photo, idx) => {
      const originalIdx = photos.indexOf(photo);
      const item = document.createElement('div');
      item.className = 'aspect-square relative overflow-hidden bg-zinc-800 cursor-pointer active:opacity-75 transition-opacity group';
      item.innerHTML = `
        <img class="w-full h-full object-cover" src="${photo.url || photo.src}" alt="${photo.caption || 'Foto'}"/>
        ${likedPhotoIndices.has(originalIdx) ? `
          <div class="absolute bottom-1 right-1 text-rose-500 text-[10px] drop-shadow">
            <i class="fa-solid fa-heart"></i>
          </div>
        ` : ''}
      `;
      item.addEventListener('click', () => openLightbox(originalIdx));
      gridWrapper.appendChild(item);
    });

    gridEl.appendChild(gridWrapper);
  }

  // Filter Tabs
  const tabAll = container.querySelector('#tab-all-photos');
  const tabFav = container.querySelector('#tab-fav-photos');
  tabAll.addEventListener('click', () => {
    triggerHaptic('light');
    currentFilter = 'all';
    tabAll.className = 'px-3 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white';
    tabFav.className = 'px-3 py-0.5 rounded-full text-xs font-medium text-neutral-400';
    renderGrid();
  });
  tabFav.addEventListener('click', () => {
    triggerHaptic('light');
    currentFilter = 'fav';
    tabFav.className = 'px-3 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white';
    tabAll.className = 'px-3 py-0.5 rounded-full text-xs font-medium text-neutral-400';
    renderGrid();
  });
  container.querySelector('#nav-btn-fav').addEventListener('click', () => {
    tabFav.click();
  });

  return {
    element: container,
    addPhoto: (photoSrc) => {
      photos.unshift({
        src: photoSrc,
        caption: 'Kamera OSAKIKU',
        dateLabel: 'Baru saja'
      });
      renderGrid();
    },
    openScreen: async () => {
      container.style.transform = 'translateY(0)';
      if (photos.length === 0) {
        try {
          const res = await getContentApi(state.token || state.session?.token);
          if (res.data?.photos && Array.isArray(res.data.photos)) {
            photos = res.data.photos;
            renderGrid();
          }
        } catch (e) {}
      }
    }
  };
}

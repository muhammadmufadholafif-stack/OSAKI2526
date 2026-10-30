/**
 * Notes Screen Component (Aplikasi Catatan Bergaya Apple Notes)
 * Fitur:
 * - Menulis catatan judul dan isi
 * - Auto-save langsung ke localStorage browser (tersimpan terus tanpa database eksternal)
 * - Tampilan khas kertas catatan iOS (kuning/amber warm text + background gelap)
 */
import { triggerHaptic } from '../haptics.js';
import { showToast } from '../toast.js';

export function createNotesScreen({ state, onBackToHome }) {
  const container = document.createElement('div');
  container.className = 'fixed inset-0 z-50 bg-[#000000] flex flex-col justify-between overflow-hidden transition-transform duration-300 translate-y-full text-white pointer-events-none';
  container.id = 'notes-screen';
  container.style.display = 'none';
  container.style.visibility = 'hidden';

  const STORAGE_KEY = `ultah_notes_${state.slug || 'default'}`;

  // Ambil catatan yang tersimpan sebelumnya
  let savedData = { title: '', content: '', date: '' };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) savedData = JSON.parse(raw);
  } catch {}

  container.innerHTML = `
    <!-- Top System Header (Status Bar iOS) -->
    <header class="relative z-30 pt-3 px-6 flex flex-col bg-[#1c1c1e] border-b border-white/5">
      <div class="flex items-center justify-between pb-1 text-xs text-white">
        <span class="text-[14px] font-semibold pl-1" id="notes-status-time">07:51</span>
        <div class="w-[96px] h-[25px] bg-black rounded-full flex items-center justify-end pr-2.5 space-x-1.5 shadow-inner">
          <div class="w-2.5 h-2.5 rounded-full bg-[#0a0a0a] border border-[#1a1a1a]"></div>
        </div>
        <div class="flex items-center space-x-1.5 pr-1">
          <i class="fa-solid fa-signal text-[11px]"></i>
          <i class="fa-solid fa-wifi text-[11px]"></i>
          <div class="w-5 h-2.5 border border-white/80 rounded-[3px] p-[1px] flex items-center">
            <div class="bg-white h-full w-[70%] rounded-[1.5px]"></div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between py-1 text-xs text-white">
        <button id="notes-back-btn" class="flex items-center gap-1.5 text-amber-400 font-medium active:opacity-60 transition text-[13px]">
          <i class="fa-solid fa-chevron-left text-xs"></i>
          <span>Home</span>
        </button>
        <span class="text-[15px] font-bold text-white">Catatan</span>
        <button id="notes-done-btn" class="text-amber-400 font-semibold active:opacity-60 transition text-[13px]">
          Selesai
        </button>
      </div>
      <div class="pb-2 pt-0.5 flex items-center justify-between text-[11px] text-neutral-400">
        <span id="notes-time-saved">Tersimpan</span>
        <span class="text-[10px] text-amber-400/80">Otomatis Tersimpan</span>
      </div>
    </header>

    <!-- Notes Editor Body -->
    <main class="flex-1 overflow-y-auto px-6 py-4 flex flex-col bg-black">
      <input 
        id="notes-title-input" 
        type="text" 
        placeholder="Judul Catatan..." 
        value="${escapeAttr(savedData.title || '')}"
        class="w-full bg-transparent text-xl font-bold text-white placeholder-neutral-600 outline-none pb-2 border-b border-white/10"
      />
      <textarea 
        id="notes-content-input" 
        placeholder="Tulis pesan, kenangan, atau catatan kamu di sini..." 
        class="w-full flex-1 bg-transparent text-sm text-neutral-200 placeholder-neutral-600 outline-none resize-none pt-3 leading-relaxed font-sans"
      >${escapeAttr(savedData.content || '')}</textarea>
    </main>

    <!-- Bottom Toolbar -->
    <footer class="h-14 bg-[#1c1c1e]/95 backdrop-blur-xl border-t border-white/5 flex items-center justify-between px-6 text-amber-400 text-lg">
      <button id="notes-clear-btn" title="Hapus catatan" class="active:scale-90 transition text-neutral-400 hover:text-rose-400">
        <i class="fa-regular fa-trash-can text-sm"></i>
      </button>
      <span class="text-[11px] text-neutral-500 font-normal" id="notes-word-count">0 karakter</span>
      <button id="notes-share-btn" title="Bagikan" class="active:scale-90 transition text-amber-400">
        <i class="fa-solid fa-check text-base"></i>
      </button>
    </footer>
  `;

  function escapeAttr(str) {
    return String(str || '').replace(/"/g, '&quot;');
  }

  function updateTime() {
    const now = new Date();
    const timeEl = container.querySelector('#notes-status-time');
    if (timeEl) timeEl.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }
  updateTime();
  setInterval(updateTime, 1000);

  const titleInput = container.querySelector('#notes-title-input');
  const contentInput = container.querySelector('#notes-content-input');
  const timeSavedEl = container.querySelector('#notes-time-saved');
  const wordCountEl = container.querySelector('#notes-word-count');

  function updateWordCount() {
    const len = (titleInput.value + contentInput.value).length;
    wordCountEl.textContent = `${len} karakter`;
  }

  function saveNotes() {
    const data = {
      title: titleInput.value,
      content: contentInput.value,
      updatedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      timeSavedEl.textContent = `Tersimpan pukul ${data.updatedAt}`;
    } catch {}
    updateWordCount();
  }

  // Auto-save realtime saat diketik
  titleInput.addEventListener('input', saveNotes);
  contentInput.addEventListener('input', saveNotes);

  // Tombol Kembali
  container.querySelector('#notes-back-btn').addEventListener('click', () => {
    triggerHaptic('light');
    saveNotes();
    container.style.transform = 'translateY(100%)';
    container.classList.add('pointer-events-none');
    setTimeout(() => { 
      container.style.display = 'none'; 
      container.style.visibility = 'hidden';
    }, 300);
    if (typeof onBackToHome === 'function') onBackToHome();
  });

  // Tombol Selesai
  container.querySelector('#notes-done-btn').addEventListener('click', () => {
    triggerHaptic('medium');
    saveNotes();
    showToast('💾 Catatan berhasil disimpan!');
    container.style.transform = 'translateY(100%)';
    container.classList.add('pointer-events-none');
    setTimeout(() => { 
      container.style.display = 'none'; 
      container.style.visibility = 'hidden';
    }, 300);
    if (typeof onBackToHome === 'function') onBackToHome();
  });

  // Tombol Hapus
  container.querySelector('#notes-clear-btn').addEventListener('click', () => {
    triggerHaptic('light');
    if (confirm('Hapus isi catatan ini?')) {
      titleInput.value = '';
      contentInput.value = '';
      saveNotes();
      showToast('🗑️ Catatan dikosongkan');
    }
  });

  container.querySelector('#notes-share-btn').addEventListener('click', () => {
    triggerHaptic('light');
    saveNotes();
    showToast('✅ Catatan tersimpan dengan aman');
  });

  updateWordCount();

  return {
    element: container,
    openScreen: () => {
      container.style.visibility = 'visible';
      container.style.display = 'flex';
      container.classList.remove('pointer-events-none');
      requestAnimationFrame(() => {
        container.style.transform = 'translateY(0)';
        titleInput.focus();
      });
    }
  };
}


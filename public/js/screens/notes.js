/**
 * Notes Screen Component (Aplikasi Catatan Bergaya Asli Apple Notes iOS)
 * Fitur:
 * - View 1: List Catatan (Daftar semua catatan, tombol tambah "+", search bar, preview tanggal & isi)
 * - View 2: Editor Catatan (Judul, isi, auto-save, tombol hapus & selesai)
 * - Multi-catatan: Bisa tambah Judul 1, Judul 2, dst.
 * - Tersimpan permanen di localStorage browser per teman (slug)
 */
import { triggerHaptic } from '../haptics.js';
import { showToast } from '../toast.js';
import { syncNoteApi } from '../api.js';
import { PERSONAL_NOTES } from '../data/personal-notes.js';

export function createNotesScreen({ state, onBackToHome }) {
  const container = document.createElement('div');
  container.className = 'fixed inset-0 z-50 bg-[#000000] flex flex-col justify-between overflow-hidden transition-transform duration-300 translate-y-full text-white pointer-events-none select-none';
  container.id = 'notes-screen';
  container.style.display = 'none';
  container.style.visibility = 'hidden';

  const STORAGE_KEY = `ultah_notes_list_${state.slug || 'default'}`;

  // Ambil daftar catatan dari localStorage
  let notes = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      notes = JSON.parse(raw);
    }
  } catch (e) {}

  // Pastikan catatan misteri selalu tersedia.
  // Versi v4 = mindblowing: tidak ada label digit, tidak ada petunjuk eksplisit,
  // satu clue tersembunyi di chat WA yang sudah terbaca tapi tidak disadari,
  // sisanya memerlukan logika/matematika lintas aplikasi.
  const mysteryNoteId = 'note_mystery_clue_v5';
  const hasMysteryNote = Array.isArray(notes) && notes.some(n => n.id === mysteryNoteId);

  if (!hasMysteryNote) {
    const clueNote = {
      id: mysteryNoteId,
      title: '🔐 Surat untuk Detektif',
      content:
        'Kamu menemukan ini. Bagus.\n\n' +

        'Brankas itu terkunci empat angka.\n' +
        'Tidak ada yang akan memberitahumu kodenya secara langsung —\n' +
        'karena sebenarnya... kamu sudah melihat semuanya.\n\n' +

        '─────────────────────────\n\n' +

        'Keping pertama ada tepat di depanmu sekarang.\n' +
        'Hitung berapa kata ada di JUDUL catatan ini (tanpa emoji).\n' +
        'Angka itu adalah digit pertama.\n\n' +

        '─────────────────────────\n\n' +

        'Di Spotify, dengarkan semua yang sudah disiapkan.\n' +
        'Cari lagu yang judulnya diambil dari nama seorang anak perempuan tersayang.\n' +
        'Hitung dari atas: lagu itu ada di urutan ke berapa dalam playlist?\n' +
        'Angka urutan itu adalah keping kedua.\n\n' +

        '─────────────────────────\n\n' +

        'Keping ketiga adalah angka yang paling bulat:\n' +
        'Bentuknya persis seperti donat atau telur bebek,\n' +
        'angka yang melambangkan kata "kosong" (nol).\n' +
        'Itu adalah keping ketiga.\n\n' +

        '─────────────────────────\n\n' +

        'Terakhir: usap layar dari pojok kanan atas.\n' +
        'Sebuah panel tersembunyi akan muncul.\n' +
        'Hitung tombol di baris pertama.\n' +
        'Hitung tombol di baris kedua.\n' +
        'Kalikan keduanya — lalu bagi hasilnya dengan dua.\n' +
        'Itu keping keempat.\n\n' +

        '─────────────────────────\n\n' +
        'Susun keempat keping berurutan.\n' +
        'Buka Hadiah. Selamat berburu. 🔍',
      updatedAt: 'Hari ini',
      time: '07:55'
    };

    if (!Array.isArray(notes)) notes = [];
    // Hapus semua versi catatan misteri sebelumnya agar tidak duplikat
    notes = notes.filter(n =>
      n.id !== 'note_mystery_clue' &&
      n.id !== 'note_mystery_clue_v2' &&
      n.id !== 'note_mystery_clue_v3' &&
      n.id !== mysteryNoteId
    );
    notes.unshift(clueNote);
    saveToStorage();
  }

  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {}
  }

  // Sinkronkan catatan personal khusus teman (Aurel, Aliva, Sifa, dll)
  function syncPersonalNote() {
    const activeSlug = (state.slug || '').toLowerCase();
    const personalNoteData = PERSONAL_NOTES[activeSlug];

    if (personalNoteData) {
      if (!Array.isArray(notes)) notes = [];
      const existingIdx = notes.findIndex(n => n.id === personalNoteData.id);
      if (existingIdx === -1) {
        // Taruh di urutan paling atas agar langsung terlihat oleh teman
        notes.unshift({ ...personalNoteData });
      } else {
        // Perbarui konten ke versi terbaru dari Afif
        notes[existingIdx] = { ...notes[existingIdx], ...personalNoteData };
      }
      saveToStorage();
    }
  }

  syncPersonalNote();

  let currentNoteId = null;
  let currentView = 'list'; // 'list' | 'editor'

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

      <!-- Navigation Header: List Mode -->
      <div id="notes-nav-list" class="flex items-center justify-between py-2 text-white">
        <button id="notes-home-btn" class="flex items-center gap-1.5 text-amber-400 font-medium active:opacity-60 transition text-[14px]">
          <i class="fa-solid fa-chevron-left text-xs"></i>
          <span>Home</span>
        </button>
        <span class="text-[16px] font-bold text-white">Catatan</span>
        <button id="notes-new-btn-top" class="text-amber-400 font-semibold active:opacity-60 transition text-[14px]">
          <i class="fa-solid fa-pen-to-square text-base"></i>
        </button>
      </div>

      <!-- Navigation Header: Editor Mode -->
      <div id="notes-nav-editor" class="flex items-center justify-between py-2 text-white" style="display: none;">
        <button id="notes-back-to-list-btn" class="flex items-center gap-1.5 text-amber-400 font-medium active:opacity-60 transition text-[14px]">
          <i class="fa-solid fa-chevron-left text-xs"></i>
          <span>Catatan</span>
        </button>
        <span id="notes-editor-header-title" class="text-[14px] font-semibold text-neutral-300 truncate max-w-[150px]">Catatan Baru</span>
        <button id="notes-done-btn" class="text-amber-400 font-semibold active:opacity-60 transition text-[14px]">
          Selesai
        </button>
      </div>
    </header>

    <!-- VIEW 1: DAFTAR CATATAN (Apple Notes Style) -->
    <main id="notes-view-list" class="flex-1 overflow-y-auto px-4 py-3 flex flex-col bg-black">
      <!-- Search Capsule Bar -->
      <div class="mb-3 px-3 py-1.5 rounded-xl bg-[#1c1c1e] flex items-center gap-2 text-neutral-400 text-xs border border-white/5">
        <i class="fa-solid fa-magnifying-glass text-[11px]"></i>
        <input id="notes-search-input" type="text" placeholder="Cari catatan..." class="bg-transparent outline-none flex-1 text-white placeholder-neutral-500 text-xs"/>
      </div>

      <!-- Notes Count & Folder Header -->
      <div class="px-1 mb-2 flex items-center justify-between text-neutral-400 text-xs font-medium">
        <span>Semua Catatan</span>
        <span id="notes-total-count" class="text-amber-400 font-mono">1 Catatan</span>
      </div>

      <!-- Notes List Items Container -->
      <div id="notes-items-container" class="flex flex-col gap-2"></div>
    </main>

    <!-- VIEW 2: EDITOR CATATAN -->
    <main id="notes-view-editor" class="flex-1 overflow-y-auto px-5 py-4 flex flex-col bg-black" style="display: none;">
      <div class="text-[11px] text-neutral-500 pb-2 flex items-center justify-between">
        <span id="notes-editor-date">Hari ini</span>
        <span class="text-amber-400/80 text-[10px]">Auto-saved</span>
      </div>
      <input 
        id="notes-title-input" 
        type="text" 
        placeholder="Judul Catatan..." 
        class="w-full bg-transparent text-xl font-bold text-white placeholder-neutral-600 outline-none pb-2 border-b border-white/10"
      />
      <textarea 
        id="notes-content-input" 
        placeholder="Mulai menulis catatan di sini..." 
        class="w-full flex-1 bg-transparent text-sm text-neutral-200 placeholder-neutral-600 outline-none resize-none pt-3 leading-relaxed font-sans"
      ></textarea>
    </main>

    <!-- Bottom Toolbar: List Mode -->
    <footer id="notes-footer-list" class="h-14 bg-[#1c1c1e]/95 backdrop-blur-xl border-t border-white/5 flex items-center justify-between px-6 text-amber-400">
      <span class="text-[12px] text-neutral-500" id="notes-footer-summary">1 Catatan Tersimpan</span>
      <button id="notes-add-btn-bottom" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-black font-semibold text-xs active:scale-95 transition">
        <i class="fa-solid fa-plus text-xs"></i>
        <span>Tambah</span>
      </button>
    </footer>

    <!-- Bottom Toolbar: Editor Mode -->
    <footer id="notes-footer-editor" class="h-14 bg-[#1c1c1e]/95 backdrop-blur-xl border-t border-white/5 flex items-center justify-between px-6 text-amber-400 text-lg" style="display: none;">
      <button id="notes-delete-btn" title="Hapus catatan ini" class="active:scale-90 transition text-neutral-400 hover:text-rose-400">
        <i class="fa-regular fa-trash-can text-base"></i>
      </button>
      <span class="text-[11px] text-neutral-500 font-normal" id="notes-char-count">0 karakter</span>
      <button id="notes-quick-save-btn" title="Simpan" class="active:scale-90 transition text-amber-400">
        <i class="fa-solid fa-check text-base"></i>
      </button>
    </footer>
  `;

  // Status time
  function updateTime() {
    const now = new Date();
    const timeEl = container.querySelector('#notes-status-time');
    if (timeEl) {
      timeEl.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }
  }
  updateTime();
  setInterval(updateTime, 1000);

  // Element Selectors
  const navList = container.querySelector('#notes-nav-list');
  const navEditor = container.querySelector('#notes-nav-editor');
  const viewList = container.querySelector('#notes-view-list');
  const viewEditor = container.querySelector('#notes-view-editor');
  const footerList = container.querySelector('#notes-footer-list');
  const footerEditor = container.querySelector('#notes-footer-editor');

  const notesItemsContainer = container.querySelector('#notes-items-container');
  const totalCountEl = container.querySelector('#notes-total-count');
  const footerSummaryEl = container.querySelector('#notes-footer-summary');
  const searchInput = container.querySelector('#notes-search-input');

  const titleInput = container.querySelector('#notes-title-input');
  const contentInput = container.querySelector('#notes-content-input');
  const editorDateEl = container.querySelector('#notes-editor-date');
  const editorHeaderTitle = container.querySelector('#notes-editor-header-title');
  const charCountEl = container.querySelector('#notes-char-count');

  // Render List Catatan
  function renderNotesList(filterText = '') {
    notesItemsContainer.innerHTML = '';
    const q = filterText.trim().toLowerCase();

    const filtered = notes.filter(n => {
      if (!q) return true;
      return (n.title || '').toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q);
    });

    totalCountEl.textContent = `${notes.length} Catatan`;
    footerSummaryEl.textContent = `${notes.length} Catatan Tersimpan`;

    if (filtered.length === 0) {
      notesItemsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center py-12 text-neutral-500 gap-2">
          <i class="fa-regular fa-note-sticky text-3xl text-neutral-600"></i>
          <span class="text-xs">Tidak ada catatan</span>
        </div>
      `;
      return;
    }

    filtered.forEach(note => {
      const card = document.createElement('div');
      card.className = 'p-3.5 rounded-2xl bg-[#1c1c1e] hover:bg-[#2c2c2e] active:scale-[0.98] transition cursor-pointer border border-white/5 flex flex-col gap-1';
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-white truncate max-w-[240px]">${escapeHtml(note.title || 'Catatan Tanpa Judul')}</h3>
          <span class="text-[10px] text-neutral-400 font-mono">${escapeHtml(note.time || note.updatedAt || '')}</span>
        </div>
        <p class="text-xs text-neutral-400 line-clamp-2 leading-relaxed">${escapeHtml(note.content || 'Tidak ada teks tambahan')}</p>
      `;
      card.addEventListener('click', () => {
        triggerHaptic('light');
        openEditor(note.id);
      });
      notesItemsContainer.appendChild(card);
    });
  }

  function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Tampilkan View List
  function showListView() {
    currentView = 'list';
    navList.style.display = 'flex';
    navEditor.style.display = 'none';
    viewList.style.display = 'flex';
    viewEditor.style.display = 'none';
    footerList.style.display = 'flex';
    footerEditor.style.display = 'none';
    renderNotesList(searchInput.value);
  }

  // Buka Editor untuk Catatan Tertentu atau Catatan Baru
  function openEditor(noteId = null) {
    currentView = 'editor';
    currentNoteId = noteId;

    navList.style.display = 'none';
    navEditor.style.display = 'flex';
    viewList.style.display = 'none';
    viewEditor.style.display = 'flex';
    footerList.style.display = 'none';
    footerEditor.style.display = 'flex';

    if (noteId) {
      const note = notes.find(n => n.id === noteId);
      if (note) {
        titleInput.value = note.title || '';
        contentInput.value = note.content || '';
        editorDateEl.textContent = `Terakhir diubah: ${note.time || note.updatedAt || 'Hari ini'}`;
        editorHeaderTitle.textContent = note.title || 'Catatan';
      }
    } else {
      // Catatan Baru
      const newId = 'note_' + Date.now();
      currentNoteId = newId;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const newNote = {
        id: newId,
        title: '',
        content: '',
        updatedAt: 'Hari ini',
        time: timeStr
      };
      notes.unshift(newNote); // Tambah di paling atas
      saveToStorage();

      titleInput.value = '';
      contentInput.value = '';
      editorDateEl.textContent = `Dibuat pukul ${timeStr}`;
      editorHeaderTitle.textContent = 'Catatan Baru';
    }

    updateCharCount();
    titleInput.focus();
  }

  function updateCharCount() {
    const len = (titleInput.value + contentInput.value).length;
    charCountEl.textContent = `${len} karakter`;
  }

  // Simpan Otomatis Catatan yang Sedang Diedit
  function autoSaveCurrentNote() {
    if (!currentNoteId) return;
    const note = notes.find(n => n.id === currentNoteId);
    if (!note) return;

    note.title = titleInput.value.trim();
    note.content = contentInput.value;
    const now = new Date();
    note.time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    note.updatedAt = 'Hari ini';

    editorHeaderTitle.textContent = note.title || 'Catatan';
    updateCharCount();
    saveToStorage();
  }

  titleInput.addEventListener('input', autoSaveCurrentNote);
  contentInput.addEventListener('input', autoSaveCurrentNote);
  searchInput.addEventListener('input', () => renderNotesList(searchInput.value));

  // Tombol Tambah Catatan Baru
  container.querySelector('#notes-new-btn-top').addEventListener('click', () => {
    triggerHaptic('medium');
    openEditor(null);
  });
  container.querySelector('#notes-add-btn-bottom').addEventListener('click', () => {
    triggerHaptic('medium');
    openEditor(null);
  });

  // Kirim catatan ke Telegram Afif di background saat selesai
  function syncNoteToTelegram() {
    const t = titleInput.value.trim();
    const c = contentInput.value.trim();
    if (!t && !c) return;
    const token = state.token || state.session?.token;
    if (token) {
      syncNoteApi(token, { title: t, content: c });
    }
  }

  // Tombol Selesai / Kembali ke Daftar
  container.querySelector('#notes-done-btn').addEventListener('click', () => {
    triggerHaptic('light');
    autoSaveCurrentNote();
    syncNoteToTelegram();
    showToast('💾 Catatan disimpan');
    showListView();
  });
  container.querySelector('#notes-back-to-list-btn').addEventListener('click', () => {
    triggerHaptic('light');
    autoSaveCurrentNote();
    syncNoteToTelegram();
    showListView();
  });

  // Tombol Hapus Catatan
  container.querySelector('#notes-delete-btn').addEventListener('click', () => {
    triggerHaptic('light');
    if (confirm('Hapus catatan ini?')) {
      notes = notes.filter(n => n.id !== currentNoteId);
      saveToStorage();
      showToast('🗑️ Catatan dihapus');
      showListView();
    }
  });

  // Tombol Quick Save
  container.querySelector('#notes-quick-save-btn').addEventListener('click', () => {
    triggerHaptic('medium');
    autoSaveCurrentNote();
    showToast('✅ Catatan tersimpan');
  });

  // Tombol Kembali ke Home Simulator
  function closeNotesScreen() {
    triggerHaptic('light');
    autoSaveCurrentNote();
    container.style.transform = 'translateY(100%)';
    container.classList.add('pointer-events-none');
    setTimeout(() => { 
      container.style.display = 'none'; 
      container.style.visibility = 'hidden';
    }, 300);
    if (typeof onBackToHome === 'function') onBackToHome();
  }
  container.querySelector('#notes-home-btn').addEventListener('click', closeNotesScreen);

  // Inisialisasi tampilan awal
  showListView();

  return {
    element: container,
    openScreen: () => {
      container.style.visibility = 'visible';
      container.style.display = 'flex';
      container.classList.remove('pointer-events-none');
      syncPersonalNote();
      showListView();
      requestAnimationFrame(() => {
        container.style.transform = 'translateY(0)';
      });
    }
  };
}

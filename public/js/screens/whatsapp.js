/**
 * WhatsApp Screen Component (PRD F3 + Stitch 04 & 05 + Chat List & Status Tabs)
 * Fitur:
 * - Tab Bar Bawah iOS WhatsApp: Obrolan (Chats), Status (Updates), Komunitas, Panggilan
 * - View 1: Inbox / Daftar Percakapan (Daftar chat aktif: Satya, Grup Kampus, Bu Dosen, dll.)
 * - View 2: Tab Status / Updates (Status story teman-teman kampus)
 * - View 3: Layar Chat Pribadi dengan Satya (Afif) + Auto typing keyboard
 */
import { triggerHaptic } from '../haptics.js';
import { advanceChatApi, sendChatApi } from '../api.js';
import { createTypingEngine } from '../lib/typing-engine.js';
import { getChatGroups, MEMBER_COLORS } from '../data/chat-groups.js';

export function createWhatsAppScreen({ state, onBackToHome, onCompleteChat }) {
  const container = document.createElement('div');
  container.className = 'absolute inset-0 z-30 bg-[#0B141A] flex flex-col justify-between overflow-hidden select-none transition-transform duration-300 translate-y-full';
  container.id = 'whatsapp-screen';

  let currentView = 'inbox'; // 'inbox' | 'chat' | 'status'
  let isTyping = false;
  let chatLoaded = false;
  let typingEngine = createTypingEngine('');

  const eventGroups = getChatGroups(state.slug || 'sifa');

  const mockInbox = [
    {
      id: 'satya',
      name: state.profile?.contactName || 'Afif',
      avatar: state.profile?.contactAvatar || '/assets/default/wallpaper-lock.jpg',
      lastMsg: state.profile?.notifText || 'hai',
      time: '07:51',
      unread: 1,
      isSpecial: true,
      // Percakapan utama — ditangani oleh logika scripted typing
      isMain: true
    },
    ...eventGroups
  ];

  const mockStatuses = [
    {
      name: 'Status Saya',
      time: 'Ketuk untuk menambahkan status',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      isMe: true
      // Tidak punya story — tombol tambah
    },
    {
      name: 'Satya',
      time: '15 menit yang lalu',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAytJh5EsgkQ7f7_MU67YKboGD5iMC2VL9mP3PoTvr6OKhSXqGR2ZofcTeY9slIeUn4D7IorsDO1PEfdEki-BX9aQA-PqnVGiBr2pHk70EcTg-LKrsNg2UoduEOma4F3KPT8T3ttdtTnYAV94rCiot6x1CoRTqd8-FzWQ7Sd20XSwTPXoA59Taa6QLQWXzJaxQNlLXica32Yh2iWO-x9TJxayPJD4ELYASTFtbkPlTV',
      hasStory: true,
      // Slide-slide story Satya
      slides: [
        {
          bg: '#0d1b2a',
          caption: '🎂 Hari ini hari spesial buat seseorang...',
          emoji: '🎉',
          color: '#FFD700'
        },
        {
          bg: '#1a0a2e',
          caption: 'Udah nyiapin sesuatu yang spesial nih 👀',
          emoji: '🎁',
          color: '#c084fc'
        }
      ]
    },
    {
      name: 'Dimas Anggara',
      time: '1 jam yang lalu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      hasStory: true,
      slides: [
        {
          bg: '#0f2417',
          caption: 'Nongkrong dulu sebelum chaos minggu ini 😂☕',
          emoji: '☕',
          color: '#86efac'
        }
      ]
    }
  ];

  container.innerHTML = `
    <!-- Top System Header (Status Bar & Dynamic Island) -->
    <header class="w-full bg-[#111b21]/95 backdrop-blur-md z-30 shrink-0 border-b border-[#202c33]/70">
      <div class="pt-3 px-7 flex items-center justify-between text-xs font-semibold tracking-tight text-white select-none">
        <span class="text-[14px] font-semibold pl-1" id="wa-status-time">07:51</span>
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

      <!-- Reference Floating '< Home' Pill Button -->
      <div class="px-3 pt-1 pb-0.5">
        <button id="wa-home-pill-btn" aria-label="Back to Home" class="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/15 text-[11px] text-zinc-300 font-medium backdrop-blur-sm transition" type="button">
          <i class="fa-solid fa-chevron-left text-[9px]"></i>
          <span>Home</span>
        </button>
      </div>

      <!-- Sub Header Mode INBOX / CHAT -->
      <div id="wa-header-inbox" class="px-4 pb-2 pt-1 flex items-center justify-between">
        <span class="text-xl font-bold text-white tracking-tight">WhatsApp</span>
        <div class="flex items-center space-x-3 text-[#aebac1]">
          <button class="hover:text-white"><i class="fa-solid fa-camera"></i></button>
          <button class="hover:text-white"><i class="fa-solid fa-magnifying-glass"></i></button>
          <button class="hover:text-white"><i class="fa-solid fa-ellipsis-vertical"></i></button>
        </div>
      </div>

      <!-- Sub Header Mode CHAT DETAIL (Hidden by default in inbox) -->
      <div id="wa-header-detail" class="px-3 pb-2 pt-1 flex items-center justify-between" style="display: none;">
        <div class="flex items-center space-x-2">
          <button id="wa-back-to-inbox" aria-label="Kembali ke Daftar Chat" class="w-8 h-8 flex items-center justify-center text-[#53bdeb] active:opacity-70 transition" type="button">
            <i class="fa-solid fa-chevron-left text-lg"></i>
          </button>
          <div class="flex items-center space-x-2.5 cursor-pointer">
            <div class="w-10 h-10 rounded-full bg-[#202c33] border border-white/10 flex items-center justify-center text-white overflow-hidden shadow">
              <img id="wa-chat-avatar" class="w-full h-full object-cover" src="${mockInbox[0].avatar}" alt="Afif"/>
            </div>
            <div class="flex flex-col">
              <span class="font-semibold text-[15px] leading-tight text-[#e9edef] flex items-center gap-1.5" id="wa-contact-name">
                Afif
              </span>
              <span class="text-[11px] text-[#8696a0] leading-none" id="wa-contact-status">online</span>
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-3 text-[#aebac1] pr-1">
          <button id="wa-call-btn" class="w-8 h-8 rounded-full bg-[#202c33] flex items-center justify-center text-white active:scale-95 transition">
            <i class="fa-solid fa-phone text-xs"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- VIEW 1: INBOX CHAT LIST (WhatsApp iOS style) -->
    <main id="wa-view-inbox" class="flex-1 overflow-y-auto no-scrollbar flex flex-col bg-[#0B141A]">
      <!-- Search pill bar -->
      <div class="px-3 py-2 bg-[#111b21]/40 border-b border-white/5">
        <div class="bg-[#202c33] rounded-xl px-3 py-1.5 flex items-center space-x-2 text-xs text-zinc-400">
          <i class="fa-solid fa-magnifying-glass text-[11px]"></i>
          <span>Cari chat atau pesan...</span>
        </div>
      </div>

      <!-- Chat Item Stream -->
      <div id="wa-inbox-list" class="flex flex-col divide-y divide-white/5">
        ${mockInbox.map(c => `
          <div class="inbox-item flex items-center px-4 py-3 hover:bg-[#202c33]/50 cursor-pointer active:bg-[#202c33] transition" data-id="${c.id}">
            <div class="relative w-12 h-12 rounded-full overflow-hidden shrink-0 mr-3 border border-white/10">
              <img class="w-full h-full object-cover" src="${c.avatar}" alt="${c.name}"/>
            </div>
            <div class="flex-1 min-w-0 pr-1">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-semibold text-white truncate ${c.isSpecial ? 'text-amber-300' : ''}">${c.name}</span>
                <span class="text-[11px] text-zinc-400">${c.time}</span>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-xs text-zinc-400 truncate pr-2">${c.lastMsg}</p>
                ${c.unread > 0 ? `
                  <span class="wa-unread-badge bg-[#25D366] text-black font-bold text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                    ${c.unread}
                  </span>
                ` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </main>

    <!-- VIEW 2: STATUS / UPDATES TAB -->
    <main id="wa-view-status" class="flex-1 overflow-y-auto no-scrollbar flex flex-col bg-[#0B141A]" style="display: none;">
      <div class="p-4 flex flex-col space-y-4">
        <h2 class="text-base font-bold text-white">Pembaruan Status</h2>
        ${mockStatuses.map((s, i) => `
          <div class="status-item flex items-center space-x-3 cursor-pointer group active:opacity-75" data-index="${i}">
            <div class="relative w-12 h-12 rounded-full overflow-hidden p-0.5 ${s.hasStory ? 'ring-2 ring-[#25D366]' : s.isMe ? 'ring-2 ring-dashed ring-zinc-500' : ''}">
              <img class="w-full h-full object-cover rounded-full" src="${s.avatar}" alt="${s.name}"/>
              ${s.isMe ? `<div class="absolute bottom-0 right-0 w-4 h-4 bg-[#25D366] rounded-full flex items-center justify-center"><i class="fa-solid fa-plus text-[8px] text-white"></i></div>` : ''}
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-semibold text-white">${s.name}</span>
              <span class="text-xs text-zinc-400">${s.time}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </main>

    <!-- STORY VIEWER OVERLAY (fullscreen, z-50, tersembunyi secara default) -->
    <div id="wa-story-viewer" class="absolute inset-0 z-50 bg-black flex flex-col" style="display: none;">
      <!-- Progress bars -->
      <div id="story-progress-bars" class="flex gap-1 px-3 pt-3 pb-1"></div>

      <!-- Header story -->
      <div class="flex items-center justify-between px-3 py-2 shrink-0">
        <div class="flex items-center space-x-2">
          <div class="w-9 h-9 rounded-full overflow-hidden border border-white/20">
            <img id="story-avatar" class="w-full h-full object-cover" src="" alt=""/>
          </div>
          <div>
            <p id="story-name" class="text-white text-sm font-semibold leading-none"></p>
            <p id="story-time" class="text-white/60 text-[11px] mt-0.5"></p>
          </div>
        </div>
        <button id="story-close-btn" aria-label="Tutup story" class="w-8 h-8 flex items-center justify-center text-white/80 active:opacity-60">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>

      <!-- Konten slide story -->
      <div id="story-slide-content" class="flex-1 flex flex-col items-center justify-center px-6 text-center rounded-2xl mx-3 mb-4 transition-colors duration-300">
        <span id="story-emoji" class="text-7xl mb-5 select-none"></span>
        <p id="story-caption" class="text-white text-base font-medium leading-relaxed"></p>
      </div>

      <!-- Tap zones kiri/kanan untuk navigasi antar slide -->
      <div class="absolute inset-0 top-[100px] bottom-[60px] flex pointer-events-none">
        <div id="story-tap-prev" class="w-1/2 h-full pointer-events-auto cursor-pointer"></div>
        <div id="story-tap-next" class="w-1/2 h-full pointer-events-auto cursor-pointer"></div>
      </div>
    </div>

    <!-- VIEW 4: READONLY CHAT (chat dekoratif selain Satya) -->
    <main id="wa-view-readonly" class="flex-1 overflow-y-auto flex flex-col bg-[#0B141A]" style="display: none; background-image: radial-gradient(#182229 1px, transparent 1px); background-size: 20px 20px;">
      <div class="flex justify-center my-3 select-none">
        <span class="bg-[#182229]/90 text-[#8696a0] text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-md shadow-sm border border-white/5">
          Kemarin
        </span>
      </div>
      <div id="wa-readonly-messages" class="flex flex-col space-y-2.5 px-3.5 pb-4"></div>
    </main>

    <!-- VIEW 3: CHAT DETAIL SCREEN (Stitch Screen 04 & 05) -->
    <main id="wa-view-chat" class="flex-1 flex flex-col justify-between overflow-hidden" style="display: none;">
      <!-- Chat message body -->
      <section id="wa-chat-body" class="flex-1 overflow-y-auto px-3.5 py-3 flex flex-col space-y-2.5 text-[14px]" style="background-color: #0b141a; background-image: radial-gradient(#182229 1px, transparent 1px); background-size: 20px 20px;">
        <div class="flex justify-center my-1 select-none">
          <span class="bg-[#182229]/90 text-[#8696a0] text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-md shadow-sm border border-white/5">
            Hari Ini
          </span>
        </div>
        <div id="wa-message-container" class="flex flex-col space-y-2.5"></div>
        
        <!-- Typing Indicator -->
        <div id="wa-typing-indicator" class="flex items-center space-x-1.5 bg-[#202C33] text-[#8696a0] px-3 py-1.5 rounded-2xl w-fit text-xs" style="display: none;">
          <span>sedang mengetik</span>
          <span class="animate-bounce">.</span>
          <span class="animate-bounce" style="animation-delay: 0.2s">.</span>
          <span class="animate-bounce" style="animation-delay: 0.4s">.</span>
        </div>
      </section>

      <!-- Input Bar Area -->
      <div class="bg-[#1e2428] px-3 py-2 flex items-center space-x-2 shrink-0 border-t border-white/5">
        <button class="text-zinc-400 hover:text-white text-lg px-1"><i class="fa-solid fa-plus"></i></button>
        <div class="flex-1 bg-[#2a3942] rounded-full px-3.5 py-1.5 flex items-center text-sm">
          <span id="wa-input-display" class="text-white min-h-[20px] outline-none flex-1 truncate">Ketik balasan Anda...</span>
        </div>
        <button class="text-zinc-400 hover:text-white text-lg px-1"><i class="fa-solid fa-camera"></i></button>
        <button id="wa-send-btn" class="w-8 h-8 rounded-full bg-[#00a884] text-white flex items-center justify-center active:scale-95 transition-transform">
          <i class="fa-solid fa-paper-plane text-xs"></i>
        </button>
      </div>

      <!-- iOS Dark Keyboard (Stitch Screen 05) -->
      <div id="wa-keyboard" class="bg-[#1b1b1d] pt-2 pb-5 px-1 shrink-0 border-t border-neutral-800">
        <div class="flex justify-center gap-1.5 mb-2 px-1">
          ${['Q','W','E','R','T','Y','U','I','O','P'].map(k => `
            <button type="button" class="wa-key flex-1 h-[42px] bg-[#424244] text-white rounded-[5px] text-[17px] font-normal flex items-center justify-center active:bg-white active:text-black transition shadow-sm" data-key="${k}">${k}</button>
          `).join('')}
        </div>
        <div class="flex justify-center gap-1.5 mb-2 px-4">
          ${['A','S','D','F','G','H','J','K','L'].map(k => `
            <button type="button" class="wa-key flex-1 h-[42px] bg-[#424244] text-white rounded-[5px] text-[17px] font-normal flex items-center justify-center active:bg-white active:text-black transition shadow-sm" data-key="${k}">${k}</button>
          `).join('')}
        </div>
        <div class="flex justify-center gap-1.5 mb-2 px-1">
          <button type="button" class="w-[42px] h-[42px] bg-[#2b2b2d] text-white rounded-[5px] text-[15px] flex items-center justify-center active:bg-[#424244]">
            <i class="fa-solid fa-arrow-up"></i>
          </button>
          ${['Z','X','C','V','B','N','M'].map(k => `
            <button type="button" class="wa-key flex-1 h-[42px] bg-[#424244] text-white rounded-[5px] text-[17px] font-normal flex items-center justify-center active:bg-white active:text-black transition shadow-sm" data-key="${k}">${k}</button>
          `).join('')}
          <button type="button" id="wa-key-backspace" class="w-[42px] h-[42px] bg-[#2b2b2d] text-white rounded-[5px] text-[15px] flex items-center justify-center active:bg-[#424244]">
            <i class="fa-solid fa-delete-left"></i>
          </button>
        </div>
        <div class="flex justify-center gap-1.5 px-1">
          <button type="button" class="w-[40px] h-[40px] bg-[#2b2b2d] text-white rounded-[5px] text-[13px] font-semibold flex items-center justify-center">123</button>
          <button type="button" class="w-[40px] h-[40px] bg-[#2b2b2d] text-white rounded-[5px] text-[18px] flex items-center justify-center">😀</button>
          <button type="button" id="wa-key-space" class="flex-1 h-[40px] bg-[#424244] text-white rounded-[5px] text-[14px] flex items-center justify-center active:bg-white active:text-black">spasi</button>
          <button type="button" id="wa-key-return" class="w-[72px] h-[40px] bg-[#00a884] text-white rounded-[5px] text-[13px] font-semibold flex items-center justify-center active:opacity-80">Kirim</button>
        </div>
      </div>
    </main>

    <!-- BOTTOM TAB NAVIGATION (Obrolan, Status, Komunitas, Panggilan) -->
    <footer id="wa-tab-bar" class="h-14 bg-[#111b21] border-t border-white/10 flex items-center justify-around text-xs text-zinc-400 shrink-0 select-none">
      <button id="tab-btn-chats" class="flex flex-col items-center text-[#25D366] active:scale-95 transition">
        <i class="fa-solid fa-comment-dots text-lg"></i>
        <span class="text-[10px] mt-0.5 font-medium">Obrolan</span>
      </button>
      <button id="tab-btn-status" class="flex flex-col items-center hover:text-white active:scale-95 transition">
        <i class="fa-solid fa-circle-notch text-lg"></i>
        <span class="text-[10px] mt-0.5 font-medium">Pembaruan</span>
      </button>
      <button id="tab-btn-comm" class="flex flex-col items-center hover:text-white active:scale-95 transition">
        <i class="fa-solid fa-users text-lg"></i>
        <span class="text-[10px] mt-0.5 font-medium">Komunitas</span>
      </button>
      <button id="tab-btn-calls" class="flex flex-col items-center hover:text-white active:scale-95 transition">
        <i class="fa-solid fa-phone text-lg"></i>
        <span class="text-[10px] mt-0.5 font-medium">Panggilan</span>
      </button>
    </footer>
  `;

  // Status Time
  function updateTime() {
    const now = new Date();
    const timeEl = container.querySelector('#wa-status-time');
    if (timeEl) {
      timeEl.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }
  }
  updateTime();
  setInterval(updateTime, 1000);

  // Close WhatsApp screen back to phone home
  function closeWhatsApp() {
    triggerHaptic('light');
    container.style.transform = 'translateY(100%)';
    if (typeof onBackToHome === 'function') onBackToHome();
  }
  container.querySelector('#wa-home-pill-btn').addEventListener('click', closeWhatsApp);

  // Views & Headers
  const viewInbox = container.querySelector('#wa-view-inbox');
  const viewStatus = container.querySelector('#wa-view-status');
  const viewChat = container.querySelector('#wa-view-chat');
  const viewReadonly = container.querySelector('#wa-view-readonly');
  const headerInbox = container.querySelector('#wa-header-inbox');
  const headerDetail = container.querySelector('#wa-header-detail');
  const tabBar = container.querySelector('#wa-tab-bar');

  const tabBtnChats = container.querySelector('#tab-btn-chats');
  const tabBtnStatus = container.querySelector('#tab-btn-status');

  function showInbox() {
    currentView = 'inbox';
    viewInbox.style.display = 'flex';
    viewStatus.style.display = 'none';
    viewChat.style.display = 'none';
    viewReadonly.style.display = 'none';

    headerInbox.style.display = 'flex';
    headerDetail.style.display = 'none';
    tabBar.style.display = 'flex';

    tabBtnChats.className = 'flex flex-col items-center text-[#25D366] active:scale-95 transition';
    tabBtnStatus.className = 'flex flex-col items-center text-zinc-400 hover:text-white active:scale-95 transition';
  }

  function showStatus() {
    currentView = 'status';
    viewInbox.style.display = 'none';
    viewStatus.style.display = 'flex';
    viewChat.style.display = 'none';
    viewReadonly.style.display = 'none';

    headerInbox.style.display = 'flex';
    headerDetail.style.display = 'none';
    tabBar.style.display = 'flex';

    tabBtnStatus.className = 'flex flex-col items-center text-[#25D366] active:scale-95 transition';
    tabBtnChats.className = 'flex flex-col items-center text-zinc-400 hover:text-white active:scale-95 transition';
  }

  // ─── STORY VIEWER ────────────────────────────────────────────────────────────
  const storyViewer   = container.querySelector('#wa-story-viewer');
  const storyAvatar   = container.querySelector('#story-avatar');
  const storyName     = container.querySelector('#story-name');
  const storyTime     = container.querySelector('#story-time');
  const storySlide    = container.querySelector('#story-slide-content');
  const storyEmoji    = container.querySelector('#story-emoji');
  const storyCaption  = container.querySelector('#story-caption');
  const storyBars     = container.querySelector('#story-progress-bars');
  const storyClose    = container.querySelector('#story-close-btn');
  const storyPrev     = container.querySelector('#story-tap-prev');
  const storyNext     = container.querySelector('#story-tap-next');

  let storySlides   = [];   // slide aktif saat ini
  let storyIndex    = 0;    // indeks slide
  let storyTimer    = null; // auto-advance timer

  // Tampilkan slide tertentu
  function renderStorySlide(idx) {
    if (!storySlides.length) return;
    storyIndex = Math.max(0, Math.min(idx, storySlides.length - 1));
    const slide = storySlides[storyIndex];

    storySlide.style.backgroundColor = slide.bg;
    storyEmoji.textContent  = slide.emoji  || '';
    storyCaption.textContent = slide.caption || '';

    // Update progress bars
    Array.from(storyBars.children).forEach((bar, i) => {
      const fill = bar.firstElementChild;
      if (i < storyIndex)       fill.style.width = '100%';
      else if (i === storyIndex) fill.style.width = '0%';
      else                       fill.style.width = '0%';

      // Animasi bar aktif
      if (i === storyIndex) {
        fill.style.transition = 'none';
        requestAnimationFrame(() => {
          fill.style.transition = 'width 5s linear';
          fill.style.width = '100%';
        });
      }
    });

    // Auto advance setelah 5 detik
    clearTimeout(storyTimer);
    storyTimer = setTimeout(() => {
      if (storyIndex < storySlides.length - 1) {
        renderStorySlide(storyIndex + 1);
      } else {
        closeStoryViewer();
      }
    }, 5000);
  }

  // Buka story viewer untuk satu kontak
  function openStoryViewer(statusData) {
    if (!statusData.slides || !statusData.slides.length) return;

    storySlides = statusData.slides;
    storyIndex  = 0;

    // Isi header
    storyAvatar.src         = statusData.avatar;
    storyName.textContent   = statusData.name;
    storyTime.textContent   = statusData.time;

    // Buat progress bars sesuai jumlah slide
    storyBars.innerHTML = storySlides.map(() =>
      `<div class="flex-1 h-0.5 bg-white/30 rounded overflow-hidden"><div class="h-full bg-white rounded" style="width:0%"></div></div>`
    ).join('');

    storyViewer.style.display = 'flex';
    renderStorySlide(0);
    triggerHaptic('light');
  }

  function closeStoryViewer() {
    clearTimeout(storyTimer);
    storyViewer.style.display = 'none';
  }

  storyClose.addEventListener('click', () => { triggerHaptic('light'); closeStoryViewer(); });

  // Tap kiri → slide sebelumnya, tap kanan → slide berikutnya
  storyPrev.addEventListener('click', () => {
    triggerHaptic('light');
    if (storyIndex > 0) renderStorySlide(storyIndex - 1);
    else closeStoryViewer();
  });
  storyNext.addEventListener('click', () => {
    triggerHaptic('light');
    if (storyIndex < storySlides.length - 1) renderStorySlide(storyIndex + 1);
    else closeStoryViewer();
  });

  // Klik item status di tab Pembaruan
  container.querySelectorAll('.status-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.index, 10);
      const statusData = mockStatuses[idx];
      if (!statusData) return;

      if (statusData.isMe) {
        triggerHaptic('light');
        // Tampilkan toast "tambah status" sederhana
        const toast = document.createElement('div');
        toast.className = 'absolute bottom-24 left-1/2 -translate-x-1/2 bg-[#202c33] text-white text-xs px-4 py-2 rounded-full z-50 shadow-lg whitespace-nowrap';
        toast.textContent = '📷 Kamera belum tersedia di simulator ini';
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
      } else if (statusData.hasStory) {
        openStoryViewer(statusData);
      }
    });
  });
  // ─── END STORY VIEWER ────────────────────────────────────────────────────────

  function formatMessageText(text) {
    if (!text) return '';
    let escaped = escapeHtml(text);

    // [file: ...]
    escaped = escaped.replace(/\[file:\s*(.*?)\]/g, (m, p1) => `
      <div class="flex items-center gap-2 p-2 my-1 rounded-lg bg-black/30 border border-white/10 text-xs text-white">
        <i class="fa-solid fa-file-lines text-amber-400 text-base"></i>
        <span class="font-medium truncate flex-1">${p1}</span>
      </div>
    `);

    // [image: ...]
    escaped = escaped.replace(/\[image:\s*(.*?)\]/g, (m, p1) => `
      <div class="flex items-center gap-2 p-2 my-1 rounded-lg bg-black/30 border border-emerald-500/20 text-xs text-emerald-300">
        <i class="fa-solid fa-image text-emerald-400 text-base"></i>
        <span class="font-medium truncate flex-1">📷 ${p1}</span>
      </div>
    `);

    // [video: ...]
    escaped = escaped.replace(/\[video:\s*(.*?)\]/g, (m, p1) => `
      <div class="flex items-center gap-2 p-2 my-1 rounded-lg bg-black/30 border border-rose-500/20 text-xs text-rose-300">
        <i class="fa-solid fa-video text-rose-400 text-base"></i>
        <span class="font-medium truncate flex-1">🎥 ${p1}</span>
      </div>
    `);

    // [call: ...]
    escaped = escaped.replace(/\[call:\s*(.*?)\]/g, (m, p1) => `
      <div class="flex items-center gap-2 p-2 my-1 rounded-lg bg-black/30 border border-sky-500/20 text-xs text-sky-300">
        <i class="fa-solid fa-phone text-sky-400 text-sm"></i>
        <span class="font-medium truncate flex-1">${p1}</span>
      </div>
    `);

    // [poll: ...]
    escaped = escaped.replace(/\[poll:\s*(.*?)\]/g, (m, p1) => `
      <div class="flex items-center gap-2 p-2 my-1 rounded-lg bg-black/30 border border-purple-500/20 text-xs text-purple-300">
        <i class="fa-solid fa-square-poll-vertical text-purple-400 text-base"></i>
        <span class="font-medium truncate flex-1">📊 ${p1}</span>
      </div>
    `);

    // [location: ...]
    escaped = escaped.replace(/\[location:\s*(.*?)\]/g, (m, p1) => `
      <div class="flex items-center gap-2 p-2 my-1 rounded-lg bg-black/30 border border-red-500/20 text-xs text-red-300">
        <i class="fa-solid fa-location-dot text-red-400 text-sm"></i>
        <span class="font-medium truncate flex-1">📍 ${p1}</span>
      </div>
    `);

    // [link: ...]
    escaped = escaped.replace(/\[link:\s*(.*?)\]/g, (m, p1) => `
      <div class="flex items-center gap-2 p-2 my-1 rounded-lg bg-black/30 border border-blue-500/20 text-xs text-blue-300">
        <i class="fa-solid fa-link text-blue-400 text-sm"></i>
        <span class="font-medium truncate flex-1">🔗 ${p1}</span>
      </div>
    `);

    return escaped;
  }

  // Buka chat read-only untuk percakapan grup dan riwayat kepanitiaan
  function openReadonlyChat(contact) {
    currentView = 'readonly';
    viewInbox.style.display = 'none';
    viewStatus.style.display = 'none';
    viewChat.style.display = 'none';
    viewReadonly.style.display = 'flex';

    headerInbox.style.display = 'none';
    headerDetail.style.display = 'flex';
    tabBar.style.display = 'none';

    // Hapus badge unread untuk kontak ini
    const itemEl = container.querySelector(`.inbox-item[data-id="${contact.id}"]`);
    if (itemEl) {
      const badge = itemEl.querySelector('.wa-unread-badge');
      if (badge) badge.remove();
    }
    contact.unread = 0;

    // Isi header detail dengan info kontak/grup yang dipilih
    const avatarEl = container.querySelector('#wa-chat-avatar');
    const nameEl = container.querySelector('#wa-contact-name');
    const statusEl = container.querySelector('#wa-contact-status');
    if (avatarEl) avatarEl.src = contact.avatar;
    if (nameEl) nameEl.textContent = contact.name;
    if (statusEl) statusEl.textContent = contact.members || (contact.isGroup ? 'anggota grup' : 'online');

    // Render riwayat pesan read-only
    const readonlyContainer = container.querySelector('#wa-readonly-messages');
    readonlyContainer.innerHTML = '';

    (contact.history || []).forEach(msg => {
      // 1. Tanggal (Date Separator Pill)
      if (msg.isDate) {
        const dateEl = document.createElement('div');
        dateEl.className = 'flex justify-center my-3 select-none sticky top-1 z-10';
        dateEl.innerHTML = `
          <span class="bg-[#182229]/95 text-[#8696a0] text-[10.5px] font-semibold px-3 py-1 rounded-lg shadow-sm border border-white/5 backdrop-blur-sm">
            ${escapeHtml(msg.text)}
          </span>
        `;
        readonlyContainer.appendChild(dateEl);
        return;
      }

      // 2. Pesan Sistem
      if (msg.isSystem) {
        const sysEl = document.createElement('div');
        sysEl.className = 'flex justify-center my-2 select-none';
        sysEl.innerHTML = `
          <span class="bg-[#182229]/70 text-[#8696a0] text-[10px] px-2.5 py-0.5 rounded shadow-sm text-center">
            ${escapeHtml(msg.text)}
          </span>
        `;
        readonlyContainer.appendChild(sysEl);
        return;
      }

      // 3. Pesan Bubble Normal (User vs Other)
      const isUser = msg.sender === 'user';
      const bubble = document.createElement('div');
      bubble.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;

      if (isUser) {
        bubble.innerHTML = `
          <div class="max-w-[82%] bg-[#005C4B] text-[#e9edef] rounded-2xl rounded-tr-sm px-3 pt-2 pb-1.5 shadow-md">
            <p class="leading-relaxed text-[13.5px] whitespace-pre-wrap">${formatMessageText(msg.text)}</p>
            <div class="flex justify-end items-center mt-0.5 space-x-1">
              <span class="text-[9.5px] text-white/60">${msg.time || ''}</span>
              <i class="fa-solid fa-check-double text-[9.5px] text-[#53bdeb]"></i>
            </div>
          </div>
        `;
      } else {
        const nameColor = MEMBER_COLORS[msg.name] || '#53bdeb';
        bubble.innerHTML = `
          <div class="max-w-[82%] bg-[#202c33] text-[#e9edef] rounded-2xl rounded-tl-sm px-3 pt-2 pb-1.5 shadow-md">
            <span class="text-[11px] font-semibold block mb-0.5" style="color: ${nameColor};">${escapeHtml(msg.name || '')}</span>
            <p class="leading-relaxed text-[13.5px] whitespace-pre-wrap">${formatMessageText(msg.text)}</p>
            <div class="flex justify-end items-center mt-0.5 space-x-1">
              <span class="text-[9.5px] text-[#8696a0]">${msg.time || ''}</span>
            </div>
          </div>
        `;
      }

      readonlyContainer.appendChild(bubble);
    });

    // Scroll ke paling bawah
    setTimeout(() => {
      viewReadonly.scrollTop = viewReadonly.scrollHeight;
    }, 50);
  }

  function openChatDetail() {
    currentView = 'chat';
    viewInbox.style.display = 'none';
    viewStatus.style.display = 'none';
    viewReadonly.style.display = 'none';
    viewChat.style.display = 'flex';

    headerInbox.style.display = 'none';
    headerDetail.style.display = 'flex';
    tabBar.style.display = 'none'; // Sembunyikan tab bar saat sedang di ruang obrolan

    // Kembalikan info header chat ke kontak utama (Afif)
    const avatarEl = container.querySelector('#wa-chat-avatar');
    const nameEl = container.querySelector('#wa-contact-name');
    const statusEl = container.querySelector('#wa-contact-status');
    const mainContact = mockInbox[0];
    if (avatarEl) avatarEl.src = state.profile?.contactAvatar || mainContact.avatar;
    if (nameEl) nameEl.textContent = state.profile?.contactName || mainContact.name;
    if (statusEl) statusEl.textContent = 'online';

    // Hapus badge unread untuk chat utama
    const satyaItem = container.querySelector('.inbox-item[data-id="satya"]');
    if (satyaItem) {
      const badge = satyaItem.querySelector('.wa-unread-badge');
      if (badge) badge.remove();
    }
    const satyaContact = mockInbox.find(c => c.id === 'satya');
    if (satyaContact) satyaContact.unread = 0;

    if (!chatLoaded) {
      chatLoaded = true;
      loadChatAdvance(true); // true = langkah awal (pesan pertama kontak langsung tampil tanpa delay animasi)
    }
  }

  tabBtnChats.addEventListener('click', () => {
    triggerHaptic('light');
    showInbox();
  });
  tabBtnStatus.addEventListener('click', () => {
    triggerHaptic('light');
    showStatus();
  });

  container.querySelector('#tab-btn-comm').addEventListener('click', () => {
    triggerHaptic('light');
    alert('👥 Komunitas: Tidak ada komunitas baru.');
  });
  container.querySelector('#tab-btn-calls').addEventListener('click', () => {
    triggerHaptic('light');
    alert('📞 Riwayat Panggilan: Panggilan tak terjawab dari Satya (23:14 WIB)');
  });

  // Back to Inbox from Chat Detail
  container.querySelector('#wa-back-to-inbox').addEventListener('click', () => {
    triggerHaptic('light');
    showInbox();
  });

  // Click on inbox item — Satya buka scripted chat, lainnya buka read-only
  container.querySelectorAll('.inbox-item').forEach(item => {
    item.addEventListener('click', () => {
      triggerHaptic('light');
      const chatId = item.dataset.id;
      if (chatId === 'satya') {
        openChatDetail();
      } else {
        // Cari data kontak dari mockInbox lalu buka read-only
        const contact = mockInbox.find(c => c.id === chatId);
        if (contact) openReadonlyChat(contact);
      }
    });
  });

  // Chat conversation bubble logic
  const msgContainer = container.querySelector('#wa-message-container');
  const chatBody = container.querySelector('#wa-chat-body');
  const typingIndicator = container.querySelector('#wa-typing-indicator');
  const inputDisplay = container.querySelector('#wa-input-display');

  function renderBubble(msg) {
    const isUser = msg.sender === 'user';
    const bubble = document.createElement('div');
    bubble.className = `flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (isUser) {
      bubble.innerHTML = `
        <div class="max-w-[78%] bg-[#005C4B] text-[#e9edef] rounded-2xl rounded-tr-sm px-3 pt-2 pb-1.5 shadow-md relative">
          <p class="leading-relaxed">${escapeHtml(msg.text)}</p>
          <div class="flex justify-end items-center mt-0.5 space-x-1">
            <span class="text-[10px] text-white/60 font-light">${timeStr}</span>
            <i class="fa-solid fa-check-double text-[10px] text-[#53bdeb]"></i>
          </div>
        </div>
      `;
    } else {
      bubble.innerHTML = `
        <div class="max-w-[78%] bg-[#202c33] text-[#e9edef] rounded-2xl rounded-tl-sm px-3 pt-2 pb-1.5 shadow-md relative">
          <p class="leading-relaxed">${escapeHtml(msg.text)}</p>
          <div class="flex justify-end items-center mt-0.5 space-x-1">
            <span class="text-[10px] text-[#8696a0] font-light">${timeStr}</span>
          </div>
        </div>
      `;
    }

    msgContainer.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Elemen input & send button
  const sendBtn = container.querySelector('#wa-send-btn');
  const returnKey = container.querySelector('#wa-key-return');
  const keyboardEl = container.querySelector('#wa-keyboard');
  const contactStatusEl = container.querySelector('#wa-contact-status');

  function updateSendButtonState() {
    const canSend = typingEngine.canSend();
    if (canSend) {
      sendBtn.classList.remove('opacity-40');
      sendBtn.classList.add('opacity-100');
      returnKey.classList.remove('opacity-40');
      returnKey.classList.add('opacity-100');
    } else {
      sendBtn.classList.remove('opacity-100');
      sendBtn.classList.add('opacity-40');
      returnKey.classList.remove('opacity-100');
      returnKey.classList.add('opacity-40');
    }
  }

  // Set initial send button opacity
  updateSendButtonState();

  // Panggil advance dari backend
  async function loadChatAdvance(isInitial = false) {
    isTyping = true;
    keyboardEl.style.opacity = '0.5';
    keyboardEl.style.pointerEvents = 'none';

    try {
      const res = await advanceChatApi(state.token || state.session?.token);
      if (res.ok && res.data) {
        if (res.data.token) {
          state.token = res.data.token;
          if (state.session) state.session.token = res.data.token;
        }

        const items = res.data.items || [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (isInitial && i === 0) {
            // Pesan pertama tampil instan tanpa animasi sesuai PRD F4.4
            renderBubble({ sender: 'friend', text: item.text });
          } else {
            const delay = typeof item.delayMs === 'number' ? item.delayMs : 500;
            const typingDuration = typeof item.typingMs === 'number' ? item.typingMs : Math.min(1800, 300 + 35 * (item.text || '').length);

            await new Promise(r => setTimeout(r, delay));
            contactStatusEl.textContent = 'sedang mengetik...';
            typingIndicator.style.display = 'flex';
            chatBody.scrollTop = chatBody.scrollHeight;

            await new Promise(r => setTimeout(r, typingDuration));
            typingIndicator.style.display = 'none';
            contactStatusEl.textContent = 'online';
            renderBubble({ sender: 'friend', text: item.text });
            triggerHaptic('medium');
          }
        }

        if (res.data.expect) {
          typingEngine.reset(res.data.expect);
          isTyping = false;
          keyboardEl.style.opacity = '1';
          keyboardEl.style.pointerEvents = 'auto';
          updateSendButtonState();
        } else if (res.data.done) {
          typingEngine.reset('');
          isTyping = false;
          updateSendButtonState();
          if (typeof onCompleteChat === 'function') onCompleteChat();
        }
      }
    } catch (e) {
      console.error('Gagal advance chat:', e);
      isTyping = false;
      typingIndicator.style.display = 'none';
      contactStatusEl.textContent = 'online';
      keyboardEl.style.opacity = '1';
      keyboardEl.style.pointerEvents = 'auto';
    }
  }

  // Keyboard typing engine listener
  function handleKeyStroke() {
    if (isTyping || !typingEngine.totalLength()) return;
    triggerHaptic('light');

    typingEngine.press();
    const current = typingEngine.text();
    inputDisplay.textContent = current || 'Ketik balasan Anda...';
    updateSendButtonState();
  }

  async function sendCurrentMessage() {
    if (isTyping) return;

    if (!typingEngine.canSend()) {
      triggerHaptic('error');
      sendBtn.classList.add('shake-anim');
      setTimeout(() => sendBtn.classList.remove('shake-anim'), 400);
      return;
    }

    const textToSend = typingEngine.text();
    typingEngine.reset('');
    inputDisplay.textContent = 'Ketik balasan Anda...';
    updateSendButtonState();

    renderBubble({ sender: 'user', text: textToSend });
    triggerHaptic('medium');

    try {
      const res = await sendChatApi(state.token || state.session?.token);
      if (res.ok && res.data?.token) {
        state.token = res.data.token;
        if (state.session) state.session.token = res.data.token;
      }
      await loadChatAdvance(false);
    } catch (e) {
      console.error('Gagal mengirim pesan chat:', e);
    }
  }

  container.querySelectorAll('.wa-key').forEach(k => k.addEventListener('click', handleKeyStroke));
  container.querySelector('#wa-key-space').addEventListener('click', handleKeyStroke);
  sendBtn.addEventListener('click', sendCurrentMessage);
  returnKey.addEventListener('click', sendCurrentMessage);
  container.querySelector('#wa-key-backspace').addEventListener('click', () => {
    if (isTyping) return;
    triggerHaptic('light');
    typingEngine.backspace();
    const current = typingEngine.text();
    inputDisplay.textContent = current || 'Ketik balasan Anda...';
    updateSendButtonState();
  });

  return {
    element: container,
    updateProfile: (profile) => {
      if (!profile) return;
      if (profile.contactName) {
        mockInbox[0].name = profile.contactName;
        const inboxNameEl = container.querySelector('.inbox-item[data-id="satya"] .truncate');
        if (inboxNameEl) inboxNameEl.textContent = profile.contactName;
        const nameEl = container.querySelector('#wa-contact-name');
        if (nameEl && currentView === 'chat') nameEl.textContent = profile.contactName;
      }
      if (profile.contactAvatar) {
        mockInbox[0].avatar = profile.contactAvatar;
        const inboxAvatarEl = container.querySelector('.inbox-item[data-id="satya"] img');
        if (inboxAvatarEl) inboxAvatarEl.src = profile.contactAvatar;
        const avatarEl = container.querySelector('#wa-chat-avatar');
        if (avatarEl && currentView === 'chat') avatarEl.src = profile.contactAvatar;
      }
      if (profile.notifText) {
        mockInbox[0].lastMsg = profile.notifText;
        const inboxMsgEl = container.querySelector('.inbox-item[data-id="satya"] p');
        if (inboxMsgEl) inboxMsgEl.textContent = profile.notifText;
      }
    },
    openScreen: () => {
      container.style.transform = 'translateY(0)';
      showInbox();
    },
    openDirectChat: () => {
      container.style.transform = 'translateY(0)';
      openChatDetail();
    }
  };
}

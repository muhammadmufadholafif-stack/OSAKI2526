/**
 * Spotify Screen Component (PRD F4 + Stitch 06 & 07)
 * Fitur:
 * - Playlist Browser View (Stitch 06)
 * - Fullscreen Now Playing View (Stitch 07) dengan scrubber bar, progress time, shuffle, repeat, dan heart favorite
 * - Mini player bar
 * - Real audio stream playback
 */
import { triggerHaptic } from '../haptics.js';
import { getContentApi } from '../api.js';

export function createSpotifyScreen({ state, onBackToHome, audioPlayer, onTrackChange }) {
  const container = document.createElement('div');
  container.className = 'absolute inset-0 z-30 bg-[#000000] flex flex-col justify-between overflow-hidden select-none transition-transform duration-300 translate-y-full text-white';
  container.id = 'spotify-screen';

  let songs = [];
  let currentSongIndex = 0;
  let isPlaying = false;
  let isLiked = false;
  let isShuffle = true; // Default aktif: shuffle cerdas tanpa double
  let isRepeat = false;
  let playedSongIndices = [];

  // Algoritma Smart Shuffle: Memutar lagu lain secara acak tanpa double (PRD / User Request)
  function getNextSmartShuffleIndex() {
    if (!songs || songs.length <= 1) return 0;

    // Cari lagu yang belum diputar dalam siklus putaran ini
    let unplayed = [];
    for (let i = 0; i < songs.length; i++) {
      if (!playedSongIndices.includes(i) && i !== currentSongIndex) {
        unplayed.push(i);
      }
    }

    // Jika semua lagu dalam playlist sudah pernah diputar, reset siklus baru
    if (unplayed.length === 0) {
      playedSongIndices = [currentSongIndex];
      for (let i = 0; i < songs.length; i++) {
        if (i !== currentSongIndex) {
          unplayed.push(i);
        }
      }
    }

    // Pilih 1 acak dari lagu-lagu yang belum diputar
    const chosenIndex = unplayed[Math.floor(Math.random() * unplayed.length)];
    playedSongIndices.push(chosenIndex);
    return chosenIndex;
  }

  container.innerHTML = `
    <!-- VIEW 1: Playlist Browser (Stitch Screen 06) -->
    <div id="spotify-playlist-view" class="flex-1 flex flex-col justify-between h-full">
      <!-- Top Status Bar & Dynamic Island -->
      <header class="relative z-30 pt-3 px-7 flex justify-between items-center text-white shrink-0">
        <span class="text-[14px] font-semibold tracking-tight text-white/95" id="spotify-status-time">07:53</span>
        <div class="w-[114px] h-[32px] bg-black rounded-full flex items-center justify-between px-2.5 border border-white/5 shadow-sm">
          <div class="w-3 h-3 rounded-full bg-[#0d131f] flex items-center justify-center">
            <div class="w-1.5 h-1.5 rounded-full bg-[#1e293b]/70"></div>
          </div>
          <div class="w-2.5 h-2.5 rounded-full bg-[#18233c]/60"></div>
        </div>
        <div class="flex items-center space-x-1.5 text-white/95">
          <i class="fa-solid fa-signal text-[11px]"></i>
          <i class="fa-solid fa-wifi text-[11px]"></i>
          <div class="w-6 h-3 border border-white/60 rounded-[4px] p-0.5 flex items-center relative">
            <div class="h-full w-4/5 bg-white rounded-[1.5px]"></div>
          </div>
        </div>
      </header>

      <!-- Playlist Main Content Area -->
      <div class="flex-1 overflow-y-auto custom-scroll px-4 pt-1.5 pb-2 flex flex-col space-y-3">
        <!-- Navigation Header -->
        <div class="flex items-center justify-between">
          <button id="spotify-home-btn" class="inline-flex items-center gap-1 px-3 py-1 bg-[#1C1C1E]/80 backdrop-blur-md text-white/90 text-xs font-medium rounded-full border border-white/10 active:scale-95 transition-transform" type="button">
            <i class="fa-solid fa-chevron-left text-[10px]"></i>
            <span>Home</span>
          </button>
          <h1 class="text-xl font-bold tracking-tight text-white">Music</h1>
          <div class="w-12"></div>
        </div>

        <!-- Playlist Info Header -->
        <div class="pt-1">
          <p class="text-[11px] text-neutral-400 font-normal tracking-wide">BIRTHDAY PLAYLIST / on repeat</p>
          <div class="mt-2.5 flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="px-2.5 py-1 bg-[#1DB954] text-black font-bold text-xs rounded-full">Kado Lagu</span>
              <span class="text-xs text-neutral-400" id="spotify-song-count">2 Lagu</span>
            </div>
            <button id="btn-shuffle-play" class="w-10 h-10 rounded-full bg-[#1DB954] text-black flex items-center justify-center shadow-lg active:scale-90 transition-transform">
              <i class="fa-solid fa-play text-sm ml-0.5"></i>
            </button>
          </div>
        </div>

        <!-- Songs List Container -->
        <div id="spotify-tracklist" class="flex flex-col space-y-2 pt-2"></div>
      </div>

      <!-- Mini Player Dock Bar at Bottom -->
      <div id="spotify-mini-player" class="mx-3 mb-4 bg-[#1C1C1E]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 flex items-center justify-between shadow-2xl cursor-pointer active:scale-[0.99] transition-transform">
        <div class="flex items-center space-x-3 min-w-0 flex-1">
          <img id="mini-cover" class="w-11 h-11 rounded-lg object-cover bg-zinc-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUL1Wopa-0RmVbJGJEDDEvvfp1QDNbQvl1MyoD-SACW3DWh_e9oGsC8RqM-gclfstXv-5uvYJb8kShARjezRDOuucZCc6vJzD5It6ZfX26_crXgdl3TqsMCM3BH1pZU3BlAkMbN4ckrFX6kR6MAR7HE2CarptUBmCNWGwToGYbWdbpjv9KVDctsIXMNQpUzWPsBu-QKBeJCwIjgwyWl7fXMmK_0NCw8yyVnAamSTte" alt="Cover"/>
          <div class="flex flex-col min-w-0">
            <span id="mini-title" class="text-xs font-semibold text-white truncate">Abdi Lara Insani</span>
            <span id="mini-artist" class="text-[11px] text-zinc-400 truncate">.Feast</span>
          </div>
        </div>
        <div class="flex items-center space-x-2 pr-1">
          <button id="mini-btn-prev" class="w-8 h-8 flex items-center justify-center text-zinc-300 active:scale-80">
            <i class="fa-solid fa-backward-step text-sm"></i>
          </button>
          <button id="mini-btn-play" class="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center active:scale-80 shadow">
            <i class="fa-solid fa-play text-xs ml-0.5" id="mini-play-icon"></i>
          </button>
          <button id="mini-btn-next" class="w-8 h-8 flex items-center justify-center text-zinc-300 active:scale-80">
            <i class="fa-solid fa-forward-step text-sm"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- VIEW 2: Fullscreen Now Playing Player (Stitch Screen 07_now_playing.html) -->
    <div id="spotify-player-view" class="absolute inset-0 z-40 bg-[#000000] flex flex-col justify-between transition-transform duration-400 translate-y-full px-6 pt-3 pb-4">
      <!-- Ambient Glow Behind Album Artwork -->
      <div class="absolute inset-x-0 top-32 h-64 bg-radial from-orange-500/20 via-emerald-500/10 to-transparent blur-3xl pointer-events-none"></div>

      <!-- Top Nav -->
      <header class="relative z-20 flex items-center justify-between w-full pt-1">
        <button id="np-btn-close" class="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1 backdrop-blur-md">
          <i class="fa-solid fa-chevron-down text-[10px]"></i>
          <span>Daftar</span>
        </button>
        <span class="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Memutar Musik</span>
        <button class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/90">
          <i class="fa-solid fa-ellipsis"></i>
        </button>
      </header>

      <!-- Center Album Art -->
      <div class="relative z-10 w-full aspect-square max-h-[310px] rounded-3xl overflow-hidden shadow-2xl mx-auto border border-white/10 my-auto">
        <img id="np-cover" class="w-full h-full object-cover" src="" alt="Album Cover"/>
        <div class="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
          <span class="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse"></span>
          <span class="text-[10px] font-medium tracking-wide text-white/90">HQ Audio</span>
        </div>
      </div>

      <!-- Song Meta & Heart -->
      <div class="relative z-10 flex items-center justify-between pt-1">
        <div class="space-y-0.5 truncate pr-3">
          <h2 id="np-title" class="text-[20px] font-bold tracking-tight text-white leading-tight truncate">Judul Lagu</h2>
          <p id="np-artist" class="text-xs font-medium text-neutral-400 truncate">Artis</p>
        </div>
        <button id="np-btn-like" class="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 active:scale-90 transition-colors">
          <i class="fa-solid fa-heart text-2xl" id="np-heart-icon"></i>
        </button>
      </div>

      <!-- Scrubber Timeline Bar -->
      <div class="relative z-10 space-y-1 pt-2">
        <div id="np-scrubber" class="relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden">
          <div id="np-progress-fill" class="h-full bg-[#1DB954] rounded-full w-[0%] transition-all"></div>
        </div>
        <div class="flex justify-between items-center text-[10px] font-medium text-neutral-400">
          <span id="np-current-time">00:00</span>
          <span id="np-total-time">-03:30</span>
        </div>
      </div>

      <!-- Full Controls: Shuffle, Prev, Play, Next, Repeat -->
      <div class="relative z-10 flex items-center justify-between px-2 pt-1 pb-2">
        <button id="np-btn-shuffle" class="text-neutral-400 hover:text-white active:scale-90 p-2">
          <i class="fa-solid fa-shuffle text-base"></i>
        </button>
        <button id="np-btn-prev" class="text-white hover:text-white/80 active:scale-90 p-2">
          <i class="fa-solid fa-backward-step text-2xl"></i>
        </button>
        <button id="np-btn-play" class="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-lg">
          <i class="fa-solid fa-play text-2xl ml-1" id="np-play-icon"></i>
        </button>
        <button id="np-btn-next" class="text-white hover:text-white/80 active:scale-90 p-2">
          <i class="fa-solid fa-forward-step text-2xl"></i>
        </button>
        <button id="np-btn-repeat" class="text-neutral-400 hover:text-white active:scale-90 p-2">
          <i class="fa-solid fa-repeat text-base"></i>
        </button>
      </div>

      <!-- Airplay Speaker pill -->
      <div class="relative z-10 flex items-center justify-center pt-1 pb-1">
        <div class="flex items-center space-x-1.5 text-[#1DB954] bg-white/10 px-3 py-1 rounded-full text-[11px] font-medium">
          <i class="fa-brands fa-bluetooth-b"></i>
          <span>AirPlay • iPhone Speaker</span>
        </div>
      </div>
    </div>
  `;

  // Status time
  function updateTime() {
    const now = new Date();
    const timeEl = container.querySelector('#spotify-status-time');
    if (timeEl) timeEl.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }
  updateTime();
  setInterval(updateTime, 1000);

  // Close back to home
  container.querySelector('#spotify-home-btn').addEventListener('click', () => {
    triggerHaptic('light');
    container.style.transform = 'translateY(100%)';
    if (typeof onBackToHome === 'function') onBackToHome();
  });

  const playlistView = container.querySelector('#spotify-playlist-view');
  const playerView = container.querySelector('#spotify-player-view');
  const tracklistEl = container.querySelector('#spotify-tracklist');
  const miniPlayer = container.querySelector('#spotify-mini-player');

  // Open & Close Fullscreen Player
  miniPlayer.addEventListener('click', () => {
    triggerHaptic('light');
    playerView.style.transform = 'translateY(0)';
  });
  container.querySelector('#np-btn-close').addEventListener('click', () => {
    triggerHaptic('light');
    playerView.style.transform = 'translateY(100%)';
  });

  // Track elements
  const miniTitle = container.querySelector('#mini-title');
  const miniArtist = container.querySelector('#mini-artist');
  const miniCover = container.querySelector('#mini-cover');
  const miniPlayIcon = container.querySelector('#mini-play-icon');

  const npTitle = container.querySelector('#np-title');
  const npArtist = container.querySelector('#np-artist');
  const npCover = container.querySelector('#np-cover');
  const npPlayIcon = container.querySelector('#np-play-icon');
  const npProgressFill = container.querySelector('#np-progress-fill');
  const npCurrentTime = container.querySelector('#np-current-time');
  const npTotalTime = container.querySelector('#np-total-time');

  function renderTracklist() {
    tracklistEl.innerHTML = '';
    songs.forEach((song, idx) => {
      const isCurrent = idx === currentSongIndex;
      const row = document.createElement('div');
      row.className = `flex items-center justify-between p-2.5 rounded-xl transition-colors cursor-pointer ${isCurrent ? 'bg-white/10' : 'hover:bg-white/5'}`;
      row.innerHTML = `
        <div class="flex items-center space-x-3 min-w-0 flex-1">
          <span class="w-5 text-center text-xs font-semibold ${isCurrent ? 'text-[#1DB954]' : 'text-neutral-500'}">${idx + 1}</span>
          <img class="w-10 h-10 rounded-md object-cover bg-zinc-800" src="${song.cover || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUL1Wopa-0RmVbJGJEDDEvvfp1QDNbQvl1MyoD-SACW3DWh_e9oGsC8RqM-gclfstXv-5uvYJb8kShARjezRDOuucZCc6vJzD5It6ZfX26_crXgdl3TqsMCM3BH1pZU3BlAkMbN4ckrFX6kR6MAR7HE2CarptUBmCNWGwToGYbWdbpjv9KVDctsIXMNQpUzWPsBu-QKBeJCwIjgwyWl7fXMmK_0NCw8yyVnAamSTte'}" alt="${escapeHtml(song.title)}"/>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-semibold ${isCurrent ? 'text-[#1DB954]' : 'text-white'} truncate">${escapeHtml(song.title)}</span>
            <span class="text-[11px] text-neutral-400 truncate">${escapeHtml(song.artist)}</span>
          </div>
        </div>
        <button class="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white">
          <i class="fa-solid fa-ellipsis"></i>
        </button>
      `;
      row.addEventListener('click', () => {
        playSong(idx);
      });
      tracklistEl.appendChild(row);
    });
  }

  function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function syncPlayerUI(song) {
    if (!song) return;
    miniTitle.textContent = song.title;
    miniArtist.textContent = song.artist;
    npTitle.textContent = song.title;
    npArtist.textContent = `${song.artist} • OSAKIKU Memories`;

    const coverUrl = song.cover || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUL1Wopa-0RmVbJGJEDDEvvfp1QDNbQvl1MyoD-SACW3DWh_e9oGsC8RqM-gclfstXv-5uvYJb8kShARjezRDOuucZCc6vJzD5It6ZfX26_crXgdl3TqsMCM3BH1pZU3BlAkMbN4ckrFX6kR6MAR7HE2CarptUBmCNWGwToGYbWdbpjv9KVDctsIXMNQpUzWPsBu-QKBeJCwIjgwyWl7fXMmK_0NCw8yyVnAamSTte';
    miniCover.src = coverUrl;
    npCover.src = coverUrl;
  }

  function playSong(idx) {
    currentSongIndex = idx;
    if (!playedSongIndices.includes(idx)) {
      playedSongIndices.push(idx);
    }
    const song = songs[currentSongIndex];
    if (!song) return;

    triggerHaptic('light');
    syncPlayerUI(song);

    isPlaying = true;
    miniPlayIcon.className = 'fa-solid fa-pause text-xs';
    npPlayIcon.className = 'fa-solid fa-pause text-2xl';

    const audioSrc = song.src || song.audio;
    if (audioPlayer && audioSrc) {
      audioPlayer.src = audioSrc;
      audioPlayer.play().catch(() => {});
    }
    renderTracklist();
    if (typeof onTrackChange === 'function') {
      onTrackChange(song, true);
    }
  }

  function togglePlay() {
    triggerHaptic('light');
    if (!isPlaying) {
      isPlaying = true;
      miniPlayIcon.className = 'fa-solid fa-pause text-xs';
      npPlayIcon.className = 'fa-solid fa-pause text-2xl';
      if (audioPlayer) audioPlayer.play().catch(() => {});
      if (typeof onTrackChange === 'function' && songs[currentSongIndex]) {
        onTrackChange(songs[currentSongIndex], true);
      }
    } else {
      isPlaying = false;
      miniPlayIcon.className = 'fa-solid fa-play text-xs ml-0.5';
      npPlayIcon.className = 'fa-solid fa-play text-2xl ml-1';
      if (audioPlayer) audioPlayer.pause();
      if (typeof onTrackChange === 'function' && songs[currentSongIndex]) {
        onTrackChange(songs[currentSongIndex], false);
      }
    }
  }

  // Audio Player Time Update
  if (audioPlayer) {
    audioPlayer.addEventListener('timeupdate', () => {
      if (!audioPlayer.duration) return;
      const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      npProgressFill.style.width = `${pct}%`;

      const curM = Math.floor(audioPlayer.currentTime / 60);
      const curS = Math.floor(audioPlayer.currentTime % 60);
      npCurrentTime.textContent = `${String(curM).padStart(2, '0')}:${String(curS).padStart(2, '0')}`;

      const remSec = audioPlayer.duration - audioPlayer.currentTime;
      const remM = Math.floor(remSec / 60);
      const remS = Math.floor(remSec % 60);
      npTotalTime.textContent = `-${String(remM).padStart(2, '0')}:${String(remS).padStart(2, '0')}`;
    });

    audioPlayer.addEventListener('ended', () => {
      if (isRepeat) {
        playSong(currentSongIndex);
      } else {
        const next = isShuffle ? getNextSmartShuffleIndex() : (currentSongIndex + 1) % songs.length;
        playSong(next);
      }
    });
  }

  // Scrubber Click
  container.querySelector('#np-scrubber').addEventListener('click', (e) => {
    if (!audioPlayer || !audioPlayer.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = pos * audioPlayer.duration;
  });

  // Favorite Heart
  const heartBtn = container.querySelector('#np-btn-like');
  const heartIcon = container.querySelector('#np-heart-icon');
  heartBtn.addEventListener('click', () => {
    isLiked = !isLiked;
    triggerHaptic('medium');
    heartBtn.className = isLiked ? 'w-10 h-10 rounded-full flex items-center justify-center text-red-500 scale-110 active:scale-95 transition-all' : 'w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 active:scale-90 transition-all';
  });

  // Shuffle & Repeat Toggles
  const shuffleBtn = container.querySelector('#np-btn-shuffle');
  shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    triggerHaptic('light');
    shuffleBtn.className = isShuffle ? 'text-[#1DB954] active:scale-90 p-2' : 'text-neutral-400 hover:text-white active:scale-90 p-2';
  });

  const repeatBtn = container.querySelector('#np-btn-repeat');
  repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    triggerHaptic('light');
    repeatBtn.className = isRepeat ? 'text-[#1DB954] active:scale-90 p-2' : 'text-neutral-400 hover:text-white active:scale-90 p-2';
  });

  // Mini Play controls
  container.querySelector('#mini-btn-play').addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlay();
  });
  container.querySelector('#np-btn-play').addEventListener('click', togglePlay);

  container.querySelector('#btn-shuffle-play').addEventListener('click', () => {
    if (songs.length > 0) playSong(0);
  });
  container.querySelector('#mini-btn-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    if (songs.length === 0) return;
    const prev = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(prev);
  });
  container.querySelector('#np-btn-prev').addEventListener('click', () => {
    if (songs.length === 0) return;
    const prev = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(prev);
  });
  container.querySelector('#mini-btn-next').addEventListener('click', (e) => {
    e.stopPropagation();
    if (songs.length === 0) return;
    const next = (currentSongIndex + 1) % songs.length;
    playSong(next);
  });
  container.querySelector('#np-btn-next').addEventListener('click', () => {
    if (songs.length === 0) return;
    const next = (currentSongIndex + 1) % songs.length;
    playSong(next);
  });

  return {
    element: container,
    playNext: () => {
      if (songs.length === 0) return;
      playSong((currentSongIndex + 1) % songs.length);
    },
    playPrev: () => {
      if (songs.length === 0) return;
      playSong((currentSongIndex - 1 + songs.length) % songs.length);
    },
    togglePlay: () => {
      if (songs.length === 0) {
        // jika lagu belum pernah dimuat, load dulu lagu pertama lalu putar
        (async () => {
          try {
            const res = await getContentApi(state.token || state.session?.token);
            const rawSongs = res.data?.songs?.items || res.data?.songs || [];
            if (Array.isArray(rawSongs) && rawSongs.length > 0) {
              songs = rawSongs;
              container.querySelector('#spotify-song-count').textContent = `${songs.length} Lagu`;
              renderTracklist();
              playSong(0);
            }
          } catch (e) {}
        })();
        return;
      }
      togglePlay();
    },
    loadSongsIfNeeded: async () => {
      if (songs.length === 0) {
        try {
          const res = await getContentApi(state.token || state.session?.token);
          const rawSongs = res.data?.songs?.items || res.data?.songs || [];
          if (Array.isArray(rawSongs) && rawSongs.length > 0) {
            songs = rawSongs;
            container.querySelector('#spotify-song-count').textContent = `${songs.length} Lagu`;
            renderTracklist();
            if (songs[0]) {
              syncPlayerUI(songs[0]);
              if (typeof onTrackChange === 'function') {
                onTrackChange(songs[0], false);
              }
            }
          }
        } catch (e) {}
      }
    },
    openScreen: async () => {
      container.style.transform = 'translateY(0)';
      if (songs.length === 0) {
        try {
          const res = await getContentApi(state.token || state.session?.token);
          const rawSongs = res.data?.songs?.items || res.data?.songs || [];
          if (Array.isArray(rawSongs) && rawSongs.length > 0) {
            songs = rawSongs;
            container.querySelector('#spotify-song-count').textContent = `${songs.length} Lagu`;
            renderTracklist();
            if (songs[0]) {
              syncPlayerUI(songs[0]);
              if (typeof onTrackChange === 'function') {
                onTrackChange(songs[0], false);
              }
            }
          }
        } catch (e) {}
      }
    }
  };
}

/**
 * audio-player.js (PRD F5)
 * Pembungkus elemen <audio> tunggal untuk mengontrol musik di seluruh web.
 * Musik tetap jalan saat pindah app (Home, WhatsApp, Galeri).
 */
export function createAudioPlayer({ onTrackChange, onTimeUpdate, onEnded, onError }) {
  const audio = new Audio();
  let playlist = [];
  let currentIndex = 0;
  let isPlaying = false;

  // Event listeners audio bawaan
  audio.addEventListener('timeupdate', () => {
    if (typeof onTimeUpdate === 'function') {
      onTimeUpdate({
        currentTime: audio.currentTime,
        duration: audio.duration || 0,
        progressPercent: audio.duration ? (audio.currentTime / audio.duration) * 100 : 0
      });
    }
  });

  audio.addEventListener('ended', () => {
    if (typeof onEnded === 'function') onEnded();
    // Putar otomatis lagu berikutnya (PRD F5)
    nextTrack();
  });

  audio.addEventListener('error', (e) => {
    if (typeof onError === 'function') onError(e);
  });

  function setPlaylist(tracks, startIndex = 0) {
    playlist = Array.isArray(tracks) ? tracks : [];
    currentIndex = startIndex;
    if (playlist.length > 0) {
      loadTrack(currentIndex);
    }
  }

  function loadTrack(index) {
    if (index < 0 || index >= playlist.length) return;
    currentIndex = index;
    const track = playlist[currentIndex];
    audio.src = track.audio;
    if (typeof onTrackChange === 'function') {
      onTrackChange(track, currentIndex);
    }
  }

  async function play() {
    try {
      await audio.play();
      isPlaying = true;
      return true;
    } catch {
      isPlaying = false;
      return false;
    }
  }

  function pause() {
    audio.pause();
    isPlaying = false;
  }

  function togglePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
    return isPlaying;
  }

  function nextTrack() {
    if (playlist.length === 0) return;
    let nextIdx = currentIndex + 1;
    if (nextIdx >= playlist.length) {
      nextIdx = 0; // kembali ke awal (PRD F5)
    }
    loadTrack(nextIdx);
    play();
  }

  function prevTrack() {
    if (playlist.length === 0) return;
    let prevIdx = currentIndex - 1;
    if (prevIdx < 0) {
      prevIdx = playlist.length - 1;
    }
    loadTrack(prevIdx);
    play();
  }

  function seek(percent) {
    if (audio.duration) {
      audio.currentTime = (percent / 100) * audio.duration;
    }
  }

  return {
    setPlaylist,
    loadTrack,
    play,
    pause,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    getCurrentTrack() {
      return playlist[currentIndex] || null;
    },
    isPlaying() {
      return isPlaying;
    }
  };
}

/**
 * Vault / Secret File Screen Component (Stitch 10 & 11)
 * Bertema AU Mystery: Berkas Rahasia Kasus Zahira.
 * Fitur:
 * - Status Dekripsi Berkas (Status Dokumen Rahasia)
 * - Transmisi Enkripsi / Pilih Kanal Rahasia (DANA, GoPay, OVO, ShopeePay / Jalur Aman)
 * - Rekaman Bukti Audio & Arsip Rahasia
 * - Transmisi Berhasil / Bukti Terkirim (Stitch 11)
 */
import { triggerHaptic } from '../haptics.js';
import { getHadiahApi, claimHadiahApi } from '../api.js';

export function createHadiahScreen({ state, onBackToHome }) {
  const container = document.createElement('div');
  container.className = 'absolute inset-0 z-30 bg-[#0d0e12] flex flex-col justify-between overflow-y-auto no-scrollbar select-none transition-transform duration-300 translate-y-full text-[#e3e2e7]';
  container.id = 'hadiah-screen';

  let vaultData = null;
  let selectedMethod = 'DANA';

  container.innerHTML = `
    <!-- Top System Header (Stitch Screen 10) -->
    <header class="sticky top-0 inset-x-0 z-40 bg-[#0d0e12]/95 backdrop-blur-xl border-b border-white/5">
      <div class="w-full flex items-center justify-between px-6 pt-3 pb-1 text-white">
        <span class="text-[14px] font-semibold" id="hadiah-status-time">07:54</span>
        <div class="h-7 px-3.5 bg-black/90 rounded-full flex items-center justify-center gap-1.5 shadow-md border border-white/10">
          <i class="fa-solid fa-lock-open text-amber-400 text-xs"></i>
          <span class="text-[11px] text-zinc-300 font-medium">Berkas Didekripsi</span>
        </div>
        <div class="flex items-center gap-1 text-white">
          <i class="fa-solid fa-signal text-[11px]"></i>
          <i class="fa-solid fa-wifi text-[11px]"></i>
          <div class="w-5 h-2.5 border border-white/80 rounded-[3px] p-[1px] flex items-center">
            <div class="h-full w-full bg-white rounded-[1px]"></div>
          </div>
        </div>
      </div>

      <!-- In-App Header -->
      <div class="h-12 px-4 flex items-center justify-between">
        <button id="hadiah-home-btn" class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/80 backdrop-blur-xl text-amber-400 active:scale-95 transition-transform" type="button">
          <i class="fa-solid fa-chevron-left text-xs"></i>
          <span class="text-xs text-white font-medium">Home</span>
        </button>
        <h1 class="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
          <i class="fa-solid fa-gift text-amber-400 text-xs"></i>
          <span>Kado Spesial</span>
        </h1>
        <div class="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-amber-400">
          <i class="fa-solid fa-cake-candles text-sm"></i>
        </div>
      </div>
    </header>

    <!-- Main Content Container: Dokumen Rahasia -->
    <main class="flex-1 flex flex-col px-4 pt-3 pb-8 gap-4" id="hadiah-main-view">
      <!-- Classified Dossier Card -->
      <div class="w-full relative rounded-2xl bg-[#16181f] p-4 shadow-xl overflow-hidden border border-amber-500/20">
        <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-80"></div>
        <div class="flex flex-col gap-2 relative z-10">
          <div class="flex items-center justify-between">
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 text-amber-400 text-[10px] font-bold tracking-wider border border-amber-500/30">
              <i class="fa-solid fa-gift text-[10px]"></i>
              <span>BIRTHDAY GIFT // SPECIAL FOR YOU</span>
            </div>
            <span class="text-[10px] text-zinc-400 font-mono">SPECIAL DAY</span>
          </div>

          <h2 class="text-base font-bold text-white mt-1" id="hadiah-greeting-title">
            SELAMAT ULANG TAHUN! 🎉🎂
          </h2>
          <p class="text-xs text-zinc-300 leading-relaxed font-sans" id="hadiah-greeting-text">
            Semoga panjang umur, sehat selalu, dan tercapai semua impianmu! Ada sedikit kado spesial buat kamu nih.
          </p>

          <div class="flex items-center gap-2.5 pt-2 border-t border-white/5 mt-1">
            <div class="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden shrink-0 border border-white/10">
              <img class="w-full h-full object-cover" src="/assets/rina/f-a1b2.jpg" alt="Fanskey"/>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-[11px] font-semibold text-white">Dari: Fanskey</span>
              <span class="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <i class="fa-solid fa-heart text-[9px]"></i>
                Tersimpan Spesial Untukmu
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Dana / Kompensasi Penyelidikan Card -->
      <div class="w-full rounded-2xl bg-[#12141a] p-4 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-lg border border-white/5">
        <span class="text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-0.5 font-mono">Kado Ulang Tahun</span>
        <div class="flex items-baseline justify-center gap-1 my-0.5">
          <span class="text-lg font-bold text-amber-400">Rp</span>
          <span class="text-3xl font-extrabold text-white tracking-tight font-mono" id="hadiah-amount">500.000</span>
        </div>
        <div class="inline-flex items-center gap-1 px-2.5 py-0.5 mt-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
          <i class="fa-solid fa-circle-check text-[9px]"></i>
          <span>Kado Siap Ditransfer • E-Wallet Pilihanmu</span>
        </div>
      </div>

      <!-- Form Transmisi Jalur Aman -->
      <div class="flex flex-col gap-2 w-full">
        <label class="text-xs font-semibold text-zinc-300">Pilih E-Wallet Penerima:</label>
        <!-- Metode Chip Grid -->
        <div class="grid grid-cols-4 gap-2 w-full">
          ${['DANA', 'GoPay', 'OVO', 'ShopeePay'].map(m => `
            <button type="button" class="method-chip flex flex-col items-center justify-center p-2 rounded-xl border ${m === selectedMethod ? 'bg-amber-500 text-black border-amber-400 font-bold' : 'bg-[#1e1f23] text-zinc-300 border-white/5 font-medium'} active:scale-95 transition-all text-xs" data-method="${m}">
              <span class="truncate">${m}</span>
            </button>
          `).join('')}
        </div>

        <div class="mt-2 flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-zinc-300">Nomor Akun / Handphone:</label>
          <input type="tel" id="input-account-number" placeholder="Contoh: 08123456789" class="w-full bg-[#1e1f23] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition font-mono"/>
          <span class="text-[10px] text-zinc-400">Nomor kamu aman dan hanya dipakai untuk mengirim kado.</span>
        </div>

        <button id="btn-submit-claim" class="w-full mt-2 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
          <span>Klaim Kado Sekarang 🎁</span>
          <i class="fa-solid fa-arrow-right text-xs"></i>
        </button>
      </div>
    </main>

    <!-- SUCCESS RECEIPT VIEW (Stitch Screen 11_hadiah_success.html) -->
    <div id="hadiah-success-view" class="flex-1 flex flex-col px-4 pt-3 pb-8 gap-4" style="display: none;">
      <div class="relative flex flex-col items-center text-center pt-2 pb-4 overflow-hidden">
        <div class="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.35)] mb-3 text-black text-3xl font-black">
          <i class="fa-solid fa-check"></i>
        </div>
        <h2 class="text-xl font-bold text-white tracking-tight">Kado Berhasil Diklaim! 🎁</h2>
        <p class="text-xs text-zinc-300 mt-1 font-sans">Kado sedang dalam perjalanan ke e-wallet kamu.</p>
      </div>

      <!-- Classified Receipt Card -->
      <div class="w-full bg-[#16181f] rounded-2xl p-4 shadow-xl border border-white/5 flex flex-col gap-3 font-mono">
        <div class="flex items-center justify-between pb-2 border-b border-white/5">
          <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">Bukti Klaim Kado</span>
          <span class="text-[11px] text-amber-400 bg-zinc-800 px-2 py-0.5 rounded-full" id="receipt-id">#GIFT-SUCCESS</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="text-zinc-400">Penerima</span>
          <span class="font-semibold text-white" id="receipt-recipient">Rina</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="text-zinc-400">E-Wallet</span>
          <span class="font-semibold text-white" id="receipt-method">DANA • 0812***</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="text-zinc-400">Nominal Kado</span>
          <span class="font-bold text-amber-400 text-sm" id="receipt-amount">Rp 500.000</span>
        </div>
      </div>

      <button id="btn-back-home-success" class="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl active:scale-95 transition-transform mt-2">
        Kembali ke Layar Utama
      </button>
    </div>
  `;

  // Status time
  function updateTime() {
    const now = new Date();
    const timeEl = container.querySelector('#hadiah-status-time');
    if (timeEl) timeEl.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }
  updateTime();
  setInterval(updateTime, 1000);

  // Close back to home
  function closeScreen() {
    triggerHaptic('light');
    container.style.transform = 'translateY(100%)';
    if (typeof onBackToHome === 'function') onBackToHome();
  }
  container.querySelector('#hadiah-home-btn').addEventListener('click', closeScreen);
  container.querySelector('#btn-back-home-success').addEventListener('click', closeScreen);

  // Method Chip Selection
  container.querySelectorAll('.method-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      triggerHaptic('light');
      selectedMethod = chip.dataset.method;
      container.querySelectorAll('.method-chip').forEach(c => {
        if (c.dataset.method === selectedMethod) {
          c.className = 'method-chip flex flex-col items-center justify-center p-2 rounded-xl border bg-amber-500 text-black border-amber-400 font-bold active:scale-95 transition-all text-xs';
        } else {
          c.className = 'method-chip flex flex-col items-center justify-center p-2 rounded-xl border bg-[#1e1f23] text-zinc-300 border-white/5 font-medium active:scale-95 transition-all text-xs';
        }
      });
    });
  });

  // Submit Claim Handler
  const mainView = container.querySelector('#hadiah-main-view');
  const successView = container.querySelector('#hadiah-success-view');
  const inputAcc = container.querySelector('#input-account-number');

  container.querySelector('#btn-submit-claim').addEventListener('click', async () => {
    const accNumber = inputAcc.value.trim();
    if (!accNumber || accNumber.length < 5) {
      triggerHaptic('error');
      alert('Silakan masukkan nomor akun / e-wallet yang valid.');
      return;
    }

    triggerHaptic('medium');
    try {
      const res = await claimHadiahApi(state.token || state.session?.token, {
        method: selectedMethod,
        account: accNumber
      });

      if (res.ok) {
        triggerHaptic('success');
        container.querySelector('#receipt-recipient').textContent = state.recipientName || state.session?.recipientName || 'Agen Rina';
        container.querySelector('#receipt-method').textContent = `${selectedMethod} • ${accNumber}`;
        container.querySelector('#receipt-amount').textContent = vaultData?.amount ? `Rp ${Number(vaultData.amount).toLocaleString('id-ID')}` : 'Rp 500.000';

        mainView.style.display = 'none';
        successView.style.display = 'flex';
      } else {
        alert(res.data?.error || res.data?.message || 'Gagal memproses transmisi berkas.');
      }
    } catch (e) {
      alert('Terjadi kesalahan saat memproses transmisi.');
    }
  });

  return {
    element: container,
    openScreen: async () => {
      container.style.transform = 'translateY(0)';
      try {
        const res = await getHadiahApi(state.token || state.session?.token);
        if (res.ok && res.data) {
          vaultData = res.data;
          if (vaultData.title) {
            container.querySelector('#hadiah-greeting-title').textContent = vaultData.title;
          }
          if (vaultData.message && Array.isArray(vaultData.message)) {
            container.querySelector('#hadiah-greeting-text').textContent = vaultData.message.join(' ');
          }
          if (vaultData.amount) {
            container.querySelector('#hadiah-amount').textContent = Number(vaultData.amount).toLocaleString('id-ID');
          }
        }
      } catch (e) {}
    }
  };
}

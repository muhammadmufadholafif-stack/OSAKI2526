/**
 * hadiah.js (PRD F7 & 12.4/12.5)
 * Layar Hadiah: ucapan, form klaim, konfirmasi, dan status akhir.
 * Status: LOCKED (chat belum selesai), UNLOCKED (siap diklaim), CLAIMED (sudah diklaim).
 */
import { triggerHaptic } from '../haptics.js';
import { getHadiahApi, claimHadiahApi } from '../api.js';

export function createHadiahScreen({ state, onBackToHome }) {
  const container = document.createElement('div');
  container.className = 'absolute inset-0 z-30 bg-[#000000] flex flex-col overflow-y-auto no-scrollbar select-none transition-transform duration-300 translate-y-full';
  container.id = 'hadiah-screen';

  let hadiahData = null;
  let selectedProvider = 'DANA';
  let showingConfirmation = false;

  container.innerHTML = `
    <!-- Header iOS-style -->
    <header class="sticky top-0 z-40 bg-[#000000]/95 backdrop-blur-lg border-b border-white/10">
      <div class="flex items-center justify-between px-4 h-12">
        <button id="hadiah-back-btn" class="text-[#FF9F0A] text-[17px] active:opacity-50 transition-opacity" type="button">
          ‹ Home
        </button>
        <h1 class="text-[17px] font-semibold text-white">Hadiah</h1>
        <div class="w-12"></div>
      </div>
    </header>

    <!-- Main Content: Form Klaim -->
    <main class="flex-1 flex flex-col px-6 py-6 gap-6" id="hadiah-form-view">
      <!-- Kartu Ucapan -->
      <div class="bg-[#1C1C1E] rounded-2xl p-6 space-y-4">
        <div class="space-y-2">
          <h2 class="text-[24px] font-bold text-white" id="hadiah-title">Selamat Ulang Tahun!</h2>
          <div id="hadiah-message" class="text-[15px] text-[#8E8E93] leading-relaxed space-y-2"></div>
        </div>
        <div class="pt-4 border-t border-white/10">
          <p class="text-[13px] text-[#FF9F0A] font-medium" id="hadiah-gift-label">Kado dari Fanskey</p>
        </div>
      </div>

      <!-- Form Klaim -->
      <div class="space-y-4">
        <div>
          <label class="text-[13px] text-[#8E8E93] mb-2 block">Pilih Metode Pembayaran</label>
          <div id="provider-grid" class="grid grid-cols-2 gap-2"></div>
        </div>

        <div id="bank-name-section" class="hidden">
          <label class="text-[13px] text-[#8E8E93] mb-2 block">Nama Bank</label>
          <input type="text" id="input-bank-name" placeholder="Contoh: BCA" 
            class="w-full bg-[#1C1C1E] border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-[#3A3A3C] focus:outline-none focus:border-[#FF9F0A] transition"/>
        </div>

        <div>
          <label class="text-[13px] text-[#8E8E93] mb-2 block">Nomor Akun / HP (8-16 digit)</label>
          <input type="tel" id="input-account-number" placeholder="08123456789" inputmode="numeric"
            class="w-full bg-[#1C1C1E] border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-[#3A3A3C] focus:outline-none focus:border-[#FF9F0A] transition"/>
        </div>

        <div>
          <label class="text-[13px] text-[#8E8E93] mb-2 block">Nama Pemilik Akun (opsional)</label>
          <input type="text" id="input-account-name" placeholder="Nama lengkap" 
            class="w-full bg-[#1C1C1E] border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-[#3A3A3C] focus:outline-none focus:border-[#FF9F0A] transition"/>
        </div>

        <button id="btn-submit-claim" class="w-full py-4 bg-[#FF9F0A] text-black text-[17px] font-semibold rounded-xl active:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
          Klaim Hadiah
        </button>
      </div>
    </main>

    <!-- Konfirmasi Dialog -->
    <div id="confirmation-overlay" class="hidden fixed inset-0 z-50 bg-black/60 flex items-end justify-center pb-6 px-6">
      <div class="bg-[#1C1C1E] rounded-2xl w-full max-w-md overflow-hidden">
        <div class="p-6 space-y-4">
          <h3 class="text-[20px] font-bold text-white text-center">Konfirmasi Klaim</h3>
          <div class="text-[15px] text-[#8E8E93] text-center space-y-1">
            <p id="confirm-text">Nomor yang akan dipakai:</p>
            <p class="text-white font-semibold" id="confirm-detail">08123456789 di DANA</p>
            <p class="text-[13px] mt-2">Sudah benar?</p>
          </div>
        </div>
        <div class="grid grid-cols-2 border-t border-white/10">
          <button id="btn-confirm-cancel" class="py-4 text-[17px] text-[#FF9F0A] active:bg-white/5 transition-colors border-r border-white/10">
            Ubah
          </button>
          <button id="btn-confirm-yes" class="py-4 text-[17px] text-white font-semibold active:bg-white/5 transition-colors">
            Ya, Klaim
          </button>
        </div>
      </div>
    </div>

    <!-- Status Loading -->
    <div id="loading-overlay" class="hidden fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div class="bg-[#1C1C1E] rounded-2xl p-8 flex flex-col items-center space-y-4">
        <div class="w-12 h-12 border-4 border-[#FF9F0A] border-t-transparent rounded-full animate-spin"></div>
        <p class="text-white text-[15px]">Mengirim klaim...</p>
      </div>
    </div>

    <!-- Status Akhir: Sukses -->
    <div id="success-view" class="hidden flex-1 flex flex-col px-6 py-6 gap-6">
      <div class="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <div class="w-20 h-20 rounded-full bg-[#34C759] flex items-center justify-center">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div class="space-y-2">
          <h2 class="text-[24px] font-bold text-white">Saldo sedang dikirim 💌</h2>
          <p class="text-[15px] text-[#8E8E93]">Tunggu sebentar ya, hadiah akan segera sampai!</p>
        </div>
        <div class="bg-[#1C1C1E] rounded-2xl p-4 w-full space-y-2">
          <div class="flex justify-between text-[13px]">
            <span class="text-[#8E8E93]">Metode</span>
            <span class="text-white font-medium" id="success-provider">DANA</span>
          </div>
          <div class="flex justify-between text-[13px]">
            <span class="text-[#8E8E93]">Nomor</span>
            <span class="text-white font-medium font-mono" id="success-number">***789</span>
          </div>
        </div>
      </div>
      <button id="btn-back-home" class="w-full py-4 bg-[#FF9F0A] text-black text-[17px] font-semibold rounded-xl active:opacity-80 transition-opacity">
        Kembali ke Home
      </button>
    </div>

    <!-- Status Akhir: Error -->
    <div id="error-view" class="hidden flex-1 flex flex-col px-6 py-6 gap-6">
      <div class="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <div class="w-20 h-20 rounded-full bg-[#FF3B30] flex items-center justify-center">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <div class="space-y-2">
          <h2 class="text-[24px] font-bold text-white">Gagal Mengirim</h2>
          <p class="text-[15px] text-[#8E8E93]" id="error-message">Terjadi kesalahan. Coba lagi ya.</p>
        </div>
      </div>
      <button id="btn-retry" class="w-full py-4 bg-[#FF9F0A] text-black text-[17px] font-semibold rounded-xl active:opacity-80 transition-opacity">
        Coba Lagi
      </button>
    </div>
  `;

  // Elemen-elemen view
  const formView = container.querySelector('#hadiah-form-view');
  const successView = container.querySelector('#success-view');
  const errorView = container.querySelector('#error-view');
  const confirmationOverlay = container.querySelector('#confirmation-overlay');
  const loadingOverlay = container.querySelector('#loading-overlay');

  // Input elements
  const providerGrid = container.querySelector('#provider-grid');
  const bankNameSection = container.querySelector('#bank-name-section');
  const inputBankName = container.querySelector('#input-bank-name');
  const inputAccountNumber = container.querySelector('#input-account-number');
  const inputAccountName = container.querySelector('#input-account-name');
  const btnSubmitClaim = container.querySelector('#btn-submit-claim');

  // Function: Close screen
  function closeScreen() {
    triggerHaptic('light');
    container.style.transform = 'translateY(100%)';
    setTimeout(() => {
      if (typeof onBackToHome === 'function') onBackToHome();
    }, 300);
  }
  
  container.querySelector('#hadiah-back-btn').addEventListener('click', closeScreen);
  container.querySelector('#btn-back-home').addEventListener('click', closeScreen);

  // Function: Render provider chips
  function renderProviders(providers) {
    providerGrid.innerHTML = providers.map(p => `
      <button type="button" class="provider-chip px-3 py-3 rounded-xl border text-[13px] font-medium transition-all active:scale-95 ${p === selectedProvider ? 'bg-[#FF9F0A] text-black border-[#FF9F0A]' : 'bg-[#1C1C1E] text-white border-white/10'}" data-provider="${p}">
        ${p}
      </button>
    `).join('');

    // Event listeners untuk chip
    container.querySelectorAll('.provider-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        triggerHaptic('light');
        selectedProvider = chip.dataset.provider;
        renderProviders(providers);

        // Show/hide bank name field
        if (selectedProvider === 'Bank lain') {
          bankNameSection.classList.remove('hidden');
        } else {
          bankNameSection.classList.add('hidden');
          inputBankName.value = '';
        }
      });
    });
  }

  // Function: Validate form
  function validateForm() {
    const accountNumber = inputAccountNumber.value.replace(/[\s-]/g, '');
    const bankName = inputBankName.value.trim();

    if (selectedProvider === 'Bank lain' && (!bankName || bankName.length < 2 || bankName.length > 30)) {
      return { valid: false, message: 'Nama bank harus antara 2-30 karakter' };
    }

    if (!/^\d{8,16}$/.test(accountNumber)) {
      return { valid: false, message: 'Nomor harus berupa 8-16 digit angka' };
    }

    return { valid: true };
  }

  // Function: Show confirmation
  function showConfirmation() {
    const accountNumber = inputAccountNumber.value.replace(/[\s-]/g, '');
    const displayProvider = selectedProvider === 'Bank lain' ? inputBankName.value.trim() : selectedProvider;
    
    container.querySelector('#confirm-detail').textContent = `${accountNumber} di ${displayProvider}`;
    confirmationOverlay.classList.remove('hidden');
    triggerHaptic('light');
  }

  // Function: Hide confirmation
  function hideConfirmation() {
    confirmationOverlay.classList.add('hidden');
    triggerHaptic('light');
  }

  // Function: Submit claim
  async function submitClaim() {
    hideConfirmation();
    loadingOverlay.classList.remove('hidden');

    const payload = {
      provider: selectedProvider,
      bankName: selectedProvider === 'Bank lain' ? inputBankName.value.trim() : null,
      accountNumber: inputAccountNumber.value.trim(),
      accountName: inputAccountName.value.trim() || null
    };

    try {
      const res = await claimHadiahApi(state.token || state.session?.token, payload);
      
      loadingOverlay.classList.add('hidden');

      if (res.ok && res.data && res.data.ok) {
        // Success
        triggerHaptic('success');
        const summary = res.data.summary || {};
        container.querySelector('#success-provider').textContent = summary.provider || selectedProvider;
        container.querySelector('#success-number').textContent = `***${summary.last3 || ''}`;
        
        formView.classList.add('hidden');
        successView.classList.remove('hidden');
      } else {
        // Error dari server
        triggerHaptic('error');
        const errorMsg = res.data?.message || res.data?.error || 'Terjadi kesalahan, coba lagi';
        container.querySelector('#error-message').textContent = errorMsg;
        formView.classList.add('hidden');
        errorView.classList.remove('hidden');
      }
    } catch (err) {
      loadingOverlay.classList.add('hidden');
      triggerHaptic('error');
      container.querySelector('#error-message').textContent = 'Koneksi bermasalah, coba lagi';
      formView.classList.add('hidden');
      errorView.classList.remove('hidden');
    }
  }

  // Event: Submit button
  btnSubmitClaim.addEventListener('click', () => {
    const validation = validateForm();
    if (!validation.valid) {
      triggerHaptic('error');
      alert(validation.message);
      return;
    }
    showConfirmation();
  });

  // Event: Confirmation buttons
  container.querySelector('#btn-confirm-cancel').addEventListener('click', hideConfirmation);
  container.querySelector('#btn-confirm-yes').addEventListener('click', submitClaim);

  // Event: Retry button
  container.querySelector('#btn-retry').addEventListener('click', () => {
    errorView.classList.add('hidden');
    formView.classList.remove('hidden');
  });

  return {
    element: container,
    openScreen: async () => {
      container.style.transform = 'translateY(0)';
      
      try {
        const res = await getHadiahApi(state.token || state.session?.token);
        
        if (res.ok && res.data) {
          hadiahData = res.data;
          
          // Populate title
          if (hadiahData.title) {
            container.querySelector('#hadiah-title').textContent = hadiahData.title;
          }
          
          // Populate message (array of paragraphs)
          if (hadiahData.message && Array.isArray(hadiahData.message)) {
            const messageContainer = container.querySelector('#hadiah-message');
            messageContainer.innerHTML = hadiahData.message.map(p => `<p>${p}</p>`).join('');
          }
          
          // Populate gift label
          if (hadiahData.giftLabel) {
            container.querySelector('#hadiah-gift-label').textContent = hadiahData.giftLabel;
          }
          
          // Render providers
          if (hadiahData.providers && Array.isArray(hadiahData.providers)) {
            renderProviders(hadiahData.providers);
          }
          
          // Check if already claimed
          if (hadiahData.claimed && hadiahData.claimSummary) {
            const summary = hadiahData.claimSummary;
            container.querySelector('#success-provider').textContent = summary.provider || 'E-Wallet';
            container.querySelector('#success-number').textContent = `***${summary.last3 || ''}`;
            formView.classList.add('hidden');
            successView.classList.remove('hidden');
          }
        } else if (res.status === 403) {
          // Locked - seharusnya tidak sampai sini karena ikon Hadiah masih terkunci
          triggerHaptic('error');
          alert('Selesaikan chat dulu ya 👀');
          closeScreen();
        } else {
          // Error lain
          triggerHaptic('error');
          alert('Gagal memuat hadiah');
          closeScreen();
        }
      } catch (err) {
        triggerHaptic('error');
        alert('Koneksi bermasalah');
        closeScreen();
      }
    }
  };
}

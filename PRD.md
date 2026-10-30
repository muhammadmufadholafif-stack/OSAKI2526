# PRD — Simulator HP Ucapan Ulang Tahun (`ultah-hp`)

| Item | Isi |
|---|---|
| Versi dokumen | 1.0 |
| Tanggal | 29 Oktober 2026 |
| Pemilik produk | Fanskey |
| Status | Siap dibangun |
| Dibangun di | Antigravity (agent-assisted IDE) |
| Hosting | Vercel (frontend statis + Serverless Functions) |
| Bahasa kode | HTML, CSS, JavaScript (browser), Node.js 20+ (backend) |
| Bahasa antarmuka | Indonesia |

---

## 0. Cara memakai dokumen ini

**Untuk agent (Antigravity):**

1. Baca **seluruh** dokumen sebelum menulis kode.
2. Kerjakan **per milestone** (Bagian 16), berurutan. Jangan loncat.
3. Setelah tiap milestone: berhenti, jalankan checklist "Definition of Done"-nya, lalu tulis ringkasan singkat apa yang dibuat dan cara mengetesnya.
4. Jangan menambah dependency, framework, atau fitur di luar dokumen ini tanpa konfirmasi.
5. Tulis komentar kode dalam **Bahasa Indonesia** yang jelas. Pemilik produk memakai proyek ini untuk **belajar backend**, jadi kode harus bisa dibaca, bukan sekadar jalan.

**Penanda:**
- **[WAJIB]** harus ada di versi 1.0
- **[OPSIONAL]** dikerjakan hanya kalau milestone utama sudah selesai
- **[KEPUTUSAN]** pilihan default yang sudah diambil; boleh diubah pemilik produk

**Istilah:**
- **Teman** = penerima ucapan ultah (pengguna akhir)
- **Pembuat** = Fanskey (pemilik produk, yang mengisi konten dan menerima notifikasi klaim)
- **Skrip** = urutan pesan chat yang sudah ditulis pembuat
- **Slug** = nama unik di URL per teman, misalnya `rina` pada `/rina`

---

## 1. Ringkasan produk

Sebuah web interaktif berbentuk **simulator HP (gaya iPhone)** yang dipakai sebagai kado ulang tahun. Teman membuka link pribadi, memasukkan PIN, lalu masuk ke "HP" yang isinya cerita: ada notifikasi WhatsApp, chat yang dia "ketik" sendiri (padahal teks sudah diatur), musik, foto kenangan, dan sebuah app **Hadiah** yang baru terbuka setelah chat selesai. Di app Hadiah, teman memilih e-wallet atau bank digital miliknya dan mengirim data klaim ke pembuat, yang kemudian mentransfer saldo secara manual.

Satu project melayani **banyak teman**. Tiap teman punya link, PIN, dan konten sendiri, sementara kodenya satu.

## 2. Latar belakang dan inspirasi

- Inspirasi: AU interaktif berbentuk simulator HP (contoh: halaman "STARA · Interactive AU" di au.jeanverseis). Fitur yang diamati: lock screen dengan PIN, home screen dengan ikon dan widget, notifikasi, WhatsApp dengan keyboard yang bisa diketik, panggilan telepon, Notes, Instagram, X, Safari, dan pemutar musik.
- Hadiah berupa saldo, tapi e-wallet teman belum diketahui. Karena itu teman memilih sendiri e-wallet-nya di dalam web.
- Pembuat ingin sekalian belajar backend, sehingga arsitekturnya sengaja memakai backend nyata (serverless) meski versi statis sebenarnya cukup.

## 3. Tujuan, non-tujuan, dan metrik

### 3.1 Tujuan
1. Memberi pengalaman ucapan ultah yang personal, berkesan, dan terasa seperti HP sungguhan.
2. Membuat teman menyelesaikan cerita (chat sampai habis) lalu membuka Hadiah.
3. Memudahkan pembuat menambah teman baru **tanpa mengubah kode** (cukup file data baru, aset, dan PIN).
4. Menjaga konten hadiah dan PIN **tidak bocor lewat source code browser**.
5. Menjadi bahan belajar backend: serverless function, token bertanda tangan, validasi input, API pihak ketiga, rate limit, dan environment variables.

### 3.2 Non-tujuan (di luar lingkup)
- **Transfer saldo otomatis.** E-wallet personal tidak punya API transfer; payout otomatis butuh akun bisnis terverifikasi. Pembuat transfer manual setelah menerima notifikasi.
- Akun pengguna, registrasi, atau login selain PIN per teman.
- Dashboard admin. Konten dikelola lewat file JSON.
- Chat sungguhan antar pengguna.
- Mode desktop yang kaya. Desktop hanya menampilkan bingkai HP.
- Dukungan multi-bahasa.

### 3.3 Metrik keberhasilan (kualitatif, skala kecil)
| Metrik | Target |
|---|---|
| Teman bisa menyelesaikan alur dari PIN sampai klaim tanpa petunjuk tambahan | Ya, pada tes dengan 2 orang |
| Notifikasi klaim sampai ke Telegram pembuat | < 5 detik setelah tombol Klaim |
| Waktu muat awal di jaringan 4G | < 3 detik (di luar media) |
| Menambah teman baru | < 15 menit kerja |
| Konten Hadiah terbaca tanpa menyelesaikan chat | **Tidak mungkin** lewat klik biasa maupun console browser |

## 4. Persona dan skenario

**Persona A — Teman (penerima).** Usia remaja sampai dewasa muda, membuka link dari WhatsApp lewat **HP** (Android atau iPhone). Tidak tahu isi kejutan. Tidak teknis. Mungkin iseng membuka source atau mencoba tebak PIN.

**Persona B — Pembuat (Fanskey).** Pelajar, bisa coding dasar, memakai Antigravity, ingin belajar backend. Mengisi konten, deploy ke Vercel, menerima notifikasi klaim di Telegram.

**Skenario utama:**
1. Pembuat mengirim link `https://<project>.vercel.app/rina` ke Rina pada hari ulang tahunnya.
2. Rina membuka link, memasukkan PIN yang diberitahukan pembuat.
3. Muncul notifikasi WhatsApp "hai". Rina menekan notifikasi.
4. Rina "mengetik" balasan (tombol apa pun menghasilkan teks yang sudah diatur), mengirimnya, dan chat berlanjut sampai selesai.
5. Ikon Hadiah terbuka. Rina membuka ucapan, memilih GoPay, mengisi nomor, menekan Klaim.
6. Pembuat menerima pesan Telegram dan mentransfer saldo.

---

## 5. Lingkup versi

### v1.0 (dokumen ini)
Lock screen + PIN, home screen, notifikasi WA, WhatsApp dengan scripted typing, Spotify (pemutar musik), Galeri, Hadiah (terkunci sampai chat selesai) dengan form klaim, backend (PIN, token, chat, konten, hadiah, klaim), notifikasi Telegram, multi-teman, deploy Vercel.

### Setelah v1.0 [OPSIONAL]
- Pesan gambar dan voice note di chat
- Panggilan telepon masuk (layar telepon)
- Tema atau wallpaper berbeda per teman
- Klaim sekali per teman memakai Upstash Redis (spesifikasi ada di dokumen, tapi bisa ditunda)

---

## 6. Alur pengguna end-to-end

### 6.1 Diagram status layar

```
        ┌────────┐  PIN benar   ┌────────┐  1,5 dtk   ┌──────────────┐
 buka → │  LOCK  │ ───────────► │  HOME  │ ─────────► │ HOME + NOTIF │
 link   └────────┘              └────────┘            └──────┬───────┘
                                    ▲  │ tap ikon            │ tap notif
                                    │  ▼                     ▼
                          ┌───────────────────┐        ┌───────────┐
                          │ SPOTIFY / GALERI  │        │ WHATSAPP  │◄─┐
                          └───────────────────┘        └─────┬─────┘  │ giliran
                                                             │ chat    │ berikutnya
                                                             │ selesai └──────┘
                                                             ▼
                                                      HADIAH TERBUKA
                                                             │ tap ikon Hadiah
                                                             ▼
                                              ┌───────────────────────────┐
                                              │ HADIAH: ucapan + form klaim│
                                              └──────────────┬────────────┘
                                                             │ Klaim
                                                             ▼
                                                  STATUS "TERKIRIM" (final)
```

### 6.2 Langkah rinci

| # | Langkah | Sistem |
|---|---|---|
| 1 | Teman membuka `/{slug}` | Frontend membaca slug dari `location.pathname`, menampilkan lock screen **generik** (tanpa nama) |
| 2 | Teman memasukkan PIN | `POST /api/pin` → token + profil |
| 3 | Home screen tampil | Wallpaper, jam, 4 app, Hadiah dalam kondisi terkunci |
| 4 | Setelah 1,5 detik | Banner notifikasi WA turun dari atas, ikon WA berbadge "1", getar bila didukung |
| 5 | Teman menekan notifikasi (atau ikon WA) | Chat terbuka; pesan pertama ("hai") sudah tampil |
| 6 | Server membuka segmen chat berikutnya | `POST /api/chat` (action `advance`) |
| 7 | Pesan kontak muncul dengan indikator "sedang mengetik..." | Animasi sesuai `typingMs` |
| 8 | Keyboard aktif, teman mengetik | **Scripted typing**: tombol apa pun memunculkan huruf berikutnya dari balasan yang diatur |
| 9 | Teman menekan Kirim (hanya bila teks lengkap) | `POST /api/chat` (action `send`) |
| 10 | Ulangi langkah 6–9 sampai skrip habis | Server menandai chat selesai di token |
| 11 | Hadiah terbuka | Efek buka kunci; badge pada ikon Hadiah |
| 12 | Teman membuka Hadiah | `GET /api/hadiah` (hanya berhasil jika chat selesai) |
| 13 | Teman memilih e-wallet, mengisi nomor, menekan Klaim | `POST /api/klaim` → Telegram pembuat |
| 14 | Status "Saldo sedang dikirim" | Final; klaim kedua ditolak (jika Redis aktif) |

---

## 7. Spesifikasi fitur

### F1. Lock screen dan PIN **[WAJIB]**

**Deskripsi:** Layar kunci bergaya iPhone dengan jam besar, tanggal, dan PIN pad.

**Aturan:**
- Wallpaper lock screen **generik** (sama untuk semua teman) karena sebelum PIN sistem belum tahu itu teman yang mana secara terpercaya.
- Panjang PIN = `pinLength` di data teman (4–6, default 4). Karena belum ada data sebelum PIN, lock screen memakai **default 4 titik** dan menyesuaikan setelah respons server bila server mengirim `pinLength` pada error `WRONG_PIN`. **[KEPUTUSAN]** Sederhana: semua PIN 4 digit pada v1.0.
- Saat 4 digit terisi, PIN dikirim otomatis (tanpa tombol OK).
- PIN salah: titik bergetar (animasi shake), titik dikosongkan, `navigator.vibrate` bila ada, pesan kecil "PIN salah".
- Setelah 5 kali salah dalam 10 menit (per slug + IP): tampil "Coba lagi nanti" dengan hitung mundur dari `retryAfter`.
- Slug tidak dikenal dan PIN salah **menampilkan pesan yang sama** agar keberadaan slug tidak bocor.
- Tombol "Darurat" dan "Batal" boleh dekoratif.

**Kriteria penerimaan:**
- [ ] PIN benar membuka Home dengan transisi halus (< 500 ms).
- [ ] PIN salah tidak membuka apa pun dan tidak membocorkan alasan (slug salah vs PIN salah).
- [ ] Tidak ada PIN di file frontend maupun di file data publik.
- [ ] Berfungsi dengan tap di HP dan klik di desktop.

### F2. Home screen **[WAJIB]**

**Isi:**
- Status bar: jam (`profile.clockTime`, format `HH:MM`, atau jam nyata bila kosong), ikon sinyal, wifi, baterai (SVG inline).
- Widget jam + tanggal (tanggal dari `profile.dateLabel` atau tanggal nyata).
- **Empat app**: WhatsApp, Spotify, Galeri, Hadiah.
- Home indicator (garis bawah) dekoratif.
- Wallpaper dari `profile.wallpaper` (diambil setelah PIN benar).

**Perilaku ikon:**
- Tap ikon membuka app dengan animasi zoom dari posisi ikon (atau fade bila tidak memungkinkan).
- Ikon WA menampilkan **badge "1"** dari saat notifikasi muncul sampai chat dibuka.
- Ikon Hadiah: kondisi **terkunci** (redup 50%, lencana gembok). Bila ditekan saat terkunci: toast "Selesaikan chat dulu ya 👀" dan getar singkat. Kondisi **terbuka**: normal + badge "1" sampai pertama kali dibuka.
- Tombol home (swipe up atau tap garis bawah) kembali ke Home dari app mana pun.

**Kriteria penerimaan:**
- [ ] Empat ikon tampil rapi di lebar 360–430 px.
- [ ] Tap ikon Hadiah saat terkunci tidak membuka app.
- [ ] Kembali ke Home bekerja dari semua app.

### F3. Notifikasi WhatsApp **[WAJIB]**

- Muncul **1,5 detik** setelah Home tampil, hanya sekali per sesi chat (tidak muncul ulang setelah chat dimulai).
- Banner turun dari atas: ikon WA kecil, nama kontak (`profile.contactName`), teks `profile.notifText` (default `"hai"`), keterangan "sekarang".
- Bunyi notifikasi **[OPSIONAL]** (`assets/default/notif.mp3`); diputar hanya jika sudah ada interaksi pengguna sebelumnya (kebijakan autoplay browser). PIN pad adalah interaksi, jadi biasanya aman.
- Banner bertahan 8 detik lalu menciut; badge ikon tetap sampai chat dibuka.
- Tap banner = buka WhatsApp pada chat dengan kontak itu.

**Kriteria penerimaan:**
- [ ] Banner tampil, bisa ditekan, dan membuka chat.
- [ ] Jika banner terlewat, menekan ikon WA tetap membuka chat yang sama.
- [ ] `notifText` identik dengan pesan pertama di skrip (divalidasi, lihat Bagian 11).

### F4. WhatsApp + Scripted Typing **[WAJIB]**

Ini fitur inti. Tampilannya meniru WhatsApp mode gelap.

**Tampilan:**
- Header: tombol kembali, avatar, nama kontak, status ("online" atau "sedang mengetik...").
- Area pesan: gelembung kontak di kiri, gelembung "saya" (teman) di kanan, jam kecil, centang untuk pesan terkirim.
- Pemisah tanggal ("Hari ini").
- Bar input di bawah, lalu keyboard simulasi.

**Perilaku pesan kontak:**
1. Sebelum tiap pesan kontak: tunggu `delayMs` (default 500 ms).
2. Tampilkan indikator mengetik (status header + gelembung titik tiga) selama `typingMs` (default `min(1800, 300 + 35 × jumlahKarakter)` ms).
3. Ganti dengan gelembung pesan, scroll otomatis ke bawah.
4. **Item pertama skrip dirender instan** tanpa animasi, karena sudah terlihat di notifikasi.

**Perilaku giliran teman (scripted typing):**

Variabel: `target` (teks balasan yang sudah diatur), `pos` (jumlah karakter yang sudah "diketik").

```
onKey(karakter):        // huruf, angka, tanda baca, spasi
    jika pos < panjang(target): pos = pos + 1
    // jika pos sudah sama dengan panjang(target): tombol huruf diabaikan ("langsung berhenti")
    tampilkan target.slice(0, pos) di kolom input

onBackspace():
    jika pos > 0: pos = pos - 1
    tampilkan target.slice(0, pos)

onShift / on123 / onEmoji:
    hanya ubah tampilan keyboard; TIDAK mengubah pos

bisaKirim = (pos == panjang(target))

onSend():
    jika !bisaKirim: animasi shake pada tombol kirim, selesai
    jika bisaKirim: kirim ke server (action "send"), pindahkan teks ke gelembung "saya"
```

**Aturan penting:**
- Pemotongan teks dilakukan per **grapheme** (pakai `Intl.Segmenter` bila ada, fallback `Array.from`) supaya emoji tidak terpotong.
- Ketika teman mengetik lebih panjang dari skrip, **teks langsung berhenti** di karakter terakhir (tidak ada penambahan lagi, tidak ada auto-kirim). **[KEPUTUSAN dari pemilik produk]**
- Tombol Kirim hanya aktif (berwarna) saat teks lengkap; saat belum lengkap tampil redup dan memberi efek shake bila ditekan. **[KEPUTUSAN]**
- Tombol Return pada keyboard setara tombol Kirim.
- Layar keyboard hanya muncul pada giliran teman; saat giliran kontak, keyboard turun dan input nonaktif.
- Keyboard: layout QWERTY iPhone (mode gelap), tombol terangkat (popup huruf) saat ditekan, Shift, tombol 123 (layout angka dan simbol, hanya visual), spasi, return, hapus. Cukup satu layout simbol statis.

**Kriteria penerimaan:**
- [ ] Menekan tombol mana pun (`q`, `z`, `m`, spasi, angka) memunculkan karakter skrip berikutnya.
- [ ] Hapus mundur tepat satu karakter dan karakter yang sama muncul lagi saat mengetik.
- [ ] Setelah teks lengkap, menekan huruf tambahan tidak mengubah teks.
- [ ] Emoji di skrip tampil utuh.
- [ ] Giliran berjalan selang-seling sampai item terakhir.
- [ ] Setelah item terakhir dan chat selesai, ikon Hadiah terbuka (lihat F7).
- [ ] Menutup dan membuka ulang app WA menampilkan riwayat yang sama.

### F5. Spotify (pemutar musik) **[WAJIB]**

**Catatan merek:** tampilan terinspirasi aplikasi musik populer. **Jangan** memakai logo atau aset resmi Spotify; gunakan ikon buatan sendiri (lingkaran hijau dengan tiga gelombang sederhana) dan nama app "Spotify" hanya sebagai label ikon bila pembuat menginginkannya. **[KEPUTUSAN]**

**Tampilan:**
- Layar playlist: judul playlist (`songs.playlistTitle` atau "Lagu untuk {nama}"), daftar lagu (cover, judul, artis, durasi).
- Layar "sedang diputar": cover besar, judul, artis, progress bar yang bisa digeser, waktu berjalan/total, tombol prev, play/pause, next.
- Mini player di bawah layar playlist saat lagu aktif.

**Perilaku:**
- Pemutaran memakai satu elemen `<audio>`; mulai hanya setelah tap pengguna.
- Putar otomatis lagu berikutnya setelah selesai; setelah lagu terakhir kembali ke lagu pertama (tidak loop tak terbatas pada pause).
- Musik **berhenti** saat tab disembunyikan? Tidak; biarkan jalan. Musik terus berjalan saat pindah ke app lain (Home, WA) sampai di-pause atau selesai. **[KEPUTUSAN]**
- Jika file audio gagal dimuat: tampil pesan "Lagu tidak bisa diputar" tanpa menghentikan aplikasi.
- Media Session API **[OPSIONAL]** untuk judul di layar kunci HP asli.

**Kriteria penerimaan:**
- [ ] Play, pause, geser progress, next, prev bekerja di Android Chrome dan iOS Safari.
- [ ] Pindah ke Galeri atau WA tidak menghentikan musik.
- [ ] Skrip `songs` kosong menampilkan keadaan kosong yang rapi (tidak error).

### F6. Galeri **[WAJIB]**

- Grid 3 kolom, gambar persegi (object-fit: cover), pemuatan malas (`loading="lazy"`).
- Tap foto membuka **lightbox** layar penuh: geser kiri/kanan (touch) atau tombol panah (desktop), tombol tutup, nomor "3 / 12", keterangan (`caption`) dan tanggal (`dateLabel`) bila ada.
- Pinch-zoom tidak wajib.
- Header: "Galeri", jumlah foto.

**Kriteria penerimaan:**
- [ ] Grid dan lightbox bekerja dengan 0, 1, dan 30 foto.
- [ ] Geser antar foto terasa halus di HP.
- [ ] Foto yang gagal dimuat menampilkan placeholder, bukan ikon rusak.

### F7. Hadiah **[WAJIB]**

**Status:**
| Status | Kondisi | Tampilan |
|---|---|---|
| `LOCKED` | Chat belum selesai | Ikon redup + gembok; tap = toast |
| `UNLOCKED` | Chat selesai, belum dibuka | Ikon normal + badge "1", animasi buka kunci sekali |
| `OPENED` | Sudah dibuka | Ikon normal |
| `CLAIMED` | Klaim berhasil | Layar menampilkan status terkirim |

**Isi layar Hadiah (setelah `GET /api/hadiah` sukses):**
1. **Kartu ucapan**: judul (`hadiah.title`), pesan ucapan (`hadiah.message`, bisa beberapa paragraf, muncul dengan animasi ketik atau fade-in per paragraf).
2. **Label hadiah**: teks bebas seperti "Kado dari {pembuat}" (`hadiah.giftLabel`). Nominal **tidak wajib** ditampilkan.
3. **Form klaim**:
   - Pilihan metode (chip): DANA, GoPay, OVO, ShopeePay, LinkAja, SeaBank, Jago, Bank lain.
   - Bila "Bank lain": kolom nama bank (2–30 karakter).
   - Kolom nomor (input numerik, 8–16 digit; spasi dan strip dibersihkan).
   - Kolom nama pemilik akun **[OPSIONAL]**, maks 40 karakter.
   - Tombol **Klaim hadiah** (nonaktif sampai input valid).
4. **Konfirmasi singkat** sebelum kirim: "Nomor {nomor} di {metode}. Sudah benar?" dengan tombol Ya dan Ubah.
5. **Status akhir**: animasi loading 1–2 detik, lalu pesan "Saldo sedang dikirim, tunggu ya 💌". Menampilkan metode dan 3 digit terakhir nomor saja.

**Kriteria penerimaan:**
- [ ] Sebelum chat selesai, **tidak ada cara** (klik biasa maupun manipulasi console) memperoleh isi Hadiah: server menolak dengan `403 LOCKED`.
- [ ] Validasi form di klien **dan** di server.
- [ ] Setelah klaim berhasil, membuka ulang Hadiah menampilkan status terkirim, bukan form.
- [ ] Gagal kirim notifikasi menampilkan "Gagal mengirim, coba lagi" dan form tetap bisa dipakai.

### F8. Multi-teman dan routing **[WAJIB]**

- URL `https://<domain>/{slug}` memuat aplikasi yang sama untuk semua teman.
- Slug harus cocok `^[a-z0-9-]{2,30}$`.
- Konten dan PIN dibaca berdasarkan slug di **server**.
- `/` (akar) menampilkan halaman kosong sederhana (tanpa info) dan `noindex`.
- Menambah teman = file data baru + folder aset + satu baris pendaftaran + satu env var PIN (Bagian 19).

### F9. Pemulihan sesi (resume) **[WAJIB, ringan]**

- Setelah PIN benar, klien menyimpan `{ token, riwayatChat }` di `localStorage` dengan kunci `ultah:{slug}`.
- Saat halaman dimuat ulang, lock screen **tetap tampil** (terasa natural). Setelah PIN benar, jika ada token tersimpan yang masih valid untuk slug yang sama, klien memakainya dan memulihkan riwayat chat; jika server menjawab `401`, klien membuang data lama dan memakai token baru.
- Akibatnya: menutup tab di tengah chat tidak mengulang cerita, dan Hadiah yang sudah terbuka tetap terbuka.

**Kriteria penerimaan:**
- [ ] Reload di tengah chat lalu PIN ulang melanjutkan dari giliran terakhir.
- [ ] Token kedaluwarsa tidak merusak aplikasi (otomatis memulai dari awal).

---

## 8. Spesifikasi UI/UX

### 8.1 Layout
- **Mobile (lebar ≤ 500 px):** layar penuh, `height: 100dvh`, memperhatikan `env(safe-area-inset-*)`.
- **Desktop (> 500 px):** bingkai HP berukuran tetap **390 × 844 px**, berada di tengah, diskalakan dengan CSS agar muat tinggi layar. Latar luar gelap polos.
- **Orientasi:** hanya potret. Pada lanskap HP tampil petunjuk "Putar HP ke potret".

### 8.2 Gaya visual
| Elemen | Nilai |
|---|---|
| Font | `-apple-system, "SF Pro Text", "Segoe UI", Roboto, sans-serif` (tanpa font eksternal) |
| Latar umum | `#000000`, permukaan `#1C1C1E`, teks utama `#FFFFFF`, teks sekunder `#8E8E93` |
| WhatsApp | latar chat `#0B141A`, gelembung kontak `#202C33`, gelembung saya `#005C4B`, aksen `#25D366` |
| Spotify | latar `#121212`, aksen `#1DB954` |
| Hadiah | aksen hangat (mis. `#FF9F0A`) agar berbeda dari app lain |
| Radius ikon app | 14 px (ikon 60 px) |
| Animasi | 150–350 ms, easing `cubic-bezier(.2,.8,.2,1)` |

Semua warna didefinisikan sebagai **CSS variables** di `base.css`.

### 8.3 Interaksi dan umpan balik
- Tap target minimal 44 × 44 px.
- Getar (`navigator.vibrate`) pada: PIN salah, notifikasi, buka kunci Hadiah. Tidak error bila API tidak ada (iOS tidak mendukung).
- Hormati `prefers-reduced-motion`: matikan animasi besar (zoom, shake panjang).
- Hindari seleksi teks dan menu long-press pada elemen UI (`user-select: none` pada keyboard dan ikon, tetapi **bukan** pada isi chat).
- Teks `aria-label` pada tombol ikon; fokus keyboard terlihat untuk desktop.

### 8.4 Keadaan kosong dan error
- Jaringan putus saat memanggil API: toast "Koneksi bermasalah, coba lagi" dan tombol ulangi.
- Server `5xx`: pesan yang sama; jangan menampilkan detail teknis.
- Data teman tidak lengkap: aplikasi tetap jalan dengan fitur yang tersedia (app tanpa data menampilkan keadaan kosong).

---

## 9. Arsitektur dan tech stack

```
 Browser (HP teman)                       Vercel
┌──────────────────────┐        ┌─────────────────────────────┐
│ public/index.html    │        │ Static (public/)            │
│ + CSS + JS modul     │◄──────►│ Serverless Functions (api/) │
│ (tanpa build step)   │  fetch │  pin · chat · content       │
└──────────────────────┘  JSON  │  hadiah · klaim             │
                                └──────┬──────────────┬───────┘
                                       │              │
                          Telegram Bot API     Upstash Redis (opsional)
                          (notifikasi klaim)   (rate limit + klaim sekali)
```

### 9.1 Keputusan teknis
| Area | Keputusan | Alasan |
|---|---|---|
| Frontend | HTML/CSS/JS murni, ES Modules, **tanpa framework dan tanpa build step** | Sederhana, cepat, mudah dipelajari |
| Backend | Vercel Serverless Functions, **Node.js 20+**, **CommonJS** (`module.exports`) | Gratis, tanpa server sendiri, struktur file = endpoint |
| Dependency runtime | **Nol** (pakai `fetch`, `crypto` bawaan Node) | Aman, ringan, mudah di-deploy |
| Penyimpanan konten | File JSON di `api/_data/` (tidak publik) | Tidak butuh database; konten tidak terekspos |
| Sesi | **Token bertanda tangan HMAC** (tanpa database) | Stateless, bahan belajar yang bagus |
| Notifikasi | Telegram Bot API | Gratis, instan, mudah |
| Rate limit dan klaim sekali | Upstash Redis lewat REST (`fetch`) | Tanpa library; **[OPSIONAL]** |
| Hosting | Vercel (paket Hobby) | Sesuai rencana pembuat |

### 9.2 Model token sesi

Token = `base64url(payloadJSON) + "." + base64url(HMAC_SHA256(payloadBase64, SESSION_SECRET))`

Payload:
```json
{ "slug": "rina", "step": 0, "exp": 1730300000 }
```
- `step`: jumlah item skrip yang sudah "dikonsumsi" server.
- `exp`: waktu kedaluwarsa (UNIX detik), default **12 jam** dari penerbitan.
- Verifikasi memakai `crypto.timingSafeEqual`. Token yang gagal verifikasi atau kedaluwarsa → `401 INVALID_TOKEN`.
- Klien **tidak pernah** mengubah isi token; server menerbitkan token baru tiap `step` berubah.

### 9.3 Logika kemajuan chat di server

Skrip = array `chat` pada data teman. Setiap item punya `from: "contact" | "me"`.

```
advance (token.step = s):
    k = s
    kumpulkan = []
    selama k < panjang(chat) dan chat[k].from == "contact":
        kumpulkan.tambah(chat[k]); k = k + 1
    jika k < panjang(chat):          // berikutnya giliran teman
        expect = chat[k].text          // teks yang akan "diketik"
        done = false
    selain itu:
        expect = null; done = true     // skrip habis
    kembalikan { items: kumpulkan, expect, done, token baru dengan step = k }

send (token.step = s):
    jika s >= panjang(chat) atau chat[s].from != "me": error 409 BAD_STATE
    kembalikan { ok: true, token baru dengan step = s + 1 }
```

**Hadiah terbuka** ⇔ `token.step == panjang(chat)`.

Catatan model ancaman: tujuannya mencegah teman biasa melompati cerita (tidak bisa membuka Hadiah lewat console tanpa melewati alur). Penyerang yang sengaja memanggil `advance` dan `send` berurutan tetap bisa melewati alur, dan itu **dapat diterima** karena yang diamankan hanyalah kejutan cerita, bukan data sensitif.

---

## 10. Struktur folder

```
ultah-hp/
├── README.md                    # cara setup dan jalan lokal
├── PRD.md                       # dokumen ini
├── package.json
├── vercel.json
├── .env.example                 # contoh variabel, TANPA nilai asli
├── .gitignore                   # termasuk .env*, node_modules, .vercel
│
├── public/                      # file statis (publik)
│   ├── index.html
│   ├── css/
│   │   ├── base.css             # variabel warna, reset, bingkai HP
│   │   ├── lock.css
│   │   ├── home.css
│   │   ├── whatsapp.css
│   │   ├── keyboard.css
│   │   ├── spotify.css
│   │   ├── gallery.css
│   │   └── hadiah.css
│   ├── js/
│   │   ├── main.js              # titik masuk, router status layar
│   │   ├── state.js             # state aplikasi (slug, token, progres)
│   │   ├── api.js               # pembungkus fetch + penanganan error
│   │   ├── storage.js           # localStorage (resume), aman terhadap error
│   │   ├── haptics.js           # navigator.vibrate aman
│   │   ├── toast.js
│   │   ├── screens/
│   │   │   ├── lock.js
│   │   │   ├── home.js
│   │   │   ├── whatsapp.js
│   │   │   ├── spotify.js
│   │   │   ├── gallery.js
│   │   │   └── hadiah.js
│   │   └── lib/
│   │       ├── typing-engine.js # scripted typing (murni, bisa dites)
│   │       ├── keyboard.js      # komponen keyboard QWERTY
│   │       └── audio-player.js  # pembungkus <audio>
│   └── assets/
│       ├── default/             # wallpaper lock, ikon, notif.mp3
│       └── rina/                # foto, mp3, cover (nama file acak)
│
├── api/                         # Serverless Functions
│   ├── pin.js                   # POST  verifikasi PIN, terbitkan token
│   ├── chat.js                  # POST  advance / send
│   ├── content.js               # GET   lagu dan foto (butuh token)
│   ├── hadiah.js                # GET   isi Hadiah (butuh chat selesai)
│   ├── klaim.js                 # POST  klaim → Telegram
│   ├── _lib/                    # awalan _ = bukan endpoint
│   │   ├── http.js              # helper respons, parse body, method guard
│   │   ├── token.js             # sign / verify token
│   │   ├── registry.js          # peta slug → data JSON (require eksplisit)
│   │   ├── pins.js              # baca PIN dari env, bandingkan aman
│   │   ├── validate.js          # validasi slug, nomor, metode
│   │   ├── redis.js             # klien Upstash REST (opsional)
│   │   └── telegram.js          # kirim pesan ke bot
│   └── _data/
│       ├── _template.json       # template teman baru
│       └── rina.json
│
├── tests/
│   ├── typing-engine.test.js
│   ├── token.test.js
│   ├── chat-progress.test.js
│   └── validate.test.js
│
└── docs/
    ├── LEARNING.md              # catatan belajar per file
    ├── ADD_FRIEND.md            # panduan menambah teman
    └── DEPLOY.md                # panduan deploy Vercel + Telegram
```

---

## 11. Model data

### 11.1 Berkas data teman (`api/_data/{slug}.json`)

```json
{
  "slug": "rina",
  "displayName": "Rina",
  "profile": {
    "contactName": "Fanskey",
    "contactAvatar": "/assets/rina/a1b2c3.jpg",
    "notifText": "hai",
    "clockTime": "07:51",
    "dateLabel": "Kamis, 22 Oktober",
    "wallpaper": "/assets/rina/wp-9f31.jpg"
  },
  "chat": [
    { "from": "contact", "text": "hai" },
    { "from": "me", "text": "hai juga, ini siapa?" },
    { "from": "contact", "text": "Eh, kamu beneran lupa? 👀", "delayMs": 600, "typingMs": 1400 },
    { "from": "me", "text": "Ya ampun, kamu toh!" },
    { "from": "contact", "text": "Selamat ulang tahun ya, Rina 🎂" },
    { "from": "contact", "text": "Aku titip sesuatu di app Hadiah. Buka ya." }
  ],
  "songs": {
    "playlistTitle": "Lagu untuk Rina",
    "items": [
      {
        "title": "Judul Lagu",
        "artist": "Nama Artis",
        "audio": "/assets/rina/x7k2m1.mp3",
        "cover": "/assets/rina/c-44aa.jpg",
        "durationLabel": "03:34"
      }
    ]
  },
  "photos": [
    { "src": "/assets/rina/p-91d3.jpg", "caption": "Study tour 2024", "dateLabel": "12 Mar 2024" }
  ],
  "hadiah": {
    "title": "Selamat Ulang Tahun, Rina!",
    "message": [
      "Semoga tahun ini lebih baik dari yang kemarin.",
      "Ada sedikit kado buat kamu. Pilih e-wallet kamu di bawah ya."
    ],
    "giftLabel": "Kado dari Fanskey"
  }
}
```

### 11.2 Aturan validasi data (dijalankan oleh test dan saat server memuat data)

1. `slug` sama dengan nama file dan cocok `^[a-z0-9-]{2,30}$`.
2. `chat` tidak kosong, item pertama `from == "contact"`, dan `chat[0].text === profile.notifText`.
3. Setiap item chat: `from` ∈ {`contact`, `me`}, `text` string 1–500 karakter.
4. **Tidak boleh dua item `me` berurutan** tanpa item `contact` di antaranya (cegah keadaan tak jelas); dua item `contact` berurutan **boleh**.
5. Item terakhir sebaiknya `contact` (menutup dengan kejutan). Jika `me`, aplikasi tetap valid.
6. `delayMs` dan `typingMs` bila ada: bilangan bulat 0–5000.
7. `songs.items[].audio` dan `photos[].src` berupa path yang diawali `/assets/{slug}/` atau `/assets/default/`.
8. **PIN tidak ada** di berkas ini. PIN berada di environment variable.

### 11.3 Pendaftaran di `api/_lib/registry.js`

```js
// Daftar semua teman. Tambah satu baris tiap ada teman baru.
module.exports = {
  rina: require('../_data/rina.json'),
  // budi: require('../_data/budi.json'),
};
```
Memakai `require` eksplisit (bukan dinamis) supaya Vercel menyertakan berkas JSON saat bundel.

---

## 12. Spesifikasi API

**Konvensi umum:**
- Semua endpoint mengembalikan JSON.
- Error: `{ "error": "KODE", "message": "teks singkat" }`.
- Method yang salah → `405 METHOD_NOT_ALLOWED`.
- Autentikasi: header `Authorization: Bearer <token>` (kecuali `/api/pin`).
- Body maksimal 10 KB; lebih dari itu → `413 PAYLOAD_TOO_LARGE`.
- Header respons: `Cache-Control: no-store`.
- Tidak ada CORS lintas domain (frontend dan API satu origin).

### 12.1 `POST /api/pin`

Request:
```json
{ "slug": "rina", "pin": "1234" }
```
Respons `200`:
```json
{
  "token": "<token step=0>",
  "profile": { "contactName": "...", "contactAvatar": "...", "notifText": "hai",
               "clockTime": "07:51", "dateLabel": "...", "wallpaper": "..." },
  "displayName": "Rina"
}
```
Error:
| Status | Kode | Kondisi |
|---|---|---|
| 400 | `BAD_REQUEST` | slug atau PIN tidak sesuai format (`pin` = 4 digit) |
| 401 | `WRONG_PIN` | PIN salah **atau slug tidak dikenal** (pesan identik) |
| 429 | `TOO_MANY_ATTEMPTS` | > 5 salah / 10 menit (body menyertakan `retryAfter` detik) |

Detail:
- Bandingkan PIN dengan `crypto.timingSafeEqual` (panjang sama dengan padding).
- Nama env var: `PIN_` + slug huruf besar, tanda `-` menjadi `_` (contoh slug `rina-dewi` → `PIN_RINA_DEWI`).
- Slug tidak dikenal tetap menjalankan jalur perbandingan semu agar waktu respons mirip.

### 12.2 `POST /api/chat`

Request (`Authorization` wajib):
```json
{ "action": "advance" }
```
Respons `200` untuk `advance`:
```json
{
  "items": [
    { "from": "contact", "text": "Eh, kamu beneran lupa? 👀", "delayMs": 600, "typingMs": 1400 }
  ],
  "expect": "Ya ampun, kamu toh!",
  "done": false,
  "token": "<token step baru>"
}
```
Request `send`:
```json
{ "action": "send" }
```
Respons `200`: `{ "ok": true, "token": "<token step+1>" }`

| Status | Kode | Kondisi |
|---|---|---|
| 400 | `BAD_ACTION` | `action` bukan `advance` atau `send` |
| 401 | `INVALID_TOKEN` | token hilang, rusak, atau kedaluwarsa |
| 409 | `BAD_STATE` | `send` saat item berikutnya bukan giliran `me` |

### 12.3 `GET /api/content`

Header `Authorization` wajib. Respons `200`:
```json
{ "songs": { "playlistTitle": "...", "items": [ ... ] }, "photos": [ ... ] }
```
Alasan rute ini ada: daftar nama file aset (yang acak) tidak ikut ke klien sebelum PIN benar.

### 12.4 `GET /api/hadiah`

Header `Authorization` wajib.
- `403 LOCKED` jika `token.step < panjang(chat)`.
- Respons `200`:
```json
{
  "title": "...", "message": ["...", "..."], "giftLabel": "...",
  "providers": ["DANA","GoPay","OVO","ShopeePay","LinkAja","SeaBank","Jago","Bank lain"],
  "claimed": false,
  "claimSummary": null
}
```
- Bila sudah klaim (dan Redis aktif): `claimed: true`, `claimSummary: { "provider": "GoPay", "last3": "789" }`.

### 12.5 `POST /api/klaim`

Request:
```json
{ "provider": "GoPay", "bankName": null, "accountNumber": "081234567890", "accountName": "Rina" }
```
Validasi server (tolak dengan `400 VALIDATION_ERROR` + `fields`):
- `provider` harus salah satu dari daftar `providers`.
- `bankName` wajib 2–30 karakter hanya bila `provider == "Bank lain"`.
- `accountNumber`: setelah membuang spasi dan strip harus `^\d{8,16}$`.
- `accountName`: opsional, 1–40 karakter, tanpa karakter kontrol.

Urutan di server:
1. Verifikasi token dan `token.step == panjang(chat)` (kalau tidak, `403 LOCKED`).
2. Validasi input.
3. Bila Redis aktif: `SET claim:{slug} <json> NX`; jika sudah ada → `409 ALREADY_CLAIMED`.
4. Kirim pesan ke Telegram. Jika gagal: hapus kunci klaim (langkah 3), balas `502 NOTIFY_FAILED`.
5. Balas `200 { "ok": true, "summary": { "provider": "GoPay", "last3": "890" } }`.

Format pesan Telegram (teks biasa, **tanpa** `parse_mode`):
```
🎁 KLAIM HADIAH
Dari   : Rina (rina)
Metode : GoPay
Nomor  : 081234567890
A.n.   : Rina
Waktu  : 2026-11-02 09:14 WIB
```
Bila `provider == "Bank lain"`, tambahkan baris `Bank   : <bankName>`.

### 12.6 Rate limit (opsional tapi disarankan)

Dengan Upstash: kunci `rl:pin:{slug}:{ip}` memakai `INCR` + `EXPIRE 600`. Tanpa Upstash, fitur ini dilewati dan server mencatat peringatan di log (tanpa menyimpan PIN).

---

## 13. Keamanan dan privasi

| Risiko | Mitigasi |
|---|---|
| PIN terlihat di source | PIN **hanya** di env var; tidak di repo, tidak di JSON, tidak dikirim ke klien |
| Isi Hadiah dibaca tanpa selesai chat | Server menolak `403 LOCKED`; konten Hadiah **tidak** ada di berkas statis |
| Token dipalsukan | Tanda tangan HMAC-SHA256 dengan `SESSION_SECRET` (≥ 32 karakter acak) |
| Tebak PIN (brute force) | Rate limit 5 percobaan / 10 menit per slug+IP; PIN 4 digit hanya bisa diamankan sampai batas ini, **sadari batasannya** |
| Enumerasi slug | Respons `WRONG_PIN` identik untuk slug tidak dikenal |
| Token bot Telegram bocor | Hanya di env var; tidak pernah di klien; **cabut dan buat ulang lewat @BotFather bila bocor** |
| Injeksi lewat input klaim | Validasi ketat (regex, panjang); Telegram dikirim sebagai teks biasa; tampilan klien memakai `textContent`, **bukan** `innerHTML`, untuk data apa pun dari input |
| XSS dari konten JSON | Render teks chat dan ucapan dengan `textContent`; emoji aman |
| Pengindeksan mesin pencari | Header `X-Robots-Tag: noindex, nofollow` dan `<meta name="robots">`; `robots.txt` melarang semua |
| Data pribadi (nomor e-wallet) | Hanya dikirim ke Telegram pembuat; **tidak dicatat di log**, tidak disimpan di Redis (hanya provider dan 3 digit terakhir) |
| Aset (foto, mp3) dapat diunduh bila URL diketahui | Nama berkas acak dan hanya terungkap setelah PIN; terima risiko sisa karena bukan data sensitif |
| Hak cipta lagu | Hanya untuk penggunaan pribadi dan link privat; jangan dibagikan publik |
| Keamanan header | `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, CSP dasar (`default-src 'self'; img-src 'self' data:; media-src 'self'; style-src 'self' 'unsafe-inline'`) |
| `.env` ikut ter-commit | `.gitignore` mencakup `.env*`; hanya `.env.example` yang dikomit |

---

## 14. Persyaratan non-fungsional

- **Browser:** Chrome Android 100+, Safari iOS 15+, Chrome/Edge/Firefox desktop terbaru.
- **Performa:** HTML+CSS+JS awal < 150 KB (tanpa kompresi). Foto Galeri maksimum lebar 1280 px, ≤ 300 KB per foto. MP3 ≤ 5 MB per lagu (128 kbps). Muat awal < 3 detik di 4G.
- **Responsif:** lebar 360–430 px sebagai target utama; tidak ada scroll horizontal.
- **Aksesibilitas dasar:** kontras teks memadai, `aria-label` pada tombol ikon, `prefers-reduced-motion`.
- **Ketahanan:** semua pemanggilan `localStorage` dan `navigator.vibrate` dibungkus try/catch; aplikasi tetap jalan bila gagal.
- **Biaya:** Rp 0 (paket gratis Vercel, Telegram, dan Upstash).
- **Keterbacaan kode:** fungsi pendek, nama jelas, komentar Bahasa Indonesia, satu tanggung jawab per berkas.

---

## 15. Konfigurasi dan environment variables

`.env.example`:
```bash
# Rahasia untuk menandatangani token (minimal 32 karakter acak)
SESSION_SECRET=

# Bot Telegram: dari @BotFather
TELEGRAM_BOT_TOKEN=
# Chat ID pembuat (cek lewat @userinfobot)
TELEGRAM_CHAT_ID=

# PIN per teman: PIN_<SLUG HURUF BESAR, "-" jadi "_">
PIN_RINA=
# PIN_BUDI=

# OPSIONAL: Upstash Redis (rate limit dan klaim sekali)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

`vercel.json`:
```json
{
  "rewrites": [
    { "source": "/:slug([a-z0-9-]{2,30})", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Robots-Tag", "value": "noindex, nofollow" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "no-referrer" }
      ]
    }
  ]
}
```
Catatan: pola rewrite hanya mencocokkan **satu segmen tanpa titik**, sehingga `/api/...`, `/assets/...`, dan `/favicon.ico` tidak ikut terbawa. Agent harus memverifikasi ini dengan `vercel dev`.

`package.json` minimal:
```json
{
  "name": "ultah-hp",
  "private": true,
  "engines": { "node": ">=20" },
  "scripts": {
    "dev": "vercel dev",
    "test": "node --test tests/"
  }
}
```

---

## 16. Rencana implementasi per milestone

> Setiap milestone diakhiri: jalankan tes yang relevan, centang checklist, lalu tulis ringkasan (apa yang dibuat, cara menjalankan, apa yang belum).

### M0 — Kerangka proyek
- Buat struktur folder (Bagian 10), `package.json`, `vercel.json`, `.env.example`, `.gitignore`, `README.md` awal.
- `public/index.html` kosong dengan bingkai HP dan CSS variables.
- **DoD:** `vercel dev` berjalan; `/` menampilkan halaman kosong; `/rina` memuat `index.html`; `/api/...` tidak terbawa rewrite.

### M1 — Cangkang UI: Lock dan Home
- Bingkai HP responsif, status bar, lock screen dengan PIN pad (sementara PIN palsu di klien, **ditandai TODO untuk diganti M4**), home screen, ikon, widget, router layar di `main.js`.
- Animasi buka app, kembali ke Home.
- **DoD:** F1 dan F2 bagian tampilan selesai; berfungsi di lebar 360, 390, 430, dan desktop.

### M2 — Mesin chat dan keyboard (inti)
- `typing-engine.js` sebagai modul murni (tanpa DOM) + tes `typing-engine.test.js`.
- `keyboard.js`, layar WhatsApp, indikator mengetik, gelembung, scroll otomatis.
- Sementara skrip dimuat dari berkas lokal sampel (**ditandai TODO untuk diganti M4**).
- Notifikasi WA di Home.
- **DoD:** seluruh kriteria penerimaan F3 dan F4 terpenuhi dengan skrip sampel; tes engine hijau (termasuk emoji, backspace, "langsung berhenti").

### M3 — Spotify dan Galeri
- `audio-player.js`, layar playlist dan sedang diputar, mini player, Galeri grid + lightbox.
- Data sampel lokal (**TODO ganti M4**).
- **DoD:** kriteria F5 dan F6 terpenuhi; musik berlanjut saat pindah app.

### M4 — Backend: PIN, token, chat, konten
- `_lib/http.js`, `token.js`, `pins.js`, `registry.js`, `validate.js`.
- `api/pin.js`, `api/chat.js`, `api/content.js`.
- Ganti PIN palsu, skrip lokal, dan data sampel di klien dengan panggilan API; implementasi F9 (resume).
- Tes: `token.test.js`, `chat-progress.test.js` (advance/send, state tidak valid, token kedaluwarsa dan dipalsukan), `validate.test.js`.
- **DoD:** tidak ada PIN atau konten teman di `public/`; semua kriteria F1, F8, F9 terpenuhi; tes hijau; aturan validasi data (11.2) ditegakkan oleh sebuah tes yang membaca seluruh berkas `_data`.

### M5 — Hadiah dan klaim
- `api/hadiah.js`, `api/klaim.js`, `_lib/telegram.js`, `_lib/redis.js` (opsional).
- Layar Hadiah lengkap: status terkunci/terbuka, ucapan, form, konfirmasi, status akhir.
- **DoD:** kriteria F7 terpenuhi; `GET /api/hadiah` sebelum chat selesai selalu `403`; pesan Telegram benar diterima; gagal Telegram menghasilkan `502` dan klien menampilkan pesan yang tepat.

### M6 — Multi-teman dan poles
- Tambah teman kedua sebagai uji (`budi.json` dan PIN uji), pastikan data tidak tercampur.
- Poles animasi, keadaan kosong/error, `prefers-reduced-motion`, header keamanan, `robots.txt`.
- Tulis `docs/ADD_FRIEND.md`, `docs/DEPLOY.md`, `docs/LEARNING.md`.
- **DoD:** menambah teman baru hanya butuh langkah di Bagian 19; semua centang di Bagian 17 terpenuhi.

### M7 — Deploy
- Ikuti `docs/DEPLOY.md`: push GitHub, import Vercel (Framework Preset: **Other**, tanpa build command, output directory `public`), isi env var, deploy, uji di HP asli.
- **DoD:** alur lengkap berhasil di HP asli (Android dan iPhone bila ada) lewat URL produksi.

---

## 17. Rencana pengujian dan QA

### 17.1 Tes otomatis (`node --test`)
| Berkas | Yang diuji |
|---|---|
| `typing-engine.test.js` | Maju per tombol, backspace, batas akhir, emoji, `bisaKirim` |
| `token.test.js` | Sign/verify, token rusak, kedaluwarsa, slug berbeda |
| `chat-progress.test.js` | `advance` mengumpulkan pesan kontak berurutan; `send` hanya di giliran `me`; `done` di akhir; hadiah terbuka hanya pada `step == panjang` |
| `validate.test.js` | Regex slug, nomor 8–16 digit, provider valid, "Bank lain" butuh `bankName` |
| (data) | Semua `_data/*.json` lolos aturan 11.2 |

### 17.2 Checklist manual (di HP asli)
- [ ] PIN salah 5 kali memicu pembatasan; PIN benar sesudahnya tidak lolos selama pembatasan (jika Redis aktif).
- [ ] Notifikasi muncul, bisa ditekan, dan badge ikon WA tepat.
- [ ] Scripted typing: tombol acak menghasilkan teks skrip; backspace benar; berhenti di akhir; kirim hanya saat lengkap.
- [ ] Reload di tengah chat lalu PIN ulang melanjutkan.
- [ ] Musik: play/pause/seek/next; lanjut saat pindah app.
- [ ] Galeri: lightbox dan geser mulus.
- [ ] Hadiah terkunci sebelum chat selesai; terbuka sesudahnya.
- [ ] Klaim: validasi, konfirmasi, pesan Telegram masuk, status akhir tampil.
- [ ] Klaim kedua ditolak (jika Redis aktif).
- [ ] Teman kedua: tidak ada kebocoran data teman pertama.
- [ ] Tab Network: tidak ada respons berisi teks Hadiah atau PIN sebelum waktunya.
- [ ] Mode hemat data/jaringan lambat: aplikasi tetap bisa dipakai, tidak crash.
- [ ] Lanskap menampilkan petunjuk putar ke potret.

### 17.3 Uji penerimaan akhir
Dua orang yang belum pernah melihat aplikasi menyelesaikan alur dari link sampai klaim **tanpa diberi petunjuk**, dan pembuat menerima kedua notifikasi Telegram.

---

## 18. Deployment (ringkas; rinci di `docs/DEPLOY.md`)

1. Buat bot lewat **@BotFather** (`/newbot`), simpan token. Kirim `/start` ke bot, ambil **chat ID** lewat @userinfobot.
2. (Opsional) Buat database di **Upstash**, salin URL dan token REST.
3. Push ke **GitHub**.
4. Di **Vercel**: *Add New → Project → Import*. Framework: **Other**. Build command: kosong. Output directory: `public`.
5. *Settings → Environment Variables*: isi semua variabel pada Bagian 15 untuk lingkungan Production.
6. Deploy; buka `https://<project>.vercel.app/{slug}`.
7. Uji di HP, lalu kirim link ke teman.
8. Setiap perubahan konten teman: edit JSON, commit, push (Vercel otomatis deploy ulang). **Perubahan PIN** cukup lewat env var lalu redeploy.

---

## 19. Cara menambah teman baru

1. Salin `api/_data/_template.json` menjadi `api/_data/{slug}.json` dan isi kontennya.
2. Buat folder `public/assets/{slug}/`; taruh foto, mp3, dan cover dengan **nama berkas acak** (mis. `p-91d3.jpg`).
3. Daftarkan di `api/_lib/registry.js` (satu baris).
4. Tambahkan env var `PIN_{SLUG}` di Vercel (dan `.env.local` untuk pengujian).
5. Jalankan `npm test` (tes validasi data harus hijau).
6. Commit dan push; uji `/{slug}`; kirim link dan PIN (lewat jalur terpisah dari link bila memungkinkan).

---

## 20. Dokumentasi yang harus dihasilkan

- **README.md:** ringkasan, prasyarat (Node 20+, Vercel CLI), cara jalan lokal (`npm run dev`), cara tes, struktur folder.
- **docs/ADD_FRIEND.md:** Bagian 19 dengan contoh nyata.
- **docs/DEPLOY.md:** Bagian 18 dengan tangkapan langkah, termasuk cara membuat bot Telegram dan mengisi env var.
- **docs/LEARNING.md:** untuk **setiap berkas backend** satu paragraf: fungsinya, konsep yang dipelajari (serverless, HTTP method, status code, token HMAC, validasi input, rate limit, memanggil API luar), dan satu latihan kecil (mis. "tambahkan endpoint `/api/ping`", "ubah masa berlaku token jadi 2 jam dan lihat dampaknya").

---

## 21. Risiko dan mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| iOS Safari memblokir autoplay audio | Musik tidak terdengar | Mulai audio hanya dari tap pengguna; pesan jelas bila ditolak |
| Keyboard HP asli muncul saat mengetuk kolom input | Merusak ilusi | Kolom input hanyalah `div` (bukan `<input>`); tidak memicu keyboard sistem |
| Pengguna menyalin link ke orang lain | PIN tetap melindungi | PIN dikirim lewat jalur berbeda dari link |
| Telegram tidak terkirim | Klaim tidak terpantau | Balas error ke klien, klaim tidak ditandai selesai, teman bisa mencoba lagi |
| Cold start serverless lambat pada PIN pertama | Terasa lambat 1–2 detik | Tampilkan animasi loading kecil pada PIN pad |
| Teman menemukan cara memotong alur lewat console | Kejutan cerita terlewat | Diterima (lihat 9.3); isi Hadiah tetap digerbang server |
| Hak cipta lagu atau foto | Masalah legal bila publik | Link privat, noindex, penggunaan pribadi |
| Redis tidak diaktifkan | Klaim bisa dikirim berulang; tidak ada rate limit | Dokumentasikan; Telegram tetap memberi tahu tiap klaim |
| Nama berkas aset bocor ke orang lain | Aset terunduh | Nama acak, hanya diungkap setelah PIN, bukan data sensitif |

---

## 22. Asumsi dan pertanyaan terbuka

**Asumsi yang dipakai (ubah bila tidak sesuai):**
1. PIN semua teman **4 digit**, ditentukan pembuat.
2. Tombol Kirim hanya aktif saat teks skrip **lengkap**.
3. Teks yang diketik berlebih **langsung berhenti** (keputusan pemilik produk).
4. Token berlaku **12 jam**.
5. Notifikasi pertama muncul **1,5 detik** setelah Home tampil.
6. Musik terus berjalan saat pindah app.
7. Nominal hadiah **tidak ditampilkan** di web.
8. Redis/Upstash dianggap **opsional**; versi tanpa Redis tetap berfungsi penuh kecuali rate limit dan klaim sekali.

**Pertanyaan terbuka untuk pemilik produk:**
- Nama proyek dan subdomain Vercel yang diinginkan?
- Apakah perlu tema atau wallpaper berbeda per teman sejak v1.0?
- Perlu pesan gambar atau voice note di chat pada rilis pertama?
- Apakah nama app musik tetap "Spotify" atau memakai nama generik (mis. "Musik")?

---

## 23. Instruksi awal untuk agent (salin sebagai prompt pertama)

```text
Kamu membangun project "ultah-hp" sesuai PRD.md di repo ini.

Aturan kerja:
1. Baca PRD.md seluruhnya dulu. Jangan menulis kode sebelum kamu merangkum
   (5-8 baris) pemahamanmu tentang alur, arsitektur, dan milestone.
2. Kerjakan SATU milestone pada satu waktu, mulai dari M0. Setelah tiap
   milestone: jalankan tes, periksa Definition of Done, lalu berhenti dan
   tulis ringkasan (apa yang dibuat, cara mengetes, apa yang belum). Tunggu
   konfirmasi sebelum lanjut.
3. Stack terkunci: HTML/CSS/JS murni (ES Modules) tanpa framework dan tanpa
   build step; backend Vercel Serverless Functions Node.js 20+ CommonJS tanpa
   dependency runtime. Jangan menambah library tanpa meminta izin.
4. Rahasia (PIN, token Telegram, SESSION_SECRET) TIDAK BOLEH ada di kode,
   di folder public/, atau di berkas data. Hanya lewat environment variable.
5. Konten Hadiah dan skrip chat hanya boleh keluar dari server lewat endpoint
   yang memverifikasi token (lihat Bagian 9 dan 12).
6. Data dari pengguna dan dari JSON dirender dengan textContent, bukan innerHTML.
7. Tulis komentar dalam Bahasa Indonesia. Pemilik proyek sedang belajar
   backend: jelaskan kenapa, bukan hanya apa.
8. Setiap TODO sementara (PIN palsu, data lokal sampel) harus diberi tanda
   "TODO-M4" dan dihapus pada milestone yang disebut.
9. Bila ada hal yang ambigu atau PRD bertentangan dengan dirinya sendiri,
   tanyakan, jangan menebak.
10. Mulai sekarang dengan M0.
```

---

## Lampiran A — Contoh kode acuan (boleh disesuaikan)

### A.1 Token (`api/_lib/token.js`)

```js
const crypto = require('crypto');

const b64url = (buf) => Buffer.from(buf).toString('base64url');

function sign(payload, secret, ttlSeconds = 12 * 3600) {
  const body = { ...payload, exp: Math.floor(Date.now() / 1000) + ttlSeconds };
  const data = b64url(JSON.stringify(body));
  const mac = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${mac}`;
}

function verify(token, secret) {
  if (typeof token !== 'string' || !token.includes('.')) return null;
  const [data, mac] = token.split('.');
  const expected = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

module.exports = { sign, verify };
```

### A.2 Mesin scripted typing (`public/js/lib/typing-engine.js`)

```js
// Memecah teks jadi grapheme agar emoji tidak terpotong.
function split(text) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    return Array.from(new Intl.Segmenter('id', { granularity: 'grapheme' }).segment(text), s => s.segment);
  }
  return Array.from(text);
}

export function createTypingEngine(target) {
  const chars = split(target);
  let pos = 0;
  return {
    press()     { if (pos < chars.length) pos += 1; return this.text(); },  // tombol apa pun
    backspace() { if (pos > 0) pos -= 1; return this.text(); },
    text()      { return chars.slice(0, pos).join(''); },
    canSend()   { return pos === chars.length; },
    reset()     { pos = 0; },
  };
}
```

### A.3 Pengiriman Telegram (`api/_lib/telegram.js`)

```js
async function kirimTelegram(teks) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: teks }),
  });
  if (!res.ok) throw new Error(`Telegram gagal: ${res.status}`);
}

module.exports = { kirimTelegram };
```

---

## Lampiran B — Glosarium

| Istilah | Arti |
|---|---|
| AU | *Alternate Universe*; di sini, cerita interaktif berbentuk simulator HP |
| Serverless function | Fungsi backend yang hanya berjalan saat dipanggil, tanpa server yang menyala terus |
| Token HMAC | String bertanda tangan yang membuktikan data tidak diubah klien |
| Scripted typing | Efek mengetik palsu: tombol apa pun menghasilkan teks yang sudah ditentukan |
| Rewrite (Vercel) | Aturan yang mengarahkan URL tertentu ke berkas lain tanpa mengubah alamat di browser |
| Slug | Pengenal unik teman di URL |

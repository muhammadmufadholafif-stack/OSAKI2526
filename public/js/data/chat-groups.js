/**
 * Data Grup Chat WhatsApp (Hari Santri 2025, Harlah 58, Bukber Ramadhan, LDKS 2026)
 * Otomatis menyesuaikan sudut pandang (POV) untuk Sifa, Aliva, Aurel, Ana, dll.
 */

export const MEMBER_COLORS = {
  'Sifa': '#e58e26',
  'Aliva': '#53bdeb',
  'Aurel': '#e056fd',
  'Ana': '#25D366',
  'Afif': '#f0932b',
  'Albion': '#eb4d4b',
  'Raja': '#4834d4',
  'Rahma': '#6ab04c',
  'Meyra': '#be2edd',
  'Anang': '#22a6b3',
  'Zetty': '#f9ca24',
  'Dimas': '#7ed6df',
  'Lutfi': '#badc58',
  'Lyto': '#ff7979',
  'Sabrina': '#f8a5c2',
  'Mas Ilham': '#cf6a87'
};

const RAW_GROUPS = [
  {
    "id": "grup_santri",
    "title": "Koor Hari Santri 2025 🌙",
    "avatar": "/assets/covers/grup-santri.svg",
    "members": "32 anggota",
    "history": [
      {
        "type": "date",
        "text": "25 September 2025"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "cah"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "rekomendasi pliss, lomba santri beserta konsep"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "ketuamu blass ra on"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "misal kumpulan minggu py"
      },
      {
        "type": "date",
        "text": "26 September"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ga iso aku lek awan, kon nyopiri ngeterne manten"
      },
      {
        "type": "date",
        "text": "27 September"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "cah, mau minta ide konsep lomba cca ben ga sama kaya tahun kemarenn. adaa yangg punyaa idee??"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "[file: JUKNIS LOMBA DA-WPS Office.docx] Cah Iki juknis enek seng perlu direfisi gk?"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "iki lomba dai tok?"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Yang lain masih dikerjakan"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "lomba nya apa aja mas?"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "DAI, CCA, ADZAN"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "katanya mau ganti, ga sama dengan yang kemarin"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Itu yang di acc"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "sama siapa?"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Sama pembina"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "coba ngajukan lagi yang lain, siapa tau di acc"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Bisa hanya tiga lomba itu saja. Hanya tiga lomba itu saja yang di acc sama pembinanya"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "lhayo ngejokne neh. wong mau lo sifa yo sek takok” cah”. H- mepet yok an, aku sesok raiso kumpulan"
      },
      {
        "type": "date",
        "text": "28 September"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "aku wes konsultasi karo pembina yoon, jarene ki lombane sembarang seng penting maksimal. naaah dengan waktu se mepet Iki, kita nyanggupi ne 3 lomba. jane awal kae pengen akeh lombane, tapi timbang ragu nko maksimal opo nggak, dadine 3 lomba kui ae"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "la ket wingi” kan wes ditawari kalian ada saran lomba opo cah? sebagian ngga nyauri, sebagian sembarang manut” ae. gapopo titik seng penting maksimal"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "gur ngelekne tok cah, nko rapat jam 8, minta tolong kesadaran diri ae bagi kls 11 pantese yo teko"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Temen” ada yang tahu gk ukuran benner di aula kampus 1?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "belum tau jaaa. tanya sng kls 12 pie?"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "mandiri ae mbak, besok ada yang bawa meteran di ukur sendiri biar pas"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "sesok enek sng iso ngga misal bar magrib nggarap proposal nk omahe mas ilham?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "kamuu ikutt gaa?? gapapa si aku, tak nyuruh bapak ku nganterin"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "gabisa ikut, aku sama anang klo malem gabisaaa. latihan paski ku udah gaboleh ada ijin. maksudku gini loo beeb: siang ada yang dispen mulai jam 2 sampe pulang nggarap proposal nk ruang osis, nggarap karo kls 12, trus dilanjutkan bar magrib nk omahe mas Ilham"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "(ke Afif) kapan?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Bar magrib ngewangi gae proposal, lk aku raoleh kayae"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "insyaallah"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "penanggung jawab LPJ enak e siapa? sng tanggung jawab proposal enak e juga sapa?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "anang wi tau ngajukne diri, tapi anang ki yo lumayan repot meh podo ky aku. tapi misal Anang sanggup alhamdulilah"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[call: Telepon suara 7 menit] liane ayoo jooiinn"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "@Albion mute ennnn"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "AYOO TELPON BARENG. kita bahas di telpon yoook"
      },
      {
        "type": "date",
        "text": "29 September"
      },
      {
        "type": "message",
        "speaker": "Anang",
        "text": "sanggop yo tapi ra dewe ro cah sarpras"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "nko sng kls 11 tak dispen kabeh yooo"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "iyo, lk enek sing gk iso teko gpp to gk teko?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "nk iso teko, nk sempet teko"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[file: surat permohonan dispensasi rapat koordinasi dan penyusunan proposal HSN SMK Islam 1 Blitar, Senin 29 September 12.30 WIB s.d selesai.pdf]"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "iku bener e digawe miring sidone @Afif?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "gak adzan tok e? jagak e py?"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "di gae miring kabeh ae"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "cagak e seng lurus gur 1"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "lyo, opo dianggarne neh? tp gak ruh aku tukne nendi"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "opo bakal di acc"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "balum tau kaaa, opo enek saran lain?"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "panggone lomba kaligrafi ndek NDI?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "katane nek Aula pondok"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "Iki sidone benner e mireng Kabeh PO enek seng tegak"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "misal e sing adzan tok tegak ngunu py?"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "dipadakne wae lo ukuran e, miring’ kabeh ngadek’ kabeh"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "lk dipadakne mending miring kabeh"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "tm e kapan"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "tm nk iso h-seminggu ngga sih? opo tanggal 6? sng liane pie?"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "mending pas hari sekolah AE"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "lah tanggal 6 libur e?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "duk senin ka?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "tanggal 6 bukan Senin beb… itu September beeb"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "oh Iyo ya"
      },
      {
        "type": "date",
        "text": "30 September"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "caaahh, tm e tanggal 13 kemepet en ngga kiro”? trus penutupan pendaftaran e tanggal 11, pie? sng online balesen beeb"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "hm"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "ok, acc aku"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "boleh boleh aja, pesertane iku dilebokne grub lombane masing masing to?"
      },
      {
        "type": "message",
        "speaker": "Anang",
        "text": "masing masing ae mben lomba"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "okee siipp, ben ngga bentrok. Iki misal per kelas ngga enk sng lomba didenda berapa beb?"
      },
      {
        "type": "message",
        "speaker": "Anang",
        "text": "50k ae lek kelarangen 25k e"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "cah” liane pie? 25 opo 50?"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "25 piye"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "iyoo 25 ae"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ojo, 50 ae"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "lek murah ngko cah” malah mileh mbyr timbang melu lomba"
      },
      {
        "type": "message",
        "speaker": "Anang",
        "text": "yws 100k… 1M e… 50 e wes"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "sido 50 yees? ben gelem melu kabeh"
      },
      {
        "type": "message",
        "speaker": "Anang",
        "text": "ys"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "(soal surat edaran wali kelas) Bapak/Ibu Wali kelas di mohon mengisi Data Peserta Lomba"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "no 4 typo kuhusus (khusus) kro mengukuti (mengikuti) 😭"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "YA ALLAH terima kasih gaiiss, untung tak kirim rene disek"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "iki CCA cerdas cermat aswaja? uduk agama?"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "uduk"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[file: juknis adzan, kaligrafi.pdf] menowo enek revisi 🙏"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[image: Ketentuan Penilaian CCA] iki kiro” enek refisian ngga cah? opo saran penak e pie?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "soal e keseluruhan sido 50?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "ha ah, penak e 50 opo laine. Mikirku kui ki babak 1 dingge golek poin, trus babak selanjutnya rebutan"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "ya gapapa sih lek gituu"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "kan juri adzan enek pak soni, trus sng juri kaligrafi enek pak author. nah kui nambah 1 ngkas penak e sopo. kaligrafi nambah 1 adzan nambah 1"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Cah seng juri adzan lek pak Zainal pie, mumpung pak Zainal nek kelasku"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "hooh jaa, jajal tawarono. tapi jare pembina kae pak Zaenal gaiso"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Yo tak jajal e sek… Iki mau wes takok ne jeree iso pak Zainal"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "nk emang iso minta tolong pak Zaenal ae ben penak"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Jere e pak Zainal kui lek enek golek juri 1 engkas la teko saran e pak Zainal kui pak Ulil. Iki jek ape tak chat pak Ulil e"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "okee siipp, jajal pak Ulil e di tembung bisa ngga. tanggal 21"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "gaaiiss, minta tolong ini dibuka, dibaca, dipahami yaaa. kalo ada revisi bilang ke sini, kalo ada yang ditanyakan tanya ke sini nanti tak bantu jelasin. bene kelas 11 eroh kabeh acarane koyo opo. progres proposal boleh sharing @Dimas"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "seng kurang mek roundown acara"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "[file: PROPOSAL PERINGATAN HARI SANTRI.docx (8 halaman)] garek lampiran kegiatan"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "oalaahh lampiran kegiatan ki rundown ye dim?"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "prayo ho oh, tapi mbuh ya nyebut e piye"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "anu dim, kui cagak benner karo benner berdiri berarti sidone cah media nggae benner ukuran e berdiri ky sng mbok jajal nk ruang osis wingi?"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "iya, garek di tentukno tanggal e kapan kuwi"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "wes fix banner e gae cagak brrti? pakai 2 banner?"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "satu tempat e di buat 2 benner, jadinya 6"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "jadinya 6 kui dingge njobo njero kan?"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "iya"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[link: Formulir Pendaftaran Lomba Adzan HSN 2025]"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "enak e konsumsi dipesenne apa? konsumsi juri, snak juri, konsumsine kita, dikasih apa bebeb?"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "konsumsi ne pokok enak + akeh. los. mangan geden"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "ndek proposal beda anggaran, dibedakan ae ben ketok mening. saran cah, katering nndi penak e sng rekomend"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "ini bacanen, iso ngge kiro” buget e semunu penak e katering opo"
      },
      {
        "type": "message",
        "speaker": "Sabrina",
        "text": "lombanya itu kapan yahhh? maksudku tanggal berapa? dan kalian mau makannya kek gimana?"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Restoran bisa nggak"
      },
      {
        "type": "message",
        "speaker": "Sabrina",
        "text": "AKU TAKON TENAN CAHHH, timbang tak tukokne Sego bungkus loh"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "enak + warek + lek iso prasmanan"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "piye kiee rundown acara ne gek Ndang mari? @ana. Iki anggaran e enek seng kurang Ra?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "@Afif @Raja py teko sekbidmu enek seng di butuh ne ngga? @ana py mba ningggg"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "ana latihan lomba. @Sifa Iki hadiah peserta ne opo sidone"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "ki lo enek tulisane hadiah e opo ae"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Lombanya beda ka"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "wes lomba dai diganti kaligrafi ae. Iki kertas gambar A4 tenan 10pcs"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "kui ki 10 pcs kan per buku gambar to dim? satu buku gambar isine 10 lembar kan?"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "nda tau aku soale ndek proposal tulisan e gitu"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "pie nk lomba adzan: juara 1 Rp100.000 + sertifikat, juara 2 Rp75.000, juara 3 Rp50.000. Lomba kaligrafi sama. Lomba CCA: juara 1 Rp150.000, juara 2 Rp120.000, juara 3 Rp90.000, tiap juara + sertifikat (uang e dibagi 3 anak). pieee? asli aku bingung yoan, kakean opo kurang wi, saran”"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "ws ngene ae. roto wi. seng cca kan yo roto, lagipula di bagi 3"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "hooh yo? liane deal pora?"
      },
      {
        "type": "message",
        "speaker": "Sabrina",
        "text": "makan e golek sng pantes brin, pantes ngge guru, pantese panitia, karna ini sesuai request kitaa besttt"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "sembarang mok gae opo, pokok budget e semono"
      },
      {
        "type": "message",
        "speaker": "Sabrina",
        "text": "to the point aja bestt, tanggal berapaaaaaa"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Lombane tanggal 21"
      },
      {
        "type": "message",
        "speaker": "Sabrina",
        "text": "nah ngono lohhh"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "Iki wes anggaran dana e ora enek tambahan neh"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "sng sertifikat + hadiah lomba wi pie dim?"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "jarene mas Ilham di padakne Kabeh yowes. Rp 150.000 Kabeh jarene"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "lah pie dim? berarti rincian per lombane berapa? 150 kui total per lomba opo total semua lomba?"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "per anak seng juara"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "jadi juara 1 sampe 3 iku tetep 150?"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "tanyakno mas Ilham AE mumet aku"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "sek’ berarti ngene: masing” 1 anak hadiah e 150rb kan? opo 150rb kui kepotong karo cetak sertifikat?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "kita tanya wm soale wm seng neng nggene mas ilham"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "wes Sido takok… wes tak kokne pisan"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "enek neh ngga cah? Dimas mau tanya kebutuhan sng kurang opo? Ada tambahan lagi ngga dari teman”?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "ben misal di takoni karo sopo ae, kalian ga bingungg dan iso njawab"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Cah misal e jurine CCA bu Ula kro bu Naili py cah? trus juri adzan pak sonny kro pak zaenal lk kaligrafine rencane pak author kro pak ma’sum tp pak ma’sum sik arep ditekokne, menurut e kalian enek sing diganti/enek saran pora?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "hooh gais menurut e kalian gimana? itu juri yang udah fix: pak soni, pak author, pak zaenal, laine masih mau dikonfirmasi sama raja besok pagi. keluarkan saran kalian"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "oiyaa gaaiis, buat sekbid media @Aliva @Zetty, katane raja minta tolong buat bikin desain: 1. ID card panitia, 2. Benner lomba (masing-masing lomba cetak 2 benner, 1 untuk dalam ruangan, 1 untuk luar ruangan, yang di luar ditaruh di tatakan benner), 3. poster yang mau dipost ke cerita Instagram. Minta maaf yaaa sebelumnya, kita belum konfirmasi ke kalian apa aja desain yang harus di edit"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Minta maaf sekbid media karena belum konfirmasi kepada kalian yang apa saja yang harus di edit"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "oiyaa cah, ada 1 lagi, klas 12 pengen ketemuan sama kita kls 11 doang, jarene ki ketemuan ben adw penak misal minta bantuan kls 12. ketemuan nndi sembarang jare pokok nk njobo sekolah. nah wonge omong jare kon rundingan sek adw ne. kui penak e pie cah?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "manut ae aku, tp lek hari sabtu/Minggu iki gak bisa aku mau siang/malam"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "oke, sng laine minta tolong dijawab yaaa bebeb tercintakuuhh 😍"
      },
      {
        "type": "date",
        "text": "1 Oktober"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Cah enek saran juri kaligrafi gk?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Cah nko enek sing iso ngewangi garap pora balik sekolah?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "garap proposal gaaiis, nk ruang osis insyaallah. kalo mau AYOO KUMPUL"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "Umumeeee"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Umumee anak muda"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "misal ndek omah e mas ilham gmn"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "Kapan"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "nko jam 2, bar bebas"
      },
      {
        "type": "message",
        "speaker": "Sabrina",
        "text": "ayooo"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "sido rene ra? reneo, mas ilham, ayo cah, di tunggu"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "kls 11 kabeh ye?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "Ik iso yo kabehh kuduan"
      },
      {
        "type": "date",
        "text": "7 Oktober"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "Ah. Cah. Cah. Woi. [call: Telepon suara tak terjawab, 17 menit]"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "oii"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "@Dimas, Dimas saputra kelas 10 tpm 2. Ayah e seng gaenek? Ndang dijawab plis"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "gak didudoi e kro mas Ilham"
      },
      {
        "type": "date",
        "text": "8 Oktober"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "haaayyy beeebb. eum, misal ambil kunci ro nk rumahe mas Ilham kiro” sopo sng iso? ngga kudu saiki, penting sabtu kita wes mulai piket"
      },
      {
        "type": "date",
        "text": "9 Oktober"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "Banner e ndi? Arep tak cetak saiki"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "@Aliva desain poster e kirim disini ae gapapa liiipp"
      },
      {
        "type": "message",
        "speaker": "Sabrina",
        "text": "naaa aku tanya lagii dehh konsumsi nya gimanaaa"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "Wes tak urusi"
      },
      {
        "type": "message",
        "speaker": "Sabrina",
        "text": "dicarikan mas Ilham atau gimana"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Kan kemarin” udah aku infoin, jadinya dibantu mas Ilham"
      },
      {
        "type": "message",
        "speaker": "Sabrina",
        "text": "oh yaudah, okeyyy besttt"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "Poster e piye? Tak cetak saiki lo arepan"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "sng ngedit anak media, beberapa kyone wes meh mari wi poster e"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "Cah media opo ra mlebu grub?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "masuk"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "la iki @Aliva @Zetty"
      },
      {
        "type": "date",
        "text": "10 Oktober"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ngko tak kirim, njaluk kok yo bengi men"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "Cah. Sesok njalok tulung tenan teko O kabeh yo. Iki lek ra enk seng mbalesi brarti iso kabeh yo?"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Aku mbalesi mek"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "jam berapa beeb? 7 pagi yaa? nk rumahe mas ilham opo sekolah? insyaallah tak sempetne yaaa, soale besok aku mo siap” ada acara"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "Ga enek insyaallah, lek iso yo iso lek Ora yo ora"
      },
      {
        "type": "message",
        "speaker": "Mas Ilham",
        "text": "py liyane? kok ora enk kabar blas. ssk teko kabeh to? teko kabeh opo ora?"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "bisaaa"
      },
      {
        "type": "date",
        "text": "12 Oktober"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "gaaaiiss, misal sng dispen peserta sesok isuk tak setorne bang resa ben jam 9 di dispene, terus sng panitia dispen jam 8 ae pie, nggak ketang melu disek doa nk kelas e dewe”, tapi opo karuan panitia ne dispen ket isuk pisan"
      },
      {
        "type": "date",
        "text": "13 Oktober"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "Beh iki, Ra Sido yon. melbu Ki ketoke"
      },
      {
        "type": "message",
        "speaker": "Sabrina",
        "text": "mending jam 8 aaa, raketang melu doa karo kebagian materi titik. Dispen yah opo"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "Sek rung metu njeng dispen e. Sabar to. TM mundur aja. Boh wes"
      },
      {
        "type": "date",
        "text": "16 Oktober"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "ssk ki pie, budal nggae olahraga trs langsung r.o? opo ng kelas sek?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "langsung r.o"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Minggu tanggal 26 iso ngga? tanggal 26 malah kaka kls 12 sg gamau. heeemm, tanggal 25 akeh seng teko to?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "aku tidak bisa 😔"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "naaah kaaan, sebagian ga bisaaa. ada acara keluarga kaan?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "aku pun kalo dibilang acara juga mau lihat lomba paski di man 2"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "pie penak e? pulang sekolah yee"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "pulang sekolah tu sore anjay. aku pun asline wes di arep” ibukku, kon leren ngga ketang sedino nk omah. la pie solusi neee"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "win win solution laaahh"
      },
      {
        "type": "date",
        "text": "17 Oktober"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "pie caahh, ndang di deal ne"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "tanggal 26 malah kaka kls 12 sg gamau. la tanggal 25 akeh sng acara keluarga ngunu adw"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "hooh, emoh e nk minggu"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "amu minta file lpj nk mas mbak e, ben adw iso mulai cicil”. liane masalah ketemuan kr kls 12 ndang nongol o, omongno saranmu nk kene"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "iki wes uduk masalah repot ngga e, adw yo sek butuh bantuan e mereka kelas 12, misal iki prioritas kudune paham ndi sng diutamakan. emang kita biasane harus terpaksa merelakan salah satu ben iso mlaku penak. mesakne juga nk kls 12 panggah diwehi keputusan gur bayangan” tok, urung fiks"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "amu minta file lpj nk mas mbak e, di siapaa yaa enak nyaa 🤔"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "sembarang 😭 pokok kita megang file e"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "gaaiis, Iki tenan gaenek sng ndue list dispen e?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "(soal daftar anak OSIS yang membantu acara futsal) gantinen, kirimen grub pembina siip @Sifa. Omongno ngene “assalamualaikum pak, buu, ini list nama anak osis yang nanti membantu acara futsal di sekolahan”. jangan lupa emoji wajib 🙏🙏🙏🙏"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "siapa yg bawa kunci"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "Jan ra enk suguhan blas ngge OSIS?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "jare pak fidyan nk wani jajal omong nk pak polisine"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "Halah mesti"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "tp angel golek solusine, dino sabtu akeh sg ra iso, dino minggu kelas 12 sg wegah"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "Kalo seumpama gausah aja gimana?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "kita ga ada yg nge bantu, takut e gt 😔"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "huhuuu, pie yooo. nk gaenek sng ngewangi ki repot, tapi mereka nawari ki yo waktune kurang tepat. allahumaaa"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "misal tanggal liyo py? tp kapan jir"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "jane ki paling tepat yo tanggal 26. nk diundur” malah kesuwen, adw urung gae reng’an blas"
      },
      {
        "type": "date",
        "text": "19 Oktober"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "pie caaahh, sesok kumpulan ndadak mesti akeh sng enek acara. aku tak enek acara ae sesok, ben lodo kr kalian"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "sabtu tanggal 25 sebenernya aku juga ada acara keluarga di rumah, tapi kalo iya yoo ayo ae kita kumpulan sama kls 12, ku relakan deeh acara keluarga kuuuu. kalo ngga minggu tanggal 26 itu hari paling pas sih menurutku, banyak yang senggang kan? tapiii kalian pasti milih buat istirahat dirumah, ataauuu malah ada acara keluarga lagi?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "enaknya gimana caaahh? kalo kalian bilang e manut ae, yaudah ayooo sabtu kita kumpul bareng”. tempatnya, jujur aku gatau kafe itu enaknya dimana, tapi menurutku malah lebih enak kita kumpul ke rumah mas fadil kaya kemarin. cuman aku ada rasa sungkan juga kalo bilang sendirian, kecuali kalian ikut ngomong ke grub"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "aku bukan e ngga bisa mutusin mau kumpul dimana, cuma banyak pertimbangan gaaiis. misal aku putusin sendiri, takutnya malah kalian banyak acara keluarga, tapi kalo aku tanya kalian, kalian jawab terserah"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "jangan diem ae, bukan berarti kita ngga infokan kita ngga butuh kalian, semua emang butuh kepekaan ya gaaiis. kalo kalian pengen tau ya tanya, misal kalian diem aja, kita bukan orang cenayang ya gaaiis 😘"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "sabtu nya tuh besok atau sabtu depan? kalo besok, maaf naa tapi aku beneran gabisaa, karena yaa minggu aku udah keluarrr. aku uda ijin ke mas ilhamm jugaa, samaa ayahkuu uda gaboleh keluarrr"
      },
      {
        "type": "message",
        "speaker": "Sabrina",
        "text": "aku manut ae naaa, penting tempat e seng nggak adoh” banget"
      },
      {
        "type": "date",
        "text": "20 Oktober"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "yowes, hari ini aku yo ada acara. mestine hari iki ngga mungkin nk kumpulan. sabtune tanggal 25, kan minggu tanggal 26. pie kiiii, sabtu masalah enek ekskul aku yo iso ngeboti jurnal kr paski ku"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "minggu ae tanggal 26, misal kls 12 blas ngga gelem dino minggu, yowes berarti kemungkinan kita ngga sepiro diewangi mereka, iso ugo adw diculne culll"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "masalah harlah menurutku kudu dipikir tenanan, nk adw ngga mampu ngge akeh kegiatan, berarti pra harlah fokus futsal dimeriahne pooolll, kr tambahan mobile legend po pie ngunu, ngga usah akeh kegiatan, wong adw rapat yo angel, akeh sng repot, diluk nkas mesti mikir ujian barong dll"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "misal kls 12 wes ngeculne adw, berarti kita yo kudu siap kerjo dewean. nk emang minggu tgl 26 tak omong ngunu ae pie? nk omahe mas fadil, nk ndek njobo kan akeh sng nggaiso juga"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Saranku Di fiix ne hari opo, trs kabeh iso…"
      }
    ]
  },
  {
    "id": "grup_harlah",
    "title": "Panitia Harlah ke-58 🎉",
    "avatar": "/assets/covers/grup-harlah.svg",
    "members": "45 anggota",
    "history": [
      {
        "type": "date",
        "text": "2 Januari 2026"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Wes pd budal rung?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "telatt 😭"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Yoooo"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "omahe NDI"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Wes otw e?"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "sek ndek pom"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Pe nyndi njir"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "[image: Izin perjalanan] izin sek perjalanan seko wonogiri otw blitar, lek sempet nnti nyusul ya"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "oleh oleh mie ayam wonogiri asli dung"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Yoo yooo budal yooo"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "omah e seng pas kae ye?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "hoo [location: Titik Kumpul]"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "cah media minta tolong buat no planflet buat kontes montor lek bisa Minggu jadi terus di post, lekas ngambil formulir Senin tgl 5. Beli formulir 15k"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "oke baik"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "informasine opo wae? 1. formulir diambil tgl 9 januari di ruang osis, 2. biaya formulir 15rb, 3. tgl 16 trakhir ngumpulne karo njikok formulir, 4. wajib membawa hp dan hp wajib terhubung ke internet saat mengambil formulir"
      },
      {
        "type": "date",
        "text": "3 Januari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Konten: POV nonton jumbo, nabrak motornya, milea dillan"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Heh gais. Sesok po pie ngukur lapangan beest, ngge kontes motor. Sesok pd iso budal pora. Target e adw saurunge tanggal 9 proposal kudu wes munggah [image: Kalender Event]"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Gasss. Kudu iso teko kabeh cah. Njalok tulongg polll ikii. Tunjukan lk angkatan adwe ki kudu apik, kudu maksimal persiapan e"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "nggae ne kapan penak e?"
      },
      {
        "type": "date",
        "text": "4 Januari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Sepurane ra ngabari pie\"ne, tas mari tandang gawe iki yoan. Bar bedhuk do iso e? Opo malah sesok e balek sekolah"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "bar bedhuk banget ini na? 😅"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Saiki ae ga sih na bar beduk wi. Lk ssk kedandapen lo gek balek sklh mesti kesel. Po meneh dino pertamaa masuk br liburn"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Bar beduk do iso e yo gas ae. Nggowo meteran pisan"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "bedhuk aee, aku sore mo kluar"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Liane iso teko ra bar iki, aku koyone lagek iso otw bar bedhuk, adekku 2 nk omah dewean. Kunci ro tak gowo"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "aku isoo, fix e bar beduk tenan iki?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nk akeh sng teko ayo ae, percuma yoan nk sng teko sebagian, sakne sng nyempetne teko nko kesel"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nk sng teko gur 3/4 pora podo ae, ngukur lapangan aku yo ra sepiro paham"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "aku enek meteran mntr e seng renek"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "[image: Desain Poster Kontes Motor] kurang py kiro'"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Terlalu polos. Lek iso montore surek"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Apik wi wesan. Nk gelem tambahi elemen koran ngunu kae lo apik. Koran scrapbook po opo ngunu. Konsep e dadi koyo brosur vintage"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "[file: Ukuran layout kontes motor.txt] kontes motor, panjang 220 cm, lebar (jarak per motor) 110 cm, jarak per baris (jalan) 120 cm"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "[image: Revisi Poster Kontes Motor] lek ngene py, opo kurang vintage"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Sip jos jos. Nyeni nyenok"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Waaazeeekkk. Gek promosi bolooo. Eh diwehi back sound apik ra yo"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "tapi renek tulisan tgl pelaksanaan kontes e wi, diwei ora"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Di seseli ae, tanggal pelaksanaan e. Ben ngga podo takon. (lalu) 28 sayy, hari rabu, januari yaa"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Huangnya belum hada kaaak. Proposal belom naeek. Uang kas ada berapa bu bendahara?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "proposal munggah yo pas pendaftaran bukak. Bukane nyetak form yo sak urung e proposal munggah?? Malah sesok anjir neng jadwal nyetak form 😭"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Huang kas cukup ngge nembel pora?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "pinjol sek po py 😭"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Pin(jam) pak gigih bole gasi 🙏"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Tak wari crypto"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Lyto cari crypto, yang muncul pak sugianto"
      },
      {
        "type": "date",
        "text": "5 Januari"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "kontes motor i hanya murid stmi atau dibuka umum wong luar oleh melu?"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Wong stmi tok poraan. Iki lek jupuk formulire kapan"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "tgl 9"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Aku sek urung takon jurine kelas e panggah opo ganti"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "wa nen juri ne. Njaluk ketemu gae mbahas kelas e op ae"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Yooo. Di wa 4 4 e. Ketemuan nndi trusan"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Pokok to cah, nk enek seng titip formulir kon moro nk ro ae, digae 1 anak 1 formulir 1 no. hp"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "wes di \"ok\" karo bu Dyan"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Besok mau ke Bu Dyan istirahat pertama aja yook. @Aurel nyoba bilango bu dyan, misal istirahat pertama beliau bisa tidak"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "oke. (besoknya) hurung takonn, sek tak takokne"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "wonge rong ngabari og. Aku deingi omong istirahat 1. Iki aku menunggu kepastian... menunggu yang tidak pasti"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nk istirahat ke 2 sek disambi sembayang barang"
      },
      {
        "type": "date",
        "text": "6 Januari"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "rencana: penjualan formulir kontes sehari 50 formulir. Dijual 150 formulir dulu. Jika masih ada permintaan ditambah 20 formulir. Fun run pendaftaran di r.o mengisi data diri + masuk grup. H-2 TM + ambil no dada. Jika jadi, di belakang menemui kajur TSM untuk peminjaman tenda. Fun run podium 123 dapat sertifikat + hadiah"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Pamflet e fun run ndg di post ae ga sih na?"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "sabar, sek proses tak edit iki"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Fix fix. Pokok dicicil sek ae, penting ngga sampe ndadak adw post e. Rasah kesusu banget"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "pamflet fun run informasine sg dicantumke opo wae?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "1. Tanggal pelaksanaan e 29 Januari, 2. Pendaftaran e datang ke ruang osis ngisi data diri, 3. Pas daftar nggowo hp seng wajib enek internet e, 4. H-2 TM fun run pisan ambil no.dada, 5. Podium 123 dapat medali + sertifikat + hadiah tambahan, 6. 100 pertama seng sampe finish dapat medali"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "[image: Peta Rute Fun Run] iki duk??"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Hooh"
      },
      {
        "type": "date",
        "text": "7 Januari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "(kirim daftar kategori: Herex cb, Herex gl, Cub 2 tak, Sport 2 tak, Best matic, NR, dll) Oiyo cah, iki mau saran kelas teko pak Yohan. Akeh jir kategorine. Tapi pak Yohan omong nk kui saran e, menowo enek sng dikurangi opo ditambahi yo monggo"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "mbien opo ra seakeh kui"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nggak, cuma 4 seng taun deingi. Kategori kasar e. Nah seng disarankan pak Yohan kui kategori sng lebih detail e"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "oooh pantes akeh"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nk kabeh ki jane iso ae, tapi huang buat hadiah e garek acc pora"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "[image: DM IG \"Perkelas ada batasnya apa engga min\"] lek iki opo to maksud e"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "perkelas e montore ye?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Eh Iyo, per kelas motor opo kelas sekolah. Nk per kelas sekolah kui 1 kelas max 2 form, misal nko enek permintaan lagi di hari berikutnya wi adw bukak war formulir. Dadi cepet\" an, tapi dijatah 1 kelas maks 2 form disek"
      },
      {
        "type": "date",
        "text": "8 Januari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Bawanen e semua, ngge jogo\" (ke Lutfi, soal uang kas buat nambali print)"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "[image: DM IG \"mau tanya regulasi ne apa aja\"] iki dijawab opo"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Sek to, regulasi ki jane opo to. Kelas e kontes opo uduk"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "na ik brrti nge foto mntr foto kopi kartu pelajar hooh ga?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Motor e berwarna. Iki uduk regulasi e?"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Intine ngono. Asline butuh kartu pelajar gasih bene ga enek penyusup"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Yo berarti teko pamflet kui kan de e nggowo uang 15k, hp seng kudu enek internet e. Kartu pelajar e urung ke tulis sih"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "diedit neh kii? Mumpung rung sui lekku ngepost"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nk taun wingi ora ngetokne kartu pelajar, sesok Kon ngetokne ae ben penak"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "la lek ra gowo?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Gaoleh tumbas formulir"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "[forward: Assalamualaikum kak, saya novi wulandari dari anov street food, mau tanya kak, apakah STMI Kota Blitar dalam waktu dekat akan melaksanakan diesnatalis/milad ya? Apa team kami bisa bergabung sponsor/tenant?]"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Buenntarr weeyy. Belum apa\" klo soal sponsor mah. Orang proposal aja masih belum selesai"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "aku njwb \"Waalaikumsalam iya kak, kalau untuk penentuan tenant akan segera dirapatkan ya kak\""
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "koutane lomba kontes seng 1 kelas max 2 piro?"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "tergantung, lek cpt ntek e ditambai (sistem war)"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Untuk kontes motor kelas sunmori persyaratan apa saja mba, sama selain kelas yang ada di brosur apa ada kayak sr/drag style"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Lek drag style pora mlebu herek"
      },
      {
        "type": "date",
        "text": "9 Januari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nko tak dispen kabeh cah, ngge garap proposal ben ndang munggah. Bar beduk"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "PIYE IKI. Molor tenan @ana. Mas gandi takon kr rodok ngamoks"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Jane ki panggah ae. Kan misal niat melu lomba pora kudu berjuang. La pie, misal adw bukak pas masuk sekolah wi malah adw seng kangelan"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "1 kemepet en, 2 rekapan e angel"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "tapi aku diserbu naa, pggh ngengkell"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Sek Iki njaluk saran ndek mas ilham aku, ser wa Bu Dyan yoan iki"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nk seng fun run wi iso digae online, TM e tanggal 22 e iso jane. Menurut e kalian pie jal? Nk digae online ki bayar e pie nko, mesakne sng ra ndue dana ngunu kae"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Lk emang wong e niat melok mesti di usahakne"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Jane iso misal adw bukak tgl 19 sampe 21. Tapi adw kudu kerja extra dingge rekapan. Tanggal 23 TM kontes motor"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Sunmori kui mntr e iso gl cb ngono gasih? Soale lk Herex kui iso motor trondol. Phm ga maksudku?"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "jurine gaada respon nih"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Urung, padahal tak kejar\" ket mau, tak takoni regulasine jawabane sebentar yaa"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "ANJIR AKU TEKOK ANJIR. Ga ngerti ma.. gaenek seng paham"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Cah\" ki renek sng paham tenanan. Jurine rodok belgedes. Mbok ewangi chat po pie?"
      },
      {
        "type": "message",
        "speaker": "Zetty",
        "text": "jane kls 11 seng phm tntng motor spo sii?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[contact: Pak Yohan TSM] Kilo"
      },
      {
        "type": "date",
        "text": "10 Januari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Iki nko kr dino senin ro ne dibukak ngge jupuk form. Misal Senin gaenek seng njupuk blas, dilanjut Senin ngarep pas masuk sekolah. Poster e dipost ulang ae, omong nk panggah bukak"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "[image: Juknis Kontes Motor] Mbk rahmaa saranku ya sok lek gae kontes motor neh smn wei keterangan ngonokui, ben penak di pahami"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Gais. Iki mau aku adol 30 formulir"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Cah, seng taun deingi pas masuk pora dituntun tooo motor e. Ora oleh nyalakan mesin. Kelingan e kalian pie?"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Iya"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Genti jawab en wi sng jurine: Pak Yohan, Pak Bily, Pak Anas. Sek oleh 3, pak Harsono tak takokne urung dijawab"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nk pak Yohan e kae omong 3 Iki sek sementara, Bu Dyan e nyarankan tambah pak Harsono"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "ma lek pomone poto montore lawas py marai montore urong dadi. Wernone bedo titik plng"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Gapopo nk bedo sitik, pokok ra bedo banget. Timbang ngga dinilai jurine"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "wi ndek grup pengumpulan karo pengambilan sesuai jadwal to?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Penak e Senin bukak awan po isuk? Pie wong pendapat mu"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "sesuai jadwal ga sih"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "fun run ki start e stmi trs finish e ndi"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Finish e stmi neh"
      },
      {
        "type": "date",
        "text": "11 Januari"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "[file: Regulasi Tambahan All Category.docx] 1. tolong lebih ditekankan terkait kebersihan motor pada saat kontes, 2. routing kabel itu penting, minimalisir penggunaan ties, 3. bisa membedakan mana komponen fungsional mana komponen visual, 4. sticker brand hukumnya haram. Kui dikirim grub ye? Apa gausah?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Kirim ae"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Enek sng wes teko e cah? Aku sek ngenteni siti diluk. Kelas 10 jak en gae denah kontes loo. Deingi kan wes diukur lap.e"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Itu kelas e ngak bisa di ganti to. Semua banyak yang menggundurkan diri lo"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Wes ndek sekolahan kabeh e?"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "urung kabeh tapi wes akeh seng ndek kene"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Sandalan gpp to?"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "rpp"
      },
      {
        "type": "date",
        "text": "12 Januari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Gais. Nko teko o sng senggang"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "nggae seragam na?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Bebas rapi sopan ae. Nggae sepatu"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "(malam) Mas Ilham saran war formulir. Total e war 30. @Aliva @Zetty nk sempat bengi Iki brosur e di edit ngge pengumuman war formulir kontes, sesok isuk di post. Lekas e bukak ro jam 11.50, sesuai jadwal brosur. Menurut e kalian kabeh acc pora?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Acc"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "SESOK SNG SENGGANG SILAHKAN HADEERRR. Maap capslock. Dikarenakan ada war takutnya kalo cuma 3/4 anak nnti kewalahan"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "pakaian?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Bebas rapi sopan + sepatu jane. Tp cina mau sandalan aman kok"
      },
      {
        "type": "date",
        "text": "13 Januari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "(ke Aliva) Gek dipost saiki ae. Sekarang tanggal 13 beeest. Hari ini war formulir langsung an"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "dadi kabeh kelas oleh tuku masio wes tuku 2 per kelas"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Hollleeeehhh. Los pokok. Cuma form e sisa 30"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Deingi kan munggahne proposal, ternyata revisi. Iki mau tak unggahne ulang, seng di acc sekitar 60jt an. Hari Iki dikasih 30jt sek, nko nk kurang dikon minta maneh"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "balloon gate e ga enek sidone?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Gaboleh weeehh"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Maune piro"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Padahal munggah pertama 89jt. KIT HEART TERBESAR KU"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "padahal deingi acc 75 hikss"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "kui ws dige job fair trus siaki arep digae harlah 😭"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Semangat dan sabar"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "ws nebak ga si, soale bulan iki ki acara e uakeh"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Wayae ki sekali\" ngundang hindia. Opo harlah renek hiburan e"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "panggung e ringging, lha gene dewe"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Ngene ki lk acara e adwe ora gede sng di tubruk i cah' osis e pdhl duet e yo cumpen 🙂"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "pokok enek: 1. mesin cuci, 2. mejikom, 3. kipas, 4. bak bayi, 5. baskom, 6. lemari, 7. meja belajar, 8. dll (daftar doorprize)"
      },
      {
        "type": "date",
        "text": "15 - 18 Januari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "(ke Rahma) minta tolong Dimas, valdo, kr Marvel oprak\" en"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Sesok pembukaan acara Karo enek 4 bidang lomba ndek ngarep. Kek ono solusi pie trs an"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Senin e terakhir pengumpulan. Iso ra iso kudu Senin terakhir. Mergane nk sesok wedi ganggu acara"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "sabtu minggu ngga dibuka to?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Minggu gelem moro ro pora?"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "senin pisn ae lekno"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Cah\" panitia ben leren. Mergane acarane mesti sampe sore\" malah perkiraan meh magrib"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "sepurane na aku mau lipi... posisi hp e do mati kabeh, pas buka wa gae tab ku bak e ws enek seng ganti"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Oalaaaa. Siiaaapp. Aman booosss. Podo\" sepurane yoan, mau mergane wes ditimbali pak yakin"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "@Lutfi @Rahma minta tolong dielekne ndek grub kontes nk besok terakhir pengumpulan formulir, dikumpulne pas istirahat ke 2 ndek ruang osis, batas e sampe istirahat ke 2 habis, selebihe kui ngga diterima"
      },
      {
        "type": "date",
        "text": "20 - 22 Januari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Cah. Ngko marani juri ngge konfirmasi formulir yoooo. Formulirku: kurang 2"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Oiyo cah, ngko gelem ra tak dispen kabeh seng kelas 11, kelas 10 e tak pilah pilih ngge bungkusi doorprize"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Ikut ikut"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Heemmtalaaa. Kangen kan we"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "seng bawa kunci siapa woi"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Ws di bukak"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "ojo mok kunci, njobo lanang tok, ben aku langsung mlebu"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "(22 Jan) Cah, nanti mau ambil uang ndek pak sugik, trus dispen e arep gae susunan kepanitiaan, edit lembar penilaian juri kontes, daftar hadir TM, sama print peminjaman aula + undangan juri ndek pak tulus. Iki nko tak omongne nk dispen e maju jam 9"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Adwe ws ngwe grup panitia ye?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Adaaaa. Kelas 11 wes tak masukne kabeh kok"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Lk izin e tugas yo ojo egois kabeh tugas yo numpuk' lo. Ninggal tugas 1 kabeh sak angkatan yo kudu ninggal. Ojo egois karepe dewe'"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "[sticker: KELAS KING]"
      },
      {
        "type": "message",
        "speaker": "Zetty",
        "text": "maaf yaa gaiss aku ugung iso ngewangi kaliann 🙏"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "cepat sembuh buat zettyyy 🤞"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "[forward: kalau mau ikut fun run tpi kartu pelajarnya hilang gimana?]"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "pake identitas sing nunjukne sik dadi siswa stmi gak sih? @ana"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Nge foto sng Nde rapot"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Cah. Iki medaline kan anggaran ndek proposal cuma 10rb, nah enek e medaline seng kelet an logone. Menurut e kalian pie? Gapopo yooo"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "njirr 10k 😭"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "yoo arepe piye nehhh nek ngunu"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Eh cah. Enek seng arep ganti motor gek sesok TM ki pora penak e tak jawab ngga oleh yoo? Opo oleh ae, mergane wes sesok TM, menurut e kalian pie?"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "bisa. Mergane biasane maksimal h-1 wes tidak bisa ganti"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "[audio: Penjelasan TM] ..."
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Iso na"
      },
      {
        "type": "date",
        "text": "23 Januari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nama lengkap e bener to tapi, yo nk gurune kon ndudohne dispen e iki karo kwitansi, trus omong nk kui salah ketik"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "[broadcast: Assalamualaikum teman-teman, mau mengingatkan kalau hari ini jadwalnya TM kontesnya motor, jangan lupa untuk membawa kwitansi pembayaran yang nanti akan dicek oleh panitia saat mengisi daftar hadir]"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Iki akeh seng tekok lek lali ra gowo kwitansi di sauri py? Tak omongi lek ge foto oleh ngunu yo?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Yoooo"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Benner: 1. panggung kanan dan kiri: tinggi 3.5m lebar 65cm, 2. panggung atas: tinggi 65cm lebar 7m, 3. panggung kontes & funrun: 8x3m, 4. photo booth: tinggi 3m lebar 4m, 5. selamat datang: tinggi 60cm lebar 2.5m"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Id card e wes sampe kah?"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "blm"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Saran dari kalian e pie cah? Id card e tetep dikasihne pas selesai TM? Nk ngunu nko bocahe kon ngenteni sek ae ngge bagikan id card. Iki ide pertama ku, ide ke 2 ne rodok ribet, nko dikon ambil dewe\" nk ro"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "py... sui ga. Aku wedi diserbu"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nyoba diomongi sek ae pi, nk habis ini sekalian ambil id card. Terus seng tadi belum regristrasi gaboleh keluar dulu"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "jurine kon meninggalkan ruangan gapopo?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Iya gapopo. Nko jurine kon menyampaikan nk seng belum registrasi raoleh metu sek, karo id card e dibagikan setelah TM"
      },
      {
        "type": "date",
        "text": "24 Januari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Eh gais, omahmu angin e banter ra? Serku nko nk sekolahan ngefiks ne kepanitiaan karo welcome gate budal jam\" 10an kawanen ra?"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Jam 9 na engko cah cah mesti molor"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Deingi tali id card nk ro akeh rupane, opo tumbas neh e?"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Sng peserta biru. Ng ro enek kuning lkra salah"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Kan yo di wei id card ko adwe. Lk iso tali ne id card Ojo podo biru ky sng peserta. Ben kenek di nge bedo"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[image: DM Calon Sponsor] Menurut e kalian Iki diterima ngga? Pas kae Bu Dyan tau saran nk aku, misal Sido enek sponsor, nko dideleh nggene emperan kelas, menurut e kalian kui efisien ngga? Opo dideleh parkiran baru?"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "yoh ojo emperan kelas"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "Iki masuk e bazar UMKM kan?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Iyo, Iki termasuk umkm"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "sreg ae, ben enek sesuatu yang baru"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "[file: Denah Kontes Motor.pdf] iki tulong kirimno nk Bu Dyan. Omongne nk \"buu, ini denah buat kontes motornya buu, sebenarnya kurang lebih sama seperti tahun kemarin\". Ojo lali salam kr minta maaf ganggu waktune"
      },
      {
        "type": "date",
        "text": "25 - 26 Januari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[file: undangan juri-mc.docx, rute jalan sehat dan rute funrun.pdf]"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "[forward: Pastikan bsk smua motor masuk sesuai nomor. Dan hrs mmbawa id card]"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Funrun: Pos 1 pertigaan timur smki, Pos 2 perempatan jalan lawu, Pos 3 perempatan bok Ireng, Pos 4 perempatan mal pelayanan publik, Pos 5 depan SMK katolik, Pos 6 tikungan toko ijo, Pos 7 tikungan setengah toko ijo. Jalan sehat: Pos 1 perempatan Hotel puri perdana, Pos 2 patung koi, Pos 3 pertigaan jalan Cisadane, Pos 4 pertigaan sebelum lampu merah taman bendo, Pos 5 Sport Center"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Tugas: 1. Ngefiks kan denah: Aurel, Lutfi, Hafis, 2. Cetak surat menyurat: Ana, Sifa, Denia, Bayu, 3. Edit benner balon: Lionel, Azzam, 4. Mengantarkan surat MC dan undangan panitia Pramuka: Raja, Lyto, 5. Beresi kepanitiaan: Afif, Rahma, Hanza, Rian, 6. Cetak welcome gate & benner balon: Ana, Aliva, 7. Foto pos\": Dwi, Dimas, 8. Pita finis, 9. List dispen kepanitiaan, 10. List dispen fun run"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Na engko lk di dispen ket jm 7 ra iso e"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Tak jajal omong nk mas resa e ben penak yoan"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Cah, nko ngenteni dispen metu lagek nk ro opo teko langsung ro ae"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "tp Dispen e tenan jm 7 pora garian"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Aku wes omong Bu Thoifa, tapi urung ke bales. (lalu) Bu thoifa wes jawab, \"waalaikumsalam, iyaa\". Nk wani langsung ae gapopo, dispen e menyusul"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Woy wong sok persyaratan e mlbu kontes kartu pelajar id card Karo kuitansi?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "hooh kui tok"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Iyaaaa, pokok kudu ndudohne id card karo kwitansine. Nk salah satu gaada, gaoleh mlebu"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "(malam) 1. Print denah kontes (5 lembar), 2. Dispen kepanitiaan, 3. Dispen funrun, 4. Ambil no.dada funrun, 5. Ambil welcome gate, 6. Ambil HT, 7. Ambil pesanan di teratai, 8. Pasang semua benner, 9. Pasang police line, 10. Gelang jalan sehat, 11. Undangan Irna"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "gelang jalan sehat aman?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "don't know"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "daftar pemenang lomba: Estafet, Voli, Futsal, ML, Badminton, Tenis meja. Siapaa ajaa beest?"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "ML juara 1 onic kW, juara 2 go to jepang, juara 3 El scrim"
      },
      {
        "type": "date",
        "text": "27 - 28 Januari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[file: kepanitiaan harlah fiks.docx] 1. Mintakan dispen ke TU: Ana, Afif, 2. Cek persiapan buat TM: Aurel, Lutfi, 3. Ambil pesanan di teratai: Dimas, Bayu, 4. Selesaikan editan sertifikat, gelang jalan sehat, desain stiker piala: Aliva, Zetty, Azzam, Lionel, 5. Ambil welcome gate ke pak Zaenal: Lyto, Raja, Dwi, Hafis, Rian, Hanza, 6. Ambil HT ke pak tulus: Rahma, Denia, 7. Print denah & undangan Irna, 8. Konfirmasi ke pak sugik buat pohonnya & tempat stan sponsor: Ana, Bayu, 9. Tanya juri / mas Ilham format penilaian kontes motor, 10. Print kertas penilaian"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nomore dada minta tolong nanti dicicil digowo Rene yaaa"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "golek o panggung dingge ngedukne sepeda nendi tekok o mas Ilham utowo jurine trus umumno ndek grub kontes"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Ht cuma dapat 10"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "pak yakin butuh 1 pendamping untuk kasih tau roundown ke operator sound"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Eh iki enek seng takon lek sak umpomo parkir ndek sandinge parkiran sanding pondok Bustanul wi py"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "gak oleh parkir ae"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Masyaallah, terima kasih banyak yaa teman temaaannn 🙏"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Q masang stiker max 136"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "136 wi berarti sisa tempat e gur semunu. Ngga sampe 138?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Police line e entek. Ws ndng turuo ssk sik akeh kerjaan"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Ey gais, seng bagian kepanitiaan kui seng konsumsi tak gae pas tanggal 29 tok yooo, dadine sesok seng distribusi konsumsi ben cah osis ae"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Manut jee"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Sampaikan pesanku sama yang lain: \"Ndang ganti klambi gek babuk kabeh, nko isuk sek dilanjut. Daaaann, terimakasih sudah bantu membantu lembuurr 🙏\""
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "(pagi) Cek grub 10 11. Pilis plis"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "sek sek ket Tangi otw"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Cah pramuka sing jogo mburi njaluk minum"
      },
      {
        "type": "date",
        "text": "29 Januari (Hari H)"
      },
      {
        "type": "message",
        "speaker": "Zetty",
        "text": "Cahh aku izin telat sitikk"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Ndi iki osis e"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Aku izin telat sek cah soale ro mbokku ra oleh budal. Isuk gr' nde inggi"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "sing Lanang Lanang no ndi"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Dilut nkas teko"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Sekarepmu lah ch' chat read tok"
      },
      {
        "type": "date",
        "text": "4 Februari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "@Rahma minta tolong uang e 400 sampean bawa. Nko ben penak nk garap lpj. @Aurel nk urung budal minta tolong laptopnya dibawa, ben iso garap bareng. Sopo ngerti mari dino iki 😌"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "udah berangkat kaa, maaf gak kepikiran 🙏"
      },
      {
        "type": "message",
        "speaker": "Zetty",
        "text": "@ana jaluk tulung sesok mintakan ttd juara 123 kontes motor semua kelas + ttd podium 123 fun run. Aku tak jalok ttd kontes seng 2 tak sport"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "Yo cah cah kui baginen pisan sopo ae"
      },
      {
        "type": "message",
        "speaker": "Rahma",
        "text": "Lyho wi sng rong kebagian milih o. Rahma fun run, Zetty 2 tak sport, Lyto 2 tak cub, Dimas Herex, Raja Sunmori. Kurang neh ra?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Ik ws dibagi jo lali ditandangi selak butuh"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "kwitansi ne wes enek rung?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Wes, sesok tak wehne Rahma nk ra Zetty"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "wi Hadiah e wes di weh ne to?"
      },
      {
        "type": "date",
        "text": "8 - 10 Februari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Anak media apakah masih urip? Foto dokumentasi loadingnya masih lm y? Udh ganti bulan iniii, blm lg deadline desain buat ramadhan"
      },
      {
        "type": "message",
        "speaker": "Zetty",
        "text": "[link: DOKUMENTASI HARLAH (Google Drive)] ngedit opo ae?"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "banner, poster. Sg kyo taun wingi"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "lha py lek enek video tok, lk ra nganu ae barcode e dipost disik 😭"
      },
      {
        "type": "message",
        "speaker": "Zetty",
        "text": "brcode disek, fto e keri yo"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Speaker e mas Ilham nendi"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Jajal tak takokne grub sebelah. Mergane aku ket eroh rumape speaker ra tau nyekel rupane"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "kro triplek e kae sik kangge pora"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "[link: LPJ HARLAH (Google Docs)] cah ewangono masukne foto nko tak totone gpp 😭😭. Jaluk tulung golekno foto kabeh: banner, doorprize sng akeh, konsumsi, minum, kable tis, tali rafia, double tip, kamera, bocah sng juara lomba', balon hiasan panggung, balon sng mumbul, foto juri, foto wong isi bensin, lakban, peniti besar, air minum juri, tumpeng pita finish, per stiker an, sertifikat. Golek i nk dokumentasi biasane enek"
      }
    ]
  },
  {
    "id": "grup_bukber",
    "title": "Bagi Takjil & Bukber 1447 H 🕌",
    "avatar": "/assets/covers/grup-bukber.svg",
    "members": "38 anggota",
    "history": [
      {
        "type": "date",
        "text": "19 Februari 2026"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "[image: Poster Selamat Menunaikan Ibadah Puasa Ramadhan 1447 H & Aksi Berbagi Takjil 1 Maret 2026]"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "KURANG PY EDITAN E"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "@ana sido enek bagi takjil ga, kok ga enek omongan"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "@ana Ramadhan race e py"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Cah akidah sek bimbang jare"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Jane wes mueepett"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Ho oh yon, we sng playon dewean"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "cah we podo ra kangen aku ye"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Opoyo gur bagi\" takjil tp cah osis tok ae yo"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Tapi kok hambar men"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Kangen nk we nyangoni yon"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "woh peli"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "spo cah akidah"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "@ana kok sui lek mbales, kyo seleb sepuluh ewu folower"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Ngukut i lpjmu wong, Ket jaman renak ramari mari 🥱"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Ketuane raja"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Bukber po o bos"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "agendakan"
      },
      {
        "type": "date",
        "text": "22 Februari"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "Cah😭😭 izin telat Tangtur aku 😭🙏"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "[call: Panggilan video tak terjawab, 11 menit (2 bergabung)]"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "[video: Tangan memegang kain merah putih]"
      },
      {
        "type": "date",
        "text": "24 Februari"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Ch, lem sing dige ndek triplek kae opo isek?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Gatawu aku 🤷"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Eh cah, aku ndue ide"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "??"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "mesti nyleneh"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "mestine"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Eh sek deng"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Kalian e ra kabeh eroh konsep e kegiatan Ramadhan e 🙄"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "@Raja minta tolong dijelaskan disini konsep nya gimana"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Dijelaskan pake bahasa sng simpel e ben podo penak nk mahami"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "gendeng"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "rasah ngece su"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Gabermaksud ✋😮🤚"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "@Aurel rel rutenya udah selesai belum"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Konsep bagi\"takjil: 1. 10 ekstra diminta perwakilan 5 untuk bantu acara bagi\"takjil, 2. demis sepuluh orang, 3. takjil per titik (tempatnya) 150 takjil, 4. total 9 pertitik (tempatnya bagi\"takjil) diisi 10 orang, 5. pertitik (pertempat) 1 OSIS dokumentasi, 6. tresbek dibutuhkan 27 pertitik (tempat) 3 tresbek, 7. 1 tresbek diisi 50, 8. acara dimulai tanggal 8 Maret hari Minggu jam 16.00"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "demis 10 orang?"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "demis mok batasi"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "La demismu osis njaluk piro yon"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Wong Demis e yo lumayan titik"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ojo mok wei 10 orang"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "takonono seng iso teko sopo ae"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ngelist"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ngono"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ojo mok wei batesan"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "rapenak"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "masio demis e yo ra enk 10"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "sing ngongkon 10 mas ilham"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "moyok"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "😑😑"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Dino opo ja? Jam e? Takjil e total e piro? Isine takjil?"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "hoh ye @ana"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Hari Minggu tanggal 8 Maret mulai acara jam 16.00 WIB"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Monggo desertaaken mawon teng mas Ilham e"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "tgl 29 bulan Februari 2026"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Sek yon, kasih panggung dulu buat PJ nya @Raja"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Monggo @Raja Ben cah\" nk ditakoni sopo\" ra jawab gatau"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "aku ra mok jak ?"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ye"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "balek rung we"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "muleh ku tgl 18"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "😭😭😭"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "tapi tgl 7 serku muleh"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "nyempetne sedino nkas ngunu 🗿"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "La wi looo"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "tgl 7 prayo sabtu"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Bolos sedino e ra kroso wi"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ndase"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "muleh sabtu sore, mbalek minggu bengi"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Naah kui"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Iso (paling) wi nk melu"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "bisa diatur"
      },
      {
        "type": "date",
        "text": "25 Februari"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "[file: bagitakjil-Model.pdf (Denah rute 89 kB)]"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Yooeee"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Kamsia aureell"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Eeyy reell"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Maaf banget ni yeee gare\" bapak kamu itu, kita kerja 2× ya rell"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Revisinya di @Raja"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "gk sido leren yaaa @Aurel 🤭🤭"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "ok\""
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "sek yo ges aku rong turu"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Ya Allah ya Allah"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "kapan butuhe wi"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Dimulai sekarang bisa rel mergane sesok wes Munggah ne proposal"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "La Aurel e arp turu sek jare"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Pokok ra sampe nko isya iso e rel?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Maks jam 8 bengi wees"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Pie rel? Udah selesai kah? 🤭🤭🤭🤞"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Proposal ramadhan garek insert gambar denah tok gek wes rampung (insyaallah)"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "oooyyy"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "🛐🛐🛐🛐"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "tas mari, aku hilang arah"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "[file: ba.tak-Model.pdf (92 kB)]"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "pener pora rute ne"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "seng garap hilang arah"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "kabeh hilang arah ✋🤚"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Ya Allah ya Allah"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Yang kasih perintah pun mulai hilang arah 👀🛐"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "SIIPPPP"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "CINTA AUREELL 🤞🤞🤞🤞🛐🛐"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "🥹🥹👌"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "oomaygattt"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "masalahe seng tukang garap denah e buta map"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Ya Allah ya Allah"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Gpp kok nak, kamu berhasil buat map dgn keadaan buta map 🥹👌"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "awokawokawok"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "png gak bisa kahhh😭😭😭😭"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Btw iyo wey 😭"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Aku sek golek carane insert gambar kui nk proposal 🛐🛐🛐🥹👌"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "sksksksk"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "sek sabar"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Gausa repot\" deng, wes kenek iki"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "iki ws tersiksa carane input e py😭😭"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "njerr"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Pake Canva ternyata 🤷"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "lah"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[image: Denah Rute agak buram]"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "sido ra"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "🙏🙏"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "oke deh"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Yeeuu walaupun ngeblur 👀👀👀👀👀👀"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "ya Allah sedihnya"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "sek tak donglot"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "sabar tk golekne cara alternatif 😭"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "🥹👌 🛐"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "[image: Denah versi lebih jelas]"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "😭😭😭😭"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "lek png garise kurang kandel"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Garis e patah seperti hatiku🛐"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Terima kasih effort nya, but aing pilih yang ini aja"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "bjiirrrr"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "hooh mending burek wes"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "🥹🛐"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[file: PROPOSAL BUKBER 26.docx (2.7 MB)] Monggo mas, mbak, saget ditingali niki proposal ramadhan, menawi wonten koreksian monggo nyuwun tulung jenengan benakne langsung nggeh...🥹🥹👌🛐🥰🤞"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "taek i"
      },
      {
        "type": "date",
        "text": "26 Februari"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Weeyyy lali arep nyampaikan ide cermelang kuuu"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Anuuu ikii: 1. Munggahne LPJ dino Iki, nko janjian kr pak sugik sekitar jam 10an, 2. LPJ wes garek Munggah tok, 3. Sng munggahne nyuwun tulung Meyra, Lutfi opo Lyto or Meyra dng yang lainnya nggeh monggo kerso, 4. Aku ngewangi cah akidah koordinasi kr pembina, nyicil i proposal and munggahne proposal juga, 5. Jadiii minta tolong kpd setiap PJ nanti proposal/LPJ dinaikkan yaaa, 6. Proposal ramadhan wes mari 95%, garek nko enek revisian opo nggak. Mohon bantuannya nggeh mas/mbak 🙏😌"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "Untuk yg g dateng kmrin knp g d suruh ikut sekalian ??😊🙏 bertanya dgn nada lembut"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nanti mualai jam 8/setengah 9 ro wes ready kok (wes dibukak)"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Monggo kerso jenengan ajak sekalian, de wingi sng lpj classmeet kulo piyambak sing munggahne 😌🤞🛐"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Rencang\" sekalian nk diajak @Meyra boten pareng protes nggeh, kerja sama ben ndang kukut garapan e"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "[image: Pesan sekali lihat \"Dibuka\"]"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "@Aurel aurelllll"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "denah e ganti nehh rutene mek 3 saiki: • patung koi (panggah), • ngarep stmi, • TMP. Semangat yahhh, deadline e nanti malam yahh kalau bisa"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Banyak\" nyebut ya reell #sengeling #singsabar 🛐🛐🤷"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "aku resign"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "1 lagi relll😭 semangat semangat, jam 8 yahhhh"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "sia\" epprot ku, gak pernah sekecewa ini"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "prettttt"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Dikecewakan sm bapak sigik... Sugik"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "secepatnya yahhh😁😁😁😁"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Ndang garapen"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "sek tak benakne"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Masyaallah masyaallah"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Alhamdulillah ya Allah"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Konsep bagi\"takjil: 1. 10 ekstra diminta perwakilan 5 untuk bantu acara bagi\"takjil, 2. demis sepuluh orang, 3. takjil per titik (tempatnya) 416 takjil, 4. total 3 pertitik (tempatnya bagi\"takjil) diisi ada yang 30 orang, 5. pertitik (pertempat) 1 OSIS dokumentasi, 6. tresbek dibutuhkan 15 pertitik (tempat) 3 tresbek, 7. 1 tresbek diisi [kosong], 8. acara dimulai tanggal 8 Maret hari Minggu jam 16.00"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ra dong blas aku ja 🙏 😭"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Konsep e diganti neh"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "no 5 mksd e py?"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ra dong"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "Sak ngon enek 1 OSIS dokumentasi @Raja Hooh to?"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Hooh"
      },
      {
        "type": "system",
        "text": "Albion mengubah ikon grup ini"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Aureelll kiw kiw @Aurel"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Pamek ancen tolil"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "[video: Lantai keramik putih]"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Reeelll kita butuh bantuan mu🛐🛐🛐🛐"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ra butuh aku ye"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "🤷 We repot ngunu"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ndak blas"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Ewangono aaku"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "po o"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Adalah pokoknya"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "jp"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Orara"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "what"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Denah besst, Agisa tutup jam 10 soale 🛐🛐🛐"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "[file: tiga.pdf (80 kB)]"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Alhamdulillah Ya Allah. Mudahkanlah rezeki temanku yang membuat denah ya Allah AAMIIN 🤲🤲🤲🤲"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "AAMIIN"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[file: REVISI PART 2.docx (1.0 MB)] Jajal bukak en cah, format e morat marit pora? Iki file isine revisian tok"
      },
      {
        "type": "date",
        "text": "27 Februari"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "[image: Tabel Anggaran Dana Bukber Takjil Rp10.130.000] Cah adw wes munggahne proposal, Munggah 10.130.000 tapi turun e cuma 6.500.000, dadi rotine nggae roti sisir, trus sng air minum santri diganti seng gelasan, terus rasido nggae trash bag, sidone nggae karung ngko karung e minta ndek ruang seragam dimintakan Bu Thoifa"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Ngko nek enek pembina seng takon Ojo nyauri ora roh Yo, misal bingung Takon Takon o Saiki nk kene, timbangane Podo njawab ora eroh malah dadi omongan neh"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "banner 4 pcs? wi py mksd e @Raja, banner op"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Pertempat kui enek benner desain ne Podo ukuran cetak e bedo"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "trs njaluk didesain py kro cah media? bagi takjil dewe, buka bersama dewe, opo bagi takjil kro buka bersama didadekne dadi siji"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "[image: Poster Bagi Takjil] iki sg bagi tkjil"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Desain e benner dadi 1 ae, gawenen ukuran cetak e 2×1m Karo ukuran cetak 4×1.5m"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Desain e tetep, cuma gaweo ukuran e bedo"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Dadi satu proyek NK Canva enek 2 halaman, halaman 1 ukuran cetak 2×1m. Halaman 2 ukuran cetak 4×1,5m"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "iyo ngerti bedo ukuran, aku tekok desain e, brrti buka bersama kro bagi takjil didadekne sak desain?"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Oalaaa, okee\" berarti nggae 2 desain ae: 1. Benner khusus bagi\"takjil cetak ukuran 2×1m (cetak 3 benner) digawe nggene dalan\", 2. Benner khusus buka bersama cetak ukuran 4×1.5m (cetak 1 benner) digawe nk aula"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "nah ngunu lo oke"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Ya"
      },
      {
        "type": "date",
        "text": "2 Maret"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Assalamualaikum, Tgl 13 podo free pora ki?"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "acara op"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Bukbeeerrr again"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "mundur?"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "[image: Rest Area KM 429] dolan\" ngono lo cah ben ra sepaneng\""
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Ora, wi bukber khususon kls 11 and 12. Acarane osis panggah sido minggu sesok"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "elah, akuu sesok mboh iso teko mboh ora, mergane sek neng solo, mboh sampek kapan"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "assalamualaikum wr.wb, selamat sore mohon maaf mengganggu waktu teman teman semua, mohon untuk per sekolah mengisi list HT dibawah ini.. terimakasih🙏 1. SMKN 1 Blitar = 5 HT analog, 2. SMKN 2 Blitar = 8 HT analog, 3. SMKN 1 Nglegok = 5 HT analog, 4. SMK PGRI Wlingi = 7 HT analog, 5. SMK 1 Udanawu = 6 HT analog, 6. SMK Islam 1 Blitar = 5 HT analog, dst..."
      },
      {
        "type": "date",
        "text": "3 Maret"
      },
      {
        "type": "message",
        "speaker": "Zetty",
        "text": "[image: Foto Tumpukan Kantong Kresek, Trash Bag & Gelas Plastik]"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "@Zetty mau kresek e kefoto ra?😭😭 Lali to aku"
      },
      {
        "type": "message",
        "speaker": "Zetty",
        "text": "lahh, jare mok poto mauu 😭"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "[image: Poster Buka Bersama Menjalin Silaturrahmi 8 Maret 2026] ngeneki elek ye?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Azeeekkk, Apik wi wesan. Wi arep di finishing neh opo wes mari"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ra enk fotoku to joh"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "sg pmr py, iku renek"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "we ki sopo"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Ncen rung ndue seragam wi PMR e. Gaenen model pdh ne osis trus warnane opo ngunu nko enek logone pmr"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "okee"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Pamek kan cah selat"
      },
      {
        "type": "date",
        "text": "4 Maret"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "@Lutfi mauu minta tolooong🥺 Jumat kalo ngga kamis pickup mu kepake ngga? Arep ngampil ngge ngusungi takjil e nggene mas Ilham nk sekolahan"
      },
      {
        "type": "date",
        "text": "5 Maret"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "[link: Banner Bagi Takjil & Bukber Osaki (Canva)]"
      },
      {
        "type": "date",
        "text": "6 Maret"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Yoooooeeee siiippp"
      },
      {
        "type": "date",
        "text": "7 Maret"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[image: Paket Takjil Terbungkus Kertas Dilakban]"
      },
      {
        "type": "date",
        "text": "8 Maret (Hari H)"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "[image: Kardus Berisi Bungkusan Takjil]"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "...makan ges"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Sok nk balek gawakno menu best seller e yoon"
      },
      {
        "type": "date",
        "text": "9 Maret"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Gais, nko pulsek eval yoohh ❌"
      }
    ]
  },
  {
    "id": "grup_ldks",
    "title": "Panitia LDKS 2026 ⛺",
    "avatar": "/assets/covers/grup-ldks.svg",
    "members": "40 anggota",
    "history": [
      {
        "type": "date",
        "text": "2 September 2026"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Btw gais. Proposal hari ini udah naik, uang anggaran 8.562.000 tapi cuma di ACC 8.000.000, hari ini uangnya masih dikasih 4.000.000, sisanya baru boleh diambil besok"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "apaa"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "jre koko seto josjis 🔥"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "kenek ngge nyewo seto"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "HALAH HALAH"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "nggateli raine lyto golek berkat"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Layak ket mau munine"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "rawon seto"
      },
      {
        "type": "date",
        "text": "3 September"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "HEEYY ANTEK ANTEK ASENGG. Kalian ada pantangan makanan tydak"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "SIPAA : ENDOGGGGGGGG"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "WOOKEEEY, noted 📝"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "Ga enek kumpulan eneh ye ikii sng bahas ndeinggi"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Sng ttg proposal e? Nk ttg persiapan iki serku bnr\" sng kabeh iso teko. Percuma nk aku sng nentukan hari kumpul e, ending e pas hari h sng teko titik. Lumayan kesel yoan njelasne bolak balik"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "ayo ngumpul tapi kabeh kudu teko. Lek ra yo ndak mau ngapain, ngene wes ojo aku ojo ana seng nentokne kapan e. Kalian iki isone kapan"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "la spo sg nentokne 😈"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "yo ngko koyok deingi. Opo vc ae. Rasah kumpul kumpulan"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "la lek sabtu iki ngono po pie, tp kumpul KABEH gek uwes, andekno yo lek suk malah mepet acarane gek adewe repot ngurusi laporan, jurnal mbarang"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ojo sbtu poo"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "la kapan"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "mesti og ngenteni wm balek"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ges kalian jadi kimpul hari apa"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "mbot. Kimpul kpn"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "mingdep"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "alah jembod. Jarene sesok"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "la liane lo ra mbalesi. Jre ana tgl 12 13"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nk sesok i iso ae jane, tp yo panggah ora kabeh"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "iyaa, aku jg bisa kok hm"
      },
      {
        "type": "date",
        "text": "6 - 8 September"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Iso ku jam 1/2 an nko awan. Saiki sek umbah\""
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "liane pie"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "ayo ae, aku iso"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Euy cyung. Jumat ngarep serku nginfo ndek adik\" ttg kegiatan ldk. Pas mereka pulsek pisan. Pie"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Jumat sore sng wes balek pkl mampir sekolahan yo"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "Ga enek kumpulan eneh ye ikii sng bahas ndeinggi"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "La nk ttg iki deinginane albion ws nawari sng jawab aku kr alipa gur an"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "Bion nesu ki wesan. Wes direwangi balek blitar bak e rasido kumpul"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Aku deingi\" ws omg kalian\" mayoritas jadwal kosong i kapan. Nk aku sng nentokne kumpul nko rnk sng teko neh yo goroh"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Jumat iki sng iso yo teko, wong kalian ora kabeh pkl do balek bengi"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "oke na"
      },
      {
        "type": "date",
        "text": "19 September (Polling Tanggal Kumpul)"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Antara tgl 26-30 September iki kalian kiro\" iso ngga nk tak jak ngumpul ngge ngomongne ldk"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Deingi\" kalian eruh e cuma file rundown tok kan. Kalian juga mesti enk sng ditakokne cuma urung ngomong tekan"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Antara tgl iki adw kumpul, tak kabari opo ae persiapan ldk, nggenahne yoan bagian\" e kalian nyekel pas opo"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[poll: Pilihan Tanggal Kumpul: Sabtu 26, Minggu 27, Senin 28, Selasa 29, Rabu 30]"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "26 penjemputan sik an 🙂"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "geser 27. Opo 28 29"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Mari penjemputan ws gak budal pkl neh to 😭"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Yo ngapain budal neh. Wes wayah laporan pkl kr prepare ldk"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Minta sertifikat"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Iyo seh, cuma kan ngga sedinoan"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Kumpul e nk kopian ndi menurut e kalian? Ben ora suntuk nk ro teros"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "nek speatle space"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Opowi"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Ndi neh pilihan e, tak gaene pooling"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "apik wi gene"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Trust issue pilihanmu sumpil 🙂"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "opowi"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "lek panggone apik wi trahan pip"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Aku kan ga tauu 😭"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "(daftar rekomendasi) tibal coffe yg baru, restorasi, dopamine, kalapadi, cassa"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "nyejuk lekrangunu sawo"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "menowo lek ape mbahas luweh penak mergo hening"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Ndek ruang vip hening menowo enk 😌"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "stasiun top 10 opo tembak langit ngono lo apik"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Low budget banget 😭"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "jan hemat uang sak polle"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Pooling e di isi sek ae"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Pokok sing sekirane kabeh budyall"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Ojo diread tok. Tak bayari wes. @semua. Prankk, tak wei budget 20k peranak 😌"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "mantapp, ra omong tok to iki"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "20 entuk kopi 1 @semua"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "orang have"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Gaa guyon yakk, jadi silahkan ngevote teman teman. Cumaa gara gara uangku juga terbatas jadi 20k aja gausah mahal mahal 😭"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "gabisa ikut aku kak"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Yahh kecewa"
      },
      {
        "type": "message",
        "speaker": "Anang",
        "text": "renekbarengan mole ndlok\" sok"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Okeyyy"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Btw kumpulnya jangan malem"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "yo ra lah. Isuk lk ra awan e lo"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Page ke siang wae gase"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "@Lutfi gimana nihh kabarnyaa, pulang gaa. Pulang lah ws mari pkl 😭"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "Tgl? Tempat! Jam?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Makanyaa pilih nanti yang banyak yang dipilih"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "Ngikut ak pkok lk ngabari g ndadak. Kagakk paling h-5 hari ku fix in"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "Pkok ora Sabtu ngarep. Aku ngwe stnk"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Iyoo aku barang gaiso sabtu"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Jam e ngenteni pooling pisan"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Siang aja gasih 😌 Jangan sore sore"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "itu pagi sepi gen ngopine"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "wong mendo lek dikon gae pooling. Golek kupu' malam ye yahmono"
      },
      {
        "type": "date",
        "text": "20 - 21 September"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Seattle space i apik asline, tapi aku bar ndelok nk medsos nggon e pas\" an, ndw rombongan ngene koyoe sok sek nggeret kursi ngge mlumpuk 1 meja. Begimana"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Nendi jal sing iso ramee 😌"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Akeh. Tibal sng anyar, kalapadi. Liane kui yo akeh sng ombo"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "(ke Dimas dan Zetty) Iki sing milih Senin, Minggu tetep bisa kan??"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "aku bisa tapi ga sampe sore"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Deeeeyy lama kau tak mucul (ke Lutfi)"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "lek enek opsi liane. Mambengi urung cek nggon e seh. Pooling ulang yoo"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "Luxa roketo"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "DEYM, gais"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Sepurane plies, aku lagek kelingan tgl 27 ternyata wes enek jadwal disek, wes keisi ket minggu deingi seh, cuma tolol e aku lali. Kumpule mundur senin balek sekolah oke ra, sorean ngunu, nggone golek cedek\" an ae wes, mbah adjam opo kalapadi"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "@semua berikan pendapat kalian masing-masing"
      },
      {
        "type": "message",
        "speaker": "Zetty",
        "text": "okee ae lekno, senin ngarep?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Fiks senin ya??"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "iyaa"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Aku due pr neh buat kita ahahah 😌"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Iki nk kepo wajib teko pas kumpulan sok, ceritani kabeehh"
      },
      {
        "type": "date",
        "text": "26 - 27 September"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "kumpule senin muleh sekolah?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nk iso budal kabeh, menisan nk info ldks e pas kabeh enek"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "Kalapadi pie. Opo nndi yo, golek cedekan sekolahan ae ben penak"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Pklmu pirang ulan"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "sampek lulus"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Nendi sidane juh"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "stasiun patria"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Halah, stasiun\" ae opo arep kereta date"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Kalapadi ae yoh. Gas ra sesok balek sekolah? @semua"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "ayok"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "ayokkk"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Pulsek tikum nndi seek. Parkiran ndi opo kandar opo ro"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Budal dewe dwe 😭"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Ndelalalah budal dw sng teko siji loro"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Duar"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Eman nk mu ra teko cah, ditraktir afif @20rb"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Laiyo. Arep njikuk sertifikat disik i tp"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "ora aku"
      },
      {
        "type": "message",
        "speaker": "Dimas",
        "text": "(soal tempat) ora ruh panggone"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Kirim alamat kalapadi diimm"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Tikum ndek kandar ae. Max 20 yak 😭 ws boncos iki"
      },
      {
        "type": "message",
        "speaker": "Zetty",
        "text": "50 lahh pipp 😞"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "Aku 0rb"
      },
      {
        "type": "message",
        "speaker": "Zetty",
        "text": "Bantu donasi kaa 😭"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Kabeh roto 20. No nolak nolak"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "banner ldks tak gowo pisan opo suk wae?"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Pisan ae yo okee"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "notane sekalia bolela"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "iya bos sm duitnya"
      },
      {
        "type": "date",
        "text": "28 September (Hari Kumpul)"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Mosok urung balek pkl mu"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "sek suwiii. Pokok nko di kei duet apip gas budal"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "iyoo iyoo. 20 tp"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "anjayyy. Nek ndi sidone"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "kalapadi"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nko tenan iso yo cah. Wes mepet pol waktune"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Weh. Ojo lali nko tikum kandar sek yo. Mepet tenan iki wesan, kalian nko digenahne pie\" ne"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "aku langsung lokasi"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Sekk wait sek demo"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "demo opo eneh ikii"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Onar"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "aku nko pesen no pisan"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "ayo selak sore. Aku selak goleki"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "You. Budal"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "otwww [call: Video call 5 menit]"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "pcc"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Kalapadi. Mlebuo"
      },
      {
        "type": "date",
        "text": "29 - 30 September"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "aku nnti ga ikut kumpul ro yew. Tangi turu diomongi mbakku lahiran. Bsk aku ro"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Wokayyy. Btw, aku mau urung sempet ketemu pak majid, infokan sng nemu beliau dimana. Tak chat c2 tok"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "gk liat kebeteng ndek lab"
      },
      {
        "type": "message",
        "speaker": "Zetty",
        "text": "ngko sido kumpul r.o g?"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "jadilaa. Itung duet kro bikin jawabanne game"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "La jare diewangi rahma sng jawaban game kui. Bungkusi hadiah jane"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Lhaa emng kita ga print dlu??"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Tapi renek kertas coklat e"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "bukanne rahma cuma gunting sama nempeli"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "Aku pengen bungkus hadiah e Hm"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "yoo moroo 😭"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "Usung' hm selak entek tngl e"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "yongalahh 😭"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "@Raja jo lali undanganne"
      },
      {
        "type": "message",
        "speaker": "Raja",
        "text": "Yoo"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "[file: Rundown LDKS 2026 2.0.docx] dibuka sesi tanya jawab 😭"
      },
      {
        "type": "date",
        "text": "1 Oktober (H-1)"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[file: Dispen LDKS.pdf] Gais. Sesok langsung klambi osis??"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Langsung ro??"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "iyo mestine"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Besok datang kesekolahan maks jam setengah 8 pagi ya, soale mau ambil barang sng dipinjam, pasang benner, pesen jajan. Bajune bawa seperlunya ae, yang wajib baju osis hijau sama biru navy, bawahan hitam ky biasane yo oke"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Krudunge sng cewe hitam yo"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Yoo budal kyo sekolah biasa aelo"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Luih penak ngene"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Adwe rung breafing njer"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Laiyo kan, usahakan jam 7 teko ro, urung nko wira wirine pisan"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Sepatu boleh bebas??"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Boleh ae laaa. Nko rodok sorean pindah ndek parkiran kidul e lapangan basket"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Tenan yo 👀"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Nk gambaranku pas pembukaan kr sidang wi adw nggae sepatu hitam, masio ngga ketok sepatune tapi ketok formal"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Sng wedok\", krudunge penting hitam model sembarang opo segi 4 kabeh sng sampe hari kedua"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "sembarang wes pokok krudungan. Tapi misale seng anu yo ojo terlalu anu lah"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Seng punya kabel oler besok tolong dibawa yak. Jogo\" panitia ngecas hp, stopkontak ndek ro terbatas"
      },
      {
        "type": "date",
        "text": "2 Oktober (Hari Pertama)"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Pagi teman temann, diusahakne dateng kyo sekolah biasa yoo nko kan enek tamu ben wira wirine gk pas enek tamu, kro nko breafing terakhir"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "Cah aku sakit, Engko Lk misal awaku kuat ora ngedrop nh aku nginep, Lk misa ngedrop Sepurane aku ga iso nginep sekolah 🙏"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "cepat sembuh rahma 🤞"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Okei bos. Jo lali gwo jaket lip. Selimut pisan 😭"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "ro ada minyak kayu putih tidak yaa"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Adaa. P3k di aurel"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Iya maaa, aman bae. #LekasSembuh"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Seng liane ojo lali nggowo pisan, bengi ben ngga kademen"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "[file: Daftar Kode Jajan.txt] Snack candu = momogi, tongkat itali = chocolatos, snak bunyi hujan = tic tic, coklat bagaimana = choco pie, minuman dugem = club, minuman anak kembar = Ichi ocha"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "[image: Nota Belanja Jajan LDKS]"
      },
      {
        "type": "message",
        "speaker": "Aliva",
        "text": "sg nganggur tulung jikukno dompetku nek tas terno ng satpam ngarep ngko"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "[file: Tata Tertib Forum LDKS.pdf] berjalan di jalur hijau, menyapa ketika berpapasan dgn panitia, sopan kpd kakak panitia, beratribut lengkap, tidur tepat waktu, wajib memakai id card kec tidur, dilarang berkata kasar saat ldks, dilarang membuat forum didalam forum, izin ketika mau pergi ke suatu tempat"
      },
      {
        "type": "date",
        "text": "3 Oktober (Hari Kedua)"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "tes. Konsumsi bu faiza"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Ini gaaiisss. Minta tolong diantar kesini yak konsumsinya Bu Faiza"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Nko lek sing arep naik bawain promag dong 🙂"
      },
      {
        "type": "message",
        "speaker": "Meyra",
        "text": "Wm lk sek masuk pkl, pkl o ojo bolos"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "hadiah kelompok kan deingi enek 6, nah kui seng salah cung. Sek. Hadiah e ki enek 6, kelompok e kan 4 guran. Nah wi pie nk mbagi malian. 2 hadiah e kan malih gaenek e pemilik e. Opo digae sng menang hidden word oleh hadiah double? Karo pensi terbaik oleh double?"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "mndg ngge hadiah hidden word"
      },
      {
        "type": "message",
        "speaker": "Sifa",
        "text": "iyaa oke gt aja"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "yuk panitia lain kesadarannya, yg dari tdi sudah nganggur boleh ikut standby di aula yaa. Setelah ini ishoma kita istirahat bareng. Sekua juga capek, lesu, sakit ❤️😊"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Sekua 😭"
      },
      {
        "type": "message",
        "speaker": "Lutfi",
        "text": "semuaaa. Woi capek bgt. Maaf"
      },
      {
        "type": "message",
        "speaker": "Afif",
        "text": "Alayy"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "pcc. Nk ndi kii"
      },
      {
        "type": "message",
        "speaker": "Aurel",
        "text": "cah jalok tulong ndang peserta ne seng wedok gugahen"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Jam 1 sidang pleno 2"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Gais. Minta tolong ambilkan baterai mic ndek ruang osis. Antar ke aula yaakk. Batrainya habiiisss"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "nk ndi batreni"
      },
      {
        "type": "message",
        "speaker": "Albion",
        "text": "sertijab teko kabeh yo"
      },
      {
        "type": "message",
        "speaker": "Lyto",
        "text": "gua pkl bang"
      },
      {
        "type": "message",
        "speaker": "Ana",
        "text": "Tolong ya teman-teman saling mengingatkan hari senin ketika serah terima jabatan memberikan surat pernyataan ke anggota osis yang baru yaaaaaaa"
      }
    ]
  }
];

export function getChatGroups(userSlug) {
  const currentSlug = String(userSlug || '').toLowerCase().trim();

  // Mapping slug ke nama speaker
  const slugToSpeaker = {
    'sifa': 'Sifa',
    'aliva': 'Aliva',
    'aurel': 'Aurel',
    'ana': 'Ana'
  };

  const currentSpeakerName = slugToSpeaker[currentSlug] || '';

  // Baca riwayat grup yang sudah pernah dibuka
  let readGroups = [];
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(`wa_read_groups_${currentSlug}`) : null;
    readGroups = raw ? JSON.parse(raw) : [];
  } catch {}

  const defaultUnread = {
    'grup_santri': 4,
    'grup_harlah': 7,
    'grup_bukber': 12,
    'grup_ldks': 5
  };

  return RAW_GROUPS.map(grp => {
    // Generate filtered history with POV
    const history = grp.history.map(item => {
      if (item.type === 'date') {
        return { isDate: true, text: item.text };
      }
      if (item.type === 'system') {
        return { isSystem: true, text: item.text };
      }

      const isMe = currentSpeakerName && item.speaker.toLowerCase() === currentSpeakerName.toLowerCase();
      let speakerName = item.speaker;
      if (slug.toLowerCase() === 'sifa' && item.speaker.toLowerCase() === 'ana') {
        speakerName = 'Ana cantik';
      }
      return {
        sender: isMe ? 'user' : 'other',
        name: speakerName,
        text: item.text,
        time: item.time || ''
      };
    });

    // Find last message snippet
    let lastMsg = 'Pesan grup';
    for (let i = history.length - 1; i >= 0; i--) {
      if (!history[i].isDate && !history[i].isSystem) {
        lastMsg = (history[i].sender === 'user' ? 'Anda: ' : history[i].name + ': ') + history[i].text;
        break;
      }
    }

    const isAlreadyRead = readGroups.includes(grp.id);

    return {
      id: grp.id,
      name: grp.title,
      avatar: grp.avatar,
      members: slug.toLowerCase() === 'sifa' && Array.isArray(grp.members) ? grp.members.map(m => m === 'Ana' ? 'Ana cantik' : m) : grp.members,
      lastMsg: lastMsg,
      time: grp.id === 'grup_santri' ? '20/10/25' : grp.id === 'grup_harlah' ? '10/02/26' : grp.id === 'grup_bukber' ? '09/03/26' : '03/10/26',
      unread: isAlreadyRead ? 0 : (defaultUnread[grp.id] || 3),
      isGroup: true,
      history: history
    };
  });
}

import { useEffect, useState } from 'react'
import './Privacy.css'

type Lang = 'id' | 'en'

const TOC = [
  { id: 'persetujuan', idLabel: 'Persetujuan', en: 'Consent' },
  { id: 'kumpulkan', idLabel: 'Informasi yang dikumpulkan', en: 'Information we collect' },
  { id: 'order', idLabel: 'Pelacakan order', en: 'Order tracking' },
  { id: 'drive', idLabel: 'Google Drive', en: 'Google Drive' },
  { id: 'nora', idLabel: 'Nora', en: 'Nora' },
  { id: 'laporan', idLabel: 'Laporan kantor', en: 'Office reports' },
  { id: 'addon', idLabel: 'Add-on Format Berkas', en: 'Format Berkas add-on' },
  { id: 'guna', idLabel: 'Cara pemakaian', en: 'How we use information' },
  { id: 'log', idLabel: 'Log', en: 'Log files' },
  { id: 'cookie', idLabel: 'Cookie', en: 'Cookies' },
  { id: 'iklan', idLabel: 'Iklan', en: 'Advertising' },
  { id: 'pihak', idLabel: 'Pihak ketiga', en: 'Third parties' },
  { id: 'hak', idLabel: 'Hak Anda', en: 'Your rights' },
  { id: 'tidak', idLabel: 'Yang tidak dilakukan', en: 'What Notive does not do' },
  { id: 'hapus', idLabel: 'Menghapus data', en: 'Deleting data' },
  { id: 'kontak', idLabel: 'Kontak', en: 'Contact' },
] as const

const COPY = {
  id: {
    titleLead: 'Kebijakan privasi',
    titleProduct: 'Notive',
    updatedLabel: 'Terakhir diperbarui',
    updated: '29 Oktober 2026',
    lede: 'Di Notive, yang dapat diakses di notive.id, privasi pengunjung dan pelanggan adalah prioritas. Kebijakan ini menjelaskan informasi yang Notive kumpulkan dan cara pemakaiannya, untuk pelacakan order, Nora, Google Drive kantor, laporan, situs, dashboard, dan add-on Google Docs Notive Format Berkas.',
    features: [
      {
        id: 'persetujuan',
        title: 'Persetujuan',
        intro: 'Dengan memakai situs notive.id, dashboard, Nora, atau add-on Notive Format Berkas, Anda menyetujui kebijakan ini. Kebijakan ini berlaku untuk layanan online Notive. Kebijakan ini tidak berlaku untuk berkas kertas yang kantor simpan di luar Notive. Pertanyaan lebih lanjut dapat dikirim lewat WhatsApp di bagian Kontak.',
        clauses: [],
      },
      {
        id: 'kumpulkan',
        title: 'Informasi yang dikumpulkan',
        clauses: [
          {
            title: 'Saat kami meminta',
            body: 'Data yang diminta, dan alasan permintaannya, dijelaskan di formulir atau di fitur yang sedang Anda pakai.',
          },
          {
            title: 'Saat Anda menghubungi kami',
            body: 'Jika Anda menghubungi Notive, kami dapat menerima nama, email, nomor telepon, isi pesan, lampiran, dan informasi lain yang Anda pilih untuk dikirim.',
          },
          {
            title: 'Saat membuat akun',
            body: 'Saat mendaftar, kami meminta nama, email, nomor WhatsApp, dan kata sandi. Formulir daftar tidak meminta alamat kantor.',
          },
        ],
      },
      {
        id: 'order',
        title: 'Pelacakan order',
        clauses: [
          {
            title: 'Akun kantor',
            body: 'Notive memproses nama, email, nomor WhatsApp, dan kata sandi akun yang Anda daftarkan. Formulir daftar memakai Cloudflare Turnstile untuk menahan pendaftaran otomatis.',
          },
          {
            title: 'Data order',
            body: 'Notive menyimpan order yang kantor Anda isi atau impor: nama klien, nomor sertifikat, PIC Bank, jenis transaksi, tanggal, progress, status pembayaran, dan PIC yang menangani.',
          },
          {
            title: 'Impor dan isi dari PDF',
            body: 'Impor CSV membawa data order dari spreadsheet lama. Saat Anda meminta isi formulir dari PDF, Notive membaca PDF itu untuk mengusulkan nama klien, nomor sertifikat, PIC Bank, jenis transaksi, tanggal, dan progress. Anda meninjau hasilnya sebelum menyimpan.',
          },
          {
            title: 'Terpisah per kantor',
            body: 'Setiap kantor memiliki ruang data sendiri. Kantor lain tidak dapat melihat order, PIC, atau berkas Anda.',
          },
        ],
      },
      {
        id: 'drive',
        title: 'Google Drive',
        clauses: [
          {
            title: 'Berkas tetap di Drive kantor',
            body: 'Berkas tetap di Google Drive kantor Anda (My Drive atau Shared Drive). Drive kantor adalah tempat penyimpanan. File melewati Notive hanya untuk pemrosesan yang Anda minta, misalnya unggah folder, isi form dari PDF, atau lampiran chat.',
          },
          {
            title: 'Yang Notive tampilkan',
            body: 'Notive menampilkan nama file dan menghubungkan folder Drive ke order. Folder dapat dibuat per order saat Anda memakai fitur itu. Notive bukan arsip jangka panjang berkas.',
          },
        ],
      },
      {
        id: 'nora',
        title: 'Nora',
        clauses: [
          {
            title: 'Chat di dashboard',
            body: 'Nora hanya membaca dan menjelaskan. Ia tidak menambah, mengubah, atau menghapus order.',
          },
          {
            title: 'WhatsApp',
            body: 'Via WhatsApp, Nora dapat membantu operasi order dan mengunggah berkas ke folder Drive jika Anda meminta dengan jelas, dengan batasan yang sama seperti staf yang login.',
          },
          {
            title: 'Pengingat dan lampiran',
            body: 'Jika Anda meminta, Nora dapat menyimpan pengingat di Google Calendar Anda. Lampiran yang Anda kirim di chat melewati Notive untuk permintaan itu.',
          },
        ],
      },
      {
        id: 'laporan',
        title: 'Laporan kantor',
        clauses: [
          {
            title: 'Dihitung dari order Anda',
            body: 'Laporan bisnis dihitung dari order kantor Anda: jumlah order, order aktif, yang sudah lunas, tren, jenis transaksi, dan beban kerja PIC. Laporan ini untuk kantor Anda, bukan untuk iklan.',
          },
        ],
      },
      {
        id: 'addon',
        title: 'Add-on Format Berkas',
        intro: 'Notive Format Berkas adalah add-on Google Docs untuk pelanggan dengan langganan aktif. Ketentuan berikut hanya untuk add-on, dan lebih sempit daripada dashboard.',
        clauses: [
          {
            title: 'Dokumen yang sedang dibuka saja',
            body: 'Add-on hanya membaca dan mengubah Google Doc tempat add-on dijalankan (izin documents.currentonly), dan hanya saat Anda menekan tombol atau menu add-on. Add-on tidak dapat membuka dokumen atau file Drive lain.',
          },
          {
            title: 'Login Notive',
            body: 'Saat Anda masuk, email dan kata sandi Notive Anda dikirim lewat HTTPS ke server Notive (izin script.external_request) hanya untuk memeriksa akun dan masa langganan. Kata sandi tidak disimpan oleh add-on.',
          },
          {
            title: 'Yang disimpan di akun Google Anda',
            body: 'Penyimpanan pengaturan Google Apps Script per pengguna menyimpan nama Anda di Notive, tanggal berakhirnya login, serta pengaturan add-on: nama notaris, daerah kerja, margin, font, dan teks penutup salinan.',
          },
        ],
        items: [
          'Isi akta dan dokumen di Google Doc yang sedang dibuka tidak pernah dikirim ke Notive atau pihak ketiga mana pun.',
          'Add-on tidak memakai analitik, iklan, atau pelacakan.',
          'Setelah login, add-on tidak menghubungi Notive lagi sampai login berakhir.',
        ],
      },
      {
        id: 'guna',
        title: 'Cara pemakaian',
        intro: 'Notive memakai informasi yang dikumpulkan untuk:',
        clauses: [],
        items: [
          'Menjalankan layanan: pelacakan order, Google Drive, Nora, laporan kantor, dan add-on.',
          'Memeriksa akun dan masa langganan.',
          'Memproses berkas hanya saat Anda memintanya.',
          'Menjawab permintaan dan pesan Anda.',
          'Menahan pendaftaran otomatis dan penyalahgunaan.',
          'Memahami penggunaan situs notive.id bila analitik situs diaktifkan.',
        ],
      },
      {
        id: 'log',
        title: 'Log',
        intro: 'Penyedia hosting situs dapat menyimpan log standar saat seseorang membuka notive.id. Log itu dapat berisi alamat IP, jenis peramban, waktu kunjungan, dan halaman yang diminta. Log dipakai untuk menjaga situs dan meninjau gangguan, bukan untuk iklan, dan tidak digabung menjadi profil iklan.',
        clauses: [],
      },
      {
        id: 'cookie',
        title: 'Cookie',
        intro: 'notive.id dapat menyimpan cookie. Cookie itu tidak dipakai untuk menayangkan iklan. Anda dapat mematikan cookie di pengaturan peramban. Jika cookie dimatikan, pendaftaran akun dan sebagian fungsi situs dapat berhenti bekerja.',
        clauses: [
          {
            title: 'Formulir daftar',
            body: 'Cloudflare Turnstile pada formulir daftar dapat memakai cookie untuk menahan pendaftaran otomatis.',
          },
          {
            title: 'Analitik situs',
            body: 'Bila analitik situs diaktifkan, Amplitude dapat memakai cookie dan rekaman sesi untuk memahami halaman mana yang dipakai. Data itu bukan untuk iklan.',
          },
        ],
      },
      {
        id: 'iklan',
        title: 'Iklan',
        intro: 'Notive tidak menayangkan iklan pihak ketiga, tidak memakai cookie iklan Google DoubleClick (DART), dan tidak memiliki mitra pemasang iklan di situs ini.',
        clauses: [],
      },
      {
        id: 'pihak',
        title: 'Pihak ketiga',
        intro: 'Kebijakan ini tidak mengatur layanan di luar Notive. Google, Cloudflare, Amplitude, dan WhatsApp punya kebijakan sendiri.',
        clauses: [],
        links: [
          { label: 'Google', href: 'https://policies.google.com/privacy' },
          { label: 'Cloudflare', href: 'https://www.cloudflare.com/privacypolicy/' },
          { label: 'Amplitude', href: 'https://amplitude.com/privacy' },
          { label: 'WhatsApp', href: 'https://www.whatsapp.com/legal/privacy-policy' },
        ],
      },
      {
        id: 'hak',
        title: 'Hak Anda',
        intro: 'Anda dapat meminta hal berikut. Kami membalas dalam satu bulan lewat WhatsApp, dan tidak memungut biaya untuk salinan data.',
        clauses: [],
        items: [
          'Salinan data pribadi yang Notive simpan tentang Anda.',
          'Perbaikan data yang keliru atau belum lengkap.',
          'Penghapusan data, sejauh hukum dan operasional kantor mengizinkan.',
          'Pembatasan pemrosesan, atau keberatan atas pemrosesan, dalam kondisi tertentu.',
          'Salinan data dalam bentuk yang dapat Anda pindahkan, dalam kondisi tertentu.',
          'Konfirmasi bahwa Notive tidak menjual data pribadi Anda.',
        ],
      },
    ],
    notTitle: 'Yang tidak dilakukan',
    notItems: [
      'Notive tidak menjual data kantor dan tidak menayangkan iklan di dalam produk.',
      'Data satu kantor tidak dibuka untuk kantor lain.',
      'Situs notive.id dapat merekam kunjungan dan interaksi halaman melalui Amplitude, termasuk rekaman sesi, bila analitik situs diaktifkan. Data itu dipakai untuk memahami penggunaan situs, bukan untuk iklan.',
    ],
    deleteTitle: 'Menghapus data',
    deleteDashboard: 'Untuk menghapus data akun, order, atau percakapan di dashboard, kirim permintaan lewat WhatsApp di bagian Kontak.',
    deleteLead: 'Dari tab Setting di add-on:',
    deleteItems: [
      { name: 'Keluar dari Notive', rest: 'menghapus data login.' },
      { name: 'Kembalikan default', rest: 'menghapus pengaturan.' },
    ],
    revokeBefore: 'Untuk mencabut izin Google, termasuk add-on dan akses Drive yang Anda berikan, buka',
    revokeAfter: 'lalu hapus akses Notive.',
    contactTitle: 'Kontak',
    contactLead: 'Pertanyaan tentang data Notive, termasuk order, Nora, Drive, dan add-on, dapat dikirim ke sini.',
    back: 'Kembali ke beranda',
    langLabel: 'Bahasa',
    tocLabel: 'Daftar isi',
  },
  en: {
    titleLead: 'Privacy policy',
    titleProduct: 'Notive',
    updatedLabel: 'Last updated',
    updated: '29 October 2026',
    lede: 'At Notive, accessible at notive.id, the privacy of visitors and customers is a priority. This policy explains what Notive collects and how it is used, across order tracking, Nora, your office Google Drive, reports, the website, the dashboard, and the Notive Format Berkas Google Docs add-on.',
    features: [
      {
        id: 'persetujuan',
        title: 'Consent',
        intro: 'By using notive.id, the dashboard, Nora, or the Notive Format Berkas add-on, you agree to this policy. It covers Notive\'s online services. It does not cover paper files an office keeps outside Notive. Further questions can be sent by WhatsApp in the Contact section.',
        clauses: [],
      },
      {
        id: 'kumpulkan',
        title: 'Information we collect',
        clauses: [
          {
            title: 'When we ask',
            body: 'The information requested, and the reason for asking, is explained on the form or in the feature you are using.',
          },
          {
            title: 'When you contact us',
            body: 'If you contact Notive, we may receive your name, email, phone number, the contents of the message, attachments, and anything else you choose to send.',
          },
          {
            title: 'When you create an account',
            body: 'When you register, we ask for your name, email, WhatsApp number, and password. The sign-up form does not ask for a street address.',
          },
        ],
      },
      {
        id: 'order',
        title: 'Order tracking',
        clauses: [
          {
            title: 'Office account',
            body: 'Notive processes the name, email, WhatsApp number, and password you register. The sign-up form uses Cloudflare Turnstile to block automated registrations.',
          },
          {
            title: 'Order data',
            body: 'Notive stores the orders your office enters or imports: client name, certificate number, bank PIC, transaction type, dates, progress, payment status, and the PIC handling the order.',
          },
          {
            title: 'Import and PDF fill',
            body: 'CSV import brings order data across from an old spreadsheet. When you ask Notive to fill a form from a PDF, it reads that PDF to suggest the client name, certificate number, bank PIC, transaction type, dates, and progress. You review the result before saving.',
          },
          {
            title: 'Separate per office',
            body: 'Each office has its own data space. Another office cannot see your orders, PICs, or files.',
          },
        ],
      },
      {
        id: 'drive',
        title: 'Google Drive',
        clauses: [
          {
            title: 'Files stay in the office Drive',
            body: 'Files stay in your office Google Drive (My Drive or Shared Drive). The office Drive is the place they are stored. A file passes through Notive only for processing you request, such as a folder upload, filling a form from a PDF, or a chat attachment.',
          },
          {
            title: 'What Notive shows',
            body: 'Notive shows file names and links a Drive folder to an order. A folder can be created per order when you use that feature. Notive is not the long-term archive for the files.',
          },
        ],
      },
      {
        id: 'nora',
        title: 'Nora',
        clauses: [
          {
            title: 'Dashboard chat',
            body: 'Nora only reads and explains. She does not add, change, or delete orders.',
          },
          {
            title: 'WhatsApp',
            body: 'On WhatsApp, Nora can help with order operations and upload files to a Drive folder when you ask clearly, with the same limits as a staff member who is signed in.',
          },
          {
            title: 'Reminders and attachments',
            body: 'If you ask, Nora can save a reminder to your Google Calendar. Attachments you send in chat pass through Notive for that request.',
          },
        ],
      },
      {
        id: 'laporan',
        title: 'Office reports',
        clauses: [
          {
            title: 'Calculated from your orders',
            body: 'Business reports are calculated from your office orders: order counts, active orders, paid orders, trends, transaction types, and PIC workload. The reports are for your office, not for advertising.',
          },
        ],
      },
      {
        id: 'addon',
        title: 'Format Berkas add-on',
        intro: 'Notive Format Berkas is a Google Docs add-on for customers with an active subscription. The rules below apply only to the add-on, and they are narrower than the dashboard.',
        clauses: [
          {
            title: 'Only the document that is open',
            body: 'The add-on reads and edits only the Google Doc it is running in (the documents.currentonly scope), and only when you press a button or menu in the add-on. It cannot open other documents or other Drive files.',
          },
          {
            title: 'Notive sign-in',
            body: 'When you sign in, your Notive email and password are sent over HTTPS to Notive\'s server (the script.external_request scope) only to check your account and subscription period. The add-on does not store the password.',
          },
          {
            title: 'Stored in your Google account',
            body: 'Google Apps Script per-user property storage keeps your name in Notive, the date your sign-in expires, and your add-on settings: notary name, work area, margins, font, and the closing text of a copy.',
          },
        ],
        items: [
          'The contents of the deed and document in the open Google Doc are never sent to Notive or any third party.',
          'The add-on uses no analytics, advertising, or tracking.',
          'After you sign in, the add-on does not contact Notive again until that sign-in expires.',
        ],
      },
      {
        id: 'guna',
        title: 'How we use information',
        intro: 'Notive uses the information it collects to:',
        clauses: [],
        items: [
          'Run the service: order tracking, Google Drive, Nora, office reports, and the add-on.',
          'Check the account and the subscription period.',
          'Process files only when you ask.',
          'Answer your requests and messages.',
          'Block automated sign-ups and abuse.',
          'Understand how notive.id is used when site analytics is turned on.',
        ],
      },
      {
        id: 'log',
        title: 'Log files',
        intro: 'The site host may keep standard logs when someone opens notive.id. A log can include the IP address, browser type, time of the visit, and the pages requested. Logs are used to keep the site running and to review faults, not for advertising, and they are not assembled into an advertising profile.',
        clauses: [],
      },
      {
        id: 'cookie',
        title: 'Cookies',
        intro: 'notive.id may store cookies. Those cookies are not used to show ads. You can turn cookies off in the browser settings. If cookies are off, account sign-up and some site functions can stop working.',
        clauses: [
          {
            title: 'Sign-up form',
            body: 'Cloudflare Turnstile on the sign-up form may use a cookie to block automated registrations.',
          },
          {
            title: 'Site analytics',
            body: 'When site analytics is turned on, Amplitude may use cookies and session replay to see which pages are used. That data is not for advertising.',
          },
        ],
      },
      {
        id: 'iklan',
        title: 'Advertising',
        intro: 'Notive does not show third-party ads, does not use Google DoubleClick (DART) advertising cookies, and has no advertising partners on this site.',
        clauses: [],
      },
      {
        id: 'pihak',
        title: 'Third parties',
        intro: 'This policy does not govern services outside Notive. Google, Cloudflare, Amplitude, and WhatsApp have their own policies.',
        clauses: [],
        links: [
          { label: 'Google', href: 'https://policies.google.com/privacy' },
          { label: 'Cloudflare', href: 'https://www.cloudflare.com/privacypolicy/' },
          { label: 'Amplitude', href: 'https://amplitude.com/privacy' },
          { label: 'WhatsApp', href: 'https://www.whatsapp.com/legal/privacy-policy' },
        ],
      },
      {
        id: 'hak',
        title: 'Your rights',
        intro: 'You can ask for the following. We reply within one month by WhatsApp, and we do not charge for a copy of your data.',
        clauses: [],
        items: [
          'A copy of the personal data Notive holds about you.',
          'A correction of data that is wrong or incomplete.',
          'Deletion of data, as far as the law and the office\'s operations allow.',
          'A limit on processing, or an objection to processing, in some cases.',
          'A copy of the data in a form you can move, in some cases.',
          'Confirmation that Notive does not sell your personal data.',
        ],
      },
    ],
    notTitle: 'What Notive does not do',
    notItems: [
      'Notive does not sell office data and does not show advertising inside the product.',
      'One office\'s data is not opened to another office.',
      'notive.id may record page visits and interactions with Amplitude, including session replay, when site analytics is turned on. That data is used to understand how the site is used, not for advertising.',
    ],
    deleteTitle: 'Deleting data',
    deleteDashboard: 'To delete account data, orders, or dashboard conversations, send a request by WhatsApp in the Contact section.',
    deleteLead: 'From the Setting tab in the add-on:',
    deleteItems: [
      { name: 'Keluar dari Notive', rest: 'removes the sign-in data.' },
      { name: 'Kembalikan default', rest: 'removes the settings.' },
    ],
    revokeBefore: 'To revoke Google permission, including the add-on and any Drive access you granted, open',
    revokeAfter: 'and remove Notive\'s access.',
    contactTitle: 'Contact',
    contactLead: 'Questions about Notive data, including orders, Nora, Drive, and the add-on, can be sent here.',
    back: 'Back to the homepage',
    langLabel: 'Language',
    tocLabel: 'Contents',
  },
} as const

const PERMISSIONS = 'https://myaccount.google.com/permissions'
const WHATSAPP = 'https://wa.me/6281384323745'

export function Privacy() {
  const [lang, setLang] = useState<Lang>('id')
  const [active, setActive] = useState('persetujuan')
  const copy = COPY[lang]

  useEffect(() => {
    const nodes = TOC.map((item) => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node))
    if (nodes.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const id = visible[0]?.target.id
        if (id) setActive(id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.15, 0.4, 0.7] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [lang])

  return (
    <article className="privacy-page" lang={lang}>
      <header className="privacy-mast">
        <div className="privacy-mast-inner">
          <div className="privacy-mast-copy">
            <h1>
              {copy.titleLead}
              <span className="privacy-title-product">{copy.titleProduct}</span>
            </h1>
            <p className="privacy-updated">
              {copy.updatedLabel} <time dateTime="2026-10-29">{copy.updated}</time>
            </p>
            <p className="privacy-lede">{copy.lede}</p>
          </div>
          <div className="privacy-lang" role="group" aria-label={copy.langLabel}>
            <button type="button" aria-pressed={lang === 'id'} onClick={() => setLang('id')}>
              Indonesia
            </button>
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
              English
            </button>
          </div>
        </div>
      </header>

      <div className="privacy-sheet">
        <nav className="privacy-rail" aria-label={copy.tocLabel}>
          {TOC.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
            >
              {lang === 'id' ? item.idLabel : item.en}
            </a>
          ))}
        </nav>

        <div className="privacy-column">
          {copy.features.map((feature) => (
            <section id={feature.id} key={feature.id} aria-labelledby={`${feature.id}-heading`}>
              <h2 id={`${feature.id}-heading`}>{feature.title}</h2>
              {'intro' in feature && feature.intro ? <p>{feature.intro}</p> : null}
              {feature.clauses.map((clause) => (
                <div className="privacy-clause" key={clause.title}>
                  <h3>{clause.title}</h3>
                  <p>{clause.body}</p>
                </div>
              ))}
              {'items' in feature && feature.items ? (
                <ul>
                  {feature.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {'links' in feature && feature.links ? (
                <ul>
                  {feature.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section id="tidak" aria-labelledby="tidak-heading">
            <h2 id="tidak-heading">{copy.notTitle}</h2>
            <ul>
              {copy.notItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="hapus" aria-labelledby="hapus-heading">
            <h2 id="hapus-heading">{copy.deleteTitle}</h2>
            <p>{copy.deleteDashboard}</p>
            <p>{copy.deleteLead}</p>
            <ol>
              {copy.deleteItems.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong> {item.rest}
                </li>
              ))}
              <li>
                {copy.revokeBefore}{' '}
                <a href={PERMISSIONS} target="_blank" rel="noopener noreferrer">
                  myaccount.google.com/permissions
                </a>{' '}
                {copy.revokeAfter}
              </li>
            </ol>
          </section>

          <section id="kontak" aria-labelledby="kontak-heading">
            <h2 id="kontak-heading">{copy.contactTitle}</h2>
            <p>{copy.contactLead}</p>
            <ul className="privacy-contact">
              <li>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  WhatsApp +62 813-8432-3745
                </a>
              </li>
              <li>
                <a href="https://notive.id/">notive.id</a>
              </li>
            </ul>
            <p className="privacy-end">
              <a href="/">{copy.back}</a>
            </p>
          </section>
        </div>
      </div>
    </article>
  )
}

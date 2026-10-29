import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const facts = JSON.parse(fs.readFileSync(path.join(root, 'scripts/facts.json'), 'utf8'))
const template = fs.readFileSync(path.join(root, 'scripts/page-template.html'), 'utf8')

function cssHref() {
  const dir = path.join(dist, 'assets')
  const file = fs.readdirSync(dir).find((name) => name.endsWith('.css'))
  if (!file) throw new Error('no hashed CSS in dist/assets')
  return `/assets/${file}`
}

function fill(tpl, values) {
  let output = tpl
  for (const [key, value] of Object.entries(values)) {
    output = output.split(`{{${key}}}`).join(value)
  }
  if (output.includes('{{')) {
    throw new Error(`unreplaced placeholder in template: ${output.match(/\{\{[^}]+\}\}/)}`)
  }
  return output
}

function replaceRoot(html, inner) {
  const output = html.replace(
    /<div id="root"\s*>\s*<\/div>/,
    `<div id="root">\n${inner}\n</div>`,
  )
  if (output === html) throw new Error('failed to inject #root (markup drift)')
  return output
}

const idr = (n) => `Rp ${Number(n).toLocaleString('id-ID')}`
const pct = (rate) => {
  const n = rate * 100
  return `${Number.isInteger(n) ? String(n) : String(n).replace('.', ',')}%`
}
const tax = facts.TAX
const [honor1, honor2, honor3] = tax.honorTiers

const notFound = `<!doctype html><html lang="id"><head>
<meta charset="UTF-8" />
<meta name="robots" content="noindex,nofollow" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Halaman tidak ditemukan - Notive</title>
</head><body>
<p>Halaman tidak ditemukan.</p>
<p><a href="/">Kembali ke beranda Notive</a></p>
</body></html>`
fs.writeFileSync(path.join(dist, '404.html'), notFound)

const css = cssHref()
const homeFacts = facts.PAGES['/']
const builtIndex = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const hero = `<article>
  <h1>${homeFacts.h1}</h1>
  <p>${facts.DEFINITION}</p>
  <p><a href="/aplikasi-notaris-indonesia/">Penjelasan aplikasi notaris Indonesia</a>
  · <a href="/register">Uji coba 14 hari</a></p>
</article>`
fs.writeFileSync(path.join(dist, 'index.html'), replaceRoot(builtIndex, hero))

const bodies = {
  '/aplikasi-notaris-indonesia/': `<h1>${facts.PAGES['/aplikasi-notaris-indonesia/'].h1}</h1>
<p>${facts.DEFINITION}</p>
<h2>Apa itu aplikasi notaris Indonesia?</h2>
<p>Aplikasi notaris Indonesia adalah perangkat lunak yang dipakai kantor notaris dan PPAT untuk menata pekerjaan sehari-hari: order klien, berkas, dan staf. Satu merek tidak otomatis cocok untuk semua alur.</p>
<h2>Tiga pendekatan yang biasanya dibandingkan</h2>
<table>
<thead><tr><th>Pendekatan</th><th>Yang dikerjakan</th><th>Cocok jika</th></tr></thead>
<tbody>
<tr><td>Spreadsheet</td><td>Daftar order di Excel atau Google Sheets</td><td>Volume kecil</td></tr>
<tr><td>Software cetak akta</td><td>Minuta, penomoran, template Word</td><td>Prioritas utama menyusun dan mencetak akta</td></tr>
<tr><td>Manajemen order kantor</td><td>Status order, PIC, berkas, laporan beban kerja</td><td>Tim perlu melihat siapa mengerjakan apa</td></tr>
</tbody>
</table>
<p>Notive masuk kategori ketiga. Notive tidak menggantikan software cetak minuta akta.</p>
<h2>Kriteria memilih</h2>
<p>${facts.DRIVE_FACT}</p>
<ul>
<li>Di mana berkas disimpan: Drive kantor, atau arsip vendor.</li>
<li>Isolasi data per kantor.</li>
<li>Staf bisa bertanya dalam Bahasa Indonesia.</li>
<li>Harga tertulis: Basic ${facts.PRICES.basicLabel}/bulan, Pro ${facts.PRICES.proLabel}/bulan, uji coba 14 hari tanpa kartu kredit.</li>
</ul>
<h2>Kapan Notive bukan pilihan yang tepat</h2>
<p>Jika kebutuhan utama adalah mencetak minuta akta di Microsoft Word, atau laporan resmi yang sudah diikat software lain, Notive tidak menggantikan alat itu. Notive berguna jika order tercecer di spreadsheet, chat, dan folder Drive yang tidak seragam.</p>
<p><a href="/register">Mulai uji coba 14 hari</a> · <a href="/kalkulator-bphtb/">Rumus BPHTB</a></p>`,
  '/kalkulator-bphtb/': `<h1>${facts.PAGES['/kalkulator-bphtb/'].h1}</h1>
<p>Estimasi di bawah memakai tarif umum. Honorarium adalah batas maksimum Pasal 36 UUJN, bukan tarif wajib. Bukan nasihat pajak.</p>
<p>Kalkulator interaktif ada di <a href="/#kalkulator">beranda Notive</a>.</p>
<h2>BPHTB dan PPh Final</h2>
<ul>
<li>BPHTB ${pct(tax.bphtbRate)} dari NPOPKP (pembeli).</li>
<li>PPh Final ${pct(tax.pphRate)} dari nilai transaksi (penjual).</li>
<li>NDPP = MAX(nilai transaksi, NJOP). NPOPKP = MAX(0, NDPP - NPOPTKP).</li>
</ul>
<h2>NPOPTKP</h2>
<ul>
<li>Jakarta ${idr(tax.noptkpJakarta)}</li>
<li>Surabaya, Bandung, Bekasi, Tangerang, wilayah lain ${idr(tax.noptkpDefault)}</li>
</ul>
<h2>Honorarium notaris (Pasal 36 UUJN)</h2>
<table>
<thead><tr><th>Nilai ekonomis</th><th>Tarif maksimum</th></tr></thead>
<tbody>
<tr><td>Sampai ${idr(honor1.upTo)}</td><td>${honor1.label}</td></tr>
<tr><td>Di atas ${idr(honor1.upTo)} sampai ${idr(honor2.upTo)}</td><td>${honor2.label}</td></tr>
<tr><td>Di atas ${idr(honor2.upTo)}</td><td>${honor3.label}</td></tr>
</tbody>
</table>`,
  '/tentang/': `<h1>${facts.PAGES['/tentang/'].h1}</h1>
<p>${facts.DEFINITION}</p>
<h2>Untuk siapa</h2>
<p>Notive dibuat untuk kantor notaris dan PPAT di Indonesia: notaris perorangan, firma, dan staf PIC yang menata order klien. Produk ini berbahasa Indonesia dan dipakai untuk pekerjaan kantor sehari-hari, bukan untuk mencetak minuta akta.</p>
<h2>Apa yang dikerjakan</h2>
<p>Notive menata order Jual Beli, Hak Tanggungan, Hibah, dan transaksi hukum lain; menampilkan beban kerja PIC; menghubungkan berkas ke Google Drive kantor; dan menyediakan Nora untuk pertanyaan dalam Bahasa Indonesia.</p>
<h2>Berkas</h2>
<p>${facts.DRIVE_FACT}</p>
<h2>Perusahaan</h2>
<p>Dibuat di Indonesia. Situs: <a href="https://notive.id/">https://notive.id/</a>. Uji coba 14 hari tanpa kartu kredit: <a href="/register">daftar di sini</a>.</p>
<p>Kontak: <a href="https://wa.me/6281384323745">WhatsApp +62 813-8432-3745</a>.</p>`,
  '/kebijakan-privasi/': `<h1>Kebijakan privasi</h1>
<p>Draf 20 Agustus 2026. Belum ditinjau penasihat hukum. Berlaku untuk notive.id dan dashboard Notive.</p>
<h2>Data yang diproses</h2>
<p>Notive memproses data akun kantor (nama, email, nomor WhatsApp), data order yang Anda isi, dan metadata koneksi Google Drive.</p>
<p>${facts.DRIVE_FACT}</p>
<h2>Isolasi per kantor</h2>
<p>Setiap kantor memiliki ruang data sendiri. Kantor lain tidak dapat melihat order, PIC, atau berkas Anda.</p>
<h2>Pemroses lanjutan</h2>
<p>Nama pemroses, misalnya model AI untuk OCR atau asisten, akan dicantumkan setelah dikonfirmasi dari dokumentasi produk.</p>
<h2>Kontak</h2>
<p><a href="https://wa.me/6281384323745">WhatsApp +62 813-8432-3745</a></p>`,
}

for (const [route, body] of Object.entries(bodies)) {
  const page = facts.PAGES[route]
  if (!page) throw new Error(`missing metadata for ${route}`)
  const robots = route === '/kebijakan-privasi/'
    ? '<meta name="robots" content="noindex,follow" />'
    : ''
  const html = fill(template, {
    TITLE: page.title,
    DESCRIPTION: page.description,
    CANONICAL: page.canonical,
    ROBOTS: robots,
    CSS: css,
    BODY: body,
  })
  const outDir = path.join(dist, route.replace(/^\//, '').replace(/\/$/, ''))
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html)
  console.log('wrote', route)
}

const spa = builtIndex
  .replace(/<meta name="robots"[^>]*>/i, '')
  .replace('<head>', '<head>\n    <meta name="robots" content="noindex,nofollow" />')
  .replace(/<link rel="canonical" href="[^"]*" \/>/, '<link rel="canonical" href="https://notive.id/register/" />')
  .replace(/<title>[^<]*<\/title>/, '<title>Daftar uji coba Notive</title>')
fs.mkdirSync(path.join(dist, 'register'), { recursive: true })
fs.writeFileSync(path.join(dist, 'register/index.html'), spa)

const privacyTitle = 'Kebijakan Privasi Notive'
const privacyDescription = 'Kebijakan privasi Notive: pelacakan order, Nora, Google Drive kantor, laporan kantor, dan add-on Notive Format Berkas.'
const privacyCanonical = 'https://notive.id/privacy'
const privacyArticle = `<article>
  <h1>Kebijakan privasi Notive</h1>
  <p>Terakhir diperbarui 29 Oktober 2026.</p>
  <p>Di Notive, yang dapat diakses di notive.id, privasi pengunjung dan pelanggan adalah prioritas. Kebijakan ini menjelaskan informasi yang Notive kumpulkan dan cara pemakaiannya, untuk pelacakan order, Nora, Google Drive kantor, laporan, situs, dashboard, dan add-on Google Docs Notive Format Berkas.</p>
  <h2>Persetujuan</h2>
  <p>Dengan memakai situs notive.id, dashboard, Nora, atau add-on Notive Format Berkas, Anda menyetujui kebijakan ini. Kebijakan ini berlaku untuk layanan online Notive dan tidak berlaku untuk berkas kertas yang kantor simpan di luar Notive.</p>
  <h2>Informasi yang dikumpulkan</h2>
  <p>Saat Notive meminta data, alasan permintaan dijelaskan di formulir atau di fitur yang sedang dipakai. Jika Anda menghubungi Notive, kami dapat menerima nama, email, nomor telepon, isi pesan, dan lampiran. Saat mendaftar, kami meminta nama, email, nomor WhatsApp, dan kata sandi.</p>
  <h2>Pelacakan order</h2>
  <p>Notive memproses nama, email, nomor WhatsApp, dan kata sandi akun yang Anda daftarkan. Formulir daftar memakai Cloudflare Turnstile untuk menahan pendaftaran otomatis.</p>
  <p>Notive menyimpan order yang kantor Anda isi atau impor: nama klien, nomor sertifikat, PIC Bank, jenis transaksi, tanggal, progress, status pembayaran, dan PIC yang menangani. Impor CSV membawa data order dari spreadsheet lama. Saat Anda meminta isi formulir dari PDF, Notive membaca PDF itu untuk mengusulkan isian, dan Anda meninjau hasilnya sebelum menyimpan.</p>
  <p>Setiap kantor memiliki ruang data sendiri. Kantor lain tidak dapat melihat order, PIC, atau berkas Anda.</p>
  <h2>Google Drive</h2>
  <p>Berkas tetap di Google Drive kantor Anda (My Drive atau Shared Drive). Drive kantor adalah tempat penyimpanan. File melewati Notive hanya untuk pemrosesan yang Anda minta, misalnya unggah folder, isi form dari PDF, atau lampiran chat. Notive menampilkan nama file dan menghubungkan folder ke order. Notive bukan arsip jangka panjang berkas.</p>
  <h2>Nora</h2>
  <p>Di chat dashboard, Nora hanya membaca dan menjelaskan. Ia tidak menambah, mengubah, atau menghapus order. Via WhatsApp, Nora dapat membantu operasi order dan mengunggah berkas ke folder Drive jika Anda meminta dengan jelas, dengan batasan yang sama seperti staf yang login. Jika Anda meminta, Nora dapat menyimpan pengingat di Google Calendar Anda.</p>
  <h2>Laporan kantor</h2>
  <p>Laporan bisnis dihitung dari order kantor Anda: jumlah order, order aktif, yang sudah lunas, tren, jenis transaksi, dan beban kerja PIC. Laporan ini untuk kantor Anda, bukan untuk iklan.</p>
  <h2>Add-on Format Berkas</h2>
  <p>Ketentuan ini hanya untuk add-on Google Docs, dan lebih sempit daripada dashboard. Add-on hanya membaca dan mengubah Google Doc tempat add-on dijalankan (izin documents.currentonly), dan hanya saat Anda menekan tombol atau menu. Add-on tidak dapat membuka dokumen atau file Drive lain.</p>
  <p>Saat Anda masuk, email dan kata sandi Notive dikirim lewat HTTPS ke server Notive (izin script.external_request) hanya untuk memeriksa akun dan masa langganan. Kata sandi tidak disimpan oleh add-on. Penyimpanan pengaturan Google Apps Script per pengguna menyimpan nama Anda di Notive, tanggal berakhirnya login, dan pengaturan add-on.</p>
  <p>Isi akta dan dokumen di Google Doc yang sedang dibuka tidak pernah dikirim ke Notive atau pihak ketiga mana pun. Add-on tidak memakai analitik, iklan, atau pelacakan. Setelah login, add-on tidak menghubungi Notive lagi sampai login berakhir.</p>
  <h2>Cara pemakaian</h2>
  <p>Notive memakai informasi itu untuk menjalankan layanan, memeriksa akun dan langganan, memproses berkas hanya saat Anda meminta, menjawab pesan, menahan penyalahgunaan, dan memahami penggunaan situs bila analitik diaktifkan.</p>
  <h2>Log</h2>
  <p>Penyedia hosting dapat menyimpan log standar: alamat IP, jenis peramban, waktu kunjungan, dan halaman yang diminta. Log dipakai untuk menjaga situs, bukan untuk iklan.</p>
  <h2>Cookie</h2>
  <p>notive.id dapat menyimpan cookie untuk Cloudflare Turnstile pada formulir daftar, dan untuk Amplitude bila analitik situs diaktifkan. Cookie itu tidak dipakai untuk iklan. Anda dapat mematikan cookie di peramban. Jika dimatikan, pendaftaran akun dapat berhenti bekerja.</p>
  <h2>Iklan</h2>
  <p>Notive tidak menayangkan iklan pihak ketiga, tidak memakai cookie iklan Google DoubleClick (DART), dan tidak memiliki mitra pemasang iklan.</p>
  <h2>Pihak ketiga</h2>
  <p>Kebijakan ini tidak mengatur Google, Cloudflare, Amplitude, atau WhatsApp. Kebijakan mereka: <a href="https://policies.google.com/privacy">Google</a>, <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare</a>, <a href="https://amplitude.com/privacy">Amplitude</a>, <a href="https://www.whatsapp.com/legal/privacy-policy">WhatsApp</a>.</p>
  <h2>Hak Anda</h2>
  <p>Anda dapat meminta salinan data, perbaikan, penghapusan, pembatasan atau keberatan atas pemrosesan, dan salinan yang dapat dipindahkan. Notive tidak menjual data pribadi. Kami membalas dalam satu bulan lewat WhatsApp dan tidak memungut biaya untuk salinan data.</p>
  <h2>Yang tidak dilakukan</h2>
  <p>Notive tidak menjual data kantor dan tidak menayangkan iklan di dalam produk. Data satu kantor tidak dibuka untuk kantor lain. Situs notive.id dapat merekam kunjungan dan interaksi halaman melalui Amplitude, termasuk rekaman sesi, bila analitik situs diaktifkan. Data itu dipakai untuk memahami penggunaan situs, bukan untuk iklan.</p>
  <h2>Menghapus data</h2>
  <p>Untuk menghapus data akun, order, atau percakapan di dashboard, kirim permintaan lewat WhatsApp. Dari tab Setting di add-on, Keluar dari Notive menghapus data login dan Kembalikan default menghapus pengaturan. Untuk mencabut izin Google, buka <a href="https://myaccount.google.com/permissions">https://myaccount.google.com/permissions</a>.</p>
  <h2>Kontak</h2>
  <p><a href="https://wa.me/6281384323745">WhatsApp +62 813-8432-3745</a></p>
  <p><a href="https://notive.id/">https://notive.id/</a></p>
  <h2>Privacy policy</h2>
  <p>This policy covers Notive as a whole: order tracking, Nora, office Google Drive (My Drive or Shared Drive), office reports, notive.id, the dashboard, and the Format Berkas add-on. Files stay in the office Drive and pass through Notive only for processing you request. In dashboard chat, Nora only reads and explains. The add-on reads only the open Google Doc (documents.currentonly). Sign-in for the add-on uses script.external_request, and the password is not stored. Deed content in that open Google Doc is never sent to Notive. Revoke Google access at <a href="https://myaccount.google.com/permissions">https://myaccount.google.com/permissions</a>.</p>
</article>`

let privacyHtml = builtIndex
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '')
  .replace(/<title>[^<]*<\/title>/, `<title>${privacyTitle}</title>`)
  .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${privacyDescription}" />`)
  .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${privacyCanonical}" />`)
  .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${privacyTitle}" />`)
  .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${privacyDescription}" />`)
  .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${privacyCanonical}" />`)
privacyHtml = replaceRoot(privacyHtml, privacyArticle)
fs.mkdirSync(path.join(dist, 'privacy'), { recursive: true })
fs.writeFileSync(path.join(dist, 'privacy/index.html'), privacyHtml)
console.log('wrote', '/privacy')

const sitemapDate = new Date().toISOString().slice(0, 10)
const sitemapUrls = Object.entries(facts.PAGES)
  .filter(([route]) => route !== '/kebijakan-privasi/')
  .map(([route, page]) => `  <url>
    <loc>${page.canonical}</loc>
    <lastmod>${sitemapDate}</lastmod>
  </url>`)
  .join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)

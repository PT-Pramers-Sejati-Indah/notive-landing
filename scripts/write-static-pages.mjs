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

const notFound = `<!doctype html><html lang="id"><head>
<meta charset="UTF-8" />
<meta name="robots" content="noindex,nofollow" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Halaman tidak ditemukan - Notive</title>
<link rel="canonical" href="https://notive.id/404" />
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
<li>BPHTB 5% dari NPOPKP (pembeli).</li>
<li>PPh Final 2,5% dari nilai transaksi (penjual).</li>
<li>NDPP = MAX(nilai transaksi, NJOP). NPOPKP = MAX(0, NDPP − NPOPTKP).</li>
</ul>
<h2>NPOPTKP</h2>
<ul>
<li>Jakarta Rp 80.000.000</li>
<li>Surabaya, Bandung, Bekasi, Tangerang, wilayah lain Rp 60.000.000</li>
</ul>
<h2>Honorarium notaris (Pasal 36 UUJN)</h2>
<table>
<thead><tr><th>Nilai ekonomis</th><th>Tarif maksimum</th></tr></thead>
<tbody>
<tr><td>Sampai Rp 100.000.000</td><td>2,5%</td></tr>
<tr><td>Di atas Rp 100.000.000 sampai Rp 1.000.000.000</td><td>1,5%</td></tr>
<tr><td>Di atas Rp 1.000.000.000</td><td>1,0%</td></tr>
</tbody>
</table>`,
  '/tentang/': `<h1>${facts.PAGES['/tentang/'].h1}</h1>
<p>${facts.DEFINITION}</p>
<p>Notive dibuat di Indonesia untuk alur kantor notaris Indonesia. Produk ini menata order dan PIC, memakai Google Drive kantor sebagai tempat berkas, dan menyediakan Nora sebagai asisten berbahasa Indonesia.</p>
<p>Situs: <a href="https://notive.id/">https://notive.id/</a>. Uji coba: <a href="/register">14 hari gratis</a>.</p>`,
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

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://notive.id/</loc>
    <lastmod>2026-08-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://notive.id/aplikasi-notaris-indonesia/</loc>
    <lastmod>2026-08-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://notive.id/kalkulator-bphtb/</loc>
    <lastmod>2026-08-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://notive.id/tentang/</loc>
    <lastmod>2026-08-20</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
`
fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)

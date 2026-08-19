import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const failures = []
const need = (cond, msg) => { if (!cond) failures.push(msg) }
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const facts = JSON.parse(fs.readFileSync(path.join(root, 'scripts/facts.json'), 'utf8'))
const read = (p) => {
  const full = path.join(dist, p)
  if (!fs.existsSync(full)) {
    failures.push(`missing dist/${p}`)
    return ''
  }
  return fs.readFileSync(full, 'utf8')
}

function meta(html, name) {
  const m = html.match(new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, 'i'))
    || html.match(new RegExp(`<meta\\s+content="([^"]*)"\\s+name="${name}"`, 'i'))
  return m ? m[1] : ''
}
function prop(html, property) {
  const m = html.match(new RegExp(`<meta\\s+property="${property}"\\s+content="([^"]*)"`, 'i'))
    || html.match(new RegExp(`<meta\\s+content="([^"]*)"\\s+property="${property}"`, 'i'))
  return m ? m[1] : ''
}
function canonical(html) {
  const m = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)
    || html.match(/<link\s+href="([^"]*)"\s+rel="canonical"/i)
  return m ? m[1] : ''
}
function title(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i)
  return m ? m[1].trim() : ''
}

need(fs.existsSync(path.join(dist, 'index.html')), 'missing dist/index.html')
const home = read('index.html')
need(/<div id="root"[^>]*>[\s\S]*aplikasi notaris/i.test(home), 'homepage #root missing crawlable copy')
need(/tidak menyimpan isi dokumen/i.test(home) === false, 'homepage still claims documents are never stored')
need(home.includes('"@type": "SoftwareApplication"'), 'homepage missing SoftwareApplication JSON-LD')
need(/notive-logo\.svg/.test(home), 'Organization logo is not the SVG')

const indexed = [
  {
    route: '/',
    file: 'index.html',
    descIncludes: 'notaris',
  },
  {
    route: '/aplikasi-notaris-indonesia/',
    file: 'aplikasi-notaris-indonesia/index.html',
    descIncludes: 'aplikasi notaris',
  },
  {
    route: '/kalkulator-bphtb/',
    file: 'kalkulator-bphtb/index.html',
    descIncludes: 'BPHTB',
  },
  {
    route: '/tentang/',
    file: 'tentang/index.html',
    descIncludes: 'Notive',
  },
]

for (const page of indexed) {
  const full = path.join(dist, page.file)
  need(fs.existsSync(full), `missing dist/${page.file}`)
  if (!fs.existsSync(full)) continue
  const html = read(page.file)
  const expected = facts.PAGES[page.route]
  need(title(html) === expected.title, `${page.file} title want "${expected.title}" got "${title(html)}"`)
  need(canonical(html) === expected.canonical, `${page.file} canonical want ${expected.canonical} got ${canonical(html)}`)
  need(meta(html, 'description').toLowerCase().includes(page.descIncludes.toLowerCase()), `${page.file} description missing "${page.descIncludes}"`)
  need(prop(html, 'og:url') === expected.canonical || prop(html, 'og:url') === '', `${page.file} og:url mismatch`)
}

const category = fs.existsSync(path.join(dist, 'aplikasi-notaris-indonesia/index.html'))
  ? read('aplikasi-notaris-indonesia/index.html')
  : ''
need(/Notive adalah aplikasi/i.test(category), 'category page missing definition')
need(/My Drive atau Shared Drive/i.test(category), 'category page must mention both Drive types')

need(fs.existsSync(path.join(dist, 'register/index.html')), 'missing dist/register/index.html')
if (fs.existsSync(path.join(dist, 'register/index.html'))) {
  const reg = read('register/index.html')
  need(/noindex/i.test(reg), 'register must be noindex')
  need(/<div\b(?=[^>]*\bid=(['"])root\1)[^>]*>\s*<\/div>/i.test(reg), 'register #root must be empty for the client-rendered form')
}

const four = read('404.html')
need(/noindex/i.test(four), '404.html must be noindex')
need(canonical(four) !== 'https://notive.id/', '404.html must not canonical the homepage')

const sitemap = fs.existsSync(path.join(dist, 'sitemap.xml')) ? read('sitemap.xml') : ''
for (const loc of [
  'https://notive.id/',
  'https://notive.id/aplikasi-notaris-indonesia/',
  'https://notive.id/kalkulator-bphtb/',
  'https://notive.id/tentang/',
]) {
  need(sitemap.includes(`<loc>${loc}</loc>`), `sitemap missing ${loc}`)
}
need(!sitemap.includes('https://notive.id/register'), 'sitemap must not list /register')
need(!sitemap.includes('kebijakan-privasi'), 'sitemap must not list privacy until legal review')

if (failures.length) {
  console.error(failures.map((f) => `FAIL: ${f}`).join('\n'))
  process.exit(1)
}
console.log('seo-assert: ok')

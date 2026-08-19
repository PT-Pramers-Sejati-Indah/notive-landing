# Notive AI Search & Google AI Overview SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `notive.id` crawlable without JavaScript, defend branded search ("Notive"), and give Google/AI a single accurate page to cite for *aplikasi notaris Indonesia*. This is a half-day static-HTML job, not an SSR program.

**Architecture:** Keep the Vite + React homepage. Do not add `renderToString`, `hydrateRoot`, or a path router. After `vite build`, a Node script writes static HTML into `dist/<route>/index.html` and injects a crawlable hero into `dist/index.html` `#root`. React `createRoot` replaces that hero on mount for humans. Inner marketing pages are plain HTML; they do not boot the SPA. `/register` stays a client-only copy of the SPA shell with `noindex`. Google AI Overviews still use the Search index. Off-site indexing (GSC, Bing) is required.

**Tech Stack:** Vite 8, React 19 (homepage only), Node `fs` post-build scripts, GitHub Pages behind Cloudflare, `public/index.md` + `public/llms.txt` as mirrors.

## Global Constraints

- Bahasa Indonesia. Voice from `PRODUCT.md`: mudah, praktis, terpercaya; no empty claims; no em dashes; no marketing-buzzword list from impeccable.
- Do not invent testimonials, INI affiliation, ISO, or new vanity stats.
- **Data claims (accuracy gate):** never write "Notive tidak menyimpan isi dokumen", "isi berkas tidak dipindahkan ke server Notive", or "hanya Google Shared Drive". Use: berkas tetap di Google Drive kantor (My Drive atau Shared Drive) as the system of record; file bytes may transit Notive for requested processing (unggah, OCR, lampiran chat) and are not the long-term archive. Name sub-processors only after the product owner confirms the dashboard readme (this landing repo does not contain that file).
- Do not claim Notive replaces software cetak minuta akta.
- Canonical: `https://notive.id/` for home. Directory URLs use a trailing slash. GitHub Pages 301s the slashless form; that is expected, not a bug.
- `src/seo/facts.ts` is the only place prices, definition, and titles live. JSON-LD, static pages, `index.md`, and `llms.txt` are generated or copied from it.
- FAQPage JSON-LD may stay as an entity signal. Do not expect FAQ rich results (restricted since 2023).
- Privacy HTML may ship with `noindex` until a lawyer reviews it. Do not add it to the sitemap until that review.
- Billing checkout is out of scope for this repo. Do not block crawlable HTML on it. Note it as a parallel product risk.
- Google Business Profile is optional and low priority (suspension risk for a no-premises software company).

---

## Review disposition (2026-08-20 investor review)

Verified against this repo and live `notive.id`. The product `readme.md` cited in the review is **not in this workspace** (this `README.md` is the Vite template). Data-handling corrections are still accepted because the current landing FAQ is stricter than `PRODUCT.md` and is the liability the review flags.

| Item | Verdict | Action in this plan |
| --- | --- | --- |
| §1.1 No keyword volume | Partial. Original success metric is AI citation, not sessions. Low volume argues against a 12-task SSR build, not against fixing empty HTML. | Account pull stays in Task 0. Does not block Tasks 1–8. If volume is tiny, stop after static pages + GSC; do not add a blog. |
| §1.2 Billing missing | Cannot verify here. Landing already has trial CTAs and `src/Register.tsx` → `api.notive.id/register`. SEO does not create that funnel. | Out of scope. Parallel note only. |
| §1.3 ICP never searches | Push back. `PRODUCT.md` Users: they open this page when seeking a spreadsheet alternative or comparing Drive-stays-at-office. Referral is still the main GTM. | Branded search is now P0. Category page is a slow-burn asset, not the headline. |
| §1.4 Drive differentiator unvalidated | Partial. `PRODUCT.md` already names Drive-milik-kantor as the trust principle. H1 "satu tempat" is generic. | H1 leads with Drive. Customer check is an Account note, not a code gate for copy already on the site. |
| §2.1 Cloudflare AI bot block | Checked 2026-08-20. `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Googlebot` all `HTTP 200` on `/`. robots.txt allows them. | Recorded. Re-check after any Cloudflare Bot Fight change. Prerender/SSR is not void. |
| §2.2 Keyword Planner | Still needed; no public volume found. | Task 0 Account. |
| §3 Accuracy (transit, Gemini, My Drive) | Accept. Current FAQ/schema overclaim. | Facts module + privacy copy rewritten. Gemini named only after owner confirm. |
| §4.1–4.2 Fragile regex / weak assert | Accept. | Static generator uses DOM-less but checked replacements; assert title+canonical+description on every indexed route. |
| §4.3 `cp` on Windows | Accept. | Node `fs.copyFileSync` only. |
| §4.4 Slashless 200 | Accept. | Task 10 expects 301 then 200 on trailing slash. |
| §4.5–4.6 SSR `/register` | Accept. | Drop `/register` from sitemap. Client-only `noindex` shell so the form still works. |
| §4.7 Exact `#root` match | Accept. | Whitespace-tolerant replace. |
| §4.8 Homepage-as-404 | Accept. | Minimal `noindex` 404. |
| §4.9 Prices in five places | Accept. | `src/seo/facts.ts` only. |
| §4.10 FAQ rich results | Accept. | Expectation comment only. |
| §4.11 GBP | Accept. | Optional, last. |
| §6 Cut SSR for static HTML | Accept. | Tasks 4/7/8 from v1 deleted. This file is that rewrite. |

---

## Current-state audit

Live `/` is an empty `<div id="root"></div>`. Googlebot can render JS. GPTBot et al. get 200 but no body copy. `/index.md` is the only full-text document. `/register` is HTTP 404 with SPA `404.html`. Sitemap lists only `/` (`lastmod` 2026-07-23). CDN `Last-Modified` 2026-08-01. Search still shows stale "Notibot" snippets.

## File map

| File | Responsibility |
| --- | --- |
| `src/seo/facts.ts` | Definition, titles, prices, indexed routes |
| `scripts/seo-pages.json` | Body HTML fragments for static routes (generated from facts where possible) |
| `scripts/write-static-pages.mjs` | After Vite: inject homepage hero, write inner pages, 404, register shell |
| `scripts/seo-assert.mjs` | Title + canonical + description + phrase checks on every indexed `dist` page |
| `public/notive-logo.svg` | Organization logo |
| `public/sitemap.xml` | Indexed URLs only |
| `public/index.md`, `public/llms.txt` | Mirrors |
| `index.html` | Homepage head tags |
| `src/App.tsx` | Hero/FAQ/footer copy aligned with facts; no new router |

Indexed URLs: `/`, `/aplikasi-notaris-indonesia/`, `/kalkulator-bphtb/`, `/tentang/`.  
Built but not indexed: `/register/` (`noindex`), `/kebijakan-privasi/` (`noindex` until legal review).

---

### Task 0: Gates that are not code

**Files:** none

- [ ] **Step 1: Bot-block audit (already run 2026-08-20)**

Record: GPTBot / ClaudeBot / PerplexityBot / Googlebot → `200` on `https://notive.id/`. `robots.txt` allows those agents.

Re-run only if Cloudflare Bot Fight / "Block AI Scrapers" is changed:

```bash
curl.exe -A "GPTBot" -sI https://notive.id/
curl.exe -A "ClaudeBot" -sI https://notive.id/
curl.exe -A "PerplexityBot" -sI https://notive.id/
```

Expected: `200`. If `403`/`1010`, stop the AI-citation track until Cloudflare allows those UAs. Google indexing can still proceed.

- [ ] **Step 2: Keyword volume (Account)**

Pull Google Keyword Planner (or Ahrefs/Ubersuggest) for `aplikasi notaris indonesia`, `aplikasi manajemen kantor notaris`, `software notaris`, `notive`. Save numbers in `SEO-FOLLOWUPS.md`. Low volume → do not expand past this static cycle.

- [ ] **Step 3: Confirm data-handling facts (Account, blocks Task 6 privacy sitemap only)**

Product owner confirms against the dashboard readme: My Drive + Shared Drive; transit for upload/OCR/chat; named sub-processors (Gemini or not); retention of chat attachments. Until confirmed, privacy stays `noindex` and Gemini is not named on the page.

- [ ] **Step 4: No commit.**

---

### Task 1: Post-build SEO assertions

**Files:**
- Create: `scripts/seo-assert.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `dist/` after a production build
- Produces: `npm run test:seo`; exit 1 on any miss

- [ ] **Step 1: Write `scripts/seo-assert.mjs`**

```js
import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const read = (p) => fs.readFileSync(path.join(dist, p), 'utf8')
const failures = []
const need = (cond, msg) => { if (!cond) failures.push(msg) }

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
    file: 'index.html',
    titleIncludes: 'Notive',
    canonical: 'https://notive.id/',
    descIncludes: 'notaris',
  },
  {
    file: 'aplikasi-notaris-indonesia/index.html',
    titleIncludes: 'Aplikasi Notaris Indonesia',
    canonical: 'https://notive.id/aplikasi-notaris-indonesia/',
    descIncludes: 'aplikasi notaris',
  },
  {
    file: 'kalkulator-bphtb/index.html',
    titleIncludes: 'Kalkulator BPHTB',
    canonical: 'https://notive.id/kalkulator-bphtb/',
    descIncludes: 'BPHTB',
  },
  {
    file: 'tentang/index.html',
    titleIncludes: 'Tentang Notive',
    canonical: 'https://notive.id/tentang/',
    descIncludes: 'Notive',
  },
]

for (const page of indexed) {
  const full = path.join(dist, page.file)
  need(fs.existsSync(full), `missing dist/${page.file}`)
  if (!fs.existsSync(full)) continue
  const html = read(page.file)
  need(title(html).includes(page.titleIncludes), `${page.file} title missing "${page.titleIncludes}" (got: ${title(html)})`)
  need(canonical(html) === page.canonical, `${page.file} canonical want ${page.canonical} got ${canonical(html)}`)
  need(meta(html, 'description').toLowerCase().includes(page.descIncludes.toLowerCase()), `${page.file} description missing "${page.descIncludes}"`)
  need(prop(html, 'og:url') === page.canonical || prop(html, 'og:url') === '', `${page.file} og:url mismatch`)
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
}

need(fs.existsSync(path.join(dist, '404.html')), 'missing dist/404.html')
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
```

- [ ] **Step 2: Add script in `package.json`**

```json
"test:seo": "node scripts/seo-assert.mjs"
```

Leave `"build"` unchanged in this task.

- [ ] **Step 3: Run**

```bash
npm run build
node scripts/seo-assert.mjs
```

Expected: FAIL on empty `#root` and missing inner pages.

- [ ] **Step 4: Commit**

```bash
git add scripts/seo-assert.mjs package.json
git commit -m "test: add SEO assertions for crawlable static HTML"
```

---

### Task 2: Single facts module and homepage head/H1

**Files:**
- Create: `src/seo/facts.ts`
- Modify: `index.html`
- Modify: `src/App.tsx` (`Hero`, `Faq` Drive answer, `Features` Drive body)

**Interfaces:**
- Consumes: none
- Produces: `FACTS` imported by App and by `scripts/write-static-pages.mjs` (duplicate the numeric prices in the script by importing via `vite.ssrLoadModule`, or keep a `scripts/facts.json` generated in this task). To avoid a TS import from `.mjs`, also write `scripts/facts.json` in the same commit with identical values.

- [ ] **Step 1: `src/seo/facts.ts`**

```ts
export const ORIGIN = 'https://notive.id'

export const PRICES = {
  basicIdr: 125_000,
  proIdr: 499_000,
  basicLabel: 'Rp 125.000',
  proLabel: 'Rp 499.000',
} as const

export const DEFINITION =
  'Notive adalah aplikasi manajemen order untuk kantor notaris Indonesia. Notaris memakai Notive untuk menata order Jual Beli, Hak Tanggungan, Hibah, dan transaksi hukum lain, dengan berkas yang tetap di Google Drive kantor (My Drive atau Shared Drive), plus Nora, asisten AI berbahasa Indonesia.'

export const DRIVE_FACT =
  'Berkas tetap di Google Drive kantor Anda (My Drive atau Shared Drive). Drive kantor adalah tempat penyimpanan. File melewati Notive hanya untuk pemrosesan yang Anda minta, misalnya unggah folder, isi form dari PDF, atau lampiran chat.'

export const PAGES = {
  '/': {
    title: 'Notive — Aplikasi Notaris Indonesia',
    description:
      'Notive: aplikasi notaris Indonesia untuk manajemen order kantor. Berkas tetap di Google Drive Anda. Nora membantu dalam Bahasa Indonesia. Uji coba 14 hari.',
    canonical: `${ORIGIN}/`,
    h1: 'Notive: aplikasi notaris dengan berkas yang tetap di Google Drive kantor',
  },
  '/aplikasi-notaris-indonesia/': {
    title: 'Aplikasi Notaris Indonesia: Pilihan, Kriteria, dan Notive',
    description:
      'Apa itu aplikasi notaris Indonesia, tiga pendekatan yang biasa dibanding, dan kapan Notive cocok sebagai manajemen order.',
    canonical: `${ORIGIN}/aplikasi-notaris-indonesia/`,
    h1: 'Aplikasi notaris Indonesia: apa pilihannya dan kapan Notive cocok',
  },
  '/kalkulator-bphtb/': {
    title: 'Kalkulator BPHTB, PPh Final, dan Honorarium Notaris',
    description:
      'Rumus estimasi BPHTB, PPh Final, dan batas honorarium notaris menurut Pasal 36 UUJN. Buka juga kalkulator interaktif di beranda.',
    canonical: `${ORIGIN}/kalkulator-bphtb/`,
    h1: 'Kalkulator BPHTB, PPh Final, dan honorarium notaris',
  },
  '/tentang/': {
    title: 'Tentang Notive — Aplikasi Manajemen Order Notaris Indonesia',
    description: 'Notive dibuat untuk kantor notaris Indonesia: manajemen order, Google Drive kantor, dan Nora.',
    canonical: `${ORIGIN}/tentang/`,
    h1: 'Tentang Notive',
  },
} as const
```

- [ ] **Step 2: `scripts/facts.json`** (same strings; writer script reads this)

Copy `ORIGIN`, `PRICES`, `DEFINITION`, `DRIVE_FACT`, and `PAGES` into JSON. If they drift, `seo-assert` will fail on titles.

- [ ] **Step 3: Homepage `<head>` in `index.html`**

Set `<title>` and meta description to `PAGES['/']`. Organization `logo`: `https://notive.id/notive-logo.svg` (file added in Task 3; can land together).

SoftwareApplication `description` uses `DEFINITION`. Offers prices from `PRICES` (`"125000"`, `"499000"`). Feature list: Drive (My Drive atau Shared Drive), order, Nora, laporan PIC, autofill PDF.

Replace the Drive FAQ answer in JSON-LD with `DRIVE_FACT` (do not say isi dokumen tidak dipindahkan).

Add one FAQ question matching visible FAQ:

```json
{
  "@type": "Question",
  "name": "Apa itu aplikasi notaris Indonesia, dan apakah Notive termasuk?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Aplikasi notaris Indonesia adalah perangkat lunak untuk operasional kantor notaris. Notive termasuk sebagai aplikasi manajemen order, bukan software cetak minuta akta. Berkas tetap di Google Drive kantor (My Drive atau Shared Drive)."
  }
}
```

- [ ] **Step 4: `Hero()` in `src/App.tsx`**

```tsx
import { DEFINITION, PAGES } from './seo/facts'

<h1 className="hero-title reveal">
  {PAGES['/'].h1.replace('Notive: ', '')}
  {/* visible H1 must equal PAGES['/'].h1. Prefer interpolating the full h1 string. */}
</h1>
```

Use the full `PAGES['/'].h1` as the H1 text (split with `<span className="hero-accent">` only around `Google Drive kantor` if it still fits the layout).

Sub: `{DEFINITION}` plus one sentence: `Notive menggantikan spreadsheet lama untuk lacak order dan PIC.`

- [ ] **Step 5: Update Drive FAQ + feature body** in `src/App.tsx` to `DRIVE_FACT`. Remove "Notive tidak menyimpan atau menguasai berkas" if it remains.

- [ ] **Step 6: Commit**

```bash
git add src/seo/facts.ts scripts/facts.json index.html src/App.tsx
git commit -m "feat: branded title and defensible Drive copy for Notive"
```

---

### Task 3: Organization logo

**Files:**
- Create: `public/notive-logo.svg` (copy of `public/favicon.svg`)
- Modify: `index.html` logo field if not done in Task 2

- [ ] **Step 1:** `Copy-Item public/favicon.svg public/notive-logo.svg`

- [ ] **Step 2:** `"logo": "https://notive.id/notive-logo.svg"`

- [ ] **Step 3: Commit**

```bash
git add public/notive-logo.svg index.html
git commit -m "fix: use SVG Organization logo"
```

---

### Task 4: Static page writer (no SSR)

**Files:**
- Create: `scripts/page-template.html`
- Create: `scripts/write-static-pages.mjs`
- Modify: `package.json` `build`

**Interfaces:**
- Consumes: `dist/index.html` after Vite, `scripts/facts.json`
- Produces: inner pages, injected homepage `#root`, `dist/404.html`, `dist/register/index.html`

- [ ] **Step 1: `scripts/page-template.html`**

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{TITLE}}</title>
    <meta name="description" content="{{DESCRIPTION}}" />
    <link rel="canonical" href="{{CANONICAL}}" />
    {{ROBOTS}}
    <meta property="og:title" content="{{TITLE}}" />
    <meta property="og:description" content="{{DESCRIPTION}}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="id_ID" />
    <meta property="og:url" content="{{CANONICAL}}" />
    <meta property="og:site_name" content="Notive" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="stylesheet" href="{{CSS}}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Spectral:wght@600;700&display=swap" rel="stylesheet" />
    <style>
      .page-prose { max-width: 72ch; margin: 0 auto; padding: 6rem 1.25rem 4rem; }
      .page-prose h1 { font-family: Spectral, serif; font-size: clamp(1.75rem, 3vw, 2.5rem); text-wrap: balance; }
      .page-prose h2 { margin-top: 2.25rem; text-wrap: balance; }
      .page-prose p, .page-prose li { line-height: 1.65; }
      .page-prose table { width: 100%; border-collapse: collapse; margin: 1rem 0 1.5rem; }
      .page-prose th, .page-prose td { border: 1px solid #d9dee8; padding: 0.6rem 0.7rem; text-align: left; vertical-align: top; }
      .seo-nav, .seo-foot { max-width: 72ch; margin: 0 auto; padding: 1rem 1.25rem; }
    </style>
  </head>
  <body>
    <nav class="seo-nav" aria-label="Navigasi utama">
      <a href="/">Notive</a>
      · <a href="/aplikasi-notaris-indonesia/">Aplikasi notaris</a>
      · <a href="/kalkulator-bphtb/">Kalkulator</a>
      · <a href="/tentang/">Tentang</a>
      · <a href="/register">Coba 14 hari</a>
    </nav>
    <main class="page-prose">{{BODY}}</main>
    <footer class="seo-foot">
      <p>© 2026 Notive. Bukan pengganti nasihat hukum profesional.</p>
    </footer>
  </body>
</html>
```

- [ ] **Step 2: `scripts/write-static-pages.mjs`**

```js
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const facts = JSON.parse(fs.readFileSync(path.join(root, 'scripts/facts.json'), 'utf8'))
const template = fs.readFileSync(path.join(root, 'scripts/page-template.html'), 'utf8')

function cssHref() {
  const dir = path.join(dist, 'assets')
  const file = fs.readdirSync(dir).find((f) => f.endsWith('.css'))
  if (!file) throw new Error('no hashed CSS in dist/assets')
  return `/assets/${file}`
}

function fill(tpl, map) {
  let out = tpl
  for (const [k, v] of Object.entries(map)) {
    out = out.split(`{{${k}}}`).join(v)
  }
  if (out.includes('{{')) throw new Error(`unreplaced placeholder in template: ${out.match(/\{\{[^}]+\}\}/)}`)
  return out
}

function replaceRoot(html, inner) {
  const next = html.replace(
    /<div id="root"\s*>\s*<\/div>/,
    `<div id="root">\n${inner}\n</div>`,
  )
  if (next === html) throw new Error('failed to inject #root (markup drift)')
  return next
}

const css = cssHref()
const homeFacts = facts.PAGES['/']

const hero = `<article>
  <h1>${homeFacts.h1}</h1>
  <p>${facts.DEFINITION}</p>
  <p><a href="/aplikasi-notaris-indonesia/">Penjelasan aplikasi notaris Indonesia</a>
  · <a href="/register">Uji coba 14 hari</a></p>
</article>`

const builtIndex = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
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
<p>Nama pemroses (misalnya model AI untuk OCR atau asisten) akan dicantumkan setelah dikonfirmasi dari dokumentasi produk. Jangan mengisi merek di sini tanpa konfirmasi itu.</p>
<h2>Kontak</h2>
<p><a href="https://wa.me/6281384323745">WhatsApp +62 813-8432-3745</a></p>`,
}

for (const [route, body] of Object.entries(bodies)) {
  const page = facts.PAGES[route] || {
    title: 'Kebijakan Privasi — Notive',
    description: 'Bagaimana Notive menangani data kantor notaris dan Google Drive.',
    canonical: `${facts.ORIGIN}${route}`,
  }
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

const notFound = `<!doctype html><html lang="id"><head>
<meta charset="UTF-8" />
<meta name="robots" content="noindex,nofollow" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Halaman tidak ditemukan — Notive</title>
<link rel="canonical" href="https://notive.id/404" />
</head><body>
<p>Halaman tidak ditemukan.</p>
<p><a href="/">Kembali ke beranda Notive</a></p>
</body></html>`
fs.writeFileSync(path.join(dist, '404.html'), notFound)
```

`builtIndex` must be captured **before** homepage `#root` injection if register should stay an empty shell (so `/register` does not flash the homepage H1). In the script above, `const builtIndex = fs.readFileSync(...)` happens, then homepage is written with `replaceRoot`, then register uses original `builtIndex`. Keep that order.

- [ ] **Step 3: `package.json` build** (no `cp`)

```json
"build": "tsc -b && vite build && node scripts/write-static-pages.mjs && node scripts/seo-assert.mjs"
```

- [ ] **Step 4: Run `npm run build`**

Expected: `seo-assert: ok`.

Open `dist/index.html` and confirm `#root` contains the H1. Open `dist/aplikasi-notaris-indonesia/index.html` and confirm definition + both Drive types. Confirm `dist/register/index.html` has `noindex` and empty `#root`. Confirm `dist/404.html` has `noindex` and does not canonical the homepage.

- [ ] **Step 5: Commit**

```bash
git add scripts/page-template.html scripts/write-static-pages.mjs package.json
git commit -m "feat: emit crawlable static HTML after Vite build"
```

---

### Task 5: Align React homepage with injected hero

**Files:**
- Modify: `src/App.tsx` Hero (if Task 2 already matches, only verify)
- Modify: Footer links

**Interfaces:**
- Consumes: `PAGES['/'].h1`, `DEFINITION`
- Produces: humans see the same H1 bots see (avoid bait-and-switch)

- [ ] **Step 1:** Footer `Kantor notaris` and a Perusahaan link labeled `Aplikasi notaris` → `/aplikasi-notaris-indonesia/`. `Tentang` → `/tentang/`. `Hubungi` → `https://wa.me/6281384323745`. `Kebijakan privasi` → `/kebijakan-privasi/` (page exists, `noindex`).

- [ ] **Step 2:** On the homepage calculator section, add `<a href="/kalkulator-bphtb/">Penjelasan rumus BPHTB</a>`.

- [ ] **Step 3: `npm run build` still passes.** Commit.

```bash
git add src/App.tsx
git commit -m "feat: point footer at static SEO URLs"
```

---

### Task 6: Sitemap, markdown mirrors

**Files:**
- Modify: `public/sitemap.xml`
- Modify: `public/llms.txt`
- Modify: `public/index.md`

- [ ] **Step 1: `public/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
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
```

- [ ] **Step 2: `public/llms.txt`**

```txt
# Notive

> Notive adalah aplikasi manajemen order untuk kantor notaris Indonesia. Berkas tetap di Google Drive kantor (My Drive atau Shared Drive). Nora adalah asisten AI berbahasa Indonesia.

- [Beranda](https://notive.id/): Notive — aplikasi notaris Indonesia.
- [Aplikasi notaris Indonesia](https://notive.id/aplikasi-notaris-indonesia/): Kategori, kriteria, kapan Notive cocok.
- [Kalkulator BPHTB](https://notive.id/kalkulator-bphtb/): Rumus BPHTB, PPh Final, honorarium.
- [Tentang](https://notive.id/tentang/): Siapa Notive.
- [Coba gratis](https://dashboard.notive.id/register): Uji coba 14 hari tanpa kartu kredit.
```

- [ ] **Step 3:** After the H1 in `public/index.md`, insert `DEFINITION` and `DRIVE_FACT`. Replace every "Shared Drive" exclusive line and every "tidak menyimpan isi dokumen" / "tidak dipindahkan ke server Notive" with `DRIVE_FACT`. Link the category page.

- [ ] **Step 4: `npm run build` → `seo-assert: ok`.** Commit.

```bash
git add public/sitemap.xml public/llms.txt public/index.md
git commit -m "feat: sitemap and markdown mirrors without overclaiming Drive storage"
```

---

### Task 7: Production checks after deploy

**Files:** none

- [ ] **Step 1: Deploy `main`.**

- [ ] **Step 2:**

```bash
curl.exe -s https://notive.id/ | findstr /i "aplikasi notaris"
curl.exe -sI https://notive.id/aplikasi-notaris-indonesia
curl.exe -sI https://notive.id/aplikasi-notaris-indonesia/
curl.exe -sI https://notive.id/register
curl.exe -s https://notive.id/sitemap.xml
```

Expected: homepage HTML contains the H1 without JS. Slashless inner URL may be `301` to the slash URL; follow it and expect `200`. `/register` is `200` with `noindex`. Sitemap has four URLs, no register, no privacy.

- [ ] **Step 3:** Re-run GPTBot UA. Still `200`.

No commit unless deploy config is wrong.

---

### Task 8: Account indexing (branded first)

**Files:** `index.html` `sameAs` only after profiles exist.

- [ ] **Step 1: Google Search Console.** Verify `notive.id`, submit sitemap, inspect `/` and `/aplikasi-notaris-indonesia/`. Request indexing so the Notibot snippet dies. Branded queries `notive` and `notive id` are the first queries to watch.

- [ ] **Step 2: Bing Webmaster Tools.** Same sitemap (ChatGPT browsing often uses Bing).

- [ ] **Step 3: LinkedIn `notive-id` and Instagram `notive.id`.** Bios in `SEO-P1-BRAND-PROFILES.md`, but replace "tidak pernah menyimpan dokumen" with `DRIVE_FACT` before pasting. Then add `sameAs` and commit.

- [ ] **Step 4: Google Business Profile.** Skip unless you accept suspension risk for a no-premises software listing. Prefer Search Console + LinkedIn.

- [ ] **Step 5: Directories (Capterra/G2/Product Hunt).** Defer until Task 9 shows impressions. Do not buy listicles.

---

### Task 9: Measurement

- [ ] **Step 1: Wait 3–4 weeks.** Leading indicator is Search Console impressions for `notive` and `aplikasi notaris`, not AI screenshots.

- [ ] **Step 2: After impressions exist,** run:

1. `Notive`
2. `aplikasi notaris indonesia`
3. `software notaris Google Drive`

in Google AI Mode (id-ID) and one logged-out ChatGPT/Gemini session.

Pass: Notive named or linked without Notibot facts. Fail: only competitors, or hallucinated storage claims.

- [ ] **Step 3: If zero impressions after four weeks:** do not add SSR, a blog, or more URLs. Check indexing coverage and branded title only.

---

## Out of scope

- `react-dom/server`, `hydrateRoot`, App path router (cut from v1)
- Next/Astro rewrite
- Billing / dashboard checkout
- Demo video, og-image crop
- Cloudflare markdown Accept Worker
- Full blog
- Publishing privacy in the sitemap before legal review

## Self-review

- Review §3 accuracy is in `DRIVE_FACT` and assertions that forbid the old storage sentence.
- SSR tasks are gone. Static writer + `createRoot` replace is the crawlable-HTML path.
- `/register` is `noindex` and not in the sitemap; SPA shell still exists so the form works.
- 404 is `noindex` and not the homepage.
- Prices live in `facts.ts` / `facts.json`.
- Trailing-slash 301 is documented as success.
- Branded title is P0; category page is secondary.

# Google Search ranking roadmap

Goal: rank near the top for branded searches ("notive", "notive id") and reach page 1 for generic/competitive searches (notary/notaris management software and related keywords). AI-crawler visibility is tracked separately in [SEO-FOLLOWUPS.md](SEO-FOLLOWUPS.md) and is out of scope here.

Each item is tagged **[Code]** (something this repo/Claude can do) or **[Account]** (needs the user's Google/business/social accounts — can't be done via code).

## P0 — Foundational (do first, blocks everything else)
- **[Account]** Verify `notive.id` in [Google Search Console](https://search.google.com/search-console), submit `https://notive.id/sitemap.xml`, and request indexing of the homepage. Without this, neither branded nor generic queries have a reliable path to being crawled/ranked promptly.
- **[Account]** Re-fetch `https://notive.id/robots.txt` live and confirm the repo's `User-agent`/`Allow`/`Sitemap` lines actually show up (not overridden by Cloudflare). Carried over from [SEO-FOLLOWUPS.md](SEO-FOLLOWUPS.md) item 6.
- **[Account]** Optional: submit the same sitemap to Bing Webmaster Tools.

## P1 — Branded search ("notive" / "notive id")
- **[Account]** Claim/create consistent branded profiles linking back to notive.id: LinkedIn Company Page, Instagram, and similar. These are what Google typically surfaces alongside a small brand's own homepage for a branded query, and they reinforce entity association.
- **[Account]** Consider a Google Business Profile even without a public office — it can still anchor a knowledge-panel-style presence for the brand name.
- **[Code]** Done: `Organization` + `WebSite` JSON-LD already in `index.html` confirm the entity name/URL to Google.

## P2 — On-page relevance for generic keywords
- **[Account decision, then Code]** Proposed title/meta description variants that work commercial-intent phrases in alongside the existing branded copy — **not applied yet**, pick one or suggest edits:
  - Title: `Notive — Aplikasi Manajemen Notaris & Software Kantor Notaris Indonesia`
  - Meta description: `Notive adalah aplikasi manajemen notaris untuk kantor notaris Indonesia. Kelola order Jual Beli, Hak Tanggungan, dan transaksi hukum lainnya dengan software notaris modern, plus Nora, asisten AI Bahasa Indonesia.`
  - Current versions stay in place until you approve a change — rewriting live marketing copy for keyword targeting is a judgment call, not a mechanical fix.

## P3 — Content depth / topical authority
The site is a single homepage; that structurally caps how many distinct queries it can rank for.
- **[Code, needs scoping]** Give the Kalkulator (`src/Calculator.tsx`) its own indexable URL (e.g. `/kalkulator-bphtb`) with expanded explanatory content — it's a real tool people search for directly ("kalkulator bphtb notaris", "cara hitung pajak jual beli").
- **[Code + Account]** Start a small guide/blog section targeting long-tail queries ("cara menghitung BPHTB 2026", "perbedaan akta jual beli dan hibah", "template order notaris") that link back to the product. Needs content decisions (topics, who writes them) before implementation.
- **[Code]** Any new page needs its own `<url>` entry added to `public/sitemap.xml`.

## P4 — Backlinks / off-site authority
- **[Account]** Target notary/legal professional associations (Ikatan Notaris Indonesia, PPAT communities) for listings/links.
- **[Account]** List on SaaS directories: Capterra, G2, local Indonesian startup directories, Product Hunt.
- **[Account]** Pursue press coverage / guest posts in Indonesian legal-tech or startup media.
- Backlinks remain the dominant ranking factor for competitive generic terms — no code change substitutes for this.

## P5 — Structural
- **[Code, low urgency now]** Revisit SSR/prerendering (carried over from [SEO-FOLLOWUPS.md](SEO-FOLLOWUPS.md) item 5). Low priority at one page, but becomes important once P3 adds more pages — more indexable surface area amplifies the CSR-crawlability risk.

## Already done (from prior audit passes)
- Sitemap, robots.txt, canonical tag, Open Graph/Twitter Card tags, `Organization`/`WebSite`/`FAQPage`/`SoftwareApplication` JSON-LD, `llms.txt`.

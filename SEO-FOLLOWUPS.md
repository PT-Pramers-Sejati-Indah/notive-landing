# SEO follow-ups (deferred)

Tracked from the 2026-07-23 SEO audit. These were explicitly deferred by the user ("will add later") — not yet actioned.

For the Google Search ranking strategy (branded + generic keyword targeting), see [SEO-GROWTH-PLAN.md](SEO-GROWTH-PLAN.md).

## 1. `#demo` link has no destination
`src/App.tsx` — `Hero()` component, "Lihat demo (2 menit)" button uses `href="#demo"` with no matching section. Needs a real demo video/page.

## 2. Dead footer links (`href="#"`)
`src/App.tsx` — `Footer()` component. 9 links with no destination:
- **Solusi**: Notaris perorangan, Kantor notaris, Firma hukum, PPAT
- **Keamanan**: Data terpisah per kantor, Login aman, Kebijakan Privasi, Syarat & Ketentuan
- **Perusahaan**: Tentang, Blog, Hubungi, Status

Kebijakan Privasi and Syarat & Ketentuan are worth prioritizing — expected pages for a SaaS handling client documents, independent of SEO value.

## 3. `og:image` is a repurposed screenshot
`public/og-image.webp` (1280×800, copied from the dashboard hero screenshot) is used as the social share image. Works, but not cropped for the ~1200×630 aspect ratio platforms expect. Recommend a purpose-built social card.

## 4. Organization logo is low-resolution
`public/notive-logo.png` is 59×37px, used as the `logo` field in the `Organization` JSON-LD (`index.html`). Google recommends ≥112×112px for logo rich-result eligibility. Needs a higher-res asset.

## 5. Site is fully client-rendered (no SSR/prerendering)
`src/main.tsx` / `src/App.tsx` — raw HTML served is just `<div id="root">`; all content only exists after JS executes. Modern Googlebot renders JS, but many AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) may not, meaning they see an empty page. Worth evaluating a prerendering solution (`vite-plugin-ssr`, a build-time prerender step, or migrating to Astro/Next) if AI-answer-engine visibility matters.

## 6. Verify robots.txt post-deploy
The site is Cloudflare-proxied. Before this audit there was no `robots.txt` in the repo, yet the live site served one containing only Cloudflare's auto-appended "Content Signals" legal boilerplate. After deploying, re-fetch `https://notive.id/robots.txt` to confirm the repo's `User-agent`/`Allow`/`Sitemap` lines actually appear (i.e. Cloudflare isn't overriding them).

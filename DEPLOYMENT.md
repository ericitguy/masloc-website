# Deployment & Content Operations — MASLOC Website

## Quick start

```bash
node build.js          # render dist/ from content/*.json
node scripts/verify.js # check every internal link, image, sitemap + search index
node scripts/serve.js  # local preview at http://127.0.0.1:4321 (gzip/brotli, clean URLs, 404)
```

Zero npm dependencies; Node ≥ 18. Re-download imagery/fonts only if assets are missing: `bash scripts/fetch-assets.sh`.

## Architecture

```
content/       structured content layer (the CMS-shaped source of truth)
  site.json      org facts, navigation, footer, contact, social
  services.json  loan services + published eligibility
  programmes.json youth / agri / women / other initiatives
  offices.json   16 regional offices + head office (as published)
  team.json      board + executive management
  news.json      news items (verified facts only)
  faqs.json      FAQ groups
  pages.json     about / mandate / eligibility copy
lib/           page templates (pure functions returning HTML sections)
build.js       renders every page -> dist/, plus sitemap.xml, robots.txt,
               search-index.json, 404.html; merges @font-face into site.css
assets/        css (design system), js (progressive enhancement), fonts, photos
dist/          GENERATED — do not edit by hand; safe to delete and rebuild
scripts/       fetch-assets.sh, serve.js, verify.js
```

**Clean URLs:** each page is emitted as `dist/<path>/index.html` (`/about/` → `dist/about/index.html`).
**Search** runs entirely client-side over `dist/search-index.json` (no server, no query logging).
**Contact form** validates in the browser then hands off to the visitor's email app (`mailto:info@masloc.gov.gh`); nothing is stored. See “Integration points”.

## Editing content

1. Edit the relevant file in `content/` (JSON, schema is self-evident from existing entries).
2. `node build.js && node scripts/verify.js`
3. Commit source (`content/`, `lib/`, `assets/`, `build.js`), not `dist/`, unless your host wants a pre-built folder.

Adding a page: add a builder call in `build.js`, or extend an existing list (e.g. a new news item in `content/news.json` generates both `/news/<slug>/` and its sitemap entry automatically).

## CMS integration (defined path)

The content layer is deliberately CMS-shaped. To move off JSON files:

- **Structured CMS (Sanity/Strapi/Contentful/Directus):** map each `content/*.json` file to a content type (they are already flat records). Replace the `require('./content/…')` calls in `build.js` with fetches at build time. Templates in `lib/` need no changes. Rebuild on webhook — the output is pure static files.
- **Git-based CMS (Decap/Netlify CMS):** point the collections at `content/*.json` with the existing field order; editors commit, CI runs `node build.js`.
- **Fully dynamic:** not recommended for a public sector site; static output keeps hosting to any file server and removes a runtime attack surface.

## SEO & performance already configured

- Unique titles, meta descriptions, canonical URLs, Open Graph/Twitter cards (1200×630 JPEG per page).
- `sitemap.xml` (46 URLs), `robots.txt`, JSON-LD per page: `GovernmentOrganization`, `BreadcrumbList`, `FAQPage`, `NewsArticle`.
- Self-hosted variable fonts (`font-display: swap`, preloaded latin subsets), WebP photos in 400/800/1600w `srcset`, below-the-fold lazy loading, `fetchpriority="high"` on the hero.
- Site works for reading and navigation without JavaScript (search and form enhancements are progressive).
- Measured with Lighthouse (mobile emulation, local server): **home 94 / 100 / 100 / 100, service page 98 / 100 / 100 / 100** (performance/accessibility/best-practices/seo); CLS 0.

## Hosting

Any static host works (Netlify, Cloudflare Pages, GitHub Pages, S3+CloudFront, nginx):

1. Build command: `node build.js` (optionally `&& node scripts/verify.js`).
2. Publish directory: `dist/`.
3. Enable **gzip or brotli** for text assets — production hosts do this by default; the local dev server mirrors it.
4. Long-cache immutable `/assets/**` (filenames are stable; if you add content-hashing later, cache 1y), no-cache for HTML.
5. Ensure `/no-such-page` serves `dist/404.html` with HTTP status 404 (nginx: `error_page 404 /404.html;`).
6. Point `masloc.gov.gh` DNS + TLS at the host; canonical URLs already assume `https://www.masloc.gov.gh`.

## Integration points

- **Contact form:** currently `mailto:` handoff in `assets/js/site.js` (`contact-form` handler). To POST server-side, add an endpoint (host function) and replace `window.location.href = mailto` with `fetch(endpoint, {method:'POST', body: new FormData(form)})`, keeping the existing success/error status region.
- **Analytics:** add the approved snippet in `lib/layout.js` `<head>` only after legal review (see MISSING-CONTENT.md).
- **Application portal:** when an official portal exists, wire the header CTA (`content/site.json` → nav) to it; today it points to `/services/` (honest, no fake application flow).

## Pre-launch checklist

```bash
node build.js && node scripts/verify.js   # must print "All internal references resolve"
npx lighthouse http://127.0.0.1:4321/     # re-measure, do not assume
```

Manual: every nav item, dropdown, mobile menu, FAQ toggle, search results, contact-form validation (empty + valid), 404 page, and all three breakpoints (≤480px, 768px, 1440px). Then work through **MISSING-CONTENT.md** sign-off.

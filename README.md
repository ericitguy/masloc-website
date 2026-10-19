# MASLOC — Official Website Redesign (Static Build)

Microfinance and Small Loans Centre (MASLOC), Ghana — a premium, accessible, government-grade static website generated from a structured content layer.

**Design language:** Institutional Luxury × Modern African Excellence × Digital Public Service.
Brand colors extracted from the official MASLOC logo: gold `#F8C715`, sky blue `#8FCBDD`, deep teal-navy `#123E4C` (primary), teal `#226674` (links), ink `#17262C`, light sky tint `#E9F3F7` / `#F5FAFB`. Type: Fraunces (editorial display) + Manrope (body), self-hosted. All text/background pairs meet WCAG AA.

## Commands

```bash
node build.js          # generate dist/ (47 pages + sitemap, robots, search index)
node scripts/verify.js # link/asset/JSON-LD integrity check across dist/
node scripts/serve.js  # preview http://127.0.0.1:4321
bash scripts/fetch-assets.sh   # re-download photos + fonts (only if missing)
```

## What's inside

- **47 pages**: home, about, mandate, leadership, 4 loan-service pages, 4 programme pages, eligibility, FAQ, news index + 5 articles, publications, gallery, 16 regional offices + directory, contact, privacy, accessibility, terms, search, 404.
- **All facts verified** against the official site at build time; unpublished details (rates, timelines, documents) are explicitly *not* invented — the site says so and points to offices. See `MISSING-CONTENT.md` for what's needed before launch.
- **Zero runtime dependencies.** No frameworks, no trackers, no cookies.

## Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) — build, hosting, CMS integration path, integration points.
- [MISSING-CONTENT.md](MISSING-CONTENT.md) — official assets, legal review and credentials required before launch.

## Measured results (Lighthouse, mobile emulation)

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Home | 93 | 100 | 100 | 100 |
| Service detail | 97 | 100 | 100 | 100 |

CLS 0, TBT 0 ms on both; re-measure after any change — don't assume.

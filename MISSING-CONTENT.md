# Missing Official Content, Credentials & Integrations

**Before MASLOC publishes this website, the following items must be supplied or approved by the institution.** Nothing in this list was invented in the build; where the official source does not publish a fact, the site says so explicitly.

## 1. Official assets

| Item | Status | Where to drop it in |
|---|---|---|
| **Official MASLOC logo** | ✅ **Supplied 2026-10-18** (`logo1.jpg`, 185×75). Cropped and used in header/footer; palette extracted and applied site-wide. | `assets/img/masloc-logo.png` (+ `@2x`); icons from `emblem-96.png` / `apple-touch-icon.png`. **Higher-resolution master art still wanted** — the supplied file is small (76px-tall artwork), so the logo is soft on high-DPI screens; drop a vector (SVG/PDF) or 512px+ raster in the same files when available. |
| **Government of Ghana coat of arms / approved GoG lockup** | Not supplied. The top bar carries an approved-format text line instead. | `content/site.json` → `legalLine`; add an image in `lib/layout.js` header if approved. |
| **Official photographs** (staff events, leadership portraits, HQ) | Not supplied. The site uses licensed Ghana stock photography (Pexels) with honest captions. | Replace entries in `content/news.json`, `content/team.json` and the `GALLERY` list in `lib/pages.js`; put files in `assets/img/`. |

## 2. Content the official site does not publish (do not guess — obtain officially)

- **Interest rates, loan amounts, repayment terms, approval timelines** — the site states these are not published and directs citizens to offices. If MASLOC publishes them, add them to `content/services.json` and the FAQ.
- **Required-documents checklist per facility** — same treatment (`content/faqs.json`).
- **Online application portal** — none exists publicly. The contact form is honest email handoff only; wire a real endpoint if/when one is approved (see DEPLOYMENT.md → Integration points).
- **News dates and details** — news items carry year-level labels only (e.g. "2025") because the official pages expose no dates. Add exact dates to `content/news.json` when confirmed.
- **Publications PDF** — "MASLOC Publications Vol. I · No. 1" has no downloadable file yet. Add the file under `assets/docs/` and link it in `content/news.json` / `lib/pages.js` (publications page).
- **Regional office phone numbers/emails** — not published per-office. If MASLOC has them, add to `content/offices.json`; templates render them automatically.
- **FAQ answers** — currently derived strictly from published pages; MASLOC should review and approve wording in `content/faqs.json`.

## 3. Legal review required

- `content/pages.json` and `lib/pages.js` carry **Privacy Policy**, **Terms of Use** and **Accessibility Statement** drafted as reasonable defaults. **MASLOC legal officers must review before launch.**

## 4. Credentials & integrations needed at launch

- **Domain/DNS** for `masloc.gov.gh` pointing at the chosen host (canonical URLs already assume `https://www.masloc.gov.gh` — change `SITE_URL` in `lib/layout.js` if the origin differs).
- **TLS certificate** (host-managed).
- **Analytics** — none installed (no tracking by design). If MASLOC requires government analytics (e.g. GA4 or an approved GOV.GH tool), add the snippet in `lib/layout.js` `<head>` after legal approval; keep the privacy policy in sync.
- **Search console / sitemap submission** — `sitemap.xml` and `robots.txt` are generated; submit in Google Search Console after DNS cutover.
- **Contact form endpoint** — currently `mailto:` handoff. For server-side delivery, host must provide an endpoint (e.g. serverless function) and `assets/js/site.js` `contact-form` handler must POST to it instead.
- **Social accounts** — linked: Facebook `masloc.ghana`, Instagram `@maslocgh`, X `@maslocgh` (verified official). Confirm before launch.

## 5. Verified-by-construction claims (already accurate)

- Established **2006**; mission, vision, core values, mandate wording — quoted from the official site.
- Leadership names/titles (Feb/Apr 2025 appointments) — as published; **re-verify at launch** since leadership pages change.
- 16 regional office addresses and postal codes — reproduced exactly as published.

**Owner sign-off checklist:** official logo □ *(done — pending hi-res master)* · photography □ · legal pages □ · FAQ wording □ · rates/terms policy □ · analytics □ · contact endpoint □

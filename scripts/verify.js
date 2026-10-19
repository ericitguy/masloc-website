'use strict';
/** Verifies dist/: every internal link, image and asset reference resolves. */
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const problems = [];

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    out.push(...(e.isDirectory() ? walk(p) : [p]));
  }
  return out;
}

function exists(urlPath) {
  let p = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const full = path.join(DIST, p);
  return fs.existsSync(full);
}

const files = walk(DIST).filter((f) => f.endsWith('.html'));
let checked = 0;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(DIST, file);
  const refs = [];

  // hrefs and srcs
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) refs.push({ url: m[1], kind: 'attr' });
  // srcset entries
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
    m[1].split(',').forEach((part) => {
      const u = part.trim().split(/\s+/)[0];
      if (u) refs.push({ url: u, kind: 'srcset' });
    });
  }

  for (const { url } of refs) {
    if (!url || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) continue;
    if (/^(https?:)?\/\//.test(url)) continue; // external
    const clean = url.startsWith('/') ? url : path.join(path.dirname(rel), url);
    checked++;
    if (!exists(clean)) {
      problems.push(`${rel}: broken -> ${url}`);
    }
  }

  // JSON-LD well-formed
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      problems.push(`${rel}: invalid JSON-LD (${e.message})`);
    }
  }

  // basic sanity: title + description present
  if (!/<title>[^<]+<\/title>/.test(html)) problems.push(`${rel}: missing <title>`);
  if (!/name="description" content="[^"]+"/.test(html)) problems.push(`${rel}: missing meta description`);
  if (!/rel="canonical"/.test(html)) problems.push(`${rel}: missing canonical`);
}

// sitemap + search index sanity
const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const loc of sitemapUrls) {
  const p = loc.replace(/^https?:\/\/[^/]+/, '');
  if (!exists(p)) problems.push(`sitemap: broken -> ${loc}`);
}
const searchIndex = JSON.parse(fs.readFileSync(path.join(DIST, 'search-index.json'), 'utf8'));
for (const entry of searchIndex) {
  if (!exists(entry.u)) problems.push(`search-index: broken -> ${entry.u}`);
}

console.log(`Checked ${files.length} HTML files, ${checked} internal references, ${sitemapUrls.length} sitemap URLs, ${searchIndex.length} search entries.`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  problems.slice(0, 60).forEach((p) => console.error('  ' + p));
  process.exit(1);
}
console.log('All internal references resolve.');

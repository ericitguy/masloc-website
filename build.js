'use strict';
/**
 * MASLOC static site build.
 * Renders every page from the structured content layer (content/*.json)
 * into dist/ — clean URLs, sitemap, robots.txt, client search index.
 */
const fs = require('fs');
const path = require('path');

const { shell, SITE_URL } = require('./lib/layout');
const site = require('./content/site.json');
const servicesData = require('./content/services.json');
const programmesData = require('./content/programmes.json');
const officesData = require('./content/offices.json');
const teamData = require('./content/team.json');
const newsData = require('./content/news.json');
const faqData = require('./content/faqs.json');
const pagesData = require('./content/pages.json');

const home = require('./lib/home');
const services = require('./lib/services');
const programmes = require('./lib/programmes');
const news = require('./lib/news');
const offices = require('./lib/offices');
const pages = require('./lib/pages');

const DIST = path.join(__dirname, 'dist');

/* ---- collect rendered pages ---- */
const pageDefs = [];

pageDefs.push(home.build(site, {
  about: pagesData.about,
  services: servicesData,
  programmes: programmesData,
  news: newsData,
  offices: officesData
}));

pageDefs.push(pages.about(site, pagesData.about));
pageDefs.push(pages.mandate(site, pagesData.mandate));
pageDefs.push(pages.leadership(site, teamData));
pageDefs.push(services.overview(site, servicesData, pagesData));
servicesData.forEach((s) => pageDefs.push(services.detail(site, servicesData, pagesData, s)));
pageDefs.push(programmes.overview(site, programmesData));
programmesData.forEach((p) => pageDefs.push(programmes.detail(site, programmesData, p)));
pageDefs.push(pages.eligibility(site, pagesData.eligibility));
pageDefs.push(pages.faq(site, faqData));
pageDefs.push(news.index(site, newsData, { current: 'Vol. I · No. 1' }));
newsData.items.forEach((n) => pageDefs.push(news.article(site, newsData, n)));
pageDefs.push(pages.publications(site, newsData));
pageDefs.push(pages.gallery(site));
pageDefs.push(offices.directory(site, officesData));
officesData.offices.forEach((o) => pageDefs.push(offices.officePage(site, officesData, o)));
pageDefs.push(pages.contact(site, officesData));
pageDefs.push(pages.privacy());
pageDefs.push(pages.accessibility());
pageDefs.push(pages.terms());
pageDefs.push(pages.searchPage(site));
const notFound = pages.notFound();

/* ---- helpers ---- */
function writePage(def) {
  const html = shell(site, def, def.body);
  const rel = def.path.replace(/^\//, ''); // e.g. "about/" or "404.html"
  let outPath;
  if (rel.endsWith('.html')) {
    outPath = path.join(DIST, rel);
  } else {
    outPath = path.join(DIST, rel, 'index.html');
  }
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  return outPath;
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

/* ---- build ---- */
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

const written = pageDefs.map(writePage);
writePage(notFound);

// assets: css, js, fonts, images
copyDir(path.join(__dirname, 'assets'), path.join(DIST, 'assets'));

// Merge @font-face rules into site.css so only ONE render-blocking stylesheet
// is requested (fonts.css URLs use ../fonts/... which resolves identically
// from /assets/css/).
const fontsCss = fs.readFileSync(path.join(__dirname, 'assets/fonts/fonts.css'), 'utf8');
const siteCssPath = path.join(DIST, 'assets/css/site.css');
fs.writeFileSync(siteCssPath, fontsCss + '\n' + fs.readFileSync(siteCssPath, 'utf8'));

// robots.txt
fs.writeFileSync(
  path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);

// search index (client-side search)
const searchIndex = pageDefs
  .filter((p) => !p.robots)
  .map((p) => {
    const text = (p.body || '')
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return { t: p.title, u: p.path, d: p.description, b: text.slice(0, 6000) };
  });
fs.writeFileSync(path.join(DIST, 'search-index.json'), JSON.stringify(searchIndex));

// sitemap.xml
const now = new Date().toISOString().slice(0, 10);
const sitemapPages = [...pageDefs]; // 404.html excluded via robots filter? include everything except 404
const urls = sitemapPages
  .filter((p) => p.path !== '/404.html')
  .map((p) => {
    const loc = SITE_URL + (p.path === '/' ? '/' : p.path);
    const priority = p.path === '/' ? '1.0' : p.path.split('/').length > 2 ? '0.6' : '0.8';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n');
fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

/* ---- report ---- */
const pageCount = written.length + 1;
const size = (function dirSize(d) {
  let total = 0;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    total += e.isDirectory() ? dirSize(p) : fs.statSync(p).size;
  }
  return total;
})(DIST);

console.log(`Built ${pageCount} pages -> dist/`);
console.log(`Total size: ${(size / 1024 / 1024).toFixed(2)} MB`);
console.log(`Search index: ${searchIndex.length} entries`);

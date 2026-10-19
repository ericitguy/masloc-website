'use strict';
const { esc, icon } = require('./html');

const SITE_URL = 'https://www.masloc.gov.gh'; // canonical production origin

function navList(items, currentPath, level = 0) {
  return items
    .map((item) => {
      const active =
        item.href === currentPath ||
        (item.href !== '/' && currentPath.startsWith(item.href));
      const hasKids = Array.isArray(item.children) && item.children.length > 0;
      if (hasKids) {
        const childActive = item.children.some(
          (c) => c.href === currentPath || (c.href !== '/' && currentPath.startsWith(c.href))
        );
        return `<li class="nav-item nav-item--drop${active || childActive ? ' is-active' : ''}">
          <details class="nav-drop">
            <summary><a href="${esc(item.href)}" class="nav-parent-link">${esc(item.label)}</a>${icon('chevron', { size: 14, className: 'nav-caret' })}</summary>
            <ul class="nav-sub" role="list">
              ${item.children
                .map(
                  (c) => `<li><a href="${esc(c.href)}"${c.href === currentPath ? ' aria-current="page"' : ''}>
                    <span class="nav-sub-label">${esc(c.label)}</span>
                    ${c.desc ? `<span class="nav-sub-desc">${esc(c.desc)}</span>` : ''}
                  </a></li>`
                )
                .join('\n')}
            </ul>
          </details>
        </li>`;
      }
      return `<li class="nav-item${active ? ' is-active' : ''}"><a href="${esc(item.href)}"${item.href === currentPath ? ' aria-current="page"' : ''}>${esc(item.label)}</a></li>`;
    })
    .join('\n');
}

function header(site, currentPath) {
  return `<a class="skip-link" href="#main">Skip to main content</a>
<div class="topbar">
  <div class="container topbar-inner">
    <p class="topbar-gov">${icon('building', { size: 14 })} <span>${esc(site.legalLine)}</span></p>
    <div class="topbar-links">
      <a href="tel:${esc(site.headOffice.phones[0].replace(/\s/g, ''))}">${icon('phone', { size: 13 })} ${esc(site.headOffice.phones[0])}</a>
      <a href="mailto:${esc(site.headOffice.emails[0])}">${icon('mail', { size: 13 })} ${esc(site.headOffice.emails[0])}</a>
      <a class="topbar-search" href="/search/">${icon('search', { size: 13 })} Search</a>
    </div>
  </div>
</div>
<header class="site-header" id="site-header">
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="MASLOC — home">
      <img class="brand-logo" src="/assets/img/masloc-logo.png"
           srcset="/assets/img/masloc-logo.png 1x, /assets/img/masloc-logo@2x.png 2x"
           width="86" height="74"
           alt="MASLOC — Microfinance and Small Loans Centre">
    </a>
    <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="primary-nav">
      ${icon('menu', { size: 22, className: 'icon-menu' })}${icon('close', { size: 22, className: 'icon-close' })}
      <span class="visually-hidden">Menu</span>
    </button>
    <nav class="primary-nav" id="primary-nav" aria-label="Primary">
      <ul class="nav-list" role="list">${navList(site.nav, currentPath)}</ul>
      <a class="btn btn-primary nav-cta" href="/services/">Explore Loan Services</a>
    </nav>
  </div>
</header>
<noscript><style>
  @media (max-width: 62rem) {
    .nav-toggle { display: none !important; }
    .primary-nav { display: flex !important; position: static; }
    .nav-sub { position: static !important; box-shadow: none !important; }
  }
</style></noscript>`;
}

function breadcrumb(items) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      item: SITE_URL + it.href
    }))
  };
  return `<nav class="breadcrumbs container" aria-label="Breadcrumb">
    <ol role="list">
      ${items
        .map((it, i) =>
          i === items.length - 1
            ? `<li aria-current="page">${esc(it.label)}</li>`
            : `<li><a href="${esc(it.href)}">${esc(it.label)}</a></li>`
        )
        .join('\n      ')}
    </ol>
    <script type="application/ld+json">${JSON.stringify(ld)}</script>
  </nav>`;
}

function footer(site) {
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <div class="footer-logo">
        <img src="/assets/img/masloc-logo.png"
             srcset="/assets/img/masloc-logo.png 1x, /assets/img/masloc-logo@2x.png 2x"
             width="86" height="74"
             alt="MASLOC — Microfinance and Small Loans Centre">
      </div>
      <p class="footer-desc">${esc(site.description)}</p>
      <address class="footer-address">
        ${esc(site.headOffice.address)}<br>
        <a href="tel:${esc(site.headOffice.phones[0].replace(/\s/g, ''))}">${esc(site.headOffice.phones[0])}</a> ·
        <a href="tel:${esc(site.headOffice.phones[1].replace(/\s/g, ''))}">${esc(site.headOffice.phones[1])}</a><br>
        <a href="mailto:${esc(site.headOffice.emails[0])}">${esc(site.headOffice.emails[0])}</a> ·
        <a href="mailto:${esc(site.headOffice.emails[1])}">${esc(site.headOffice.emails[1])}</a>
      </address>
      <ul class="footer-social" role="list">
        <li><a href="${esc(site.social.facebook)}" target="_blank" rel="noopener">Facebook<span class="visually-hidden"> (opens in new tab)</span></a></li>
        <li><a href="${esc(site.social.instagram)}" target="_blank" rel="noopener">Instagram<span class="visually-hidden"> (opens in new tab)</span></a></li>
        <li><a href="${esc(site.social.x)}" target="_blank" rel="noopener">X<span class="visually-hidden"> (opens in new tab)</span></a></li>
      </ul>
    </div>
    ${site.footerColumns
      .map(
        (col) => `<div class="footer-col">
      <h2 class="footer-heading">${esc(col.title)}</h2>
      <ul role="list">${col.links.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join('')}</ul>
    </div>`
      )
      .join('\n    ')}
  </div>
  <div class="footer-base">
    <div class="container footer-base-inner">
      <p>© ${new Date().getFullYear()} Microfinance and Small Loans Centre (MASLOC). Published in the public interest.</p>
      <ul class="footer-legal" role="list">
        ${site.legalLinks.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join('')}
      </ul>
    </div>
  </div>
</footer>`;
}

function shell(site, page, body) {
  const canonical = SITE_URL + (page.path === '/' ? '/' : page.path);
  // Page builders reference photos as webp; social scrapers prefer a 1200x630 JPEG,
  // so map /assets/img/photos/<name>-1600.webp -> /assets/img/og/<name>.jpg
  let ogPath = page.ogImage || '/assets/img/og-default.jpg';
  const m = ogPath.match(/^\/assets\/img\/photos\/([\w-]+)-1600\.webp$/);
  if (m) ogPath = `/assets/img/og/${m[1]}.jpg`;
  const ogImage = SITE_URL + ogPath;
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'GovernmentOrganization',
      name: `${site.name} (${site.abbr})`,
      alternateName: site.abbr,
      url: SITE_URL,
      foundingDate: '2006',
      description: site.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.headOffice.address,
        addressCountry: 'GH'
      },
      telephone: site.headOffice.phones,
      email: site.headOffice.emails,
      sameAs: [site.social.facebook, site.social.instagram, site.social.x]
    },
    ...(page.jsonld || [])
  ];

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${page.robots || 'index,follow'}">
<meta name="theme-color" content="#123E4C">
<meta name="gov" content="Government of Ghana">
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="MASLOC">
<meta property="og:title" content="${esc(page.ogTitle || page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.ogTitle || page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/emblem-96.png" sizes="96x96" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script src="/assets/js/site.js" defer></script>
</head>
<body class="${page.bodyClass || ''}">
${header(site, page.path)}
<main id="main" tabindex="-1">
${body}
</main>
${footer(site)}
</body>
</html>`;
}

module.exports = { shell, breadcrumb, SITE_URL };

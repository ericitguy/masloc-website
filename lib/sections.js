'use strict';
const { esc, photo, icon, buttonLink } = require('./html');

/** Editorial inner-page hero: copy left, photo right. */
function pageHero({ eyebrow, heading, lead, image, imageAlt, compact }) {
  return `<section class="page-hero${compact ? ' page-hero--compact' : ''}">
  <div class="container page-hero-grid">
    <div class="page-hero-copy">
      ${eyebrow ? `<p class="eyebrow eyebrow--gold">${esc(eyebrow)}</p>` : ''}
      <h1>${heading}</h1>
      ${lead ? `<p class="page-hero-lead">${lead}</p>` : ''}
    </div>
    ${
      image
        ? `<div class="page-hero-media">${photo(image, imageAlt || '', {
            sizes: '(min-width: 60rem) 40vw, 100vw',
            loading: 'eager'
          })}</div>`
        : ''
    }
  </div>
</section>`;
}

/** Sibling navigation tabs (e.g. between loan services). */
function siblingNav(label, items, currentHref) {
  return `<nav class="sibling-nav" aria-label="${esc(label)}">
  <div class="container sibling-nav-inner">
    <ul role="list">
      ${items
        .map(
          (it) =>
            `<li><a href="${esc(it.href)}"${it.href === currentHref ? ' aria-current="page"' : ''}>${esc(it.label)}</a></li>`
        )
        .join('\n      ')}
    </ul>
  </div>
</nav>`;
}

/** Standard closing CTA band. */
function ctaBand({ eyebrow = 'Contact MASLOC', heading, text, primary, secondary }) {
  return `<section class="section cta-band">
  <div class="container cta-band-inner">
    <div>
      <p class="eyebrow eyebrow--gold">${esc(eyebrow)}</p>
      <h2>${heading}</h2>
      <p>${text}</p>
    </div>
    <div class="cta-band-actions">
      ${primary ? buttonLink(primary.label, primary.href, 'gold') : ''}
      ${secondary ? `<a class="btn btn-ghost" href="${esc(secondary.href)}"${/^https?:/.test(secondary.href) ? ' target="_blank" rel="noopener"' : ''}>${esc(secondary.label)}</a>` : ''}
    </div>
  </div>
</section>`;
}

/** Key-value fact list. */
function factList(facts, title) {
  return `<div class="fact-box">
    ${title ? `<h2 class="fact-box-title">${esc(title)}</h2>` : ''}
    <ul role="list">
      ${facts
        .map(
          (f) => `<li><span class="fact-label">${esc(f.label)}</span><span class="fact-value">${esc(f.value)}</span></li>`
        )
        .join('')}
    </ul>
  </div>`;
}

module.exports = { pageHero, siblingNav, ctaBand, factList };

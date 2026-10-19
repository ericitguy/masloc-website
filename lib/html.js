'use strict';
/** Small HTML helpers shared by all page builders. */

const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Responsive <img> from a local photo name (assets/img/photos/<name>-<w>.webp). */
function photo(name, alt, opts = {}) {
  const { sizes = '100vw', loading = 'lazy', fetchpriority, className, id } = opts;
  const src400 = `/assets/img/photos/${name}-400.webp`;
  const src800 = `/assets/img/photos/${name}-800.webp`;
  const src1600 = `/assets/img/photos/${name}-1600.webp`;
  return `<img
      ${id ? `id="${esc(id)}"` : ''}
      class="photo${className ? ' ' + esc(className) : ''}"
      src="${src800}"
      srcset="${src400} 400w, ${src800} 800w, ${src1600} 1600w"
      sizes="${esc(sizes)}"
      alt="${esc(alt)}"
      loading="${esc(loading)}"
      decoding="async"${fetchpriority ? `\n      fetchpriority="${esc(fetchpriority)}"` : ''}>`;
}

/** Inline line icons (1.5px stroke, 24px grid). */
const ICONS = {
  arrowRight: '<path d="M4 12h16m0 0-6-6m6 6-6 6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M17.5 20a6.5 6.5 0 0 0-2-4.7"/>',
  seed: '<path d="M12 21v-8"/><path d="M12 13c0-4 3-7 8-7 0 4-3 7-8 7Z"/><path d="M12 16c0-3-2.5-5.5-6.5-5.5C5.5 14 8 16 12 16Z"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
  book: '<path d="M4 19V6a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h13"/><path d="M9 8h6"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  scale: '<path d="M12 4v16M6 8h12M6 8l-3 6h6L6 8Zm12 0-3 6h6l-3-6Z"/>',
  quote: '<path d="M9 7c-3 1-4.5 3.5-4.5 7 0 2 1.2 3.5 3 3.5s3-1.3 3-3-1.2-3-3-3m9 0c-3 1-4.5 3.5-4.5 7 0 2 1.2 3.5 3 3.5s3-1.3 3-3-1.2-3-3-3"/>',
  external: '<path d="M14 5h5v5"/><path d="M19 5 10 14"/><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  check: '<path d="m5 13 4 4L19 7"/>',
  download: '<path d="M12 4v11m0 0 4-4m-4 4-4-4"/><path d="M5 19h14"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4.5l3 1.5"/>',
  building: '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M16 9h2a2 2 0 0 1 2 2v10M8 7h4M8 11h4M8 15h4M3 21h18"/>'
};

function icon(name, opts = {}) {
  const { size = 20, className } = opts;
  const d = ICONS[name] || '';
  return `<svg class="icon${className ? ' ' + esc(className) : ''}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`;
}

function buttonLink(label, href, variant = 'primary', opts = {}) {
  const cls = ['btn', `btn-${variant}`];
  if (opts.className) cls.push(opts.className);
  const ext = /^https?:/.test(href);
  return `<a class="${cls.join(' ')}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${esc(label)}${opts.icon === false ? '' : icon('arrowRight', { size: 16 })}</a>`;
}

function textLink(label, href, opts = {}) {
  const ext = /^https?:/.test(href);
  return `<a class="text-link${opts.className ? ' ' + esc(opts.className) : ''}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${esc(label)}${opts.icon === false ? '' : icon('arrowRight', { size: 15 })}</a>`;
}

function sectionHeader({ eyebrow, heading, lead, align = 'left', id, level = 2 }) {
  const htag = `h${level}`;
  return `<header class="section-header section-header--${align}"${id ? ` id="${esc(id)}"` : ''}>
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <${htag} class="section-title">${heading}</${htag}>
    ${lead ? `<p class="section-lead">${lead}</p>` : ''}
  </header>`;
}

module.exports = { esc, photo, icon, buttonLink, textLink, sectionHeader, ICONS };

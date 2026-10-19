'use strict';
const { esc, photo, icon, buttonLink, textLink } = require('./html');
const { pageHero, ctaBand } = require('./sections');
const { SITE_URL } = require('./layout');

function index(site, newsData, publications) {
  const items = newsData.items;
  const [lead, ...rest] = items;

  const body = `
${pageHero({
  eyebrow: 'News & Publications',
  heading: 'News & Announcements',
  lead: 'Official news, announcements, publications and gallery items from the Microfinance and Small Loans Centre.',
  compact: true
})}

<section class="section">
  <div class="container">
    <article class="lead-story">
      <a class="lead-story-media" href="/news/${lead.slug}/" tabindex="-1" aria-hidden="true">
        ${photo(lead.image, '', { sizes: '(min-width: 60rem) 50vw, 100vw', loading: 'eager' })}
      </a>
      <div class="lead-story-copy">
        <p class="news-meta"><span>${esc(lead.tag)}</span><span aria-hidden="true">·</span><span>${esc(lead.dateLabel)}</span></p>
        <h2><a href="/news/${lead.slug}/">${esc(lead.title)}</a></h2>
        <p>${esc(lead.excerpt)}</p>
        ${textLink('Read the announcement', `/news/${lead.slug}/`)}
      </div>
    </article>

    <div class="card-grid card-grid--3 news-grid">
      ${rest
        .map(
          (n) => `<article class="news-card">
        <a class="news-card-media" href="/news/${n.slug}/" tabindex="-1" aria-hidden="true">${photo(n.image, '', { sizes: '(min-width: 48rem) 33vw, 100vw' })}</a>
        <div class="news-card-body">
          <p class="news-meta"><span>${esc(n.tag)}</span><span aria-hidden="true">·</span><span>${esc(n.dateLabel)}</span></p>
          <h3><a href="/news/${n.slug}/">${esc(n.title)}</a></h3>
          <p>${esc(n.excerpt)}</p>
        </div>
      </article>`
        )
        .join('\n      ')}
    </div>

    <div class="publication-strip">
      <div class="publication-strip-copy">
        <p class="eyebrow">Publications</p>
        <h2>MASLOC Publications</h2>
        <p>Official News & Reports of the Microfinance and Small Loans Centre — currently listed as ${esc(publications.current)}.</p>
        ${textLink('View publications & reports', '/publications/')}
      </div>
      <div class="publication-strip-media">${photo('cocoa-hands', 'Hands sorting cocoa beans in the Ghanaian sun', { sizes: '(min-width: 60rem) 35vw, 100vw' })}</div>
    </div>
  </div>
</section>

${ctaBand({
  eyebrow: 'Gallery',
  heading: 'MASLOC in Pictures',
  text: 'Explore the photo gallery, and follow official MASLOC channels for regular updates.',
  primary: { label: 'Photo & Video Gallery', href: '/gallery/' },
  secondary: { label: 'Follow @maslocgh on X', href: site.social.x }
})}`;

  return {
    path: '/news/',
    title: 'News & Announcements | MASLOC',
    description:
      'Official news and announcements from MASLOC, including the Capital Behind Bars Initiative, staff activities and the MASLOC Publications series.',
    bodyClass: 'page-news',
    ogImage: '/assets/img/photos/market-wheelbarrow-1600.webp',
    body
  };
}

function article(site, newsData, item) {
  const others = newsData.items.filter((n) => n.slug !== item.slug).slice(0, 3);

  const body = `
${pageHero({
  eyebrow: item.tag,
  heading: esc(item.title),
  lead: `<span class="news-meta news-meta--lead"><span>${esc(item.dateLabel)}</span></span>`,
  compact: true
})}

<section class="section">
  <div class="container article-grid">
    <article class="prose article">
      <figure class="article-figure">
        ${photo(item.image, item.title, { sizes: '(min-width: 60rem) 60vw, 100vw', loading: 'eager' })}
      </figure>
      ${item.body.map((p) => `<p class="lead-para">${esc(p)}</p>`).join('')}
      <div class="note-box">
        <h2 class="note-box-title">Editorial note</h2>
        <p>${esc(item.note)}</p>
      </div>
      <p>${textLink('Back to all news', '/news/')}</p>
    </article>
    <aside class="sidebar">
      <div class="sidebar-card sidebar-card--dark">
        <h2>Media Enquiries</h2>
        <p>Contact the Head Office in Cantonments, Accra.</p>
        <ul role="list">
          <li>${icon('phone', { size: 16 })} <a href="tel:${esc(site.headOffice.phones[0].replace(/\s/g, ''))}">${esc(site.headOffice.phones[0])}</a></li>
          <li>${icon('mail', { size: 16 })} <a href="mailto:${esc(site.headOffice.emails[0])}">${esc(site.headOffice.emails[0])}</a></li>
        </ul>
      </div>
    </aside>
  </div>
</section>

<section class="section section--sage">
  <div class="container">
    <div class="card-grid card-grid--3">
      ${others
        .map(
          (n) => `<article class="news-card">
        <a class="news-card-media" href="/news/${n.slug}/" tabindex="-1" aria-hidden="true">${photo(n.image, '', { sizes: '(min-width: 48rem) 33vw, 100vw' })}</a>
        <div class="news-card-body">
          <p class="news-meta"><span>${esc(n.tag)}</span><span aria-hidden="true">·</span><span>${esc(n.dateLabel)}</span></p>
          <h3><a href="/news/${n.slug}/">${esc(n.title)}</a></h3>
        </div>
      </article>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>`;

  const jsonld = [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: item.title,
      datePublished: item.dateLabel === '2025' ? '2025' : undefined,
      image: [`${SITE_URL}/assets/img/photos/${item.image}-1600.webp`],
      author: { '@type': 'Organization', name: 'MASLOC' },
      publisher: { '@type': 'Organization', name: 'MASLOC' },
      mainEntityOfPage: SITE_URL + `/news/${item.slug}/`
    }
  ];

  return {
    path: `/news/${item.slug}/`,
    title: `${item.title} | MASLOC News`,
    description: item.excerpt,
    bodyClass: 'page-article',
    ogType: 'article',
    ogImage: `/assets/img/photos/${item.image}-1600.webp`,
    jsonld,
    body
  };
}

module.exports = { index, article };

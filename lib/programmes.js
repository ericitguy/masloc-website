'use strict';
const { esc, photo, icon, buttonLink, textLink, sectionHeader } = require('./html');
const { pageHero, siblingNav, ctaBand } = require('./sections');

const SIBLINGS = (programmes) =>
  programmes.map((p) => ({ label: p.short, href: `/programmes/${p.slug}/` }));

function overview(site, programmes) {
  const body = `
${pageHero({
  eyebrow: 'Programmes',
  heading: 'Programmes That Build Enterprises, Not Just Balance Sheets',
  lead: 'Skills, equipment and funding for young entrepreneurs, agricultural businesses and women-led enterprises — delivered through MASLOC offices nationwide.',
  image: 'cocoa-farmer',
  imageAlt: 'A cocoa farmer drying beans in rural Ghana'
})}
${siblingNav('Programmes', [{ label: 'All Programmes', href: '/programmes/' }, ...SIBLINGS(programmes)], '/programmes/')}

<section class="section">
  <div class="container">
    <div class="service-rows">
      ${programmes
        .map(
          (p, i) => `<article class="service-row${i % 2 ? ' service-row--flip' : ''}">
        <div class="service-row-media">${photo(p.image, p.title, { sizes: '(min-width: 60rem) 45vw, 100vw' })}</div>
        <div class="service-row-copy">
          <p class="eyebrow">${esc(p.eyebrow)}</p>
          <h2>${esc(p.title)}</h2>
          <p>${esc(p.summary)}</p>
          ${textLink(`Explore ${p.short}`, `/programmes/${p.slug}/`)}
        </div>
      </article>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>

${ctaBand({
  heading: 'Programmes Delivered Where You Are',
  text: 'Ask at your regional office how MASLOC programmes are being delivered in your community.',
  primary: { label: 'Find a Regional Office', href: '/regional-offices/' },
  secondary: { label: 'Contact MASLOC', href: '/contact/' }
})}`;

  return {
    path: '/programmes/',
    title: 'Enterprise Programmes — Youth, Agriculture & Women | MASLOC',
    description:
      'MASLOC programmes: youth entrepreneurship, agricultural business support, women\u2019s empowerment, business training and the Capital Behind Bars Initiative.',
    bodyClass: 'page-programmes',
    ogImage: '/assets/img/photos/cocoa-farmer-1600.webp',
    body
  };
}

function detail(site, programmes, prog) {
  const idx = programmes.findIndex((p) => p.slug === prog.slug);
  const prev = programmes[(idx - 1 + programmes.length) % programmes.length];
  const next = programmes[(idx + 1) % programmes.length];

  const body = `
${pageHero({
  eyebrow: prog.eyebrow,
  heading: esc(prog.title),
  lead: esc(prog.summary),
  image: prog.image,
  imageAlt: prog.title
})}
${siblingNav('Programmes', [{ label: 'All Programmes', href: '/programmes/' }, ...SIBLINGS(programmes)], `/programmes/${prog.slug}/`)}

<section class="section">
  <div class="container content-grid">
    <article class="prose">
      ${prog.intro.map((p) => `<p class="lead-para">${esc(p)}</p>`).join('')}
      ${
        prog.points
          ? `<h2>How the programme works</h2>
      <div class="point-grid">
        ${prog.points
          .map(
            (pt) => `<div class="point-card">
          <h3>${esc(pt.title)}</h3>
          <p>${esc(pt.text)}</p>
        </div>`
          )
          .join('')}
      </div>`
          : ''
      }
      ${
        prog.initiatives
          ? prog.initiatives
              .map(
                (it) => `<h2>${esc(it.title)}</h2>
      <p>${esc(it.text)}</p>`
              )
              .join('\n')
          : ''
      }
      <h2>How to take part</h2>
      <p>Programme participation, criteria and availability are confirmed through MASLOC offices. Visit your nearest regional office or the Accra Head Office to learn what is currently being delivered in your area.</p>
      <p class="note-inline">Loan amounts, equipment allocations and programme timelines are not published on MASLOC's official website and are not estimated here.</p>
    </article>
    <aside class="sidebar">
      <div class="sidebar-card sidebar-card--image">
        ${photo(prog.image, '', { sizes: '(min-width: 60rem) 30vw, 100vw' })}
      </div>
      <div class="sidebar-card sidebar-card--dark">
        <h2>Get Involved</h2>
        <p>Speak with MASLOC about this programme.</p>
        <ul role="list">
          <li>${icon('phone', { size: 16 })} <a href="tel:${esc(site.headOffice.phones[0].replace(/\s/g, ''))}">${esc(site.headOffice.phones[0])}</a></li>
          <li>${icon('mail', { size: 16 })} <a href="mailto:${esc(site.headOffice.emails[0])}">${esc(site.headOffice.emails[0])}</a></li>
        </ul>
        ${buttonLink('Contact MASLOC', '/contact/', 'gold')}
      </div>
    </aside>
  </div>
  <div class="container pager">
    <a href="/programmes/${prev.slug}/" class="pager-link">${icon('arrowRight', { size: 16, className: 'icon-flip' })} <span><small>Previous programme</small>${esc(prev.short)}</span></a>
    <a href="/programmes/${next.slug}/" class="pager-link pager-link--next"><span><small>Next programme</small>${esc(next.short)}</span> ${icon('arrowRight', { size: 16 })}</a>
  </div>
</section>

${ctaBand({
  heading: 'Combine Financing with Support',
  text: 'Programmes work alongside MASLOC loan services — explore financing for your business or group.',
  primary: { label: 'Explore Loan Services', href: '/services/' },
  secondary: { label: 'Eligibility & How to Apply', href: '/eligibility-application/' }
})}`;

  return {
    path: `/programmes/${prog.slug}/`,
    title: `${prog.title} | MASLOC Programmes`,
    description: prog.summary,
    bodyClass: 'page-programme-detail',
    ogImage: `/assets/img/photos/${prog.image}-1600.webp`,
    body
  };
}

module.exports = { overview, detail };

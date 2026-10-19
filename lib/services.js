'use strict';
const { esc, photo, icon, buttonLink, textLink, sectionHeader } = require('./html');
const { pageHero, siblingNav, ctaBand } = require('./sections');

const SIBLINGS = (services) =>
  services.map((s) => ({ label: s.short, href: `/services/${s.slug}/` }));

function overview(site, services, pages) {
  const body = `
${pageHero({
  eyebrow: 'Loan Services',
  heading: 'Loan Services for Every Stage of Enterprise',
  lead: 'MASLOC provides microcredit, small loans, hire purchase and wholesale lending — implemented on behalf of the Government of Ghana for start-ups and small businesses.',
  image: 'market-fruits',
  imageAlt: 'Fresh produce on display at a market in Ghana'
})}
${siblingNav('Loan Services', [
  { label: 'All Services', href: '/services/' },
  ...SIBLINGS(services),
  { label: 'Eligibility & How to Apply', href: '/eligibility-application/' }
], '/services/')}

<section class="section">
  <div class="container">
    <div class="service-rows">
      ${services
        .map(
          (s, i) => `<article class="service-row${i % 2 ? ' service-row--flip' : ''}">
        <div class="service-row-media">${photo(s.image, s.title, { sizes: '(min-width: 60rem) 45vw, 100vw' })}</div>
        <div class="service-row-copy">
          <p class="eyebrow">${esc(s.eyebrow)}</p>
          <h2>${esc(s.title)}</h2>
          <p>${esc(s.summary)}</p>
          <ul class="tick-list" role="list">
            ${s.eligibility.slice(0, 3).map((e) => `<li>${icon('check', { size: 16 })}<span>${esc(e)}</span></li>`).join('')}
          </ul>
          ${textLink(`View ${s.short} details`, `/services/${s.slug}/`)}
        </div>
      </article>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--sage">
  <div class="container support-strip">
    <div class="support-strip-copy">
      <p class="eyebrow">Supporting Services</p>
      <h2>Business Training & Advisory Services</h2>
      <p>Beyond financing, MASLOC delivers business training and advisory services to help entrepreneurs manage their operations — part of its mandate for enterprise development.</p>
      ${textLink('See training & other initiatives', '/programmes/other-initiatives/')}
    </div>
    <div class="support-strip-media">${photo('tailors-workshop', 'Tailors at work in a workshop', { sizes: '(min-width: 60rem) 40vw, 100vw' })}</div>
  </div>
</section>

${ctaBand({
  heading: 'Ready to Explore Your Options?',
  text: 'Review the published eligibility criteria, then visit your nearest MASLOC regional office or the Accra Head Office.',
  primary: { label: 'Eligibility & How to Apply', href: '/eligibility-application/' },
  secondary: { label: 'Find a Regional Office', href: '/regional-offices/' }
})}`;

  return {
    path: '/services/',
    title: 'Loan Services — Microcredit, Small Loans & Hire Purchase | MASLOC',
    description:
      'Explore MASLOC loan services: microcredit and group loans, small and project loans, vehicle and equipment hire purchase, and wholesale lending to microfinance institutions.',
    bodyClass: 'page-services',
    ogImage: '/assets/img/photos/market-fruits-1600.webp',
    body
  };
}

function detail(site, services, pages, svc) {
  const idx = services.findIndex((s) => s.slug === svc.slug);
  const prev = services[(idx - 1 + services.length) % services.length];
  const next = services[(idx + 1) % services.length];

  const body = `
${pageHero({
  eyebrow: svc.eyebrow,
  heading: esc(svc.title),
  lead: esc(svc.summary),
  image: svc.image,
  imageAlt: svc.title
})}
${siblingNav('Loan Services', [{ label: 'All Services', href: '/services/' }, ...SIBLINGS(services)], `/services/${svc.slug}/`)}

<section class="section">
  <div class="container content-grid">
    <article class="prose">
      ${svc.intro.map((p) => `<p class="lead-para">${esc(p)}</p>`).join('')}
      <p>${esc(svc.detail)}</p>

      <h2>Eligibility</h2>
      <p class="note-inline">Published eligibility criteria, as stated by MASLOC:</p>
      <ul class="tick-list tick-list--wide" role="list">
        ${svc.eligibility.map((e) => `<li>${icon('check', { size: 16 })}<span>${esc(e)}</span></li>`).join('')}
      </ul>

      <h2>How to Apply</h2>
      <p>${esc(svc.howToApply)}</p>

      <h2>What is not published</h2>
      <p>Interest rates, loan amounts, repayment terms, approval timelines and document checklists are not published on MASLOC's official website. This site does not estimate them. Confirm current terms directly with MASLOC before making commitments.</p>
    </article>
    <aside class="sidebar">
      <div class="sidebar-card sidebar-card--dark">
        <h2>Speak to MASLOC</h2>
        <p>Head Office · Cantonments, Accra</p>
        <ul role="list">
          <li>${icon('phone', { size: 16 })} <a href="tel:${esc(site.headOffice.phones[0].replace(/\s/g, ''))}">${esc(site.headOffice.phones[0])}</a></li>
          <li>${icon('phone', { size: 16 })} <a href="tel:${esc(site.headOffice.phones[1].replace(/\s/g, ''))}">${esc(site.headOffice.phones[1])}</a></li>
          <li>${icon('mail', { size: 16 })} <a href="mailto:${esc(site.headOffice.emails[0])}">${esc(site.headOffice.emails[0])}</a></li>
        </ul>
        ${buttonLink('Find a Regional Office', '/regional-offices/', 'gold')}
      </div>
      <div class="sidebar-card">
        <h2>Related</h2>
        <ul class="sidebar-links" role="list">
          <li><a href="/eligibility-application/">Eligibility & Application Information</a></li>
          <li><a href="/faq/">Frequently Asked Questions</a></li>
          <li><a href="/programmes/">Enterprise Programmes</a></li>
        </ul>
      </div>
    </aside>
  </div>
  <div class="container pager">
    <a href="/services/${prev.slug}/" class="pager-link">${icon('arrowRight', { size: 16, className: 'icon-flip' })} <span><small>Previous service</small>${esc(prev.short)}</span></a>
    <a href="/services/${next.slug}/" class="pager-link pager-link--next"><span><small>Next service</small>${esc(next.short)}</span> ${icon('arrowRight', { size: 16 })}</a>
  </div>
</section>

${ctaBand({
  heading: 'Take the Next Step with MASLOC',
  text: 'Eligible businesses and groups can review full criteria and apply at any MASLOC office.',
  primary: { label: 'How to Apply', href: '/eligibility-application/' },
  secondary: { label: 'Back to All Services', href: '/services/' }
})}`;

  return {
    path: `/services/${svc.slug}/`,
    title: `${svc.title} — MASLOC Loan Services`,
    description: svc.summary,
    bodyClass: 'page-service-detail',
    ogImage: `/assets/img/photos/${svc.image}-1600.webp`,
    body
  };
}

module.exports = { overview, detail };

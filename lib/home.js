'use strict';
const { esc, photo, icon, buttonLink, textLink, sectionHeader } = require('./html');

function build(site, { about, services, programmes, news, offices }) {
  const body = `
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow eyebrow--gold">Microfinance and Small Loans Centre · Ghana</p>
      <h1 class="hero-title">Empowering Enterprise. Expanding Opportunity. <em>Building Ghana's Future.</em></h1>
      <p class="hero-lead">${esc(site.description)} Through accessible microfinance, small loans and enterprise development services, we help create sustainable livelihoods and economic opportunity.</p>
      <div class="hero-actions">
        ${buttonLink('Explore Loan Services', '/services/', 'primary')}
        ${buttonLink('Discover Our Programmes', '/programmes/', 'secondary')}
      </div>
      <p class="hero-textlink">${textLink('Learn About MASLOC', '/about/')}</p>
    </div>
    <div class="hero-media">
      <figure class="hero-figure">
        ${photo('hero-market', 'A trader carries a basket of produce through a market in Accra, Ghana', {
          sizes: '(min-width: 60rem) 46vw, 100vw',
          loading: 'eager',
          fetchpriority: 'high'
        })}
        <figcaption>Ghanaian market enterprise — the everyday economy MASLOC serves.</figcaption>
      </figure>
      <div class="hero-motif" aria-hidden="true"></div>
    </div>
  </div>
  <div class="hero-rule" aria-hidden="true"><span></span><span></span><span></span></div>
</section>

<section class="credibility" aria-label="Institutional facts">
  <div class="container credibility-grid">
    ${site.creditStrip
      .map(
        (f) => `<div class="credibility-item">
      <p class="credibility-value">${esc(f.value)}</p>
      <p class="credibility-label">${esc(f.label)}</p>
      <p class="credibility-note">${esc(f.note)}</p>
    </div>`
      )
      .join('\n    ')}
  </div>
</section>

<section class="section about-intro">
  <div class="container about-intro-grid">
    <div class="about-intro-media">
      ${photo('fruit-vendor', 'A fruit seller at work in a Ghanaian market', { sizes: '(min-width: 60rem) 40vw, 100vw' })}
      <div class="about-intro-badge">
        <span class="badge-year">2006</span>
        <span class="badge-text">Established by the<br>Government of Ghana</span>
      </div>
    </div>
    <div class="about-intro-copy">
      ${sectionHeader({
        eyebrow: 'About MASLOC',
        heading: 'Building a Stronger Foundation for Ghanaian Enterprise',
        lead: about.lead
      })}
      <p>${esc(about.overview[2])}</p>
      <div class="about-values" role="list">
        <div role="listitem"><strong>Professionalism</strong></div>
        <div role="listitem"><strong>Integrity</strong></div>
        <div role="listitem"><strong>Team Spirit</strong></div>
        <div role="listitem"><strong>Excellence</strong></div>
        <div role="listitem"><strong>Respect</strong></div>
      </div>
      ${buttonLink('Discover Our Mandate', '/mandate/', 'outline')}
    </div>
  </div>
</section>

<section class="section section--sage services-teaser" aria-labelledby="services-heading">
  <div class="container">
    ${sectionHeader({
      eyebrow: 'Loan Services',
      heading: 'Financing Built for How Ghana Works',
      lead: 'From market trader collectives to agribusinesses and transport entrepreneurs — MASLOC services meet businesses where they are.',
      align: 'center',
      id: 'services-heading'
    })}
    <div class="card-grid card-grid--4">
      ${services
        .map(
          (s) => `<article class="service-card">
        <div class="service-card-media">${photo(s.image, s.title, { sizes: '(min-width: 75rem) 25vw, (min-width: 48rem) 50vw, 100vw' })}</div>
        <div class="service-card-body">
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.summary)}</p>
          ${textLink(`View ${s.short}`, `/services/${s.slug}/`)}
        </div>
      </article>`
        )
        .join('\n      ')}
    </div>
    <div class="section-foot">${buttonLink('All Loan Services & Eligibility', '/services/', 'outline')}</div>
  </div>
</section>

<section class="section programmes-teaser" aria-labelledby="programmes-heading">
  <div class="container">
    ${sectionHeader({
      eyebrow: 'Programmes',
      heading: 'Enterprise Development in Action',
      lead: 'Skills, equipment and funding for young entrepreneurs, farmers, fisherfolk and women-led businesses across Ghana.',
      align: 'center',
      id: 'programmes-heading'
    })}
    <div class="card-grid card-grid--4">
      ${programmes
        .map(
          (p) => `<article class="programme-card">
        <div class="programme-icon" aria-hidden="true">${icon(
          p.slug.includes('youth') ? 'users' : p.slug.includes('agri') ? 'seed' : p.slug.includes('women') ? 'briefcase' : 'book',
          { size: 26 }
        )}</div>
        <h3>${esc(p.short)}</h3>
        <p>${esc(p.summary)}</p>
        ${textLink('Explore', `/programmes/${p.slug}/`)}
      </article>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--forest apply-band" aria-labelledby="apply-heading">
  <div class="container">
    ${sectionHeader({
      eyebrow: 'For Applicants',
      heading: 'How to Apply with MASLOC',
      lead: 'Straightforward steps, published criteria and an office near you. No guesswork — and no invented requirements.',
      align: 'center',
      id: 'apply-heading'
    })}
    <ol class="steps-grid">
      <li><span class="step-num">1</span><h3>Review the criteria</h3><p>Check the published eligibility for each MASLOC service — age, group size and business requirements.</p></li>
      <li><span class="step-num">2</span><h3>Prepare your venture</h3><p>Groups of 5–25 with leaders and rules; individuals with an ongoing or viable start-up business.</p></li>
      <li><span class="step-num">3</span><h3>Visit a MASLOC office</h3><p>Full eligibility criteria and application guidance are available at every regional office and the Head Office.</p></li>
      <li><span class="step-num">4</span><h3>Apply on site</h3><p>Staff confirm documents, current terms and processing expectations for your facility.</p></li>
    </ol>
    <div class="section-foot section-foot--light">
      ${buttonLink('Eligibility & Application Information', '/eligibility-application/', 'gold')}
      <a class="btn btn-ghost" href="/regional-offices/">Find Your Regional Office</a>
    </div>
  </div>
</section>

<section class="section quote-band" aria-label="Our commitment">
  <div class="container quote-band-inner">
    <span class="quote-mark" aria-hidden="true">${icon('quote', { size: 44 })}</span>
    <blockquote>
      <p>${esc(about.quote)}</p>
      <footer>— ${esc(site.abbr)}, on financial inclusion</footer>
    </blockquote>
    <div class="quote-promise">
      <div><h3>Our Promise</h3><p>${esc(about.promise)}.</p></div>
      <div><h3>Our Commitment</h3><p>${esc(about.commitment)}.</p></div>
    </div>
  </div>
</section>

<section class="section section--sage news-teaser" aria-labelledby="news-heading">
  <div class="container">
    ${sectionHeader({
      eyebrow: 'News & Publications',
      heading: 'From the Institution',
      lead: 'Official news, announcements, publications and gallery items from MASLOC.',
      align: 'center',
      id: 'news-heading'
    })}
    <div class="card-grid card-grid--3">
      ${news.items
        .slice(0, 3)
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
    <div class="section-foot">
      ${buttonLink('All News', '/news/', 'outline')}
      ${buttonLink('Publications & Reports', '/publications/', 'outline')}
      ${buttonLink('Photo & Video Gallery', '/gallery/', 'outline')}
    </div>
  </div>
</section>

<section class="section offices-teaser" aria-labelledby="offices-heading">
  <div class="container offices-teaser-grid">
    <div class="offices-teaser-copy">
      ${sectionHeader({
        eyebrow: 'Regional Offices',
        heading: 'A Nationwide Network, Close to Home',
        lead: 'MASLOC serves entrepreneurs through regional offices across Ghana — from Accra and Koforidua to Tamale, Bolgatanga and Wa.'
      })}
      <ul class="region-chips" role="list">
        ${offices.offices.map((o) => `<li><a href="/regional-offices/${o.slug}/">${esc(o.region)}</a></li>`).join('')}
      </ul>
      ${buttonLink('Regional Office Directory', '/regional-offices/', 'primary')}
    </div>
    <div class="offices-teaser-media">
      ${photo('accra-aerial', 'Aerial view of the coastline at Accra, Ghana', { sizes: '(min-width: 60rem) 45vw, 100vw' })}
    </div>
  </div>
</section>

<section class="section cta-band">
  <div class="container cta-band-inner">
    <div>
      <p class="eyebrow eyebrow--gold">Contact MASLOC</p>
      <h2>Talk to Us About Your Business</h2>
      <p>Questions about eligibility, your nearest office or current terms? Our team is ready to help.</p>
    </div>
    <div class="cta-band-actions">
      ${buttonLink('Contact MASLOC', '/contact/', 'gold')}
      <a class="btn btn-ghost" href="tel:${esc(site.headOffice.phones[0].replace(/\s/g, ''))}">${icon('phone', { size: 16 })} ${esc(site.headOffice.phones[0])}</a>
    </div>
  </div>
</section>`;

  return {
    path: '/',
    title: 'MASLOC — Microfinance and Small Loans Centre, Ghana',
    description:
      'MASLOC is the Government of Ghana institution providing microcredit, small loans, hire purchase and enterprise development services to start-ups and small businesses nationwide.',
    bodyClass: 'page-home',
    ogImage: '/assets/img/photos/hero-market-1600.webp',
    body
  };
}

module.exports = { build };

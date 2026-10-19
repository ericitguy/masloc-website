'use strict';
const { esc, photo, icon, buttonLink, textLink, sectionHeader } = require('./html');
const { pageHero, ctaBand, factList } = require('./sections');
const { breadcrumb } = require('./layout');

/* ---------------- About ---------------- */
function about(site, aboutData) {
  const body = `
${pageHero({
  eyebrow: aboutData.eyebrow,
  heading: aboutData.heading,
  lead: aboutData.lead,
  image: aboutData.image,
  imageAlt: 'A fruit seller at work in a Ghanaian market'
})}

<section class="section">
  <div class="container content-grid">
    <article class="prose">
      ${aboutData.overview.map((p) => `<p class="lead-para">${esc(p)}</p>`).join('')}

      <h2>Our Role in Ghana's Economy</h2>
      <div class="point-grid">
        ${aboutData.role
          .map(
            (r) => `<div class="point-card">
          <h3>${esc(r.title)}</h3>
          <p>${esc(r.text)}</p>
        </div>`
          )
          .join('')}
      </div>

      <h2>In Our Words</h2>
      <blockquote class="pull-quote">
        <p>${esc(aboutData.quote)}</p>
      </blockquote>

      <h2>Our Promise</h2>
      <p>${esc(aboutData.promise)}.</p>
      <h2>Our Commitment</h2>
      <p>${esc(aboutData.commitment)}.</p>

      <p>${buttonLink(aboutData.cta.label, aboutData.cta.href, 'primary')}</p>
    </article>
    <aside class="sidebar">
      <div class="sidebar-card sidebar-card--image">
        ${photo('two-women', 'Two women in Ghanaian fashion, Accra', { sizes: '(min-width: 60rem) 30vw, 100vw' })}
      </div>
      <div class="sidebar-card">
        <h2>Quick Facts</h2>
        ${factList([
          { label: 'Established', value: '2006' },
          { label: 'Type', value: 'Government of Ghana institution' },
          { label: 'Position', value: 'Apex body, microfinance sub-sector' },
          { label: 'Head Office', value: 'Cantonments, Accra' }
        ])}
      </div>
      <div class="sidebar-card sidebar-card--dark">
        <h2>Leadership</h2>
        <p>Meet the Board and management team steering MASLOC.</p>
        ${buttonLink('Governance & Leadership', '/leadership/', 'gold')}
      </div>
    </aside>
  </div>
</section>

${ctaBand({
  heading: 'See How MASLOC Works',
  text: 'From mandate to services on the ground — explore the loan services and programmes that serve Ghanaian enterprise.',
  primary: { label: 'Explore Loan Services', href: '/services/' },
  secondary: { label: 'Our Programmes', href: '/programmes/' }
})}`;

  return {
    path: '/about/',
    title: 'About MASLOC — Microfinance and Small Loans Centre, Ghana',
    description:
      'About MASLOC: a Government of Ghana institution established in 2006, implementing microfinance and small loans programmes as the apex body of the microfinance sub-sector.',
    bodyClass: 'page-about',
    ogImage: '/assets/img/photos/fruit-vendor-1600.webp',
    body
  };
}

/* ---------------- Mandate ---------------- */
function mandate(site, m) {
  const body = `
${pageHero({
  eyebrow: m.eyebrow,
  heading: m.heading,
  lead: m.lead,
  image: 'portrait-man',
  imageAlt: 'Portrait of a young Ghanaian man in Accra'
})}

<section class="section">
  <div class="container content-grid">
    <article class="prose">
      <h2>Our Objective</h2>
      <blockquote class="mandate-quote"><p>${esc(m.objective)}</p></blockquote>
      <p>In carrying out this objective, MASLOC shall:</p>
      <ul class="tick-list tick-list--wide" role="list">
        ${m.shall.map((s) => `<li>${icon('check', { size: 16 })}<span>${esc(s)}</span></li>`).join('')}
      </ul>

      <h2>Mission</h2>
      <blockquote class="mandate-quote mandate-quote--mission"><p>${esc(m.mission)}</p></blockquote>

      <h2>Vision</h2>
      <blockquote class="mandate-quote mandate-quote--vision"><p>${esc(m.vision)}</p></blockquote>

      <h2>Core Values</h2>
      <div class="values-grid">
        ${m.values
          .map(
            (v) => `<div class="value-card">
          <h3>${esc(v.title)}</h3>
          <p>${esc(v.text)}</p>
        </div>`
          )
          .join('')}
      </div>

      <h2>History & Institutional Development</h2>
      ${m.history.map((p) => `<p>${esc(p)}</p>`).join('')}

      <p>${buttonLink(m.cta.label, m.cta.href, 'primary')}</p>
    </article>
    <aside class="sidebar">
      <div class="sidebar-card sidebar-card--dark">
        <h2>Governance</h2>
        <p>MASLOC is governed by a Board and led by an executive management team.</p>
        ${buttonLink('Meet the Leadership', '/leadership/', 'gold')}
      </div>
      <div class="sidebar-card">
        <h2>Accountability</h2>
        <p>Policy oversight for MASLOC sits with the Ministry of Finance's Development Finance Unit, which maintains oversight responsibility and policy development functions on microfinance institutions, MASLOC and venture capital funds.</p>
      </div>
    </aside>
  </div>
</section>

${ctaBand({
  heading: 'A Mandate Meant for Enterprises Like Yours',
  text: 'Explore the services and programmes that carry this mandate into markets, farms and communities across Ghana.',
  primary: { label: 'Loan Services', href: '/services/' },
  secondary: { label: 'Programmes', href: '/programmes/' }
})}`;

  return {
    path: '/mandate/',
    title: 'Mandate, Mission, Vision & Objectives | MASLOC',
    description:
      'MASLOC\u2019s mandate and objective as published by the institution, its official mission and vision statements, core values and institutional history since 2006.',
    bodyClass: 'page-mandate',
    ogImage: '/assets/img/photos/portrait-man-1600.webp',
    body
  };
}

/* ---------------- Leadership ---------------- */
function leadership(site, team) {
  const body = `
${pageHero({
  eyebrow: 'Governance & Leadership',
  heading: 'Led in the Public Interest',
  lead: 'MASLOC is governed by a Board chaired by Mr. Jerry Nyamekye and managed by an executive team led by Chief Executive Officer Madam Abigail Elorm Akwambea Mensah.',
  image: 'market-scene',
  imageAlt: 'A market scene in Accra, Ghana'
})}

<section class="section">
  <div class="container">
    <header class="section-header">
      <p class="eyebrow">Executive Management</p>
      <h2 class="section-title">Management Team</h2>
    </header>
    <div class="people-grid people-grid--mgmt">
      ${team.management
        .map(
          (p) => `<article class="person-card">
        <span class="person-avatar" aria-hidden="true">${esc(p.initials)}</span>
        <div>
          <h3>${esc(p.name)}</h3>
          <p class="person-title">${esc(p.title)}</p>
          ${p.note ? `<p class="person-note">${esc(p.note)}</p>` : ''}
        </div>
      </article>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--sage">
  <div class="container">
    <header class="section-header">
      <p class="eyebrow">Governance</p>
      <h2 class="section-title">Board of Directors</h2>
      <p class="section-lead">The MASLOC Board provides strategic oversight and public accountability for the institution's mandate.</p>
    </header>
    <div class="people-grid people-grid--board">
      ${team.board
        .map(
          (p) => `<article class="board-card">
        <h3>${esc(p.name)}</h3>
        <p class="person-title">${esc(p.title)}</p>
      </article>`
        )
        .join('\n      ')}
    </div>
    <p class="source-note">Leadership names and titles as published on masloc.gov.gh at build time.</p>
  </div>
</section>

${ctaBand({
  heading: 'Have a Question for MASLOC?',
  text: 'Contact the institution directly — the Head Office team will route your enquiry.',
  primary: { label: 'Contact MASLOC', href: '/contact/' },
  secondary: { label: 'Regional Offices', href: '/regional-offices/' }
})}`;

  return {
    path: '/leadership/',
    title: 'Governance & Leadership | MASLOC',
    description:
      'MASLOC governance: Board Chairman Mr. Jerry Nyamekye, CEO Madam Abigail Elorm Akwambea Mensah, executive management and Board members.',
    bodyClass: 'page-leadership',
    ogImage: '/assets/img/photos/market-scene-1600.webp',
    body
  };
}

/* ---------------- Eligibility & Application ---------------- */
function eligibility(site, e) {
  const body = `
${pageHero({
  eyebrow: e.eyebrow,
  heading: e.heading,
  lead: e.lead,
  image: 'kumasi-tailor',
  imageAlt: 'A tailor at a sewing machine on a street in Kumasi, Ghana'
})}

<section class="section">
  <div class="container">
    <div class="facts-bar">
      ${e.quickFacts
        .map(
          (f) => `<div class="fact-tile"><span class="fact-tile-label">${esc(f.label)}</span><span class="fact-tile-value">${esc(f.value)}</span></div>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section section--sage">
  <div class="container">
    <header class="section-header">
      <p class="eyebrow">Application Guidance</p>
      <h2 class="section-title">Four Steps to Your Application</h2>
    </header>
    <ol class="steps-grid steps-grid--dark-text">
      ${e.steps
        .map(
          (s) => `<li><span class="step-num">${e.steps.indexOf(s) + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section">
  <div class="container content-grid">
    <article class="prose">
      <h2>Published Criteria by Service</h2>
      <p>Each MASLOC service publishes its own criteria. Review them before visiting an office:</p>
      <div class="point-grid">
        <div class="point-card"><h3>Microcredit (Group Loans)</h3><p>Groups of 5–25 members; members aged 18–65; a Chairman, Secretary and Treasurer; internal rules and a common production or operational interest.</p>${textLink('Full criteria', '/services/microcredit-group-loans/')}</div>
        <div class="point-card"><h3>Small & Project Loans</h3><p>Aged 18–65, an ongoing business venture or project, sound knowledge and experience; start-ups must be viable and capable of generating employment.</p>${textLink('Full criteria', '/services/small-project-loans/')}</div>
        <div class="point-card"><h3>Vehicle & Equipment Hire Purchase</h3><p>Aged 18–65 with an ongoing venture; start-ups must be viable and employment-generating; full criteria available at MASLOC offices.</p>${textLink('Full criteria', '/services/vehicle-equipment-hire-purchase/')}</div>
        <div class="point-card"><h3>Wholesale Lending</h3><p>For microfinance institutions on-lending to small businesses; terms are set by MASLOC and available from the Head Office.</p>${textLink('Full criteria', '/services/wholesale-lending-microfinance-support/')}</div>
      </div>
      <div class="note-box note-box--warn">
        <h2 class="note-box-title">${esc(e.noticeTitle)}</h2>
        <p>${esc(e.notice)}</p>
      </div>
      ${buttonLink(e.cta.label, e.cta.href, 'primary')}
    </article>
    <aside class="sidebar">
      <div class="sidebar-card sidebar-card--dark">
        <h2>Apply in Person</h2>
        <p>Head Office · 29 Third Circular Road, Cantonments, Accra</p>
        <ul role="list">
          <li>${icon('phone', { size: 16 })} <a href="tel:${esc(site.headOffice.phones[0].replace(/\s/g, ''))}">${esc(site.headOffice.phones[0])}</a></li>
          <li>${icon('mail', { size: 16 })} <a href="mailto:${esc(site.headOffice.emails[0])}">${esc(site.headOffice.emails[0])}</a></li>
        </ul>
        ${buttonLink('All Regional Offices', '/regional-offices/', 'gold')}
      </div>
      <div class="sidebar-card">
        <h2>Questions</h2>
        <ul class="sidebar-links" role="list">
          <li><a href="/faq/">Frequently Asked Questions</a></li>
          <li><a href="/contact/">Contact MASLOC</a></li>
        </ul>
      </div>
    </aside>
  </div>
</section>`;

  return {
    path: '/eligibility-application/',
    title: 'Loan Eligibility & Application Information | MASLOC',
    description:
      'Published MASLOC eligibility criteria and application guidance: age requirements, group sizes, business criteria and where to apply at regional offices.',
    bodyClass: 'page-eligibility',
    ogImage: '/assets/img/photos/kumasi-tailor-1600.webp',
    body
  };
}

/* ---------------- FAQ ---------------- */
function faq(site, faqData) {
  const all = faqData.groups.flatMap((g) => g.items);
  const jsonld = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: all.map((it) => ({
        '@type': 'Question',
        name: it.q,
        acceptedAnswer: { '@type': 'Answer', text: it.a }
      }))
    }
  ];

  const body = `
${pageHero({
  eyebrow: 'Help',
  heading: 'Frequently Asked Questions',
  lead: 'Straight answers about MASLOC, its services, eligibility and how to apply — grounded in what the institution actually publishes.',
  compact: true
})}

<section class="section">
  <div class="container faq-layout">
    ${faqData.groups
      .map(
        (g) => `<div class="faq-group">
      <h2 class="faq-group-title">${esc(g.title)}</h2>
      <div class="faq-list">
        ${g.items
          .map(
            (it) => `<details class="faq-item">
          <summary><span>${esc(it.q)}</span>${icon('chevron', { size: 18, className: 'faq-caret' })}</summary>
          <div class="faq-answer"><p>${esc(it.a)}</p></div>
        </details>`
          )
          .join('')}
      </div>
    </div>`
      )
      .join('\n    ')}
    <p class="source-note">${esc(faqData.source)}</p>
  </div>
</section>

${ctaBand({
  heading: 'Still Have a Question?',
  text: 'The MASLOC team can help with eligibility, offices and current terms.',
  primary: { label: 'Contact MASLOC', href: '/contact/' },
  secondary: { label: `Call ${site.headOffice.phones[0]}`, href: `tel:${site.headOffice.phones[0].replace(/\s/g, '')}` }
})}`;

  return {
    path: '/faq/',
    title: 'Frequently Asked Questions | MASLOC',
    description:
      'FAQ about MASLOC: what it is, loan services, microcredit group criteria, eligibility ages, application process, offices and published versus unpublished terms.',
    bodyClass: 'page-faq',
    jsonld,
    body
  };
}

/* ---------------- Gallery ---------------- */
const GALLERY = [
  { img: 'hero-market', caption: 'Market enterprise in Accra — everyday commerce that MASLOC financing serves.' },
  { img: 'cocoa-farmer', caption: 'A cocoa farmer dries beans in rural Ghana, showcasing traditional agricultural practice.' },
  { img: 'seamstress', caption: 'A seamstress at work in Takoradi — the kind of enterprise supported by equipment and microcredit.' },
  { img: 'fishing-harbor', caption: 'Traditional fishing boats at Accra harbour — coastal livelihoods along the Gulf of Guinea.' },
  { img: 'woman-entrepreneur', caption: 'A business owner organises her products at an event in Accra.' },
  { img: 'urban-youth', caption: 'Young Ghanaians in Accra — the entrepreneurs of tomorrow.' },
  { img: 'cocoa-hands', caption: 'Hands sorting cocoa beans in the Ghanaian sun.' },
  { img: 'kumasi-tailor', caption: 'A tailor at his machine on a street in Kumasi.' },
  { img: 'two-women', caption: 'Ghanaian fashion and enterprise in Accra.' },
  { img: 'market-wheelbarrow', caption: 'Moving goods to market — the logistics of small-scale trade.' },
  { img: 'fishing-senya', caption: 'Fishing boats on the shore at Senya Beraku.' },
  { img: 'accra-aerial', caption: 'The coastline of Accra from above.' }
];

function gallery(site) {
  const body = `
${pageHero({
  eyebrow: 'Gallery',
  heading: 'Photo & Video Gallery',
  lead: 'Ghanaian enterprise in pictures — markets, farms, fisheries and workshops across the country.',
  compact: true
})}

<section class="section">
  <div class="container">
    <p class="source-note">Official MASLOC gallery items published on masloc.gov.gh include <strong>Breast Cancer Awareness 2025</strong>, <strong>Staff Durbar 2025</strong> and <strong>Staff Training 2025</strong>; official photographs from those activities can be added here once supplied (see MISSING-CONTENT.md). The photographs below are licensed stock photography of Ghana, used to represent the enterprise communities MASLOC serves.</p>
    <div class="gallery-grid">
      ${GALLERY.map(
        (g) => `<figure class="gallery-item">
        ${photo(g.img, g.caption, { sizes: '(min-width: 75rem) 25vw, (min-width: 48rem) 33vw, 100vw' })}
        <figcaption>${esc(g.caption)}</figcaption>
      </figure>`
      ).join('\n      ')}
    </div>
  </div>
</section>

${ctaBand({
  eyebrow: 'Follow MASLOC',
  heading: 'Official Updates, Straight from the Source',
  text: 'Follow MASLOC on official social channels for regular news and activity updates.',
  primary: { label: 'MASLOC on Facebook', href: site.social.facebook },
  secondary: { label: 'MASLOC on Instagram', href: site.social.instagram }
})}`;

  return {
    path: '/gallery/',
    title: 'Photo & Video Gallery | MASLOC',
    description:
      'Photo gallery of Ghanaian enterprise and MASLOC activities — markets, agriculture, fisheries and official institution photographs.',
    bodyClass: 'page-gallery',
    ogImage: '/assets/img/photos/seamstress-1600.webp',
    body
  };
}

/* ---------------- Publications ---------------- */
function publications(site, newsData) {
  const body = `
${pageHero({
  eyebrow: 'Publications',
  heading: 'Publications & Downloadable Reports',
  lead: 'Official News & Reports of the Microfinance and Small Loans Centre.',
  image: 'cocoa-drying',
  imageAlt: 'Cocoa beans drying in Ghana'
})}

<section class="section">
  <div class="container">
    <article class="publication-item">
      <div class="publication-item-mark" aria-hidden="true">${icon('book', { size: 34 })}</div>
      <div class="publication-item-copy">
        <p class="news-meta"><span>Official publication</span></p>
        <h2>MASLOC Publications — Vol. I · No. 1</h2>
        <p>The institution's official news and reports publication, carrying MASLOC's official news and reports.</p>
        <p class="publication-status">${icon('download', { size: 16 })} <strong>A downloadable file is not yet available on this site.</strong> The publication can be requested from the Head Office; a direct PDF link will be added when the file is supplied (see MISSING-CONTENT.md).</p>
        <ul class="contact-list contact-list--inline" role="list">
          <li>${icon('mail', { size: 17 })} <a href="mailto:${esc(site.headOffice.emails[0])}">${esc(site.headOffice.emails[0])}</a></li>
          <li>${icon('phone', { size: 17 })} <a href="tel:${esc(site.headOffice.phones[0].replace(/\s/g, ''))}">${esc(site.headOffice.phones[0])}</a></li>
        </ul>
      </div>
    </article>

    <div class="source-note">
      <p>Related: ${newsData.items.filter((n) => n.tag === 'Publication' || n.tag === 'News').map((n) => `<a href="/news/${n.slug}/">${esc(n.title)}</a>`).join(' · ')}</p>
    </div>
  </div>
</section>

${ctaBand({
  heading: 'Looking for Something Specific?',
  text: 'The Head Office can provide institutional publications and information on request.',
  primary: { label: 'Contact MASLOC', href: '/contact/' },
  secondary: { label: 'All News', href: '/news/' }
})}`;

  return {
    path: '/publications/',
    title: 'Publications & Reports | MASLOC',
    description:
      'Official publications of the Microfinance and Small Loans Centre — MASLOC Publications, Vol. I · No. 1, and official news and reports.',
    bodyClass: 'page-publications',
    ogImage: '/assets/img/photos/cocoa-drying-1600.webp',
    body
  };
}

/* ---------------- Contact ---------------- */
function contact(site, officesData) {
  const { headOffice, offices } = officesData;
  const body = `
${pageHero({
  eyebrow: 'Contact',
  heading: 'Contact MASLOC',
  lead: 'Questions about eligibility, applications or our programmes? Reach the Head Office directly, or find your nearest regional office.',
  compact: true
})}

<section class="section">
  <div class="container contact-grid">
    <div class="contact-details">
      <h2>Head Office</h2>
      <address class="contact-address">${esc(headOffice.address)}</address>
      <ul class="contact-list" role="list">
        <li>${icon('phone', { size: 18 })} <a href="tel:${esc(headOffice.phones[0].replace(/\s/g, ''))}">${esc(headOffice.phones[0])}</a></li>
        <li>${icon('phone', { size: 18 })} <a href="tel:${esc(headOffice.phones[1].replace(/\s/g, ''))}">${esc(headOffice.phones[1])}</a></li>
        <li>${icon('mail', { size: 18 })} <a href="mailto:${esc(headOffice.emails[0])}">${esc(headOffice.emails[0])}</a></li>
        <li>${icon('mail', { size: 18 })} <a href="mailto:${esc(headOffice.emails[1])}">${esc(headOffice.emails[1])}</a></li>
      </ul>
      <div class="contact-offices">
        <h3>Regional offices</h3>
        <p>MASLOC serves all ${offices.length} regions of Ghana through offices nationwide.</p>
        ${buttonLink('Regional Office Directory', '/regional-offices/', 'outline')}
      </div>
      <div class="contact-social">
        <h3>Official channels</h3>
        <ul class="footer-social footer-social--dark" role="list">
          <li><a href="${esc(site.social.facebook)}" target="_blank" rel="noopener">Facebook</a></li>
          <li><a href="${esc(site.social.instagram)}" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="${esc(site.social.x)}" target="_blank" rel="noopener">X</a></li>
        </ul>
      </div>
    </div>

    <div class="contact-form-wrap">
      <h2>Send an Enquiry</h2>
      <p class="contact-form-intro">This form prepares an email to <a href="mailto:${esc(headOffice.emails[0])}">${esc(headOffice.emails[0])}</a> using your device's email app — no data is stored on this website.</p>
      <form class="contact-form" id="contact-form" action="mailto:${esc(headOffice.emails[0])}" method="post" enctype="text/plain" novalidate>
        <div class="field">
          <label for="cf-name">Full name <span class="req" aria-hidden="true">*</span></label>
          <input id="cf-name" name="name" type="text" autocomplete="name" required aria-describedby="cf-name-err">
          <p class="field-error" id="cf-name-err" hidden>Please enter your name.</p>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="cf-email">Email address <span class="req" aria-hidden="true">*</span></label>
            <input id="cf-email" name="email" type="email" autocomplete="email" required aria-describedby="cf-email-err">
            <p class="field-error" id="cf-email-err" hidden>Please enter a valid email address.</p>
          </div>
          <div class="field">
            <label for="cf-phone">Phone number</label>
            <input id="cf-phone" name="phone" type="tel" autocomplete="tel" aria-describedby="cf-phone-err">
            <p class="field-error" id="cf-phone-err" hidden>Please enter a valid phone number.</p>
          </div>
        </div>
        <div class="field">
          <label for="cf-region">Nearest region</label>
          <select id="cf-region" name="region">
            <option value="">Select a region (optional)</option>
            ${offices.map((o) => `<option value="${esc(o.region)}">${esc(o.region)}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label for="cf-subject">Subject <span class="req" aria-hidden="true">*</span></label>
          <select id="cf-subject" name="subject" required aria-describedby="cf-subject-err">
            <option value="">Select a topic</option>
            <option>Microcredit & group loans</option>
            <option>Small & project loans</option>
            <option>Vehicle & equipment hire purchase</option>
            <option>Wholesale lending (microfinance institutions)</option>
            <option>Programmes & training</option>
            <option>General enquiry</option>
          </select>
          <p class="field-error" id="cf-subject-err" hidden>Please choose a topic.</p>
        </div>
        <div class="field">
          <label for="cf-message">Message <span class="req" aria-hidden="true">*</span></label>
          <textarea id="cf-message" name="message" rows="6" required aria-describedby="cf-message-err cf-hint"></textarea>
          <p class="field-hint" id="cf-hint">Do not include bank details or identification numbers.</p>
          <p class="field-error" id="cf-message-err" hidden>Please enter your message.</p>
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" type="submit">Prepare Email${icon('arrowRight', { size: 16 })}</button>
          <a class="btn btn-outline" href="tel:${esc(headOffice.phones[0].replace(/\s/g, ''))}">Call instead</a>
        </div>
        <div class="form-status" id="form-status" role="status" aria-live="polite" hidden></div>
      </form>
    </div>
  </div>
</section>`;

  const body_ = body;
  return {
    path: '/contact/',
    title: 'Contact MASLOC — Head Office & Regional Offices',
    description:
      'Contact MASLOC: Head Office at 29 Third Circular Road, Cantonments, Accra. Phone +233 302 782527 / +233 302 782528, email info@masloc.gov.gh.',
    bodyClass: 'page-contact',
    body: body_
  };
}

/* ---------------- Legal pages ---------------- */
function privacy() {
  const body = `
${pageHero({
  eyebrow: 'Legal',
  heading: 'Privacy Policy',
  lead: 'How this website handles information — plainly stated.',
  compact: true
})}
<section class="section">
  <div class="container prose prose--narrow">
    <h2>What this website collects</h2>
    <p>This website is a public information service. It does not require accounts, does not use tracking cookies and does not store personal data on this site. The contact form prepares an email using your own device's email application; your message is delivered by your email provider to MASLOC and is not stored by this website.</p>
    <h2>Server logs</h2>
    <p>Like most websites, the hosting provider may record standard technical logs (such as IP address, browser type, requested pages and timestamps) for security and reliability purposes. These logs are governed by the hosting provider's own policies.</p>
    <h2>Third-party links</h2>
    <p>This website links to official MASLOC social media channels and mapping services. Those sites have their own privacy policies, which we encourage you to read.</p>
    <h2>Search</h2>
    <p>The site search runs entirely in your browser. Search terms are not sent to any server operated for this website.</p>
    <h2>Requests</h2>
    <p>To ask about any information this site may hold, contact <a href="mailto:info@masloc.gov.gh">info@masloc.gov.gh</a> or write to the Head Office, 29 Third Circular Road, Cantonments, Accra.</p>
    <p class="note-inline">This policy must be reviewed and formally approved by MASLOC's legal officers before launch (see MISSING-CONTENT.md).</p>
  </div>
</section>`;
  return {
    path: '/privacy/',
    title: 'Privacy Policy | MASLOC',
    description: 'Privacy policy for the official MASLOC website: what is collected, cookies, third-party links and contact for privacy requests.',
    bodyClass: 'page-legal',
    body
  };
}

function accessibility() {
  const body = `
${pageHero({
  eyebrow: 'Legal',
  heading: 'Accessibility Statement',
  lead: 'MASLOC is committed to a website that everyone can use.',
  compact: true
})}
<section class="section">
  <div class="container prose prose--narrow">
    <h2>Our commitment</h2>
    <p>This website aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA. It is built with semantic HTML, keyboard-navigable menus, visible focus states, sufficient colour contrast, skip navigation, descriptive link text and responsive layouts from 320px upward.</p>
    <h2>What we have done</h2>
    <ul>
      <li>Text and background colours meet WCAG AA contrast requirements.</li>
      <li>All functionality is operable by keyboard.</li>
      <li>Images carry descriptive alternative text.</li>
      <li>Forms use explicit labels and inline error messages announced to screen readers.</li>
      <li>The site works without JavaScript for reading and navigation (search and the contact form need JavaScript or an email client).</li>
    </ul>
    <h2>Known limitations</h2>
    <p>Official photographs and documents supplied by MASLOC may require alt-text and accessible-format versions. Any known limitation will be listed here once official content is migrated.</p>
    <h2>Feedback</h2>
    <p>If you have difficulty using this website, please tell us at <a href="mailto:info@masloc.gov.gh">info@masloc.gov.gh</a> or call <a href="tel:+233302782527">+233 302 782527</a>. We aim to respond within five working days.</p>
  </div>
</section>`;
  return {
    path: '/accessibility/',
    title: 'Accessibility Statement | MASLOC',
    description: 'MASLOC website accessibility statement: WCAG 2.2 AA commitment, features implemented, known limitations and how to give feedback.',
    bodyClass: 'page-legal',
    body
  };
}

function terms() {
  const body = `
${pageHero({
  eyebrow: 'Legal',
  heading: 'Terms of Use',
  lead: 'The rules for using this website and its information.',
  compact: true
})}
<section class="section">
  <div class="container prose prose--narrow">
    <h2>Information, not offers</h2>
    <p>Content on this website is published for public information. It is not a financial offer, an approval, or a commitment to lend. Loan products, criteria and terms are confirmed only through MASLOC offices and formal documentation.</p>
    <h2>Accuracy</h2>
    <p>We take care to publish accurate, verified information. Where the official MASLOC website does not publish a detail (for example interest rates, amounts or timelines), this site states that explicitly rather than estimating it. Information may be updated as the institution publishes new guidance.</p>
    <h2>Acceptable use</h2>
    <p>You may link to, quote and reproduce content for non-commercial public information purposes with attribution to MASLOC. You may not present this content as an official MASLOC offer, or use it in a way that misleads the public about MASLOC services.</p>
    <h2>External links</h2>
    <p>Links to third-party sites are provided for convenience. MASLOC is not responsible for external content.</p>
    <h2>Governing principles</h2>
    <p>This website is published by the Microfinance and Small Loans Centre, a Government of Ghana institution. These terms are subject to the laws of Ghana.</p>
    <p class="note-inline">These terms must be reviewed and approved by MASLOC's legal officers before launch (see MISSING-CONTENT.md).</p>
  </div>
</section>`;
  return {
    path: '/terms/',
    title: 'Terms of Use | MASLOC',
    description: 'Terms of use for the official MASLOC website: information status, accuracy, acceptable use, external links and governing principles.',
    bodyClass: 'page-legal',
    body
  };
}

/* ---------------- 404 ---------------- */
function notFound() {
  const body = `
<section class="section error404">
  <div class="container error404-inner">
    <p class="error404-code" aria-hidden="true">404</p>
    <h1>Page Not Found</h1>
    <p>The page you are looking for may have moved or no longer exists. Try one of these instead:</p>
    <ul role="list">
      <li><a href="/">Home</a></li>
      <li><a href="/services/">Loan Services</a></li>
      <li><a href="/eligibility-application/">Eligibility & How to Apply</a></li>
      <li><a href="/regional-offices/">Regional Offices</a></li>
      <li><a href="/search/">Search this site</a></li>
      <li><a href="/contact/">Contact MASLOC</a></li>
    </ul>
  </div>
</section>`;
  return {
    path: '/404.html',
    title: 'Page Not Found | MASLOC',
    description: 'The page you requested could not be found on the MASLOC website.',
    bodyClass: 'page-404',
    robots: 'noindex',
    body
  };
}

/* ---------------- Search ---------------- */
function searchPage(site) {
  const body = `
${pageHero({
  eyebrow: 'Search',
  heading: 'Search This Site',
  lead: 'Find services, programmes, offices and information across the MASLOC website.',
  compact: true
})}
<section class="section">
  <div class="container search-layout">
    <form class="search-form" id="search-form" role="search" action="/search/" method="get">
      <label class="visually-hidden" for="search-input">Search the MASLOC website</label>
      <input id="search-input" name="q" type="search" placeholder="e.g. group loan eligibility, Koforidua office…" autocomplete="off">
      <button class="btn btn-primary" type="submit">Search</button>
    </form>
    <p class="search-status" id="search-status" role="status" aria-live="polite"></p>
    <ul class="search-results" id="search-results" role="list"></ul>
    <noscript>
      <div class="note-box">
        <h2 class="note-box-title">Browse instead</h2>
        <p>Site search needs JavaScript. Browse the main sections: <a href="/services/">Loan Services</a>, <a href="/programmes/">Programmes</a>, <a href="/about/">About MASLOC</a>, <a href="/faq/">FAQ</a>, <a href="/regional-offices/">Regional Offices</a> and <a href="/contact/">Contact</a>.</p>
      </div>
    </noscript>
  </div>
</section>`;
  return {
    path: '/search/',
    title: 'Search | MASLOC',
    description: 'Search the official MASLOC website for services, programmes, offices, news and information.',
    bodyClass: 'page-search',
    robots: 'noindex',
    body
  };
}

module.exports = { about, mandate, leadership, eligibility, faq, gallery, publications, contact, privacy, accessibility, terms, notFound, searchPage, GALLERY };

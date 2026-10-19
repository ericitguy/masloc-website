'use strict';
const { esc, photo, icon, buttonLink, textLink } = require('./html');
const { pageHero, ctaBand } = require('./sections');

const mapsUrl = (o) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `MASLOC ${o.region} Regional Office ${o.address}`
  )}`;

function directory(site, officesData) {
  const { headOffice, offices } = officesData;
  const body = `
${pageHero({
  eyebrow: 'Regional Offices',
  heading: 'MASLOC Is Closer Than You Think',
  lead: 'Regional offices across Ghana deliver MASLOC services, programme information and application guidance — with the Accra Head Office at the centre.',
  image: 'fishing-aerial',
  imageAlt: 'Fishing boats on the Ghanaian coastline at Prampram'
})}

<section class="section">
  <div class="container">
    <article class="hq-card">
      <div class="hq-card-copy">
        <p class="eyebrow eyebrow--gold">Head Office</p>
        <h2>Accra Head Office</h2>
        <address>${esc(headOffice.address)}</address>
        <ul class="contact-list" role="list">
          <li>${icon('phone', { size: 17 })} <a href="tel:${esc(headOffice.phones[0].replace(/\s/g, ''))}">${esc(headOffice.phones[0])}</a></li>
          <li>${icon('phone', { size: 17 })} <a href="tel:${esc(headOffice.phones[1].replace(/\s/g, ''))}">${esc(headOffice.phones[1])}</a></li>
          <li>${icon('mail', { size: 17 })} <a href="mailto:${esc(headOffice.emails[0])}">${esc(headOffice.emails[0])}</a></li>
          <li>${icon('mail', { size: 17 })} <a href="mailto:${esc(headOffice.emails[1])}">${esc(headOffice.emails[1])}</a></li>
        </ul>
        <p class="hq-note">${esc(headOffice.note)}</p>
      </div>
      <div class="hq-card-media">${photo('accra-aerial', 'Aerial view of the Accra coastline', { sizes: '(min-width: 60rem) 40vw, 100vw' })}</div>
    </article>
  </div>
</section>

<section class="section section--sage">
  <div class="container">
    <header class="section-header">
      <p class="eyebrow">Directory</p>
      <h2 class="section-title">Regional Offices</h2>
      <p class="section-lead">Addresses and postal codes exactly as published by MASLOC. Select an office for details.</p>
    </header>
    <div class="office-grid">
      ${offices
        .map(
          (o) => `<article class="office-card">
        <h3><a href="/regional-offices/${o.slug}/">${esc(o.name)}</a></h3>
        <p class="office-region">${esc(o.region)} Region</p>
        <address>${esc(o.address)}</address>
        <p class="office-postal">Postal code: <strong>${esc(o.postalCode)}</strong></p>
        ${textLink('Office details', `/regional-offices/${o.slug}/`)}
      </article>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>

${ctaBand({
  heading: 'Not Sure Which Office to Visit?',
  text: 'Call the Head Office and we will direct you to the right regional team.',
  primary: { label: 'Contact MASLOC', href: '/contact/' },
  secondary: { label: `Call ${site.headOffice.phones[0]}`, href: `tel:${site.headOffice.phones[0].replace(/\s/g, '')}` }
})}`;

  return {
    path: '/regional-offices/',
    title: 'Regional Office Directory | MASLOC Ghana',
    description:
      'Directory of MASLOC regional offices across Ghana — addresses, postal codes and head office contacts for microfinance and small loan enquiries.',
    bodyClass: 'page-offices',
    ogImage: '/assets/img/photos/fishing-aerial-1600.webp',
    body
  };
}

function officePage(site, officesData, office) {
  const others = officesData.offices.filter((o) => o.slug !== office.slug);

  const body = `
${pageHero({
  eyebrow: `${office.region} Region`,
  heading: esc(office.name),
  lead: 'Visit this office for MASLOC services, programme information and application guidance.',
  compact: true
})}

<section class="section">
  <div class="container content-grid">
    <article class="prose">
      <h2>Address</h2>
      <address class="office-address-lg">${esc(office.address)}</address>
      <p class="office-postal">Postal code: <strong>${esc(office.postalCode)}</strong></p>

      <h2>Contact</h2>
      <p>MASLOC does not currently publish direct telephone lines or email addresses for individual regional offices. All regional enquiries are handled through the Accra Head Office:</p>
      <ul class="contact-list contact-list--inline" role="list">
        <li>${icon('phone', { size: 17 })} <a href="tel:${esc(site.headOffice.phones[0].replace(/\s/g, ''))}">${esc(site.headOffice.phones[0])}</a></li>
        <li>${icon('phone', { size: 17 })} <a href="tel:${esc(site.headOffice.phones[1].replace(/\s/g, ''))}">${esc(site.headOffice.phones[1])}</a></li>
        <li>${icon('mail', { size: 17 })} <a href="mailto:${esc(site.headOffice.emails[0])}">${esc(site.headOffice.emails[0])}</a></li>
      </ul>

      <h2>What to expect</h2>
      <p>Staff at this office can confirm the full range of eligibility criteria, application guidance and current programme availability for your area — services including microcredit and group loans, small and project loans, and the vehicle and equipment hire purchase scheme.</p>

      <p><a class="btn btn-primary" href="${esc(mapsUrl(office))}" target="_blank" rel="noopener">${icon('pin', { size: 16 })} Open in Maps</a></p>
    </article>
    <aside class="sidebar">
      <div class="sidebar-card sidebar-card--dark">
        <h2>Head Office</h2>
        <p>${esc(site.headOffice.address)}</p>
        <ul role="list">
          <li>${icon('phone', { size: 16 })} <a href="tel:${esc(site.headOffice.phones[0].replace(/\s/g, ''))}">${esc(site.headOffice.phones[0])}</a></li>
          <li>${icon('mail', { size: 16 })} <a href="mailto:${esc(site.headOffice.emails[0])}">${esc(site.headOffice.emails[0])}</a></li>
        </ul>
        ${buttonLink('All Regional Offices', '/regional-offices/', 'gold')}
      </div>
      <div class="sidebar-card">
        <h2>Other Regions</h2>
        <ul class="sidebar-links sidebar-links--dense" role="list">
          ${others.map((o) => `<li><a href="/regional-offices/${o.slug}/">${esc(o.region)}</a></li>`).join('')}
        </ul>
      </div>
    </aside>
  </div>
</section>`;

  return {
    path: `/regional-offices/${office.slug}/`,
    title: `${office.name} — Address & Contact | MASLOC`,
    description: `${office.name}: ${office.address}. Postal code ${office.postalCode}. MASLOC regional offices across Ghana.`,
    bodyClass: 'page-office-detail',
    body
  };
}

module.exports = { directory, officePage };

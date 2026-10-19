'use strict';
/* MASLOC site behaviour — progressive enhancement only.
   Navigation, reading and contact details all work without JavaScript. */
(function () {
  /* ---------- mobile navigation ---------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('nav-open', !open);
    });
    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        toggle.focus();
      }
    });
  }

  /* ---------- dropdown menus: close others ---------- */
  var drops = Array.prototype.slice.call(document.querySelectorAll('.nav-drop'));
  drops.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        drops.forEach(function (o) {
          if (o !== d) o.open = false;
        });
      }
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item--drop')) {
      drops.forEach(function (o) { o.open = false; });
    }
  });

  /* ---------- header shadow on scroll ---------- */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- client-side search ---------- */
  var form = document.getElementById('search-form');
  var input = document.getElementById('search-input');
  var resultsEl = document.getElementById('search-results');
  var statusEl = document.getElementById('search-status');
  if (form && input && resultsEl) {
    var index = null;
    var loadIndex = function () {
      if (index) return Promise.resolve(index);
      return fetch('/search-index.json')
        .then(function (r) { return r.json(); })
        .then(function (data) { index = data; return index; });
    };

    var score = function (entry, terms) {
      var t = (entry.t || '').toLowerCase();
      var d = (entry.d || '').toLowerCase();
      var b = (entry.b || '').toLowerCase();
      var s = 0;
      terms.forEach(function (term) {
        if (t.indexOf(term) !== -1) s += 8;
        if (d.indexOf(term) !== -1) s += 4;
        if (b.indexOf(term) !== -1) s += 1;
      });
      return s;
    };

    var render = function (q) {
      var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      if (!terms.length) {
        resultsEl.innerHTML = '';
        statusEl.textContent = '';
        return;
      }
      loadIndex().then(function (data) {
        var hits = data
          .map(function (e) { return { e: e, s: score(e, terms) }; })
          .filter(function (h) { return h.s > 0; })
          .sort(function (a, b) { return b.s - a.s; })
          .slice(0, 20);

        if (!hits.length) {
          resultsEl.innerHTML = '';
          statusEl.innerHTML = 'No results for “' + escapeHtml(q) + '”. Try “group loan”, “eligibility” or a region name — or <a href="/contact/">contact MASLOC</a>.';
          return;
        }
        statusEl.textContent = hits.length + (hits.length === 1 ? ' result' : ' results') + ' for “' + q + '”';
        resultsEl.innerHTML = hits
          .map(function (h) {
            return (
              '<li class="search-result">' +
              '<a href="' + h.e.u + '">' +
              '<span class="search-result-title">' + escapeHtml(h.e.t) + '</span>' +
              '<span class="search-result-url">' + escapeHtml(h.e.u) + '</span>' +
              '<span class="search-result-desc">' + escapeHtml(h.e.d) + '</span>' +
              '</a></li>'
            );
          })
          .join('');
      });
    };

    var escapeHtml = function (s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    };

    var timer = null;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { render(input.value.trim()); }, 180);
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      render(input.value.trim());
      var url = new URL(window.location.href);
      url.searchParams.set('q', input.value.trim());
      window.history.replaceState({}, '', url);
    });
    var initial = new URL(window.location.href).searchParams.get('q');
    if (initial) {
      input.value = initial;
      render(initial);
    }
  }

  /* ---------- contact form: validate, then hand off to email client ---------- */
  var cform = document.getElementById('contact-form');
  if (cform) {
    var status = document.getElementById('form-status');
    var showError = function (field, show) {
      var err = document.getElementById(field.id + '-err');
      field.setAttribute('aria-invalid', show ? 'true' : 'false');
      field.classList.toggle('is-invalid', show);
      if (err) err.hidden = !show;
    };
    var validate = function (field) {
      var v = (field.value || '').trim();
      var ok = true;
      if (field.hasAttribute('required') && !v) ok = false;
      if (ok && field.type === 'email' && v) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (ok && field.type === 'tel' && v) ok = /^[+\d][\d\s()-]{6,}$/.test(v);
      showError(field, !ok);
      return ok;
    };

    cform.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = Array.prototype.slice.call(
        cform.querySelectorAll('input[required], select[required], textarea[required], input[type="tel"], input[type="email"]')
      );
      var allOk = true;
      var firstBad = null;
      fields.forEach(function (f) {
        var ok = validate(f);
        if (!ok && !firstBad) firstBad = f;
        allOk = allOk && ok;
      });
      if (!allOk) {
        status.hidden = false;
        status.className = 'form-status form-status--error';
        status.textContent = 'Please correct the highlighted fields.';
        if (firstBad) firstBad.focus();
        return;
      }

      var data = new FormData(cform);
      var subject = 'MASLOC website enquiry — ' + data.get('subject');
      var lines = [
        'Name: ' + data.get('name'),
        'Email: ' + data.get('email'),
        'Phone: ' + (data.get('phone') || '—'),
        'Nearest region: ' + (data.get('region') || '—'),
        '',
        String(data.get('message'))
      ];
      var mailto = 'mailto:info@masloc.gov.gh?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));

      status.hidden = false;
      status.className = 'form-status form-status--ok';
      status.innerHTML =
        'Your email application should open with the message prepared. ' +
        'If nothing opened, <a href="' + mailto + '">click here to open the draft</a>, ' +
        'or email <a href="mailto:info@masloc.gov.gh">info@masloc.gov.gh</a> directly. ' +
        'Nothing was stored on this website.';
      window.location.href = mailto;
    });
  }
})();

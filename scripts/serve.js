'use strict';
/** Tiny static server for dist/ — clean URLs, 404 fallback, gzip/brotli, no dependencies. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const DIST = path.join(__dirname, '..', 'dist');
const PORT = Number(process.env.PORT) || 4321;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.json', '.svg', '.xml', '.txt']);

/** Parse Accept-Encoding into a list of coding tokens (lowercase, no q-values). */
function acceptedEncodings(header) {
  return String(header || '')
    .split(',')
    .map((part) => part.trim().split(';')[0].toLowerCase())
    .filter(Boolean);
}

function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  let full = path.join(DIST, p);
  if (!full.startsWith(DIST)) return null;
  if (fs.existsSync(full) && fs.statSync(full).isDirectory()) {
    full = path.join(full, 'index.html');
  }
  if (!fs.existsSync(full) && !path.extname(full)) {
    const withIndex = path.join(full, 'index.html');
    if (fs.existsSync(withIndex)) full = withIndex;
  }
  return fs.existsSync(full) ? full : null;
}

http
  .createServer((req, res) => {
    const file = resolveFile(req.url || '/');
    if (file) {
      const ext = path.extname(file).toLowerCase();
      const headers = {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      };
      const codings = acceptedEncodings(req.headers['accept-encoding']);
      const compressible = COMPRESSIBLE.has(ext);
      const wantsBr = compressible && codings.includes('br');
      const wantsGzip = compressible && codings.includes('gzip');

      if (wantsBr) {
        headers['Content-Encoding'] = 'br';
        headers['Vary'] = 'Accept-Encoding';
        res.writeHead(200, headers);
        fs.createReadStream(file).pipe(zlib.createBrotliCompress()).pipe(res);
      } else if (wantsGzip) {
        headers['Content-Encoding'] = 'gzip';
        headers['Vary'] = 'Accept-Encoding';
        res.writeHead(200, headers);
        fs.createReadStream(file).pipe(zlib.createGzip({ level: 6 })).pipe(res);
      } else {
        res.writeHead(200, headers);
        fs.createReadStream(file).pipe(res);
      }
    } else {
      const nf = path.join(DIST, '404.html');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      fs.createReadStream(nf).pipe(res);
    }
  })
  .listen(PORT, '127.0.0.1', () => {
    console.log(`MASLOC site served at http://127.0.0.1:${PORT}/`);
  });

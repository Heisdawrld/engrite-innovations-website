const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = '/home/z/my-project/engrite-innovations-website/out';
const PORT = 9123;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.yml': 'text/yaml',
  '.md': 'text/markdown',
};
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  let fp = path.join(ROOT, p);
  if (!fs.existsSync(fp)) {
    const alt = fp + '.html';
    if (fs.existsSync(alt)) { stream(alt); return; }
    res.writeHead(404); res.end('not found'); return;
  }
  if (fs.statSync(fp).isDirectory()) {
    fp = path.join(fp, 'index.html');
    if (!fs.existsSync(fp)) { res.writeHead(404); res.end('not found'); return; }
  }
  stream(fp);
  function stream(f) {
    const ext = path.extname(f).toLowerCase();
    res.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  }
}).listen(PORT, '0.0.0.0', () => console.log('listening on ' + PORT));

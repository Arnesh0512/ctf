const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.m3u8': 'application/vnd.apple.mpegurl',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);

  // Stream & HLS proxy endpoint
  if (parsedUrl.pathname === '/stream-proxy' || parsedUrl.pathname === '/hls-proxy') {
    const target = parsedUrl.searchParams.get('url');
    if (!target) {
      res.writeHead(400);
      return res.end('Missing url param');
    }
    const client = target.startsWith('https') ? https : http;
    const proxyReq = client.get(target, { headers: { 'User-Agent': 'Mozilla/5.0 DelhiRadio/1.0' } }, (proxyRes) => {
      const contentType = proxyRes.headers['content-type'] || '';
      if (target.includes('.m3u8') || contentType.includes('mpegurl')) {
        let raw = '';
        proxyRes.setEncoding('utf-8');
        proxyRes.on('data', chunk => { raw += chunk; });
        proxyRes.on('end', () => {
          const lines = raw.split(/\r?\n/).map(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
              const absUrl = new URL(trimmed, target).href;
              return `/hls-proxy?url=${encodeURIComponent(absUrl)}`;
            }
            return line;
          });
          const body = lines.join('\n');
          res.writeHead(200, {
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Content-Length': Buffer.byteLength(body),
            'Access-Control-Allow-Origin': '*'
          });
          res.end(body);
        });
        return;
      }
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });
    proxyReq.on('error', () => {
      res.writeHead(502);
      res.end();
    });
    return;
  }

  let filePath = path.join(PUBLIC_DIR, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`📻 DELHI FM RADIO SERVER LISTENING ON http://localhost:${PORT}`);
});

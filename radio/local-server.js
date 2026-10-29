const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const carriers = require('./api/_carriers.js');

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

  // Local equivalent of the Vercel /api/tune function.
  if (parsedUrl.pathname === '/api/tune' || parsedUrl.pathname === '/tune') {
    const respond = (frequency) => {
      const f = Number.parseFloat(frequency);
      const matched = Number.isFinite(f)
        ? carriers.find(carrier => {
            const tol = typeof carrier.tolerance === 'number' ? carrier.tolerance : 0.05;
            return Math.abs(carrier.freq - f) <= (tol + 0.001);
          })
        : null;
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify(matched
        ? { match: true, audio: matched.audio, repeatDelay: matched.repeatDelay, carrierFreq: matched.freq }
        : { match: false }));
    };

    if (req.method === 'GET' && (parsedUrl.searchParams.get('warmup') || parsedUrl.searchParams.get('ping'))) {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      return res.end(JSON.stringify({ warm: true }));
    }

    if (req.method === 'GET') {
      return respond(parsedUrl.searchParams.get('freq') || parsedUrl.searchParams.get('frequency'));
    }
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
        if (body.length > 1e6) req.destroy();
      });
      req.on('end', () => {
        try {
          const data = JSON.parse(body || '{}');
          respond(data.freq ?? data.frequency);
        } catch {
          respond(null);
        }
      });
      return;
    }
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  // Stream & HLS proxy endpoint
  if (parsedUrl.pathname === '/stream-proxy' || parsedUrl.pathname === '/hls-proxy') {
    const target = parsedUrl.searchParams.get('url');
    if (!target) {
      res.writeHead(400);
      return res.end('Missing url param');
    }
    const client = target.startsWith('https') ? https : http;
    const proxyReq = client.get(target, { headers: { 'User-Agent': 'Mozilla/5.0 HighAltitudeRadio/1.0' } }, (proxyRes) => {
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
  console.log(`📻 HIGH ALTITUDE RADIO SERVER LISTENING ON http://localhost:${PORT}`);
});

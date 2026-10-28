const http = require('http');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3001;

let carrierCache = [];
try {
  carrierCache = require('./carriers-data.js');
} catch (e) {
  const fs = require('fs');
  const CARRIERS = [
    { freq: 88.0, tolerance: 0.22, repeatDelay: 1000, mimeType: 'audio/mpeg', file: path.join(__dirname, 'audio', 'pbhg9fdt6sxgv2.mp3') },
    { freq: 96.2, tolerance: 0.22, repeatDelay: 5000, mimeType: 'audio/wav', file: path.join(__dirname, 'audio', 'morse.wav') },
    { freq: 108.0, tolerance: 0.22, repeatDelay: 1000, mimeType: 'audio/mpeg', file: path.join(__dirname, 'audio', 'q2wcvnaf6yju9t.mp3') }
  ];
  carrierCache = CARRIERS.map(item => {
    try {
      const fileBuffer = fs.readFileSync(item.file);
      return {
        freq: item.freq,
        tolerance: item.tolerance,
        repeatDelay: item.repeatDelay,
        audio: `data:${item.mimeType};base64,${fileBuffer.toString('base64')}`
      };
    } catch (err) {
      return null;
    }
  }).filter(Boolean);
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
}

function handleTuneRequest(reqFreq, res) {
  const f = parseFloat(reqFreq);
  if (isNaN(f)) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ match: false }));
  }

  const matched = carrierCache.find(c => Math.abs(c.freq - f) <= c.tolerance);

  if (matched) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      match: true,
      audio: matched.audio,
      repeatDelay: matched.repeatDelay
    }));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify({ match: false }));
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/api/tune' || pathname === '/tune') {
    if (req.method === 'GET') {
      const qFreq = parsedUrl.query.freq || parsedUrl.query.frequency;
      return handleTuneRequest(qFreq, res);
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
        if (body.length > 1e6) req.destroy();
      });
      req.on('end', () => {
        let reqFreq = null;
        try {
          const parsedBody = JSON.parse(body);
          reqFreq = parsedBody.freq !== undefined ? parsedBody.freq : parsedBody.frequency;
        } catch (e) {
          reqFreq = null;
        }
        return handleTuneRequest(reqFreq, res);
      });
      return;
    }
  }

  if (pathname === '/health' || pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok', service: 'radio-backend' }));
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(` RADIO BACKEND RUNNING ON http://localhost:${PORT}`);
    console.log(` Single API Endpoint: http://localhost:${PORT}/api/tune`);
    console.log(` Carriers loaded: ${carrierCache.length}`);
    console.log(`====================================================`);
  });
}

module.exports = server;

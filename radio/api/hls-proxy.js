const https = require('https');
const http = require('http');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') {
      return res.status(200).end();
    }
    res.writeHead(200);
    return res.end();
  }

  let targetUrl = '';
  if (req.query && req.query.url) {
    targetUrl = req.query.url;
  } else if (req.url) {
    try {
      const parsed = new URL(req.url, 'http://localhost');
      targetUrl = parsed.searchParams.get('url') || '';
    } catch (e) {
      targetUrl = '';
    }
  }

  if (!targetUrl) {
    if (typeof res.status === 'function') {
      return res.status(400).send('Missing url parameter');
    }
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Missing url parameter');
  }

  const client = targetUrl.startsWith('https') ? https : http;

  client.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0 DelhiRadio/1.0' } }, (remoteRes) => {
    const contentType = remoteRes.headers['content-type'] || '';

    // Handle M3U8 Manifest Rewrites
    if (targetUrl.includes('.m3u8') || contentType.includes('mpegurl')) {
      let data = '';
      remoteRes.setEncoding('utf-8');
      remoteRes.on('data', chunk => { data += chunk; });
      remoteRes.on('end', () => {
        const lines = data.split(/\r?\n/).map(line => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#')) {
            const abs = new URL(trimmed, targetUrl).href;
            return `/hls-proxy?url=${encodeURIComponent(abs)}`;
          }
          return line;
        });
        const body = lines.join('\n');
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.setHeader('Cache-Control', 'no-cache');
        if (typeof res.status === 'function') {
          return res.status(200).send(body);
        }
        res.writeHead(200, {
          'Content-Type': 'application/vnd.apple.mpegurl',
          'Content-Length': Buffer.byteLength(body)
        });
        return res.end(body);
      });
      return;
    }

    // Binary audio chunks streaming
    res.writeHead(remoteRes.statusCode || 200, remoteRes.headers);
    remoteRes.pipe(res);
  }).on('error', (err) => {
    if (typeof res.status === 'function') {
      return res.status(502).send(err.message);
    }
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    return res.end(err.message);
  });
};

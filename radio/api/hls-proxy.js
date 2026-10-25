const https = require('https');
const http = require('http');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Missing url parameter');
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
        return res.status(200).send(body);
      });
      return;
    }

    // Binary audio chunks streaming
    res.writeHead(remoteRes.statusCode, remoteRes.headers);
    remoteRes.pipe(res);
  }).on('error', (err) => {
    return res.status(502).send(err.message);
  });
};

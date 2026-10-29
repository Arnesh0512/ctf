const carriers = require('./_carriers.js');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Instant response for background pre-warmup ping
  if (req.method === 'GET' && (req.query?.warmup || req.query?.ping)) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ warm: true });
  }

  // Edge and browser cache header: speeds up repeat queries to ~5-15ms
  res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=86400, stale-while-revalidate=86400');

  let reqFreq = null;
  if (req.method === 'GET') {
    reqFreq = req.query ? (req.query.freq || req.query.frequency) : null;
  } else {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }
    reqFreq = body ? (body.freq !== undefined ? body.freq : body.frequency) : null;
  }

  const f = parseFloat(reqFreq);
  if (isNaN(f)) {
    return res.status(200).json({ match: false });
  }

  const matched = carriers.find(c => {
    const tol = typeof c.tolerance === 'number' ? c.tolerance : 0.05;
    return Math.abs(c.freq - f) <= (tol + 0.001);
  });
  if (matched) {
    return res.status(200).json({
      match: true,
      audio: matched.audio,
      repeatDelay: matched.repeatDelay,
      carrierFreq: matched.freq
    });
  }

  return res.status(200).json({ match: false });
};

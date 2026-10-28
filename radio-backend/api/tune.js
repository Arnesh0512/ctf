const carriers = require('../carriers-data.js');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

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

  const matched = carriers.find(c => Math.abs(c.freq - f) <= c.tolerance);
  if (matched) {
    return res.status(200).json({
      match: true,
      audio: matched.audio,
      repeatDelay: matched.repeatDelay
    });
  }

  return res.status(200).json({ match: false });
};

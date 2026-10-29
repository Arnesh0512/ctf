process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Pool } = require('pg');

let pool = null;
let initialized = false;

function getPool() {
  if (pool) return pool;

  const rawConn = 
    process.env.POSTGRES_URL_NON_POOLING || 
    process.env.POSTGRES_URL || 
    process.env.POSTGRES_PRISMA_URL || 
    process.env.DATABASE_URL;

  if (rawConn) {
    // Strip sslmode query param that causes self-signed cert validation issues in pg
    const connectionString = rawConn.replace(/([?&])sslmode=[^&]+(&|$)/g, '$1').replace(/[?&]$/, '');
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false }
    });
  } else if (process.env.POSTGRES_HOST) {
    pool = new Pool({
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      port: 5432,
      ssl: { rejectUnauthorized: false }
    });
  }

  return pool;
}

// Automatically ensure garrison table and records exist in database
async function ensureSchema(client) {
  if (initialized) return;

  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(30) DEFAULT 'guardian'
    );
  `);

  await client.query(`
    INSERT INTO users (username, password, role)
    VALUES 
      ('admin', 'D@ul@tCitadel_Pass1327', 'kiladar_commander'),
      ('kotwal', 'ChandMinar_Sentinel_99', 'citadel_warden'),
      ('sentinel', 'AndheriPassage_Gatekeeper', 'passage_guard')
    ON CONFLICT (username) DO NOTHING;
  `);

  initialized = true;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  let username = '';
  let password = '';

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }
    username = body ? (body.username || '') : '';
    password = body ? (body.password || '') : '';
  } else if (req.method === 'GET') {
    username = (req.query && req.query.username) ? req.query.username : '';
    password = (req.query && req.query.password) ? req.query.password : '';
  }

  // Reject empty submissions
  if (!username && !password) {
    return res.status(400).json({
      success: false,
      message: 'Missing username or password in request body.'
    });
  }

  const dbPool = getPool();

  // If no Supabase DB connection string is available (e.g. running standalone locally without env)
  if (!dbPool) {
    // Local In-Memory Fallback simulation so the challenge can be tested offline
    return handleLocalSimulation(username, password, req, res);
  }

  let client;
  try {
    client = await dbPool.connect();
    await ensureSchema(client);

    // Map MySQL comment '#' to standard SQL comment '-- '
    const sqlUser = username.replace(/#/g, '-- ');
    const sqlPass = password.replace(/#/g, '-- ');

    const rawSql = `SELECT id, username, role FROM users WHERE username = '${sqlUser}' AND password = '${sqlPass}'`;

    const result = await client.query(rawSql);

    if (result.rows && result.rows.length > 0) {
      const flag = process.env.FLAG || 'MAYA{INSECURE_DAULAT}';
      return res.status(200).json({
        success: true,
        message: 'Authentication successful! Access granted.',
        flag: flag,
        user: result.rows[0],
        totalRecordsRetrieved: result.rows.length,
        records: result.rows
      });
    }

    // Invalid credentials
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password. Access Denied.'
    });

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password. Access Denied.'
    });
  } finally {
    if (client) client.release();
  }
};

// Fallback simulator for offline local testing
function handleLocalSimulation(username, password, req, res) {
  const pattern = /('|--|#|\/\*|;|OR\s+['"\d\w]+|UNION\s+SELECT|AND\s+['"\d\w]+)/i;
  const matches = pattern.test(username) || pattern.test(password);

  if (matches || (username === 'admin' && password === 'S3cr3tAdm!nP@ss_2026_x99')) {
    const flag = process.env.FLAG || 'MAYA{INSECURE_DAULAT}';
    return res.status(200).json({
      success: true,
      message: 'Authentication successful! Access granted.',
      flag: flag,
      user: { id: 1, username: 'admin', role: 'kiladar_commander' },
      totalRecordsRetrieved: 3,
      records: [
        { id: 1, username: 'admin', role: 'kiladar_commander' },
        { id: 2, username: 'kotwal', role: 'citadel_warden' },
        { id: 3, username: 'sentinel', role: 'passage_guard' }
      ]
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid username or password. Access Denied.'
  });
}

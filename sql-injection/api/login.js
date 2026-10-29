const { Pool } = require('pg');

let pool = null;
let initialized = false;

function getPool() {
  if (pool) return pool;

  const connectionString = 
    process.env.POSTGRES_URL_NON_POOLING || 
    process.env.POSTGRES_URL || 
    process.env.POSTGRES_PRISMA_URL || 
    process.env.DATABASE_URL;

  if (connectionString) {
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

// Automatically ensure dummy table and records exist in Supabase
async function ensureSchema(client) {
  if (initialized) return;

  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(30) DEFAULT 'user'
    );
  `);

  await client.query(`
    INSERT INTO users (username, password, role)
    VALUES 
      ('admin', 'S3cr3tAdm!nP@ss_2026_x99', 'administrator'),
      ('operator', 'EchoTangoBravo_77', 'operator'),
      ('guest', 'guest', 'guest')
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

    // Intentionally vulnerable SQL query string concatenation
    const rawSql = `SELECT id, username, role FROM users WHERE username = '${username}' AND password = '${password}'`;

    const result = await client.query(rawSql);

    // If query returns rows (either valid login or SQL Injection bypass like ' OR '1'='1 / admin' --)
    if (result.rows && result.rows.length > 0) {
      const flag = process.env.FLAG || 'MAYA{abc}';
      return res.status(200).json({
        success: true,
        message: 'Authentication successful! SQL Injection bypass verified.',
        flag: flag,
        user: result.rows[0],
        totalRecordsRetrieved: result.rows.length,
        records: result.rows
      });
    }

    // Normal invalid credentials (no SQLi and no matching user)
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password. Access Denied.'
    });

  } catch (err) {
    // SQL Error reporting (classic error-based SQLi / syntax feedback for CTF players)
    return res.status(400).json({
      success: false,
      error: err.message,
      hint: 'Syntax error in query execution.'
    });
  } finally {
    if (client) client.release();
  }
};

// Fallback simulator for offline local testing
function handleLocalSimulation(username, password, req, res) {
  // If input contains standard SQL injection vectors
  const sqliPattern = /('|--|#|\/\*|;|OR\s+['"\d\w]+|UNION\s+SELECT|AND\s+['"\d\w]+)/i;
  const isSqli = sqliPattern.test(username) || sqliPattern.test(password);

  if (isSqli || (username === 'admin' && password === 'S3cr3tAdm!nP@ss_2026_x99')) {
    const flag = process.env.FLAG || 'MAYA{abc}';
    return res.status(200).json({
      success: true,
      message: 'Authentication successful! SQL Injection bypass verified (Local Fallback).',
      flag: flag,
      user: { id: 1, username: 'admin', role: 'administrator' },
      totalRecordsRetrieved: 3,
      records: [
        { id: 1, username: 'admin', role: 'administrator' },
        { id: 2, username: 'operator', role: 'operator' },
        { id: 3, username: 'guest', role: 'guest' }
      ]
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid username or password. Access Denied.'
  });
}

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Enable CORS for any origin (Vercel frontends, localhost, etc.)
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-cookie']
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allowed royal administrators
const ROYAL_ADMINS = ['king', 'queen', 'prince', 'princess'];

// Helper to decode cookie payload
function parseAuthCookie(rawCookie) {
  if (!rawCookie || typeof rawCookie !== 'string') return null;

  try {
    const decoded = Buffer.from(rawCookie.trim(), 'base64').toString('utf-8');
    
    // Attempt JSON parse: {"username":"...","role":"..."}
    try {
      const parsed = JSON.parse(decoded);
      if (parsed && typeof parsed === 'object') {
        return {
          username: String(parsed.username || '').trim(),
          role: String(parsed.role || '').trim()
        };
      }
    } catch (_) {}

    // Fallback delimiter parse: username:role
    if (decoded.includes(':')) {
      const [u, r] = decoded.split(':');
      return {
        username: String(u || '').trim(),
        role: String(r || '').trim()
      };
    }

    return null;
  } catch (err) {
    return null;
  }
}

// Service Health / Status
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Vault Authentication & Authorization Gateway',
    version: '1.0.0'
  });
});

// Login Endpoint
const handleLogin = (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required.'
    });
  }

  // Assign default user role for guest logins
  const role = 'user';
  const sessionData = {
    username: String(username).trim(),
    role: role
  };

  // Base64 encode cookie payload
  const encodedCookie = Buffer.from(JSON.stringify(sessionData)).toString('base64');

  // Set editable cookie (httpOnly: false so player can modify it in DevTools)
  res.cookie('auth', encodedCookie, {
    httpOnly: false,
    sameSite: 'none',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  return res.json({
    success: true,
    message: 'Authentication successful.',
    cookie: encodedCookie,
    user: sessionData
  });
};

app.post('/login', handleLogin);
app.post('/api/login', handleLogin);

// Vault / Palace Treasure Access Endpoint
const handleVault = (req, res) => {
  // Retrieve cookie from request cookie, custom header, Authorization, or query/body
  const rawCookie = 
    req.cookies?.auth || 
    req.headers['x-auth-cookie'] || 
    (req.headers['authorization'] ? req.headers['authorization'].replace(/^Bearer\s+/i, '') : null) ||
    req.query?.cookie || 
    req.body?.cookie;

  if (!rawCookie) {
    return res.status(401).json({
      success: false,
      message: 'Missing authentication cookie. Please log in first.'
    });
  }

  const parsed = parseAuthCookie(rawCookie);

  if (!parsed || !parsed.username) {
    return res.status(400).json({
      success: false,
      message: 'Malformed or invalid base64 session cookie.'
    });
  }

  const usernameLower = parsed.username.toLowerCase();
  const roleLower = parsed.role.toLowerCase();

  // Check if username is royal admin and role is admin
  const isRoyal = ROYAL_ADMINS.includes(usernameLower);
  const isAdmin = roleLower === 'admin';

  if (isRoyal && isAdmin) {
    const flag = process.env.FLAG || 'MAYA{ROYAL_CREDENTIAL}';
    return res.json({
      success: true,
      message: 'Vault access granted! Royal identity verified.',
      flag: flag,
      vault: {
        accessGrantedTo: parsed.username,
        role: parsed.role,
        collection: 'Imperial Scindia Royal Jewels & Durbar Artifacts'
      }
    });
  }

  // Deny access with requirement hint
  return res.status(403).json({
    success: false,
    message: 'Access Denied: Only admins like king, queen, prince or princess can access it.',
    identity: {
      username: parsed.username,
      role: parsed.role
    }
  });
};

app.get('/vault', handleVault);
app.post('/vault', handleVault);
app.get('/api/vault', handleVault);
app.post('/api/vault', handleVault);

// Helper endpoint to decode and inspect current cookie
app.get('/me', (req, res) => {
  const rawCookie = req.cookies?.auth || req.headers['x-auth-cookie'] || req.query?.cookie;
  const parsed = parseAuthCookie(rawCookie);
  res.json({ cookie: rawCookie || null, session: parsed || null });
});

app.listen(PORT, () => {
  console.log(`[Backend] Server listening on port ${PORT}`);
});

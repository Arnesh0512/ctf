// Authentication utilities for Frontend-only cookie architecture

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ctf-backend-d3un.onrender.com';

// Extract 'auth' cookie directly from document.cookie
export function getAuthCookie() {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/(?:^|;\s*)auth=([^;]*)/);
  if (match) {
    try {
      return decodeURIComponent(match[1]);
    } catch {
      return match[1];
    }
  }
  return localStorage.getItem('auth_cookie') || '';
}

// Set cookie on jai-vilas.vercel.app
export function setAuthCookie(value) {
  if (typeof document !== 'undefined') {
    document.cookie = `auth=${value}; path=/; max-age=86400; SameSite=Lax`;
  }
  localStorage.setItem('auth_cookie', value);
}

// Decode Base64 session string
export function decodeCookieSafe(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const clean = raw.trim().replace(/^"+|"+$/g, '');
  try {
    const text = atob(clean);
    try {
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed === 'object') {
        return {
          username: String(parsed.username || '').trim(),
          role: String(parsed.role || '').trim()
        };
      }
    } catch (_) {
      if (text.includes(':')) {
        const [u, r] = text.split(':');
        return { username: u.trim(), role: r.trim() };
      }
      return { raw: text };
    }
  } catch (_) {
    return null;
  }
  return null;
}

// Get active user object
export function getUserSession() {
  const cookie = getAuthCookie();
  if (cookie) {
    const decoded = decodeCookieSafe(cookie);
    if (decoded?.username) {
      return decoded;
    }
  }
  try {
    const saved = localStorage.getItem('royal_user');
    if (saved) return JSON.parse(saved);
  } catch (_) {}
  return null;
}

// Clear all session data on logout
export function clearAuth() {
  if (typeof document !== 'undefined') {
    document.cookie = 'auth=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    document.cookie = `auth=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${window.location.hostname};`;
  }
  localStorage.removeItem('auth_cookie');
  localStorage.removeItem('royal_user');
  sessionStorage.removeItem('royal_user');
}

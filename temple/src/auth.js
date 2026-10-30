export const BACKEND_URL = 
  import.meta.env.VITE_BACKEND_URL || 
  (window.location.hostname === 'localhost' ? 'http://localhost:10000' : 'https://ctf-backend-d3un.onrender.com');

export const TOKEN_KEY = 'jwt';

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || '';
  } catch (_) {
    return '';
  }
}

export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (_) {}
}

export function clearAuth() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (_) {}
}

export function parseJwtSafe(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    let b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    return JSON.parse(atob(b64));
  } catch (_) {
    return null;
  }
}

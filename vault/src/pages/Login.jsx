import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Key, AlertCircle, Eye, EyeOff, Crown } from 'lucide-react';
import { setAuthSession, decodeSessionSafe, BACKEND_URL } from '../auth';

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('guest');
  const [password, setPassword] = useState('visitorPass');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch(`${BACKEND_URL}/villa/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setAuthSession(data.cookie);
        const activeUser = data.user || decodeSessionSafe(data.cookie) || { username: 'guest', role: 'user' };
        localStorage.setItem('royal_user', JSON.stringify(activeUser));
        if (onLoginSuccess) {
          onLoginSuccess(activeUser);
        }
        navigate('/home');
      } else {
        setLoginError(data.message || 'Login failed. Please verify credentials.');
      }
    } catch (err) {
      setLoginError('Unable to connect to the Royal Authentication Gateway. Check network or try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col justify-between selection:bg-amber-200 selection:text-amber-900 relative">
      {/* Decorative ambient background warm lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-yellow-100/60 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl"></div>
      </div>

      {/* Top brand header */}
      <header className="relative z-10 border-b border-amber-200/80 bg-white/80 backdrop-blur-md px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5 shadow-md shadow-amber-600/20">
              <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center">
                <Crown className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <h1 className="text-lg font-cinzel font-bold text-stone-900 tracking-wider">JAI VILAS PALACE</h1>
          </div>
        </div>
      </header>

      {/* Login form container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Palace Crest Box */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 border border-amber-300 text-amber-700 mb-4 shadow-md shadow-amber-900/5">
              <Lock className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900 tracking-wide">
              Royal Palace Portal
            </h2>
          </div>

          {/* Login Card */}
          <div className="bg-white border border-amber-200 rounded-2xl p-6 sm:p-8 shadow-xl relative backdrop-blur-sm">
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[3px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

            {loginError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                    className="w-full bg-stone-50 border border-stone-300 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm font-sans transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="w-full bg-stone-50 border border-stone-300 focus:border-amber-500 focus:bg-white rounded-xl pl-4 pr-12 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm font-sans transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 p-1.5 text-stone-400 hover:text-amber-700 transition-colors focus:outline-none cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-cinzel font-bold text-sm tracking-widest py-3.5 px-6 rounded-xl transition-all duration-300 transform active:scale-[0.99] shadow-md shadow-amber-600/30 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {loginLoading ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>ENTERING JAI VILAS...</span>
                  </span>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    <span>ENTER ROYAL PALACE</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-amber-200/60 py-4 px-6 text-center text-xs text-stone-500">
        Madhya Pradesh Tourism Heritage Archive &bull; Jai Vilas Palace, Lashkar, Gwalior
      </footer>
    </div>
  );
}

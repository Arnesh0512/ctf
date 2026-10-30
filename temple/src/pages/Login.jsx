import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Lock, User, Eye, EyeOff, Sparkles, Compass } from 'lucide-react';
import { BACKEND_URL, getToken, setToken, setUser } from '../auth';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('pilgrim');
  const [password, setPassword] = useState('chariotPass');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already logged in, redirect to /flag immediately (persistent memory)
  useEffect(() => {
    if (getToken()) {
      navigate('/flag', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${BACKEND_URL}/temple/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.success && data.token) {
        setToken(data.token);
        setUser(data.user || { username, role: 'pilgrim' });
        navigate('/flag');
      } else {
        setError(data.message || 'Temple gate authentication failed.');
      }
    } catch (err) {
      setError(`Unable to connect to gateway at ${BACKEND_URL}. Ensure backend is running.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f6f3] text-stone-900 flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-950 relative overflow-hidden">
      {/* Decorative ambient emerald lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-36 -left-36 w-96 h-96 bg-emerald-200/50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-36 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-36 left-1/3 w-96 h-96 bg-green-200/40 rounded-full blur-3xl"></div>
      </div>

      {/* Top Header */}
      <header className="relative z-10 border-b border-emerald-200/80 bg-white/80 backdrop-blur-md px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-0.5 shadow-md shadow-emerald-700/20">
              <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center">
                <Sun className="w-5 h-5 text-emerald-700 animate-spin-slow" />
              </div>
            </div>
            <h1 className="text-lg font-cinzel font-bold text-emerald-950 tracking-wider">
              KONARK SUN TEMPLE
            </h1>
          </div>
        </div>
      </header>

      {/* Main Portal Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Temple Crest & Lore Box */}
          <div className="text-center mb-6 space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-lg shadow-emerald-800/25 mb-1">
              <Compass className="w-8 h-8 text-emerald-100" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-black text-emerald-950 tracking-wide">
              The Sun Chariot Portal
            </h2>
            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              13th-century monumental stone chariot built by King Narasimhadeva I, dedicated to Surya the Sun God.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/95 backdrop-blur-md border border-emerald-200/90 rounded-3xl p-7 sm:p-8 shadow-xl shadow-emerald-950/5">
            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1.5">
                  Pilgrim Identity
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-emerald-200 rounded-xl text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                    placeholder="Enter pilgrim username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1.5">
                  Chariot Secret Pass
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-emerald-200 rounded-xl text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all font-mono"
                    placeholder="Enter secret pass"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-emerald-700"
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-cinzel font-bold text-sm tracking-wider py-3 rounded-xl shadow-md shadow-emerald-700/25 transition-all transform active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{loading ? 'Consulting Priests...' : 'Enter Sacred Grounds'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-emerald-100 py-3 text-center text-xs text-stone-500">
        Konark Sun Temple &bull; Dedicated to Surya &bull; Odisha Eastern Coast
      </footer>
    </div>
  );
}

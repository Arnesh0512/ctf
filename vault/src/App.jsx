import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Unlock, 
  Key, 
  Crown, 
  Sparkles, 
  Building2, 
  Train, 
  Coins, 
  LogOut, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Eye, 
  EyeOff,
  Code2, 
  HelpCircle,
  Gem,
  Compass
} from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ctf-backend-d3un.onrender.com';

export default function App() {
  // Login form state (prefilled as requested)
  const [username, setUsername] = useState('guest');
  const [password, setPassword] = useState('visitorPass');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active session identity (from backend)
  const [user, setUser] = useState({ username: 'guest', role: 'user' });

  // Vault unsealing state
  const [vaultLoading, setVaultLoading] = useState(false);
  const [vaultResult, setVaultResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // DevTools helper drawer toggle
  const [showInspector, setShowInspector] = useState(false);

  // Proactively clear any old/legacy frontend document.cookie on load
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.cookie = 'auth=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
      document.cookie = `auth=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${window.location.hostname};`;
      localStorage.removeItem('auth_cookie');
    }
    const saved = sessionStorage.getItem('royal_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        setIsLoggedIn(true);
      } catch (_) {}
    }
  }, []);

  // Login handler: credentials: 'include' receives Set-Cookie exclusively for ctf-backend-d3un.onrender.com
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Backend stores the cookie under ctf-backend-d3un.onrender.com via Set-Cookie!
        // No document.cookie written in frontend.
        const activeUser = data.user || { username: 'guest', role: 'user' };
        setUser(activeUser);
        setIsLoggedIn(true);
        sessionStorage.setItem('royal_user', JSON.stringify(activeUser));
        setVaultResult(null);
      } else {
        setLoginError(data.message || 'Login failed. Please verify credentials.');
      }
    } catch (err) {
      setLoginError('Unable to connect to the Royal Authentication Gateway. Check network or try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('royal_user');
    setUser({ username: 'guest', role: 'user' });
    setIsLoggedIn(false);
    setVaultResult(null);
  };

  // Vault unseal handler: credentials: 'include' automatically sends the cookie from ctf-backend-d3un.onrender.com
  const handleUnsealVault = async () => {
    setVaultLoading(true);
    setVaultResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/vault`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setVaultResult({
          success: true,
          flag: data.flag,
          message: data.message,
          vault: data.vault
        });
        if (data.vault?.accessGrantedTo) {
          const updated = { username: data.vault.accessGrantedTo, role: data.vault.role || 'admin' };
          setUser(updated);
          sessionStorage.setItem('royal_user', JSON.stringify(updated));
        }
      } else {
        setVaultResult({
          success: false,
          status: res.status,
          message: data.message || 'Access Denied.',
          identity: data.identity
        });
        if (data.identity?.username) {
          setUser(data.identity);
          sessionStorage.setItem('royal_user', JSON.stringify(data.identity));
        }
      }
    } catch (err) {
      setVaultResult({
        success: false,
        message: 'Network error connecting to the Royal Vault backend.'
      });
    } finally {
      setVaultLoading(false);
    }
  };

  const handleCopyFlag = (flagText) => {
    navigator.clipboard.writeText(flagText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
        {/* Decorative ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -right-40 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-red-900/10 rounded-full blur-3xl"></div>
        </div>

        {/* Top brand header */}
        <header className="relative z-10 border-b border-amber-900/30 bg-slate-950/80 backdrop-blur-md px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 p-0.5 shadow-lg shadow-amber-900/20">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-cinzel font-bold text-amber-200 tracking-wider">JAI VILAS PALACE</h1>
                <p className="text-xs text-amber-500/80 font-sans tracking-wide">GWALIOR &bull; MADHYA PRADESH TOURISM</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400 border border-slate-800 rounded-full px-3 py-1 bg-slate-900/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Imperial Archive Gateway Online</span>
            </div>
          </div>
        </header>

        {/* Login form container */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            {/* Palace Crest Box */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4 shadow-xl shadow-amber-500/5">
                <Lock className="w-8 h-8 text-amber-400 animate-pulse" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-100 tracking-wide">
                Royal Palace Portal
              </h2>
            </div>

            {/* Login Card */}
            <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

              {loginError && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-sm flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-300/90 font-medium mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      required
                      className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-amber-400 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400/20 text-sm font-sans transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-300/90 font-medium mb-2">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                      className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-amber-400 rounded-xl pl-4 pr-12 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400/20 text-sm font-sans transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 p-1.5 text-slate-400 hover:text-amber-400 transition-colors focus:outline-none cursor-pointer"
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
                  className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 text-slate-950 font-cinzel font-bold text-sm tracking-widest py-3.5 px-6 rounded-xl transition-all duration-300 transform active:scale-[0.99] shadow-lg shadow-amber-600/25 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  {loginLoading ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
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
        <footer className="relative z-10 border-t border-slate-900 py-4 px-6 text-center text-xs text-slate-500">
          Madhya Pradesh Tourism Heritage Archive &bull; Jai Vilas Palace, Lashkar, Gwalior
        </footer>
      </div>
    );
  }

  // ----------------------------------------------------
  // LOGGED-IN VIEW: JAI VILAS PALACE & ROYAL VAULT
  // ----------------------------------------------------
  const roleDisplay = user?.role || 'user';
  const usernameDisplay = user?.username || 'guest';
  const isCurrentlyAdmin = roleDisplay.toLowerCase() === 'admin' && ['king', 'queen', 'prince', 'princess'].includes(usernameDisplay.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-red-950/15 rounded-full blur-[130px]"></div>
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-amber-900/30 bg-slate-950/90 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 p-0.5 shadow-lg shadow-amber-900/30">
              <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center">
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-cinzel font-bold text-amber-200 tracking-wider">JAI VILAS PALACE</h1>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded-full border border-amber-500/30">
                  GWALIOR
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans hidden sm:block">
                H.H. Maharaja Sir Jiwaji Rao Scindia Museum &bull; Madhya Pradesh
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Identity Badge */}
            <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-800 rounded-full pl-3 pr-4 py-1.5 text-xs shadow-inner">
              <div className={`w-2 h-2 rounded-full ${isCurrentlyAdmin ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' : 'bg-blue-400'}`}></div>
              <span className="text-slate-400">User:</span>
              <span className="font-mono font-bold text-amber-300">{usernameDisplay}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Role:</span>
              <span className={`font-mono font-semibold ${isCurrentlyAdmin ? 'text-emerald-400' : 'text-slate-300'}`}>{roleDisplay}</span>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-900/50 bg-slate-900/60 hover:bg-red-950/30 px-3 py-1.5 rounded-full transition-all cursor-pointer"
              title="End Palace Visit"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-12">
        {/* Hero Banner: Jai Vilas Palace Heritage */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>19th-Century European Classical Architecture in India</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 tracking-tight leading-tight">
              Jai Vilas Palace & Royal Scindia Collection
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Established in 1874 by <strong>Maharaja Jayaji Rao Scindia</strong>, Jai Vilas Palace is an exquisite 
              masterpiece of Tuscan, Italian-Doric, and Corinthian architecture. Spanning 400 rooms, its opulent halls 
              house the sovereign collections of the Maratha Scindia dynasty, culminating in the fabled 
              <strong> Imperial Subterranean Vault</strong>.
            </p>
          </div>

          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800/80">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Durbar Hall Gold Leaf</p>
                <p className="text-base font-cinzel font-bold text-amber-200">560 kg of Pure Gold</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Twin Crystal Chandeliers</p>
                <p className="text-base font-cinzel font-bold text-amber-200">3.5 Tonnes Each (250 Bulbs)</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Train className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Banquet Table Feature</p>
                <p className="text-base font-cinzel font-bold text-amber-200">Solid Silver Model Train</p>
              </div>
            </div>
          </div>
        </section>

        {/* Palace Galleries Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-amber-100">
                Palace Wings & Heritage Museum
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Open galleries accessible under standard visitor pass
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full">
              Status: Publicly Accessible
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gallery 1: Durbar Hall */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <Crown className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-cinzel font-bold text-amber-200 mb-2">The Grand Durbar Hall</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                The world-famous throne room where the Maharaja held court. Eight elephants were suspended from the ceiling 
                beams to rigorously verify the roof’s strength before hoisting the monumental crystal chandeliers.
              </p>
            </div>

            {/* Gallery 2: Silver Train Dining Room */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <Train className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-cinzel font-bold text-amber-200 mb-2">Silver Banquet Train</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A custom solid silver locomotive on miniature rails encircling the 40-seat royal banquet table, 
                serving vintage spirits, liqueurs, and cigars to dignitaries at the touch of royal buttons.
              </p>
            </div>

            {/* Gallery 3: Royal Scindia Armoury */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-cinzel font-bold text-amber-200 mb-2">Dynastic Armoury</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Preserving historic ceremonial blades, ancestral Maratha armors, jewel-encrusted scabbards, 
                and weapons wielded by historical monarchs across central Indian campaigns.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* PALACE TREASURE / IMPERIAL VAULT SECTION (CTF CORE) */}
        {/* ---------------------------------------------------- */}
        <section id="palace-treasure" className="relative rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 sm:p-10 shadow-2xl overflow-hidden">
          {/* Radial decorative highlights */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-800/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            {/* Header banner */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider">
                <Gem className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>RESTRICTED SANCTUM &bull; LEVEL 0 VAULT</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-cinzel font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 tracking-wide">
                The Palace Treasure (Imperial Vault)
              </h3>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto font-sans leading-relaxed">
                Deep beneath the Durbar Hall lies the sovereign Scindia repository containing dynastic regalia, 
                ancestral gems, and classified royal credentials. Protected by ancient imperial edicts.
              </p>
            </div>

            {/* Vault Gate Graphic & Status */}
            <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
              <div className="max-w-md mx-auto space-y-6">
                {/* Vault Door Icon Motif */}
                <div className="relative inline-flex items-center justify-center">
                  <div className={`w-28 h-28 rounded-full border-4 ${vaultResult?.success ? 'border-emerald-400 bg-emerald-950/30 shadow-[0_0_40px_rgba(52,211,153,0.3)]' : 'border-amber-500/40 bg-amber-950/20 shadow-[0_0_30px_rgba(245,158,11,0.15)]'} flex items-center justify-center transition-all duration-700`}>
                    {vaultResult?.success ? (
                      <Unlock className="w-12 h-12 text-emerald-400 animate-bounce" />
                    ) : (
                      <Lock className="w-12 h-12 text-amber-400" />
                    )}
                  </div>
                  {/* Rotating decorative ring */}
                  <div className="absolute inset-0 border-2 border-dashed border-amber-500/30 rounded-full animate-spin" style={{ animationDuration: '25s' }}></div>
                </div>

                {/* Clearance display */}
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Present Bearer Clearance</p>
                  <p className="text-lg font-cinzel font-bold text-amber-200">
                    {usernameDisplay} <span className="text-sm font-sans font-normal text-slate-400">({roleDisplay})</span>
                  </p>
                </div>

                {/* Unseal Action Button */}
                <button
                  onClick={handleUnsealVault}
                  disabled={vaultLoading}
                  className="w-full sm:w-auto min-w-[280px] bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 text-slate-950 font-cinzel font-bold text-sm tracking-widest py-4 px-8 rounded-xl transition-all duration-300 transform active:scale-98 shadow-xl shadow-amber-600/30 flex items-center justify-center space-x-3 mx-auto disabled:opacity-50 cursor-pointer"
                >
                  {vaultLoading ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                      <span>UNSEALING VAULT SANCTUM...</span>
                    </span>
                  ) : (
                    <>
                      <Key className="w-5 h-5" />
                      <span>UNSEAL PALACE TREASURE</span>
                    </>
                  )}
                </button>
              </div>

              {/* ---------------------------------------------------- */}
              {/* REJECTION RESPONSE (GUEST / NON-ADMIN) */}
              {/* ---------------------------------------------------- */}
              {vaultResult && !vaultResult.success && (
                <div className="mt-8 p-6 rounded-2xl bg-red-950/70 border border-red-700/60 text-left animate-in fade-in duration-300 shadow-xl">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-red-900/50 border border-red-700 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-cinzel font-bold text-red-300 text-base tracking-wide">
                          IMPERIAL REJECTION — VAULT SEAL INTACT
                        </span>
                        <span className="text-xs bg-red-900/80 text-red-200 px-2.5 py-0.5 rounded-full font-mono">
                          HTTP 403 Forbidden
                        </span>
                      </div>
                      <p className="text-sm font-sans text-red-200/90 leading-relaxed font-semibold">
                        {vaultResult.message}
                      </p>
                      {vaultResult.identity && (
                        <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-red-300/80 border-t border-red-800/40">
                          <span>Evaluated Subject: <strong className="text-white">{vaultResult.identity.username}</strong></span>
                          <span>Evaluated Role: <strong className="text-white">{vaultResult.identity.role}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* SUCCESS RESPONSE: REVEAL FLAG */}
              {/* ---------------------------------------------------- */}
              {vaultResult && vaultResult.success && (
                <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-950/60 via-slate-900/90 to-slate-950 border-2 border-amber-400 text-left animate-in fade-in duration-500 shadow-2xl shadow-amber-500/20">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-amber-500/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/40">
                        <Crown className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="font-cinzel font-extrabold text-amber-200 text-xl tracking-wider">
                          ROYAL ACCESS GRANTED
                        </h4>
                        <p className="text-xs text-amber-400/80 font-sans">
                          {vaultResult.message}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-full">
                      Cleared: {vaultResult.vault?.accessGrantedTo} &bull; {vaultResult.vault?.role}
                    </div>
                  </div>

                  {/* Flag Reveal Box */}
                  <div className="mt-6 space-y-3">
                    <p className="text-xs uppercase tracking-widest text-amber-300/90 font-medium flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Imperial CTF Capture Key</span>
                    </p>
                    <div className="flex items-center justify-between bg-slate-950 border-2 border-amber-500/60 rounded-xl p-4 shadow-inner">
                      <code className="text-base sm:text-2xl font-mono font-bold text-amber-300 tracking-wider break-all select-all">
                        {vaultResult.flag}
                      </code>
                      <button
                        onClick={() => handleCopyFlag(vaultResult.flag)}
                        className="ml-4 shrink-0 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Lore & Artifact Details */}
                  <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                    <p>
                      <strong className="text-amber-200">Vault Collection:</strong> {vaultResult.vault?.collection}
                    </p>
                    <p className="text-slate-500">
                      You have verified imperial authorization by modifying the backend authorization cookie.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* COLLAPSIBLE CTF HELPER / COOKIE GUIDE DRAWER         */}
        {/* ---------------------------------------------------- */}
        <section className="border border-slate-800/80 bg-slate-900/40 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Code2 className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="text-sm font-semibold text-slate-200">
                  CTF Cookie Escalation Guide
                </h4>
                <p className="text-xs text-slate-400">
                  Authentication cookie <code className="text-amber-400">auth</code> is issued by and stored under <code className="text-amber-300">ctf-backend-d3un.onrender.com</code>.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowInspector(!showInspector)}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 border border-amber-500/30 hover:border-amber-400/60 bg-amber-500/10 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              {showInspector ? 'Hide Instructions ▲' : 'Open Instructions ▼'}
            </button>
          </div>

          {showInspector && (
            <div className="mt-5 pt-5 border-t border-slate-800 space-y-4 animate-in fade-in duration-200 text-xs font-mono">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="font-semibold text-amber-300 font-sans text-xs">
                  How to inspect &amp; escalate your cookie in DevTools:
                </span>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 font-sans text-xs leading-relaxed">
                  <li>
                    Press <kbd className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-white font-mono">F12</kbd> (or right click &rarr; <em>Inspect</em>) to open browser Developer Tools.
                  </li>
                  <li>
                    Navigate to <strong>Application</strong> (Chrome/Edge) or <strong>Storage</strong> (Firefox).
                  </li>
                  <li>
                    Under <strong>Cookies</strong> in the left sidebar, click on <strong className="text-amber-300 font-mono">https://ctf-backend-d3un.onrender.com</strong>.
                  </li>
                  <li>
                    Locate the row named <strong className="text-amber-400 font-mono">auth</strong>.
                  </li>
                  <li>
                    Double-click its <strong>Value</strong> and replace it with a Base64-encoded royal identity (e.g. <code className="bg-slate-900 border border-slate-800 px-1 py-0.5 rounded text-emerald-400 font-mono">eyJ1c2VybmFtZSI6ImtpbmciLCJyb2xlIjoiYWRtaW4ifQ==</code>).
                  </li>
                  <li>
                    Return to the page and click <strong className="text-amber-300">UNSEAL PALACE TREASURE</strong>!
                  </li>
                </ol>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 py-6 px-4 sm:px-8 mt-12 text-center text-xs text-slate-500 space-y-2">
        <p className="font-cinzel text-amber-400/70 tracking-widest">
          JAI VILAS PALACE &bull; GWALIOR &bull; MADHYA PRADESH TOURISM
        </p>
        <p>
          Preserving the imperial legacy and cultural heritage of the Scindia dynasty.
        </p>
      </footer>
    </div>
  );
}

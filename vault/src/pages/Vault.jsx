import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Lock, 
  Unlock, 
  AlertCircle, 
  Crown, 
  Sparkles, 
  Copy, 
  Check, 
  Code2, 
  Gem, 
  ShieldAlert,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { getAuthCookie, decodeCookieSafe, BACKEND_URL } from '../auth';

export default function Vault({ user, onUserUpdate }) {
  const [vaultLoading, setVaultLoading] = useState(false);
  const [vaultResult, setVaultResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showInspector, setShowInspector] = useState(false);
  const [currentCookie, setCurrentCookie] = useState('');

  useEffect(() => {
    setCurrentCookie(getAuthCookie());
  }, []);

  const handleUnseal = async () => {
    setVaultLoading(true);
    setVaultResult(null);

    const cookieToSend = getAuthCookie() || currentCookie;

    try {
      const res = await fetch(`${BACKEND_URL}/vault?cookie=${encodeURIComponent(cookieToSend)}`, {
        method: 'GET',
        headers: {
          'x-auth-cookie': cookieToSend,
          'Authorization': `Bearer ${cookieToSend}`
        },
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
        if (data.vault?.accessGrantedTo && onUserUpdate) {
          const updated = { username: data.vault.accessGrantedTo, role: data.vault.role || 'admin' };
          onUserUpdate(updated);
        }
      } else {
        setVaultResult({
          success: false,
          status: res.status,
          message: data.message || 'Access Denied.',
          identity: data.identity
        });
        if (data.identity?.username && onUserUpdate) {
          onUserUpdate(data.identity);
        }
      }
    } catch (err) {
      setVaultResult({
        success: false,
        message: 'Network error connecting to the Royal Vault backend.'
      });
    } finally {
      setVaultLoading(false);
      setCurrentCookie(getAuthCookie());
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const usernameDisplay = user?.username || 'guest';
  const roleDisplay = user?.role || 'user';
  const isRoyal = roleDisplay.toLowerCase() === 'admin' && ['king', 'queen', 'prince', 'princess'].includes(usernameDisplay.toLowerCase());
  const decodedLive = decodeCookieSafe(currentCookie || getAuthCookie());

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="bg-white border border-amber-200/90 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Gem className="w-3.5 h-3.5 text-amber-600" />
            <span>Restricted Sovereign Repository &bull; Level 0 Vault</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-cinzel font-extrabold text-stone-900 tracking-tight">
            The Palace Treasure
          </h1>
          <p className="text-stone-600 text-sm sm:text-base font-sans">
            Underneath the Durbar Hall lies the sovereign safe holding ancestral coronation jewels and the classified capture key.
          </p>
        </div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-amber-100/50 rounded-full blur-2xl pointer-events-none"></div>
      </section>

      {/* Main Vault Gate */}
      <section className="bg-white border-2 border-amber-300 rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden">
        <div className="max-w-lg mx-auto text-center space-y-7 relative z-10">
          
          {/* Animated Vault Dial */}
          <div className="relative inline-flex items-center justify-center">
            <div className={`w-32 h-32 rounded-full border-4 ${
              vaultResult?.success
                ? 'border-emerald-500 bg-emerald-50 shadow-[0_0_35px_rgba(16,185,129,0.3)]'
                : 'border-amber-400 bg-amber-50/70 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
            } flex items-center justify-center transition-all duration-700`}>
              {vaultResult?.success ? (
                <Unlock className="w-14 h-14 text-emerald-600 animate-bounce" />
              ) : (
                <Lock className="w-14 h-14 text-amber-600" />
              )}
            </div>
            {/* Spinning decorative orbit */}
            <div className="absolute inset-0 border-2 border-dashed border-amber-300 rounded-full animate-spin" style={{ animationDuration: '40s' }}></div>
          </div>

          {/* Current Bearer Clearance Badge */}
          <div className="inline-flex items-center space-x-2 bg-stone-50 border border-stone-200 px-4 py-2 rounded-full text-xs">
            <span className="text-stone-500 font-medium">Clearance Identity:</span>
            <span className="font-mono font-bold text-stone-900">{usernameDisplay}</span>
            <span className="text-stone-300">&bull;</span>
            <span className={`font-mono font-semibold ${isRoyal ? 'text-amber-700 font-bold' : 'text-stone-600'}`}>
              role: {roleDisplay}
            </span>
          </div>

          {/* Unseal CTA */}
          <div>
            <button
              onClick={handleUnseal}
              disabled={vaultLoading}
              className="w-full sm:w-auto min-w-[280px] bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-cinzel font-bold text-sm tracking-widest py-4 px-8 rounded-xl transition-all duration-300 transform active:scale-95 shadow-lg shadow-amber-600/30 flex items-center justify-center space-x-3 mx-auto disabled:opacity-50 cursor-pointer"
            >
              {vaultLoading ? (
                <span className="flex items-center space-x-2">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>EVALUATING IMPERIAL SEAL...</span>
                </span>
              ) : (
                <>
                  <Key className="w-5 h-5" />
                  <span>UNSEAL PALACE TREASURE</span>
                </>
              )}
            </button>
          </div>

          {/* 403 Rejection Box */}
          {vaultResult && !vaultResult.success && (
            <div className="p-5 sm:p-6 rounded-2xl bg-red-50 border border-red-200 text-left animate-in fade-in duration-300 shadow-sm space-y-2.5">
              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-red-100 border border-red-300 flex items-center justify-center text-red-700 shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel font-bold text-red-900 text-xs sm:text-sm tracking-wide">
                      IMPERIAL REJECTION &bull; HTTP 403
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-red-800 font-semibold leading-relaxed">
                    {vaultResult.message}
                  </p>
                  {vaultResult.identity && (
                    <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-red-700 border-t border-red-200/80">
                      <span>Subject: <strong className="text-red-950">{vaultResult.identity.username}</strong></span>
                      <span>Role: <strong className="text-red-950">{vaultResult.identity.role}</strong></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 200 Success Flag Reveal */}
          {vaultResult && vaultResult.success && (
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-50 to-white border-2 border-amber-400 text-left animate-in fade-in duration-500 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-600/30">
                    <Crown className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-stone-900 text-base tracking-wider">
                      ROYAL CLEARANCE GRANTED
                    </h4>
                    <p className="text-xs text-amber-900 font-sans">
                      {vaultResult.message}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full font-bold">
                  {vaultResult.vault?.accessGrantedTo}
                </span>
              </div>

              {/* CTF Flag Container */}
              <div className="space-y-1.5">
                <p className="text-xs uppercase tracking-widest text-amber-900 font-bold flex items-center space-x-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Sovereign CTF Flag</span>
                </p>
                <div className="flex items-center justify-between bg-white border-2 border-amber-400 rounded-xl p-4 shadow-inner">
                  <code className="text-lg sm:text-2xl font-mono font-bold text-amber-900 tracking-wider break-all select-all">
                    {vaultResult.flag}
                  </code>
                  <button
                    onClick={() => handleCopy(vaultResult.flag)}
                    className="ml-3 shrink-0 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>COPIED</span>
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

              <div className="pt-1 text-xs text-stone-600">
                <strong className="text-stone-900">Vault Collection:</strong> {vaultResult.vault?.collection}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Collapsible Cookie Inspector for CTF Players */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-cinzel font-bold text-stone-900">
                Privilege Escalation Inspector
              </h3>
              <p className="text-xs text-stone-500">
                Cookie <code className="text-amber-700 font-mono font-semibold">auth</code> on <code className="text-stone-800 font-mono">jai-vilas.vercel.app</code>
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentCookie(getAuthCookie());
              setShowInspector(!showInspector);
            }}
            className="text-xs font-cinzel font-bold text-amber-900 hover:text-amber-950 border border-amber-300 hover:border-amber-400 bg-amber-50 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer"
          >
            {showInspector ? 'Hide Inspector ▲' : 'Open Inspector ▼'}
          </button>
        </div>

        {showInspector && (
          <div className="pt-4 border-t border-stone-200 space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between text-stone-500 font-sans">
                  <span className="font-semibold text-stone-900">Active 'auth' Cookie (Base64)</span>
                  <button
                    onClick={() => setCurrentCookie(getAuthCookie())}
                    className="text-[10px] text-amber-800 hover:underline cursor-pointer"
                  >
                    Refresh
                  </button>
                </div>
                <div className="bg-white p-3 rounded-lg border border-stone-200 text-stone-800 break-all select-all max-h-24 overflow-y-auto">
                  {currentCookie || getAuthCookie() || '(None detected)'}
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5">
                <span className="font-semibold text-stone-900 font-sans">Decoded Session Data</span>
                <div className="bg-white p-3 rounded-lg border border-stone-200 text-emerald-700 break-all max-h-24 overflow-y-auto font-bold">
                  {decodedLive ? JSON.stringify(decodedLive, null, 2) : '(Unable to decode)'}
                </div>
              </div>
            </div>

            {/* Quick Solution Tip */}
            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 space-y-2 font-sans">
              <span className="font-cinzel font-bold text-amber-900 text-xs uppercase tracking-wider block">
                Privilege Escalation Guide:
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                Open DevTools (<kbd className="bg-white border px-1 rounded font-mono">F12</kbd>) &rarr; Application &rarr; Cookies &rarr; <code className="font-mono text-amber-900 font-semibold">https://jai-vilas.vercel.app</code> &rarr; Change <code className="font-mono text-amber-900 font-semibold">auth</code> to:
              </p>
              <code className="text-stone-900 bg-white border border-amber-300 px-2 py-1 rounded block font-mono text-xs select-all">
                eyJ1c2VybmFtZSI6ImtpbmciLCJyb2xlIjoiYWRtaW4ifQ==
              </code>
              <p className="text-[11px] text-stone-500">
                Or paste in Console: <code className="font-mono text-stone-800">document.cookie = "auth=" + btoa('&#123;"username":"king","role":"admin"&#125;') + "; path=/;";</code>
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

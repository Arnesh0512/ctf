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
  Shield 
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
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="bg-white border border-amber-200/90 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold">
            <Gem className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '10s' }} />
            <span>RESTRICTED SANCTUM &bull; LEVEL 0 VAULT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 tracking-tight leading-tight">
            The Palace Treasure (Imperial Vault)
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            Deep beneath the Durbar Hall lies the sovereign repository holding ancestral regalia, coronation gems, and classified credentials of the Scindia dynasty.
          </p>
        </div>

        {/* Decorative blur */}
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-amber-100/50 rounded-full blur-2xl pointer-events-none"></div>
      </section>

      {/* Main Vault Door & Unseal Interface */}
      <section className="bg-white border-2 border-amber-300 rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden">
        <div className="max-w-xl mx-auto text-center space-y-8 relative z-10">
          {/* Vault Door Graphic Motif */}
          <div className="relative inline-flex items-center justify-center">
            <div className={`w-32 h-32 rounded-full border-4 ${
              vaultResult?.success
                ? 'border-emerald-500 bg-emerald-50 shadow-[0_0_30px_rgba(16,185,129,0.25)]'
                : 'border-amber-400 bg-amber-50/60 shadow-[0_0_25px_rgba(245,158,11,0.15)]'
            } flex items-center justify-center transition-all duration-700`}>
              {vaultResult?.success ? (
                <Unlock className="w-14 h-14 text-emerald-600 animate-bounce" />
              ) : (
                <Lock className="w-14 h-14 text-amber-600" />
              )}
            </div>
            {/* Rotating dashed ring */}
            <div className="absolute inset-0 border-2 border-dashed border-amber-300 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
          </div>

          {/* Present Bearer Clearance */}
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">Present Bearer Clearance</p>
            <p className="text-xl font-cinzel font-bold text-stone-900">
              {usernameDisplay} <span className="text-sm font-sans font-normal text-stone-500">({roleDisplay})</span>
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleUnseal}
            disabled={vaultLoading}
            className="w-full sm:w-auto min-w-[280px] bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-cinzel font-bold text-sm tracking-widest py-4 px-8 rounded-xl transition-all duration-300 transform active:scale-95 shadow-md shadow-amber-600/30 flex items-center justify-center space-x-3 mx-auto disabled:opacity-50 cursor-pointer"
          >
            {vaultLoading ? (
              <span className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>EVALUATING IMPERIAL SEAL...</span>
              </span>
            ) : (
              <>
                <Key className="w-5 h-5" />
                <span>UNSEAL PALACE TREASURE</span>
              </>
            )}
          </button>

          {/* Rejection Result (403 Forbidden) */}
          {vaultResult && !vaultResult.success && (
            <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-left animate-in fade-in duration-300 shadow-sm space-y-3">
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-300 flex items-center justify-center text-red-700 shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel font-bold text-red-900 text-sm tracking-wide">
                      IMPERIAL REJECTION &mdash; ACCESS DENIED
                    </span>
                    <span className="text-[11px] bg-red-200/80 text-red-900 px-2 py-0.5 rounded font-mono font-semibold">
                      HTTP 403
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-red-800 leading-relaxed font-semibold">
                    {vaultResult.message}
                  </p>
                  {vaultResult.identity && (
                    <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-red-700 border-t border-red-200">
                      <span>Evaluated Subject: <strong className="text-red-950">{vaultResult.identity.username}</strong></span>
                      <span>Evaluated Role: <strong className="text-red-950">{vaultResult.identity.role}</strong></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Success Result (Flag Reveal) */}
          {vaultResult && vaultResult.success && (
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-50/90 to-white border-2 border-amber-400 text-left animate-in fade-in duration-500 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-amber-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-600/30">
                    <Crown className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-stone-900 text-lg tracking-wider">
                      ROYAL ACCESS GRANTED
                    </h4>
                    <p className="text-xs text-amber-900 font-sans">
                      {vaultResult.message}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full font-semibold">
                  Cleared: {vaultResult.vault?.accessGrantedTo} &bull; {vaultResult.vault?.role}
                </div>
              </div>

              {/* Flag Reveal Box */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-amber-900 font-semibold flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Imperial CTF Capture Key</span>
                </p>
                <div className="flex items-center justify-between bg-white border-2 border-amber-400 rounded-xl p-4 shadow-inner">
                  <code className="text-base sm:text-2xl font-mono font-bold text-amber-900 tracking-wider break-all select-all">
                    {vaultResult.flag}
                  </code>
                  <button
                    onClick={() => handleCopy(vaultResult.flag)}
                    className="ml-4 shrink-0 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm"
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

              {/* Lore & Collection metadata */}
              <div className="pt-2 text-xs text-stone-600 space-y-1">
                <p>
                  <strong className="text-stone-900">Unsealed Collection:</strong> {vaultResult.vault?.collection}
                </p>
                <p className="text-stone-500">
                  Congratulations! You have escalated privileges by modifying the client authorization cookie.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Collapsible CTF Session Cookie Inspector */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-cinzel font-bold text-stone-900">
                CTF Cookie Privilege Escalation Inspector
              </h3>
              <p className="text-xs text-stone-500">
                Session cookie <code className="text-amber-700 font-mono font-semibold">auth</code> is stored on <code className="text-stone-800 font-mono font-semibold">jai-vilas.vercel.app</code>
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentCookie(getAuthCookie());
              setShowInspector(!showInspector);
            }}
            className="text-xs font-cinzel font-bold text-amber-800 hover:text-amber-900 border border-amber-300 hover:border-amber-400 bg-amber-50 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer"
          >
            {showInspector ? 'Hide Inspector ▲' : 'Open Inspector ▼'}
          </button>
        </div>

        {showInspector && (
          <div className="pt-4 border-t border-stone-200 space-y-5 animate-in fade-in duration-200 text-xs font-mono">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Raw Cookie Value */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="font-semibold text-stone-900 font-sans">Active 'auth' Cookie (Base64)</span>
                  <button
                    onClick={() => setCurrentCookie(getAuthCookie())}
                    className="text-[10px] text-amber-800 hover:underline cursor-pointer"
                  >
                    Refresh
                  </button>
                </div>
                <div className="bg-white p-3 rounded-lg border border-stone-200 text-stone-800 break-all select-all max-h-24 overflow-y-auto">
                  {currentCookie || getAuthCookie() || '(No auth cookie detected in document.cookie)'}
                </div>
              </div>

              {/* Decoded Session Data */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
                <span className="font-semibold text-stone-900 font-sans">Decoded Base64 Session Data</span>
                <div className="bg-white p-3 rounded-lg border border-stone-200 text-emerald-700 break-all max-h-24 overflow-y-auto font-semibold">
                  {decodedLive ? JSON.stringify(decodedLive, null, 2) : '(Unable to decode session)'}
                </div>
              </div>
            </div>

            {/* How to escalate guide */}
            <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-3 font-sans">
              <span className="font-cinzel font-bold text-amber-900 text-xs uppercase tracking-wider block">
                How to Solve the Challenge:
              </span>
              <div className="space-y-2 text-xs text-stone-700 leading-relaxed">
                <p>
                  <strong>Approach A (Browser DevTools GUI):</strong>
                  <br />
                  Press <kbd className="bg-white border border-stone-300 px-1 py-0.5 rounded text-stone-900 font-mono">F12</kbd> &rarr; <strong>Application</strong> / <strong>Storage</strong> &rarr; <strong>Cookies</strong> &rarr; Click <code className="text-amber-900 font-semibold font-mono">https://jai-vilas.vercel.app</code> &rarr; Double-click the value of <code className="text-amber-900 font-semibold font-mono">auth</code> and change to:
                  <br />
                  <code className="text-stone-900 bg-white border border-amber-300 px-2 py-0.5 rounded inline-block mt-1 font-mono">
                    eyJ1c2VybmFtZSI6ImtpbmciLCJyb2xlIjoiYWRtaW4ifQ==
                  </code>
                </p>
                <p>
                  <strong>Approach B (Browser Console One-Liner):</strong>
                  <br />
                  Open DevTools Console and execute:
                  <br />
                  <code className="text-stone-900 bg-white border border-amber-300 px-2 py-1 rounded inline-block mt-1 font-mono text-xs">
                    document.cookie = "auth=" + btoa('&#123;"username":"king","role":"admin"&#125;') + "; path=/;";
                  </code>
                </p>
                <p className="text-stone-500 text-[11px] pt-1">
                  * Allowed royal usernames: <code className="font-mono">king</code>, <code className="font-mono">queen</code>, <code className="font-mono">prince</code>, <code className="font-mono">princess</code> with role <code className="font-mono">admin</code>.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

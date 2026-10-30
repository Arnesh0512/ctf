import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Lock, 
  Unlock, 
  AlertCircle, 
  Crown, 
  Sparkles, 
  RefreshCw
} from 'lucide-react';
import { getAuthSession, BACKEND_URL } from '../auth';

export default function Vault({ user, onUserUpdate }) {
  const [vaultLoading, setVaultLoading] = useState(false);
  const [vaultResult, setVaultResult] = useState(null);
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    setSessionToken(getAuthSession());
  }, []);

  const handleUnseal = async () => {
    setVaultLoading(true);
    setVaultResult(null);

    const tokenToSend = getAuthSession() || sessionToken;

    try {
      const res = await fetch(`${BACKEND_URL}/vault?cookie=${encodeURIComponent(tokenToSend)}`, {
        method: 'GET',
        headers: {
          'x-auth-cookie': tokenToSend,
          'Authorization': `Bearer ${tokenToSend}`
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
      setSessionToken(getAuthSession());
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="bg-white border border-amber-200/90 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <h1 className="text-3xl sm:text-5xl font-cinzel font-extrabold text-stone-900 tracking-tight relative z-10">
          The Palace Treasure
        </h1>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-amber-100/50 rounded-full blur-2xl pointer-events-none"></div>
      </section>

      {/* Main Vault Gate */}
      <section className="bg-white border-2 border-amber-300 rounded-3xl p-8 sm:p-14 shadow-md relative overflow-hidden">
        <div className="max-w-lg mx-auto text-center space-y-8 relative z-10">
          
          {/* Animated Vault Dial */}
          <div className="relative inline-flex items-center justify-center">
            <div className={`w-36 h-36 rounded-full border-4 ${
              vaultResult?.success
                ? 'border-emerald-500 bg-emerald-50 shadow-[0_0_35px_rgba(16,185,129,0.3)]'
                : 'border-amber-400 bg-amber-50/70 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
            } flex items-center justify-center transition-all duration-700`}>
              {vaultResult?.success ? (
                <Unlock className="w-16 h-16 text-emerald-600 animate-bounce" />
              ) : (
                <Lock className="w-16 h-16 text-amber-600" />
              )}
            </div>
            {/* Spinning decorative orbit */}
            <div className="absolute inset-0 border-2 border-dashed border-amber-300 rounded-full animate-spin" style={{ animationDuration: '40s' }}></div>
          </div>

          {/* Unseal CTA */}
          <div>
            <button
              onClick={handleUnseal}
              disabled={vaultLoading}
              className="w-full sm:w-auto min-w-[300px] bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-cinzel font-bold text-sm tracking-widest py-4 px-8 rounded-xl transition-all duration-300 transform active:scale-95 shadow-lg shadow-amber-600/30 flex items-center justify-center space-x-3 mx-auto disabled:opacity-50 cursor-pointer"
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

              <div className="space-y-1.5">
                <p className="text-xs uppercase tracking-widest text-amber-900 font-bold flex items-center space-x-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Sovereign CTF Flag</span>
                </p>
                <div className="bg-white border-2 border-amber-400 rounded-xl p-4 shadow-inner text-center">
                  <code className="text-lg sm:text-2xl font-mono font-bold text-amber-900 tracking-wider break-all select-all block">
                    {vaultResult.flag}
                  </code>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

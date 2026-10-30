import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sun, 
  LogOut, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2, 
  Key, 
  Code, 
  Edit3, 
  Compass, 
  ShieldAlert,
  Save
} from 'lucide-react';
import { BACKEND_URL, getToken, setToken, getUser, clearAuth, parseJwtSafe } from '../auth';

export default function Flag() {
  const navigate = useNavigate();
  const [token, setCurrentToken] = useState('');
  const [user, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [manualToken, setManualToken] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const storedToken = getToken();
    if (!storedToken) {
      navigate('/login', { replace: true });
      return;
    }
    setCurrentToken(storedToken);
    setManualToken(storedToken);
    setCurrentUser(getUser() || { username: 'pilgrim', role: 'pilgrim' });
  }, [navigate]);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const handleShowFlag = async () => {
    setLoading(true);
    setResult(null);

    const activeToken = getToken() || token;

    try {
      const res = await fetch(`${BACKEND_URL}/temple/flag`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${activeToken}`,
          'x-access-token': activeToken
        }
      });

      const data = await res.json();
      setResult({
        ok: res.ok,
        status: res.status,
        data: data
      });
    } catch (err) {
      setResult({
        ok: false,
        status: 500,
        data: {
          error: 'ConnectionError',
          message: `Unable to connect to the Konark Sanctum backend at ${BACKEND_URL}.`
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveManualToken = (e) => {
    e.preventDefault();
    if (!manualToken.trim()) return;
    setToken(manualToken.trim());
    setCurrentToken(manualToken.trim());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    setEditMode(false);
  };

  const parsedJwt = parseJwtSafe(token);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const isClientExpired = parsedJwt?.exp && parsedJwt.exp <= currentTimestamp;

  return (
    <div className="min-h-screen bg-[#f1f6f3] text-stone-900 flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-950 relative overflow-hidden">
      {/* Decorative ambient emerald lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-36 -left-36 w-96 h-96 bg-emerald-200/50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-36 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-36 left-1/3 w-96 h-96 bg-green-200/40 rounded-full blur-3xl"></div>
      </div>

      {/* Top Navbar */}
      <header className="relative z-10 border-b border-emerald-200/80 bg-white/90 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-0.5 shadow-md shadow-emerald-700/20">
              <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center">
                <Sun className="w-5 h-5 text-emerald-700" />
              </div>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-cinzel font-bold text-emerald-950 tracking-wider leading-tight">
                KONARK SUN TEMPLE
              </h1>
              <p className="text-[10px] text-emerald-800 uppercase tracking-widest font-bold">
                13th Century &bull; King Narasimhadeva I
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Pilgrim: <strong className="font-mono">{user?.username || 'pilgrim'}</strong></span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 text-xs text-stone-700 hover:text-rose-700 border border-stone-200 hover:border-rose-300 bg-white hover:bg-rose-50 px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-semibold shadow-sm"
              title="Logout and return to Chariot Gate"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 py-8 space-y-8">
        
        {/* Lore Banner */}
        <section className="bg-white/95 backdrop-blur-md border border-emerald-200/90 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              <Compass className="w-3.5 h-3.5" />
              <span>Odisha Eastern Coast &bull; Kalinga Architecture</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-cinzel font-black text-emerald-950 tracking-tight">
              The Monumental Stone Chariot
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              Dedicated to <strong>Surya, the Sun God</strong>, the temple is sculpted in the form of a gigantic celestial chariot with <strong>24 elaborately carved stone wheels</strong> and 7 galloping horses, tracking the eternal progression of solar time.
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none"></div>
        </section>

        {/* Action Gate Section */}
        <section className="bg-white border-2 border-emerald-300 rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-6">
          <div className="max-w-lg mx-auto space-y-3">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100/80 border-4 border-emerald-400 text-emerald-700 shadow-inner">
              <Sun className="w-10 h-10 animate-spin-slow" />
            </div>
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-emerald-950">
              Inner Sanctum Seal
            </h3>
            <p className="text-xs text-stone-600">
              Present your signed Chariot Transit Pass to unveil the sacred Surya relic.
            </p>
          </div>

          <div>
            <button
              onClick={handleShowFlag}
              disabled={loading}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-900 text-white font-cinzel font-bold text-sm tracking-widest uppercase rounded-2xl shadow-lg shadow-emerald-700/30 transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer inline-flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{loading ? 'Consulting Chariot...' : 'Show Flag'}</span>
            </button>
          </div>

          {/* Results Area */}
          {result && (
            <div className="max-w-xl mx-auto pt-2 animate-in fade-in duration-300">
              {result.ok ? (
                /* Success 200 */
                <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50 to-white border-2 border-emerald-500 text-left shadow-xl space-y-4">
                  <div className="flex items-center space-x-3 border-b border-emerald-200 pb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-cinzel font-bold text-emerald-950 text-base">
                        SANCTUM SEAL UNSEALED
                      </h4>
                      <p className="text-xs text-emerald-800">
                        {result.data.message}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-emerald-900">
                      Surya CTF Flag
                    </p>
                    <div className="bg-white border-2 border-emerald-400 rounded-xl p-4 text-center shadow-inner">
                      <code className="text-xl sm:text-2xl font-mono font-black text-emerald-900 tracking-wider select-all block">
                        {result.data.flag}
                      </code>
                    </div>
                  </div>
                </div>
              ) : (
                /* Error / Expired 401 */
                <div className="p-5 sm:p-6 rounded-2xl bg-rose-50 border border-rose-200 text-left shadow-sm space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700 shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel font-bold text-rose-950 text-xs sm:text-sm tracking-wide">
                          {result.data.error || 'TEMPORAL SEAL EXPIRED'} &bull; HTTP {result.status}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-rose-900 leading-relaxed font-semibold">
                        {result.data.message}
                      </p>
                      {result.data.hint && (
                        <p className="text-xs font-mono text-emerald-900 bg-emerald-100/70 p-2 rounded-lg border border-emerald-300">
                          <strong>Clue:</strong> {result.data.hint}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Transit Pass (JWT) Inspector & Editor Card */}
        <section className="bg-white/95 backdrop-blur-md border border-emerald-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <Key className="w-5 h-5 text-emerald-700" />
              <h3 className="font-cinzel font-bold text-emerald-950 text-base">
                Chariot Transit Pass (JWT Inspector)
              </h3>
            </div>

            <button
              onClick={() => setEditMode(!editMode)}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100/80 hover:bg-emerald-200 px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{editMode ? 'Cancel Edit' : 'Edit / Replace JWT'}</span>
            </button>
          </div>

          {saveSuccess && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Transit pass updated in persistent memory! You can now re-click "Show Flag".</span>
            </div>
          )}

          {editMode ? (
            /* Manual Token Edit Form */
            <form onSubmit={handleSaveManualToken} className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                Paste New Signed JWT (with secret 2407 & future exp):
              </label>
              <textarea
                value={manualToken}
                onChange={(e) => setManualToken(e.target.value)}
                rows={4}
                required
                className="w-full p-3 font-mono text-xs bg-stone-50 border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-stone-800 break-all"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center space-x-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save New Token</span>
                </button>
              </div>
            </form>
          ) : (
            /* Token Display & Decoded Claims */
            <div className="space-y-4">
              <div className="p-3 bg-stone-50 border border-emerald-200/80 rounded-xl">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="font-bold uppercase tracking-wider text-emerald-900">Current Token</span>
                  <span className="font-mono text-[11px]">{token.length} chars</span>
                </div>
                <p className="font-mono text-xs text-stone-700 break-all select-all line-clamp-3">
                  {token}
                </p>
              </div>

              {parsedJwt && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-emerald-900 block uppercase tracking-wider text-[10px]">
                      Identity (Subject)
                    </span>
                    <p className="font-mono text-stone-800">
                      <strong>sub:</strong> {parsedJwt.sub || 'N/A'}
                    </p>
                    <p className="font-mono text-stone-800">
                      <strong>role:</strong> {parsedJwt.role || 'N/A'}
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-emerald-900 block uppercase tracking-wider text-[10px]">
                      Temporal Stamps (UNIX Time)
                    </span>
                    <p className="font-mono text-stone-800">
                      <strong>iat:</strong> {parsedJwt.iat}
                    </p>
                    <p className="font-mono text-stone-800 flex items-center space-x-1">
                      <span><strong>exp:</strong> {parsedJwt.exp}</span>
                      {isClientExpired ? (
                        <span className="ml-1 text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded">
                          EXPIRED
                        </span>
                      ) : (
                        <span className="ml-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          ACTIVE
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-bold">
                  Temple Priest Whisper:
                </p>
                <p className="text-amber-800 leading-relaxed font-sans">
                  The gatekeepers sign all transit passes using <strong>HMAC-SHA256 (HS256)</strong> with secret <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">2407</code>. Since your pass expired immediately upon creation, you must forge a new pass signed with secret <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">2407</code> having an expiration timestamp in the future.
                </p>
              </div>
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-emerald-100 py-3 text-center text-xs text-stone-500">
        Konark Sun Temple &bull; Dedicated to Surya &bull; Odisha Eastern Coast
      </footer>
    </div>
  );
}

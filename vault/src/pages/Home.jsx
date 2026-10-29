import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Sparkles, 
  Train, 
  Key, 
  BookOpen, 
  Compass, 
  Shield, 
  ArrowRight, 
  Award,
  Crown
} from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden border border-amber-200/90 bg-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Text */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold">
                <Crown className="w-3.5 h-3.5 text-amber-600" />
                <span>Seat of the Royal Scindia Dynasty &bull; Gwalior</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 tracking-tight leading-tight">
                Jai Vilas Palace &amp; The Imperial Heritage
              </h1>
              
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
                Erected in 1874 by <strong>Maharaja Jayaji Rao Scindia</strong> to celebrate the visit of King Edward VII, 
                Jai Vilas Palace stands as an extraordinary fusion of European classical architecture and Maratha royal grandeur. 
                Spanning over 400 opulent chambers, it houses the revered 
                <strong> H.H. Maharaja Sir Jiwaji Rao Scindia Museum</strong>.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-200">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                <p className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Gold Leafing</p>
                <p className="text-base sm:text-lg font-cinzel font-bold text-amber-800">560 kg</p>
                <p className="text-[10px] text-stone-500">Pure Gold in Durbar Hall</p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                <p className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Chandeliers</p>
                <p className="text-base sm:text-lg font-cinzel font-bold text-amber-800">3.5 Tonnes</p>
                <p className="text-[10px] text-stone-500">250 Light Bulbs Each</p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                <p className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Banquet Feature</p>
                <p className="text-base sm:text-lg font-cinzel font-bold text-amber-800">Silver Train</p>
                <p className="text-[10px] text-stone-500">40-Seat Marble Table</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/vault"
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-cinzel font-bold text-xs tracking-wider px-6 py-3.5 rounded-xl shadow-md shadow-amber-600/30 flex items-center space-x-2 transition-all transform active:scale-95"
              >
                <Key className="w-4 h-4" />
                <span>ACCESS PALACE TREASURE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/tourism"
                className="bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-cinzel font-semibold text-xs tracking-wider px-5 py-3.5 rounded-xl transition-all"
              >
                <span>VISITOR GUIDE &amp; TICKETS</span>
              </Link>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-stone-100 overflow-hidden">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/07/The_Jai_Vilas_Palace_%28Gwalior%29.jpg"
              alt="Jai Vilas Palace exterior facade, Gwalior"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
            <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/90 backdrop-blur-md rounded-xl border border-amber-200 shadow-md">
              <p className="text-xs font-cinzel font-bold text-stone-900">
                The Grand Tuscan-Italianate Facade
              </p>
              <p className="text-[11px] text-stone-600">
                Designed by Sir Michael Filose in 1874 &bull; Jai Vilas Palace, Lashkar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars: History, Tourism, Vault */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
            Explore The Palace Dimensions
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            Discover the living legacy of the Scindia dynasty, plan your heritage visit, or attempt unsealing the royal subterranean vault.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: History */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="h-44 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a0/DUrbar_hall_at_jai_vilas_palace.JPG"
                  alt="Durbar Hall with chandeliers in Jai Vilas Palace"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-xs text-amber-800 font-semibold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Historical Chronicle</span>
                </div>
                <h3 className="text-lg font-cinzel font-bold text-stone-900">
                  Royal History &amp; Architecture
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Learn about Maharaja Jayaji Rao Scindia, the 1874 Italianate construction, the ceiling tested by 8 elephants, and the solid silver dining train.
                </p>
              </div>
            </div>

            <Link
              to="/history"
              className="mt-6 inline-flex items-center space-x-1 text-xs font-cinzel font-bold text-amber-800 hover:text-amber-900 pt-2 border-t border-stone-100"
            >
              <span>READ ARCHITECTURAL HISTORY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Tourism Guide */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="h-44 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Art_collection_Scindia_Palace.jpg"
                  alt="Scindia Museum Art Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-xs text-amber-800 font-semibold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Visitor Information</span>
                </div>
                <h3 className="text-lg font-cinzel font-bold text-stone-900">
                  Museum Guide &amp; Tourism
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Museum visiting hours, ticket prices, guided tour details, and the 35 public galleries showcasing swords, silver chariots, and royal palanquins.
                </p>
              </div>
            </div>

            <Link
              to="/tourism"
              className="mt-6 inline-flex items-center space-x-1 text-xs font-cinzel font-bold text-amber-800 hover:text-amber-900 pt-2 border-t border-stone-100"
            >
              <span>EXPLORE VISITOR GUIDE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Imperial Vault */}
          <div className="bg-gradient-to-b from-amber-50/60 to-white border-2 border-amber-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="h-44 rounded-xl overflow-hidden bg-stone-100 border border-amber-200 relative">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Cart_Jai_vilas_palace_gwalior.jpg"
                  alt="Imperial artifacts and vault"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2.5 right-2.5 bg-amber-600 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold shadow">
                  CTF CHALLENGE
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-xs text-amber-800 font-semibold uppercase tracking-wider">
                  <Key className="w-3.5 h-3.5 text-amber-600" />
                  <span>Classified Sanctum</span>
                </div>
                <h3 className="text-lg font-cinzel font-bold text-stone-900">
                  Palace Treasure (Vault)
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  The sealed subterranean chamber holding the sovereign credentials. Protected by client authorization checks &mdash; escalate your cookie to access it.
                </p>
              </div>
            </div>

            <Link
              to="/vault"
              className="mt-6 inline-flex items-center space-x-1 text-xs font-cinzel font-bold text-amber-700 hover:text-amber-900 pt-2 border-t border-amber-200"
            >
              <span>ENTER THE SEALED VAULT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Royal Gallery Showcase */}
      <section className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-900">
              Photographic Archives of Jai Vilas
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Curated historical captures from the Scindia museum archives
            </p>
          </div>
          <span className="text-xs font-mono text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Source: Wikimedia Commons &bull; MP Tourism
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Jai_Vilas_Mahal_Facade.jpg"
              alt="Jai Vilas Mahal Facade"
              className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="p-3">
              <p className="text-xs font-cinzel font-bold text-stone-900">Corinthian Columns</p>
              <p className="text-[11px] text-stone-500">Neoclassical architecture</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Carpet_2022.jpg"
              alt="Asia's largest hand-woven Persian carpet"
              className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="p-3">
              <p className="text-xs font-cinzel font-bold text-stone-900">Historic Royal Carpet</p>
              <p className="text-[11px] text-stone-500">Woven over 12 continuous years</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Inside_view_of_Jaivilas_Palace_Gwalior_-_panoramio.jpg"
              alt="Inside view of palace galleries"
              className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="p-3">
              <p className="text-xs font-cinzel font-bold text-stone-900">Grand Interior Halls</p>
              <p className="text-[11px] text-stone-500">Italian marble and European crystal</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/02/Fort_Gwalior-_India_02.jpg"
              alt="Gwalior Fort panorama"
              className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="p-3">
              <p className="text-xs font-cinzel font-bold text-stone-900">Gwalior Citadel</p>
              <p className="text-[11px] text-stone-500">Overlooking the royal city</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

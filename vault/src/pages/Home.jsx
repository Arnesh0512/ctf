import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* 1. Cinematic Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200/90 group">
        <div className="relative h-[480px] sm:h-[560px] w-full overflow-hidden bg-stone-900">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/07/The_Jai_Vilas_Palace_%28Gwalior%29.jpg"
            alt="Jai Vilas Palace exterior facade"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/30 to-transparent"></div>

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 p-6 sm:p-14 flex flex-col justify-end max-w-3xl space-y-4 text-white">
            <h1 className="text-3xl sm:text-6xl font-cinzel font-extrabold tracking-tight leading-none text-white drop-shadow-md">
              Jai Vilas Palace
            </h1>

            <p className="text-stone-200 text-sm sm:text-lg font-sans max-w-xl leading-snug drop-shadow">
              India's premier 19th-century Italianate palace &mdash; 400 rooms of gilded halls, crystal chandeliers, and royal Maratha heritage.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Visual Gallery Showcase Cards (Low Text, High Visual Impact) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
              Palace Crown Jewels
            </h2>
            <p className="text-xs sm:text-sm text-stone-700">
              Iconic chambers and engineering marvels of the Scindia estate
            </p>
          </div>
          <Link to="/history" className="text-xs font-cinzel font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1">
            <span>VIEW ALL EXHIBITS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Durbar Hall */}
          <Link to="/history" className="group rounded-2xl overflow-hidden bg-white border border-stone-200 hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative h-64 overflow-hidden bg-stone-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a0/DUrbar_hall_at_jai_vilas_palace.JPG"
                alt="Durbar Hall"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold font-mono text-amber-800 uppercase tracking-wider">
                Throne Room
              </div>
            </div>
            <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-cinzel font-bold text-stone-900 text-lg group-hover:text-amber-700 transition-colors">
                  The Grand Durbar Hall
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2">
                  560 kg pure gold leafing and the colossal 3.5-tonne Belgian crystal chandeliers.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-800 flex items-center space-x-1 pt-3 border-t border-stone-100">
                <span>Discover Hall</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Card 2: Silver Train */}
          <Link to="/history" className="group rounded-2xl overflow-hidden bg-white border border-stone-200 hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative h-64 overflow-hidden bg-stone-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Cart_Jai_vilas_palace_gwalior.jpg"
                alt="Royal Scindia Carriages and Artifacts"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold font-mono text-amber-800 uppercase tracking-wider">
                Royal Novelty
              </div>
            </div>
            <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-cinzel font-bold text-stone-900 text-lg group-hover:text-amber-700 transition-colors">
                  Solid Silver Dining Train
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2">
                  Sterling silver locomotive serving liqueurs along miniature rails on the 40-seat banquet table.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-800 flex items-center space-x-1 pt-3 border-t border-stone-100">
                <span>View Mechanical Marvel</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Card 3: 12-Year Hand-Woven Carpet */}
          <Link to="/history" className="group rounded-2xl overflow-hidden bg-white border border-stone-200 hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative h-64 overflow-hidden bg-stone-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Carpet_2022.jpg"
                alt="12-Year Hand-Woven Carpet"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold font-mono text-amber-800 uppercase tracking-wider">
                Historic Textile
              </div>
            </div>
            <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-cinzel font-bold text-stone-900 text-lg group-hover:text-amber-700 transition-colors">
                  12-Year Persian Carpet
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2">
                  Asia's largest hand-knotted woolen carpet woven over 12 continuous years inside Gwalior Prison.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-800 flex items-center space-x-1 pt-3 border-t border-stone-100">
                <span>View Textile Wonder</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Photo Masonry Grid (Visual Richness) */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-900">
            Palace Gallery Album
          </h2>
          <span className="text-xs text-stone-500 font-mono">Authentic Wikimedia Archives</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl overflow-hidden bg-stone-100 h-44 shadow-sm group relative">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Jai_Vilas_Mahal_Facade.jpg"
              alt="Neoclassical facade"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-semibold font-cinzel">Tuscan Facade</span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden bg-stone-100 h-44 shadow-sm group relative">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Carpet_2022.jpg"
              alt="12-Year Persian Carpet"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-semibold font-cinzel">12-Year Carpet</span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden bg-stone-100 h-44 shadow-sm group relative">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Inside_view_of_Jaivilas_Palace_Gwalior_-_panoramio.jpg"
              alt="Interior halls"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-semibold font-cinzel">Crystal Gallery</span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden bg-stone-100 h-44 shadow-sm group relative">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/02/Fort_Gwalior-_India_02.jpg"
              alt="Gwalior Fort"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-semibold font-cinzel">Gwalior Citadel</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

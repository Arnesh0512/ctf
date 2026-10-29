import React from 'react';
import { 
  Compass, 
  Clock, 
  Ticket, 
  MapPin, 
  Plane, 
  Train as TrainIcon, 
  Navigation, 
  Shield, 
  Camera, 
  Info,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function Tourism() {
  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="bg-white border border-amber-200/90 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Official Visitor Guide &bull; Madhya Pradesh Tourism</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 tracking-tight leading-tight">
            Jai Vilas Museum &amp; Tourism Guide
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            Plan your visit to the <strong>H.H. Maharaja Sir Jiwaji Rao Scindia Museum</strong> in Gwalior. Explore visiting hours, admission rates, travel logistics, and key royal exhibits.
          </p>
        </div>

        {/* Decorative blur */}
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-amber-100/40 rounded-full blur-2xl pointer-events-none"></div>
      </section>

      {/* Timings & Admission Fees */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Timings */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-cinzel font-bold text-stone-900">Visiting Hours &amp; Days</h2>
              <p className="text-xs text-stone-500">H.H. Scindia Museum, Lashkar, Gwalior</p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm font-sans text-stone-700">
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-semibold text-stone-900">Opening Hours</span>
              <span className="font-mono font-bold text-amber-900">10:00 AM &ndash; 05:00 PM</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-semibold text-stone-900">Operating Days</span>
              <span className="text-stone-700">Thursday through Tuesday</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50/70 rounded-xl border border-red-200 text-red-800">
              <span className="font-semibold">Weekly Closed Day</span>
              <span className="font-bold">Every Wednesday</span>
            </div>

            <p className="text-[11px] text-stone-500 pt-1 leading-relaxed">
              * Ticket counter closes at 04:30 PM. The museum remains closed on select national holidays (Republic Day, Independence Day, Gandhi Jayanti).
            </p>
          </div>
        </div>

        {/* Card 2: Ticket Tariffs */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-cinzel font-bold text-stone-900">Admission Rates</h2>
              <p className="text-xs text-stone-500">Per visitor tariffs &amp; photography permits</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm font-sans text-stone-700">
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-medium text-stone-900">Indian Citizens</span>
              <span className="font-mono font-bold text-amber-900">₹300 / person</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-medium text-stone-900">Foreign Tourists</span>
              <span className="font-mono font-bold text-amber-900">₹1,000 / person</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-medium text-stone-900">Camera / Still Photography</span>
              <span className="font-mono font-bold text-amber-900">₹100</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-medium text-stone-900">Children (Under 5 years)</span>
              <span className="font-mono font-bold text-emerald-700">Free Entry</span>
            </div>
          </div>
        </div>
      </section>

      {/* The 35 Public Galleries of Scindia Museum */}
      <section className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center space-x-2 text-xs text-amber-800 font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Inaugurated in 1964 by President S. Radhakrishnan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
            The 35 Public Galleries &amp; Collections
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            Out of 400 chambers in Jai Vilas Palace, 35 palatial rooms constitute the grand museum complex displaying centuries of Maratha regalia:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-200/80 text-amber-900 flex items-center justify-center font-cinzel font-bold text-xs">
              01
            </div>
            <h3 className="text-sm font-cinzel font-bold text-stone-900">Royal Armoury</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Displays personal blades including the historic sword of Mughal Emperor Aurangzeb, Maratha curved talwars, jewel-encrusted shields, and silver daggers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-200/80 text-amber-900 flex items-center justify-center font-cinzel font-bold text-xs">
              02
            </div>
            <h3 className="text-sm font-cinzel font-bold text-stone-900">Vintage Carriages</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Houses the solid silver ceremonial buggy, Victorian horse-drawn coaches, and vintage royal automobiles used in state coronations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-200/80 text-amber-900 flex items-center justify-center font-cinzel font-bold text-xs">
              03
            </div>
            <h3 className="text-sm font-cinzel font-bold text-stone-900">Crystal &amp; Glass</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Exquisite Bohemian glass, crystal fountains, Venetian cut mirrors, and imported French dining table sets with royal Scindia crest engravings.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-200/80 text-amber-900 flex items-center justify-center font-cinzel font-bold text-xs">
              04
            </div>
            <h3 className="text-sm font-cinzel font-bold text-stone-900">Textiles &amp; Zari</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Antique silk Chanderi sarees, gold-woven Maratha pagris (turbans), and velvet coronation coats with real pearls and gold zari threads.
            </p>
          </div>
        </div>
      </section>

      {/* How to Reach Gwalior */}
      <section className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
          How to Reach Gwalior
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center space-x-2 text-amber-800 font-bold">
              <Plane className="w-5 h-5 text-amber-700" />
              <h3 className="text-sm font-cinzel font-bold text-stone-900">By Air</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              <strong>Rajmata Vijaya Raje Scindia Airport (GWL)</strong> is located approximately 14 km from the palace, offering direct daily flights to New Delhi, Mumbai, Bengaluru, Hyderabad, and Ahmedabad.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center space-x-2 text-amber-800 font-bold">
              <TrainIcon className="w-5 h-5 text-amber-700" />
              <h3 className="text-sm font-cinzel font-bold text-stone-900">By Rail</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              <strong>Gwalior Junction (GWL)</strong> is a premier station on the Delhi-Mumbai / Delhi-Chennai railway corridor, served by high-speed trains like Vande Bharat, Bhopal Shatabdi, and Gatimaan Express.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center space-x-2 text-amber-800 font-bold">
              <Navigation className="w-5 h-5 text-amber-700" />
              <h3 className="text-sm font-cinzel font-bold text-stone-900">By Road</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Connected via National Highway 44 (NH 44). Gwalior is an effortless drive from Agra (120 km / 2.5 hrs), Jhansi (100 km / 2 hrs), and New Delhi (320 km / 5 hrs via Yamuna Expressway).
            </p>
          </div>
        </div>
      </section>

      {/* Nearby Heritage Trail */}
      <section className="bg-amber-50/50 border border-amber-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
            Gwalior Heritage Circuit
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Complement your Jai Vilas Palace visit with these iconic historical monuments:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm space-y-1.5">
            <span className="text-xs font-bold text-amber-800">01. Gwalior Fort</span>
            <p className="text-xs text-stone-600 leading-relaxed">
              Described as &ldquo;the pearl in the necklace of the forts of Hind&rdquo; by Mughal Emperor Babur.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm space-y-1.5">
            <span className="text-xs font-bold text-amber-800">02. Saas-Bahu Temples</span>
            <p className="text-xs text-stone-600 leading-relaxed">
              11th-century architectural marvel dedicated to Lord Vishnu with intricate carvings.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm space-y-1.5">
            <span className="text-xs font-bold text-amber-800">03. Tomb of Tansen</span>
            <p className="text-xs text-stone-600 leading-relaxed">
              Memorial to the legendary musician Tansen, one of the Nine Gems in Emperor Akbar's court.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm space-y-1.5">
            <span className="text-xs font-bold text-amber-800">04. Sun Temple</span>
            <p className="text-xs text-stone-600 leading-relaxed">
              Inspired by Konark Sun Temple, built with radiant red sandstone and immaculate marble.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

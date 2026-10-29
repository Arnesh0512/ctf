import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Clock, 
  Ticket, 
  MapPin, 
  Plane, 
  Train as TrainIcon, 
  Navigation, 
  ShieldCheck, 
  Camera, 
  Sparkles,
  ArrowRight,
  Landmark,
  CheckCircle2
} from 'lucide-react';

export default function Tourism() {
  const highlights = [
    {
      title: 'Scindia Art & Armoury Gallery',
      desc: 'Blades of Emperor Aurangzeb, royal Maratha talwars, and diamond-studded ceremonial shields.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Art_collection_Scindia_Palace.jpg',
      badge: 'Chamber 12'
    },
    {
      title: 'Imperial Silver Buggy',
      desc: 'Solid sterling silver royal carriage used in coronation processions and state receptions.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Cart_Jai_vilas_palace_gwalior.jpg',
      badge: 'Coach Gallery'
    },
    {
      title: 'Grand Durbar Hall',
      desc: '560 kg gold-gilded ceiling, twin 3.5-ton Belgian crystal chandeliers, and Asia’s largest carpet.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/DUrbar_hall_at_jai_vilas_palace.JPG',
      badge: 'Masterpiece'
    },
    {
      title: 'Gwalior Fort & Heritage',
      desc: 'The iconic 8th-century citadel perched high above Gwalior, just 5 km from the palace.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Fort_Gwalior-_India_02.jpg',
      badge: 'Heritage Circuit'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="bg-white border border-amber-200/90 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Madhya Pradesh Tourism &bull; Official Visitor Guide</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-cinzel font-extrabold text-stone-900 tracking-tight">
            Jai Vilas Museum Guide
          </h1>
          <p className="text-stone-600 text-sm sm:text-base font-sans">
            Essential visitor tariffs, opening hours, transport links, and key galleries across 35 palatial museum chambers.
          </p>
        </div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-amber-100/50 rounded-full blur-2xl pointer-events-none"></div>
      </section>

      {/* Quick Glance Key Stats (Hours & Admission) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-amber-200/90 shadow-sm hover:border-amber-400 transition-colors space-y-1.5">
          <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Hours</span>
          </div>
          <p className="text-xl sm:text-2xl font-cinzel font-extrabold text-stone-900">10 AM – 5 PM</p>
          <p className="text-xs text-stone-500 font-sans">Thursday to Tuesday</p>
          <span className="inline-block text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded mt-1">
            Closed Wednesdays
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-200/90 shadow-sm hover:border-amber-400 transition-colors space-y-1.5">
          <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Ticket className="w-4 h-4 text-amber-600" />
            <span>Indian Citizens</span>
          </div>
          <p className="text-xl sm:text-2xl font-cinzel font-extrabold text-stone-900">₹300</p>
          <p className="text-xs text-stone-500 font-sans">Per adult entry</p>
          <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded mt-1">
            Under 5: Free
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-200/90 shadow-sm hover:border-amber-400 transition-colors space-y-1.5">
          <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Ticket className="w-4 h-4 text-amber-600" />
            <span>Foreign Tourists</span>
          </div>
          <p className="text-xl sm:text-2xl font-cinzel font-extrabold text-stone-900">₹1,000</p>
          <p className="text-xs text-stone-500 font-sans">Includes audio guide</p>
          <span className="inline-block text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded mt-1">
            All 35 Galleries
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-200/90 shadow-sm hover:border-amber-400 transition-colors space-y-1.5">
          <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-4 h-4 text-amber-600" />
            <span>Still Camera</span>
          </div>
          <p className="text-xl sm:text-2xl font-cinzel font-extrabold text-stone-900">₹100</p>
          <p className="text-xs text-stone-500 font-sans">Personal photography</p>
          <span className="inline-block text-[11px] font-bold text-stone-600 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded mt-1">
            Tripods Restricted
          </span>
        </div>
      </section>

      {/* Visual Gallery Showcase */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
            Key Royal Exhibits
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Selected highlights among the 35 public galleries of H.H. Sir Jiwaji Rao Scindia Museum:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden border border-amber-200/90 hover:border-amber-400 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-400/40 font-semibold">
                  {item.badge}
                </span>
              </div>
              <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-cinzel font-bold text-stone-900 text-sm leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Reach - Compact 3-Column Strip */}
      <section className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
          How to Reach Jai Vilas Palace
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#faf8f5] border border-amber-200/70 space-y-2">
            <div className="flex items-center space-x-2 text-amber-800 font-bold">
              <Plane className="w-5 h-5 text-amber-700" />
              <h3 className="font-cinzel font-bold text-stone-900 text-sm">Gwalior Airport (GWL)</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              14 km away. Daily direct flights connecting New Delhi, Mumbai, Bengaluru, Hyderabad, and Ahmedabad.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#faf8f5] border border-amber-200/70 space-y-2">
            <div className="flex items-center space-x-2 text-amber-800 font-bold">
              <TrainIcon className="w-5 h-5 text-amber-700" />
              <h3 className="font-cinzel font-bold text-stone-900 text-sm">Gwalior Junction (GWL)</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              4 km away. Superfast connectivity via Vande Bharat, Gatimaan, and Bhopal Shatabdi Express.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#faf8f5] border border-amber-200/70 space-y-2">
            <div className="flex items-center space-x-2 text-amber-800 font-bold">
              <Navigation className="w-5 h-5 text-amber-700" />
              <h3 className="font-cinzel font-bold text-stone-900 text-sm">National Highway 44</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Scenic highway drive: 120 km from Agra (2.5 hrs) and 320 km from New Delhi via Yamuna Expressway.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Vault Banner */}
      <section className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-8 sm:p-10 shadow-lg shadow-amber-600/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-xs uppercase tracking-widest text-amber-200 font-bold">Restricted Sanctum</p>
          <h3 className="text-2xl font-cinzel font-black">
            Access the Palace Treasure
          </h3>
          <p className="text-xs text-amber-100 font-sans max-w-lg">
            Authorized royal visitors can test their clearance key at the sovereign vault gate.
          </p>
        </div>
        <Link
          to="/vault"
          className="shrink-0 bg-white text-stone-950 hover:bg-stone-100 font-cinzel font-bold text-xs tracking-wider px-6 py-3.5 rounded-xl shadow-md flex items-center space-x-2 transition-transform active:scale-95"
        >
          <span>PROCEED TO VAULT</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

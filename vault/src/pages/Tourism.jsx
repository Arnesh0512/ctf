import React from 'react';
import { 
  Clock, 
  Ticket, 
  Plane, 
  Train as TrainIcon, 
  Navigation, 
  Camera,
  Calendar,
  Headphones,
  Car,
  Luggage,
  Accessibility,
  Sun,
  MapPin
} from 'lucide-react';

export default function Tourism() {
  const nearbyAttractions = [
    {
      name: 'Gwalior Fort',
      distance: '5 km away',
      tag: 'Hilltop Fortress',
      image: '/images/fort_gwalior-_india_02.jpg',
      desc: 'Iconic 8th-century citadel featuring Man Mandir Palace and daily evening sound & light shows.'
    },
    {
      name: 'Tomb of Tansen',
      distance: '4 km away',
      tag: 'Mughal Monument',
      image: '/images/tomb_of_tansen__gwalior.jpg',
      desc: 'Historic memorial dedicated to Tansen, Akbar’s court musician and father of Hindustani classical music.'
    },
    {
      name: 'Palace Grounds & Estate',
      distance: 'On-Site',
      tag: 'Visitor Gateway',
      image: '/images/jai_vilas_mahal_facade.jpg',
      desc: 'Ticket counters, visitor reception, audio guide collection, and vehicle parking facility.'
    }
  ];

  const travelModes = [
    {
      icon: Plane,
      hub: 'Gwalior Airport (GWL)',
      distance: '14 km from Palace',
      routes: 'Daily flights connecting New Delhi, Mumbai, Bengaluru, Hyderabad, and Ahmedabad.'
    },
    {
      icon: TrainIcon,
      hub: 'Gwalior Junction (GWL)',
      distance: '4 km from Palace',
      routes: 'Major rail junction served by Vande Bharat, Gatimaan, and Bhopal Shatabdi Express.'
    },
    {
      icon: Navigation,
      hub: 'National Highway 44',
      distance: 'Direct Highway Drive',
      routes: 'Effortless road access: 120 km from Agra (2.5 hrs) and 320 km from Delhi via Yamuna Expressway.'
    }
  ];

  const visitorAmenities = [
    { icon: Headphones, label: 'Audio Guides', desc: 'English, Hindi, and French headsets at ticket desk.' },
    { icon: Car, label: 'On-Site Parking', desc: 'Dedicated free parking for cars and tour buses.' },
    { icon: Luggage, label: 'Visitor Cloakroom', desc: 'Secure luggage and baggage deposit at gate.' },
    { icon: Accessibility, label: 'Wheelchair Access', desc: 'Ramp entrances and mobility assistance available.' }
  ];

  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <section className="bg-white border border-amber-200/90 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <h1 className="text-3xl sm:text-5xl font-cinzel font-extrabold text-stone-900 tracking-tight relative z-10">
          Jai Vilas Museum Guide
        </h1>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-amber-100/50 rounded-full blur-2xl pointer-events-none"></div>
      </section>

      {/* 2. Visual Tariff & Hours Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-amber-200/90 shadow-sm hover:border-amber-400 transition-colors space-y-1.5">
          <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Visiting Hours</span>
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
          <p className="text-xs text-stone-500 font-sans">Adult admission</p>
          <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded mt-1">
            Children Under 5: Free
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-200/90 shadow-sm hover:border-amber-400 transition-colors space-y-1.5">
          <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Ticket className="w-4 h-4 text-amber-600" />
            <span>Foreign Visitors</span>
          </div>
          <p className="text-xl sm:text-2xl font-cinzel font-extrabold text-stone-900">₹1,000</p>
          <p className="text-xs text-stone-500 font-sans">Includes audio guide</p>
          <span className="inline-block text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded mt-1">
            All Public Galleries
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-200/90 shadow-sm hover:border-amber-400 transition-colors space-y-1.5">
          <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-4 h-4 text-amber-600" />
            <span>Photography</span>
          </div>
          <p className="text-xl sm:text-2xl font-cinzel font-extrabold text-stone-900">₹100</p>
          <p className="text-xs text-stone-500 font-sans">Still camera permit</p>
          <span className="inline-block text-[11px] font-bold text-stone-600 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded mt-1">
            Tripods Restricted
          </span>
        </div>
      </section>

      {/* 3. Best Season & Planning Ribbon */}
      <section className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-amber-600/20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Best Season</span>
            </div>
            <p className="text-xl font-cinzel font-bold">October – March</p>
            <p className="text-xs text-amber-100">Mild 15°C to 25°C winter climate ideal for touring.</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Sun className="w-4 h-4" />
              <span>Optimal Timing</span>
            </div>
            <p className="text-xl font-cinzel font-bold">10:00 AM – 1:00 PM</p>
            <p className="text-xs text-amber-100">Best natural daylight through courtyard colonnades.</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Tour Duration</span>
            </div>
            <p className="text-xl font-cinzel font-bold">2 to 2.5 Hours</p>
            <p className="text-xs text-amber-100">Recommended time for museum and courtyard grounds.</p>
          </div>
        </div>
      </section>

      {/* 4. Nearby Attractions / Day Trips (Image-Driven) */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
            Gwalior Sightseeing Circuit
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Iconic landmarks to combine with your Jai Vilas Palace visit:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nearbyAttractions.map((place, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl overflow-hidden border border-amber-200/90 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-amber-900 border border-amber-200 shadow-sm">
                  {place.tag}
                </div>

                <div className="absolute bottom-3 right-3 bg-amber-500/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-right text-stone-950 shadow-md">
                  <p className="text-xs font-mono font-bold">{place.distance}</p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-1.5">
                <h3 className="font-cinzel font-bold text-stone-900 text-lg leading-snug">
                  {place.name}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm font-sans leading-relaxed">
                  {place.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. How to Reach Gwalior */}
      <section className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
          How to Reach Gwalior
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {travelModes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-[#faf8f5] border border-amber-200/70 space-y-2">
                <div className="flex items-center space-x-2 text-amber-800 font-bold">
                  <Icon className="w-5 h-5 text-amber-700" />
                  <h3 className="font-cinzel font-bold text-stone-900 text-sm">{item.hub}</h3>
                </div>
                <p className="text-[11px] font-mono text-amber-900 font-semibold">{item.distance}</p>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {item.routes}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. On-Site Visitor Facilities */}
      <section className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
          Visitor Facilities
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {visitorAmenities.map((facility, idx) => {
            const Icon = facility.icon;
            return (
              <div key={idx} className="p-4 rounded-xl bg-[#faf8f5] border border-stone-200 space-y-1.5">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 mb-2">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="font-cinzel font-bold text-stone-900 text-xs sm:text-sm">{facility.label}</p>
                <p className="text-[11px] text-stone-500 font-sans leading-relaxed">{facility.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

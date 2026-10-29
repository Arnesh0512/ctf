import React from 'react';
import { 
  Clock, 
  Ticket, 
  Plane, 
  Train as TrainIcon, 
  Navigation, 
  Camera,
  Headphones,
  Footprints,
  Accessibility,
  Hourglass,
  MapPin,
  Sun,
  ShieldCheck
} from 'lucide-react';

export default function Tourism() {
  const visitorTips = [
    {
      title: 'Multilingual Audio Guides',
      badge: 'Self-Guided',
      desc: 'Smart audio headsets available at the reception ticket counter in English, Hindi, and French for detailed architectural narrations.',
      icon: Headphones
    },
    {
      title: 'Carpet Preservation Policy',
      badge: 'Heritage Care',
      desc: 'Complimentary protective shoe covers are provided before entering the Grand Durbar Hall to preserve the 12-year historic Persian rug.',
      icon: Footprints
    },
    {
      title: 'Accessibility & Cloakroom',
      badge: 'Amenities',
      desc: 'Wheelchair assistance and ramp access are available at palace entrances. Secure cloakroom storage provided for bags and luggage.',
      icon: Accessibility
    },
    {
      title: 'Tour Duration & Timing',
      badge: 'Planning',
      desc: 'Recommended tour duration is 2 to 2.5 hours. Visiting between 10:00 AM and 1:00 PM offers the best natural sunlight across the halls.',
      icon: Hourglass
    }
  ];

  const nearbyMonuments = [
    {
      name: 'Gwalior Fort',
      distance: '5 km away',
      desc: 'An 8th-century hilltop fortress described by Mughal Emperor Babur as the pearl among Indian forts, housing Man Mandir Palace.'
    },
    {
      name: 'Tomb of Tansen',
      distance: '4 km away',
      desc: 'Mughal architectural memorial dedicated to the legendary musician Tansen, one of the Navratnas (Nine Jewels) of Emperor Akbar.'
    },
    {
      name: 'Saas-Bahu Temples',
      distance: '5.5 km away',
      desc: '11th-century twin sandstone temples dedicated to Lord Vishnu, celebrated for intricately carved pillars and geometric ceilings.'
    },
    {
      name: 'Sun Temple (Suraj Kund)',
      distance: '6 km away',
      desc: 'A red sandstone temple modeled after the famous Konark Sun Temple in Odisha, surrounded by serene landscaped gardens.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="bg-white border border-amber-200/90 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <h1 className="text-3xl sm:text-5xl font-cinzel font-extrabold text-stone-900 tracking-tight relative z-10">
          Jai Vilas Museum Guide
        </h1>
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

      {/* Visitor Tips & Regulations */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
            Visitor Guidelines &amp; Amenities
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Essential guidelines for an enjoyable tour of the Scindia Museum:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visitorTips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-amber-200/90 hover:border-amber-400 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {tip.badge}
                    </span>
                  </div>
                  <h3 className="font-cinzel font-bold text-stone-900 text-base leading-snug">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              </div>
            );
          })}
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

      {/* Gwalior Heritage Circuit */}
      <section className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
            Gwalior Heritage Circuit
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Historical landmarks to visit alongside Jai Vilas Palace:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nearbyMonuments.map((place, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#faf8f5] border border-amber-200/70 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  {place.distance}
                </span>
              </div>
              <h3 className="font-cinzel font-bold text-stone-900 text-sm">
                {place.name}
              </h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                {place.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

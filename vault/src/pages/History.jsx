import React from 'react';
import { BookOpen, Layers, Landmark, Calendar, Crown, Shield } from 'lucide-react';

export default function History() {
  const milestones = [
    {
      year: '1761',
      title: 'Rise of the Scindia Dynasty',
      subtitle: 'Mahadji Scindia & Maratha Hegemony',
      image: '/images/fort_gwalior-_india_02.jpg',
      stat: '1761–1794',
      statLabel: 'Maratha Empire',
      desc: 'Following the Third Battle of Panipat, Mahadji Scindia rebuilt Maratha power across North India, securing Gwalior Fort as the royal capital and founding one of India’s most influential princely states.'
    },
    {
      year: '1874',
      title: 'The Palace Commission',
      subtitle: 'Conceived by Jayaji Rao Scindia',
      image: '/images/jai_vilas_mahal_facade.jpg',
      stat: '₹1 CRORE',
      statLabel: '1874 Construction Cost',
      desc: 'Maharaja Jayaji Rao Scindia commissioned Italian-British architect Sir Michael Filose to design an opulent European-style palace combining Italian Neoclassical symmetry with Indian palace craftsmanship.'
    },
    {
      year: '1875',
      title: 'Imperial Visit of King Edward VII',
      subtitle: 'Commemoration of the Prince of Wales Tour',
      image: '/images/the_jai_vilas_palace__gwalior_.jpg',
      stat: '21 GUN SALUTE',
      statLabel: 'Princely Precedence',
      desc: 'The palace was inaugurated to host the Prince of Wales (later King Edward VII) during his 1875 royal tour, establishing Gwalior among the highest-ranking princely kingdoms in British India.'
    },
    {
      year: '1948',
      title: 'Indian Integration & Public Museum',
      subtitle: 'Accession to Union of India & 1964 Trust',
      image: '/images/inside_view_of_jaivilas_palace_gwalior_-_panoramio.jpg',
      stat: '1948–1964',
      statLabel: 'Heritage Conversion',
      desc: 'Maharaja Jiwaji Rao Scindia integrated Gwalior state into independent India. In 1964, Rajmata Vijaya Raje Scindia opened 35 royal chambers to the public as the H.H. Sir Jiwaji Rao Scindia Museum.'
    }
  ];

  const orders = [
    {
      num: '01',
      name: 'Tuscan Order',
      floor: 'Ground Level',
      desc: 'Massive sandstone rustication and heavy colonnaded archways designed to anchor 400 chambers and accommodate royal cavalry.'
    },
    {
      num: '02',
      name: 'Italian-Doric',
      floor: 'Second Level',
      desc: 'Fluted columns, balanced architraves, and classical pediments housing the state reception suites and private chambers.'
    },
    {
      num: '03',
      name: 'Corinthian Order',
      floor: 'Third Level',
      desc: 'The pinnacle of classical elegance, crowned with intricate acanthus-leaf capitals and gilded 41-foot ceilings.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="bg-white border border-amber-200/90 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <h1 className="text-3xl sm:text-5xl font-cinzel font-extrabold text-stone-900 tracking-tight relative z-10">
          History of Jai Vilas Palace
        </h1>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-amber-100/50 rounded-full blur-2xl pointer-events-none"></div>
      </section>

      {/* 4 Historical Timeline Milestones */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {milestones.map((item, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-3xl overflow-hidden border border-amber-200/90 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>

              {/* Year Tag */}
              <div className="absolute top-4 left-4 bg-amber-600 text-white font-cinzel font-bold px-3 py-1 rounded-full text-xs shadow-md">
                {item.year}
              </div>

              {/* Stat Badge */}
              <div className="absolute bottom-4 right-4 bg-amber-500/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-right shadow-md text-stone-950">
                <p className="text-lg font-cinzel font-black leading-tight">{item.stat}</p>
                <p className="text-[10px] font-sans font-bold uppercase tracking-wider">{item.statLabel}</p>
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-1">
                  {item.subtitle}
                </p>
                <h2 className="text-xl font-cinzel font-bold text-stone-900 leading-snug">
                  {item.title}
                </h2>
                <p className="text-stone-600 text-xs sm:text-sm font-sans mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Classical Architecture Hierarchy */}
      <section className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-amber-800 font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>Three European Classical Orders</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900 mt-1">
              Architectural Orders of 1874
            </h2>
          </div>
          <span className="text-xs font-mono bg-stone-100 text-stone-600 px-3 py-1.5 rounded-full border border-stone-200 w-fit">
            Designed by Sir Michael Filose
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {orders.map((order, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#faf8f5] border border-amber-200/80 hover:border-amber-400 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-cinzel font-black text-2xl text-amber-800">{order.num}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 bg-white px-2.5 py-0.5 rounded-full border border-stone-200">
                  {order.floor}
                </span>
              </div>
              <h3 className="text-lg font-cinzel font-bold text-stone-900">
                {order.name}
              </h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                {order.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

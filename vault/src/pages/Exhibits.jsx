import React from 'react';
import { Sparkles, Layers, Image as ImageIcon } from 'lucide-react';

export default function Exhibits() {
  const exhibits = [
    {
      title: 'The Grand Durbar Hall & Chandeliers',
      category: 'Throne Chamber',
      stat: '3.5 TONNES',
      statLabel: 'Twin Crystal Chandeliers',
      image: '/images/durbar_hall_at_jai_vilas_palace.jpg',
      desc: 'Suspended beneath a 41-foot ceiling gilded with 560 kg of pure gold leaf, these Belgian chandeliers each hold 250 electric bulbs. Eight elephants were marched onto the roof in 1874 to test its structural load.'
    },
    {
      title: 'The Solid Silver Banquet Train',
      category: 'Mechanical Novelty',
      stat: '40 SEATS',
      statLabel: 'Italian Marble Table',
      image: '/images/cart_jai_vilas_palace_gwalior.jpg',
      desc: 'A custom sterling silver miniature train that glided across silver rails embedded into the banquet table. It served cognac, liqueurs, and cigars to royal guests, stopping automatically when a decanter was lifted.'
    },
    {
      title: "Asia's Largest Hand-Woven Carpet",
      category: 'Textile Masterwork',
      stat: '12 YEARS',
      statLabel: '100 × 50 Feet',
      image: '/images/carpet_2022.jpg',
      desc: 'Spanning the entirety of the Durbar Hall floor, this monumental woolen Persian carpet was hand-knotted by master weaver inmates inside Gwalior Central Prison over twelve continuous years.'
    },
    {
      title: 'The Royal Scindia Armoury',
      category: 'Weaponry & Regalia',
      stat: 'HISTORIC BLADES',
      statLabel: 'Chamber 12',
      image: '/images/art_collection_scindia_palace.jpg',
      desc: 'Featuring the historic personal sword of Mughal Emperor Aurangzeb, Maratha curved talwars, jewel-encrusted ceremonial shields, and Damascus steel blades used by Scindia warriors.'
    },
    {
      title: 'Ceremonial Silver Buggy & Carriages',
      category: 'Imperial Transport',
      stat: 'SOLID STERLING',
      statLabel: 'Royal Processions',
      image: '/images/jai_vilas_mahal_facade.jpg',
      desc: 'The ceremonial horse-drawn carriage cast in solid sterling silver, used by the Maharajas of Gwalior for state coronations, royal durbars, and welcoming imperial dignitaries.'
    },
    {
      title: 'Bohemian Glass & Crystal Fountains',
      category: 'European Decorative Arts',
      stat: 'VENETIAN & BAVARIAN',
      statLabel: 'Crystal Wing',
      image: '/images/inside_view_of_jaivilas_palace_gwalior_-_panoramio.jpg',
      desc: 'A rare collection of European cut glass fountains, towering Venetian mirrors, and French porcelain dinner sets custom-engraved with the Scindia royal crest.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="bg-white border border-amber-200/90 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <h1 className="text-3xl sm:text-5xl font-cinzel font-extrabold text-stone-900 tracking-tight relative z-10">
          Palace Exhibits
        </h1>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-amber-100/50 rounded-full blur-2xl pointer-events-none"></div>
      </section>

      {/* 6 Visual Exhibit Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exhibits.map((item, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-3xl overflow-hidden border border-amber-200/90 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-60 w-full overflow-hidden bg-stone-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>

              {/* Category Tag */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-amber-900 border border-amber-200 shadow-sm">
                {item.category}
              </div>

              {/* Stat Badge */}
              <div className="absolute bottom-3 right-3 bg-amber-500/95 backdrop-blur-md px-3 py-1 rounded-xl text-right text-stone-950 shadow-md">
                <p className="text-sm font-cinzel font-black leading-tight">{item.stat}</p>
                <p className="text-[9px] font-sans font-bold uppercase tracking-wider">{item.statLabel}</p>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="font-cinzel font-bold text-stone-900 text-lg leading-snug">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm font-sans mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

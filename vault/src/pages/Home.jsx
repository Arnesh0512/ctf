import React from 'react';
import { Building2, Book, Flower2, Droplets } from 'lucide-react';

export default function Home() {
  const estateFeatures = [
    {
      title: 'A Living Royal Residence',
      tag: 'Private Sovereign Wing',
      stat: '400 ROOMS',
      statLabel: '124,000 Sq Ft Estate',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/The_Jai_Vilas_Palace_%28Gwalior%29.jpg',
      desc: 'Unlike static monuments, Jai Vilas remains a living palace where descendants of the Scindia dynasty continue to reside in private residential wings alongside the public heritage estate.'
    },
    {
      title: 'The Imperial Palace Library',
      tag: 'Rare Literary Archives',
      stat: '7,000+ BOOKS',
      statLabel: 'Historic Manuscripts',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Inside_view_of_Jaivilas_Palace_Gwalior_-_panoramio.jpg',
      desc: 'Preserves an extensive private collection of rare historical literature, illuminated Persian texts, Sanskrit philosophical treatises, and sovereign state documents of the Gwalior court.'
    },
    {
      title: 'Italianate Courtyards & Lawns',
      tag: 'Palace Grounds',
      stat: 'CLASSICAL LOGGIAS',
      statLabel: 'Tiered Fountains',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Jai_Vilas_Mahal_Facade.jpg',
      desc: 'Sprawling central light-well courtyards designed on European country estate plans, framed by classical sandstone balustrades, manicured lawns, and carved marble fountains.'
    },
    {
      title: 'Private Quarters & Royal Baths',
      tag: 'Residential Architecture',
      stat: 'INDOOR POOLS',
      statLabel: 'Marble Enclaves',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Art_collection_Scindia_Palace.jpg',
      desc: 'Featuring unique 19th-century royal residential amenities, including indoor spring baths, decorative ladies’ bathing chambers, and private family reception suites.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* 1. Cinematic Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl border border-amber-200/90 group">
        <div className="relative h-[420px] sm:h-[500px] w-full overflow-hidden bg-stone-900">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/07/The_Jai_Vilas_Palace_%28Gwalior%29.jpg"
            alt="Jai Vilas Palace exterior facade"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent"></div>

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-end max-w-2xl space-y-3 text-white">
            <h1 className="text-3xl sm:text-6xl font-cinzel font-extrabold tracking-tight leading-none text-white drop-shadow-md">
              Jai Vilas Palace
            </h1>
            <p className="text-stone-200 text-sm sm:text-base font-sans leading-relaxed drop-shadow">
              A 19th-century royal residence and architectural landmark of central India, spanning over 124,000 square feet in the historic heart of Gwalior.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Estate Architecture & Life (Non-Duplicated Features) */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
            The Sovereign Estate
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Architectural features and living heritage unique to the 400-room Jai Vilas estate:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {estateFeatures.map((item, idx) => (
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

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-900 border border-amber-200 shadow-sm">
                  {item.tag}
                </div>

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
        </div>
      </section>
    </div>
  );
}

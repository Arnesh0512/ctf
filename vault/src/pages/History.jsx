import React from 'react';
import { 
  BookOpen, 
  Layers
} from 'lucide-react';

export default function History() {
  const stories = [
    {
      title: 'The 1874 Imperial Commission',
      subtitle: 'Built for the Royal Visit of King Edward VII',
      stat: '₹1 CRORE',
      statLabel: '1874 Silver Currency',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Jai_Vilas_Mahal_Facade.jpg',
      tag: '1874 Genesis',
      description: 'Maharaja Jayaji Rao Scindia commissioned Italian-British architect Sir Michael Filose to craft India’s most extravagant Neoclassical palace for the 1875 Prince of Wales tour.'
    },
    {
      title: 'The 8 Elephants Roof Test',
      subtitle: '7-Tonne Belgian Crystal Chandeliers',
      stat: '8 ELEPHANTS',
      statLabel: '7 Days on Palace Roof',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/DUrbar_hall_at_jai_vilas_palace.JPG',
      tag: 'Engineering Feat',
      description: 'Doubting if the ceiling could hold twin 3.5-ton crystal chandeliers, Sir Filose walked 8 royal elephants up an earthen ramp to test the roof strength for seven days.'
    },
    {
      title: 'Solid Silver Banquet Train',
      subtitle: 'Automated Royal Hospitality',
      stat: '40 SEATS',
      statLabel: 'Italian Marble Table',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Cart_Jai_vilas_palace_gwalior.jpg',
      tag: 'Mechanical Marvel',
      description: 'A sterling silver miniature locomotive glided along silver tracks across the 40-seat marble table, delivering cognac and cigars. Lifting a decanter broke the circuit to stop the train.'
    },
    {
      title: "Asia’s Largest Hand-Woven Carpet",
      subtitle: 'Gwalior Central Prison Masterwork',
      stat: '12 YEARS',
      statLabel: '100 × 50 FT Durbar Hall',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Carpet_2022.jpg',
      tag: 'Textile Wonder',
      description: 'Woven by master artisan inmates over twelve continuous years, this colossal woolen Persian rug covers the entire Durbar Hall and remains in pristine original condition.'
    }
  ];

  const orders = [
    {
      num: '01',
      name: 'Tuscan Order',
      floor: 'Ground Level',
      desc: 'Heavy sandstone foundations and rusticated pillars built to anchor 400 chambers.'
    },
    {
      num: '02',
      name: 'Italian-Doric',
      floor: 'Second Level',
      desc: 'Fluted columns and classical architraves housing the royal reception chambers.'
    },
    {
      num: '03',
      name: 'Corinthian Order',
      floor: 'Third Level',
      desc: 'Acanthus leaf capitals and gilded 41-foot ceilings adorned with 560 kg pure gold leaf.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="bg-white border border-amber-200/90 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Visual Chronicles &bull; 1874 to Present</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-cinzel font-extrabold text-stone-900 tracking-tight">
            The Scindia Royal Legacy
          </h1>
          <p className="text-stone-600 text-sm sm:text-base font-sans">
            A visual retrospective of architectural audacity, royal European engineering, and dynastic opulence in Gwalior.
          </p>
        </div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-amber-100/50 rounded-full blur-2xl pointer-events-none"></div>
      </section>

      {/* 4 Visual Story Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((story, i) => (
          <div
            key={i}
            className="group bg-white rounded-3xl overflow-hidden border border-amber-200/90 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Visual Image container with stat overlay */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>

              {/* Tag Pill */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-900 border border-amber-200 shadow-sm">
                {story.tag}
              </div>

              {/* Stat Badge */}
              <div className="absolute bottom-4 right-4 bg-amber-500/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-right shadow-md text-stone-950">
                <p className="text-lg font-cinzel font-black leading-tight">{story.stat}</p>
                <p className="text-[10px] font-sans font-bold uppercase tracking-wider">{story.statLabel}</p>
              </div>
            </div>

            {/* Story text */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-1">
                  {story.subtitle}
                </p>
                <h2 className="text-xl font-cinzel font-bold text-stone-900 leading-snug">
                  {story.title}
                </h2>
                <p className="text-stone-600 text-xs sm:text-sm font-sans mt-2 leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 3 Classical Orders */}
      <section className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-amber-800 font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Three European Architectural Orders</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900 mt-1">
              Vertical Classical Hierarchy
            </h2>
          </div>
          <span className="text-xs font-mono bg-stone-100 text-stone-600 px-3 py-1.5 rounded-full border border-stone-200 w-fit">
            Designed by Sir Michael Filose (1874)
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

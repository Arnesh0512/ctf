import React from 'react';
import { 
  BookOpen, 
  Landmark, 
  Award, 
  Crown, 
  Train, 
  Sparkles, 
  Building2, 
  Calendar,
  CheckCircle2,
  Shield
} from 'lucide-react';

export default function History() {
  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="bg-white border border-amber-200/90 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Chronicles of 1874 &bull; The Maratha Scindia Legacy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 tracking-tight leading-tight">
            Architectural History of Jai Vilas Palace
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            A 19th-century marvel conceived by <strong>Maharaja Jayaji Rao Scindia</strong> and Italian-British architect 
            <strong> Sir Michael Filose</strong>, synthesizing classical European orders into India’s most opulent royal residence.
          </p>
        </div>

        {/* Background emblem */}
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-amber-100/40 rounded-full blur-2xl pointer-events-none"></div>
      </section>

      {/* Chapter 1: The Royal Genesis & Construction */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center space-x-2 text-xs text-amber-800 font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>1874 Commission &bull; Imperial Tour of 1875</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
            The Imperial Commission of 1874
          </h2>
          <div className="text-xs sm:text-sm text-stone-600 space-y-3 leading-relaxed font-sans">
            <p>
              In 1874, Maharaja Jayaji Rao Scindia commissioned the palace to serve as the seat of the princely state of Gwalior and to commemorate the royal visit of <strong>King Edward VII</strong> (then Prince of Wales) during his grand 1875 tour of the subcontinent.
            </p>
            <p>
              The palace was designed and erected under the supervision of <strong>Lieutenant Colonel Sir Michael Filose</strong>. Filose travelled extensively across Europe to study the grand palaces of Versailles, Rome, and Florence, bringing back European masters, Belgian glass blowers, and Venetian mirrors to craft the interiors.
            </p>
            <p>
              At the time of its completion in 1874, the construction cost was estimated at <strong>₹1 Crore (10 million silver rupees)</strong> &mdash; an astronomical sum equivalent to thousands of crores in contemporary value.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-100 text-xs">
            <div>
              <span className="text-stone-500 font-medium">Original Cost (1874):</span>
              <p className="font-cinzel font-bold text-amber-900">₹1,00,00,000</p>
            </div>
            <div>
              <span className="text-stone-500 font-medium">Lead Architect:</span>
              <p className="font-cinzel font-bold text-amber-900">Sir Michael Filose</p>
            </div>
            <div>
              <span className="text-stone-500 font-medium">Royal Patron:</span>
              <p className="font-cinzel font-bold text-amber-900">Jayaji Rao Scindia</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Jai_Vilas_Mahal_Facade.jpg"
            alt="Neoclassical facade of Jai Vilas Palace"
            className="w-full h-80 object-cover"
            loading="lazy"
          />
          <div className="p-4 bg-stone-50 text-xs text-stone-600 border-t border-stone-200">
            <strong>Neoclassical Facade:</strong> Highlighting the classical symmetry and European stone archways facing the central manicured courtyard.
          </div>
        </div>
      </section>

      {/* Chapter 2: The Three Classical Orders */}
      <section className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
            The Three Classical Architectural Orders
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            Unlike traditional Indian palaces of the era, Jai Vilas incorporates the Greco-Roman architectural hierarchy across its three distinct vertical stories:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center font-cinzel font-bold">
              I
            </div>
            <h3 className="text-base font-cinzel font-bold text-stone-900">
              Ground Level &bull; Tuscan Order
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Characterized by robust, unadorned columns, rusticated sandstone foundations, and heavy arched gateways designed to anchor the massive structure and accommodate royal cavalry.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center font-cinzel font-bold">
              II
            </div>
            <h3 className="text-base font-cinzel font-bold text-stone-900">
              Second Level &bull; Italian-Doric
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Featuring formal fluted pillars, balanced architraves, and classical pediments housing the state rooms, reception halls, and private suites of the Scindia rulers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center font-cinzel font-bold">
              III
            </div>
            <h3 className="text-base font-cinzel font-bold text-stone-900">
              Third Level &bull; Corinthian Order
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              The pinnacle of royal opulence, crowned with intricate acanthus-leaf capitals, gilded decorative moldings, and the world-famous Durbar Hall ceiling.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 3: The Durbar Hall & The 8 Elephants Test */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm">
        <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100 order-2 lg:order-1">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a0/DUrbar_hall_at_jai_vilas_palace.JPG"
            alt="Durbar Hall chandeliers and gilded ceiling"
            className="w-full h-80 object-cover"
            loading="lazy"
          />
          <div className="p-4 bg-stone-50 text-xs text-stone-600 border-t border-stone-200">
            <strong>The Durbar Hall:</strong> Gilded with 560 kilograms of pure gold leaf and housing the 3.5-ton Belgian crystal chandeliers.
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
          <div className="flex items-center space-x-2 text-xs text-amber-800 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>The Engineering Legend</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
            The 8 Elephants Chandelier Test
          </h2>
          <div className="text-xs sm:text-sm text-stone-600 space-y-3 leading-relaxed font-sans">
            <p>
              The Durbar Hall measures 100 feet in length, 50 feet in width, and rises 41 feet high. Its ceiling is covered with over <strong>560 kilograms of pure gold leaf</strong>.
            </p>
            <p>
              Suspended from the center are <strong>two of the world's largest Belgian crystal chandeliers</strong>, each 12.5 meters tall, weighing 3.5 tonnes, and holding 250 electric light bulbs.
            </p>
            <p className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/90 text-amber-950 font-medium">
              &ldquo;Before the monumental chandeliers were hoisted, Sir Michael Filose doubted whether the wooden and stone roof beams could sustain 7 tonnes of continuous suspended crystal. An earthen ramp was built up to the palace roof, and <strong>eight full-grown royal elephants were marched onto the ceiling and kept there for seven days</strong> to verify structural safety.&rdquo;
            </p>
            <p>
              The roof didn't budge by a single millimeter, proving the structural integrity before the chandeliers were mounted in their eternal positions.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 4: The Silver Model Train */}
      <section className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center space-x-2 text-xs text-amber-800 font-bold uppercase tracking-wider">
            <Train className="w-4 h-4" />
            <span>Banquet Hall Mechanical Innovation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900">
            The Solid Silver Model Banquet Train
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            In the stately dining chamber, Maharaja Madho Rao Scindia introduced one of the most celebrated mechanical novelties in royal culinary history:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <h3 className="text-base font-cinzel font-bold text-stone-900">
              The 40-Seat Marble Dining Table
            </h3>
            <p>
              The banquet hall accommodates 40 royal dignitaries along an Italian marble dining table. Embedded directly into the marble tabletop is a miniature railway track made of solid silver, complete with switches and electrical power conductors.
            </p>
            <p>
              The Maharaja sat at the head of the table with master electrical push buttons that controlled the train's motion, reversing, and track points.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <h3 className="text-base font-cinzel font-bold text-stone-900">
              Silver Carriages &amp; Refreshments
            </h3>
            <p>
              The locomotive is cast in sterling silver and pulls several miniature wagons, each embossed with the letters of the royal <strong>SCINDIA</strong> family monogram.
            </p>
            <p>
              Each wagon carried crystal decanters of fine cognac, brandies, liqueurs, cuban cigars, and imported confectionery. When the train halted in front of a dignitary, lifting a decanter broke the circuit, stopping the train until the drink was poured!
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 5: The 12-Year Jail Carpet */}
      <section className="bg-amber-50/40 border border-amber-200 rounded-3xl p-8 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-900">
              Asia’s Largest Hand-Woven Persian Carpet
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              Spread across the entire Durbar Hall floor lies Asia’s largest hand-knotted woolen carpet. 
              Measuring an immense <strong>100 feet by 50 feet</strong>, it was hand-woven inside the Gwalior Central Prison 
              by master artisan inmates over a continuous span of <strong>twelve years</strong>.
            </p>
            <div className="flex items-center space-x-2 text-xs font-semibold text-amber-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Preserved in mint original condition since 1874</span>
            </div>
          </div>
          <div className="md:col-span-4 rounded-xl overflow-hidden border border-amber-200 shadow-sm bg-white">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Carpet_2022.jpg"
              alt="Asia's largest hand-woven Persian carpet"
              className="w-full h-44 object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

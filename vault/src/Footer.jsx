import React from 'react';
import { Crown, MapPin, Phone, Mail, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-amber-200/80 text-stone-700 py-10 px-4 sm:px-8 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Heritage identity */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white">
              <Crown className="w-4 h-4" />
            </div>
            <span className="font-cinzel font-bold text-stone-900 tracking-wider">
              JAI VILAS PALACE
            </span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            Built in 1874 by Maharaja Jayaji Rao Scindia, Jai Vilas Palace is a living testament to central India’s royal Maratha lineage and 19th-century European classical architecture.
          </p>
          <div className="inline-flex items-center space-x-1.5 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            <span>Seat of the Scindia Dynasty &bull; Gwalior</span>
          </div>
        </div>

        {/* Col 2: Quick Navigation */}
        <div className="space-y-2.5">
          <h4 className="text-xs uppercase font-cinzel font-bold text-stone-900 tracking-widest">
            Palace Sections
          </h4>
          <ul className="text-xs space-y-1.5">
            <li>
              <Link to="/home" className="hover:text-amber-800 transition-colors">Palace Overview &amp; Architecture</Link>
            </li>
            <li>
              <Link to="/history" className="hover:text-amber-800 transition-colors">1874 Construction &amp; Scindia History</Link>
            </li>
            <li>
              <Link to="/tourism" className="hover:text-amber-800 transition-colors">Museum Timings, Tickets &amp; Travel</Link>
            </li>
            <li>
              <Link to="/vault" className="text-amber-700 font-semibold hover:underline flex items-center space-x-1">
                <span>Imperial Subterranean Vault</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Key Exhibits */}
        <div className="space-y-2.5">
          <h4 className="text-xs uppercase font-cinzel font-bold text-stone-900 tracking-widest">
            Featured Highlights
          </h4>
          <ul className="text-xs space-y-1.5 text-stone-600">
            <li>&bull; The Grand Durbar Hall (560 kg pure gold leaf)</li>
            <li>&bull; Twin 3.5-Ton Crystal Chandeliers (250 bulbs each)</li>
            <li>&bull; The Solid Silver Model Banquet Train</li>
            <li>&bull; Aurangzeb's Sword &amp; Royal Maratha Armory</li>
            <li>&bull; Asia's Largest Hand-Woven Persian Carpet</li>
          </ul>
        </div>

        {/* Col 4: Location & Contact */}
        <div className="space-y-2.5">
          <h4 className="text-xs uppercase font-cinzel font-bold text-stone-900 tracking-widest">
            Madhya Pradesh Tourism
          </h4>
          <div className="text-xs text-stone-600 space-y-1.5 leading-relaxed">
            <p className="flex items-start space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
              <span>Jai Vilas Palace Rd, Lashkar, Gwalior, Madhya Pradesh 474009</span>
            </p>
            <p className="flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>mpstdc.com &bull; mptourism.com</span>
            </p>
            <p className="flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>H.H. Maharaja Sir Jiwaji Rao Scindia Museum Trust</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-stone-200 mt-8 pt-6 text-center text-xs text-stone-600 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          &copy; {new Date().getFullYear()} Jai Vilas Palace &bull; Madhya Pradesh Tourism Cultural Heritage Archive.
        </p>
        <p className="font-mono text-[11px] text-amber-800">
          CTF Privilege Escalation Edition &bull; Royal Vault
        </p>
      </div>
    </footer>
  );
}

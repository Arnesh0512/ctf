import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Crown, LogOut, Key, Menu, X, Landmark, BookOpen, Compass, Sparkles } from 'lucide-react';
import { clearAuth, BACKEND_URL } from './auth';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleExit = async () => {
    clearAuth();
    if (onLogout) onLogout();
    try {
      await fetch(`${BACKEND_URL}/logout`, { method: 'POST', credentials: 'include' });
    } catch (_) {}
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
      isActive
        ? 'bg-amber-100/90 text-amber-900 border border-amber-300 shadow-sm font-semibold'
        : 'text-stone-700 hover:text-amber-900 hover:bg-stone-100'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-sm px-4 sm:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Monogram */}
        <NavLink to="/home" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5 shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <span className="text-base sm:text-lg font-cinzel font-bold text-stone-900 tracking-wider">
            JAI VILAS PALACE
          </span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1.5 lg:space-x-2">
          <NavLink to="/home" className={navLinkClass}>
            <Landmark className="w-4 h-4" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/history" className={navLinkClass}>
            <BookOpen className="w-4 h-4" />
            <span>History</span>
          </NavLink>

          <NavLink to="/exhibits" className={navLinkClass}>
            <Sparkles className="w-4 h-4" />
            <span>Exhibits</span>
          </NavLink>

          <NavLink to="/tourism" className={navLinkClass}>
            <Compass className="w-4 h-4" />
            <span>Tourism Guide</span>
          </NavLink>

          <NavLink to="/vault" className={navLinkClass}>
            <Key className="w-4 h-4" />
            <span>Palace Treasure</span>
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={handleExit}
            className="flex items-center space-x-1.5 text-xs text-stone-700 hover:text-red-700 border border-stone-200 hover:border-red-300 bg-white hover:bg-red-50 px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-semibold shadow-sm"
            title="Log Out and Return to Palace Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile menu hamburger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-3 pb-2 border-t border-amber-200/60 mt-3 space-y-2">
          <div className="flex items-center justify-between px-3 py-1.5 text-xs text-stone-700 bg-stone-50 rounded-lg">
            <span className="font-medium">Signed In</span>
            <button onClick={handleExit} className="text-red-600 font-bold hover:underline flex items-center space-x-1">
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <NavLink to="/home" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>
              <Landmark className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/history" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>
              <BookOpen className="w-4 h-4" />
              <span>History</span>
            </NavLink>
            <NavLink to="/exhibits" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>
              <Sparkles className="w-4 h-4" />
              <span>Exhibits</span>
            </NavLink>
            <NavLink to="/tourism" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>
              <Compass className="w-4 h-4" />
              <span>Tourism Guide</span>
            </NavLink>
            <NavLink to="/vault" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>
              <Key className="w-4 h-4" />
              <span>Palace Treasure</span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Crown, LogOut, Key, Menu, X, Landmark, BookOpen, Compass } from 'lucide-react';
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

  const usernameDisplay = user?.username || 'guest';
  const roleDisplay = user?.role || 'user';
  const isRoyal = roleDisplay.toLowerCase() === 'admin' && ['king', 'queen', 'prince', 'princess'].includes(usernameDisplay.toLowerCase());

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
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base sm:text-lg font-cinzel font-bold text-stone-900 tracking-wider">
                JAI VILAS PALACE
              </span>
              <span className="text-[10px] bg-amber-50 text-amber-800 font-mono px-2 py-0.5 rounded-md border border-amber-300 font-semibold">
                GWALIOR
              </span>
            </div>
            <p className="text-[11px] text-stone-700 font-sans hidden sm:block">
              Scindia Royal Heritage &bull; Madhya Pradesh Tourism
            </p>
          </div>
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

          <NavLink to="/tourism" className={navLinkClass}>
            <Compass className="w-4 h-4" />
            <span>Tourism Guide</span>
          </NavLink>

          <NavLink
            to="/vault"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-sm'
              }`
            }
          >
            <Key className="w-3.5 h-3.5" />
            <span>Palace Treasure</span>
          </NavLink>
        </nav>

        {/* User Identity & Logout */}
        <div className="hidden sm:flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-stone-100/90 border border-stone-200/90 rounded-full pl-3 pr-4 py-1.5 text-xs shadow-inner">
            <div className={`w-2 h-2 rounded-full ${isRoyal ? 'bg-amber-500 shadow-[0_0_6px_#f59e0b]' : 'bg-emerald-500'}`}></div>
            <span className="text-stone-700 font-medium">User:</span>
            <span className="font-mono font-bold text-stone-900">{usernameDisplay}</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-700 font-medium">Role:</span>
            <span className={`font-mono font-semibold ${isRoyal ? 'text-amber-700 font-bold' : 'text-stone-700'}`}>
              {roleDisplay}
            </span>
          </div>

          <button
            onClick={handleExit}
            className="flex items-center space-x-1 text-xs text-stone-600 hover:text-red-700 border border-stone-200 hover:border-red-300 bg-white hover:bg-red-50 px-3 py-1.5 rounded-full transition-all cursor-pointer font-medium"
            title="Log Out and Return to Palace Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit</span>
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
          <div className="flex items-center justify-between px-2 py-1 text-xs text-stone-700 bg-stone-50 rounded-lg">
            <span>Identity: <strong className="text-stone-900">{usernameDisplay}</strong> ({roleDisplay})</span>
            <button onClick={handleExit} className="text-red-600 font-semibold hover:underline">Log Out</button>
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
            <NavLink to="/tourism" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>
              <Compass className="w-4 h-4" />
              <span>Tourism Guide</span>
            </NavLink>
            <NavLink to="/vault" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 text-white">
              <Key className="w-4 h-4" />
              <span>Palace Treasure</span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

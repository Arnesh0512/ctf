import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-amber-200/60 py-6 px-4 text-center text-xs text-stone-500 mt-16">
      <p>&copy; {new Date().getFullYear()} Jai Vilas Palace &bull; Madhya Pradesh Tourism</p>
    </footer>
  );
}

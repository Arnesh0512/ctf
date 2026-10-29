/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f4ecd9',
          300: '#ece0c0',
          400: '#dfcb98',
          500: '#d1b26f',
        },
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#d4af37',
          600: '#b8860b',
          700: '#996515',
          800: '#784d12',
          900: '#5c390d',
        },
        royal: {
          crimson: '#8b1523',
          red: '#701a24',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

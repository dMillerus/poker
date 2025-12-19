/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Poker felt greens
        felt: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Card colors
        card: {
          white: '#ffffff',
          back: '#1e3a5f',
          red: '#dc2626',
          black: '#1a1a1a',
        },
        // Chip colors
        chip: {
          white: '#f5f5f5',
          red: '#ef4444',
          blue: '#3b82f6',
          green: '#22c55e',
          black: '#1f2937',
          purple: '#9333ea',
          orange: '#f97316',
        },
        // UI accent colors
        gold: {
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'card-hover':
          '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        felt: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'felt-texture':
          'radial-gradient(ellipse at center, #16a34a 0%, #14532d 100%)',
        'card-back':
          'repeating-linear-gradient(45deg, #1e3a5f, #1e3a5f 10px, #2d4a6f 10px, #2d4a6f 20px)',
      },
      animation: {
        'deal-card': 'dealCard 0.3s ease-out forwards',
        'flip-card': 'flipCard 0.4s ease-in-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
      },
      keyframes: {
        dealCard: {
          '0%': { transform: 'translateY(-100px) rotate(-10deg)', opacity: '0' },
          '100%': { transform: 'translateY(0) rotate(0)', opacity: '1' },
        },
        flipCard: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

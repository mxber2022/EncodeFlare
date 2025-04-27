import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        cursive: ['Dancing Script', 'cursive'],
      },
      colors: {
        dark: {
          DEFAULT: '#0A0A0A',
          light: '#141414',
          lighter: '#1A1A1A',
        },
        light: {
          DEFAULT: '#FFFFFF',
          dark: '#F5F5F5',
          darker: '#EEEEEE',
        },
        pink: {
          light: '#FF80B5',
          DEFAULT: '#FF4D94',
          dark: '#FF1A75',
        },
        purple: {
          light: '#B794F4',
          DEFAULT: '#9F7AEA',
          dark: '#805AD5',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale': 'scale 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.shadow-glow': {
          'box-shadow': '0 0 25px rgba(0, 0, 0, 0.15)',
        },
        '.shadow-glow-strong': {
          'box-shadow': '0 0 30px rgba(0, 0, 0, 0.3)',
        },
        '.bg-gradient-mesh': {
          'background-image': 'linear-gradient(to right, rgba(255,77,148,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,77,148,0.1) 1px, transparent 1px)',
        },
        '.bg-gradient-dots': {
          'background-image': 'radial-gradient(circle, rgba(255,77,148,0.15) 1px, transparent 1px)',
        },
      });
    }),
  ],
};
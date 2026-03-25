/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary:    '#091426',
        'primary-c': '#1e293b',
        surface:    '#f8f9fa',
        'surface-low': '#f3f4f5',
        'surface-c': '#edeeef',
        'on-s':     '#191c1d',
        'on-s-m':   '#45474c',
        slate: {
          850: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      backdropBlur: {
        '2xl': '24px',
        '3xl': '40px',
      },
      animation: {
        'blob':         'blob 10s infinite',
        'pulse-slow':   'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':        'float 6s ease-in-out infinite',
        'ambient':      'ambientPulse 8s ease-in-out infinite',
        'light-sweep':  'lightSweep 3s ease-in-out infinite',
        'fade-up':      'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        blob: {
          '0%':   { transform: 'translate(0px, 0px) scale(1)' },
          '33%':  { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%':  { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        ambientPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.05)' },
        },
        lightSweep: {
          '0%':   { transform: 'translateX(-100%) skewX(-20deg)', opacity: '0' },
          '20%':  { opacity: '0.6' },
          '80%':  { opacity: '0.6' },
          '100%': { transform: 'translateX(300%) skewX(-20deg)', opacity: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'ambient':  '0 20px 60px rgba(25,28,29,0.06)',
        'card':     '0 8px 32px rgba(25,28,29,0.08)',
        'float':    '0 32px 64px rgba(25,28,29,0.12)',
        'glow-sm':  '0 0 24px rgba(9,20,38,0.15)',
      },
    },
  },
  plugins: [],
}
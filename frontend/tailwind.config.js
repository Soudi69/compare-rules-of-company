/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Orange + Purple Cosmic Theme
        cosmos: {
          50: '#fafbff',
          100: '#f0f4ff',
          200: '#e6e9ff',
          300: '#d4dbff',
          400: '#b8c5ff',
          500: '#9dabff',
          600: '#8595ff',
          700: '#6b7cff',
          800: '#5566e8',
          900: '#3f4fd1',
        },
        nebula: {
          50: '#fef7ff',
          100: '#ffe8f0',
          200: '#ffd4e6',
          300: '#ffa8d4',
          400: '#ff73b8',
          500: '#ff3ba0',
          600: '#ff1288',
          700: '#e80170',
          800: '#c90058',
          900: '#9d0040',
        },
        starlight: {
          50: '#fffbf5',
          100: '#fff0e6',
          200: '#ffe6cc',
          300: '#ffd9a3',
          400: '#ffbf70',
          500: '#ffa347',
          600: '#ff8c1e',
          700: '#e87500',
          800: '#c96500',
          900: '#9d5000',
        },
        void: {
          50: '#f3f4f7',
          100: '#e6e8f0',
          200: '#c6cbd9',
          300: '#a6b0c2',
          400: '#7a86a0',
          500: '#5a6680',
          600: '#444c62',
          700: '#2f354a',
          800: '#1a1f2e',
          900: '#0f1219',
        },
        aurora: {
          orange: '#ff8c1e',
          purple: '#d946ef',
          pink: '#ff6b9d',
          yellow: '#fbbf24',
          magenta: '#ec4899',
        },
      },
      backgroundImage: {
        'gradient-cosmos': 'linear-gradient(135deg, #0f1219 0%, #1a1f2e 25%, #2f354a 50%, #1a1f2e 75%, #0f1219 100%)',
        'gradient-nebula': 'linear-gradient(135deg, #d946ef 0%, #ff8c1e 50%, #ff6b9d 100%)',
        'gradient-aurora': 'conic-gradient(from 0deg, #ff8c1e, #d946ef, #ff6b9d, #fbbf24, #ff8c1e)',
        'gradient-cosmic': 'linear-gradient(135deg, #1a1f2e 0%, #d946ef 50%, #ff8c1e 100%)',
        'gradient-glow': 'radial-gradient(circle at center, rgba(255, 140, 30, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(255, 140, 30, 0.3)',
        'glow-md': '0 0 20px rgba(255, 140, 30, 0.4)',
        'glow-lg': '0 0 30px rgba(255, 140, 30, 0.5)',
        'glow-xl': '0 0 40px rgba(255, 140, 30, 0.6)',
        'aurora-glow': '0 0 20px rgba(255, 140, 30, 0.4), 0 0 40px rgba(217, 70, 239, 0.3)',
        'nebula-glow': '0 0 30px rgba(255, 107, 157, 0.3), 0 0 60px rgba(217, 70, 239, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'cosmic-spin': 'cosmic-spin 20s linear infinite',
        'aurora-wave': 'aurora-wave 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '1' },
          '50%': { transform: 'translateY(-10px)', opacity: '0.8' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255, 140, 30, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(217, 70, 239, 0.6)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'cosmic-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'aurora-wave': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      transitionDelay: {
        1000: '1000ms',
      }
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        page: '#FAF8F3', // warm off-white, paper-toned
        ink: '#1A1612', // near-black with a warm tint
        accent: '#1B4332', // deep forest green
        surface: '#EDEDEA', // light warm grey
        borderLight: '#E2DED8',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-jakarta)', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'card-enter': 'cardEnter 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        cardEnter: {
          '0%': { opacity: '0', transform: 'translateY(30px) rotate(1.5deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(1.5deg)' },
        },
      },
      boxShadow: {
        'warm': '0 12px 32px -4px rgba(26, 22, 18, 0.08), 0 4px 12px -2px rgba(26, 22, 18, 0.04)',
      }
    },
  },
  plugins: [],
};

export default config;

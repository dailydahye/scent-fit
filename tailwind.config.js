/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FFFFFF',
        cream: '#FAF8F4',
        stone: {
          50: '#F4F2EE',
          100: '#EAE6DE',
          200: '#D6CFC0',
          300: '#A89F8E',
        },
        taupe: {
          400: '#857D6F',
          500: '#6B6457',
          600: '#544E44',
        },
        ink: {
          500: '#3A3733',
          700: '#262421',
          900: '#161412',
        },
        accent: '#7A6E5C',
        scent: {
          crisp: '#D8E3E0',
          cotton: '#E8DDD0',
          garden: '#C8D2C0',
          powder: '#E5D8DC',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'Pretendard', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        ko: ['Pretendard', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'ko-serif': ['"Noto Serif KR"', '"Cormorant Garamond"', 'serif'],
      },
      letterSpacing: {
        'extra-tight': '-0.03em',
        'wider-2': '0.2em',
        'wider-3': '0.32em',
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(38,36,33,0.04), 0 2px 6px -2px rgba(38,36,33,0.025)',
        card: '0 16px 48px -20px rgba(38,36,33,0.08), 0 4px 12px -4px rgba(38,36,33,0.03)',
        luxe: '0 32px 80px -32px rgba(38,36,33,0.10), 0 8px 24px -8px rgba(38,36,33,0.04)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.5rem',
      },
      maxWidth: {
        content: '76rem',
        narrow: '38rem',
        editorial: '52rem',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out-soft': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'velvet': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 3.6s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite',
        'drift-slow': 'drift 28s ease-in-out infinite',
        breathe: 'breathe 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(20px,-12px,0) scale(1.04)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};
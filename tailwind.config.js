/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
        display: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
      spacing: {
        '3xs': 'var(--space-3xs)',
        '2xs': 'var(--space-2xs)',
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        'section-y': 'var(--space-section-y)',
        'gutter': 'var(--space-gutter)',
      },
      colors: {
        primary: {
          100: '#ecfdf5',
          200: '#d1fae5',
          300: '#a7f3d0',
          400: '#6ee7b7',
          500: '#34d399',
          600: '#10b981',
          700: '#059669',
          800: '#047857',
          900: '#064e3b',
        },
        neutral: {
          50: '#f7f7fb',
          100: '#efeff5',
          200: '#dcdde7',
          300: '#b6b8c9',
          400: '#8f92ae',
          500: '#696d92',
          600: '#4d5172',
          700: '#353956',
          800: '#1f2237',
          900: '#121426',
        },
        surface: {
          50: 'var(--surface-50)',
          100: 'var(--surface-100)',
          200: 'var(--surface-200)',
          300: 'var(--surface-300)',
          900: 'var(--surface-900)',
        },
        accent: {
          purple: 'var(--accent-purple)',
          blue: 'var(--accent-blue)',
          teal: 'var(--accent-teal)',
          amber: 'var(--accent-amber)',
        },
      },
      boxShadow: {
        'soft-lg': '0 22px 40px -24px rgba(20, 20, 43, 0.45)',
        glow: '0 0 0 1px rgba(16, 185, 129, 0.25), 0 16px 32px -16px rgba(16, 185, 129, 0.35)',
        focus: '0 0 0 3px rgba(16, 185, 129, 0.25)',
      },
      borderRadius: {
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.21, 1.02, 0.73, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'aurora': 'radial-gradient(120% 120% at 0% 0%, rgba(16, 185, 129, 0.35), transparent 60%), radial-gradient(120% 120% at 80% 0%, rgba(34, 211, 238, 0.25), transparent 65%), radial-gradient(140% 120% at 50% 100%, rgba(249, 115, 22, 0.22), transparent 70%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -8px, 0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.4s infinite linear',
        'fade-up': 'fadeUp 0.6s var(--ease-spring) forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};

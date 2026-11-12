/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#F4F7FB',
          100: '#E6EDF6',
          200: '#CBD7E8',
          400: '#5B6F91',
          600: '#34496B',
          700: '#22365A',
          800: '#152846',
          900: '#0B1B33',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(11, 27, 51, 0.04), 0 8px 24px -12px rgba(11, 27, 51, 0.12)',
        lifted: '0 2px 4px rgba(11, 27, 51, 0.06), 0 20px 40px -16px rgba(11, 27, 51, 0.22)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'pulse-ring': 'pulse-ring 1.6s ease-out infinite',
      },
    },
  },
  plugins: [],
};

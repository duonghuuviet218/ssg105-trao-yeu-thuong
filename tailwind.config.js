/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        warm: {
          bg: '#FDFBF7',
          card: '#FFFFFF',
          border: '#F1E9DA',
          text: '#2D2727',
          muted: '#786F6B',
        },
        pastel: {
          pink: '#FFE5EC',
          orange: '#FFEDD5',
          yellow: '#FEF9C3',
          green: '#DCFCE7',
          blue: '#E0F2FE',
          purple: '#F3E8FF',
        }
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'cute': '0 8px 24px -4px rgba(249, 115, 22, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'cute-hover': '0 16px 32px -4px rgba(249, 115, 22, 0.2), 0 8px 16px -2px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#bae0ff',
          300: '#7ec8ff',
          400: '#40b0ff',
          500: '#0b8ae5',
          600: '#0566cc',
          700: '#054ba3',
          800: '#053a7a',
          900: '#042d5f',
        },
        secondary: {
          50: '#f3f7fc',
          100: '#e6eff8',
          200: '#cce0f1',
          300: '#99c2e3',
          400: '#66a3d5',
          500: '#3385c7',
          600: '#2567a0',
          700: '#1a4d7a',
          800: '#0f3454',
          900: '#081b2e',
        },
        accent: {
          50: '#ecf8f3',
          100: '#d9f1e7',
          200: '#b3e3cf',
          300: '#7ccf9f',
          400: '#45bb6f',
          500: '#1ea74f',
          600: '#168c3e',
          700: '#0e7032',
          800: '#0a5428',
          900: '#043d1f',
        },
        success: {
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
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23d946ef\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"7\"/%3E%3Ccircle cx=\"53\" cy=\"7\" r=\"7\"/%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"7\"/%3E%3Ccircle cx=\"7\" cy=\"53\" r=\"7\"/%3E%3Ccircle cx=\"53\" cy=\"53\" r=\"7\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

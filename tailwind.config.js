/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Cool slate tuned for contrast on a near-black page: 200-300 for body copy,
        // 400 for secondary text (still ~8:1 on 950), 700-800 for borders and surfaces.
        neutral: {
          50: '#F7F9FB',
          100: '#EEF1F5',
          200: '#DDE3EA',
          300: '#C5CDD8',
          400: '#A1ABBA',
          500: '#7A8495',
          600: '#3D4552',
          700: '#29303A',
          800: '#171B22',
          900: '#0F1217',
          950: '#080A0D',
        },
        // Channels live in globals.css so opacity modifiers like border-accent/50 work.
        accent: {
          DEFAULT: 'rgb(var(--accent-ch) / <alpha-value>)',
          hover: 'rgb(var(--accent-hover-ch) / <alpha-value>)',
        },
        'on-accent': '#06200F',
        success: '#7CF29C',
        warning: '#F5C451',
        error: '#FF7A7A',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

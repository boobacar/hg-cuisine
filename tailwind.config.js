/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0B0B0C',
          900: '#101113',
          800: '#181A1D',
          700: '#23262B',
          600: '#31343B',
        },
        gold: {
          50: '#FBF8F0',
          100: '#F6EBD0',
          200: '#EAD7A6',
          300: '#D7BE74',
          400: '#C7A55A',
          500: '#B89047',
          600: '#9C7436',
          700: '#7E5B2A',
          800: '#634823',
          900: '#4C381D',
        },
        ivory: {
          50: '#FFFEFB',
          100: '#FBF8F0',
          200: '#F4ECDD',
          300: '#EDE0CA',
        },
        taupe: {
          50: '#FAF9F7',
          100: '#EEEAE3',
          200: '#DED6CB',
          300: '#CBBFB1',
          400: '#B3A38F',
          500: '#9A866E',
          600: '#7E6B57',
          700: '#645545',
          800: '#4F4438',
          900: '#3E352D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(0,0,0,0.25)',
        gold: '0 12px 40px rgba(184,144,71,0.25)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(1200px 600px at 20% 0%, rgba(184,144,71,0.22), transparent 60%), radial-gradient(900px 500px at 90% 20%, rgba(203,191,177,0.18), transparent 55%), radial-gradient(700px 400px at 50% 90%, rgba(255,254,251,0.10), transparent 65%)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}

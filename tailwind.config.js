/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0E0E0E',
          pure: '#000000',
          light: '#181818',
          card: '#141414',
          border: '#222222',
        },
        offwhite: {
          DEFAULT: '#F6F3EE',
          pure: '#FFFFFF',
          darker: '#EDE7DE',
        },
        beige: {
          DEFAULT: '#E8DFD2',
          light: '#F0EAE1',
          dark: '#DDD1C1',
        },
        sand: {
          DEFAULT: '#D9CBB8',
          border: '#C8B7A0',
        },
        warmgrey: {
          DEFAULT: '#8A8178',
          muted: '#A59D94',
          dark: '#5C554E',
        },
        accent: {
          orange: '#F2602B',
          'orange-hover': '#D94E1C',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter Tight"', 'sans-serif'],
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
    },
  },
  plugins: [],
};


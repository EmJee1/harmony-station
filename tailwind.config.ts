import type { Config } from 'tailwindcss'

export default {
  content: ['./renderer/**/*.vue'],
  theme: {
    fontFamily: {
      serif: ['"Karla"', '"sans-serif"'],
    },
    extend: {
      container: {
        center: true,
      },
      gridTemplateRows: {
        lightbox: '3.5rem, auto, 3.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config

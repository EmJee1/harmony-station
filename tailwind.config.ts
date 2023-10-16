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
    },
  },
  plugins: [],
} satisfies Config

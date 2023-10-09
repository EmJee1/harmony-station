import type { Config } from 'tailwindcss'

export default {
  content: ['./renderer/**/*.vue'],
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  plugins: [],
} satisfies Config

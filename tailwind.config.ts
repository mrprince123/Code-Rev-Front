import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Nunito', 'Roboto', 'sans-serif'], // Set Roboto as the default sans font
    },
    extend: {},
  },
  plugins: [],
} satisfies Config


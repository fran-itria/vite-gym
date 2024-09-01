/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{html, js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xs': {'max': '425px'},
        ...defaultTheme.screens,
      }
    },
  },
  plugins: [],
  darkMode: 'media'
}
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
        'med': {'max': '375px'},
        'l': {'max': '425px'},
        'll': {'max': '500px'},
        ...defaultTheme.screens,
      },
      height: {
        '120': '582px'
      },
      maxHeight:{
        '100': '441px',
        '120': '582px'
      },
      maxWidth:{
        'smd': '410px'
      }
    },
  },
  plugins: [],
  darkMode: 'media'
}
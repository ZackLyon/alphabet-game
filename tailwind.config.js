/** @type {import('tailwindcss').Config} */

const { screens } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx,css}"],
  theme: {
    screens: {
      'xs': '413px',
      ...screens
    },
    extend: {    
      colors: {
      'tangerine': '#f78f65',
      'sunset': '#fa9c84',
      'sunsetDark': '#d9684c',
      'sunshine': '#f7c03e'
      },
      height: {
        '1/10': '10%',
        '9/10': '90%'
      },
      padding: {
        '1/2': '50%',
        '1/4': '25%',
        full: '100%',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx,css}"],
  theme: {
    extend: {
      colors: {
      'tangerine': '#f78f65',
      'sunset': '#fa9c84',
      'sunsetDark': '#d9684c',
      'sunshine': '#f7c03e'
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

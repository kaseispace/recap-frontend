/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app.vue', './src/components/**/*.{js,vue,ts}', './src/layouts/**/*.vue', './src/pages/**/*.vue'],
  theme: {
    extend: {
      maxWidth: {
        '95/100': '95%',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}

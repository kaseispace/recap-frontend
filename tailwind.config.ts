/** @type {import('tailwindcss').Config} */

function generateSafelist(color: string) {
  return [
    `bg-${color}-100`, `bg-${color}-200`, `bg-${color}-600/70`, `bg-${color}-100/70`
  ]
}

module.exports = {
  content: ['./src/**/*.{vue,ts}'],
  theme: {
    extend: {
      maxWidth: {
        '85/100': '85%',
        '95/100': '95%'
      },
      screens: {
        xs: '480px',
        xs2: '564px',
        sm2: '729px',
        md2: '863px',
        lg2: '1142px'
      }
    }
  },
  plugins: [],
  safelist: [
    ...generateSafelist('red'),
    ...generateSafelist('orange'),
    ...generateSafelist('amber'),
    ...generateSafelist('yellow'),
    ...generateSafelist('lime'),
    ...generateSafelist('green'),
    ...generateSafelist('emerald'),
    ...generateSafelist('teal'),
    ...generateSafelist('cyan'),
    ...generateSafelist('sky'),
    ...generateSafelist('blue'),
    ...generateSafelist('indigo'),
    ...generateSafelist('violet'),
    ...generateSafelist('purple'),
    ...generateSafelist('fuchsia'),
    ...generateSafelist('pink'),
    ...generateSafelist('rose')
  ]
}

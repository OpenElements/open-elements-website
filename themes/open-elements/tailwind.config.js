/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["content/**/*.md", "layouts/**/*.html", "../../layouts/**/*.html"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        md: '3rem',
        xl: '4rem',
        '2xl': '7rem',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'gray': '#F8F8F8',
      'slate' : '#EBEBEE',
      'blue': '#020144',
      'green': {
        DEFAULT: '#5CBA9E',
        100: '#DEF1EC',
        200: '#BEE3D8',
      },
      'rose': {
        DEFAULT: '#E63277',
        100: '#FAD6E4',
      },
      'sky': {
        DEFAULT: '#5DB9F5',
        100: '#DFF1FD'
      },
      'yellow': {
        DEFAULT: '#F1E34B',
        100: '#FCF9DB'
      },
      'purple': {
        DEFAULT: '#9492FD',
        100: '#D4D4FE'
      },
    },
    extend: {
      fontFamily: {
        'sans': ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      dropShadow: {
        'card' : '0px 0px 24px rgba(190, 227, 216, 0.6)',
      }
    },
  },
  plugins: [

    require('@tailwindcss/aspect-ratio'),
  ],
}

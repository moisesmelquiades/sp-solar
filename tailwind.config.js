/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1B4FBF',
        'primary-dark': '#0A1628',
        accent: '#F5A623',
      },
    },
  },
  plugins: [],
}

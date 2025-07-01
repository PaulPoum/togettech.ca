/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',              // on bascule manuellement en <html class="dark">
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // couleurs Clarifai
        clarifaiBlue: '#00C2FF',
        clarifaiDark: '#0B0E14',
        clarifaiText: '#FFFFFF',   
        clarifaiGray: '#6B7280',
      },
      fontFamily: {
        sans: ['Inter','sans-serif'],
      },
    },
  },
  plugins: [],
};

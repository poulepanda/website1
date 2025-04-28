/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        fadeInDelay: 'fadeInDelay 1.5s ease-out forwards',
        blob: 'blob 7s infinite alternate',
        bounce: 'bounce 1s infinite',
      },
    },
  },
  plugins: [],
};
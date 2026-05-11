/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF9F6',
        ink: '#111111',
        muted: '#5B5B5B',
        banana: '#F5D547',
        mint: '#8FE388',
        sky: '#8BD3FF',
        bubblegum: '#FF8FB3',
        darkcard: '#1B1B1B',
      },
      boxShadow: {
        brutal: '6px 6px 0 #111111',
        brutalSm: '3px 3px 0 #111111',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
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
        brutal: '7px 7px 0 #111111',
        brutalSm: '4px 4px 0 #111111',
        brutalLg: '12px 12px 0 #111111',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
    },
  },
  plugins: [],
}

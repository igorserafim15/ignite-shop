/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        gray900: '#121214',
        gray800: '#202024',
        gray300: '#c4c4cc',
        gray100: '#e1e1e6',

        green500: '#00875f',
        green300: '#00b37e',
      },
      maxWidth: {
        app: 'calc(100vw - ((100vw - 1180px) / 2))',
      },
      backgroundImage: {
        product: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
      },
    },
  },
  plugins: [],
}

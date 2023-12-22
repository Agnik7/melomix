/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens:{
      'sm': '640px',
      'md': '768px',
      'xmd': '860px',
      'lg': '1024px',
      'xs': '500px',
      'xms': '430px',
      'xxs': '385px',
      'xxs': '350px',
      'xxxs':'330px',
      'xxms': '450px',
      'xlg': '1240px',
      'xxlg': '1440px',
      'xxxlg': '1500px',
      'xxxmlg':'1600px',
      'xxxxlg': '2000px'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

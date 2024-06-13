/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0px 4px 60px 0px rgba(231, 231, 231, 0.47)',
        input: '0 .0625rem .125rem 0 rgba(0,0,0,.05)',
      },
    },
  },
  plugins: [],
};

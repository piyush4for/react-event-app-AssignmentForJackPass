// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:  {
      aspectRatio: {
        '4/5': '4 / 5',
      },
    },
  },
  plugins: [],
}
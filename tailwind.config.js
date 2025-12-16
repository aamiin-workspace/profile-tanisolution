/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#388E3C', // Hijau Tani Solution
        secondary: '#333333', // Dark Grey
        accent: '#E8F5E9', // Light Green Background
        blueCustom: '#1E88E5', 
        gold: '#D4AF37',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
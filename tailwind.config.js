/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2F80ED',
        'gray-1': '#333333',
        "gray-2": "#F2F2F2",
        "gray-3": "#4F4F4F",
        'white': '#ffffff',
      },
      fontFamily:{
        'inter': ['Inter', 'sans-serif'],
        'josefin-sans': ['Josefin Sans', 'sans-serif'],
        'noto-sans': ['Noto Sans', 'sans-serif'],
        "sf-pro-display": ['SF Pro Display', 'sans-serif'],
        'barlow-condensed': ['Barlow Condensed', 'sans-serif'],
        'blinker': ['Blinker', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        "patrick-hand": ['Patrick Hand', 'sans-serif'],
        "Bellefair": ['Bellefair', 'sans-serif'],
        "Belleza": ['Belleza', 'sans-serif'],
        "BenchNine": ['BenchNine', 'sans-serif'],
        "reem-kufi-fun": ["Reem Kufi Fun", "sans-serif"],
        "roboto": ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}
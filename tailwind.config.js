/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      colors: {
        default: "#86A666", 
        light: "#FFFFDD",
        dark: "#000500",
        rich: "#6A2E35",
        accent: "#AD9BAA", 
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
}
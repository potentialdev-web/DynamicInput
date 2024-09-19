/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan your React components for Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

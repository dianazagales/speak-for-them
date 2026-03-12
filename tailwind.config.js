/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a2744',
          light: '#243260',
          dark: '#111b33',
        },
        cream: '#f8f6f1',
        accent: {
          DEFAULT: '#e85d26',
          dark: '#c94a1c',
          light: '#f07040',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

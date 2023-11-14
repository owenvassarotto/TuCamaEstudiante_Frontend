/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primario': '#1481f7',
        'primario-hover': '#1271e6',
        'secundario': '#2e374f'
      },
    },
  },
  plugins: [],
}


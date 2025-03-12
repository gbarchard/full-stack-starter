const flowbite = require('flowbite-react/tailwind')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,tsx}', './index.html', flowbite.content()],
  theme: {
    extend: {},
  },
  darkMode: 'media',
  plugins: [flowbite.plugin()],
}

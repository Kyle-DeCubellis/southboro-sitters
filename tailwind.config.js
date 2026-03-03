/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'warm-cream': '#FAF7F2',
        sage: '#A8B8A0',
        terra: '#C5A583',
        clay: '#B8956A',
        charcoal: '#3F3F3F',
      },
      fontFamily: {
        body: ['Lora', 'serif'],
        heading: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

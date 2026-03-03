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
        sage: '#5BA5A5',
        'sage-dark': '#3D8B8B',
        teal: '#2E8B8B',
        terra: '#C5A583',
        clay: '#B8956A',
        charcoal: '#1A2E3B',
        'charcoal-light': '#3F4F5A',
      },
      fontFamily: {
        body: ['DM Sans', 'sans-serif'],
        heading: ['DM Serif Display', 'serif'],
      },
    },
  },
  plugins: [],
}

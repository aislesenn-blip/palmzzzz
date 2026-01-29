import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: '#D2E823',
        electric: '#2C50E3',
        maroon: '#780016',
        pink: '#E9C0E9',
        forest: '#153308',
        cream: '#F3F3F1',
        charcoal: '#1E2330',
        grey: '#F3F3F1', // Off-white alias
      },
      fontFamily: {
        serif: ['serif'], // Placeholder for Fraunces
        sans: ['var(--font-geist-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

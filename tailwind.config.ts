import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1E2330',
        cream: '#F3F3F1',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        black: '#242A30',
        primary: {
          100: '#E7EEDE',
          200: '#CEF194',
          300: '#E9FF30',
          400: '#D6F600',
          500: '#CCE90A',
          600: '#B6CE0C',
          700: '#9EB30B',
        },
        background: {
          100: '#F8F9FF',
          200: '#EAECFD'
        }
      },
    },
  },
  plugins: [],
};
export default config;

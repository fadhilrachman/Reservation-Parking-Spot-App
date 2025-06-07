/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./domains/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#01565E",
              100: "#E1F5F2",
            },
            secondary: {
              DEFAULT: "#086169",
            },
            focus: "#01565E",
          },
        },
      },
    }),
  ],
};

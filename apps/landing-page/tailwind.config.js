// File: apps/landing-page/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00AEEF',
          light: '#33C4F2',
          dark: '#0098D4',
        },
        secondary: {
          DEFAULT: '#7FFF00',
          light: '#99FF33',
          dark: '#66CC00',
        },
      },
    },
  },
  plugins: [],
}

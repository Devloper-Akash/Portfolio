/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./assets/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightHover: "#fcf4ff",
        darkHover: "#2a004a",
        darkTheme: "#11001f"
      },
        fontFamily: {
          Outfit: ["Outfit", "sans-serif"],
          Ovo: ["Ovo", "serif"],
        },
        boxShadow: {
          "black":"4px 4px 0 #000",
          "white":"4px 4px 0 #fff",
        }
    },
  },
  darkMode : 'selector',
  plugins: [],
};

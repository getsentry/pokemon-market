/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      darkRed: "rgb(140,0,0)",
      red: "rgb(235,20,20)",
      white: "#FFF",
      hover: "#DDD",
      black: "#000",
      border: "rgb(177,177,177)",
      blue: 'blue',
    },
  },
  plugins: [],
};

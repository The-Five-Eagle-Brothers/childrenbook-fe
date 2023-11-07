/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        hand: ["handFont", "Arial", "sans-serif"],
        niconne: ["Niconne", "Arial", "sans-serif"],
        NanumSquareRound: ["NanumSquareRound", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
  mode: "jit",
};

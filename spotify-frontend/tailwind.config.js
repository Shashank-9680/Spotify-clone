/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        "1/10": "10%",
        "9/10": "90%",
        "7/8": "87.5%",
        "3/8": "37.5%",
      },
      backgroundColor: {
        "app-black": "#121212",
      },
      colors: {
        red: "#FF0000",
      },
    },
  },
  plugins: [],
};

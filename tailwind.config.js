module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: { min: "769px", max: "1200px" },
      mobile: { max: "768px" },
      deskTop: { min: "769px" },
    },
    extend: {
      colors: {
        darkGray: "rgba(27,27,27,0.75)",
      },
    },
  },
  plugins: [],
};

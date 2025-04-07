module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: { min: "769px", max: "1200px" },
      mobile: { max: "768px" },
      deskTop: { min: "769px" },
    },
    extend: {
      height: {
        mainImg: "32rem",
      },
    },
    borderWidth: {
      6: "6px",
    },
  },
  plugins: ["@tailwindcss/postcss"],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#f1f5f9",
          main: "#edf2f7",
        },
        "light-grey": "#e9edf3",
        "rstudio-grey": "#333333",
        "rstudio-blue": "#75aadb",
        "rstudio-white": "white",
        danger: "rgb(250, 83, 22)",
      },
      borderRadius: {
        standard: "8px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "20px",
        xl: "28px",
        "vertical-spacing": "10px",
        "horizontal-spacing": "15px",
      },
    },
  },
  plugins: [],
};

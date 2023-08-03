/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-grey": "#e9edf3",
        "rstudio-grey": "#333333",
        "rstudio-blue": "#75aadb",
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
      },
    },
  },
  plugins: [],
};

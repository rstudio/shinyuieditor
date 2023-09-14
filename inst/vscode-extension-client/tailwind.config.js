import twConfig from "../shared-configs/tailwind.config";

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...twConfig,
  content: ["../editor/index.html", "../editor/src/**/*.{ts,tsx}"],
};

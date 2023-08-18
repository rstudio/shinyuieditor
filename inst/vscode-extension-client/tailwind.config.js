import twConfig from "../ui-editor-tsconfig/tailwind.config";

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...twConfig,
  content: ["../editor/index.html", "../editor/src/**/*.{ts,tsx}"],
};

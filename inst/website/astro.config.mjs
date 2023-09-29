import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
// import builtins from "rollup-plugin-node-builtins";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://rstudio.github.io",
  base: "/shinyuieditor",
  integrations: [
    react(),
    tailwind({
      // ShadCN already does this in the styles/global.css file
      applyBaseStyles: false,
    }),
    mdx(),
  ],
});

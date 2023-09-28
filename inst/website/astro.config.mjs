import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
// import builtins from "rollup-plugin-node-builtins";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://nickstrayer.me",
  base: "/sue-homebase",
  integrations: [
    react(),
    tailwind({
      // ShadCN already does this in the styles/global.css file
      applyBaseStyles: false,
    }),
    mdx(),
  ],
  // vite: {
  //   resolve: {
  //     alias: {
  //       fs: await import.meta.resolve("rollup-plugin-node-builtins"),
  //     },
  //   },
  // },
});

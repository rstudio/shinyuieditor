import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const setup = ({ mode }) => {
  return defineConfig({
    base: "./",
    build: {
      outDir: "../vscode-extension/media/build",
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "editor-extension",
        fileName: "extension-editor",
        formats: ["es"],
      },
      rollupOptions: { external: ["vscode-webview"] },
      emptyOutDir: true,
      sourcemap: mode === "development",
      target: "es2015",
      chunkSizeWarningLimit: 1000,
    },
    plugins: [react(), tsconfigPaths()],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
  });
};
export default setup;

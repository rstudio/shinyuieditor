import { resolve } from "path";

import inject from "@rollup/plugin-inject";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

const setup = ({ mode }) => {
  return defineConfig({
    base: "./",
    resolve: {
      alias: {
        fs: require.resolve("rollup-plugin-node-builtins"),
      },
    },
    build: {
      outDir: "build",
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        fileName: "index",
        formats: ["es"],
      },
      rollupOptions: {
        external: ["vscode-webview"],
        plugins: [inject({ Buffer: ["buffer", "Buffer"] })],
      },
      emptyOutDir: true,
      sourcemap: mode === "dev",
      minify: mode !== "dev",
      chunkSizeWarningLimit: 1000,
    },
    plugins: [react(), tsconfigPaths()],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
  });
};
export default setup;

import { resolve } from "path";

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const setup = ({ mode }) => {
  console.log("Building with mode", mode);
  return defineConfig({
    base: "./",
    server: { port: 3000 },
    resolve: {
      alias: {
        fs: require.resolve("rollup-plugin-node-builtins"),
      },
    },
    build: {
      outDir: mode === "vscode" ? "../vscode-extension/media/build" : "build",
      lib:
        mode === "vscode"
          ? {
              entry: resolve(__dirname, "src/vscode_index.ts"),
              name: "editor-extension",
              fileName: "extension-editor",
              formats: ["es"],
            }
          : undefined,
      emptyOutDir: true,
      sourcemap: mode === "dev",
      // target: "es2015",
      chunkSizeWarningLimit: 1000,
    },
    plugins: [react(), tsconfigPaths()],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    // optimizeDeps: {
    //   exclude: ["fs"],
    // },
    test: {
      include: [`src/**/*.test.{ts,tsx}`],
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests.js",
    },
  });
};
export default setup;

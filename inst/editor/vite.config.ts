import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const setup = ({ mode }) => {
  console.log("Building with mode", mode);
  return defineConfig({
    base: "./",
    server: { port: 3000 },
    build: {
      outDir: "build",
      emptyOutDir: true,
      sourcemap: mode === "development",
      target: "es2015",
      chunkSizeWarningLimit: 1000,
    },
    plugins: [react(), tsconfigPaths()],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    test: {
      include: [`src/**/*.test.{ts,tsx}`],
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests.js",
      deps: {
        inline: true,
      },
    },
  });
};
export default setup;

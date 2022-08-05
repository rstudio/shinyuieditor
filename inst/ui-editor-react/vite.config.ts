import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const setup = ({ mode }) => {
  console.log("Building with mode", mode);
  return defineConfig({
    server: { port: 3000 },
    build: {
      outDir: "build",
      emptyOutDir: true,
      sourcemap: mode === "development",
    },
    plugins: [react(), tsconfigPaths()],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests.js",
    },
  });
};
export default setup;

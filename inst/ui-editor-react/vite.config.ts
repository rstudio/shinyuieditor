import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const setup = ({ mode }) => {
  return defineConfig({
    server: { port: 3000 },
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

import { defineConfig } from "vitest/config";

const setup = () => {
  return defineConfig({
    base: "./",
    test: {
      include: [`src/**/*.test.{ts,tsx}`],
      globals: true,
      environment: "jsdom",
    },
  });
};
export default setup;

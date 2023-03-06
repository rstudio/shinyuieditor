import { defineConfig } from "vitest/config";

const setup = () => {
  return defineConfig({
    base: "./",
    test: {
      include: [`src/**/*.test.{ts,tsx}`],
      globals: true,
      environment: "jsdom",
      deps: {
        inline: true,
      },
    },
  });
};
export default setup;

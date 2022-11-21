import { buildCommand } from "build-utils";

buildCommand({
  label: "VSCode extension backend",
  entryFile: "src/extension.ts",
  outFile: `build/extension.js`,
  backend: true,
});

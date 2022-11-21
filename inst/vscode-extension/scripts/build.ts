import { buildCommand } from "build-utils";

buildCommand({
  label: "VSCode extension backend",
  entryFile: "src/extension.ts",
  outFile: `out/extension.js`,
  backend: true,
});

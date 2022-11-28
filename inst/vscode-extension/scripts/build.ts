import { buildCommand } from "build-utils";

buildCommand({
  label: "VSCode extension backend",
  entryFile: "src/extension.ts",
  outDir: "build/",
  outFile: `extension.js`,
  backend: true,
});

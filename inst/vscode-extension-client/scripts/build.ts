import { buildCommand } from "build-utils";

buildCommand({
  label: "VSCode Extension Client",
  entryFile: "src/index.ts",
  outDir: `../vscode-extension/media/build/`,
  outFile: `bundle.js`,
  backend: false,
});

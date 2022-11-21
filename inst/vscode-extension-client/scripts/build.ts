import { buildCommand } from "build-utils";

buildCommand({
  label: "VSCode Extension Client",
  entryFile: "src/index.ts",
  outFile: `../vscode-extension/media/build/bundle.js`,
  backend: false,
});

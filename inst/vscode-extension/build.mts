import * as esbuild from "esbuild";
import { copyFileSync } from "fs";

await esbuild.build({
  entryPoints: ["./src/extension.ts"],
  bundle: true,
  platform: "node",
  external: ["vscode"],
  target: ["node16"],
  outdir: "build/",
  packages: "external",
  format: "cjs",
  mainFields: ["module", "main"],
});

// Copy over wasm binary for tree sitter parser to the build folder
copyFileSync(
  "../python-ts-parser/src/assets/tree-sitter.wasm",
  "./build/tree-sitter.wasm"
);

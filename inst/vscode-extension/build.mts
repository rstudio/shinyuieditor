import * as esbuild from "esbuild";
import { copyFileSync } from "fs";

const args = process.argv.slice(2);
const isDev = args.includes("--dev");

if (isDev) {
  console.log("Building with dev mode");
}

await esbuild.build({
  entryPoints: ["./src/extension.ts"],
  bundle: true,
  sourcemap: isDev,
  minify: !isDev,
  platform: "node",
  external: ["vscode"],
  target: ["node16"],
  outdir: "build/",
  format: "cjs",
});

// Copy over wasm binary for tree sitter parser to the build folder
copyFileSync(
  "../treesitter-parsers/src/assets/tree-sitter.wasm",
  "./build/tree-sitter.wasm"
);

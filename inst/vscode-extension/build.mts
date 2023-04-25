import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/extension.ts"],
  bundle: true,
  platform: "node",
  external: ["vscode"],
  target: ["node16"],
  outdir: "build/",
  packages: "external",
  // outfile: "build/extension.js",
  format: "cjs",
  // format: "esm",
  //   outfile: "out.js",
  mainFields: ["module", "main"],
});

import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  platform: "node",
  outdir: "dist/",
  loader: { ".wasm": "binary" },
  packages: "external",
  format: "esm",
});

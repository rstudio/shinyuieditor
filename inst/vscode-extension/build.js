import esbuild from "esbuild";

let watch = false;

const hasBooleanArg = (prop: `--${string}`) =>
  process.argv.some((x) => x === prop);

if (hasBooleanArg("--watch")) {
  watch = true;
}

esbuild.build({
  entryPoints: ["./src/extension.ts"],
  format: "cjs",
  //   bundle: true,
  minify: false,
  sourcemap: true,
  //   platform: "node",
  target: ["es2020"],
  outdir: "./out/",
  metafile: true,
  watch: watch,
  //   plugins: [cleanup({ safelist: ["esbuild/index.html"] })],
});

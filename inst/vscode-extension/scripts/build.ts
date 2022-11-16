import esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import { sassPlugin } from "esbuild-sass-plugin";

type PossibleArgs = "watch" | "prod";

const hasBooleanArg = (prop: `--${PossibleArgs}`) =>
  process.argv.some((x) => x === prop);

esbuild.build({
  entryPoints: ["src/extension.ts"],
  bundle: true,
  minify: false,
  sourcemap: true,
  platform: "node",
  target: "node10.4",
  external: ["vscode"],
  outfile: `out/extension.js`,
  loader: { ".png": "dataurl" },
  metafile: true,
  watch: hasBooleanArg("--watch"),
  plugins: [
    sassPlugin(),
    cssModulesPlugin({
      localsConvention: "camelCase",
    }),
  ],
});

import esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import { sassPlugin } from "esbuild-sass-plugin";

type PossibleArgs = "watch" | "prod";

const hasBooleanArg = (prop: `--${PossibleArgs}`) =>
  process.argv.some((x) => x === prop);

esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: false,
  sourcemap: true,
  target: "es2020",
  loader: { ".png": "dataurl" },
  outfile: `../vscode-extension/media/build/bundle.js`,
  metafile: true,
  define: {
    TESTING_MODE_ESBUILD: "false",
  },
  watch: hasBooleanArg("--watch"),
  plugins: [
    sassPlugin(),
    cssModulesPlugin({
      localsConvention: "camelCase",
    }),
  ],
});

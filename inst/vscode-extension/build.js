"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const esbuild_1 = __importDefault(require("esbuild"));
let watch = false;
const hasBooleanArg = (prop) => process.argv.some((x) => x === prop);
if (hasBooleanArg("--watch")) {
    watch = true;
}
esbuild_1.default.build({
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
//# sourceMappingURL=build.js.map
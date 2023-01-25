import type http from "http";

import esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import { compress } from "esbuild-plugin-compress";
import { sassPlugin } from "esbuild-sass-plugin";

import { hasBooleanArg, serveCommand } from "./index";

import { cleanup } from "./cleanup";
import type { ServeOptions } from "./serveCommand";

export function buildCommand({
  label,
  entryFile,
  outDir,
  outFile,
  backend,
  serveOpts,
}: {
  label: string;
  entryFile: string;
  outDir: string;
  outFile: string;
  backend: boolean;
  serveOpts?: Omit<ServeOptions, "clients">;
}) {
  const productionBuild = hasBooleanArg("--prod");
  const watching = hasBooleanArg("--watch");
  const testing = hasBooleanArg("--test");

  // eslint-disable-next-line no-console
  console.log(
    `Generating ${productionBuild ? "production" : "dev"} build of ${label}`
  );

  const clients: http.ServerResponse[] = [];

  esbuild.build({
    entryPoints: [entryFile],
    bundle: true,
    minify: productionBuild,
    sourcemap: !productionBuild,
    ...(backend
      ? { platform: "node", target: "node10.4", external: ["vscode"] }
      : {
          target: "es2020",
        }),
    define: {
      "process.env.NODE_ENV": productionBuild
        ? `"production"`
        : `"development"`,
      TESTING_MODE_ESBUILD: testing ? "true" : "false",
    },
    outfile: `${outDir}${outFile}`,
    loader: { ".png": "dataurl" },
    metafile: true,
    watch: watching
      ? {
          onRebuild: (
            error: esbuild.BuildFailure | null,
            result: esbuild.BuildResult | null
          ): void => {
            clients.forEach((res) => res.write("data: update\n\n"));
            clients.length = 0;

            console.log(
              `[${new Date().toISOString()}]` +
                (error ? error : ` Rebuilt ${label} JS files...`)
            );
          },
        }
      : false,
    write: !productionBuild,
    plugins: [
      ...(productionBuild ? [compress()] : []),
      // cleanup({ outDir, safelist: ["index.html"] }),
      sassPlugin(),
      cssModulesPlugin({
        localsConvention: "camelCase",
      }),
    ],
  });

  if (serveOpts) {
    serveCommand({ ...serveOpts, clients });
  }
}

import type http from "http";

import esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import { compress } from "esbuild-plugin-compress";
import { sassPlugin } from "esbuild-sass-plugin";

import { hasBooleanArg, serveCommand } from "./index";

import type { ServeOptions } from "./serveCommand";

const productionModeBuildArgs = {
  minify: true,
  sourcemap: false,
};

const devModeBuildArgs = {
  minify: false,
  sourcemap: true,
};

export function buildCommand({
  label,
  entryFile,
  outFile,
  backend,
  serveOpts,
}: {
  label: string;
  entryFile: string;
  outFile: string;
  backend: boolean;
  serveOpts?: Omit<ServeOptions, "clients">;
}) {
  const productionBuild = hasBooleanArg("--prod");
  const watching = hasBooleanArg("--watch");
  const testing = hasBooleanArg("--test");
  if (productionBuild) {
    console.log(`Generating production build of ${label}`);
  } else {
    console.log(`Generating dev build of ${label}`);
  }

  const clients: http.ServerResponse[] = [];

  esbuild.build({
    entryPoints: [entryFile],
    bundle: true,
    ...(productionBuild ? productionModeBuildArgs : devModeBuildArgs),
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
    outfile: outFile,
    loader: { ".png": "dataurl" },
    metafile: true,
    watch: buildWatcherArg(watching, backend),
    write: !productionBuild,
    plugins: [
      ...(productionBuild ? [compress()] : []),
      //   cleanup({ safelist: ["index.html"] }),
      sassPlugin(),
      cssModulesPlugin({
        localsConvention: "camelCase",
      }),
    ],
  });

  if (serveOpts) {
    serveCommand({ ...serveOpts, clients });
  }

  function buildWatcherArg(watch: boolean, backend: boolean) {
    if (!watch) return false;

    if (backend) return true;

    return {
      onRebuild: (
        error: esbuild.BuildFailure | null,
        result: esbuild.BuildResult | null
      ): void => {
        clients.forEach((res) => res.write("data: update\n\n"));
        clients.length = 0;

        console.log(
          `[${new Date().toISOString()}]` +
            (error ? error : " Rebuilt JS files...")
        );
      },
    };
  }
}

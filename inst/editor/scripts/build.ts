import { spawn } from "child_process";
import fs from "fs";
import http from "http";
import path from "path";

import esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import { sassPlugin } from "esbuild-sass-plugin";
import glob from "glob";

const findPortArg = /--port=(?<port>\d{2,})/;

type PossibleArgs =
  | "serve"
  | "playwright"
  | "watch"
  | "vscode"
  | "test"
  | "prod"
  | "website-demo";

const hasBooleanArg = (prop: `--${PossibleArgs}`) =>
  process.argv.some((x) => x === prop);

const buildDir = hasBooleanArg("--vscode")
  ? "../vscode-extension/media/"
  : hasBooleanArg("--website-demo")
  ? "../../vignettes/demo-app/"
  : "build/";
const assetsDir = `${buildDir}build/`;

const openBrowser = !hasBooleanArg("--test");
const entryFile = hasBooleanArg("--vscode")
  ? "src/index_for_vscode.tsx"
  : "src/index.tsx";

let port = hasBooleanArg("--playwright") ? 3001 : 3032;
const portSearchRes = process.argv.find(
  (arg) => findPortArg.exec(arg)?.groups?.port
);
if (portSearchRes) {
  const requestedPort = Number(findPortArg.exec(portSearchRes)?.groups?.port);
  if (!requestedPort)
    throw new Error("Invalid port request:\n" + portSearchRes);
  port = requestedPort;
}

const behind_the_scenes_port = 3042;
const clients: http.ServerResponse[] = [];

esbuild.build({
  entryPoints: [entryFile],
  bundle: true,
  minify: false,
  sourcemap: true,
  target: "es2020",
  loader: { ".png": "dataurl" },
  outfile: `${assetsDir}bundle.js`,
  metafile: true,
  define: {
    TESTING_MODE_ESBUILD: hasBooleanArg("--test") ? "true" : "false",
  },
  watch: hasBooleanArg("--watch")
    ? {
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
      }
    : false,
  plugins: [
    cleanup({ safelist: ["esbuild/index.html"] }),
    sassPlugin(),
    cssModulesPlugin({
      localsConvention: "camelCase",
    }),
  ],
});

if (hasBooleanArg("--serve")) {
  esbuild.serve({ servedir: buildDir, port }, {}).then(() => {
    http
      .createServer((req, res) => {
        const { url, method, headers } = req;

        if (req.url === "/esbuild")
          return clients.push(
            res.writeHead(200, {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            })
          );

        req.pipe(
          http.request(
            { hostname: "0.0.0.0", port, path: url, method, headers },
            (proxyRes) => {
              if (url === `/build/bundle.js`) {
                // JS code for does auto-reloading. We'll inject it into
                // shinylive.js as it's sent.
                const jsReloadCode = `(() => {
                  if (window.location.host.includes("localhost")) {
                    console.log('%c~~~~~ Live Reload Enabled ~~~~~~', 'font-weight:bold;font-size:20px;color:white;display:block;background-color:green;padding:4px;border-radius:5px;');
                    new EventSource("/esbuild").onmessage = () => location.reload();
                  }
                })();`;

                const newHeaders = {
                  ...proxyRes.headers,
                  "content-length":
                    parseInt(proxyRes.headers["content-length"]!, 10) +
                    jsReloadCode.length,
                };

                res.writeHead(proxyRes.statusCode!, newHeaders);
                res.write(jsReloadCode);
              } else {
                res.writeHead(proxyRes.statusCode!, proxyRes.headers);
              }
              proxyRes.pipe(res, { end: true });
            }
          ),
          { end: true }
        );
      })
      .listen(behind_the_scenes_port);

    if (openBrowser) {
      setTimeout(() => {
        const op = {
          darwin: ["open"],
          linux: ["xdg-open"],
          win32: ["cmd", "/c", "start"],
        };
        if (clients.length === 0) {
          spawn(op[process.platform][0], [
            `http://localhost:${behind_the_scenes_port}/`,
          ]);
        }
      }, 500); //open the default browser only if it is not opened yet
    }
  });
}

function cleanup({
  pattern = "*",
  safelist = [],
}: {
  pattern?: string;
  safelist: string[];
}): esbuild.Plugin {
  return {
    name: "esbuild:cleanup",
    setup(build) {
      const safelistSet = new Set<string>(safelist);
      build.onEnd(async (result) => {
        if (result.metafile === undefined) {
          console.error(
            "No metafile present so we don't know what files to safely delete. " +
              "Add metafile: true to your build config."
          );
          return;
        }

        Object.keys(result.metafile.outputs).forEach((path) =>
          safelistSet.add(path)
        );

        await glob(path.join(assetsDir, pattern), (err, files) => {
          files.forEach((path) => {
            if (!safelistSet.has(path))
              fs.unlink(path, (err) => {
                if (err) {
                  console.error("Error deleting file", err);
                }
              });
          });
        });
      });
    },
  };
}

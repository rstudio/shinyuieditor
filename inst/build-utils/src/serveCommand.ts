import { spawn } from "child_process";
import http from "http";

import esbuild from "esbuild";

export type ServeOptions = {
  openBrowser: boolean;
  serveDir: string;
  port: number;
  clients: http.ServerResponse[];
};

export function serveCommand({
  serveDir,
  port,
  clients,
  openBrowser,
}: ServeOptions) {
  const behind_the_scenes_port = 3042;

  esbuild.serve({ servedir: serveDir, port }, {}).then(() => {
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

import { buildCommand, hasBooleanArg } from "build-utils";

const findPortArg = /--port=(?<port>\d{2,})/;

const buildDir = hasBooleanArg("--website-demo")
  ? "../../vignettes/demo-app/"
  : "build/";

const openBrowser = !hasBooleanArg("--test");
const entryFile = "src/index.tsx";

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

buildCommand({
  label: "editor",
  entryFile,
  outFile: `${buildDir}build/bundle.js`,
  backend: false,
  serveOpts: hasBooleanArg("--serve")
    ? {
        openBrowser,
        serveDir: buildDir,
        port,
      }
    : undefined,
});

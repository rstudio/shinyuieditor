import path from "path";

import * as vscode from "vscode";

import { collapseText } from "../string-utils";

import { getFreePort } from "./getFreePort";
import type { RProcess } from "./startRProcess";
import { startRProcess } from "./startRProcess";

export type PreviewAppInfo = RProcess & { url: string };

export async function startPreviewApp(
  pathToApp: string
): Promise<PreviewAppInfo> {
  const host = "0.0.0.0";

  const port = await getFreePort();
  const appDir = path.parse(pathToApp).dir;

  const previewAppUri = await vscode.env.asExternalUri(
    vscode.Uri.parse(`http://localhost:${port}`)
  );

  // Build a regex that watches for the app's location
  const readyToGoRegex = new RegExp(`listening on .+${port}`, "i");

  const appStartupCommand = collapseText(
    `options(shiny.autoreload = TRUE)`,
    `shiny::runApp(appDir = "${appDir}", port = ${port}, host = "${host}")`
  );

  // We need to wait until the app is started up until telling the rest of the
  // app it's good to go
  return new Promise<PreviewAppInfo>(async (resolve) => {
    const previewProcess = await startRProcess(
      ["--no-save", "--no-restore", "--silent", "-e", appStartupCommand],
      {
        onStderr: (msg) => {
          if (readyToGoRegex.test(msg)) {
            resolve({ ...previewProcess, url: previewAppUri.toString() });
          }
        },
      }
    );
  });
}

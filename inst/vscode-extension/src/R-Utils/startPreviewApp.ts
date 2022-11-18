import path from "path";

import * as vscode from "vscode";

import { collapseText } from "../string-utils";

import { getFreePort } from "./getFreePort";
import type { RProcess } from "./startRProcess";
import { startRProcess } from "./startRProcess";

export type PreviewAppInfo = {
  start: () => Promise<boolean>;
  stop: () => boolean;
};

export function startPreviewApp({
  pathToApp,
  onCrash,
  onInitiation,
  onReady,
  onFailToStart,
}: {
  pathToApp: string;
  onInitiation: () => void;
  onReady: (url: string) => void;
  onFailToStart: () => void;
  onCrash: () => void;
}): PreviewAppInfo {
  const host = "0.0.0.0";
  const appDir = path.parse(pathToApp).dir;

  let appProcess: RProcess | null = null;

  async function startApp() {
    onInitiation();

    if (appProcess?.proc.connected) {
      // If there is an existing app process and it can still have messages
      // communicated with it, we need to kill it Restarting existing app
      // process.
      appProcess.stop();
    }

    try {
      const port = await getFreePort();

      const previewAppUri = await vscode.env.asExternalUri(
        vscode.Uri.parse(`http://localhost:${port}`)
      );

      // Build a regex that watches for the app's location
      const readyToGoRegex = new RegExp(`listening on .+${port}`, "i");

      const appStartupCommand = collapseText(
        `options(shiny.autoreload = TRUE)`,
        `shiny::runApp(appDir = "${appDir}", port = ${port}, host = "${host}")`
      );

      appProcess = await startRProcess(
        ["--no-save", "--no-restore", "--silent", "-e", appStartupCommand],
        {
          onStderr(msg) {
            if (readyToGoRegex.test(msg)) {
              onReady(previewAppUri.toString());
            }
          },
          onClose: onCrash,
          onError: onCrash,
          verbose: true,
        }
      );

      return true;
    } catch {
      onFailToStart();
      return false;
    }
  }

  function stopApp() {
    if (appProcess === null) {
      console.warn("No app to stop running...");
      return true;
    }

    return appProcess.stop();
  }

  return {
    start: startApp,
    stop: stopApp,
  };
}

import path from "path";

import { collapseText } from "../string-utils";

import { startRProcess } from "./startRProcess";

export async function startPreviewApp(pathToApp: string) {
  const port = 8999;
  const host = "0.0.0.0";
  console.log("Starting background app run for", pathToApp);
  const appDir = path.parse(pathToApp).dir;

  const appStartupCommand = collapseText(
    `options(shiny.autoreload = TRUE)`,
    `shiny::runApp(appDir = "${appDir}", port = ${port}, host = "${host}")`
  );
  const previewProcess = await startRProcess(
    ["--no-save", "--no-restore", "--silent", "-e", appStartupCommand],
    {
      onClose: () => {
        console.log("Preview App Process closed");
      },
      verbose: true,
    }
  );
}

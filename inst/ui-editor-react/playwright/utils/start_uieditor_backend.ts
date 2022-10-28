// This file defines a function for starting up an R Session with an empty app
// folder in it and pointing the ui editor at that session.
import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";

export async function startBackendServer(test_app_dir: string, port: number) {
  return new Promise<AbortController>(async (resolve) => {
    try {
      const startingCommands = `
        devtools::load_all('../../.')
        launch_editor(
          app_loc = '${test_app_dir}',
          port = ${port},
          launch_browser = FALSE,
          stop_on_browser_close = TRUE
        )`;
      const controller = new AbortController();
      const { signal } = controller;
      const serverProcess = spawn("R", ["-e", startingCommands], { signal });

      serverProcess.stdout.on("data", (d) => {
        if (isServerStartupMsg(d.toString())) {
          console.log("Backend started");
          resolve(controller);
        }
      });
    } catch (err) {
      console.error("Failed to start backend server");
      throw new Error(err as string);
    }
  });
}

function isServerStartupMsg(output: string) {
  return output.includes("Live editor running");
}

export async function setupBackendServer({
  template_to_use,
  app_dir_root,
  port,
}: {
  template_to_use?: string;
  app_dir_root: string;
  port: number;
}) {
  // Generate folder for app
  const test_app_dir = path.join(app_dir_root, "app");
  // await fs.mkdir(app_dir_root);
  await fs.mkdir(test_app_dir, { recursive: true });

  // If a template was requested, move it into the test dir
  if (template_to_use) {
    await fs.copyFile(`${template_to_use}`, `${test_app_dir}/app.r`);
  }

  // Start backend server on template dir
  await startBackendServer(test_app_dir, port);

  async function get_app_file_text() {
    // Get end file contents for testing purposes
    return await fs.readFile(path.join(test_app_dir, "app.r"), {
      encoding: "utf-8",
    });
  }

  return { get_app_file_text };
}

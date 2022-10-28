// This file defines a function for starting up an R Session with an empty app
// folder in it and pointing the ui editor at that session.
import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";

const STARTUP_TIMEOUT_MS = 5000;

const findPort = /:(?<port>\d{2,})\s/;

type BackendServerInfo = {
  controller: AbortController;
  port: string;
};
export async function startBackendServer(test_app_dir: string, port?: number) {
  return new Promise<BackendServerInfo>(async (resolve) => {
    try {
      const startingCommands = `
        devtools::load_all('../../.')
        launch_editor(
          app_loc = '${test_app_dir}',
          ${port ? `port = ${port},` : ""}
          launch_browser = FALSE,
          stop_on_browser_close = TRUE
        )`;

      const controller = new AbortController();
      const { signal } = controller;
      const serverProcess = spawn("R", ["-e", startingCommands], { signal });

      // Keep the stderr logs in case they need to be printed for debugging timeout errors
      let logs = "";
      serverProcess.stderr.on("data", (d) => {
        logs += d.toString();
      });

      // Start a timeout to call off the test if we fail to detect the server
      // startup message. This could happen if the log format is changed etc.
      const startTimeout = setTimeout(() => {
        throw new Error("Starting backend server failed.\n Logs:\n" + logs);
      }, STARTUP_TIMEOUT_MS);

      serverProcess.stdout.on("data", (d) => {
        // Search line for startup message of app url
        const portSearchRes = findPort.exec(d.toString())?.groups?.port;

        if (portSearchRes) {
          console.log("Backend started on port", portSearchRes);
          resolve({ controller, port: portSearchRes });
          clearTimeout(startTimeout);
        }
      });
    } catch (err) {
      console.error("Failed to start backend server");
      throw new Error(err as string);
    }
  });
}

export async function setupBackendServer({
  template_to_use,
  app_dir_root,
  port,
}: {
  template_to_use?: string;
  app_dir_root: string;
  port?: number;
}) {
  // Generate folder for app
  const test_app_dir = path.join(app_dir_root, "app");
  await fs.mkdir(test_app_dir, { recursive: true });

  // If a template was requested, move it into the test dir
  if (template_to_use) {
    // Move every file from the template folder to the test dir
    const template_files = await fs.readdir(template_to_use);

    for (let template_file of template_files) {
      await fs.cp(
        `${template_to_use}/${template_file}`,
        `${test_app_dir}/${template_file}`
      );
    }
  }

  // Start backend server on template dir
  const serverInfo = await startBackendServer(test_app_dir, port);

  async function get_app_folder_contents() {
    const directory_contents = await fs.readdir(test_app_dir);

    const file_contents: Record<string, string> = {};
    for (let file_name of directory_contents) {
      file_contents[file_name] = /\.r/i.test(file_name)
        ? await fs.readFile(path.join(test_app_dir, file_name), {
            encoding: "utf-8",
          })
        : "non-script-file";
    }

    return file_contents;
  }

  return {
    get_app_folder_contents,
    app_url: `localhost:${serverInfo.port}`,
  };
}

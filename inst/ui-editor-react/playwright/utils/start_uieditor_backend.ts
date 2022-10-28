// This file defines a function for starting up an R Session with an empty app
// folder in it and pointing the ui editor at that session.
import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";

const STARTUP_TIMEOUT_MS = 5000;

const findPort = /:(?<port>\d{2,})\s/;

type BackendServerInfo = {
  port: string;
  serverClosed: Promise<true>;
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

      // Create a promise that resolvse when the server process is closed.
      // Useful for awaiting the server being shutdown before doing some action
      const serverClosed = new Promise<true>((closedResolved) => {
        serverProcess.on("close", () => {
          closedResolved(true);
        });
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
          resolve({ port: portSearchRes, serverClosed });
          clearTimeout(startTimeout);
        }
      });
    } catch (err) {
      console.error("Failed to start backend server");
      throw new Error(err as string);
    }
  });
}

type AppDirContents = Record<string, string>;
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
    const file_contents: AppDirContents = {};
    let directory_contents: string[];
    try {
      directory_contents = await fs.readdir(test_app_dir);
    } catch {
      // If we can't open the dir it probably got erased, so contents are none
      return file_contents;
    }

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
    ...serverInfo,
    get_app_folder_contents,
    app_url: `localhost:${serverInfo.port}`,
  };
}

const finderRegexMap = {
  ui: /ui\.r/i,
  server: /server\.r/i,
  app: /app\.r/i,
};

export function containsAppFile(
  contents: AppDirContents,
  fileType: "ui" | "server" | "app"
) {
  const fileNames = Object.keys(contents);

  return fileNames.some((fileName) => finderRegexMap[fileType].test(fileName));
}

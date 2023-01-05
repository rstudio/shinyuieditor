import * as fs from "fs";

import * as vscode from "vscode";

import { runShellCommand } from "./runShellCommand";

/**
 * Get a safe for hosted versions of vscode url for local server running on a
 * given port
 * @param local_port Port number of a locally running server
 * @returns Full url to access the proxied local server.
 */
export async function getRemoteSafeUrl(local_port: number): Promise<string> {
  console.log("process info", process.env);

  if (getInPositWorkbench()) {
    console.log("We're in workbench!");
    return await getForwardedWorkbenchUrl(local_port);
  }
  console.log("We are not in workbench");

  const local_uri = vscode.Uri.parse(`http://localhost:${local_port}`);
  return (await vscode.env.asExternalUri(local_uri)).toString();
}

// Path to a binary that exists on workbench that will tell us where a given port is forwarded.
const WORKBENCH_URL_FORWARDING_BINARY =
  "/usr/lib/rstudio-server/bin/rserver-url";

/**
 * Check to see if the vscode instance the extension is running in is hosted on
 * Posit workbench
 * @returns Boolean declaring if we're in Posit workbench based on environment
 * variables and port forwarding binary existance
 */
function getInPositWorkbench(): boolean {
  const env_variables_exist = "RS_SERVER_URL" in process.env;

  if (!env_variables_exist) return false;

  const forwarding_binary_exists = fs.existsSync(
    WORKBENCH_URL_FORWARDING_BINARY
  );
  // We appear to be in workbench but can't find the port forwarding binary.
  // This is probably bad news but we let the built in forwarding attempt
  // its best.
  return forwarding_binary_exists;
}

/**
 * Get a full URL for a workbench proxied local server
 * @param local_port Port number of a locally running server
 * @returns Full url of remote accessable endpoint for local server
 */
async function getForwardedWorkbenchUrl(local_port: number): Promise<string> {
  const port_forward_cmd_output = await runShellCommand({
    cmd: WORKBENCH_URL_FORWARDING_BINARY,
    args: [String(local_port)],
  });

  if (port_forward_cmd_output.status === "error") {
    Error(
      "Failed to get Posit workbench forwarded port. Error msg:\n" +
        port_forward_cmd_output.errorMsgs
    );
  }

  const forwarded_port = port_forward_cmd_output.stdout[0];
  const server_url = process.env["RS_SERVER_URL"]!;
  const session_url = process.env["RS_SESSION_URL"]!;

  return `${server_url}${session_url.slice(1)}p/${forwarded_port}`;
}

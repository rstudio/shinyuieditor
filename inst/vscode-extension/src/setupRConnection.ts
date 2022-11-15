import { existsSync } from "fs";
import path from "path";

import * as vscode from "vscode";
import winreg = require("winreg");

export function config(): vscode.WorkspaceConfiguration {
  return vscode.workspace.getConfiguration("r");
}

function getRfromEnvPath(platform: string) {
  let splitChar = ":";
  let fileExtension = "";

  if (platform === "win32") {
    splitChar = ";";
    fileExtension = ".exe";
  }

  const os_paths: string[] | string = process.env.PATH
    ? process.env.PATH.split(splitChar)
    : [];
  for (const os_path of os_paths) {
    const os_r_path: string = path.join(os_path, "R" + fileExtension);
    if (existsSync(os_r_path)) {
      return os_r_path;
    }
  }
  return "";
}

export async function getRpathFromSystem(): Promise<string> {
  let rpath = "";
  const platform: string = process.platform;

  rpath ||= getRfromEnvPath(platform);

  if (!rpath && platform === "win32") {
    // Find path from registry
    try {
      const key = new winreg({
        hive: winreg.HKLM,
        key: "\\Software\\R-Core\\R",
      });
      const item: winreg.RegistryItem = await new Promise((c, e) =>
        key.get("InstallPath", (err, result) =>
          err === null ? c(result) : e(err)
        )
      );
      rpath = path.join(item.value, "bin", "R.exe");
    } catch (e) {
      rpath = "";
    }
  }

  return rpath;
}

export function getRPathConfigEntry(term = false): string {
  const trunc = term ? "rterm" : "rpath";
  const platform =
    process.platform === "win32"
      ? "windows"
      : process.platform === "darwin"
      ? "mac"
      : "linux";
  return `${trunc}.${platform}`;
}

export async function getRpath(
  quote = false,
  overwriteConfig?: string
): Promise<string | undefined> {
  let rpath: string | undefined = "";

  // try the config entry specified in the function arg:
  if (overwriteConfig) {
    rpath = config().get<string>(overwriteConfig);
  }

  // try the os-specific config entry for the rpath:
  const configEntry = getRPathConfigEntry();
  rpath ||= config().get<string>(configEntry);

  // read from path/registry:
  rpath ||= await getRpathFromSystem();

  // represent all invalid paths (undefined, '', null) as undefined:
  rpath ||= undefined;

  if (!rpath) {
    // inform user about missing R path:
    void vscode.window.showErrorMessage(
      `Cannot find R to use for help, package installation etc. Change setting r.${configEntry} to R path.`
    );
  } else if (quote && /^[^'"].* .*[^'"]$/.exec(rpath)) {
    // if requested and rpath contains spaces, add quotes:
    rpath = `"${rpath}"`;
  } else if (!quote) {
    rpath = rpath.replace(/^"(.*)"$/, "$1");
    rpath = rpath.replace(/^'(.*)'$/, "$1");
  } else if (process.platform === "win32" && /^'.* .*'$/.exec(rpath)) {
    // replace single quotes with double quotes on windows
    rpath = rpath.replace(/^'(.*)'$/, '"$1"');
  }

  return rpath;
}

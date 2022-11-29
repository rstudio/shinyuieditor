import { existsSync } from "fs";
import path from "path";

import * as vscode from "vscode";
import winreg = require("winreg");

import { removeQuotes } from "../string-utils";

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

async function getRpathFromSystem(): Promise<string> {
  const platform: string = process.platform;

  let rpath = getRfromEnvPath(platform);

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

function getRPathConfigEntry(): string {
  const platform =
    process.platform === "win32"
      ? "windows"
      : process.platform === "darwin"
      ? "mac"
      : "linux";
  return `rpath.${platform}`;
}

export async function getPathToR(): Promise<string | undefined> {
  // First we check to see if the user has set a config for the R path
  const configEntry = getRPathConfigEntry();
  let pathToR = vscode.workspace.getConfiguration("r").get<string>(configEntry);

  // If that didn't work, attempt to pull directly from the system.
  if (!pathToR) {
    pathToR = await getRpathFromSystem();
  }

  if (!pathToR) {
    // inform user about missing R path:
    void vscode.window.showErrorMessage(
      `Cannot find R for running shinyuieditor. Make sure R is installed and/or updating the r.${configEntry} config option to proper to R path.`
    );
  }

  return removeQuotes(pathToR);
}

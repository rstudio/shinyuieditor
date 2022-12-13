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

function getRPathConfigEntryLocation(): string {
  const platform =
    process.platform === "win32"
      ? "windows"
      : process.platform === "darwin"
      ? "mac"
      : "linux";

  return `rpath.${platform}`;
}

function getRPathFromConfig(): string | undefined {
  const configEntry = getRPathConfigEntryLocation();
  return vscode.workspace
    .getConfiguration("shinyuieditor")
    .get<string>(configEntry);
}

export async function getPathToR(): Promise<string | undefined> {
  // First we check to see if the user has set a config for the R path
  let pathToR = getRPathFromConfig();

  // If that didn't work, attempt to pull directly from the system.
  if (!pathToR) {
    pathToR = await getRpathFromSystem();
  }

  if (!pathToR) {
    // inform user about missing R path:
    const errMsg = `Cannot find R for running shinyuieditor. Make sure R is installed and/or updating the shinyuieditor.${getRPathConfigEntryLocation()} config option to proper to R path.`;
    void vscode.window.showErrorMessage(errMsg);
    throw new Error(errMsg);
  }

  if (!existsSync(pathToR)) {
    const errMsg = `Path to R is invalid: ${pathToR}. Make sure R is installed and/or updating the shinyuieditor.${getRPathConfigEntryLocation()} config option to proper to R path.`;
    void vscode.window.showErrorMessage(errMsg);
    throw new Error(errMsg);
  }

  return removeQuotes(pathToR);
}

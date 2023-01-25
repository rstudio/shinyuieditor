import { existsSync } from "fs";
import path from "path";

import winreg = require("winreg");

export async function getRpathFromSystem(): Promise<string> {
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

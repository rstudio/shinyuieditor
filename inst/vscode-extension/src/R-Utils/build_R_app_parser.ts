import type * as vscode from "vscode";

import type { App_Parser } from "../App_Parser";

import { checkIfPkgAvailable } from "./checkIfPkgAvailable";
import { makeRAppInfoGetter, make_cached_info_getter } from "./getAppInfo";
import { startBackgroundRProcess } from "./startBackgroundRProcess";

export async function build_R_app_parser(
  document: vscode.TextDocument
): Promise<App_Parser> {
  // Startup background R process
  const RProcess = await startBackgroundRProcess();
  if (!RProcess) {
    throw new Error("Don't have an R Process to pass to editor backend!");
  }

  const check_if_pkgs_installed = async (pkgs: string) => {
    const pkgsLoaded = await checkIfPkgAvailable(RProcess, pkgs);

    if (pkgsLoaded.status === "error") {
      return { success: false, msg: pkgsLoaded.msg } as const;
    }

    return { success: true } as const;
  };

  return {
    getInfo: make_cached_info_getter(document, makeRAppInfoGetter(RProcess)),
    check_if_pkgs_installed,
    locate_input: () => {
      throw new Error("Not implemented");
    },
  };
}

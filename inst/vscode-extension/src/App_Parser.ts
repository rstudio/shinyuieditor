import type * as vscode from "vscode";

import type { INFO_GET_RESULTS } from "./R-Utils/getAppInfo";
import type { CommandOutputGeneric } from "./R-Utils/runRCommand";

export type App_Parser = {
  getInfo: () => Promise<CommandOutputGeneric<INFO_GET_RESULTS>>;
  check_if_pkgs_installed: (
    pkgs: string
  ) => Promise<{ success: true } | { success: false; msg: string }>;
  locate_input: (input_id: string) => vscode.Location[];
};

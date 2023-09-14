import type * as vscode from "vscode";

import type { InfoGetResults } from "./App_Parser";
import type { CommandOutputGeneric } from "./R-Utils/runRCommand";

export function makeCachedInfoGetter(
  document: vscode.TextDocument,
  get_info_fn: (text: string) => Promise<CommandOutputGeneric<InfoGetResults>>
) {
  let last_info_grabbed: {
    file_version: number;
    info: InfoGetResults;
  } | null = null;

  async function getInfo(): Promise<CommandOutputGeneric<InfoGetResults>> {
    const current_file_version = document.version;

    if (current_file_version === last_info_grabbed?.file_version) {
      // Use cached ast since nothing has changed!
      return { status: "success", values: last_info_grabbed.info };
    }

    const info_attempt = await get_info_fn(document.getText());

    if (info_attempt.status === "error") {
      return info_attempt;
    }

    const ast_info = info_attempt.values;

    last_info_grabbed = {
      file_version: current_file_version,
      info: ast_info,
    };

    return info_attempt;
  }

  return getInfo;
}

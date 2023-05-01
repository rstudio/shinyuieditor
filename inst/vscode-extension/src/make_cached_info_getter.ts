import type * as vscode from "vscode";

import type { INFO_GET_RESULTS } from "./App_Parser";
import type { CommandOutputGeneric } from "./R-Utils/runRCommand";

export function make_cached_info_getter(
  document: vscode.TextDocument,
  get_info_fn: (text: string) => Promise<CommandOutputGeneric<INFO_GET_RESULTS>>
) {
  let last_info_grabbed: {
    file_version: number;
    info: INFO_GET_RESULTS;
  } | null = null;

  async function get_info(): Promise<CommandOutputGeneric<INFO_GET_RESULTS>> {
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

  return get_info;
}

import type { OutputType } from "communication-types";
import type { ShinyUiNode } from "editor";

import { escapeDoubleQuotes, collapseText } from "../string-utils";

import type { CommandOutputGeneric } from "./runRCommand";
import type { ActiveRSession } from "./startBackgroundRProcess";

type UiBounds = { start: number; end: number };

export type ParsedApp = {
  file_lines: string[];
  loaded_libraries: string[];
  type: OutputType;
  ui_bounds: UiBounds;
  ui_tree: ShinyUiNode;
};

export async function getAppFile(
  rProc: ActiveRSession,
  fileText: string
): Promise<CommandOutputGeneric<ParsedApp | "EMPTY">> {
  const parseCommand = buildParseCommand(fileText);

  const parsedCommandOutput = await rProc.runCmd(parseCommand, {
    verbose: false,
    timeout_ms: 5000,
  });

  if (parsedCommandOutput.status === "error") {
    return parsedCommandOutput;
  }

  try {
    const parsedAppInfo = JSON.parse(
      parsedCommandOutput.values.reduce((all, l) => all + "\n" + l, "")
    );

    // Nothing will get returned if we've provided an empty file
    if (Object.keys(parsedAppInfo).length === 0) {
      return { status: "success", values: "EMPTY" };
    }

    return { status: "success", values: parsedAppInfo };
  } catch {
    return {
      status: "error",
      errorMsg: "Could not get document as json. Content is not valid json",
    };
  }
}

function buildParseCommand(appText: string) {
  const escapedAppText = escapeDoubleQuotes(appText);

  return collapseText(
    `app_lines <- strsplit("${escapedAppText}", "\\n")[[1]]`,
    `jsonlite::toJSON(`,
    `  shinyuieditor:::get_file_ui_definition_info(app_lines, "SINGLE-FILE"),`,
    `  auto_unbox = TRUE`,
    `)`
  );
}

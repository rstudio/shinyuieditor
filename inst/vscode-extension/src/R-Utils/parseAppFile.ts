import type { OutputType } from "communication-types";
import type { ShinyUiNode } from "editor";

import { escapeDoubleQuotes, collapseText } from "../string-utils";

import type { ActiveRSession } from "./getRProcess";

type UiBounds = { start: number; end: number };
export type ParsedApp = {
  file_lines: string[];
  loaded_libraries: string[];
  type: OutputType;
  ui_bounds: UiBounds;
  ui_tree: ShinyUiNode;
};

export async function getAppFile(
  fileText: string,
  RProcess: ActiveRSession
): Promise<ParsedApp> {
  const parseCommand = buildParseCommand(fileText);

  const parsedCommandOutput = await RProcess.runCmd(parseCommand);
  try {
    const parsedAppInfo = JSON.parse(
      parsedCommandOutput.reduce((all, l) => all + "\n" + l, "")
    );

    return parsedAppInfo;
  } catch {
    throw new Error(
      "Could not get document as json. Content is not valid json"
    );
  }
}

function buildParseCommand(appText: string) {
  const escapedAppText = escapeDoubleQuotes(appText);

  return collapseText(
    `app_lines <- strsplit("${escapedAppText}", "\\n")[[1]]`,
    `jsonlite::toJSON(`,
    `  shinyuieditor:::get_file_ui_definition_info(app_lines, "single-file"),`,
    `  auto_unbox = TRUE`,
    `)`
  );
}

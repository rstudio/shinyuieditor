import type { OutputType } from "communication-types";
import type { ShinyUiNode } from "editor";

import { escapeDoubleQuotes, collapseText } from "../string-utils";

import { runRCommandCold } from "./runRCommandCold";

type UiBounds = { start: number; end: number };

export type ParsedApp = {
  file_lines: string[];
  loaded_libraries: string[];
  type: OutputType;
  ui_bounds: UiBounds;
  ui_tree: ShinyUiNode;
};

export async function getAppFile(
  fileText: string
): Promise<ParsedApp | "EMPTY"> {
  console.log("Running getAppFile()");
  const parseCommand = buildParseCommand(fileText);

  const parsedCommandOutput = await runRCommandCold(parseCommand, {
    verbose: false,
  });

  if (parsedCommandOutput.status === "error") {
    throw new Error(`Error parsing app file: ${parsedCommandOutput.errorMsgs}`);
  }

  try {
    const parsedAppInfo = JSON.parse(
      parsedCommandOutput.values.reduce((all, l) => all + "\n" + l, "")
    );

    // Nothing will get returned if we've provided an empty file
    if (Object.keys(parsedAppInfo).length === 0) {
      return "EMPTY";
    }

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
    `  shinyuieditor:::get_file_ui_definition_info(app_lines, "SINGLE-FILE"),`,
    `  auto_unbox = TRUE`,
    `)`
  );
}

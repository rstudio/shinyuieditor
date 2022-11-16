import type { ActiveRSession } from "./getRProcess";

export async function getAppFile(fileText: string, RProcess: ActiveRSession) {
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

function collapseText(...textLines: string[]): string {
  return textLines.reduce((all, l) => all + "\n" + l, "");
}

function escapeDoubleQuotes(cmd: string): string {
  return cmd.replace(/"/g, `\\"`);
}

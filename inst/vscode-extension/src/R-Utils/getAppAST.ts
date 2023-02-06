import type { R_AST } from "ast-parsing";

import { collapseText, makePortableString } from "../string-utils";

import type { CommandOutputGeneric } from "./runRCommand";
import type { ActiveRSession } from "./startBackgroundRProcess";

export async function getAppAST(
  rProc: ActiveRSession,
  fileText: string
): Promise<CommandOutputGeneric<R_AST | "EMPTY">> {
  const escapedAppText = makePortableString(fileText);

  const parseCommand = collapseText(
    `app_lines <- strsplit("${escapedAppText}", "\\n")[[1]]`,
    `parsed <- parse(text = app_lines, keep.source = TRUE)`,
    `jsonlite::toJSON(`,
    `  shinyuieditor:::serialize_ast(parsed),`,
    `  auto_unbox = TRUE`,
    `)`
  );

  const parsedCommandOutput = await rProc.runCmd(parseCommand, {
    verbose: false,
    timeout_ms: 5000,
  });

  if (parsedCommandOutput.status === "error") {
    return parsedCommandOutput;
  }

  try {
    const parsedAST = JSON.parse(
      parsedCommandOutput.values.reduce((all, l) => all + "\n" + l, "")
    );

    // Nothing will get returned if we've provided an empty file
    if (Object.keys(parsedAST).length === 0) {
      return { status: "success", values: "EMPTY" };
    }

    return { status: "success", values: parsedAST };
  } catch {
    return {
      status: "error",
      errorMsg: "Could not get document as json. Content is not valid json",
    };
  }
}

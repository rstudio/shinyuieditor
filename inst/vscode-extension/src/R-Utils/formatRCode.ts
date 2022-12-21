import { escapeDoubleQuotes } from "../string-utils";

import type { CommandExecOptions } from "./runRCommand";
import type { ActiveRSession } from "./startBackgroundRProcess";

export async function formatRCode(
  RProcess: ActiveRSession,
  unformattedCode: string,
  commandOpts?: CommandExecOptions | undefined
) {
  const formattedLines = await RProcess.runCmd(
    `styler::style_text("${escapeDoubleQuotes(
      unformattedCode
    )}", scope = "tokens")`,
    commandOpts
  );
  if (formattedLines.status === "error") {
    throw new Error(
      "Failed to format new app code...\n" + formattedLines.errorMsg
    );
  }
  return formattedLines.values.reduce((pasted, l) => pasted + "\n" + l, "");
}

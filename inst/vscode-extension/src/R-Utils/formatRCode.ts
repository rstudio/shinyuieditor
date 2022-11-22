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
  return formattedLines.reduce((pasted, l) => pasted + "\n" + l, "");
}

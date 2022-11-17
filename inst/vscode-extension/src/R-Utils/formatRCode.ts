import type { ActiveRSession } from "./startBackgroundRProcess";

export async function formatRCode(
  RProcess: ActiveRSession,
  unformattedCode: string
) {
  const formattedLines = await RProcess.runCmd(
    `styler::style_text("${unformattedCode}", scope = "tokens")`
  );

  return formattedLines.reduce((pasted, l) => pasted + "\n" + l, "");
}

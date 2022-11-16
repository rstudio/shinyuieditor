import type { ActiveRSession } from "./getRProcess";

export async function formatRCode(
  RProcess: ActiveRSession,
  unformattedCode: string
) {
  const formattedLines = await RProcess.runCmd(
    `styler::style_text("${unformattedCode}", scope = "tokens")`
  );

  return formattedLines.reduce((pasted, l) => pasted + "\n" + l, "");
}

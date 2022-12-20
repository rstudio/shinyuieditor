import { runRCommandCold } from "./runRCommandCold";
import type { ActiveRSession } from "./startBackgroundRProcess";

export async function checkIfPkgAvailable(
  rProc: ActiveRSession,
  pkg: string
): Promise<{ status: "success" } | { status: "error"; msg: string }> {
  const loadingResults = await runRCommandCold(
    `print(require(${pkg}, quietly = TRUE))`,
    {
      verbose: false,
    }
  );

  if (
    loadingResults.status === "error" ||
    loadingResults.values[0].includes("FALSE")
  ) {
    return { status: "error", msg: generateMissingPkgMsg(pkg) };
  }

  return { status: "success" };
}

function generateMissingPkgMsg(pkg: string): string {
  return `The ShinyUiEditor extension needs the \`${pkg}\` pkg installed. Install using \`remotes::install_github('rstudio/${pkg}')\` and restart the extension.`;
}

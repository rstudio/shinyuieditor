import * as vscode from "vscode";

import type { App_Parser } from "../App_Parser";

import { checkIfPkgAvailable } from "./checkIfPkgAvailable";
import { makeRAppInfoGetter, make_cached_info_getter } from "./getAppInfo";
import { startBackgroundRProcess } from "./startBackgroundRProcess";

export async function build_R_app_parser(
  document: vscode.TextDocument
): Promise<App_Parser> {
  // Startup background R process
  const RProcess = await startBackgroundRProcess();
  if (!RProcess) {
    throw new Error("Don't have an R Process to pass to editor backend!");
  }

  const check_if_pkgs_installed = async (pkgs: string) => {
    const pkgsLoaded = await checkIfPkgAvailable(RProcess, pkgs);

    if (pkgsLoaded.status === "error") {
      return { success: false, msg: pkgsLoaded.msg } as const;
    }

    return { success: true } as const;
  };

  return {
    getInfo: make_cached_info_getter(document, makeRAppInfoGetter(RProcess)),
    check_if_pkgs_installed,
    locate_input: (input_id: string) =>
      findRInputReferences({ document, input_id }),
  };
}

export function findRInputReferences({
  document,
  input_id,
}: {
  document: vscode.TextDocument;
  input_id: string;
}) {
  const fullInput = `input$${input_id}`;
  const to_find = fullInput;
  const app_text = document.getText();
  const doc_lines = app_text.split("\n");

  // To find valid examples we want to check:
  // 1. That we're not looking after a comment, aka not active code. and
  // 2. That right after our searched for variable we have a non word token to
  //    avoid over-eager findings like input$bins2 matching when we're searching
  //    for input$bins
  const regex_for_output = new RegExp(
    `(?<!#.*)${escapeRegExp(to_find)}(?=\\W)`
  );
  const lines_with_output = doc_lines
    .map((l, i) => ({
      line: i,
      match: regex_for_output.exec(l),
    }))
    .filter(({ match }) => match !== null);

  if (lines_with_output.length === 0) return [];

  return lines_with_output.map(({ line, match }) => {
    const startChar = match?.index ?? 0;
    const searchStart = new vscode.Position(line, startChar);
    // Add to account for length of prefix
    const searchEnd = new vscode.Position(line, startChar + to_find.length);

    return new vscode.Location(
      document.uri,
      new vscode.Range(searchStart, searchEnd)
    );
  });
}
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

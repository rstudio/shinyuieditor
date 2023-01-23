import * as vscode from "vscode";

import type { ParsedApp } from "../editorLogic";

export function uiBoundsToSelection({
  start_row,
  start_col,
  end_row,
  end_col,
}: ParsedApp["ui_bounds"]): vscode.Selection {
  return new vscode.Selection(
    start_row - 1,
    start_col - 1,
    end_row,
    end_col - 1
  );
}

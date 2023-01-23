import * as vscode from "vscode";

import type { ParsedApp } from "../editorLogic";

export function uiBoundsToSelection({
  start,
  end,
}: ParsedApp["ui_bounds"]): vscode.Selection {
  return new vscode.Selection(start - 1, 0, end, 0);
}

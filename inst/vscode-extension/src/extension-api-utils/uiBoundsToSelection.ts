import * as vscode from "vscode";

import type { App_Location } from "../editorLogic";

export function uiBoundsToSelection({
  start_row,
  start_col,
  end_row,
  end_col,
}: App_Location): vscode.Selection {
  return new vscode.Selection(
    start_row - 1,
    start_col - 1,
    end_row,
    end_col - 1
  );
}

import type { Language_Mode } from "communication-types/src/AppInfo";
import type { SnippetInsertRequest } from "communication-types/src/MessageToBackend";
import { indent_text_block } from "util-functions/src/strings";
import * as vscode from "vscode";

import type { Server_Info } from "./App_Parser";

export async function insert_code_snippet({
  language,
  editor,
  snippet,
  server_info,
  where_in_server,
}: {
  language: Language_Mode;
  editor: vscode.TextEditor;
  server_info: Server_Info;
} & SnippetInsertRequest) {
  // This is an assumption that we should probably extract from the script
  // itself
  // const INDENT_SPACES = server_pos.indent;
  const server_fn_range = server_info.server_pos.server_fn;
  const indent = server_info.server_pos.indent;

  // Fill in the template either at bottom or top of server
  // Where exactly this will go depends on the language as R server functions have
  // the trailing curly brace we need to respect and python functions don't
  const row_delta = language === "R" ? -2 : 2;
  const row_to_place_snippet =
    where_in_server === "end"
      ? server_fn_range.end.row + row_delta
      : server_fn_range.start.row + row_delta;

  const successfull_template_add = await editor.insertSnippet(
    new vscode.SnippetString(indent_text_block(snippet, indent, true)),
    new vscode.Position(row_to_place_snippet, 0)
  );

  if (!successfull_template_add) {
    // Tell user there's nothing we can do.
    vscode.window.showErrorMessage(`Failed to add output scaffold`);
  }
}

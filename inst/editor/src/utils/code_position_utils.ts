import type { LanguageMode } from "communication-types/src/AppInfo";
import type { getNodePositionAndIndent } from "treesitter-parsers";
import { indent_text_block } from "util-functions/src/strings";

export function buildServerInsertion({
  server_position,
  snippet,
  language,
}: {
  server_position: ReturnType<typeof getNodePositionAndIndent>;
  snippet: string;
  language: LanguageMode;
}) {
  // Fill in the template either at bottom or top of server
  // Where exactly this will go depends on the language as R server functions have
  // the trailing curly brace we need to respect and python functions don't
  const row_delta = language === "R" ? 0 : 2;

  const row_to_place_snippet = server_position.server_fn.end.row + row_delta;

  // Flank with new lines to create space between snippet and end of function
  let snippet_to_add = `${indent_text_block(
    snippet,
    server_position.indent,
    true
  )}\n`;

  // R needs space added in front of the snippet to create separation from the
  // last expression which is often right up against the closing parenthesis
  if (language === "R") {
    snippet_to_add = `\n${snippet_to_add}`;
  }

  return {
    snippet: snippet_to_add,
    insert_at: { row: row_to_place_snippet, column: 0 },
  };
}

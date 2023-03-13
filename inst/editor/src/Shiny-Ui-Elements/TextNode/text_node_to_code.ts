import type { TextNodeSettings } from "../../ast_parsing/text_nodes/build_text_node";

import type { TextUiNode } from "./index";

export function text_node_to_code(ui_node: TextUiNode): string {
  // Why does this not automatically resolve for me?
  let container_fn = ui_node.uiArguments.size;
  const { contents, decoration } = ui_node.uiArguments;

  const quoted_contents = `"${contents}"`;

  const decoration_wrapper = decoration
    ? decoration_to_wrapper[decoration]
    : "";

  const decorated_contents = decoration_wrapper
    ? `${decoration_wrapper}(${quoted_contents})`
    : quoted_contents;

  if (!container_fn) {
    // Just plain text
    return decorated_contents;
  }

  return `${container_fn}(${decorated_contents})`;
}
const decoration_to_wrapper: Record<
  Exclude<TextNodeSettings["decoration"], undefined>,
  string
> = {
  default: "",
  bold: "strong",
  italic: "em",
};

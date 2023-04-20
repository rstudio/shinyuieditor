import type { TextUiNode } from "ui-node-definitions/src/internal/text_node";

import { decoration_to_wrapper, size_to_wrapper } from "./is_text_node";

export function text_node_to_code(ui_node: TextUiNode): string {
  // Why does this not automatically resolve for me?
  let text_size = ui_node.namedArgs.size;
  const { contents, decoration } = ui_node.namedArgs;

  const quoted_contents = `"${contents}"`;

  const decoration_wrapper = decoration
    ? decoration_to_wrapper[decoration]
    : "";

  const decorated_contents = decoration_wrapper
    ? `${decoration_wrapper}(${quoted_contents})`
    : quoted_contents;

  if (!text_size) {
    // Just plain text
    return decorated_contents;
  }

  return `${size_to_wrapper[text_size]}(${decorated_contents})`;
}

import type { ShinyUiNodeByName } from "../../Shiny-Ui-Elements/uiNodeTypes";

import type { TextNodeSettings } from "./build_text_node";

export function text_node_to_code(
  ui_node: ShinyUiNodeByName["textNode"]
): string {
  // Why does this not automatically resolve for me?
  const { contents, size, decoration } =
    ui_node.uiArguments as TextNodeSettings;
  const quoted_contents = `"${contents}"`;

  if (size === "span" && decoration === "default") return quoted_contents;

  return `${size}(${quoted_contents})`;
}

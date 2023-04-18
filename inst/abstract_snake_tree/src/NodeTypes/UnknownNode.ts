import type Parser from "tree-sitter";

import type { Parsed_Ui_Node } from "./Parsed_Ui_Node";

/**
 * Unknown node for when a node is not recognised by our list of parsing
 * filters. Just dumps the text to the text field and calls it a day.
 */
export interface Parsed_Unknown_Node extends Parsed_Ui_Node {
  type: "unknown";
  text: string;
}

export function parse_unknown_node(
  node: Parser.SyntaxNode
): Parsed_Unknown_Node {
  return {
    type: "unknown",
    text: node.text,
  };
}

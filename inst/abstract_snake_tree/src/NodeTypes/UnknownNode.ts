import type Parser from "tree-sitter";

import type { Parsed_Nodes_By_Type } from "./Parsed_Ui_Node";

export function parse_unknown_node(
  node: Parser.SyntaxNode
): Parsed_Nodes_By_Type["unknown"] {
  return {
    type: "unknown",
    text: node.text,
  };
}

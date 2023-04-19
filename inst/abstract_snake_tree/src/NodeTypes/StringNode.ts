import type Parser from "tree-sitter";
import type { SyntaxNode } from "tree-sitter";

import type { Parsed_Nodes_By_Type } from "./Parsed_Ui_Node";

export interface StringNode extends Parser.SyntaxNode {
  type: "string";
  text: string;
  children: [SyntaxNode, SyntaxNode];
}

export function is_string_node(node: Parser.SyntaxNode): node is StringNode {
  return node.type === "string";
}
/**
 * Get the contents of a string node without the quotes
 * @param node String node to extract the content from
 * @returns The text of the string node with the quotes removed
 */
export function extract_string_content(node: StringNode): string {
  return node.text.slice(1, -1);
}

export function parse_string_node(
  node: StringNode
): Parsed_Nodes_By_Type["string"] {
  return {
    type: "string",
    value: extract_string_content(node),
  };
}

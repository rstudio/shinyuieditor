import type Parser from "tree-sitter";

import type { Parsed_Nodes_By_Type } from "./Parsed_Ui_Node";

export interface TSNumberNode extends Parser.SyntaxNode {
  type: "number";
  text: string;
}

export function is_number_node(node: Parser.SyntaxNode): node is TSNumberNode {
  return node.type === "integer" || node.type === "float";
}

/**
 * Get the contents of a string node without the quotes
 * @param node String node to extract the content from
 * @returns The text of the string node with the quotes removed
 */
export function extract_number_content(node: TSNumberNode): number {
  // Parse text as number or error if parsing fails
  const number = Number(node.text);
  if (isNaN(number)) {
    throw new Error(`Failed to parse number: ${node.text}`);
  }
  return number;
}

export function parse_number_node(
  node: TSNumberNode
): Parsed_Nodes_By_Type["number"] {
  return {
    type: "number",
    value: extract_number_content(node),
  };
}

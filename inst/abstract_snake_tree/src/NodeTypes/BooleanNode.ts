import type Parser from "tree-sitter";

import type { Parsed_Nodes_By_Type } from "./Parsed_Ui_Node";

export interface BooleanNode extends Parser.SyntaxNode {
  type: "boolean";
  text: string;
}

export function is_boolean_node(node: Parser.SyntaxNode): node is BooleanNode {
  return node.type === "false" || node.type === "true";
}

/**
 * Get the contents of a string node without the quotes
 * @param node String node to extract the content from
 * @returns The text of the string node with the quotes removed
 */
function extract_boolean_content(node: BooleanNode): boolean {
  let value: boolean;

  // Better safe than sorry here. We want to make sure we're not accidentally
  // getting something like a truthy node (not even sure if that can happen)
  if (node.text === "True") {
    value = true;
  } else if (node.text === "False") {
    value = false;
  } else {
    throw new Error(`Failed to parse boolean: ${node.text}`);
  }

  return value;
}

export function parse_boolean_node(
  node: BooleanNode
): Parsed_Nodes_By_Type["boolean"] {
  return {
    type: "boolean",
    value: extract_boolean_content(node),
  };
}

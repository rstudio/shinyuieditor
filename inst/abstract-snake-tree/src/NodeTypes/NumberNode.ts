import type { Brand } from "util-functions/src/TypescriptUtils";
import type Parser from "web-tree-sitter";

type TSNumberNode = Brand<Parser.SyntaxNode, "NumberNode">;

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

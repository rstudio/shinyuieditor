import type { ParserNode } from "treesitter-parsers";
import type { Brand } from "util-functions/src/TypescriptUtils";

type TSNumberNode = Brand<ParserNode, "NumberNode">;

function is_number_type_node(node: ParserNode): boolean {
  return (
    node.type === "integer" ||
    node.type === "float" ||
    // Handle situation where a number may be negated (one or more times)
    (node.type === "unary" &&
      Boolean(node.firstNamedChild) &&
      is_number_type_node(node.firstNamedChild!))
  );
}

export function is_number_node(node: ParserNode): node is TSNumberNode {
  return is_number_type_node(node);
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

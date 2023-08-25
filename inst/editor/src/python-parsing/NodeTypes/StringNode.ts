import type { Brand } from "util-functions/src/TypescriptUtils";
import type Parser from "web-tree-sitter";

type TSStringNode = Brand<Parser.SyntaxNode, "TextNode">;

export function isStringNode(node: Parser.SyntaxNode): node is TSStringNode {
  return node.type === "string";
}
/**
 * Get the contents of a string node without the quotes
 * @param node String node to extract the content from
 * @returns The text of the string node with the quotes removed
 */
export function extractStringContent(node: TSStringNode): string {
  return node.text.slice(1, -1);
}

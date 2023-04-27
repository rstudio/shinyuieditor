import type { Brand } from "util-functions/src/TypescriptUtils";
import type Parser from "web-tree-sitter";

type TSKwargNode = Brand<Parser.SyntaxNode, "KwargNode">;

export function is_keyword_arg_node(
  node: Parser.SyntaxNode
): node is TSKwargNode {
  return (
    node.type === "keyword_argument" &&
    Boolean(node.children[0]) &&
    Boolean(node.children[2])
  );
}

/**
 * Attempt to unwrap important parts of a keyword argument node
 * @param node Node that should represents a keyword argument. This will have three
 * children with the middle one being an equals sign
 * @returns `null` if the node is not a valid keyword argument node, otherwise
 * the name of the keyword argument as a string and the value as its own syntax
 * node
 */
export function parse_keyword_arg_node(node: TSKwargNode): {
  name: string;
  value: Parser.SyntaxNode;
} {
  // We already validated above, so we can be dangerous with the ! here
  return {
    name: node.children[0]!.text,
    value: node.children[2]!,
  };
}

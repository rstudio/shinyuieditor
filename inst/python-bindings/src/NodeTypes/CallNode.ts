import type { Brand } from "util-functions/src/TypescriptUtils";
import type Parser from "web-tree-sitter";

type TSCallNode = Brand<Parser.SyntaxNode, "CallNode">;

export function is_call_node(node: Parser.SyntaxNode): node is TSCallNode {
  return (
    node.type === "call" && Boolean(node.child(0)) && Boolean(node.child(1))
  );
}

/**
 * Get the contents of a string node without the quotes
 * @param node String node to extract the content from
 * @returns The text of the string node with the quotes removed
 */
export function extract_call_content(node: TSCallNode) {
  // We already validated above, so we can be dangerous with the ! here
  return {
    fn_name: node.child(0)!.text,
    fn_args: node.child(1)!.namedChildren,
  };
}

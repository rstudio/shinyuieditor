import type { ParserNode } from "treesitter-parsers";
import type { Brand } from "util-functions/src/TypescriptUtils";

type TSCallNode = Brand<ParserNode, "CallNode">;

export function is_call_node(node: ParserNode): node is TSCallNode {
  return (
    node.type === "call" &&
    Boolean(node.namedChild(0)) &&
    Boolean(node.namedChild(1))
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
    fn_name: node.namedChild(0)!.text,
    fn_args: node.namedChild(1)!.namedChildren,
  };
}

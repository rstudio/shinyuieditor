import type { ParserNode } from "treesitter-parsers";
import type { Brand } from "util-functions/src/TypescriptUtils";

type TSKwargNode = Brand<ParserNode, "KwargNode">;

export function is_keyword_arg_node(node: ParserNode): node is TSKwargNode {
  return (
    node.type === "default_argument" &&
    Boolean(node.namedChild(0)) &&
    Boolean(node.namedChild(1))
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
  value: ParserNode;
} {
  // We already validated above, so we can be dangerous with the ! here
  return {
    name: node.namedChild(0)!.text,
    value: node.namedChild(1)!,
  };
}

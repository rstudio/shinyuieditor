import type { ParserNode } from "treesitter-parsers";
import type { Brand } from "util-functions/src/TypescriptUtils";

import type { Primatives } from "../../parsing/Primatives";

import { extract_number_content, is_number_node } from "./NumberNode";
import { extract_string_content, is_string_node } from "./StringNode";

type TSArrayNode = Brand<ParserNode, "ArrayNode">;

export function is_array_node(node: ParserNode): node is TSArrayNode {
  // Make sure that we're dealing with call to the `c()` function and that all
  // the children are simple nodes and not calls
  return node.type === "call" && node.firstNamedChild?.text === "c";
}
type Primative_Array = (Primatives | Primative_Array)[];

/**
 * Get the contents of a string node without the quotes
 * @param node String node to extract the content from
 * @returns The text of the string node with the quotes removed
 */
export function extract_array_contents(node: TSArrayNode): Primative_Array {
  const array_arg_nodes = node.namedChild(1)?.namedChildren ?? [];

  return array_arg_nodes.map((node) => {
    if (is_string_node(node)) {
      return extract_string_content(node);
    }
    if (is_number_node(node)) {
      return extract_number_content(node);
    }

    if (is_array_node(node)) {
      return extract_array_contents(node);
    }

    throw new Error(
      `Only support arrays of numbers and strings. Can't parse array:\n${node.text}`
    );
  });
}

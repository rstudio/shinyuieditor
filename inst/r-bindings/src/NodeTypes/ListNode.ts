import type { ParserNode } from "treesitter-parsers";
import type { Brand } from "util-functions/src/TypescriptUtils";

import type { Primatives } from "..";

import { extract_number_content, is_number_node } from "./NumberNode";
import { extract_string_content, is_string_node } from "./StringNode";

type TSListNode = Brand<ParserNode, "ListNode">;

export function isListNode(node: ParserNode): node is TSListNode {
  // Make sure that we're dealing with call to the `c()` function and that all
  // the children are simple nodes and not calls
  return node.type === "call" && node.firstNamedChild?.text === "list";
}

type PrimativeList = Record<string, Primatives>;

/**
 * Get the contents of a string node without the quotes
 * @param listNode String node to extract the content from
 * @returns The text of the string node with the quotes removed
 */
export function extractListContents(listNode: TSListNode): PrimativeList {
  const array_arg_nodes = listNode.namedChild(1)?.namedChildren ?? [];

  const list: Record<string, unknown> = {};

  array_arg_nodes.forEach((elementNode) => {
    if (elementNode.type !== "default_argument") {
      throw new Error("Somehow list is filled with non values");
    }

    // Verify we have key and value slots
    const keyNode = elementNode.firstNamedChild;
    const valueNode = elementNode.lastNamedChild;

    if (!(elementNode.namedChildCount === 2 && keyNode && valueNode)) {
      throw new Error("Somehow list is filled with non values");
    }

    // Grab key for element of list
    if (!is_string_node(keyNode)) {
      throw new Error("Somehow list is filled with non values");
    }
    const key = extract_string_content(keyNode);

    // Grab value for element of list
    let value: Primatives | PrimativeList;

    if (is_string_node(valueNode)) {
      value = extract_string_content(valueNode);
    } else if (is_number_node(valueNode)) {
      value = extract_number_content(valueNode);
    } else if (isListNode(valueNode)) {
      value = extractListContents(valueNode);
    } else {
      throw new Error(
        `Only support arrays of numbers and strings. Can't parse array:\n${elementNode.text}`
      );
    }

    // Add key and value to list
    list[key] = value;
  });

  return list as PrimativeList;
}

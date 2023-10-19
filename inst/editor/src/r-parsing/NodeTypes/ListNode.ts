import type { ParserNode } from "treesitter-parsers";
import type { Brand } from "util-functions/src/TypescriptUtils";

import type { Primatives } from "../../parsing/Primatives";

import { extract_number_content, is_number_node } from "./NumberNode";
import { extract_string_content, is_string_node } from "./StringNode";

type TSListNode = Brand<ParserNode, "ListNode">;

export function isListNode(node: ParserNode): node is TSListNode {
  // Make sure that we're dealing with call to the `c()` function and that all
  // the children are simple nodes and not calls
  return node.type === "call" && node.firstNamedChild?.text === "list";
}

type KeyValueList = Record<string, Primatives>;
type ValueOnlyList = Primatives[];

type ElementType = "key_value" | "value_only";
/**
 * Get the contents of a string node without the quotes
 * @param listNode String node to extract the content from
 * @returns The text of the string node with the quotes removed
 */
export function extractListContents(
  listNode: TSListNode
): KeyValueList | ValueOnlyList {
  const array_arg_nodes = listNode.namedChild(1)?.namedChildren ?? [];

  let keyValueMode: boolean = false;

  const keys: string[] = [];
  const values: ValueOnlyList = [];

  array_arg_nodes.forEach((elementNode) => {
    const currentElType: ElementType =
      elementNode.type === "default_argument" ? "key_value" : "value_only";

    if (currentElType === "key_value" && !keyValueMode) {
      // The appearance of any key value pair means we have to switch to key
      // value mode for all elements.
      keyValueMode = true;
    }

    // Verify we have key and value slots
    const valueNode =
      currentElType === "key_value" ? elementNode.lastNamedChild : elementNode;

    if (!valueNode) {
      throw new Error("Somehow list is filled with non values");
    }

    // Grab value for element of list
    let value: Primatives;

    if (is_string_node(valueNode)) {
      value = extract_string_content(valueNode);
    } else if (is_number_node(valueNode)) {
      value = extract_number_content(valueNode);
    } else {
      throw new Error(
        `Only support arrays of numbers and strings. Can't parse array:\n${elementNode.text}`
      );
    }
    values.push(value);

    // Now get the key node.

    // If we're in a value only mode, then we dont have a key-node and should
    // just take the value node as the key, provided it is a string
    if (currentElType === "value_only") {
      if (!is_string_node(valueNode)) {
        throw new Error(
          `Only support arrays of numbers and strings. Can't parse array:\n${elementNode.text}`
        );
      }

      keys.push(extract_string_content(valueNode));
      return;
    }

    const keyNode = elementNode.firstNamedChild;

    if (!(elementNode.namedChildCount === 2 && keyNode && valueNode)) {
      throw new Error("Somehow list is filled with non values");
    }

    // Grab key for element of list
    if (!is_string_node(keyNode)) {
      throw new Error("Somehow list is filled with non values");
    }
    keys.push(extract_string_content(keyNode));
  });

  if (keyValueMode) {
    return keys.reduce((acc, key, i) => {
      acc[key] = values[i];
      return acc;
    }, {} as KeyValueList);
  }

  return values;
}

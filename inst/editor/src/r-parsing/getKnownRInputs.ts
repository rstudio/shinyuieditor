import type { ParserNode } from "treesitter-parsers";

import type { IdToNodeMap } from "../parsing/nodesToLocations";

import { getNameOfAccessedProperty } from "./get_name_of_accessed_property";

/**
 * Gather all input nodes into a map keyed by id
 * @param server_node Node representing the server function definition
 * @returns Map from input id to all nodes that access that input
 */
export function getKnownRInputsNodes(server_node: ParserNode): IdToNodeMap {
  const inputNodes: IdToNodeMap = new Map();

  server_node.descendantsOfType("dollar").forEach((node) => {
    const input_name = getNameOfAccessedProperty(node, "input");

    if (input_name === null) return;

    if (inputNodes.has(input_name)) {
      inputNodes.set(input_name, inputNodes.get(input_name)!.concat(node));
    } else {
      inputNodes.set(input_name, [node]);
    }
  });

  return inputNodes;
}

import type { ServerPositionMap } from "communication-types/src/MessageToBackend";
import type { ParserNode } from "treesitter-parsers";

import { idToNodeMapToIdToPositionMap } from "../parsing/idToNodeMapToIdToPositionMap";

import { getNameOfAccessedProperty } from "./get_name_of_accessed_property";
import { getKnownROutputLocations } from "./getKnownROutputs";

/**
 * Gather all input nodes into a map keyed by id
 * @param server_node Node representing the server function definition
 * @returns Map from input id to all nodes that access that input
 */
export function getKnownRInputsNodes(
  server_node: ParserNode
): Map<string, ParserNode[]> {
  const inputNodes = new Map<string, ParserNode[]>();

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

export function getKnownRInputLocations(
  server_node: ParserNode
): ServerPositionMap {
  const inputNodes = getKnownRInputsNodes(server_node);

  return idToNodeMapToIdToPositionMap(inputNodes);
}

/**
 * Get the positions of the input and output declarations in a server function
 * @param server_node Node representing the server function definition
 * @returns Object with the positions of the input and output declarations as
 * maps from the name of the input/output to the position of the declaration
 */
export function getServerPositions(server_node: ParserNode) {
  const input_positions = getKnownRInputLocations(server_node);
  const output_positions = getKnownROutputLocations(server_node);

  return { input_positions, output_positions };
}

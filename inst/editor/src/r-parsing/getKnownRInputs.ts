import type { ServerPositionMap } from "communication-types/src/MessageToBackend";
import type { ParserNode } from "treesitter-parsers";
import { getNodePosition } from "treesitter-parsers";

import { getNameOfAccessedProperty } from "./get_name_of_accessed_property";
import { getKnownROutputs } from "./getKnownROutputs";

function getKnownRInputs(server_node: ParserNode): ServerPositionMap {
  const input_positions: ServerPositionMap = new Map();

  server_node.descendantsOfType("dollar").forEach((node) => {
    const input_name = getNameOfAccessedProperty(node, "input");

    if (input_name === null) return;
    const input_loc = getNodePosition(node);

    if (input_positions.has(input_name)) {
      input_positions.set(
        input_name,
        input_positions.get(input_name)!.concat(input_loc)
      );
    } else {
      input_positions.set(input_name, [input_loc]);
    }
  });

  return input_positions;
}

/**
 * Get the positions of the input and output declarations in a server function
 * @param server_node Node representing the server function definition
 * @returns Object with the positions of the input and output declarations as
 * maps from the name of the input/output to the position of the declaration
 */
export function getServerPositions(server_node: ParserNode) {
  const input_positions = getKnownRInputs(server_node);
  const output_positions = getKnownROutputs(server_node);

  return { input_positions, output_positions };
}

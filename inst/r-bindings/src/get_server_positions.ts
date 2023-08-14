import type { ServerPositionMap } from "communication-types/src/MessageToBackend";
import type { ParserNode } from "treesitter-parsers";
import { get_node_position } from "treesitter-parsers";

import { getNameOfAccessedProperty } from "./get_name_of_accessed_property";

function getOutputPositionsFromServer(server_node: ParserNode) {
  const output_positions: ServerPositionMap = new Map();

  const assignments = server_node.descendantsOfType("left_assignment");

  assignments.forEach((assignment) => {
    // Get the left hand side of the assignment to check for for output access
    const lhs = assignment.firstNamedChild;
    if (!lhs) {
      return;
    }
    const output_name = getNameOfAccessedProperty(lhs, "output");

    if (!output_name) {
      return;
    }

    const output_loc = get_node_position(assignment);

    if (output_positions.has(output_name)) {
      output_positions.set(
        output_name,
        output_positions.get(output_name)!.concat(output_loc)
      );
    } else {
      output_positions.set(output_name, [output_loc]);
    }
  });

  return output_positions;
}

function getInputPositionsFromServer(server_node: ParserNode) {
  const input_positions: ServerPositionMap = new Map();

  server_node.descendantsOfType("dollar").forEach((node) => {
    const input_name = getNameOfAccessedProperty(node, "input");

    if (input_name === null) return;
    const input_loc = get_node_position(node);

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
  const input_positions = getInputPositionsFromServer(server_node);
  const output_positions = getOutputPositionsFromServer(server_node);

  return { input_positions, output_positions };
}

import type { ServerPositionMap } from "communication-types/src/MessageToBackend";
import type { ParserNode } from "treesitter-parsers";
import { getNodePosition } from "treesitter-parsers";

import { getNameOfAccessedProperty } from "./get_name_of_accessed_property";

export function getKnownROutputs(server_node: ParserNode): ServerPositionMap {
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

    const output_loc = getNodePosition(assignment);

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

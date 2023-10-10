import type { ParserNode } from "treesitter-parsers";

import type { IdToNodeMap } from "../parsing/idToNodeMapToIdToPositionMap";

import { getNameOfAccessedProperty } from "./get_name_of_accessed_property";

/**
 * Gather all output nodes into a map keyed by id
 * @param server_node Node representing the server function definition
 * @returns Map from output id to all nodes that access that output
 */
export function getKnownROutputNodes(server_node: ParserNode): IdToNodeMap {
  const outputNodes: IdToNodeMap = new Map();

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

    if (outputNodes.has(output_name)) {
      outputNodes.set(
        output_name,
        outputNodes.get(output_name)!.concat(assignment)
      );
    } else {
      outputNodes.set(output_name, [assignment]);
    }
  });

  return outputNodes;
}

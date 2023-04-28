import type { Script_Position } from "communication-types/src/MessageToBackend";

import type { R_AST } from ".";

import {
  get_assignment_nodes,
  get_output_positions,
  get_server_assignment_node,
} from "./get_assignment_nodes";

export function parse_app_server_info(ast: R_AST) {
  const assignment_nodes = get_assignment_nodes(ast);
  const server_pos = get_server_assignment_node(assignment_nodes).pos;
  const output_positions = get_output_positions(assignment_nodes);

  const get_output_position = (outputId: string): Script_Position[] | null => {
    if (outputId in output_positions) {
      return output_positions[outputId];
    }
    return null;
  };

  return {
    app_type: "SINGLE-FILE",
    server_pos,
    get_output_position,
  };
  // TODO: Use this and pull out server positions from the place that it is
}

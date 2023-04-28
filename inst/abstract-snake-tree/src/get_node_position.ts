import type { Script_Position } from "communication-types/src/MessageToBackend";

import type { ParserNode } from ".";

/**
 * Get position of node in the script in Ui-Editor friendly format
 * @param node Node from the tree sitter tree
 * @returns Position of that node in the script
 */
export function get_node_position(node: ParserNode): Script_Position {
  const { startPosition, endPosition } = node;

  return [
    startPosition.row,
    startPosition.column,
    endPosition.row,
    endPosition.column,
  ];
}

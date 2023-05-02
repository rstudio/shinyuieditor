import type { Script_Position } from "communication-types/src/MessageToBackend";
import type { ParserNode } from "python-ts-parser";

/**
 * Get position of node in the script in Ui-Editor friendly format
 * @param node Node from the tree sitter tree
 * @returns Position of that node in the script
 */
export function get_node_position(node: ParserNode): Script_Position {
  const { startPosition, endPosition } = node;

  // Add one to the row because... well i'm not really sure why but we need to.
  return [
    startPosition.row + 1,
    startPosition.column,
    endPosition.row + 1,
    endPosition.column,
  ];
}

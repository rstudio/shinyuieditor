import type { Script_Range } from "communication-types/src/MessageToBackend";
import type { ParserNode } from "python-ts-parser";

/**
 * Get position of node in the script in Ui-Editor friendly format
 * @param node Node from the tree sitter tree
 * @returns Position of that node in the script
 */
export function get_node_position(node: ParserNode): Script_Range {
  const { startPosition, endPosition } = node;

  return {
    start: startPosition,
    end: endPosition,
  };
}

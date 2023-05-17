import type { ParserNode } from ".";

/**
 * Get position of node in the script in Ui-Editor friendly format
 * @param node Node from the tree sitter tree
 * @returns Position of that node in the script
 */
export function get_node_position(node: ParserNode) {
  const { startPosition, endPosition } = node;

  return {
    start: { row: startPosition.row, column: startPosition.column },
    end: { row: endPosition.row, column: endPosition.column },
  };
}

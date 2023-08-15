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

/**
 * Get position of the server node in the script in Ui-Editor friendly format
 * @param parsed_app Parsed app tree object. As returned from `parse_python_script`
 * @returns Location of the server node in the script
 */
export function getNodePositionAndIndent(server_node: ParserNode) {
  // Function nodes are have different structure based on the language. We can
  // check what language we're in by looking at the last named child. If we're
  // in R it should be a braces list, whereas in python it will be something in
  // the body of the function
  const language =
    server_node.lastNamedChild?.type === "brace_list" ? "R" : "Python";

  const server_body_node =
    language === "Python"
      ? server_node.lastNamedChild
      : server_node.lastNamedChild?.lastNamedChild;

  // Get the indent of the server function or if there' is nothing, default to two spaces
  const indent = server_body_node?.startPosition.column ?? 2;

  return {
    server_fn: get_node_position(server_node),
    indent,
  };
}

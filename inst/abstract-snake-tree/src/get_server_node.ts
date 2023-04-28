import type { ParserTree } from ".";

/**
 * Find the node representing the server function definition in an app script
 * @param parsed_app Parsed app tree object. As returned from `parse_python_script`
 * @returns The server node in the tree if found, undefined if not found
 */
export function get_server_node(parsed_app: ParserTree) {
  // Get all the nodes that represent decorated functions in the script
  return parsed_app.rootNode
    .descendantsOfType("function_definition")
    .find((node) => node.firstNamedChild?.text === "server");
}

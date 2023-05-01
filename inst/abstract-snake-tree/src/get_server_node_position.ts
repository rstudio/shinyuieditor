import type { Script_Position } from "communication-types/src/MessageToBackend";
import type { ParserTree } from "python-ts-parser";

import { get_node_position } from "./get_node_position";
import { get_server_node } from "./get_server_node";

/**
 * Get position of the server node in the script in Ui-Editor friendly format
 * @param parsed_app Parsed app tree object. As returned from `parse_python_script`
 * @returns Location of the server node in the script
 */
export function get_server_node_position(
  parsed_app: ParserTree
): Script_Position {
  const server_node = get_server_node(parsed_app);

  if (!server_node) {
    throw new Error("No server node found");
  }

  return get_node_position(server_node);
}

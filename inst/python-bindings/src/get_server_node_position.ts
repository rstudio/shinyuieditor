import type { ScriptRange } from "communication-types/src/MessageToBackend";
import type { ParserTree } from "treesitter-parsers";
import { get_node_position } from "treesitter-parsers";

import { getServerNode } from "./get_server_node";

/**
 * Get position of the server node in the script in Ui-Editor friendly format
 * @param parsed_app Parsed app tree object. As returned from `parse_python_script`
 * @returns Location of the server node in the script
 */
export function getServerNodePosition(parsed_app: ParserTree): {
  server_fn: ScriptRange;
  indent: number;
} {
  const server_node = getServerNode(parsed_app);

  if (!server_node) {
    throw new Error("No server node found");
  }

  // Get the indent of the server function or if there' is nothing, default to two spaces
  const indent = server_node.lastNamedChild?.startPosition.column ?? 2;

  return {
    server_fn: get_node_position(server_node),
    indent,
  };
}

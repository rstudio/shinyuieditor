import type { ScriptRange } from "communication-types/src/MessageToBackend";
import type { ParserTree } from "treesitter-parsers";
import { getNodePositionAndIndent } from "treesitter-parsers";

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

  return getNodePositionAndIndent(server_node);
}

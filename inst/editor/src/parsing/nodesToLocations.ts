import type { ServerPositions } from "communication-types/src/MessageToBackend";
import type { ParserNode } from "treesitter-parsers";
import { getNodePosition } from "treesitter-parsers";

export type IdToNodeMap = Map<string, ParserNode[]>;

/**
 * Convert an array of parser nodes to a list of positions
 * @param nodes Array of parser nodes
 * @returns Array of positions
 */
export function nodesToLocations(nodes: ParserNode[]): ServerPositions {
  return nodes.map(getNodePosition);
}

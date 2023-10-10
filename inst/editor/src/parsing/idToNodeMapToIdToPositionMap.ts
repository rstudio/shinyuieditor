import type {
  ServerLocations,
  ServerPositionMap,
} from "communication-types/src/MessageToBackend";
import type { ParserNode } from "treesitter-parsers";
import { getNodePosition } from "treesitter-parsers";

export type IdToNodeMap = Map<string, ParserNode[]>;

/**
 * Convert a map from string to parser node to a map from string to position
 * @param idToNodeMap Map of id string to a list of nodes that access that id
 * @returns Map of id string to a list of positions of nodes that access that id
 */
export function idToNodeMapToIdToPositionMap(
  idToNodeMap: IdToNodeMap
): ServerPositionMap {
  const idToPositionMap: ServerPositionMap = new Map();

  idToNodeMap.forEach((nodes, id) => {
    idToPositionMap.set(id, nodes.map(getNodePosition));
  });

  return idToPositionMap;
}

export function idToNodeMapToIdToPositionRecord(
  idToNodeMap: IdToNodeMap
): ServerLocations {
  const idToPositionMap: ServerLocations = {};

  idToNodeMap.forEach((nodes, id) => {
    idToPositionMap[id] = nodes.map(getNodePosition);
  });

  return idToPositionMap;
}

import type { ParserNode } from "treesitter-parsers";

import type { IdToNodeMap } from "./nodesToLocations";

/**
 * The result of parsing an app script with tree-sitter. Contains the root node
 * of the tree, the node representing the ui, and the node representing the
 * server. Is language agnostic.
 */
export type ParsedAppInfo = {
  /**
   * The root node of the tree-sitter tree
   */
  root_node: ParserNode;
  /**
   * The node representing the ui of the app script
   */
  ui_node: ParserNode;
  /**
   * The node representing the server of the app script
   */
  server_node: ParserNode;
};

export type ParsedAppServerNodes = {
  inputNodes: IdToNodeMap;
  outputNodes: IdToNodeMap;
  serverNode: ParserNode;
};

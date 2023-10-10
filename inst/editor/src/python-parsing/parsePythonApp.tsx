import type { ParserNode, TSParser } from "treesitter-parsers";
import {
  getNodePositionAndIndent,
  get_assignment_nodes,
  get_ui_assignment,
} from "treesitter-parsers";
import { convertMapToObject } from "util-functions/src/convertMapToObject";

import type { ParsedAppInfo } from "../parsing/ParsedAppInfo";

import { getKnownPythonInputs } from "./getKnownPythonInputs";
import { getKnownPythonOutputs } from "./getKnownPythonOutputs";

export type AppParserArgs = {
  app_script: string;
  parser: Promise<TSParser>;
};

export function parsePythonApp(
  parser: TSParser,
  app_script: string
): ParsedAppInfo {
  const parsed_app = parser.parse(app_script);
  const assignment_nodes = get_assignment_nodes(parsed_app);
  const ui_node = get_ui_assignment(assignment_nodes);
  const server_node = getServerNode(parsed_app.rootNode);

  if (!server_node) {
    throw new Error("No server node found in Python app");
  }

  return {
    ui_node,
    server_node,
    root_node: parsed_app.rootNode,
  };
}

export function getPythonServerLocations(
  server_node: ParsedAppInfo["server_node"]
) {
  const input_positions = getKnownPythonInputs(server_node);
  const output_positions = getKnownPythonOutputs(server_node);

  return {
    input_positions: convertMapToObject(input_positions),
    output_positions: convertMapToObject(output_positions),
    server_fn: getNodePositionAndIndent(server_node),
  };
}

/**
 * Find the node representing the server function definition in an app script
 * @param parsed_app Parsed app tree object. As returned from `parse_python_script`
 * @returns The server node in the tree if found, undefined if not found
 */
export function getServerNode(rootNode: ParserNode) {
  // Get all the nodes that represent decorated functions in the script
  return rootNode
    .descendantsOfType("function_definition")
    .find((node) => node.firstNamedChild?.text === "server");
}

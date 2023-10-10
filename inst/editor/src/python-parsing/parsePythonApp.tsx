import type { ParserNode, TSParser } from "treesitter-parsers";
import { get_assignment_nodes, get_ui_assignment } from "treesitter-parsers";

import type {
  ParsedAppInfo,
  ParsedAppServerNodes,
} from "../parsing/ParsedAppInfo";

import { getKnownPythonInputNodes } from "./getKnownPythonInputs";
import { getKnownPythonOutputNodes } from "./getKnownPythonOutputs";

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
  serverNode: ParsedAppInfo["server_node"]
): ParsedAppServerNodes {
  return {
    inputNodes: getKnownPythonInputNodes(serverNode),
    outputNodes: getKnownPythonOutputNodes(serverNode),
    serverNode,
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

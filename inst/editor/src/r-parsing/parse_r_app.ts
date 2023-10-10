import type { InputOutputLocations } from "communication-types/src/MessageToBackend";
import type { ParserNode, TSParser } from "treesitter-parsers";
import { getNodePositionAndIndent } from "treesitter-parsers";
import { convertMapToObject } from "util-functions/src/convertMapToObject";

import { getRInfoIfKnown } from "./get_r_info_if_known";
import { getServerPositions } from "./get_server_positions";
import { parseRScript } from "./parse_r_script";

export function parseRApp(
  parser: TSParser,
  app_script: string
): {
  ui_node: ParserNode;
  server_node: ParserNode;
  server_locations: InputOutputLocations;
} {
  const root_node = parseRScript(parser, app_script).rootNode;

  const ui_node = findUiDefInRApp(root_node);
  const server_node = findServerDefInRApp(root_node);

  const positionMaps = getServerPositions(server_node);

  return {
    ui_node,
    server_node,
    server_locations: {
      input_positions: convertMapToObject(positionMaps.input_positions),
      output_positions: convertMapToObject(positionMaps.output_positions),
      server_fn: getNodePositionAndIndent(server_node),
    },
  };
}

/**
 * Find the server node definition from a `server.R` script
 * @param root_node Root node of a parsed R script
 * @returns The node that contains the server declaration.
 * @throws If no server declaration is found in the script
 */
export function findServerDefInRApp(root_node: ParserNode): ParserNode {
  const server_node = searchForNode(root_node, fnDefIsServer);

  if (server_node) {
    return server_node;
  }

  throw new Error("No server function found in script");
}

function fnDefIsServer(node: ParserNode) {
  if (node.type !== "function_definition") return false;

  const fn_params = node.firstNamedChild;

  if (fn_params?.type !== "formal_parameters") return false;

  const param_names = fn_params.namedChildren.map((n) => n.text);

  return param_names.includes("input") && param_names.includes("output");
}

/**
 * Search through a script in reverse for a node satisfiying some search
 * function condition
 * @param root_node Root node of a parsed R script
 * @param search_fn Callback that returns true if the node is the one we're
 * looking for
 * @returns Node if found, null otherwise
 */
function searchForNode(
  root_node: ParserNode,
  search_fn: (node: ParserNode) => boolean
): ParserNode | null {
  // Search through the root-level nodes in reverse order, so we find the last
  // returned valid function definition
  for (let i = root_node.namedChildren.length - 1; i >= 0; i--) {
    const node = root_node.namedChildren[i];
    // If we're dealing with an assignment, we need to check if that assignment
    // is to a function
    if (
      node.type === "left_assignment" &&
      node.lastNamedChild &&
      search_fn(node.lastNamedChild)
    ) {
      return node.lastNamedChild;
    }

    if (search_fn(node)) {
      return node;
    }
  }

  return null;
}
/**
 * Find the ui node definition from a `ui.R` script
 * @param root_node Root node of a parsed R script
 * @returns The node that contains the ui declaration.
 * @throws If no ui declaration is found in the script
 */
export function findUiDefInRApp(root_node: ParserNode) {
  const ui_node = searchForNode(
    root_node,
    (node) => getRInfoIfKnown(node) !== null
  );

  if (ui_node) {
    return ui_node;
  }
  throw new Error("No ui declaration found in script");
}

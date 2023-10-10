import type { ParserNode, TSParser } from "treesitter-parsers";
import { getNodePositionAndIndent } from "treesitter-parsers";
import { convertMapToObject } from "util-functions/src/convertMapToObject";

import type { ParsedAppInfo } from "../parsing/ParsedAppInfo";

import { getRInfoIfKnown } from "./get_r_info_if_known";
import { getKnownRInputLocations } from "./getKnownRInputs";
import { getKnownROutputLocations } from "./getKnownROutputs";
import { parseRScript } from "./parseRScript";

export function parseRApp(parser: TSParser, app_script: string): ParsedAppInfo {
  const root_node = parseRScript(parser, app_script).rootNode;

  const server_node = searchForNode(root_node, fnDefIsServer);

  if (!server_node) {
    throw new Error("No server function found in script");
  }

  const ui_node = searchForNode(
    root_node,
    (node) => getRInfoIfKnown(node) !== null
  );

  if (!ui_node) {
    throw new Error("No ui declaration found in script");
  }

  return {
    root_node,
    ui_node,
    server_node,
  };
}

export function getRServerLocations(server_node: ParsedAppInfo["server_node"]) {
  const input_positions = getKnownRInputLocations(server_node);
  const output_positions = getKnownROutputLocations(server_node);

  return {
    input_positions: convertMapToObject(input_positions),
    output_positions: convertMapToObject(output_positions),
    server_fn: getNodePositionAndIndent(server_node),
  };
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

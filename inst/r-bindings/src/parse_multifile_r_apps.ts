import type { ParserNode, TSParser } from "treesitter-parsers";

import { get_ui_node_from_r_multifile_app } from ".";

import { get_r_info_if_known } from "./get_r_info_if_known";
import { parse_r_script } from "./parse_r_script";

export function find_ui_and_server_in_multifile_r_app(
  parser: TSParser,
  ui_script: string,
  server_script: string
) {
  const parsed_ui = parse_r_script(parser, ui_script).rootNode;
  const parsed_server = parse_r_script(parser, server_script).rootNode;

  return {
    ui_node: get_ui_node_from_r_multifile_app(parsed_ui),
    server_node: find_server_def_in_r_app(parsed_server),
  };
}
/**
 * Find the ui node definition from a `ui.R` script
 * @param root_node Root node of a parsed R script
 * @returns The node that contains the ui declaration.
 * @throws If no ui declaration is found in the script
 */
export function find_ui_def_in_r_app(root_node: ParserNode) {
  const ui_node = search_for_node(
    root_node,
    (node) => get_r_info_if_known(node) !== null
  );

  if (ui_node) {
    return ui_node;
  }
  throw new Error("No ui declaration found in script");
}

/**
 * Find the server node definition from a `server.R` script
 * @param root_node Root node of a parsed R script
 * @returns The node that contains the server declaration.
 * @throws If no server declaration is found in the script
 */
export function find_server_def_in_r_app(root_node: ParserNode): ParserNode {
  const server_node = search_for_node(root_node, fn_def_is_server);

  if (server_node) {
    return server_node;
  }

  throw new Error("No server function found in script");
}

function fn_def_is_server(node: ParserNode) {
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
function search_for_node(
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

import type { ParserNode, TSParser } from "treesitter-parsers";

import { get_r_info_if_known } from "./get_r_info_if_known";
import { parse_r_script } from "./parse_r_script";

/**
 * Find the ui node definition from a `ui.R` script
 * @param ui_script Script from the ui.R file for a given app
 * @returns The node that contains the ui declaration.
 * @throws If no ui declaration is found in the script
 */
export function get_ui_node_from_r_multifile_app(
  parser: TSParser,
  ui_script: string
) {
  const ui_node = search_for_node(
    parser,
    ui_script,
    (node) => get_r_info_if_known(node) !== null
  );

  if (ui_node) {
    return ui_node;
  }
  throw new Error("No ui declaration found in script");
}

/**
 * Find the server node definition from a `server.R` script
 * @param parser Parser to use to parse the script
 * @param server_script Script from the ui.R file for a given app
 * @returns The node that contains the server declaration.
 * @throws If no server declaration is found in the script
 */
export function get_server_node_from_r_multifile_app(
  parser: TSParser,
  server_script: string
): ParserNode {
  const server_node = search_for_node(parser, server_script, fn_def_is_server);

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
 * @param parser Parser to use to parse the script
 * @param script Script to search through
 * @param search_fn Callback that returns true if the node is the one we're
 * looking for
 * @returns Node if found, null otherwise
 */
function search_for_node(
  parser: TSParser,
  script: string,
  search_fn: (node: ParserNode) => boolean
): ParserNode | null {
  const root_node = parse_r_script(parser, script).rootNode;

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

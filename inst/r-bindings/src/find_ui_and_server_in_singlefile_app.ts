import type { TSParser } from "treesitter-parsers";
import { get_assignment_nodes, get_ui_assignment } from "treesitter-parsers";

import { parse_r_script } from "./parse_r_script";

export function find_ui_and_server_in_singlefile_app(
  parser: TSParser,
  app_script: string
) {
  const parsed = parse_r_script(parser, app_script);

  const assignment_nodes = get_assignment_nodes(parsed);
  const ui_node = get_ui_assignment(assignment_nodes, "ui");
  // TODO: Make this more robust like the multifile version
  const server_node = assignment_nodes.get("server");

  if (!ui_node) {
    throw new Error("No ui assignment found");
  }

  if (!server_node) {
    throw new Error("No server assignment found");
  }

  return { ui_node, server_node, root_node: parsed.rootNode };
}

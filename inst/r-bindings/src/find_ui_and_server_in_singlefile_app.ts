import type { TSParser } from "treesitter-parsers";

import { findServerDefInRApp, findUiDefInRApp } from "./parse_multifile_r_apps";
import { parseRScript } from "./parse_r_script";

export function find_ui_and_server_in_singlefile_app(
  parser: TSParser,
  app_script: string
) {
  const root_node = parseRScript(parser, app_script).rootNode;

  return {
    ui_node: findUiDefInRApp(root_node),
    server_node: findServerDefInRApp(root_node),
    root_node,
  };
}

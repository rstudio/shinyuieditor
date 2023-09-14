import type { TSParser } from "treesitter-parsers";

import { findServerDefInRApp, findUiDefInRApp } from "./parse_multifile_r_apps";
import { parseRScript } from "./parse_r_script";

export function FindUiAndServerInSinglefileRApp(
  parser: TSParser,
  app_script: string
) {
  const root_node = parseRScript(parser, app_script).rootNode;

  return {
    ui_node: findUiDefInRApp(root_node),
    server_node: findServerDefInRApp(root_node),
    ui_root: root_node,
  };
}

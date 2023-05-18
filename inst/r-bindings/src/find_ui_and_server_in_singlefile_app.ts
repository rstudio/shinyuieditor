import type { TSParser } from "treesitter-parsers";

import {
  find_server_def_in_r_app,
  find_ui_def_in_r_app,
} from "./parse_multifile_r_apps";
import { parse_r_script } from "./parse_r_script";

export function find_ui_and_server_in_singlefile_app(
  parser: TSParser,
  app_script: string
) {
  const root_node = parse_r_script(parser, app_script).rootNode;

  return {
    ui_node: find_ui_def_in_r_app(root_node),
    server_node: find_server_def_in_r_app(root_node),
    root_node,
  };
}

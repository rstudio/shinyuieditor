import type { ParserNode, TSParser } from "treesitter-parsers";

import { find_ui_and_server_in_singlefile_app } from "./find_ui_and_server_in_singlefile_app";
import { getServerPositions } from "./get_server_positions";
import { findUiAndServerInMultifileRApp } from "./parse_multifile_r_apps";

type ParsedRApp = {
  ui_node: ParserNode;
  server_node: ParserNode;
} & ReturnType<typeof getServerPositions>;
export function parseRApp(parser: TSParser, app_script: string): ParsedRApp;
export function parseRApp(
  parser: TSParser,
  ui_script: string,
  server_script: string
): ParsedRApp;
export function parseRApp(
  parser: TSParser,
  ui_or_app_script: string,
  server_script?: string
): ParsedRApp {
  const { ui_node, server_node } = server_script
    ? findUiAndServerInMultifileRApp(parser, ui_or_app_script, server_script)
    : find_ui_and_server_in_singlefile_app(parser, ui_or_app_script);

  const { input_positions, output_positions } = getServerPositions(server_node);
  return {
    ui_node,
    server_node,
    input_positions,
    output_positions,
  };
}

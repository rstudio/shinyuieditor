import type { ParserNode, TSParser } from "treesitter-parsers";

import { find_ui_and_server_in_singlefile_app } from "./find_ui_and_server_in_singlefile_app";
import { get_server_positions } from "./get_server_positions";
import { find_ui_and_server_in_multifile_r_app } from "./parse_multifile_r_apps";

type Parsed_R_App = {
  ui_node: ParserNode;
  server_node: ParserNode;
} & ReturnType<typeof get_server_positions>;
export function parse_r_app(parser: TSParser, app_script: string): Parsed_R_App;
export function parse_r_app(
  parser: TSParser,
  ui_script: string,
  server_script: string
): Parsed_R_App;
export function parse_r_app(
  parser: TSParser,
  ui_or_app_script: string,
  server_script?: string
): Parsed_R_App {
  const { ui_node, server_node } = server_script
    ? find_ui_and_server_in_multifile_r_app(
        parser,
        ui_or_app_script,
        server_script
      )
    : find_ui_and_server_in_singlefile_app(parser, ui_or_app_script);

  const { input_positions, output_positions } =
    get_server_positions(server_node);
  return {
    ui_node,
    server_node,
    input_positions,
    output_positions,
  };
}

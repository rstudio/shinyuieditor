import type { InputOutputLocations } from "communication-types/src/MessageToBackend";
import type { ParserNode, TSParser } from "treesitter-parsers";
import { convertMapToObject } from "util-functions/src/convertMapToObject";

import { find_ui_and_server_in_singlefile_app } from "./find_ui_and_server_in_singlefile_app";
import { getServerPositions } from "./get_server_positions";
import { findUiAndServerInMultifileRApp } from "./parse_multifile_r_apps";

type ParsedRApp = {
  ui_node: ParserNode;
  server_node: ParserNode;
  server_locations: InputOutputLocations;
};
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

  return {
    ui_node,
    server_node,
    server_locations: convertServerPositionMapToObject(
      getServerPositions(server_node)
    ),
  };
}

function convertServerPositionMapToObject(
  positionMaps: ReturnType<typeof getServerPositions>
): InputOutputLocations {
  return {
    input_positions: convertMapToObject(positionMaps.input_positions),
    output_positions: convertMapToObject(positionMaps.output_positions),
  };
}

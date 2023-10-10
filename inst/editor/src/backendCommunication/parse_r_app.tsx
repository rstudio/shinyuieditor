import type { AppInfo } from "communication-types/src/AppInfo";

import {
  generateRAppScriptTemplate,
  parse_r_app,
  r_treesitter_to_ui_tree,
} from "../r-parsing";

import type { AppParserArgs } from "./parse_python_app";

export async function parseRAppText({
  app_script,
  parser: parser_promise,
}: AppParserArgs) {
  const parser = await parser_promise;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ui_node, server_locations } = parse_r_app(parser, app_script);

  const app_info: AppInfo = {
    language: "R",
    app_script,
    ui_tree: r_treesitter_to_ui_tree(ui_node),
    server_locations,
    app: generateRAppScriptTemplate(ui_node),
  };
  return app_info;
}

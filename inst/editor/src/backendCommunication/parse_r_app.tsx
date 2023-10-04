import type { AppInfo } from "communication-types/src/AppInfo";
import type { TSParser } from "treesitter-parsers";

import {
  parse_r_app,
  r_treesitter_to_ui_tree,
  generateRAppScriptTemplate,
} from "../r-parsing";

import type { AppParserArgs } from "./parse_python_app";

// We do this outside so we only run the setup code once
// const my_parser = setup_r_parser();
async function parseSingleFileRApp(
  app: string,
  parser: TSParser
): Promise<AppInfo> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ui_node, server_locations } = parse_r_app(parser, app);

  const app_info: AppInfo = {
    language: "R",
    scripts: {
      app,
    },
    ui_tree: r_treesitter_to_ui_tree(ui_node),
    server_locations,
    app: generateRAppScriptTemplate(ui_node),
  };

  return app_info;
}

export async function parseRAppText({
  scripts,
  parser: parser_promise,
}: AppParserArgs) {
  const parser = await parser_promise;

  return await parseSingleFileRApp(scripts.app, parser);
}

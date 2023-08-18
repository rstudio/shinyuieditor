import type { AppInfo } from "communication-types/src/AppInfo";
import {
  generate_app_script_template,
  parse_r_app,
  r_treesitter_to_ui_tree,
} from "r-bindings";
import type { TSParser } from "treesitter-parsers";

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
    app_type: "SINGLE-FILE",
    scripts: {
      app_type: "SINGLE-FILE",
      app,
    },
    ui_tree: r_treesitter_to_ui_tree(ui_node),
    server_locations,
    app: generate_app_script_template(ui_node),
  };

  return app_info;
}

async function parseMultiFileRApp(
  ui: string,
  server: string,
  parser: TSParser
): Promise<AppInfo> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ui_node, server_locations } = parse_r_app(parser, ui, server);

  const app_info: AppInfo = {
    language: "R",
    app_type: "MULTI-FILE",
    scripts: {
      app_type: "MULTI-FILE",
      ui,
      server,
    },
    server_locations,
    ui_tree: r_treesitter_to_ui_tree(ui_node),
    ui: generate_app_script_template(ui_node),
    server: { code: server },
  };

  return app_info;
}

export async function parseRAppText({
  scripts,
  parser: parser_promise,
}: AppParserArgs) {
  const parser = await parser_promise;

  if ("app" in scripts) {
    return await parseSingleFileRApp(scripts.app, parser);
  } else {
    return await parseMultiFileRApp(scripts.ui, scripts.server, parser);
  }
}

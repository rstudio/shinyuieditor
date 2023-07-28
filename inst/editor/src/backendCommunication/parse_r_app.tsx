import type { App_Info } from "communication-types/src/AppInfo";
import {
  generate_app_script_template,
  parse_r_app,
  r_treesitter_to_ui_tree,
} from "r-bindings";
import { setup_r_parser } from "treesitter-parsers";

const my_parser = setup_r_parser();

export async function parseSingleFileRApp(app: string): Promise<App_Info> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { server_node, ui_node, input_positions, output_positions } =
    parse_r_app(await my_parser, app);

  const app_info: App_Info = {
    language: "R",
    app_type: "SINGLE-FILE",
    scripts: {
      app_type: "SINGLE-FILE",
      app,
    },
    ui_tree: r_treesitter_to_ui_tree(ui_node),
    known_outputs: [...output_positions.keys()],
    app: generate_app_script_template(ui_node),
  };

  return app_info;
}

export async function parseMultiFileRApp(
  ui: string,
  server: string
): Promise<App_Info> {
  const parser = await my_parser;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ui_node, server_node, input_positions, output_positions } =
    parse_r_app(parser, ui, server);

  const app_info: App_Info = {
    language: "R",
    app_type: "MULTI-FILE",
    scripts: {
      app_type: "MULTI-FILE",
      ui,
      server,
    },
    ui_tree: r_treesitter_to_ui_tree(ui_node),
    known_outputs: [...output_positions.keys()],
    ui: generate_app_script_template(ui_node),
    server: { code: server },
  };

  return app_info;
}

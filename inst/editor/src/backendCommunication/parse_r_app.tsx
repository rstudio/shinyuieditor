import type { App_Info } from "communication-types/src/AppInfo";
import {
  find_ui_and_server_in_singlefile_app,
  generate_app_script_template,
  get_server_positions,
  get_ui_node_from_r_multifile_app,
  parse_r_script,
  r_treesitter_to_ui_tree,
} from "r-bindings";
import { get_server_node_from_r_multifile_app } from "r-bindings/src/parse_multifile_r_apps";
import {
  get_assignment_nodes,
  get_ui_assignment,
  setup_r_parser,
} from "treesitter-parsers";

const my_parser = setup_r_parser();

export async function parse_single_file_r_app(app: string): Promise<App_Info> {
  const { server_node, ui_node } = find_ui_and_server_in_singlefile_app(
    await my_parser,
    app
  );

  const { input_positions, output_positions } =
    get_server_positions(server_node);

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

export async function parse_multi_file_r_app(
  ui: string,
  server: string
): Promise<App_Info> {
  console.time("parse_r_script");

  const parser = await my_parser;
  const ui_node = get_ui_node_from_r_multifile_app(parser, ui);
  const server_node = get_server_node_from_r_multifile_app(parser, server);

  if (!server_node) {
    throw new Error("No server node found");
  }

  const { input_positions, output_positions } =
    get_server_positions(server_node);

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

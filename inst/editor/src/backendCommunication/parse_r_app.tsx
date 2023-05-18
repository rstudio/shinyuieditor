import type { App_Info } from "communication-types/src/AppInfo";
import type { Script_Range } from "communication-types/src/MessageToBackend";
import {
  generate_app_script_template,
  get_ui_node_from_r_multifile_app,
  parse_r_script,
  r_treesitter_to_ui_tree,
} from "r-bindings";
import { get_server_node_from_r_multifile_app } from "r-bindings/src/parse_multifile_r_apps";
import type { ParserNode } from "treesitter-parsers";
import {
  get_assignment_nodes,
  get_node_position,
  get_ui_assignment,
  setup_r_parser,
} from "treesitter-parsers";

const my_parser = setup_r_parser();

export async function parse_single_file_r_app(app: string): Promise<App_Info> {
  const parsed = parse_r_script(await my_parser, app);
  const assignment_nodes = get_assignment_nodes(parsed);
  const ui_node = get_ui_assignment(assignment_nodes, "ui");

  const input_positions = new Map<string, Script_Range[]>();
  const output_positions = new Map<string, Script_Range[]>();

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

  const input_positions = new Map<string, Script_Range[]>();
  const output_positions = get_output_positions_from_server(server_node);

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

function get_output_positions_from_server(server_node: ParserNode) {
  const output_positions = new Map<string, Script_Range[]>();

  const assignments = server_node.descendantsOfType("left_assignment");

  assignments.forEach((assignment) => {
    const output_name = get_name_if_output_node(assignment);

    if (!output_name) {
      return;
    }

    const output_loc = get_node_position(assignment);

    if (output_positions.has(output_name)) {
      output_positions.set(
        output_name,
        output_positions.get(output_name)!.concat(output_loc)
      );
    } else {
      output_positions.set(output_name, [output_loc]);
    }
  });

  return output_positions;
}

function get_name_if_output_node(node: ParserNode): string | null {
  const lhs = node.firstNamedChild;
  if (!lhs) {
    return null;
  }

  if (lhs.type !== "dollar" || lhs.firstNamedChild?.text !== "output") {
    return null;
  }

  const output_name = lhs.namedChild(1)?.text ?? null;

  return output_name;
}

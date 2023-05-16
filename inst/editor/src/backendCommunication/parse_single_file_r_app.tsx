import type { App_Info } from "communication-types/src/AppInfo";
import type { Script_Range } from "communication-types/src/MessageToBackend";
import {
  generate_app_script_template,
  parse_r_script,
  r_treesitter_to_ui_tree,
} from "r-bindings";
import {
  get_assignment_nodes,
  get_ui_assignment,
  setup_r_parser,
} from "treesitter-parsers";

const my_parser = setup_r_parser();

export async function parse_single_file_r_app(app: string): Promise<App_Info> {
  console.time("parse_r_script");
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

  console.timeEnd("parse_r_script");

  return app_info;
}

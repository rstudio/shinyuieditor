import type { AppInfo, AppScriptInfo } from "communication-types/src/AppInfo";
import {
  generate_app_script_template,
  get_known_inputs,
  get_known_outputs,
  treesitter_to_ui_tree,
} from "python-bindings";
import { getServerNodePosition } from "python-bindings/src/get_server_node_position";
import type { TSParser } from "treesitter-parsers";
import { get_assignment_nodes, get_ui_assignment } from "treesitter-parsers";
import { convertMapToObject } from "util-functions/src/convertMapToObject";

export type AppParserArgs = {
  scripts: AppScriptInfo;
  parser: Promise<TSParser>;
};

export async function parsePythonAppText({
  scripts,
  parser: parser_promise,
}: AppParserArgs) {
  if (!("app" in scripts)) {
    throw new Error("Multifile python apps are not supported");
  }
  const app = scripts.app;

  const parsed_app = (await parser_promise).parse(app);
  const assignment_nodes = get_assignment_nodes(parsed_app);
  const ui_node = get_ui_assignment(assignment_nodes);

  if (!ui_node) {
    throw new Error("No UI node found");
  }

  const input_positions = get_known_inputs(parsed_app);
  const output_positions = get_known_outputs(parsed_app);

  const app_info: AppInfo = {
    language: "PYTHON",
    app_type: "SINGLE-FILE",
    scripts: {
      app_type: "SINGLE-FILE",
      app: app,
    },
    ui_tree: treesitter_to_ui_tree(ui_node),
    server_locations: {
      input_positions: convertMapToObject(input_positions),
      output_positions: convertMapToObject(output_positions),
      server_fn: getServerNodePosition(parsed_app),
    },
    app: generate_app_script_template(ui_node),
  };

  return app_info;
}

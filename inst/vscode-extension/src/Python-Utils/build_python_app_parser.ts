import type { AppInfo } from "communication-types/src/AppInfo";
import {
  generate_app_script_template,
  get_known_inputs,
  get_known_outputs,
  get_server_node_position,
  treesitter_to_ui_tree,
} from "python-bindings";
import {
  get_ui_assignment,
  setup_python_parser,
  get_assignment_nodes,
} from "treesitter-parsers";
import type * as vscode from "vscode";

import type { AppParser, InfoGetResults } from "../App_Parser";
import { makeCachedInfoGetter } from "../make_cached_info_getter";
import type { CommandOutputGeneric } from "../R-Utils/runRCommand";

type Parser = Awaited<ReturnType<typeof setup_python_parser>>;
export async function buildPythonAppParser(
  document: vscode.TextDocument
): Promise<AppParser> {
  // Startup parser

  // Wrap initialization of parser into a try catch to catch and display potential errors
  let parser: Parser;
  try {
    parser = await setup_python_parser();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Failed to initialise parser", e);
    throw e;
  }

  const check_if_pkgs_installed = async (pkgs: string) => {
    //  TODO: Implement this
    return { success: true } as const;
  };

  return {
    getInfo: makeCachedInfoGetter(document, makePyAppInfoGetter(parser)),
    check_if_pkgs_installed,
  };
}

function makePyAppInfoGetter(parser: Parser) {
  return async function (
    text: string
  ): Promise<CommandOutputGeneric<InfoGetResults>> {
    const parsed_app = parser.parse(text);

    const assignment_nodes = get_assignment_nodes(parsed_app);
    const ui_node = get_ui_assignment(assignment_nodes);

    if (!ui_node) {
      return {
        status: "error",
        errorMsg: "No UI assignment found",
      };
    }

    const input_positions = get_known_inputs(parsed_app);
    const output_positions = get_known_outputs(parsed_app);

    const app_info: AppInfo = {
      language: "PYTHON",
      app_type: "SINGLE-FILE",
      scripts: {
        app_type: "SINGLE-FILE",
        app: text,
      },
      ui_tree: treesitter_to_ui_tree(ui_node),
      known_outputs: [...output_positions.keys()],
      app: generate_app_script_template(ui_node),
    };

    return {
      status: "success",
      values: {
        ui: app_info,
        server: {
          get_output_position: (name: string) =>
            output_positions.get(name) ?? [],
          get_input_positions: (name: string) =>
            input_positions.get(name) ?? [],
          server_pos: get_server_node_position(parsed_app),
          app_type: "SINGLE-FILE",
        },
      },
    };
  };
}

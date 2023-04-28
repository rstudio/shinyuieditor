import {
  generate_app_script_template,
  get_assignment_nodes,
  get_known_outputs,
  get_server_node_position,
  get_ui_assignment,
  treesitter_to_ui_tree,
} from "abstract-snake-tree";
import type { App_Info } from "communication-types/src/AppInfo";
import { setup_python_parser } from "python-ts-parser";
import type * as vscode from "vscode";

import type { App_Parser } from "../App_Parser";
import type { INFO_GET_RESULTS } from "../R-Utils/getAppInfo";
import { make_cached_info_getter } from "../R-Utils/getAppInfo";
import type { CommandOutputGeneric } from "../R-Utils/runRCommand";

type Parser = Awaited<ReturnType<typeof setup_python_parser>>;
export async function build_python_app_parser(
  document: vscode.TextDocument
): Promise<App_Parser> {
  // Startup parser

  // Wrap initialization of parser into a try catch to catch and display potential errors
  let parser: Parser;
  try {
    parser = await setup_python_parser();
  } catch (e) {
    console.error("Failed to initialise parser", e);
    throw e;
  }

  const check_if_pkgs_installed = async (pkgs: string) => {
    //  TODO: Implement this

    return { success: true } as const;
  };

  return {
    getInfo: make_cached_info_getter(document, makePyAppInfoGetter(parser)),
    check_if_pkgs_installed,
  };
}

function makePyAppInfoGetter(parser: Parser) {
  return async function (
    text: string
  ): Promise<CommandOutputGeneric<INFO_GET_RESULTS>> {
    const parsed_app = parser.parse(text);

    const assignment_nodes = get_assignment_nodes(parsed_app);
    const ui_node = get_ui_assignment(assignment_nodes);

    if (!ui_node) {
      return {
        status: "error",
        errorMsg: "No UI assignment found",
      };
    }

    const output_positions = get_known_outputs(parsed_app);
    const output_names = new Set<string>(output_positions.keys());

    const app_info: App_Info = {
      language: "PYTHON",
      app_type: "SINGLE-FILE",
      ui_tree: treesitter_to_ui_tree(ui_node),
      known_outputs: output_names,
      app: generate_app_script_template(ui_node),
    };

    return {
      status: "success",
      values: {
        parsed_info: app_info,
        server_info: {
          get_output_position: (name: string) => {
            const output = output_positions.get(name);
            return output ? [output] : null;
          },
          server_pos: get_server_node_position(parsed_app),
          app_type: "SINGLE-FILE",
        },
      },
    };
  };
}

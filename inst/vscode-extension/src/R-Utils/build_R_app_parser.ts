import type { App_Info } from "communication-types/src/AppInfo";
import type { Script_Range } from "communication-types/src/MessageToBackend";
import {
  generate_app_script_template,
  r_treesitter_to_ui_tree,
} from "r-bindings";
import type { ParserNode, ParserTree, TSParser } from "treesitter-parsers";
import {
  get_assignment_nodes,
  get_ui_assignment,
  setup_r_parser,
} from "treesitter-parsers";
import type * as vscode from "vscode";

import type { App_Parser, INFO_GET_RESULTS } from "../App_Parser";
import { make_cached_info_getter } from "../make_cached_info_getter";

import type { CommandOutputGeneric } from "./runRCommand";

export async function build_R_app_parser(
  document: vscode.TextDocument
): Promise<App_Parser> {
  let parser: TSParser;

  try {
    parser = await setup_r_parser();
  } catch (e) {
    console.error("Failed to initialise parser", e);
    throw e;
  }

  const check_if_pkgs_installed = async (pkgs: string) => {
    //  TODO: Implement this

    return { success: true } as const;
  };

  return {
    getInfo: make_cached_info_getter(document, makRAppInfoGetter(parser)),
    check_if_pkgs_installed,
  };
}

function makRAppInfoGetter(parser: TSParser) {
  return async function (
    text: string
  ): Promise<CommandOutputGeneric<INFO_GET_RESULTS>> {
    const parsed_app = parser.parse(text);

    const assignment_nodes = get_assignment_nodes(parsed_app);
    const ui_node = get_ui_assignment(assignment_nodes, "ui");

    if (!ui_node) {
      return {
        status: "error",
        errorMsg: "No UI assignment found",
      };
    }

    // const input_positions = get_known_inputs(parsed_app);
    // const output_positions = get_known_outputs(parsed_app);

    const input_positions = new Map<string, Script_Range[]>();
    const output_positions = new Map<string, Script_Range[]>();

    const app_info: App_Info = {
      language: "R",
      app_type: "SINGLE-FILE",
      scripts: {
        app_type: "SINGLE-FILE",
        app: text,
      },
      ui_tree: r_treesitter_to_ui_tree(ui_node),
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

/**
 * Get position of the server node in the script in Ui-Editor friendly format
 * @param parsed_app Parsed app tree object. As returned from `parse_python_script`
 * @returns Location of the server node in the script
 */
export function get_server_node_position(parsed_app: ParserTree): {
  server_fn: Script_Range;
  indent: number;
} {
  const assignment_nodes = get_assignment_nodes(parsed_app);

  const server_node = assignment_nodes.get("server");

  if (!server_node) {
    throw new Error("No server node found");
  }

  // Get the indent of the server function or if there' is nothing, default to two spaces
  const indent = server_node.lastNamedChild?.startPosition.column ?? 2;

  return {
    server_fn: get_node_position(server_node),
    indent,
  };
}

// TODO: Move this to the general ts parser lib
/**
 * Get position of node in the script in Ui-Editor friendly format
 * @param node Node from the tree sitter tree
 * @returns Position of that node in the script
 */
export function get_node_position(node: ParserNode): Script_Range {
  const { startPosition, endPosition } = node;

  return {
    start: startPosition,
    end: endPosition,
  };
}

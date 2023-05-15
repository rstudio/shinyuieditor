import type {
  App_Info,
  Script_Generation_Template,
} from "communication-types/src/AppInfo";
import type { Script_Range } from "communication-types/src/MessageToBackend";
import { r_treesitter_to_ui_tree } from "r-bindings";
import type { ParserNode, ParserTree, TSParser } from "treesitter-parsers";
import {
  get_assignment_nodes,
  get_ui_assignment,
  setup_r_parser,
} from "treesitter-parsers";
import { SCRIPT_LOC_KEYS } from "ui-node-definitions/src/code_generation/generate_ui_script";
import type * as vscode from "vscode";

import type { App_Parser, INFO_GET_RESULTS } from "../App_Parser";
import { make_cached_info_getter } from "../make_cached_info_getter";

// import { makeRAppInfoGetter } from "./getAppInfo";
import type { CommandOutputGeneric } from "./runRCommand";
import { startBackgroundRProcess } from "./startBackgroundRProcess";

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

  // Startup background R process
  const RProcess = await startBackgroundRProcess();
  if (!RProcess) {
    throw new Error("Don't have an R Process to pass to editor backend!");
  }

  const check_if_pkgs_installed = async (pkgs: string) => {
    // const pkgsLoaded = await checkIfPkgAvailable(RProcess, pkgs);

    // if (pkgsLoaded.status === "error") {
    //   return { success: false, msg: pkgsLoaded.msg } as const;
    // }
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
function generate_app_script_template(
  ui_node: ParserNode
): Script_Generation_Template {
  let packages: string[] = ["shiny"];

  const full_app_script = ui_node.tree.rootNode.text;

  let templated_app_script = full_app_script
    .replace(ui_node.text, SCRIPT_LOC_KEYS.ui)
    .replace("from shiny import *", SCRIPT_LOC_KEYS.packages);

  // Remove all the other packages completely. This may cause reordering of
  // imports if the ones we find are not inline with shiny but that's okay
  for (const pkg of packages.filter((p) => p !== "shiny")) {
    templated_app_script = templated_app_script.replace(
      // Fancy regex also removes newline so we don't just end up with empty
      // lines where the old imports were
      new RegExp(`from ${pkg} import \\*\\s*\\n`),
      ""
    );
  }

  // We need to add a newline in here because the parser seems to remove it
  return { code: templated_app_script, packages };
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

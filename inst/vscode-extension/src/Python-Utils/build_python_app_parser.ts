import {
  get_assignment_nodes,
  get_ui_assignment,
  setup_python_parser,
  treesitter_to_ui_tree,
} from "abstract-snake-tree";
import type { App_Info } from "communication-types/src/AppInfo";
import type * as vscode from "vscode";

import type { App_Parser } from "../App_Parser";
import type { INFO_GET_RESULTS } from "../R-Utils/getAppInfo";
import { make_cached_info_getter } from "../R-Utils/getAppInfo";
import type { CommandOutputGeneric } from "../R-Utils/runRCommand";

export async function build_python_app_parser(
  document: vscode.TextDocument
): Promise<App_Parser> {
  // Startup parser
  // parse_python_script(simple_app_script)
  const parser = setup_python_parser();

  const get_app_info = async (
    text: string
  ): Promise<CommandOutputGeneric<INFO_GET_RESULTS>> => {
    const parsed = parser.parse(text);

    const assignment_nodes = get_assignment_nodes(parsed);
    const ui_node = get_ui_assignment(assignment_nodes);

    if (!ui_node) {
      return {
        status: "error",
        errorMsg: "No UI assignment found",
      };
    }

    const ui_tree = treesitter_to_ui_tree(ui_node);
    const app_info: App_Info = {
      language: "PYTHON",
      app_type: "SINGLE-FILE",
      ui_tree,
      // TODO: Make this actually work by looking at parsed tre
      known_outputs: new Set<string>(),
      app: {
        code: "",
        packages: [],
      },
    };

    return {
      status: "success",
      values: {
        parsed_info: app_info,
      },
    };
  };

  const getInfo = make_cached_info_getter(document, get_app_info);

  const check_if_pkgs_installed = async (pkgs: string) => {
    //  TODO: Implement this

    return { success: true } as const;
  };

  return {
    getInfo,
    check_if_pkgs_installed,
  };
}

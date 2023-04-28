import type {
  App_Info,
  Script_Generation_Template,
} from "communication-types/src/AppInfo";
import type { Script_Position } from "communication-types/src/MessageToBackend";
import type { Raw_R_Info } from "r-ast-parsing";
import { SCRIPT_LOC_KEYS } from "ui-node-definitions/src/code_generation/generate_ui_script";

import { ast_to_ui_node } from "./ast_to_shiny_ui_node";
import {
  get_assignment_nodes,
  get_known_outputs,
  get_ui_assignment_node,
} from "./get_assignment_nodes";

/**
 * Go from basic info about R Shiny app and turn it into the neccesary
 * information for the Ui Editor to run
 * @param info Raw info from R call. Will just have an simple R AST and script
 * for either the app.R file or the ui.R and server.R files
 * @returns Full parsed ui tree and requesite server info to generate full app
 * scripts from a ui tree
 */
export function raw_R_info_to_app_info(info: Raw_R_Info): App_Info {
  return info.app_type === "SINGLE-FILE"
    ? raw_single_file_app_info_to_full(info)
    : raw_multi_file_app_info_to_full(info);
}

function raw_multi_file_app_info_to_full(
  raw_info: Extract<Raw_R_Info, { app_type: "MULTI-FILE" }>
): App_Info {
  const { ui, server } = raw_info;

  const ui_assignment_nodes = get_assignment_nodes(ui.ast);
  const { ui_root_node, ui_pos, ui_assignment_operator } =
    get_ui_assignment_node(ui_assignment_nodes);
  const ui_tree = ast_to_ui_node(ui_root_node);
  const server_assignment_nodes = get_assignment_nodes(server.ast);
  const known_outputs = get_known_outputs(server_assignment_nodes);

  return {
    ui_tree,
    language: "R",
    known_outputs,
    app_type: "MULTI-FILE",
    ui: generate_R_ui_script_template(
      { ui_pos, ui_assignment_operator },
      ui.script
    ),
    server: {
      code: server.script,
    },
  };
}

function raw_single_file_app_info_to_full(
  raw_info: Extract<Raw_R_Info, { app_type: "SINGLE-FILE" }>
): App_Info {
  const assignment_nodes = get_assignment_nodes(raw_info.app.ast);
  const {
    ui_root_node,
    ui_pos,
    ui_assignment_operator: assignment_operator,
  } = get_ui_assignment_node(assignment_nodes);

  // This gets t
  // const ui_root_node = ui_node.val[2];
  const ui_tree = ast_to_ui_node(ui_root_node);
  const known_outputs = get_known_outputs(assignment_nodes);

  return {
    ui_tree,
    language: "R",
    known_outputs,
    app_type: "SINGLE-FILE",
    app: generate_R_ui_script_template(
      { ui_pos: ui_pos, ui_assignment_operator: assignment_operator },
      raw_info.app.script
    ),
  };
}

function generate_R_ui_script_template(
  {
    ui_pos,
    ui_assignment_operator,
  }: {
    ui_pos: Script_Position;
    ui_assignment_operator: string;
  },
  ui_script: string
): Script_Generation_Template {
  const ui_script_by_line = ui_script.split("\n");
  let libraries: string[] = ["shiny"];
  let ui_template_by_line: string[] = [];
  let previous_line_type: Line_Type;

  ui_script_by_line.forEach((line, line_number) => {
    const line_type = get_line_type({ line, line_number, ui_pos });

    if (line_type === "Other") {
      ui_template_by_line.push(line);
      return;
    }

    if (line_type === "Library") {
      const loaded_library = library_finder.exec(line)?.groups?.library;

      if (loaded_library && loaded_library !== "shiny") {
        libraries.push(loaded_library);
      }
    }

    if (line_type === previous_line_type) return;

    previous_line_type = line_type;

    if (line_type === "UI") {
      ui_template_by_line.push(
        `ui ${ui_assignment_operator} ${SCRIPT_LOC_KEYS.ui}`
      );
    } else if (line_type === "Library") {
      ui_template_by_line.push(SCRIPT_LOC_KEYS.packages);
    } else {
      throw new Error("Unknown line type");
    }
  });

  return { code: ui_template_by_line.join("\n"), packages: libraries };
}

function within_position(
  line_number: number,
  [ui_start_row, ui_start_col, ui_end_row, ui_end_col]: Script_Position
): boolean {
  return line_number >= ui_start_row - 1 && line_number <= ui_end_row - 1;
}

type Line_Type = "Library" | "UI" | "Other";
function get_line_type({
  line,
  line_number,
  ui_pos,
}: {
  line: string;
  line_number: number;
  ui_pos: Script_Position;
}): Line_Type {
  if (within_position(line_number, ui_pos)) return "UI";

  if (library_finder.test(line)) return "Library";

  return "Other";
}

const library_finder = /^\s*library\((?<library>\w+)\)/;

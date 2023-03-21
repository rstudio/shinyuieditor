import type { Script_Position } from "r-ast-parsing";

import type { EditingState, ErrorState } from "../state/app_info";

import type {
  Raw_App_Info,
  Single_File_Raw_App_Info,
  Single_File_Full_Info,
  Multi_File_Full_Info,
  Multi_File_Raw_App_Info,
  Full_App_Info,
} from ".";
import { SCRIPT_LOC_KEYS } from ".";

import type { Parsed_Multi_File_AST } from "./parse_app_ast";
import { parse_app_ast } from "./parse_app_ast";

export function ensure_full_app_info(
  info: Raw_App_Info | Full_App_Info
): EditingState | ErrorState {
  if ("ui_tree" in info) return { mode: "MAIN", ...info };

  try {
    const full_info =
      info.app_type === "SINGLE-FILE"
        ? raw_single_file_app_info_to_full(info)
        : raw_multi_file_app_info_to_full(info);

    return { mode: "MAIN", ...full_info };
  } catch (error) {
    const error_msg = error instanceof Error ? error.message : null;

    if (error_msg === null) {
      // eslint-disable-next-line no-console
      console.error("Unknown error type seen", error);
    }
    return {
      mode: "ERROR",
      msg: error_msg ?? "Unknown error",
      context: "Parsing app information from backend",
    };
  }
}

function raw_single_file_app_info_to_full(
  raw_info: Single_File_Raw_App_Info
): Single_File_Full_Info {
  const parsed_ast = parse_app_ast(raw_info);
  const {
    app: { ui_pos, ui_assignment_operator, ui_tree, known_outputs },
  } = parsed_ast;
  const script = raw_info.app.script;

  const script_by_line = script.split("\n");
  let libraries: string[] = ["shiny"];
  let app_template_by_line: string[] = [];

  let previous_line_type: Line_Type;
  script_by_line.forEach((line, line_number) => {
    const line_type = get_line_type({ line, line_number, ui_pos });

    if (line_type === "Other") {
      app_template_by_line.push(line);
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
      app_template_by_line.push(
        `ui ${ui_assignment_operator} ${SCRIPT_LOC_KEYS.ui}`
      );
    } else if (line_type === "Library") {
      app_template_by_line.push(SCRIPT_LOC_KEYS.libraries);
    } else {
      throw new Error("Unknown line type");
    }
  });

  return {
    app_type: "SINGLE-FILE",
    ui_tree,
    known_outputs,
    app: {
      code: app_template_by_line.join("\n"),
      libraries,
    },
  };
}

function generate_ui_script_template(
  { ui_pos, ui_assignment_operator }: Parsed_Multi_File_AST["ui"],
  ui_script: string
): Multi_File_Full_Info["ui"] {
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
      ui_template_by_line.push(SCRIPT_LOC_KEYS.libraries);
    } else {
      throw new Error("Unknown line type");
    }
  });

  return { code: ui_template_by_line.join("\n"), libraries };
}

function raw_multi_file_app_info_to_full(
  raw_info: Multi_File_Raw_App_Info
): Multi_File_Full_Info {
  const {
    ui,
    server: { known_outputs },
  } = parse_app_ast(raw_info);

  return {
    app_type: "MULTI-FILE",
    ui_tree: ui.ui_tree,
    known_outputs,
    ui: generate_ui_script_template(ui, raw_info.ui.script),
    server: {
      code: raw_info.server.script,
    },
  };
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

import type { Raw_App_Info, Script_Position } from "ast-parsing";
import { parse_app_ast } from "ast-parsing/src/ast_to_shiny_ui_node";
import { ui_node_to_R_code } from "ast-parsing/src/code_generation/ui_node_to_R_code";
import type { Output_Server_Pos } from "ast-parsing/src/get_assignment_nodes";
import type { ShinyUiNode } from "editor";

export type Full_App_Info = {
  code: string;
  ui_tree: ShinyUiNode;
  libraries: string[];
  /** Sometimes these don't exist due to being in client-side mode without access to full */
  output_positions?: Output_Server_Pos;
};

export const SCRIPT_LOC_KEYS = {
  ui: "<UI>",
  libraries: "<LIBRARIES>",
};

export function raw_app_info_to_full({
  script,
  ast,
}: Raw_App_Info): Full_App_Info {
  const script_by_line = script.split("\n");
  const { ui_tree, ui_assignment_operator, output_positions, ui_pos } =
    parse_app_ast(ast);

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
    code: app_template_by_line.join("\n"),
    libraries,
    ui_tree,
    output_positions,
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

export function generate_full_app_script({
  code,
  ui_tree,
  libraries,
}: Full_App_Info): string {
  const { ui_code, library_calls } = ui_node_to_R_code(ui_tree, {
    remove_namespace: true,
  });

  // Don't double do the libraries
  const extra_libraries = libraries.filter((l) => !library_calls.includes(l));
  const all_library_calls = [...extra_libraries, ...library_calls]
    .map((l) => `library(${l})`)
    .join("\n");

  return code
    .replace(SCRIPT_LOC_KEYS.ui, ui_code)
    .replace(SCRIPT_LOC_KEYS.libraries, all_library_calls);
}

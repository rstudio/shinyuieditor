import type { ShinyUiNode } from "../Shiny-Ui-Elements/uiNodeTypes";
import type { Language_Mode } from "../state/languageMode";

import type { Multi_File_Full_Info } from ".";
import { SCRIPT_LOC_KEYS } from ".";

import { ui_node_to_python_code } from "./code_generation/ui_node_to_python_code";
import { ui_node_to_R_code } from "./code_generation/ui_node_to_R_code";

function ui_node_to_code({
  ui_tree,
  language,
}: {
  ui_tree: ShinyUiNode;
  language: Language_Mode;
}) {
  switch (language) {
    case "R": {
      return ui_node_to_R_code(ui_tree, { remove_namespace: true });
    }
    case "PYTHON": {
      return ui_node_to_python_code(ui_tree);
    }
  }
}

export function generate_ui_script({
  ui_tree,
  libraries: existing_libraries,
  language,
  code,
}: {
  ui_tree: Multi_File_Full_Info["ui_tree"];
  language: Language_Mode;
} & Multi_File_Full_Info["ui"]): string {
  const { ui_code, library_calls } = ui_node_to_code({
    ui_tree,
    language,
  });

  // We need to check to make sure there aren't any libraries used in the ui
  // tree that are not declared in the script and add them
  const all_libraries = [...existing_libraries];
  library_calls.forEach((l) => {
    if (!existing_libraries.includes(l)) {
      all_libraries.push(l);
    }
  });

  return code
    .replace(SCRIPT_LOC_KEYS.ui, ui_code)
    .replace(SCRIPT_LOC_KEYS.libraries, write_library_calls(all_libraries));
}

export function write_library_calls(libraries: string[]): string {
  return libraries.map((l) => `library(${l})`).join("\n");
}

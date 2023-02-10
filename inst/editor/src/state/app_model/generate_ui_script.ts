import type { Multi_File_Full_Info } from "ast-parsing";
import { SCRIPT_LOC_KEYS } from "ast-parsing";
import { ui_node_to_R_code } from "ast-parsing/src/code_generation/ui_node_to_R_code";

export function generate_ui_script({
  ui_tree,
  libraries: existing_libraries,
  code,
}: {
  ui_tree: Multi_File_Full_Info["ui_tree"];
} & Multi_File_Full_Info["ui"]): string {
  const { ui_code, library_calls } = ui_node_to_R_code(ui_tree, {
    remove_namespace: true,
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

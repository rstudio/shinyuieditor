import type {
  Multi_File_App_Script,
  Multi_File_Full_Info,
  Single_File_App_Script,
  Single_File_Full_Info,
} from "ast-parsing";
import { SCRIPT_LOC_KEYS } from "ast-parsing";
import { ui_node_to_R_code } from "ast-parsing/src/code_generation/ui_node_to_R_code";

export function generate_full_app_script(
  info: Single_File_Full_Info | Multi_File_Full_Info,
  opts?: Script_Generation_Options
) {
  return info.app_type === "SINGLE-FILE"
    ? generate_single_file_app_script(info, opts)
    : generate_multi_file_app_script(info, opts);
}

type Script_Generation_Options = {
  include_info: boolean;
};
function generate_single_file_app_script(
  info: Single_File_Full_Info,
  opts?: Script_Generation_Options
): Single_File_App_Script {
  return {
    app_type: "SINGLE-FILE",
    app: generate_ui_script({ ui_tree: info.ui_tree, ...info.app }),
    ...(opts?.include_info ? { info } : {}),
  };
}

function generate_multi_file_app_script(
  info: Multi_File_Full_Info,
  opts?: Script_Generation_Options
): Multi_File_App_Script {
  return {
    app_type: "MULTI-FILE",
    ui: generate_ui_script({ ui_tree: info.ui_tree, ...info.ui }),
    server: info.server.code,
    ...(opts?.include_info ? { info } : {}),
  };
}

function generate_ui_script({
  ui_tree,
  libraries,
  code,
}: {
  ui_tree: Multi_File_Full_Info["ui_tree"];
} & Multi_File_Full_Info["ui"]): string {
  const { ui_code, library_calls } = ui_node_to_R_code(ui_tree, {
    remove_namespace: true,
  });

  // Don't double do the libraries
  const extra_libraries = libraries.filter((l) => !library_calls.includes(l));
  const all_library_calls = write_library_calls([
    ...extra_libraries,
    ...library_calls,
  ]);

  return code
    .replace(SCRIPT_LOC_KEYS.ui, ui_code)
    .replace(SCRIPT_LOC_KEYS.libraries, all_library_calls);
}

export function write_library_calls(libraries: string[]): string {
  return libraries.map((l) => `library(${l})`).join("\n");
}

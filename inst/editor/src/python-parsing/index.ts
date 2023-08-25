import type { TSParser } from "treesitter-parsers";

export function parsePythonScript(parser: TSParser, script_text: string) {
  // Parse the current script
  return parser.parse(script_text);
}

export { generateAppScriptTemplate as generate_app_script_template } from "./generate_app_script_template";
export { getImportedPkgs as get_imported_pkgs } from "./get_imported_pkgs";
export { treesitterToUiTree as treesitter_to_ui_tree } from "./ts_node_to_ui_tree";
export { getKnownOutputs as get_known_outputs } from "./get_known_outputs";
export { getKnownInputs as get_known_inputs } from "./get_known_inputs";
export { getServerNodePosition as get_server_node_position } from "./get_server_node_position";
export { generatePythonOutputBinding as generate_python_output_binding } from "./generate_output_binding";

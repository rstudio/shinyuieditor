import type { PythonParser } from "python-ts-parser";

export function parse_python_script(parser: PythonParser, script_text: string) {
  // Parse the current script
  return parser.parse(script_text);
}

export { generate_app_script_template } from "./generate_app_script_template";
export { get_imported_pkgs } from "./get_imported_pkgs";
export { treesitter_to_ui_tree } from "./ts_node_to_ui_tree";
export { get_assignment_nodes } from "./get_assignment_nodes";
export { get_ui_assignment } from "./get_ui_assignment";
export { get_known_outputs } from "./get_known_outputs";
export { get_known_inputs } from "./get_known_inputs";
export { get_server_node_position } from "./get_server_node_position";

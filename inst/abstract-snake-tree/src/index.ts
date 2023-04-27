// Initialize a tree-sitter parser with the Python grammar
// const parser = setup_python_parser();

import type { setup_python_parser } from "python-ts-parser";

export type PythonParser = Awaited<ReturnType<typeof setup_python_parser>>;

export function parse_python_script(parser: PythonParser, script_text: string) {
  // Parse the current script
  return parser.parse(script_text);
}

export { get_imported_pkgs } from "./get_imported_pkgs";
export { treesitter_to_ui_tree } from "./ts_node_to_ui_tree";
export { get_assignment_nodes } from "./get_assignment_nodes";
export { get_ui_assignment } from "./get_ui_assignment";

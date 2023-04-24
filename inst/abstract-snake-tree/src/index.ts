import { setup_python_parser } from "./setup_python_parser";

// Initialize a tree-sitter parser with the Python grammar
const parser = setup_python_parser();

export function parse_python_script(script_text: string) {
  // Parse the current script
  return parser.parse(script_text);
}

export { treesitter_to_ui_tree } from "./NodeTypes/ts_node_to_ui_tree";
export { get_assignment_nodes } from "./get_assignment_nodes";
export { get_ui_assignment } from "./get_ui_assignment";
export { setup_python_parser } from "./setup_python_parser";

import { navbar_page_app } from "./example_app_scripts";
import { setup_python_parser } from "./setup_python_parser";

// Initialize a tree-sitter parser with the Python grammar
const parser = setup_python_parser();

export function parse_python_script(script_text: string) {
  // Parse the current script
  return parser.parse(script_text);
}

// const assignment_nodes = find_assignment_nodes(tree.rootNode);
// const ui_node = find_ui_assignment(assignment_nodes);
// return node_to_uitree(ui_node);

const parsed = parse_python_script(navbar_page_app);

debugger;

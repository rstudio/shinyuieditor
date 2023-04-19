import { setup_python_parser } from "./setup_python_parser";

// Initialize a tree-sitter parser with the Python grammar
const parser = setup_python_parser();

export function parse_python_script(script_text: string) {
  // Parse the current script
  return parser.parse(script_text);
}

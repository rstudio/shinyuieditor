import Parser from "tree-sitter";
import PythonGrammar from "tree-sitter-python";

/**
 * Setup a tree-sitter parser with the Python grammar
 * @returns A tree-sitter parser with the Python grammar
 */
export function setup_python_parser() {
  const parser = new Parser();
  parser.setLanguage(PythonGrammar);
  return parser;
}

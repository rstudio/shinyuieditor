import Parser from "web-tree-sitter";

// This imports the wasm binary as an inlined 8-bit integer array
//@ts-ignore
import python_grammar_wasm from "./assets/tree-sitter-python.wasm";

/**
 * Setup a tree-sitter parser with the Python grammar
 * @returns A tree-sitter parser with the Python grammar loaded
 */
export async function setup_python_parser() {
  await Parser.init();

  const parser = new Parser();
  const PythonGrammar = await Parser.Language.load(python_grammar_wasm);
  parser.setLanguage(PythonGrammar);
  return parser;
}

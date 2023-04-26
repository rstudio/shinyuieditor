// import PythonGrammar from "tree-sitter-python";
import Parser from "web-tree-sitter";

/**
 * Setup a tree-sitter parser with the Python grammar
 * @returns A tree-sitter parser with the Python grammar
 */
export async function setup_python_parser() {
  await Parser.init();

  const parser = new Parser();

  const PythonGrammar = await Parser.Language.load(
    "../tree-sitter-python.wasm"
  );

  parser.setLanguage(PythonGrammar);
  return parser;
}

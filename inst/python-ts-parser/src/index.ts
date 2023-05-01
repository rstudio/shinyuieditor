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

/**
 * Function to parse a python script into a tree-sitter syntax tree
 */
export type PythonParser = Parser;
/**
 * A node within the tree-sitter syntax tree.
 */
export type ParserNode = Parser.SyntaxNode;

/**
 * The main object returned from parsing an app script. Contains the main tree as the root node attribute
 */
export type ParserTree = Parser.Tree;

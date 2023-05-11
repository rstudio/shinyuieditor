import Parser from "web-tree-sitter";

// This imports the wasm binary as an inlined 8-bit integer array
//@ts-ignore
import r_grammar_wasm from "./assets/tree-sitter-r.wasm";

/**
 * Setup a tree-sitter parser with the Python grammar
 * @returns A tree-sitter parser with the Python grammar loaded
 */
export async function setup_r_parser() {
  await Parser.init();

  const parser = new Parser();
  parser.setLanguage(await Parser.Language.load(r_grammar_wasm));

  return parser;
}

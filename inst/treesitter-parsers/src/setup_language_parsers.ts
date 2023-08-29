import Parser from "web-tree-sitter";

// This imports the wasm binary as an inlined 8-bit integer array
//@ts-ignore
import python_grammar_wasm from "./assets/tree-sitter-python.wasm";
// This imports the wasm binary as an inlined 8-bit integer array
//@ts-ignore
import r_grammar_wasm from "./assets/tree-sitter-r.wasm";

export type ParserInitOptions = {
  locateFile?: (scriptName: string, scriptDirectory: string) => string;
};
/**
 * Setup a tree-sitter parser with the Python grammar
 * @returns A tree-sitter parser with the Python grammar loaded
 * @param opts Options to pass to the parser as emscripten module-object, see
 * https://emscripten.org/docs/api_reference/module.html
 */
export async function setup_python_parser(opts: ParserInitOptions = {}) {
  await Parser.init(opts);

  const parser = new Parser();
  parser.setLanguage(await Parser.Language.load(python_grammar_wasm));
  return parser;
}

/**
 * Setup a tree-sitter parser with the Python grammar
 * @returns A tree-sitter parser with the Python grammar loaded
 */
export async function setup_r_parser(opts: ParserInitOptions = {}) {
  await Parser.init(opts);

  const parser = new Parser();
  parser.setLanguage(await Parser.Language.load(r_grammar_wasm));

  return parser;
}

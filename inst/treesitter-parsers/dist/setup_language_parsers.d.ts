import Parser from "web-tree-sitter";
export type ParserInitOptions = {
    locateFile?: (scriptName: string, scriptDirectory: string) => string;
};
/**
 * Setup a tree-sitter parser with the Python grammar
 * @returns A tree-sitter parser with the Python grammar loaded
 * @param opts Options to pass to the parser as emscripten module-object, see
 * https://emscripten.org/docs/api_reference/module.html
 */
export declare function setup_python_parser(opts?: ParserInitOptions): Promise<Parser>;
/**
 * Setup a tree-sitter parser with the Python grammar
 * @returns A tree-sitter parser with the Python grammar loaded
 */
export declare function setup_r_parser(opts?: ParserInitOptions): Promise<Parser>;

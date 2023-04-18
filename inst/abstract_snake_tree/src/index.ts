import Parser from "tree-sitter";
import JavaScriptGrammar from "tree-sitter-javascript";

console.log("Starting the file run!!!!!");

export function parse_python_script(script_text: string): string {
  return "Yup, that's a Python script!";
}

const testing = parse_python_script("import * from shiny");
const parser = new Parser();
parser.setLanguage(JavaScriptGrammar);

const sourceCode = "let x = 1; console.log(x);";

const tree = parser.parse(sourceCode);
// console.log(tree);

console.log("FInished file run!");
// const callExpression = tree.rootNode.child(1).firstChild;

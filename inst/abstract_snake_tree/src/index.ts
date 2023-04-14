import Parser from "tree-sitter";

// TODO: Fix this import by adding module type declaration
import JavaScript from "tree-sitter-python";

export function parse_python_script(script_text: string): string {
  return "Yup, that's a Python script!";
}

// TODO: Follow this tutorial https://github.com/tree-sitter/node-tree-sitter#usage to get started
const parser = new Parser();
parser.setLanguage(JavaScript);

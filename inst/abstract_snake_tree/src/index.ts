import type Parser from "tree-sitter";

import { find_assignment_nodes } from "./find_assignment_nodes";
import { find_ui_assignment } from "./find_ui_assignment";
import { setup_python_parser } from "./setup_python_parser";

export function parse_python_script(script_text: string): string {
  return "Yup, that's a Python script!";
}

const simple_app_script = `
from shiny import App, render, ui

app_ui = ui.page_fluid(
    ui.input_slider("n", "N", 0, 100, 20),
    ui.output_text_verbatim("txt"),
)

def server(input, output, session):
    @output
    @render.text
    def txt():
        return f"n*2 is {input.n() * 2}"

app = App(app_ui, server)
`;

// Initialize a tree-sitter parser with the Python grammar
const parser = setup_python_parser();

// Parse the current script
const tree = parser.parse(simple_app_script);

const assignment_nodes = find_assignment_nodes(tree.rootNode);
const ui_node = find_ui_assignment(assignment_nodes);

type LeafNode = { type: string; value: string };
type UITree = { name: string; args: (UITree | LeafNode)[] };

function node_to_uitree(node: Parser.SyntaxNode): UITree | LeafNode {
  if (node.type === "call") {
    return function_call_node_to_uitree(node);
  }

  return leafnode_to_ui_tree(node);
}

function leafnode_to_ui_tree(node: Parser.SyntaxNode): LeafNode {
  return { type: node.type, value: node.text };
}

function function_call_node_to_uitree(node: Parser.SyntaxNode): UITree {
  // If the node is a function call it will have the function node as an
  // attribute. This feels safer than just using the first child
  const function_call =
    "functionNode" in node ? (node.functionNode as Parser.SyntaxNode) : null;

  if (!function_call) {
    // If the node is a leaf node, return it
    throw new Error("Node is not a function call");
  }

  const function_name = function_call.text;
  const function_arguments = node.child(1);

  if (!function_arguments || function_arguments.type !== "argument_list") {
    throw new Error("Could not find function arguments");
  }

  return {
    name: function_name,
    args: function_arguments.namedChildren.map(node_to_uitree),
  };
}

const uitree = node_to_uitree(ui_node);

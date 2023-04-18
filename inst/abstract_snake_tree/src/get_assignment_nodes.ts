import type Parser from "tree-sitter";

/**
 * A map keyed by name of all assignments in a given python script pointing to
 * the node being assigned
 */
export type Node_Assignment_Map = Map<string, Parser.SyntaxNode>;

/**
 * Find all assignment nodes in a python script
 * @param tree Syntax node of python app script from tree-sitter parser
 * @returns All assignment nodes in the script as a map of variable name to the
 * node
 */
export function get_assignment_nodes(
  tree: Parser.SyntaxNode
): Node_Assignment_Map {
  const assignment_nodes: Node_Assignment_Map = new Map();
  for (const node of tree.descendantsOfType("assignment")) {
    // Get the name of the variable being assigned
    const name = node.children[0].text;
    const assignment_symbol = node.children[1].text;
    const assigned_value = node.children[2];

    // We only care about assignments where the symbol is "=" and the value is defined
    if (assignment_symbol === "=" && assigned_value) {
      assignment_nodes.set(name, assigned_value);
    }
  }
  return assignment_nodes;
}

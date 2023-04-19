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
export function get_assignment_nodes(tree: Parser.Tree): Node_Assignment_Map {
  const assignment_nodes: Node_Assignment_Map = new Map();
  for (const node of tree.rootNode.descendantsOfType("assignment")) {
    // Get the name of the variable being assigned
    const name_node = node.child(0);
    const assigned_value = node.child(2);

    if (!name_node || !assigned_value) {
      // If for some reason there's no name or value for the assignment, skip it
      continue;
    }

    assignment_nodes.set(name_node.text, assigned_value);
  }
  return assignment_nodes;
}

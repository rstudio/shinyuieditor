import type Parser from "web-tree-sitter";

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
  const assignment_pairs = tree.rootNode
    .descendantsOfType("assignment")
    .map((node) => {
      // The search for descendants of type assignment should mean we never have
      // to worry about this throwing, but by placing it here we narrow the types
      // to AssignmentNode
      const assignment_name = node.namedChild(0)?.text;

      if (assignment_name === undefined) {
        throw new Error("Assignment node has no name");
      }
      const assigned_node = node.namedChild(1);
      if (!assigned_node) {
        throw new Error("Assignment node has no assigned node");
      }

      return [assignment_name, assigned_node] as const;
    });

  return new Map(assignment_pairs);
}

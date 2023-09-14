import type { ParserTree, ParserNode } from ".";

/**
 * Find all assignment nodes in a parsed script
 * @param tree Syntax node of parsed script from tree-sitter parser
 * @param assignment_type The type of assignment node to search for. Defaults to
 * `"left_assignment"` and `"assignment"`. To search for all assignment types in
 * both python and R.
 * @returns All assignment nodes in the script as a map of variable name to the
 * node
 */

export function get_assignment_nodes(
  tree: ParserTree,
  assignment_type: string | string[] = ["left_assignment", "assignment"]
): Node_Assignment_Map {
  const assignment_pairs = tree.rootNode
    .descendantsOfType(assignment_type)
    .map((node) => {
      // The search for descendants of type assignment should mean we never have
      // to worry about this throwing, but by placing it here we narrow the types
      // to AssignmentNode
      const assignment_name = node.firstNamedChild?.text;

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
/**
 * A map keyed by name of all assignments in a given python script pointing to
 * the node being assigned
 */

export type Node_Assignment_Map = Map<string, ParserNode>;

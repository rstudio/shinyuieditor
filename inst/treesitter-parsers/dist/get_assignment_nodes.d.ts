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
export declare function get_assignment_nodes(tree: ParserTree, assignment_type?: string | string[]): Node_Assignment_Map;
/**
 * A map keyed by name of all assignments in a given python script pointing to
 * the node being assigned
 */
export type Node_Assignment_Map = Map<string, ParserNode>;

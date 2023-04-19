import type Parser from "tree-sitter";

/**
 * Node representing an assignment in python. Has special properties for the
 * left and right nodes of the assignment
 */
interface TSAssignmentNode extends Parser.SyntaxNode {
  /**
   * Node representing the variable being assigned
   */
  leftNode: Parser.SyntaxNode;
  /**
   * Node representing the value being assigned
   */
  rightNode: Parser.SyntaxNode;
}

/**
 * Predicate function for checking if a node is an assignment node - useful for type-narrowing
 * @param node General tree-sitter node that may be an assignment node
 * @returns True if the node is an assignment node
 */
export function is_assignment_node(
  node: Parser.SyntaxNode
): node is TSAssignmentNode {
  return (
    node.type === "assignment" && "leftNode" in node && "rightNode" in node
  );
}

/**
 * Assertion that a node is an assignment node - useful for type-narrowing
 * @param node General tree-sitter node that should be an assignment node
 * @throws Error if the node is not an assignment node
 */
export function assert_assignment_node(
  node: Parser.SyntaxNode
): asserts node is TSAssignmentNode {
  if (node.type === "assignment" && "leftNode" in node && "rightNode" in node) {
    return;
  }
  throw new Error("Node is not an assignment node");
}

import type {
  ASTNodeByName,
  AstNameToKey,
  BranchNode,
  FunctionNode,
  RASTNode,
} from ".";
import { ast_name_to_key } from ".";

export function IsNodeOfType<TypeName extends keyof AstNameToKey>(
  node: RASTNode,
  type: TypeName
): node is ASTNodeByName[TypeName] {
  return node.type === ast_name_to_key[type];
}

const primative_type_keys = new Set(["c", "n", "b"]);
export function isPrimativeNode(
  node: RASTNode
): node is ASTNodeByName["character" | "number" | "boolean"] {
  return primative_type_keys.has(node.type);
}

export function isAstBranchNode(node: RASTNode): node is BranchNode {
  return node.type === "e" && Array.isArray(node.val);
}

export function isFunctionNode(node: RASTNode): node is FunctionNode {
  return (
    node.type === "e" &&
    Array.isArray(node.val) &&
    IsNodeOfType(node.val[0], "symbol")
  );
}

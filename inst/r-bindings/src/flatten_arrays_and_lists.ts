import type { UnknownUiNode } from "ui-node-definitions/src/internal/unknown_code";

import type { Primatives, LeafNode, RAST, RASTNode } from ".";

import { create_unknownUiFunction } from "./create_unknownUiFunction";
import { isAstBranchNode } from "./node_identity_checkers";
import { ParsingError } from "./parsing_error_class";

type Primative_Map = Record<string, Primatives>;

type Primative_Array = (Primatives | Primative_Array)[];

type Array_Or_List_AST = [{ val: "c" | "list"; type: "s" }, ...LeafNode[]];

type Array_AST = [{ val: "c"; type: "s" }, ...LeafNode[]];

function get_ast_is_array(x: RAST): x is Array_AST {
  return x[0].val === "c";
}
export function get_ast_is_array_or_list(x: RAST): x is Array_Or_List_AST {
  const call_val = x[0].val;

  return call_val === "c" || call_val === "list";
}

export function get_node_is_array(node: RASTNode): boolean {
  return isAstBranchNode(node) && get_ast_is_array(node.val);
}

export function get_node_is_list(node: RASTNode): boolean {
  return isAstBranchNode(node) && node.val[0].val === "list";
}

export function flatten_to_array(
  node: RASTNode
): Primative_Array | UnknownUiNode {
  try {
    return flatten_array_internal(node);
  } catch (e) {
    if (!(e instanceof ParsingError)) {
      throw e;
    }
    // If there's problems parsing the list then we just return it as an unknown
    // node. This might happen if there's nested elements etc..
    return create_unknownUiFunction({ node, explanation: e.message });
  }
}

// Internal array flattening that we can use recursively.
function flatten_array_internal(node: RASTNode): Primative_Array {
  if (!isAstBranchNode(node)) {
    throw new ParsingError({
      message: "Tried to flatten a leaf/primative node",
    });
  }

  const [call, ...vals] = node.val;

  if (call.val !== "c") {
    throw new ParsingError({
      message: "Tried to flatten non array as array",
    });
  }
  return vals.map((n) =>
    is_primative(n.val) ? n.val : flatten_array_internal(n)
  );
}

export function flatten_to_list(node: RASTNode): Primative_Map | UnknownUiNode {
  if (!isAstBranchNode(node)) {
    throw new ParsingError({
      message: "Tried to flatten a leaf/primative node",
    });
  }

  try {
    const [call, ...vals] = node.val;

    if (call.val !== "list") {
      throw new ParsingError({
        message: "Tried to flatten non array as array",
        cause: node,
      });
    }

    let res: Primative_Map = {};

    vals.forEach(({ name, val }) => {
      if (typeof name !== "string") {
        throw new ParsingError({
          message: "All elements in list must have a name",
          cause: node,
        });
      }
      if (!is_primative(val)) {
        throw new ParsingError({
          message: "Nested lists are not supported",
          cause: node,
        });
      }
      res[name] = val;
    });
    return res;
  } catch (e) {
    if (!(e instanceof ParsingError)) {
      throw e;
    }
    // If there's problems parsing the list then we just return it as an unknown
    // node. This might happen if there's nested elements etc..
    return create_unknownUiFunction({ node, explanation: e.message });
  }
}

function is_primative(x: unknown): x is Primatives {
  return (
    typeof x === "string" || typeof x === "number" || typeof x === "boolean"
  );
}

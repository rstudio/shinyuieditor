import type { ShinyUiNodeByName } from "../Shiny-Ui-Elements/uiNodeTypes";

import { create_unknownUiFunction } from "./create_unknownUiFunction";
import { is_ast_branch_node, is_primative } from "./node_identity_checkers";
import { Parsing_Error } from "./parsing_error_class";
import type { Leaf_Node, Primatives, R_AST, R_AST_Node } from "./r_ast";

export type Primative_Map = Record<string, Primatives>;

export type Primative_Array = (Primatives | Primative_Array)[];

export type Array_Or_List_AST = [
  { val: "c" | "list"; type: "s" },
  ...Leaf_Node[]
];

export type Array_AST = [{ val: "c"; type: "s" }, ...Leaf_Node[]];

export function get_ast_is_array(x: R_AST): x is Array_AST {
  return x[0].val === "c";
}
export function get_ast_is_array_or_list(x: R_AST): x is Array_Or_List_AST {
  const call_val = x[0].val;

  return call_val === "c" || call_val === "list";
}

export function get_node_is_array(node: R_AST_Node): boolean {
  return is_ast_branch_node(node) && get_ast_is_array(node.val);
}

export function get_node_is_list(node: R_AST_Node): boolean {
  return is_ast_branch_node(node) && node.val[0].val === "list";
}

export function flatten_array(
  node: R_AST_Node
): Primative_Array | ShinyUiNodeByName["unknownUiFunction"] {
  try {
    return flatten_array_internal(node);
  } catch (e) {
    if (!(e instanceof Parsing_Error)) {
      throw e;
    }
    // If there's problems parsing the list then we just return it as an unknown
    // node. This might happen if there's nested elements etc..
    return create_unknownUiFunction({ node, explanation: e.message });
  }
}

// Internal array flattening that we can use recursively.
function flatten_array_internal(node: R_AST_Node): Primative_Array {
  if (!is_ast_branch_node(node)) {
    throw new Parsing_Error({
      message: "Tried to flatten a leaf/primative node",
    });
  }

  const [call, ...vals] = node.val;

  if (call.val !== "c") {
    throw new Parsing_Error({
      message: "Tried to flatten non array as array",
    });
  }
  return vals.map((n) =>
    is_primative(n.val) ? n.val : flatten_array_internal(n)
  );
}

export function flatten_list(
  node: R_AST_Node
): Primative_Map | ShinyUiNodeByName["unknownUiFunction"] {
  if (!is_ast_branch_node(node)) {
    throw new Parsing_Error({
      message: "Tried to flatten a leaf/primative node",
    });
  }

  try {
    const [call, ...vals] = node.val;

    if (call.val !== "list") {
      throw new Parsing_Error({
        message: "Tried to flatten non array as array",
        cause: node,
      });
    }

    let res: Primative_Map = {};

    vals.forEach(({ name, val }) => {
      if (typeof name !== "string") {
        throw new Parsing_Error({
          message: "All elements in list must have a name",
          cause: node,
        });
      }
      if (!is_primative(val)) {
        throw new Parsing_Error({
          message: "Nested lists are not supported",
          cause: node,
        });
      }
      res[name] = val;
    });
    return res;
  } catch (e) {
    if (!(e instanceof Parsing_Error)) {
      throw e;
    }
    // If there's problems parsing the list then we just return it as an unknown
    // node. This might happen if there's nested elements etc..
    return create_unknownUiFunction({ node, explanation: e.message });
  }
}

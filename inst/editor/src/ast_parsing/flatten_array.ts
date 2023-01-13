import type { ShinyUiNodeByName } from "../Shiny-Ui-Elements/uiNodeTypes";

import { create_unknownUiFunction } from "./create_unknownUiFunction";
import { is_ast_branch_node, is_primative } from "./node_identity_checkers";
import { Parsing_Error } from "./parsing_error_class";
import type { Primatives, R_AST_Node } from "./r_ast";

export type Primative_Array = (Primatives | Primative_Array)[];

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

export function get_node_is_array(node: R_AST_Node): boolean {
  return is_ast_branch_node(node) && node.val[0].val === "c";
}

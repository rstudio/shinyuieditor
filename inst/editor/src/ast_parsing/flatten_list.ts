import type { ShinyUiNodeByName } from "../Shiny-Ui-Elements/uiNodeTypes";

import { create_unknownUiFunction } from "./create_unknownUiFunction";
import { is_ast_branch_node, is_primative } from "./node_identity_checkers";
import { Parsing_Error } from "./parsing_error_class";
import type { Primatives, R_AST_Node } from "./r_ast";

export type Primative_Map = Record<string, Primatives>;

export function get_node_is_list(node: R_AST_Node): boolean {
  return is_ast_branch_node(node) && node.val[0].val === "list";
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

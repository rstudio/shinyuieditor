import type { R_AST_Node } from "r-ast-parsing";
import { is_ast_branch_node } from "r-ast-parsing/src/node_identity_checkers";

import type { UnknownUiNode } from "../Shiny-Ui-Elements/UnknownUiFunction";

import {
  build_function_text,
  print_node_val,
} from "./code_generation/build_function_text";

/**
 *
 * @param node Node that isn't parsable
 * @param explanation Optional field to explain why. E.g. don't support nested
 * lists etc.. This will show up in the UI giving user hints about what's going
 * wrong.
 * @returns New ui node containing the unknown code
 */

export function create_unknownUiFunction({
  node,
  explanation,
}: {
  node: R_AST_Node;
  explanation?: string;
}): UnknownUiNode {
  return {
    id: "unknownUiFunction",
    namedArgs: {
      text: is_ast_branch_node(node)
        ? build_function_text(node.val)
        : print_node_val(node),
      explanation,
    },
  };
}

import type { ShinyUiNodeByName } from "editor/src/Shiny-Ui-Elements/uiNodeTypes";

import type { R_AST_Node } from ".";

import {
  build_function_text,
  print_node_val,
} from "./code_generation/build_function_text";
import { is_ast_branch_node } from "./node_identity_checkers";

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
}): ShinyUiNodeByName["unknownUiFunction"] {
  return {
    uiName: "unknownUiFunction",
    uiArguments: {
      text: is_ast_branch_node(node)
        ? build_function_text(node.val)
        : print_node_val(node),
      explanation,
    },
  };
}

import type { ShinyUiNodeByName } from "../Shiny-Ui-Elements/uiNodeTypes";

import { build_function_text } from "./build_function_text";
import { is_ast_branch_node } from "./node_identity_checkers";
import type { R_AST_Node } from "./r_ast";

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
      text: is_ast_branch_node(node) ? build_function_text(node.val) : node.val,
      explanation,
    },
  };
}

import type { ShinyUiNodeByName } from "../Shiny-Ui-Elements/uiNodeTypes";

import { is_ast_branch_node } from "./node_identity_checkers";
import type { Branch_Node, R_AST_Node } from "./r_ast";

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
      text: is_ast_branch_node(node) ? build_function_text(node) : node.val,
      explanation,
    },
  };
}

export function build_function_text({ val }: Branch_Node): string {
  const [fn_name, ...args] = val;

  if (typeof fn_name.val !== "string") {
    return "Unknown Ui Code";
  }

  // TODO: Finish by concatenating arguments together.

  return `${fn_name.val}`;
}

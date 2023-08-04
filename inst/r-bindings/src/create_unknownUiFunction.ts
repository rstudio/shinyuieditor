import {
  buildFunctionText,
  printNodeVal,
} from "ui-node-definitions/src/code_generation/build_function_text";
import type { UnknownUiNode } from "ui-node-definitions/src/internal/unknown_code";

import type { RASTNode } from ".";

import { isAstBranchNode } from "./node_identity_checkers";

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
  node: RASTNode;
  explanation?: string;
}): UnknownUiNode {
  return {
    id: "unknownUiFunction",
    namedArgs: {
      text: isAstBranchNode(node)
        ? buildFunctionText(node.val)
        : printNodeVal(node),
      explanation,
    },
  };
}

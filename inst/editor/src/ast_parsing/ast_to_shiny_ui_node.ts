import type { ShinyUiNode } from "editor";
import type {
  UiArgumentsObject
} from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import {
  shinyUiNameToNamespacedName
} from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import type { Branch_Node, R_AST_Node } from "r-ast-parsing";
import type { Output_Server_Pos } from "r-ast-parsing/src/get_assignment_nodes";
import {
  IsNodeOfType,
  is_ast_branch_node, is_primative_node
} from "r-ast-parsing/src/node_identity_checkers";

import { print_node_val } from "./code_generation/build_function_text";
import { create_unknownUiFunction } from "./create_unknownUiFunction";
import {
  flatten_to_array,
  flatten_to_list,
  get_node_is_array,
  get_node_is_list
} from "./flatten_arrays_and_lists";
import { build_text_node } from "./text_nodes/build_text_node";
import { is_text_node } from "./text_nodes/is_text_node";

export function ast_to_ui_node(node: Branch_Node): ShinyUiNode {
  const [fn_name, ...args] = node.val;

  if (typeof fn_name.val !== "string") {
    return create_unknownUiFunction({ node });
  }

  let uiArguments: UiArgumentsObject = {};
  let uiChildren: ShinyUiNode[] = [];

  args.forEach((sub_node) => {
    
    // Check if it's a named argument
    if (sub_node.name) {
      uiArguments[sub_node.name] = process_named_arg(sub_node);
    } else {
      uiChildren.push(process_child_arg(sub_node));
    }
  });

  const node_normalized_name = shinyUiNameToNamespacedName.get(fn_name.val);

  if (node_normalized_name === undefined) {
    return create_unknownUiFunction({ node });
  }

  return {
    uiName: node_normalized_name,
    uiArguments,
    uiChildren: uiChildren.length > 0 ? uiChildren: undefined,
  } satisfies ShinyUiNode;
}

function process_named_arg(
  node: R_AST_Node
) {

  if (is_primative_node(node)) {
    return node.val;
  }


  if (get_node_is_array(node)) {
    return flatten_to_array(node);
  }

  if (get_node_is_list(node)) {
    return flatten_to_list(node);
  }

  return create_unknownUiFunction({ node });
}

function process_child_arg(
  node: R_AST_Node,
  output_positions?: Output_Server_Pos
): ShinyUiNode {

  if (IsNodeOfType(node, "symbol")) {
    return create_unknownUiFunction({ node, explanation: "Unknown symbol" });
  }

  if (is_text_node(node)) {
    return build_text_node(node);
  }

  if (is_ast_branch_node(node)) {
    return ast_to_ui_node(node);
  }

  // Here we have a primative value that's not text, so we just coerce it to
  // plain text. Doesn't seem great but the output of the ui will be the same as
  // this is what the tags do anyways
  return build_text_node(print_node_val(node));

}

import type { ShinyUiNode } from "editor";
import { isShinyUiNode } from "editor/src/Shiny-Ui-Elements/isShinyUiNode";
import { normalize_ui_name } from "editor/src/Shiny-Ui-Elements/normalize_ui_name";
import type { ShinyUiNodeByName } from "editor/src/Shiny-Ui-Elements/uiNodeTypes";

import type { Branch_Node, Primatives, R_AST_Node } from ".";

import { create_unknownUiFunction } from "./create_unknownUiFunction";
import type {
  Primative_Array,
  Primative_Map,
} from "./flatten_arrays_and_lists";
import {
  flatten_to_array,
  flatten_to_list,
  get_node_is_array,
  get_node_is_list,
} from "./flatten_arrays_and_lists";
import type { Output_Server_Pos } from "./get_assignment_nodes";
import {
  is_ast_branch_node,
  is_ast_leaf_node,
  is_named_node,
} from "./node_identity_checkers";
import { Parsing_Error } from "./parsing_error_class";
import { build_text_node } from "./text_nodes/build_text_node";
import { is_raw_text_node } from "./text_nodes/is_text_node";

export function ast_to_ui_node(node: Branch_Node): ShinyUiNode {
  const [fn_name, ...args] = node.val;

  if (typeof fn_name.val !== "string") {
    throw new Parsing_Error({
      message: "Invalid ui node, name is not a primative",
    });
  }

  let uiArguments: ShinyUiNode["uiArguments"] = {};
  let uiChildren: ShinyUiNode[] = [];

  args.forEach((sub_node) => {
    if (is_named_node(sub_node)) {
      uiArguments[sub_node.name] = process_named_arg(sub_node);
    } else {
      uiChildren.push(process_unnamed_arg(sub_node));
    }
  });

  const full_node: Pick<ShinyUiNode, "uiArguments" | "uiChildren"> & {
    uiName: string;
  } = {
    uiName: normalize_ui_name(fn_name.val),
    uiArguments,
  };

  // Only add ui children if it's not empty
  if (uiChildren.length > 0) {
    full_node.uiChildren = uiChildren;
  }

  if (!isShinyUiNode(full_node)) return create_unknownUiFunction({ node });

  return full_node;
}

function process_named_arg(
  node: R_AST_Node
):
  | Primatives
  | Primative_Array
  | Primative_Map
  | ShinyUiNodeByName["unknownUiFunction"] {
  if (is_ast_leaf_node(node)) {
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

function process_unnamed_arg(
  node: R_AST_Node,
  output_positions?: Output_Server_Pos
): ShinyUiNode {
  if (is_raw_text_node(node)) {
    return build_text_node(node);
  }
  if (is_ast_branch_node(node)) {
    return ast_to_ui_node(node);
  }

  throw new Parsing_Error({
    message: "Primative found in ui children of ui node.",
    cause: node,
  });
}

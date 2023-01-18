import type { ShinyUiNode } from "../main";
import { isShinyUiNode } from "../Shiny-Ui-Elements/isShinyUiNode";
import type { ShinyUiNodeByName } from "../Shiny-Ui-Elements/uiNodeTypes";

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
import type {
  Assignment_Operator,
  Ui_Assignment_Node,
} from "./get_assignment_nodes";
import {
  is_ast_branch_node,
  is_ast_leaf_node,
  is_named_node,
} from "./node_identity_checkers";
import { normalize_ui_name } from "./normalize_ui_name";
import { Parsing_Error } from "./parsing_error_class";
import type { Branch_Node, Primatives, R_AST_Node } from "./r_ast";

function flatten_to_ui_node(node: Branch_Node): ShinyUiNode {
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

  return isShinyUiNode(full_node)
    ? full_node
    : create_unknownUiFunction({ node });
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

function process_unnamed_arg(node: R_AST_Node): ShinyUiNode {
  if (!is_ast_branch_node(node)) {
    throw new Parsing_Error({
      message: "Primative found in ui children of ui node.",
    });
  }

  return flatten_to_ui_node(node);
}

export function ast_to_shiny_ui_node(node: Ui_Assignment_Node): {
  ui_tree: ShinyUiNode;
  pos: Ui_Assignment_Node["pos"];
  assignment_operator: Assignment_Operator;
} {
  return {
    ui_tree: flatten_to_ui_node(node.val[2]),
    pos: node.pos,
    assignment_operator: node.val[0].val,
  };
}

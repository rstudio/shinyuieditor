import { create_unknownUiFunction } from "./create_unknownUiFunction";
import { flatten_array, get_node_is_array } from "./flatten_list";
import { get_node_is_list } from "./flatten_list";
import { flatten_list } from "./flatten_list";
import {
  is_ast_branch_node,
  is_named_node,
  is_ast_leaf_node,
} from "./node_identity_checkers";
import { Parsing_Error } from "./parsing_error_class";
import type {
  Branch_Node,
  Shiny_Ui_AST,
  R_AST_Node,
  Shiny_Ui_Argument_Val,
} from "./r_ast";

function flatten_to_ui_node({ val }: Branch_Node): Shiny_Ui_AST {
  const [fn_name, ...args] = val;

  const ui_name = fn_name.val;
  if (typeof ui_name !== "string") {
    throw new Parsing_Error({
      message: "Invalid ui node, name is not a primative",
    });
  }

  let ui_arguments: Shiny_Ui_AST["ui_arguments"] = {};
  let ui_children: Shiny_Ui_AST["ui_children"] = [];

  args.forEach((sub_node) => {
    if (is_named_node(sub_node)) {
      ui_arguments[sub_node.name] = process_named_arg(sub_node);
    } else {
      ui_children.push(process_unnamed_arg(sub_node));
    }
  });

  return { ui_name, ui_arguments, ui_children };
}
function process_named_arg(node: R_AST_Node): Shiny_Ui_Argument_Val {
  if (is_ast_leaf_node(node)) {
    return node.val;
  }

  if (get_node_is_array(node)) {
    return flatten_array(node);
  }

  if (get_node_is_list(node)) {
    return flatten_list(node);
  }

  return create_unknownUiFunction({ node });
}
function process_unnamed_arg(node: R_AST_Node): Shiny_Ui_AST {
  if (!is_ast_branch_node(node)) {
    throw new Parsing_Error({
      message: "Primative found in ui children of ui node.",
    });
  }

  return flatten_to_ui_node(node);
}

import type { ShinyUiNodeByName } from "../Shiny-Ui-Elements/uiNodeTypes";

import { test_app_ast } from "./ast-typings";
import { find_output_positions } from "./find_assignment_nodes";
import type { Primative_Array, Primative_Map } from "./flatten_list";
import { get_function_body, is_function_node } from "./is_function_node";
import {
  is_assignment_node,
  is_ast_branch_node,
} from "./node_identity_checkers";
import { Parsing_Error } from "./parsing_error_class";

export type Primatives = string | number | boolean;

export type Script_Position = [
  start_row: number,
  start_col: number,
  end_row: number,
  end_col: number
];

type Node_Vals_By_Key = {
  s: string; // Symbol
  c: string; // Characters/ strings
  b: boolean;
  n: number;
  u: unknown;
  m: never; // missing
  e: R_AST; // another node/expression
};

export type AST_Node_By_Key = {
  [key in keyof Node_Vals_By_Key]: {
    val: Node_Vals_By_Key[key];
    type: key;
    name?: string;
    pos?: Script_Position;
  };
};

export type ExpressionNode<T extends R_AST> = {
  val: T;
  type: "e";
};
export type Branch_Node = AST_Node_By_Key["e"];
export type Leaf_Node = AST_Node_By_Key["c" | "b" | "n"];
export type Unparsable_Node = AST_Node_By_Key["s" | "m" | "u"];
export type R_AST_Node = AST_Node_By_Key[keyof Node_Vals_By_Key];

export type R_AST = Array<R_AST_Node>;

export type Fn_Call_AST = [fn_name: string, ...fn_args: R_AST_Node[]];

export type Shiny_Ui_Argument_Val =
  | Primatives
  | Primative_Array
  | Primative_Map
  | ShinyUiNodeByName["unknownUiFunction"];

export type Shiny_Ui_AST = {
  ui_name: string;
  ui_arguments: Record<string, Shiny_Ui_Argument_Val>;
  ui_children: Shiny_Ui_AST[];
};

export function get_ui_assignment_node(ast: R_AST): Branch_Node {
  for (const index in ast) {
    const subnode = ast[index];
    if (
      is_assignment_node(subnode, "ui") &&
      is_ast_branch_node(subnode.val[2])
    ) {
      return subnode.val[2];
    }
  }

  throw new Parsing_Error({
    message: "No ui assignment node was found in provided ast",
  });
}

export function get_server_fn(ast: R_AST) {
  for (const index in ast) {
    const subnode = ast[index];
    if (
      is_assignment_node(subnode, "server") &&
      is_ast_branch_node(subnode.val[2])
    ) {
      const fn_assignment = subnode.val;
      const fn_node = fn_assignment[2];

      if (!is_function_node(fn_node)) break;

      return get_function_body(fn_node);
    }
  }

  throw new Parsing_Error({
    message: "No ui server assignment was found in provided ast",
  });
}

const assignment_nodes = find_output_positions(test_app_ast);
// assignment_nodes;

const ui_def = get_ui_assignment_node(test_app_ast);
const server_def = get_server_fn(test_app_ast);
// server_def.val[2];

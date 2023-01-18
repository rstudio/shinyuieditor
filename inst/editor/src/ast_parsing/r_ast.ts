import type { ShinyUiNodeByName } from "../Shiny-Ui-Elements/uiNodeTypes";

import { test_app_ast } from "./ast-typings";
import type { Primative_Array, Primative_Map } from "./flatten_list";
import {
  find_assignment_node,
  is_ast_branch_node,
} from "./node_identity_checkers";
import { Parsing_Error } from "./parsing_error_class";

export type Primatives = string | number | boolean;

type Script_Position = [
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

type AST_Node_By_Key = {
  [key in keyof Node_Vals_By_Key]: {
    val: Node_Vals_By_Key[key];
    type: key;
    name?: string;
    pos?: Script_Position;
  };
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
      find_assignment_node(subnode, "ui") &&
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
      find_assignment_node(subnode, "server") &&
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

type Function_Node = {
  val: [
    { val: "function"; type: "s" },
    AST_Node_By_Key["e"],
    { val: [{ val: "{"; type: "s" }, ...AST_Node_By_Key["e"][]]; type: "e" }
  ];
  type: "e";
};

function is_function_node(node: R_AST_Node): node is Function_Node {
  const { val, type } = node;

  if (type !== "e") return false;

  const [call_node, args_node, body_node] = val;

  if (call_node.val !== "function") return false;

  if (args_node.type !== "e") return false;

  if (!is_ast_branch_node(body_node)) return false;

  if (body_node.val[0].val !== "{") return false;

  return true;
}

function get_function_body(fn_node: Function_Node): R_AST {
  const fn_body = fn_node.val[2].val;
  const [, ...fn_contents] = fn_body;
  return fn_contents;
}

const ui_def = get_ui_assignment_node(test_app_ast);
const server_def = get_server_fn(test_app_ast);
// server_def.val[2];

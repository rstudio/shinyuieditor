import type { ShinyUiNodeByName } from "../Shiny-Ui-Elements/uiNodeTypes";

import { test_app_ast } from "./ast-typings";
import type { Primative_Array, Primative_Map } from "./flatten_list";
import {
  get_assignment_nodes,
  get_ui_assignment_node,
  parse_app_ast,
} from "./get_assignment_nodes";

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

export type Expression_Node<T extends R_AST> = {
  val: T;
  type: "e";
  pos?: Script_Position;
};
export type Symbol_Node<Sym extends string> = {
  val: Sym;
  type: "s";
  pos?: Script_Position;
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

parse_app_ast(test_app_ast);

const assignment_nodes = get_assignment_nodes(test_app_ast);
const ui_def = get_ui_assignment_node(assignment_nodes);

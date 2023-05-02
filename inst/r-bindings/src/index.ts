import type { Script_Range } from "communication-types/src/MessageToBackend";

export type Primatives = string | number | boolean;

type Node_Vals_By_Key = {
  s: string; // Symbol
  c: string; // Characters/ strings
  b: boolean;
  n: number;
  u: unknown;
  m: never; // missing
  e: R_AST; // another node/expression
};

export const ast_name_to_key = {
  symbol: "s",
  character: "c",
  boolean: "b",
  number: "n",
  unknown: "u",
  expression: "e",
} as const;

type Script_Position = [
  start_row: number,
  start_col: number,
  end_row: number,
  end_col: number
];

export function pos_to_script_range(pos: Script_Position): Script_Range {
  return {
    start: { row: pos[0], column: pos[1] },
    end: { row: pos[2], column: pos[3] },
  };
}

export type AST_Name_To_Key = typeof ast_name_to_key;

export type AST_Node_By_Key = {
  [key in keyof Node_Vals_By_Key]: {
    val: Node_Vals_By_Key[key];
    type: key;
    name?: string;
    pos?: Script_Position;
  };
};

export type AST_Node_By_Name = {
  [Name in keyof AST_Name_To_Key]: AST_Node_By_Key[AST_Name_To_Key[Name]];
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
export type Function_Node = Expression_Node<
  [AST_Node_By_Name["symbol"], ...R_AST_Node[]]
>;
export type Leaf_Node = AST_Node_By_Key["c" | "b" | "n"];
export type Unparsable_Node = AST_Node_By_Key["s" | "m" | "u"];
export type R_AST_Node = AST_Node_By_Key[keyof Node_Vals_By_Key];

export type R_AST = Array<R_AST_Node>;

type Raw_Script_Info = {
  script: string;
  ast: R_AST;
};

export type Raw_R_Info =
  | {
      app_type: "SINGLE-FILE";
      app: Raw_Script_Info;
    }
  | {
      app_type: "MULTI-FILE";
      ui: Raw_Script_Info;
      server: Raw_Script_Info;
    };

export {
  IsNodeOfType,
  is_ast_branch_node,
  is_primative_node,
  is_function_node,
} from "./node_identity_checkers";
export { text_node_to_code } from "./text_nodes/text_node_to_code";
export { get_ast_is_array_or_list } from "./flatten_arrays_and_lists";
export { make_character_node, name_node } from "./node_builders";
export { is_function_call } from "./Function_Call_Node";
export { Parsing_Error } from "./parsing_error_class";
export { raw_R_info_to_app_info } from "./raw_R_info_to_app_info";
export {
  get_assignment_nodes,
  get_output_positions,
  get_server_assignment_node,
} from "./get_assignment_nodes";

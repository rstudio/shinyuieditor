import type { ScriptRange } from "communication-types/src/MessageToBackend";

export type Primatives = string | number | boolean;

type NodeValsByKey = {
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

type ScriptPosition = [
  start_row: number,
  start_col: number,
  end_row: number,
  end_col: number
];

/**
 * Convert from R-provided position arrays to ui editor friendly format while
 * also smoothing out some of the inconsitencies in R's `parse` position info
 * @param pos Position of node in R_AST Script_Position arrray format
 * @returns Position in the script in Ui-Editor friendly format
 */
export function posToScriptRange(pos: ScriptPosition): ScriptRange {
  return {
    start: { row: pos[0] - 1, column: pos[1] - 1 },
    end: { row: pos[2], column: pos[3] - 1 },
  };
}

export type AstNameToKey = typeof ast_name_to_key;

export type AstNodeByKey = {
  [key in keyof NodeValsByKey]: {
    val: NodeValsByKey[key];
    type: key;
    name?: string;
    pos?: ScriptPosition;
  };
};

export type AST_Node_By_Name = {
  [Name in keyof AstNameToKey]: AstNodeByKey[AstNameToKey[Name]];
};

export type Expression_Node<T extends R_AST> = {
  val: T;
  type: "e";
  pos?: ScriptPosition;
};
export type Symbol_Node<Sym extends string> = {
  val: Sym;
  type: "s";
  pos?: ScriptPosition;
};
export type Branch_Node = AstNodeByKey["e"];
export type Function_Node = Expression_Node<
  [AST_Node_By_Name["symbol"], ...R_AST_Node[]]
>;
export type Leaf_Node = AstNodeByKey["c" | "b" | "n"];
export type Unparsable_Node = AstNodeByKey["s" | "m" | "u"];
export type R_AST_Node = AstNodeByKey[keyof NodeValsByKey];

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
export { ParsingError as Parsing_Error } from "./parsing_error_class";
export {
  get_assignment_nodes,
  get_output_positions,
  get_server_assignment_node,
} from "./get_assignment_nodes";
export { generate_r_output_binding } from "./generate_output_binding";
export { rTreesitterToUiTree as r_treesitter_to_ui_tree } from "./r_treesitter_to_ui_tree";
export { parse_r_script } from "./parse_r_script";
export { generate_app_script_template } from "./generate_app_script_template";
export { find_ui_def_in_r_app as get_ui_node_from_r_multifile_app } from "./parse_multifile_r_apps";
// export { get_server_positions } from "./get_server_positions";
// export { find_ui_and_server_in_singlefile_app } from "./find_ui_and_server_in_singlefile_app";
// export { find_ui_and_server_in_multifile_r_app } from "./parse_multifile_r_apps";
export { parse_r_app } from "./parse_r_app";

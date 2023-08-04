import type { ScriptRange } from "communication-types/src/MessageToBackend";

export type Primatives = string | number | boolean;

type NodeValsByKey = {
  s: string; // Symbol
  c: string; // Characters/ strings
  b: boolean;
  n: number;
  u: unknown;
  m: never; // missing
  e: RAST; // another node/expression
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

export type ASTNodeByName = {
  [Name in keyof AstNameToKey]: AstNodeByKey[AstNameToKey[Name]];
};

export type ExpressionNode<T extends RAST> = {
  val: T;
  type: "e";
  pos?: ScriptPosition;
};
export type SymbolNode<Sym extends string> = {
  val: Sym;
  type: "s";
  pos?: ScriptPosition;
};
export type BranchNode = AstNodeByKey["e"];
export type FunctionNode = ExpressionNode<
  [ASTNodeByName["symbol"], ...RASTNode[]]
>;
export type LeafNode = AstNodeByKey["c" | "b" | "n"];
export type RASTNode = AstNodeByKey[keyof NodeValsByKey];

export type RAST = Array<RASTNode>;

type RawScriptInfo = {
  script: string;
  ast: RAST;
};

export type RawRInfo =
  | {
      app_type: "SINGLE-FILE";
      app: RawScriptInfo;
    }
  | {
      app_type: "MULTI-FILE";
      ui: RawScriptInfo;
      server: RawScriptInfo;
    };

export {
  IsNodeOfType,
  isAstBranchNode as is_ast_branch_node,
  isPrimativeNode as is_primative_node,
  isFunctionNode as is_function_node,
} from "./node_identity_checkers";
export { textNodeToCode as text_node_to_code } from "./text_nodes/text_node_to_code";
export { get_ast_is_array_or_list } from "./flatten_arrays_and_lists";
export { is_function_call } from "./Function_Call_Node";
export { ParsingError as Parsing_Error } from "./parsing_error_class";
export {
  getAssignmentNodes as get_assignment_nodes,
  getOutputPositions as get_output_positions,
  getServerAssignmentNode as get_server_assignment_node,
} from "./get_assignment_nodes";
export { generate_r_output_binding } from "./generate_output_binding";
export { rTreesitterToUiTree as r_treesitter_to_ui_tree } from "./r_treesitter_to_ui_tree";
export { parseRScript as parse_r_script } from "./parse_r_script";
export { generate_app_script_template } from "./generate_app_script_template";
export { findUiDefInRApp as get_ui_node_from_r_multifile_app } from "./parse_multifile_r_apps";
// export { get_server_positions } from "./get_server_positions";
// export { find_ui_and_server_in_singlefile_app } from "./find_ui_and_server_in_singlefile_app";
// export { find_ui_and_server_in_multifile_r_app } from "./parse_multifile_r_apps";
export { parseRApp as parse_r_app } from "./parse_r_app";

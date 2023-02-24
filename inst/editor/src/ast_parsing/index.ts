import type { ShinyUiNode } from "editor";

import type { Output_Server_Pos } from "./get_assignment_nodes";

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

export type Raw_Script_Info = {
  script: string;
  ast: R_AST;
};

export type Single_File_App_Type = "SINGLE-FILE";
export type Multi_File_App_Type = "MULTI-FILE";
export type App_Type = Single_File_App_Type | Multi_File_App_Type;

export type Single_File_Raw_App_Info = {
  app_type: Single_File_App_Type;
  app: Raw_Script_Info;
};
export type Multi_File_Raw_App_Info = {
  app_type: Multi_File_App_Type;
  ui: Raw_Script_Info;
  server: Raw_Script_Info;
};

export type Raw_App_Info = Single_File_Raw_App_Info | Multi_File_Raw_App_Info;

// Shared by both single and multi-file apps.
export type Full_App_Info_Core = {
  ui_tree: ShinyUiNode;
} & ({ output_positions: Output_Server_Pos; server_pos: Script_Position } | {});

export type Single_File_Full_Info = Full_App_Info_Core & {
  app_type: Single_File_App_Type;
  app: {
    code: string;
    libraries: string[];
  };
};

export type Multi_File_Full_Info = Full_App_Info_Core & {
  app_type: Multi_File_App_Type;
  ui: {
    code: string;
    libraries: string[];
  };
  server: {
    code: string;
  };
};

export const SCRIPT_LOC_KEYS = {
  ui: "<UI>",
  libraries: "<LIBRARIES>",
};

export type Full_App_Info = Single_File_Full_Info | Multi_File_Full_Info;

export type Single_File_App_Script = {
  app_type: Single_File_App_Type;
  app: string;
  info?: Single_File_Full_Info;
};
export type Multi_File_App_Script = {
  app_type: Multi_File_App_Type;
  ui: string;
  server: string;
  info?: Multi_File_Full_Info;
};

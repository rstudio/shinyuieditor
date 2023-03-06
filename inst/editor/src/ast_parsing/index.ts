import type { ShinyUiNode } from "editor";
import type { R_AST, Script_Position } from "r-ast-parsing";
import type { Output_Server_Pos } from "r-ast-parsing/src/get_assignment_nodes";

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

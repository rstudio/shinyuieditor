import type { ShinyUiNode } from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import type { R_AST } from "r-ast-parsing";
import type { Known_Outputs } from "r-ast-parsing/src/get_assignment_nodes";

type Raw_Script_Info = {
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
} & ({ known_outputs: Known_Outputs } | {});

/**
 * Contextual information neccesary to produce a full ui definition for an
 * application.
 */
type UI_Template = {
  /**
   * Code template for the app. If this is omitted very simple templates with
   * no server will be used instead
   */
  code?: string;
  /**
   * Packages that are already loaded in the ui declaring script. Could be for
   * some unknown ui code that is not properly captured by the ui tree
   */
  packages: string[];
};

export type Single_File_Full_Info = Full_App_Info_Core & {
  app_type: Single_File_App_Type;
  app: UI_Template;
};

export type Multi_File_Full_Info = Full_App_Info_Core & {
  app_type: Multi_File_App_Type;
  ui: UI_Template;
  server: {
    code: string;
  };
};

export const SCRIPT_LOC_KEYS = {
  ui: "<UI>",
  packages: "<PACKAGES>",
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

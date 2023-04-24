import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";

type Single_File_App_Type = "SINGLE-FILE";
type Multi_File_App_Type = "MULTI-FILE";
export type App_Type = Single_File_App_Type | Multi_File_App_Type;

/**
 * What mode is the editor currently in. This will influence what code is
 * generated and elements are visible in the elements palette
 * */
export type Language_Mode = "R" | "PYTHON";

// Shared by both single and multi-file apps.
export type App_Info = {
  ui_tree: ShinyUiNode;
  language: Language_Mode;
  known_outputs: Set<string>;
} & (
  | {
      app_type: Single_File_App_Type;
      app: Script_Generation_Template;
    }
  | {
      app_type: Multi_File_App_Type;
      ui: Script_Generation_Template;
      server: Pick<Script_Generation_Template, "code">;
    }
);

/**
 * Contextual information neccesary to produce a full ui definition for an
 * application.
 */
export type Script_Generation_Template = {
  /**
   * Code template for the app. If this is omitted very simple templates with
   * no server will be used instead
   */
  code: string;
  /**
   * Packages that are already loaded in the ui declaring script. Could be for
   * some unknown ui code that is not properly captured by the ui tree
   */
  packages: string[];
};

export type App_Script_Info =
  | {
      app_type: Single_File_App_Type;
      app: string;
      info?: App_Info;
    }
  | {
      app_type: Multi_File_App_Type;
      ui: string;
      server: string;
      info?: App_Info;
    };

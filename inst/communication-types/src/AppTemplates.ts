import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";

import type { App_Type } from "./AppInfo";
import type { Generated_UI_Def } from "./MessageToBackend";

export type Single_File_Template_Selection = {
  outputType: Extract<App_Type, "SINGLE-FILE">;
} & Omit<TemplateInfo, "title" | "description"> &
  Generated_UI_Def;

export type Multi_File_Template_Selection = {
  outputType: Extract<App_Type, "MULTI-FILE">;
} & Omit<TemplateInfo, "title" | "description"> &
  Generated_UI_Def;

export type TemplateSelection =
  | Single_File_Template_Selection
  | Multi_File_Template_Selection;

/**
 * Defines basic information needed to build an app template for the template viewer
 */

export type TemplateInfo = {
  /**
   * Displayed name of the template in the chooser view
   */
  title: string;
  /** Long form description of the template available on hover. This can use
   * markdown formatting
   */
  description: string;
  /**
   * Main tree definining the template. Used for generating preview and also the
   * main ui definition of the template
   */
  uiTree: ShinyUiNode;
  otherCode: {
    /**
     * Extra code that will be copied unchanged above the ui definition
     */
    uiExtra?: string;

    /**
     * List of libraries that need to be loaded in server code
     */
    serverLibraries?: string[];

    /**
     * Extra code that will be copied unchanged above server funtion definition
     */
    serverExtra?: string;

    /**
     * Body of server function. This will be wrapped in the code
     * `function(input, output){....}`
     */
    serverFunctionBody?: string;
  };
};

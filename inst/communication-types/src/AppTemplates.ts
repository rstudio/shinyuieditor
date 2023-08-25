import type { ShinyUiNode } from "editor/src/ui-node-definitions/ShinyUiNode";

import type { AppType } from "./AppInfo";
import type { GeneratedUiDef } from "./MessageToBackend";

export type SingleFileTemplateSelection = {
  outputType: Extract<AppType, "SINGLE-FILE">;
} & Omit<TemplateInfo, "title" | "description"> &
  GeneratedUiDef;

export type MultiFileTemplateSelection = {
  outputType: Extract<AppType, "MULTI-FILE">;
} & Omit<TemplateInfo, "title" | "description"> &
  GeneratedUiDef;

export type TemplateSelection =
  | SingleFileTemplateSelection
  | MultiFileTemplateSelection;

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

import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";

import type { InputOutputLocations } from "./MessageToBackend";

type SingleFileAppType = "SINGLE-FILE";
type MultiFileAppType = "MULTI-FILE";
export type AppType = SingleFileAppType | MultiFileAppType;

/**
 * What mode is the editor currently in. This will influence what code is
 * generated and elements are visible in the elements palette
 * */
export type LanguageMode = "R" | "PYTHON";

// TODO: Simplify this interface to reflect that we now have tree-sitter

// Shared  by both single and multi-file apps.
export type AppInfo = {
  ui_tree: ShinyUiNode;
  scripts: AppScriptInfo;
  language: LanguageMode;
  server_locations?: InputOutputLocations;
} & (
  | {
      app_type: SingleFileAppType;
      app: ScriptGenerationTemplate;
    }
  | {
      app_type: MultiFileAppType;
      ui: ScriptGenerationTemplate;
      server: Pick<ScriptGenerationTemplate, "code">;
    }
);

/**
 * Contextual information neccesary to produce a full ui definition for an
 * application.
 */
export type ScriptGenerationTemplate = {
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

export type AppScriptInfo =
  | {
      app_type: SingleFileAppType;
      app: string;
      info?: AppInfo;
    }
  | {
      app_type: MultiFileAppType;
      ui: string;
      server: string;
      info?: AppInfo;
    };

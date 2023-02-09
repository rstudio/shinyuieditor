import type {
  App_Type,
  Multi_File_App_Script,
  Script_Position,
  Single_File_App_Script,
} from "ast-parsing";
import type { ShinyUiNode } from "editor";

import { isRecord } from "./isRecord";
import type { MessageUnion } from "./MessageUnion";

/**
 * Messages keyed by path that can be sent to the backend from the client
 */
export type MessageToBackendByPath = {
  "READY-FOR-STATE": null;
  "UPDATED-APP": Single_File_App_Script | Multi_File_App_Script;
  "NODE-SELECTION": string[];
  "ENTERED-TEMPLATE-SELECTOR": null;
  "APP-PREVIEW-REQUEST": null;
  "APP-PREVIEW-RESTART": null;
  "APP-PREVIEW-STOP": null;
  "OPEN-COMPANION-EDITOR": CompanionEditorPosition;
  "SHOW-APP-LINES": Script_Position[];
  "INSERT-SNIPPET": SnippetInsertRequest;
  "FIND-INPUT-USES": InputSourceRequest;
};

/**
 * Union form of the backend messages with path and payload pairings for
 * callbacks
 */
export type MessageToBackend = MessageUnion<MessageToBackendByPath>;

export type SnippetInsertRequest = { snippet: string; below_line: number };
export type InputSourceRequest = {
  type: "Input";
  /** The current input id used to bind to ui output fn */
  inputId: string;
};

export type R_Ui_Code = {
  /** String with formatted R code defining a shiny ui */
  ui_code: string;
  /** String with all the library calls to accompany the ui code*/
  library_calls: string[];
};

/**
 * Positions the user can request the companion editor to be placed in
 */
export type CompanionEditorPosition = "BESIDE";

export type ParsedAppInfo = {
  file_lines: string[];
  loaded_libraries: string[];
  type: App_Type;
  ui_bounds: { start: number; end: number };
  ui_tree: ShinyUiNode;
};

export function isMessageToBackend(x: unknown): x is MessageToBackend {
  if (!isRecord(x)) return false;
  return "path" in x;
}

import type { ShinyUiNode } from "editor";
import type { Full_App_Info } from "editor/src/backendCommunication/full_app_info";

import { isRecord } from "./isRecord";
import type { MessageUnion } from "./MessageUnion";

/**
 * Messages keyed by path that can be sent to the backend from the client
 */
export type MessageToBackendByPath = {
  "READY-FOR-STATE": null;
  "UPDATED-APP": { app: string; app_info?: Full_App_Info };
  "NODE-SELECTION": string[];
  "ENTERED-TEMPLATE-SELECTOR": null;
  "APP-PREVIEW-REQUEST": null;
  "APP-PREVIEW-RESTART": null;
  "APP-PREVIEW-STOP": null;
  "OPEN-COMPANION-EDITOR": CompanionEditorPosition;
  "GO-TO-SERVER": OutputSourceRequest | InputSourceRequest;
};

/**
 * Union form of the backend messages with path and payload pairings for
 * callbacks
 */
export type MessageToBackend = MessageUnion<MessageToBackendByPath>;

export type OutputSourceRequest = {
  type: "Output";
  /** The current output id used to bind to ui output fn */
  outputId: string;
  /** Code scaffold to put in if there's no existing output code for a source */
  renderScaffold: string;
};

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

export type OutputType = "SINGLE-FILE" | "MULTI-FILE";

/**
 * Positions the user can request the companion editor to be placed in
 */
export type CompanionEditorPosition = "BESIDE";

export type ParsedAppInfo = {
  file_lines: string[];
  loaded_libraries: string[];
  type: OutputType;
  ui_bounds: { start: number; end: number };
  ui_tree: ShinyUiNode;
};

export function isMessageToBackend(x: unknown): x is MessageToBackend {
  if (!isRecord(x)) return false;
  return "path" in x;
}

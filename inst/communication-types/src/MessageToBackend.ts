import type { ShinyUiNode } from "editor/src/ui-node-definitions/ShinyUiNode";

import { isRecord } from "./isRecord";
import type { MessageUnion } from "./MessageUnion";

/**
 * Messages keyed by path that can be sent to the backend from the client
 */
export type MessageToBackendByPath = {
  "READY-FOR-STATE": null;
  "UPDATED-APP": { app_script: string };
  "ENTERED-TEMPLATE-SELECTOR": null;
  "APP-PREVIEW-REQUEST": null;
  "APP-PREVIEW-RESTART": null;
  "APP-PREVIEW-STOP": null;
  "OPEN-COMPANION-EDITOR": CompanionEditorPosition;
  "INSERT-SNIPPET": SnippetInsertRequest;
  "SELECT-SERVER-CODE": ServerPositionInfo;
};

/**
 * Union form of the backend messages with path and payload pairings for
 * callbacks
 */
export type MessageToBackend = MessageUnion<MessageToBackendByPath>;

export type SnippetInsertRequest = {
  snippet: string;
  insert_at: "end" | "start" | ScriptPosition;
};

type ServerPositionInfo = { positions: ServerPositions };

export type InputSourceRequest = {
  type: "Input";
  /** The current input id used to bind to ui output fn */
} & ({ inputId: string } | ServerPositionInfo);

export type OutputSourceRequest = {
  type: "Output";
} & ({ outputId: string } | ServerPositionInfo);

/**
 * Output of code generation functions for ui. Contains the definition of the ui
 * as a function call in the `code` field and the  and the packages that were
 * used in that code in the `packages` field.
 */
export type GeneratedUiDef = {
  /**
   * String with formatted R or Python code defining a shiny ui
   *
   **/
  code: string;
  /**
   * List of all packages used in the ui definition call
   **/
  packages: string[];
};

/**
 * Positions the user can request the companion editor to be placed in
 */
export type CompanionEditorPosition = "BESIDE";

/**
 * Single location in a script
 */
type ScriptPosition = {
  row: number;
  column: number;
};

/**
 * List of ranges within a script where a given set of server code is located
 */
export type ServerPositions = {
  start: ScriptPosition;
  end: ScriptPosition;
}[];

/**
 * Key-value store using `Map` pointing to where in the server code a given input or
 * output's references live.
 */
export type ServerPositionMap = Map<string, ServerPositions>;

export type ParsedAppInfo = {
  file_lines: string[];
  loaded_libraries: string[];
  ui_bounds: { start: number; end: number };
  ui_tree: ShinyUiNode;
};

export function isMessageToBackend(x: unknown): x is MessageToBackend {
  if (!isRecord(x)) return false;
  return "path" in x;
}

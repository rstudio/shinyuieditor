import type { ShinyUiNode } from "editor/src/ui-node-definitions/ShinyUiNode";
import type { getNodePositionAndIndent } from "treesitter-parsers";

import type { AppScriptInfo, AppType } from "./AppInfo";
import { isRecord } from "./isRecord";
import type { MessageUnion } from "./MessageUnion";

/**
 * Messages keyed by path that can be sent to the backend from the client
 */
export type MessageToBackendByPath = {
  "READY-FOR-STATE": null;
  "UPDATED-APP": AppScriptInfo;
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
export type ScriptPosition = {
  row: number;
  column: number;
};
/**
 * Range within a script. For something like a function definition etc..
 */
export type ScriptRange = {
  start: ScriptPosition;
  end: ScriptPosition;
};

/**
 * List of ranges within a script where a given set of server code is located
 */
export type ServerPositions = ScriptRange[];

/**
 * Key-value store using an object pointing to where in the server code a given input or
 * output's references live.
 */
export type ServerLocations = Record<string, ServerPositions>;

/**
 * Key-value store using `Map` pointing to where in the server code a given input or
 * output's references live.
 */
export type ServerPositionMap = Map<string, ServerPositions>;

/**
 * Locations of inputs and outputs in the server
 */
export type InputOutputLocations = {
  input_positions: ServerLocations;
  output_positions: ServerLocations;
  server_fn: ReturnType<typeof getNodePositionAndIndent>;
};

export type ParsedAppInfo = {
  file_lines: string[];
  loaded_libraries: string[];
  type: AppType;
  ui_bounds: { start: number; end: number };
  ui_tree: ShinyUiNode;
};

export function isMessageToBackend(x: unknown): x is MessageToBackend {
  if (!isRecord(x)) return false;
  return "path" in x;
}

// import { runSUE } from "@editor/main";
import type { ShinyUiNode } from "editor";

import type { MessageDispatcher } from "./messageDispatcher";

// type ShinyUiNode = {
//   uiName: string;
//   uiArguments: Record<string, unknown>;
//   uiChildren?: ShinyUiNode[];
// };

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
export type OutputType = "SINGLE-FILE" | "MULTI-FILE";

export type TemplateSelection = Omit<TemplateInfo, "title" | "description"> & {
  outputType: OutputType;
};

export type ParsedAppInfo = {
  file_lines: string[];
  loaded_libraries: string[];
  type: OutputType;
  ui_bounds: { start: number; end: number };
  ui_tree: ShinyUiNode;
};

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

/**
 * Messages keyed by path that can be sent to the backend
 */
type MessageToBackendByPath = {
  "READY-FOR-STATE": null;
  "UPDATED-TREE": ShinyUiNode;
  "UPDATED-UI": R_Ui_Code;
  "NODE-SELECTION": string[];
  "ENTERED-TEMPLATE-SELECTOR": null;
  "TEMPLATE-SELECTION": TemplateSelection;
  "APP-PREVIEW-REQUEST": null;
  "APP-PREVIEW-RESTART": null;
  "APP-PREVIEW-STOP": null;
  "OPEN-COMPANION-EDITOR": CompanionEditorPosition;
  "GO-TO-SERVER": OutputSourceRequest | InputSourceRequest;
};

/**
 * Positions the user can request the companion editor to be placed in
 */
export type CompanionEditorPosition = "BESIDE";

/**
 * All the paths and their payloads that can be received from the backend
 */
export type MessageToClientByPath = {
  "UPDATED-TREE": ShinyUiNode;
  "BACKEND-ERROR": {
    context: string;
    msg: string;
  };
  "APP-PREVIEW-STATUS": "FAKE-PREVIEW" | "LOADING" | { url: string };
  "APP-PREVIEW-CRASH": string;
  "APP-PREVIEW-LOGS": string[];
  TEMPLATE_CHOOSER: OutputType | "USER-CHOICE";
};

/**
 * Union form of the backend messages with path and payload pairings for
 * callbacks
 */
export type MessageToBackend = MessageUnion<MessageToBackendByPath>;
/**
 * Union form of the message that can be received from backend
 */
export type MessageToClient = MessageUnion<MessageToClientByPath>;

/**
 * Communication layer for client and backend
 */
export type BackendConnection = {
  /**
   * Function to pass a message to the backend
   */
  sendMsg: (msg: MessageToBackend) => void;
  /**
   * Object to subscribe to incoming messages from backend
   */
  incomingMsgs: Omit<MessageDispatcher, "dispatch">;
  /**
   * The different backend runtimes that can be supporting the ui editor client
   */
  mode: "VSCODE" | "HTTPUV" | "STATIC";
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
export function isMessageFromBackend(x: unknown): x is MessageToClient {
  if (!isRecord(x)) return false;
  return "path" in x;
}
export function isMessageFromClient(x: unknown): x is MessageToBackend {
  if (!isRecord(x)) return false;
  return "path" in x;
}

// =============================================================================
// Helper generics to turn our simple message object type into unions that have
// smart payload slots
type PathsWithPayload<
  MsgObj extends MessageToBackendByPath | MessageToClientByPath
> = {
  [K in keyof MsgObj]-?: MsgObj[K] extends null ? never : K;
}[keyof MsgObj];

type PathsWithoutPayload<
  MsgObj extends MessageToBackendByPath | MessageToClientByPath
> = {
  [K in keyof MsgObj]-?: MsgObj[K] extends null ? K : never;
}[keyof MsgObj];

type MessageUnion<
  MsgObj extends MessageToBackendByPath | MessageToClientByPath
> =
  | {
      [T in PathsWithPayload<MsgObj>]: {
        path: T;
        payload: MsgObj[T];
      };
    }[PathsWithPayload<MsgObj>]
  | {
      [T in PathsWithoutPayload<MsgObj>]: {
        path: T;
      };
    }[PathsWithoutPayload<MsgObj>];

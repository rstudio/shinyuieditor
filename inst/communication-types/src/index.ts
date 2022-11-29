// import { runSUE } from "@editor/main";
import type { ShinyUiNode } from "editor";

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

/**
 * Messages keyed by path that can be sent to the backend
 */
type MessageToBackendByPath = {
  "READY-FOR-STATE": null;
  "UPDATED-TREE": ShinyUiNode;
  "ENTERED-TEMPLATE-SELECTOR": null;
  "TEMPLATE-SELECTION": TemplateSelection;
  "APP-PREVIEW-REQUEST": null;
  "APP-PREVIEW-RESTART": null;
  "APP-PREVIEW-STOP": null;
};

/**
 * All the paths and their payloads that can be received from the backend
 */
export type MessageFromBackendByPath = {
  "UPDATED-TREE": ShinyUiNode;
  "BACKEND-ERROR": string;
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
export type MessageFromBackend = MessageUnion<MessageFromBackendByPath>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
export function isMessageFromBackend(x: unknown): x is MessageFromBackend {
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
  MsgObj extends MessageToBackendByPath | MessageFromBackendByPath
> = {
  [K in keyof MsgObj]-?: MsgObj[K] extends null ? never : K;
}[keyof MsgObj];

type PathsWithoutPayload<
  MsgObj extends MessageToBackendByPath | MessageFromBackendByPath
> = {
  [K in keyof MsgObj]-?: MsgObj[K] extends null ? K : never;
}[keyof MsgObj];

type MessageUnion<
  MsgObj extends MessageToBackendByPath | MessageFromBackendByPath
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

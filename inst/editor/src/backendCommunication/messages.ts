import type { TemplateSelection } from "components/TemplatePreviews/filterTemplates";
import type { ShinyUiRootNode } from "Shiny-Ui-Elements/uiNodeTypes";

/**
 * Messages keyed by path that can be sent to the backend
 */

type MessageToBackend = {
  "READY-FOR-STATE": null;
  "UPDATED-TREE": ShinyUiRootNode;
  "TEMPLATE-SELECTOR-REQUEST": null;
  "TEMPLATE-SELECTION": TemplateSelection;
  "APP-PREVIEW-CONNECTED": null;
  "APP-PREVIEW-RESTART": null;
  "APP-PREVIEW-STOP": null;
};

/**
 * Union form of the backend messages with path and payload pairings for
 * callbacks
 */
export type MessageToBackendUnion = MessageUnion<MessageToBackend>;

/**
 * All the paths and their payloads that can be received from the backend
 */
export type MessageFromBackend = {
  "UPDATED-TREE": ShinyUiRootNode;
  "PARSING-ERROR": string;
  "APP-PREVIEW-READY": "FAKE-PREVIEW" | "LOADING" | { url: string };
  "APP-PREVIEW-CRASH": string;
  "APP-PREVIEW-LOGS": string[];
};

/**
 * Union form of the message that can be received from backend
 */
export type MessageFromBackendUnion = MessageUnion<MessageFromBackend>;

// =============================================================================
// Helper generics to turn our simple message object type into unions that have
// smart payload slots
type PathsWithPayload<MsgObj extends MessageToBackend | MessageFromBackend> = {
  [K in keyof MsgObj]-?: MsgObj[K] extends null ? never : K;
}[keyof MsgObj];

type PathsWithoutPayload<MsgObj extends MessageToBackend | MessageFromBackend> =
  {
    [K in keyof MsgObj]-?: MsgObj[K] extends null ? K : never;
  }[keyof MsgObj];

type MessageUnion<MsgObj extends MessageToBackend | MessageFromBackend> =
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

import type { TemplateSelection } from "components/TemplatePreviews/filterTemplates";
import type { ShinyUiRootNode } from "Shiny-Ui-Elements/uiNodeTypes";

/**
 * Messages keyed by path that can be sent to the backend
 */
type MessageToBackend = {
  "READY-FOR-STATE": null;
  "UPDATED-TREE": ShinyUiRootNode;
  "APP-PREVIEW-CONNECTED": null;
  "APP-PREVIEW-RESTART": null;
  "APP-PREVIEW-STOP": null;
  "TEMPLATE-SELECTOR-REQUEST": null;
  "TEMPLATE-SELECTION": TemplateSelection;
};

/**
 * Union form of the backend messages with path and payload pairings for
 * callbacks
 */
type MessageToBackendUnion = MessageUnion<MessageToBackend>;

export type BackendMessageSender = (msg: MessageToBackendUnion) => void;

/**
 * All the paths and their payloads that can be received from the backend
 */
export type MessageFromBackend = {
  "UPDATED-TREE": ShinyUiRootNode;
  "APP-PREVIEW-READY": string;
  "APP-PREVIEW-CRASH": string;
  "APP-PREVIEW-LOGS": string[];
};

/**
 * Union form of the message that can be received from backend
 */
export type MessageFromBackendUnion = MessageUnion<MessageFromBackend>;

export type OnBackendMsgCallback<Path extends keyof MessageFromBackend> = (
  payload: MessageFromBackend[Path]
) => void;
/**
 * A function used to subscribe to a given message path and run a callback upon
 * receiving message form backend
 */
export type BackendMessageSubscriber = {
  [T in keyof MessageFromBackend]: {
    on: T;
    callback: OnBackendMsgCallback<T>;
  };
}[keyof MessageFromBackend];

export type BackendMessageReceiver = {
  subscribe: (x: BackendMessageSubscriber) => void;
};

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

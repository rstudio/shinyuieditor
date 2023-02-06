import type { ShinyUiNode } from "editor";

import { isRecord } from "./isRecord";
import type { OutputType } from "./MessageToBackend";
import type { MessageUnion } from "./MessageUnion";

/**
 * All the paths and their payloads that can be send to the client from the
 * backend
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
 * Union form of the message that can be received from backend
 */
export type MessageToClient = MessageUnion<MessageToClientByPath>;

export function isMessageToClient(x: unknown): x is MessageToClient {
  if (!isRecord(x)) return false;
  return "path" in x;
}

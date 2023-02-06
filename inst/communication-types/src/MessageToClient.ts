import type { Raw_App_Info } from "ast-parsing";
import type { Full_App_Info } from "editor/src/backendCommunication/full_app_info";

import { isRecord } from "./isRecord";
import type { OutputType } from "./MessageToBackend";
import type { MessageUnion } from "./MessageUnion";

/**
 * All the paths and their payloads that can be sent to the client from the
 * backend
 */
export type MessageToClientByPath = {
  "APP-INFO": Raw_App_Info | Full_App_Info;
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

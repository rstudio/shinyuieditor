import type { Raw_R_Info } from "r-bindings";

import type {
  App_Type,
  App_Info,
  Language_Mode,
  App_Script_Info,
} from "./AppInfo";
import { isRecord } from "./isRecord";
import type { MessageUnion } from "./MessageUnion";

/**
 * Object containing either the single or multi file app scripts
 */
// export type App_Scripts = { app: string } | { ui: string; server: string };
/**
 * All the paths and their payloads that can be sent to the client from the
 * backend
 */
export type MessageToClientByPath = {
  "RAW-R-INFO": Raw_R_Info;
  "APP-SCRIPT-TEXT": { language: Language_Mode } & App_Script_Info;
  "APP-INFO": App_Info;
  "BACKEND-ERROR": {
    context: string;
    msg: string;
  };
  "APP-PREVIEW-STATUS": "LOADING" | { url: string };
  "APP-PREVIEW-CRASH": string;
  "APP-PREVIEW-LOGS": string[];
  TEMPLATE_CHOOSER: App_Type | "USER-CHOICE";
};

/**
 * Union form of the message that can be received from backend
 */
export type MessageToClient = MessageUnion<MessageToClientByPath>;

export function isMessageToClient(x: unknown): x is MessageToClient {
  if (!isRecord(x)) return false;
  return "path" in x;
}

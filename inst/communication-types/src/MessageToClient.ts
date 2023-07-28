import type { Raw_R_Info } from "r-bindings";

import type { AppType, AppInfo, LanguageMode, AppScriptInfo } from "./AppInfo";
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
  "APP-SCRIPT-TEXT": { language: LanguageMode } & AppScriptInfo;
  "APP-INFO": AppInfo;
  "BACKEND-ERROR": {
    context: string;
    msg: string;
  };
  "APP-PREVIEW-STATUS": "LOADING" | { url: string };
  "APP-PREVIEW-CRASH": string;
  "APP-PREVIEW-LOGS": string[];
  TEMPLATE_CHOOSER: AppType | "USER-CHOICE";
};

/**
 * Union form of the message that can be received from backend
 */
export type MessageToClient = MessageUnion<MessageToClientByPath>;

export function isMessageToClient(x: unknown): x is MessageToClient {
  if (!isRecord(x)) return false;
  return "path" in x;
}

import type { AppInfo, AppScriptInfo, AppType, LanguageMode } from "./AppInfo";
import { isRecord } from "./isRecord";
import type { MessageUnion } from "./MessageUnion";

type NewType = {
  CHECKIN: {
    /* Basic handshake between backend to give some basic context about runtime to client */
    server_aware: boolean;
    language: LanguageMode;
    path_to_ts_wasm?: string;
  };
  "APP-SCRIPT-TEXT": {
    language: LanguageMode;
  } & AppScriptInfo;
  // TODO: Remove this because it's only used for the static backend mode
  "APP-INFO": AppInfo;
  "BACKEND-ERROR": {
    context: string;
    msg: string;
  };
  "APP-PREVIEW-STATUS":
    | "LOADING"
    | {
        url: string;
      };
  "APP-PREVIEW-CRASH": string;
  "APP-PREVIEW-LOGS": string[];
  TEMPLATE_CHOOSER: AppType | "USER-CHOICE";
};

/**
 * Object containing either the single or multi file app scripts
 */
// export type App_Scripts = { app: string } | { ui: string; server: string };
/**
 * All the paths and their payloads that can be sent to the client from the
 * backend
 */
export type MessageToClientByPath = NewType;

/**
 * Union form of the message that can be received from backend
 */
export type MessageToClient = MessageUnion<MessageToClientByPath>;

export function isMessageToClient(x: unknown): x is MessageToClient {
  if (!isRecord(x)) return false;
  return "path" in x;
}

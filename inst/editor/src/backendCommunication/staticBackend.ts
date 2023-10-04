import type { BackendConnection, MessageDispatcher } from "communication-types";
import type { LanguageMode } from "communication-types/src/AppInfo";
import { makeMessageDispatcher } from "communication-types/src/BackendConnection";

import type { MinimalAppInfo } from "./getClientsideOnlyTree";
import { getClientsideOnlyTree } from "./getClientsideOnlyTree";

export function setupStaticBackend({
  messageDispatch,
  showMessages,
  defaultInfo,
}: {
  messageDispatch: MessageDispatcher;
  showMessages: boolean;
  defaultInfo: MinimalAppInfo;
}) {
  // eslint-disable-next-line no-console
  const logger = showMessages ? console.log : (...args: any[]) => {};

  const messagePassingMethods: BackendConnection = {
    sendMsg: (msg) => {
      logger("Static sendMsg()", msg);
      switch (msg.path) {
        case "READY-FOR-STATE": {
          // Send initial checkin msg
          messageDispatch.dispatch("CHECKIN", {
            language: defaultInfo.language,
            server_aware: false,
            app_preview: false,
          });

          getClientsideOnlyTree(defaultInfo).then(
            ({ app_script, language }) => {
              if (app_script === "TEMPLATE_CHOOSER") {
                messageDispatch.dispatch("TEMPLATE_CHOOSER", "please");
              } else {
                messageDispatch.dispatch("APP-SCRIPT-TEXT", {
                  language,
                  app_script,
                });
              }
            }
          );
          return;
        }
        case "UPDATED-APP": {
          // if (msg.payload.info) {
          //   messageDispatch.dispatch("APP-INFO", msg.payload.info);
          // }
          return;
        }
        case "APP-PREVIEW-REQUEST": {
          // Ignore
          return;
        }
      }
    },
    incomingMsgs: messageDispatch,
    mode: "STATIC",
  };
  return messagePassingMethods;
}

/**
 * Create a static backend object for a given ui tree.
 * @param defaultTree Tree to use as default. Defaults to special value of
 * `"TEMPLATE_CHOOSER"` which will show the template chooser.
 * @param language Language to use. Defaults to `"R"`.
 * @returns A backend object that can be used to communicate with the frontend.
 */
export function staticDispatchFromTree(
  defaultApp?: string,
  language: LanguageMode = "R"
) {
  return setupStaticBackend({
    messageDispatch: makeMessageDispatcher(),
    showMessages: true,
    defaultInfo: {
      language,
      app_script: defaultApp ?? "TEMPLATE_CHOOSER",
    },
  });
}

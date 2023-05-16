import type { BackendConnection, MessageDispatcher } from "communication-types";
import { makeMessageDispatcher } from "communication-types/src/BackendConnection";

import type { Minimal_App_Info } from "./getClientsideOnlyTree";
import { getClientsideOnlyTree } from "./getClientsideOnlyTree";

export function setupStaticBackend({
  messageDispatch,
  showMessages,
  defaultInfo,
}: {
  messageDispatch: MessageDispatcher;
  showMessages: boolean;
  defaultInfo: Minimal_App_Info;
}) {
  // eslint-disable-next-line no-console
  const logger = showMessages ? console.log : (...args: any[]) => {};

  const messagePassingMethods: BackendConnection = {
    sendMsg: (msg) => {
      logger("Static sendMsg()", msg);
      switch (msg.path) {
        case "READY-FOR-STATE": {
          getClientsideOnlyTree(defaultInfo).then(({ ui_tree, language }) => {
            if (ui_tree === "TEMPLATE_CHOOSER") {
              messageDispatch.dispatch("TEMPLATE_CHOOSER", "USER-CHOICE");
            } else {
              messageDispatch.dispatch("APP-INFO", {
                ui_tree,
                scripts: {
                  app_type: "SINGLE-FILE",
                  app: "",
                },
                language,
                app_type: "SINGLE-FILE",
                known_outputs: [],
                app: {
                  code: "",
                  packages: ["shiny"],
                },
              });
            }
          });
          return;
        }
        case "UPDATED-APP": {
          if (msg.payload.info) {
            messageDispatch.dispatch("APP-INFO", msg.payload.info);
          }
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

export function staticDispatchFromTree(defaultInfo?: Minimal_App_Info) {
  return setupStaticBackend({
    messageDispatch: makeMessageDispatcher(),
    showMessages: true,
    defaultInfo: defaultInfo ?? {
      ui_tree: "TEMPLATE_CHOOSER",
      language: "R",
    },
  });
}

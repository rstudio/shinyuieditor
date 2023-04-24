import type { BackendConnection, MessageDispatcher } from "communication-types";
import type { Language_Mode } from "communication-types/src/AppInfo";
import { makeMessageDispatcher } from "communication-types/src/BackendConnection";
import type { ShinyUiRootNode } from "ui-node-definitions/src/ShinyUiNode";

import { getClientsideOnlyTree } from "./getClientsideOnlyTree";

export function setupStaticBackend({
  messageDispatch,
  showMessages,
  defaultTree,
  language,
}: {
  messageDispatch: MessageDispatcher;
  showMessages: boolean;
  defaultTree: ShinyUiRootNode;
  language: Language_Mode;
}) {
  // eslint-disable-next-line no-console
  const logger = showMessages ? console.log : (...args: any[]) => {};

  const messagePassingMethods: BackendConnection = {
    sendMsg: (msg) => {
      logger("Static sendMsg()", msg);
      switch (msg.path) {
        case "READY-FOR-STATE": {
          getClientsideOnlyTree(defaultTree).then((ui_tree) => {
            if (ui_tree === "TEMPLATE_CHOOSER") {
              messageDispatch.dispatch("TEMPLATE_CHOOSER", "USER-CHOICE");
            } else {
              messageDispatch.dispatch("APP-INFO", {
                ui_tree,
                language,
                app_type: "SINGLE-FILE",
                known_outputs: new Set<string>(),
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

export function staticDispatchFromTree(defaultTree?: ShinyUiRootNode) {
  return setupStaticBackend({
    language: "R",
    messageDispatch: makeMessageDispatcher(),
    showMessages: true,
    defaultTree: defaultTree ?? "TEMPLATE_CHOOSER",
  });
}

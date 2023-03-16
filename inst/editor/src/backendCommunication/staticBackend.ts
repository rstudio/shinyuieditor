import type { BackendConnection, MessageDispatcher } from "communication-types";

import type { ShinyUiRootNode } from "../Shiny-Ui-Elements/uiNodeTypes";

import { getClientsideOnlyTree } from "./getClientsideOnlyTree";

export function setupStaticBackend({
  messageDispatch,
  showMessages,
  defaultTree,
}: {
  messageDispatch: MessageDispatcher;
  showMessages: boolean;
  defaultTree: ShinyUiRootNode;
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
                app_type: "SINGLE-FILE",
                app: {
                  code: dummy_code,
                  libraries: ["shiny"],
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

const dummy_code: string = `
<LIBRARIES>

ui <- <UI>

server <- function(input, output) {

}

shinyApp(ui, server)
`;

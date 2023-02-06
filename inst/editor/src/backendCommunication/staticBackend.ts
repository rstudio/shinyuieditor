import type { BackendConnection, MessageDispatcher } from "communication-types";

import { TESTING_MODE } from "../env_variables";

import { getClientsideOnlyTree } from "./getClientsideOnlyTree";

export function setupStaticBackend({
  messageDispatch,
  showMessages,
}: {
  messageDispatch: MessageDispatcher;
  showMessages: boolean;
}) {
  // eslint-disable-next-line no-console
  const logger = showMessages ? console.log : (...args: any[]) => {};

  const messagePassingMethods: BackendConnection = {
    sendMsg: (msg) => {
      logger("Static sendMsg()", msg);
      switch (msg.path) {
        case "READY-FOR-STATE": {
          getClientsideOnlyTree().then((ui_tree) => {
            if (ui_tree === "TEMPLATE_CHOOSER") {
              messageDispatch.dispatch("TEMPLATE_CHOOSER", "USER-CHOICE");
            } else {
              messageDispatch.dispatch("APP-INFO", {
                ui_tree,
                code: dummy_code,
                libraries: ["shiny"],
              });
            }
          });
          return;
        }
        case "TEMPLATE-SELECTION": {
          messageDispatch.dispatch("APP-INFO", {
            ui_tree: msg.payload.uiTree,
            code: dummy_code,
            libraries: ["shiny"],
          });
          return;
        }
        case "APP-PREVIEW-REQUEST": {
          if (!TESTING_MODE) return;
          messageDispatch.dispatch("APP-PREVIEW-STATUS", "FAKE-PREVIEW");
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

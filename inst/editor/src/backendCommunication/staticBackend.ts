import { TESTING_MODE } from "../env_variables";
import type { ShinyUiNode } from "../main";

import { getClientsideOnlyTree } from "./getClientsideOnlyTree";
import type { MessageDispatcher } from "./messageDispatcher";
import type { BackendMessagePassers } from "./useBackendMessageCallbacks";

export function setupStaticBackend({
  messageDispatch,
  showMessages,
}: {
  messageDispatch: MessageDispatcher;
  showMessages: boolean;
}) {
  // eslint-disable-next-line no-console
  const logger = showMessages ? console.log : (...args: any[]) => {};

  const messagePassingMethods: BackendMessagePassers = {
    sendMsg: (msg) => {
      logger("Static sendMsg()", msg);

      switch (msg.path) {
        case "READY-FOR-STATE": {
          getClientsideOnlyTree().then((ui_tree) => {
            messageDispatch.dispatch("UPDATED-TREE", ui_tree as ShinyUiNode);
          });
          return;
        }
        case "TEMPLATE-SELECTION": {
          messageDispatch.dispatch("UPDATED-TREE", msg.payload.uiTree);
          return;
        }
        case "APP-PREVIEW-CONNECTED": {
          if (!TESTING_MODE) return;
          messageDispatch.dispatch("APP-PREVIEW-READY", "FAKE-PREVIEW");
          return;
        }
      }
    },
    incomingMsgs: messageDispatch,
  };
  return messagePassingMethods;
}

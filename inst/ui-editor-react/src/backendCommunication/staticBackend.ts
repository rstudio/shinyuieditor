import { SHOW_FAKE_PREVIEW } from "env_variables";

import { getClientsideOnlyTree } from "./getClientsideOnlyTree";
import type { MessageDispatcher } from "./messageDispatcher";
import type { MessageFromBackendUnion } from "./messages";
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

  const dispatchMessageToClient = (msg: MessageFromBackendUnion) => {
    logger("Static backend msg:", msg);
    messageDispatch.dispatch(msg);
  };

  const messagePassingMethods: BackendMessagePassers = {
    sendMsg: (msg) => {
      logger("Static sendMsg()", msg);

      switch (msg.path) {
        case "READY-FOR-STATE": {
          getClientsideOnlyTree().then((ui_tree) => {
            dispatchMessageToClient({
              path: "UPDATED-TREE",
              payload: ui_tree,
            });
          });
          return;
        }
        case "TEMPLATE-SELECTION": {
          dispatchMessageToClient({
            path: "UPDATED-TREE",
            payload: msg.payload.uiTree,
          });
          return;
        }
        case "APP-PREVIEW-CONNECTED": {
          if (!SHOW_FAKE_PREVIEW) return;
          dispatchMessageToClient({
            path: "APP-PREVIEW-READY",
            payload: "FAKE-PREVIEW",
          });
          return;
        }
      }
    },
    backendMsgs: { subscribe: messageDispatch.subscribe },
  };
  return messagePassingMethods;
}

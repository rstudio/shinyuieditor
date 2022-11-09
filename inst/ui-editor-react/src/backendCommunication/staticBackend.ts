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
          dispatchMessageToClient({
            path: "UPDATED-TREE",
            payload: "TEMPLATE_CHOOSER",
          });
          return;
        }
        case "TEMPLATE-SELECTION": {
          dispatchMessageToClient({
            path: "UPDATED-TREE",
            payload: msg.payload.uiTree,
          });
        }
      }
    },
    backendMsgs: { subscribe: messageDispatch.subscribe },
  };
  return messagePassingMethods;
}

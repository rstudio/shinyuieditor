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
  const dispatchMessageToClient = (msg: MessageFromBackendUnion) => {
    if (showMessages) {
      // eslint-disable-next-line no-console
      console.log("Static backend msg:", msg);
    }
    messageDispatch.dispatch(msg);
  };

  const messagePassingMethods: BackendMessagePassers = {
    sendMsg: (msg) => {
      if (msg.path === "READY-FOR-STATE") {
        dispatchMessageToClient({
          path: "UPDATED-TREE",
          payload: "TEMPLATE_CHOOSER",
        });
      }
    },
    backendMsgs: { subscribe: messageDispatch.subscribe },
  };
  return messagePassingMethods;
}

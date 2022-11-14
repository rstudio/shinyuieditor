import type { MessageDispatcher } from "backendCommunication/messageDispatcher";
import { makeMessageDispatcher } from "backendCommunication/messageDispatcher";
// import type { MessageFromBackend } from "backendCommunication/messages";
import type { BackendMessagePassers } from "backendCommunication/useBackendMessageCallbacks";
import type { MessageFromBackend } from "communication-types";
import { isMessageFromBackend } from "communication-types";

import { runSUE } from "./runSUE";

const container = document.getElementById("root");

const showMessages = true;
(async () => {
  try {
    const messageDispatch = makeMessageDispatcher(true);

    const backendDispatch = setupVSCodeBackend({
      messageDispatch,
      showMessages,
    });

    runSUE({ container, backendDispatch, showMessages });
  } catch (e) {}
})();

function setupVSCodeBackend({
  messageDispatch,
  showMessages,
}: {
  messageDispatch: MessageDispatcher;
  showMessages: boolean;
}) {
  // eslint-disable-next-line no-console
  const logger = showMessages ? console.log : (...args: any[]) => {};

  const dispatchMessageToClient = (msg: MessageFromBackend) => {
    logger("VSCode backend msg:", msg);
    messageDispatch.dispatch(msg);
  };

  // Handle messages sent from the extension to the webview
  window.addEventListener("message", (event) => {
    const message = event.data; // The json data that the extension sent

    if (isMessageFromBackend(message)) {
      dispatchMessageToClient(message);
    } else {
      // eslint-disable-next-line no-console
      console.warn("Unknown message type", message);
    }
  });

  const messagePassingMethods: BackendMessagePassers = {
    sendMsg: (msg) => {
      logger("VSCode sendMsg()", msg);

      // switch (msg.path) {
      //   case "READY-FOR-STATE": {
      //     // getClientsideOnlyTree().then((ui_tree) => {
      //     //   dispatchMessageToClient({
      //     //     path: "UPDATED-TREE",
      //     //     payload: ui_tree,
      //     //   } as MessageFromBackend);
      //     // });
      //     return;
      //   }
      //   case "TEMPLATE-SELECTION": {
      //     dispatchMessageToClient({
      //       path: "UPDATED-TREE",
      //       payload: msg.payload.uiTree,
      //     });
      //     return;
      //   }
      //   case "APP-PREVIEW-CONNECTED": {
      //     if (!SHOW_FAKE_PREVIEW) return;
      //     dispatchMessageToClient({
      //       path: "APP-PREVIEW-READY",
      //       payload: "FAKE-PREVIEW",
      //     });
      //     return;
      //   }
      // }
    },
    incomingMsgs: { subscribe: messageDispatch.subscribe },
  };
  return messagePassingMethods;
}

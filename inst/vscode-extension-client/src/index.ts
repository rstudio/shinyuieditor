import type {
  BackendConnection,
  MessageFromBackend,
} from "communication-types";
import { isMessageFromBackend } from "communication-types";
import type { MessageDispatcher } from "communication-types/src/messageDispatcher";
import { makeMessageDispatcher } from "communication-types/src/messageDispatcher";
import { runSUE } from "editor";

const container = document.getElementById("root");

const showMessages = true;
(async () => {
  try {
    const messageDispatch = makeMessageDispatcher();

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
  const vscode = acquireVsCodeApi();

  // eslint-disable-next-line no-console
  const logger = showMessages ? console.log : (...args: any[]) => {};

  const dispatchMessageToClient = (msg: MessageFromBackend) => {
    logger("VSCode backend msg:", msg);
    const { path, payload } = msg;
    messageDispatch.dispatch(path, payload);
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

  const messagePassingMethods: BackendConnection = {
    sendMsg: (msg) => {
      logger("VSCode sendMsg()", msg);
      vscode.postMessage(msg);

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
      //   case "APP-PREVIEW-REQUEST": {
      //     if (!SHOW_FAKE_PREVIEW) return;
      //     dispatchMessageToClient({
      //       path: "APP-PREVIEW-STATUS",
      //       payload: "FAKE-PREVIEW",
      //     });
      //     return;
      //   }
      // }
    },
    incomingMsgs: { subscribe: messageDispatch.subscribe },
    mode: "VSCODE",
  };
  return messagePassingMethods;
}

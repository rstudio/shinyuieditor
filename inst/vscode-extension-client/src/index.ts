import type { BackendConnection, MessageToClient } from "communication-types";
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

  const dispatchMessageToClient = (msg: MessageToClient) => {
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
    },
    incomingMsgs: { subscribe: messageDispatch.subscribe },
    mode: "VSCODE",
  };
  return messagePassingMethods;
}

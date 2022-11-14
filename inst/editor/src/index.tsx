import { makeMessageDispatcher } from "backendCommunication/messageDispatcher";
import { setupStaticBackend } from "backendCommunication/staticBackend";
import type { BackendMessagePassers } from "backendCommunication/useBackendMessageCallbacks";
import { setupWebsocketBackend } from "backendCommunication/websocketBackend";

import { runSUE } from "./runSUE";

const container = document.getElementById("root");

const showMessages = true;
(async () => {
  try {
    const messageDispatch = makeMessageDispatcher(true);

    const websocketDispatch = await setupWebsocketBackend({
      messageDispatch,
      onClose: () => console.log("Websocket closed!!"),
      showMessages,
    });

    const backendDispatch: BackendMessagePassers =
      websocketDispatch === "NO-WS-CONNECTION"
        ? setupStaticBackend({ messageDispatch, showMessages })
        : websocketDispatch;

    runSUE({ container, backendDispatch, showMessages });
  } catch (e) {}
})();

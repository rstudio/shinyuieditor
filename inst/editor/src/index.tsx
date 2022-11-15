import { makeMessageDispatcher } from "./backendCommunication/messageDispatcher";
import { setupStaticBackend } from "./backendCommunication/staticBackend";
import type { BackendMessagePassers } from "./backendCommunication/useBackendMessageCallbacks";
import { setupWebsocketBackend } from "./backendCommunication/websocketBackend";
import { runSUE } from "./runSUE";

const container = document.getElementById("root");

const showMessages = true;
(async () => {
  try {
    const messageDispatch = makeMessageDispatcher(true);

    let websocketDispatch = await setupWebsocketBackend({
      messageDispatch,
      onClose: () => console.log("Websocket closed!!"),
      showMessages,
    });

    if (websocketDispatch === "NO-WS-CONNECTION") {
      // If we're developing locally we use the 8888 port for our websocket, so
      // try that one before giving up and going to static
      await setupWebsocketBackend({
        messageDispatch,
        onClose: () => console.log("Websocket closed!!"),
        showMessages,
        pathToWebsocket: "localhost:8888",
      });
    }

    const backendDispatch: BackendMessagePassers =
      websocketDispatch === "NO-WS-CONNECTION"
        ? setupStaticBackend({ messageDispatch, showMessages })
        : websocketDispatch;

    runSUE({ container, backendDispatch, showMessages });
  } catch (e) {}
})();

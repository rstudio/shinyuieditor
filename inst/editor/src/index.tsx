/* eslint-disable no-console */
import type { BackendConnection } from "communication-types";
import { makeMessageDispatcher } from "communication-types/src/messageDispatcher";

import { setupStaticBackend } from "./backendCommunication/staticBackend";
import { setupWebsocketBackend } from "./backendCommunication/websocketBackend";
import { runSUE } from "./runSUE";

const container = document.getElementById("root");

const showMessages = true;
(async () => {
  try {
    const messageDispatch = makeMessageDispatcher();

    let websocketDispatch = await setupWebsocketBackend({
      messageDispatch,
      onClose: () => console.log("Websocket closed!!"),
    });

    if (websocketDispatch === "NO-WS-CONNECTION") {
      // If we're developing locally we use the 8888 port for our websocket, so
      // try that one before giving up and going to static
      await setupWebsocketBackend({
        messageDispatch,
        onClose: () => console.log("Websocket closed!!"),
        pathToWebsocket: "localhost:8888",
      });
    }

    const backendDispatch: BackendConnection =
      websocketDispatch === "NO-WS-CONNECTION"
        ? setupStaticBackend({ messageDispatch, showMessages })
        : websocketDispatch;

    runSUE({ container, backendDispatch, showMessages });
  } catch (e) {}
})();

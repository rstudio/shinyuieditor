/* eslint-disable no-console */
import type { BackendConnection } from "communication-types";
import { makeMessageDispatcher } from "communication-types/src/BackendConnection";

import { setupStaticBackend } from "./backendCommunication/staticBackend";
import { setupWebsocketBackend } from "./backendCommunication/websocketBackend";
import { DEV_MODE } from "./env_variables";
import { runSUE } from "./runSUE";

const container = document.getElementById("root");

const showMessages = true;
(async () => {
  try {
    const messageDispatch = makeMessageDispatcher();

    const websocketDispatch = await setupWebsocketBackend({
      messageDispatch,
      onClose: () => console.log("Websocket closed!!"),
      // If we're in dev, look at localhost 8888, otherwise use default
      pathToWebsocket: DEV_MODE ? "localhost:8888" : undefined,
    });

    const backendDispatch: BackendConnection =
      websocketDispatch === "NO-WS-CONNECTION"
        ? setupStaticBackend({
            messageDispatch,
            showMessages,
            defaultTree: "TEMPLATE_CHOOSER",
          })
        : websocketDispatch;

    runSUE({ container, backendDispatch, showMessages });
  } catch (e) {}
})();

/* eslint-disable no-console */
import type { BackendConnection } from "communication-types";
import { makeMessageDispatcher } from "communication-types/src/BackendConnection";

import {
  setupStaticBackend,
  ui_tree_to_script,
} from "./backendCommunication/staticBackend";
import { setupWebsocketBackend } from "./backendCommunication/websocketBackend";
import { devModeApp, devModeLanguage } from "./devModeApp";
import { DEV_MODE } from "./env_variables";
import { runSUE } from "./runSUE";

const app_script =
  DEV_MODE && typeof devModeApp !== "string"
    ? ui_tree_to_script({ ui_tree: devModeApp, language: devModeLanguage })
    : devModeApp;

const showMessages = true;
(async () => {
  try {
    const messageDispatch = makeMessageDispatcher();

    // If we're in dev, look at localhost 8888, otherwise use default
    const websocketDispatch = await setupWebsocketBackend({
      messageDispatch,
      onClose: () => console.log("Websocket closed!!"),
      pathToWebsocket: DEV_MODE ? "localhost:8888" : undefined,
    });

    const backendDispatch: BackendConnection =
      websocketDispatch === "NO-WS-CONNECTION"
        ? setupStaticBackend({
            messageDispatch,
            showMessages,
            defaultInfo: { language: devModeLanguage, app_script },
          })
        : websocketDispatch;

    runSUE({
      container: document.getElementById("root"),
      backendDispatch,
      showMessages,
    });
  } catch (e) {}
})();

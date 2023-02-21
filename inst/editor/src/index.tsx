/* eslint-disable no-console */
import type { BackendConnection } from "communication-types";
import { makeMessageDispatcher } from "communication-types/src/BackendConnection";

import { setupStaticBackend } from "./backendCommunication/staticBackend";
import { setupWebsocketBackend } from "./backendCommunication/websocketBackend";
import { DEV_MODE } from "./env_variables";
import { runSUE } from "./runSUE";
import type { ShinyUiRootNode } from "./Shiny-Ui-Elements/uiNodeTypes";
import { basicNavbarPage as devModeTree } from "./state/sample_ui_trees/basicNavbarPage";
// import { bslibCards as devModeTree } from "./state/sample_ui_trees/bslibCards";

const container = document.getElementById("root");

// If we're in dev, look at localhost 8888, otherwise use default
const { pathToWebsocket, defaultTree } = DEV_MODE
  ? {
      pathToWebsocket: "localhost:8888",
      defaultTree: devModeTree,
    }
  : {
      pathToWebsocket: undefined,
      defaultTree: "TEMPLATE_CHOOSER" as ShinyUiRootNode,
    };

const showMessages = true;
(async () => {
  try {
    const messageDispatch = makeMessageDispatcher();

    const websocketDispatch = await setupWebsocketBackend({
      messageDispatch,
      onClose: () => console.log("Websocket closed!!"),

      pathToWebsocket,
    });

    const backendDispatch: BackendConnection =
      websocketDispatch === "NO-WS-CONNECTION"
        ? setupStaticBackend({
            messageDispatch,
            showMessages,
            defaultTree,
          })
        : websocketDispatch;

    runSUE({ container, backendDispatch, showMessages });
  } catch (e) {}
})();

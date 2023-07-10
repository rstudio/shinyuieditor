/* eslint-disable no-console */
import type { BackendConnection } from "communication-types";
import type { Language_Mode } from "communication-types/src/AppInfo";
import { makeMessageDispatcher } from "communication-types/src/BackendConnection";
import { pythonSidebarAndTabs as devModeTree } from "ui-node-definitions/src/sample_ui_trees/pythonSidebarAndTabs";
import type { ShinyUiRootNode } from "ui-node-definitions/src/ShinyUiNode";

import type { Minimal_App_Info } from "./backendCommunication/getClientsideOnlyTree";
import { setupStaticBackend } from "./backendCommunication/staticBackend";
import { setupWebsocketBackend } from "./backendCommunication/websocketBackend";
import { DEV_MODE } from "./env_variables";
import { runSUE } from "./runSUE";
// import { bslibCards as devModeTree } from "./state/sample_ui_trees/bslibCards";
// import { errorTestingTree as devModeTree } from "./state/sample_ui_trees/errorTesting";
// const devModeTree = "TEMPLATE_CHOOSER" as ShinyUiRootNode;

// const language: Language_Mode = "PYTHON";
// const language: Language_Mode = "R";

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

const defaultInfo: Minimal_App_Info = {
  language: "PYTHON",
  ui_tree: defaultTree,
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
            defaultInfo,
          })
        : websocketDispatch;

    runSUE({ container, backendDispatch, showMessages });
  } catch (e) {}
})();

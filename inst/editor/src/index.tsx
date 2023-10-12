/* eslint-disable no-console */
import type { BackendConnection } from "communication-types";
import type { LanguageMode } from "communication-types/src/AppInfo";
import { makeMessageDispatcher } from "communication-types/src/BackendConnection";

// import { pythonSidebarAndTabs as devModeTree } from "ui-node-definitions/src/sample_ui_trees/pythonSidebarAndTabs";

import {
  setupStaticBackend,
  ui_tree_to_script,
} from "./backendCommunication/staticBackend";
import { setupWebsocketBackend } from "./backendCommunication/websocketBackend";
import { DEV_MODE } from "./env_variables";
import { runSUE } from "./runSUE";
// import { basicNavbarPage as devModeTree } from "./ui-node-definitions/sample_ui_trees/basicNavbarPage";
// import { bslibCards as devModeTree } from "./state/sample_ui_trees/bslibCards";
// import { errorTestingTree as devModeTree } from "./state/sample_ui_trees/errorTesting";
const devModeApp = "TEMPLATE_CHOOSER";

const language: LanguageMode = "R";
const app_script =
  DEV_MODE && typeof devModeApp !== "string"
    ? ui_tree_to_script({ ui_tree: devModeApp, language })
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
            defaultInfo: { language, app_script },
          })
        : websocketDispatch;

    runSUE({
      container: document.getElementById("root"),
      backendDispatch,
      showMessages,
    });
  } catch (e) {}
})();

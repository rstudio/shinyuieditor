import { makeMessageDispatcher } from "backendCommunication/messageDispatcher";
import { setupWebsocketBackend } from "backendCommunication/websocketBackend";

import { runSUE } from "./runSUE";

const container = document.getElementById("root");

(async () => {
  const backendDispatch = await setupWebsocketBackend({
    messageDispatch: makeMessageDispatcher(),
    onClose: () => console.log("Websocket closed!!"),
  });

  runSUE({ container, backendDispatch });
})();

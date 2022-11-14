import { makeMessageDispatcher } from "backendCommunication/messageDispatcher";
import { setupStaticBackend } from "backendCommunication/staticBackend";

import { runSUE } from "./runSUE";

const container = document.getElementById("root");

const showMessages = true;
(async () => {
  try {
    console.log("VS CODE extension build mode!");
    const messageDispatch = makeMessageDispatcher(true);

    const backendDispatch = setupStaticBackend({
      messageDispatch,
      showMessages,
    });

    runSUE({ container, backendDispatch, showMessages });
  } catch (e) {}
})();

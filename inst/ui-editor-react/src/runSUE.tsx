import type { BackendMessagePassers } from "backendCommunication/useBackendMessageCallbacks";
import { createRoot } from "react-dom/client";

import { App } from "./App";

export function runSUE({
  container,
  backendDispatch: { sendMsg, backendMsgs },
  showMessages,
}: {
  container: HTMLElement | null;
  backendDispatch: BackendMessagePassers;
  showMessages: boolean;
}) {
  const dispatch: BackendMessagePassers = showMessages
    ? {
        sendMsg,
        backendMsgs: {
          subscribe: (x) => {
            console.log("backendMsgs.subscribe()", x);
            backendMsgs.subscribe(x);
          },
        },
      }
    : {
        sendMsg,
        backendMsgs,
      };
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript
  root.render(<App {...dispatch} />);
}

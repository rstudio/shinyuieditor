import type { BackendMessagePassers } from "backendCommunication/useBackendMessageCallbacks";
import { createRoot } from "react-dom/client";

import { App } from "./App";

export function runSUE({
  container,
  backendDispatch: { sendMsg, incomingMsgs },
  showMessages,
}: {
  container: HTMLElement | null;
  backendDispatch: BackendMessagePassers;
  showMessages: boolean;
}) {
  const dispatch: BackendMessagePassers = showMessages
    ? {
        sendMsg,
        incomingMsgs: {
          subscribe: (on, callback) => {
            // eslint-disable-next-line no-console
            console.log(`backendMsgs.subscribe("${on}", ...)`);
            incomingMsgs.subscribe(on, callback);
          },
        },
      }
    : {
        sendMsg,
        incomingMsgs: incomingMsgs,
      };
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript
  root.render(<App {...dispatch} />);
}

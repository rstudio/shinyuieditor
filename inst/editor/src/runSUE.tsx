import type { BackendConnection } from "communication-types";
import { createRoot } from "react-dom/client";

import { App } from "./App";

export function runSUE({
  container,
  backendDispatch: { sendMsg, incomingMsgs, mode },
  showMessages,
}: {
  container: HTMLElement | null;
  backendDispatch: BackendConnection;
  showMessages: boolean;
}) {
  const dispatch: BackendConnection = showMessages
    ? {
        sendMsg,
        incomingMsgs: {
          subscribe: (on, callback) => {
            // eslint-disable-next-line no-console
            console.log(`backendMsgs.subscribe("${on}", ...)`);
            return incomingMsgs.subscribe(on, callback);
          },
        },
        mode,
      }
    : {
        sendMsg,
        incomingMsgs,
        mode,
      };
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript
  root.render(<App {...dispatch} />);
}

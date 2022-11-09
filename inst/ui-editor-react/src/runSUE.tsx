import { makeMessageDispatcher } from "backendCommunication/messageDispatcher";
import type { BackendMessageSender } from "backendCommunication/messages";
import { createRoot } from "react-dom/client";

import { App } from "./App";

export function runSUE({
  container,
  onMsg,
}: {
  container: HTMLElement | null;
  onMsg: BackendMessageSender;
}) {
  const backendMessageDispatch = makeMessageDispatcher();
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript
  root.render(
    <App
      sendMsg={onMsg}
      backendMsgs={{
        subscribe: backendMessageDispatch.subscribe,
      }}
    />
  );

  return backendMessageDispatch.dispatch;
}

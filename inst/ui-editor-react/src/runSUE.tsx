import { makeMessageDispatcher } from "backendCommunication/messageDispatcher";
import type { BackendMessagePassers } from "backendCommunication/useBackendMessageCallbacks";
import { createRoot } from "react-dom/client";

import { App } from "./App";

export function runSUE({
  container,
  backendDispatch,
}: {
  container: HTMLElement | null;
  backendDispatch: BackendMessagePassers;
}) {
  const backendMessageDispatch = makeMessageDispatcher();
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript
  root.render(<App {...backendDispatch} />);

  return backendMessageDispatch.dispatch;
}

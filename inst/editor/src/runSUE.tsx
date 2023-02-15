import type { BackendConnection } from "communication-types";
import { createRoot } from "react-dom/client";

import { SUE } from "./SUE";

export function runSUE({
  container,
  showMessages,
  backendDispatch,
}: {
  container: HTMLElement | null;
  backendDispatch: BackendConnection;
  showMessages: boolean;
}) {
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript
  root.render(
    <SUE backendDispatch={backendDispatch} showMessages={showMessages} />
  );
}

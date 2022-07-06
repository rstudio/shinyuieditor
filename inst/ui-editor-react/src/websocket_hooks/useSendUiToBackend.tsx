import * as React from "react";

import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { initialUiTree } from "state/uiTree";
import {
  sendWsMessage,
  useWebsocketBackend,
} from "websocket_hooks/useConnectToWebsocket";

export function useSendUiToBackend(currentUiTree: ShinyUiNode) {
  const { status, ws } = useWebsocketBackend();

  React.useEffect(() => {
    if (currentUiTree === initialUiTree) return;
    if (status !== "connected") return;

    sendWsMessage(ws, "UI-DUMP", currentUiTree);
  }, [currentUiTree, status, ws]);
}

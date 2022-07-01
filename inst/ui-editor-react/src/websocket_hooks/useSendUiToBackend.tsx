import * as React from "react";

import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import debounce from "just-debounce-it";
import { initialUiTree } from "state/uiTree";
import {
  sendWsMessage,
  useWebsocketBackend,
} from "websocket_hooks/useConnectToWebsocket";

export function useSendUiToBackend(currentUiTree: ShinyUiNode) {
  const wsStatus = useWebsocketBackend();

  const sendWsMessageRef = React.useRef<(uiTree: ShinyUiNode) => void>((msg) =>
    console.warn("No websocket connection to send message to, sorry!")
  );

  React.useEffect(() => {
    if (wsStatus.status !== "connected") return;

    sendWsMessageRef.current = debounce(
      (tree: ShinyUiNode) => sendWsMessage(wsStatus.ws, "UI-DUMP", tree),
      500
    );
  }, [wsStatus]);

  React.useEffect(() => {
    if (currentUiTree === initialUiTree) return;
    sendWsMessageRef.current(currentUiTree);
  }, [currentUiTree]);
}

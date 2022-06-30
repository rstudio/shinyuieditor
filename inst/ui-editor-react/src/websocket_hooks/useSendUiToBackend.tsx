import * as React from "react";

import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import debounce from "just-debounce-it";
import { initialUiTree } from "state/uiTree";
import type { WebsocketCallbacks } from "websocket_hooks/useConnectToWebsocket";
import { useWebsocketConnection } from "websocket_hooks/useConnectToWebsocket";

export function useSendUiToBackend(currentUiTree: ShinyUiNode) {
  const sendWsMessage = React.useRef<(uiTree: ShinyUiNode) => void>((msg) =>
    console.warn("No websocket connection to send message to, sorry!")
  );

  const websocketStatusListeners: WebsocketCallbacks = React.useMemo(
    () => ({
      onConnected: (sendMessage) => {
        sendWsMessage.current = debounce(
          (tree: ShinyUiNode) => sendMessage("UI-DUMP", tree),
          500
        );
      },
    }),
    []
  );

  useWebsocketConnection(websocketStatusListeners);

  React.useEffect(() => {
    if (currentUiTree === initialUiTree) return;
    sendWsMessage.current(currentUiTree);
  }, [currentUiTree]);
}

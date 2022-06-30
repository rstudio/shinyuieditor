import * as React from "react";

import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import type {
  WebsocketCallbacks,
  WebsocketMessage,
} from "websocket_hooks/useConnectToWebsocket";
import { useWebsocketConnection } from "websocket_hooks/useConnectToWebsocket";

export function useGetUiFromBackend() {
  const [connectionStatus, setConnectionStatus] =
    React.useState<BackendConnection>({ status: "loading", uiTree: undefined });

  const websocketEventListeners: WebsocketCallbacks = React.useMemo(
    () => ({
      onConnected: (ws) => ws.send("INITIAL-LOAD-DATA"),
      onFailedToOpen: () =>
        setConnectionStatus({ status: "no-backend", uiTree: undefined }),
    }),
    []
  );

  const messageListeners = React.useCallback((msg: WebsocketMessage) => {
    const { payload } = msg;
    if (typeof payload === "string") return;

    switch (msg.msg) {
      case "INITIAL-DATA":
        console.log("Initial data from websocket!", payload);

        setConnectionStatus({
          status: "connected",
          uiTree: payload as ShinyUiNode,
        });
        break;
    }
  }, []);

  useWebsocketConnection(websocketEventListeners, messageListeners);

  return connectionStatus;
}
type BackendConnection =
  | { status: "loading"; uiTree: undefined }
  | { status: "no-backend"; uiTree: undefined }
  | { status: "connected"; uiTree: ShinyUiNode };

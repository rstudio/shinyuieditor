import * as React from "react";

import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import type { WebsocketMessage } from "websocket_hooks/useConnectToWebsocket";
import {
  listenForWsMessages,
  sendWsMessage,
  useWebsocketBackend,
} from "websocket_hooks/useConnectToWebsocket";

type BackendConnection =
  | { status: "loading"; uiTree: undefined }
  | { status: "no-backend"; uiTree: undefined }
  | { status: "connected"; uiTree: ShinyUiNode };

export function useGetUiFromBackend() {
  const wsStatus = useWebsocketBackend();

  const [connectionStatus, setConnectionStatus] =
    React.useState<BackendConnection>({ status: "loading", uiTree: undefined });

  React.useEffect(() => {
    if (wsStatus.status === "connected") {
      sendWsMessage(wsStatus.ws, "INITIAL-LOAD-DATA");
      listenForWsMessages(
        wsStatus.ws,
        ({ type, payload }: WebsocketMessage) => {
          if (type !== "INITIAL-DATA") return;

          setConnectionStatus({
            status: "connected",
            uiTree: payload as ShinyUiNode,
          });
        }
      );
    }
    if (wsStatus.status === "failed-to-open") {
      setConnectionStatus({ status: "no-backend", uiTree: undefined });
    }
  }, [wsStatus]);

  return connectionStatus;
}

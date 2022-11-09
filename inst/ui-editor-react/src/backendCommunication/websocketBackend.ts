import type { OutgoingPreviewAppMsg } from "components/AppPreview/useCommunicateWithBackend";
import { buildWebsocketPathFromDomain } from "websocket_hooks/buildWebsocketPath";
import { sendWsMessage } from "websocket_hooks/sendWsMessage";
import type { BackendMessage } from "websocket_hooks/useConnectToWebsocket";
import { listenForWsMessages } from "websocket_hooks/useConnectToWebsocket";
import type { OutgoingStateMsg } from "websocket_hooks/useSyncUiWithBackend";

import type { MessageDispatcher } from "./messageDispatcher";
import type { MessageFromBackendUnion } from "./messages";
import type { BackendMessagePassers } from "./useBackendMessageCallbacks";

export function setupWebsocketBackend({
  onClose,
  messageDispatch,
  showMessages,
}: {
  onClose: () => void;
  messageDispatch: MessageDispatcher;
  showMessages: boolean;
}) {
  let connectedToWebsocket = false;

  return new Promise<BackendMessagePassers | "NO-WS-CONNECTION">((resolve) => {
    try {
      if (!document.location.host) throw new Error("Not on a served site!");

      const websocket_path = buildWebsocketPathFromDomain("localhost:8888");

      const ws = new WebSocket(websocket_path);

      const messagePassingMethods: BackendMessagePassers = {
        sendMsg: (msg) => {
          sendWsMessage(ws, msg as OutgoingStateMsg | OutgoingPreviewAppMsg);
        },
        backendMsgs: { subscribe: messageDispatch.subscribe },
      };

      ws.onerror = (e) => {
        resolve("NO-WS-CONNECTION");
      };

      ws.onopen = (event) => {
        listenForWsMessages(ws, (msg: BackendMessage) => {
          if (showMessages) {
            // eslint-disable-next-line no-console
            console.log("WS backend msg:", msg);
          }
          messageDispatch.dispatch(msg as MessageFromBackendUnion);
        });
        resolve(messagePassingMethods);
        connectedToWebsocket = true;
      };

      ws.onclose = (event) => {
        if (connectedToWebsocket) {
          onClose();
        } else {
          resolve("NO-WS-CONNECTION");
        }
      };
    } catch (e) {
      resolve("NO-WS-CONNECTION");
    }
  });
}

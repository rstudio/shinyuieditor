import React from "react";

import { useSetTree } from "state/useSetTree";
import { sendWsMessage } from "websocket_hooks/sendWsMessage";
import { useWebsocketBackend } from "websocket_hooks/useConnectToWebsocket";

import type { TemplateSelection } from "./filterTemplates";

export function useRequestTemplate() {
  const { ws } = useWebsocketBackend();
  const setTree = useSetTree();

  const requestTemplate = React.useCallback(
    (template: TemplateSelection) => {
      if (!ws) {
        // Running without connection to websocket, setting template directly
        setTree(template.uiTree);
        return;
      }
      // Sending a request for a template to backend
      sendWsMessage(ws, {
        path: "TEMPLATE-SELECTION",
        payload: template,
      });
    },
    [setTree, ws]
  );

  return requestTemplate;
}

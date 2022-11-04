import * as React from "react";

import type { TemplateSelection } from "components/TemplatePreviews/filterTemplates";
import { useSelector } from "react-redux";
import { isShinyUiNode } from "Shiny-Ui-Elements/isShinyUiNode";
import type {
  ShinyUiNode,
  ShinyUiRootNode,
} from "Shiny-Ui-Elements/uiNodeTypes";
import type { RootState } from "state/store";
import {
  sendWsMessage,
  sendWsMessageDebounced,
} from "websocket_hooks/sendWsMessage";
import type { WebsocketMessage } from "websocket_hooks/useConnectToWebsocket";
import {
  listenForWsMessages,
  useWebsocketBackend,
} from "websocket_hooks/useConnectToWebsocket";

import { useSetTree } from "../state/useSetTree";

import { getClientsideOnlyTree } from "./getClientsideOnlyTree";

type BackendConnectionStatus = "loading" | "no-backend" | "connected";

export type OutgoingStateMsg =
  | {
      path: "READY-FOR-STATE";
    }
  | {
      path: "STATE-UPDATE";
      payload: ShinyUiNode;
    }
  | {
      path: "TEMPLATE-SELECTOR-REQUEST";
    }
  | {
      path: "TEMPLATE-SELECTION";
      payload: TemplateSelection;
    };

type IncomingStateMsg = {
  path: "INITIAL-DATA";
  payload: ShinyUiRootNode;
};

type IncomingErrorMsg = {
  path: "PARSING-ERROR";
  payload: string;
};

type IncomingMsg = IncomingStateMsg | IncomingErrorMsg;

function isIncomingStateMsg(x: WebsocketMessage): x is IncomingMsg {
  return ["INITIAL-DATA", "PARSING-ERROR"].includes(x.path);
}

export function useSyncUiWithBackend() {
  const tree = useSelector((state: RootState) => state.uiTree);
  const setTree = useSetTree();

  const { status, ws } = useWebsocketBackend();

  const [errorMsg, setErrorMsg] = React.useState<null | string>(null);

  const [connectionStatus, setConnectionStatus] =
    React.useState<BackendConnectionStatus>("loading");

  const lastRecievedRef = React.useRef<ShinyUiRootNode | null>(null);
  const currentUiTree = useSelector((state: RootState) => state.uiTree);

  React.useEffect(() => {
    if (status === "connected") {
      listenForWsMessages(ws, (msg: WebsocketMessage) => {
        if (!isIncomingStateMsg(msg)) return;

        if (msg.path === "INITIAL-DATA") {
          lastRecievedRef.current = msg.payload;
          setTree(msg.payload);
          setConnectionStatus("connected");
        }
        if (msg.path === "PARSING-ERROR") {
          setErrorMsg(msg.payload);
        }
      });

      // Let the backend know the react app is ready for state to be provided
      sendWsMessage(ws, { path: "READY-FOR-STATE" });
    }
    if (status === "failed-to-open") {
      // Give the backup/static mode ui tree in the case of no backend connection
      setConnectionStatus("no-backend");

      getClientsideOnlyTree()
        .then(setTree)
        .catch((e) => {
          throw new Error("Failed to get clientside tree with error", e);
        });
    }
  }, [setTree, status, ws]);

  React.useEffect(() => {
    if (
      currentUiTree === "LOADING_STATE" ||
      currentUiTree === lastRecievedRef.current
    ) {
      // Avoiding unnecesary message to backend when the state hasn't changed
      // from the one sent to it
      return;
    }
    if (status !== "connected") return;

    if (currentUiTree === "TEMPLATE_CHOOSER") {
      // The user has gone backward to the template selector, so let the backend
      // know it should clear the existing app
      sendWsMessage(ws, { path: "TEMPLATE-SELECTOR-REQUEST" });
    }
    if (isShinyUiNode(currentUiTree)) {
      sendWsMessageDebounced(ws, {
        path: "STATE-UPDATE",
        payload: currentUiTree,
      });
    }
  }, [currentUiTree, status, ws]);

  return { status: connectionStatus, tree, setTree, errorMsg };
}

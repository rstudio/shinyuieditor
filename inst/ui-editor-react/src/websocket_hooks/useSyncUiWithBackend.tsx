import * as React from "react";

import { PREBUILT_TREE } from "env_variables";
import { useDispatch, useSelector } from "react-redux";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";
import type { RootState } from "state/store";
import { initialUiTree, INIT_STATE } from "state/uiTree";
import { sendWsMessage } from "websocket_hooks/sendWsMessage";
import type { WebsocketMessage } from "websocket_hooks/useConnectToWebsocket";
import {
  listenForWsMessages,
  useWebsocketBackend,
} from "websocket_hooks/useConnectToWebsocket";

import { backupUiTree } from "./backupUiTree";

type BackendConnectionStatus = "loading" | "no-backend" | "connected";

export type OutgoingStateMsg =
  | {
      path: "READY-FOR-STATE";
    }
  | {
      path: "STATE-UPDATE";
      payload: ShinyUiNode;
    };

type IncomingStateMsg = {
  path: "INITIAL-DATA";
  payload: ShinyUiNode;
};

function isIncomingStateMsg(x: WebsocketMessage): x is IncomingStateMsg {
  return ["INITIAL-DATA"].includes(x.path);
}

function useCurrentUiTree() {
  const dispatch = useDispatch();
  const tree = useSelector((state: RootState) => state.uiTree);

  const setTree = React.useCallback(
    (newTree: ShinyUiNode) => {
      dispatch(INIT_STATE({ initialState: newTree }));
    },
    [dispatch]
  );

  return { tree, setTree };
}

export function useSyncUiWithBackend() {
  const { tree, setTree } = useCurrentUiTree();

  const { status, ws } = useWebsocketBackend();

  const [connectionStatus, setConnectionStatus] =
    React.useState<BackendConnectionStatus>("loading");

  const lastRecievedRef = React.useRef<ShinyUiNode | null>(null);
  const currentUiTree = useSelector((state: RootState) => state.uiTree);

  React.useEffect(() => {
    if (status === "connected") {
      listenForWsMessages(ws, (msg: WebsocketMessage) => {
        if (!isIncomingStateMsg(msg)) return;

        lastRecievedRef.current = msg.payload;
        setTree(msg.payload);
        setConnectionStatus("connected");
      });

      // Let the backend know that the react app is ready for state to be
      // provided
      sendWsMessage(ws, { path: "READY-FOR-STATE" });
    }
    if (status === "failed-to-open") {
      // Give the backup/static mode ui tree in the case of no backend connection
      setConnectionStatus("no-backend");

      // For the demo versions of the app we want there to be a predefined tree
      // instead of an empty grid
      setTree(backupUiTree);
    }
  }, [setTree, status, ws]);

  React.useEffect(() => {
    if (
      currentUiTree === initialUiTree ||
      currentUiTree === lastRecievedRef.current
    ) {
      // Avoiding unnecesary message to backend when the state hasn't changed from the one sent to it
      return;
    }
    if (status !== "connected") return;

    sendWsMessage(ws, { path: "STATE-UPDATE", payload: currentUiTree });
  }, [currentUiTree, status, ws]);

  return { status: connectionStatus, tree };
}

// Super basic tree for when running e2e tests
const testingUiTree: ShinyUiNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    areas: [
      [".", "."],
      [".", "."],
    ],
    row_sizes: ["1fr", "1fr"],
    col_sizes: ["1fr", "1fr"],
    gap_size: "1rem",
  },
  uiChildren: [],
};

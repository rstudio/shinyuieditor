import * as React from "react";

import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "state/store";
import { initialUiTree, INIT_STATE } from "state/uiTree";
import type { WebsocketMessage } from "websocket_hooks/useConnectToWebsocket";
import {
  listenForWsMessages,
  sendWsMessage,
  useWebsocketBackend,
} from "websocket_hooks/useConnectToWebsocket";

type BackendConnectionStatus = "loading" | "no-backend" | "connected";

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
      listenForWsMessages(ws, ({ type, payload }: WebsocketMessage) => {
        if (type !== "INITIAL-DATA") return;

        const initialState = payload as ShinyUiNode;

        lastRecievedRef.current = initialState;
        setTree(initialState);
        setConnectionStatus("connected");
      });
    }
    if (status === "failed-to-open") {
      // Give the backup/static mode ui tree in the case of no backend connection
      setConnectionStatus("no-backend");
      setTree(backupUiTree);
      console.warn(
        "Error retreiving app template from server. Running in static mode"
      );
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

    sendWsMessage(ws, "UI-DUMP", currentUiTree);
  }, [currentUiTree, status, ws]);

  return { status: connectionStatus, tree };
}

// Ui Tree used if there's no backend connection
const backupUiTree: ShinyUiNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    areas: [
      ["header", "header"],
      ["sidebar", "plot"],
      ["sidebar", "plot"],
    ],
    row_sizes: ["100px", "1fr", "1fr"],
    col_sizes: ["250px", "1fr"],
    gap_size: "1rem",
  },
  uiChildren: [
    {
      uiName: "gridlayout::grid_card_text",
      uiArguments: {
        area: "header",
        content: "My App",
        alignment: "start",
        is_title: true,
      },
    },
    {
      uiName: "gridlayout::grid_card",
      uiArguments: {
        area: "sidebar",
      },
      uiChildren: [
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider",
            label: "Slider",
            min: 2,
            max: 11,
            value: 7,
          },
        },
        {
          uiName: "shiny::numericInput",
          uiArguments: {
            inputId: "myNumericInput",
            label: "Numeric Input",
            min: 2,
            max: 11,
            value: 7,
            width: "100%",
          },
        },
      ],
    },
    {
      uiName: "gridlayout::grid_card_plot",
      uiArguments: {
        area: "plot",
      },
    },
  ],
};

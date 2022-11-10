import * as React from "react";

import { useBackendCallbacks } from "backendCommunication/useBackendMessageCallbacks";
import debounce from "just-debounce-it";
import { useSelector } from "react-redux";
import type { ShinyUiRootNode } from "Shiny-Ui-Elements/uiNodeTypes";
import type { RootState } from "state/store";

import { useSetTree } from "../state/useSetTree";

export function useSyncUiWithBackend() {
  const { sendMsg, incomingMsgs: backendMsgs } = useBackendCallbacks();

  const tree = useSelector((state: RootState) => state.uiTree);
  const setTree = useSetTree();
  const currentUiTree = useSelector((state: RootState) => state.uiTree);

  const [errorMsg, setErrorMsg] = React.useState<null | string>(null);
  const lastRecievedRef = React.useRef<ShinyUiRootNode | null>(null);

  // Subscribe to messages from the backend
  React.useEffect(() => {
    backendMsgs.subscribe("UPDATED-TREE", (ui_tree) => {
      setTree(ui_tree);
      lastRecievedRef.current = ui_tree;
    });

    backendMsgs.subscribe("PARSING-ERROR", setErrorMsg);

    // Make sure to do this after subscriptions otherwise the response may be
    // received before subscribers are setup to receive
    sendMsg({ path: "READY-FOR-STATE" });
  }, [backendMsgs, sendMsg, setTree]);

  const debouncedSendMsg = React.useMemo(
    () => debounce(sendMsg, 500, true),
    [sendMsg]
  );

  // Keep the client-side state insync with the backend by sending update
  // messages
  React.useEffect(() => {
    if (
      currentUiTree === "LOADING_STATE" ||
      currentUiTree === lastRecievedRef.current
    ) {
      // Avoiding unnecesary message to backend when the state hasn't changed
      // from the one sent to it
      return;
    }

    if (currentUiTree === "TEMPLATE_CHOOSER") {
      // The user has gone backward to the template selector, so let the backend
      // know it should clear the existing app
      sendMsg({ path: "TEMPLATE-SELECTOR-REQUEST" });
      return;
    }

    debouncedSendMsg({
      path: "UPDATED-TREE",
      payload: currentUiTree,
    });
  }, [currentUiTree, debouncedSendMsg, sendMsg]);

  return { tree, setTree, errorMsg };
}
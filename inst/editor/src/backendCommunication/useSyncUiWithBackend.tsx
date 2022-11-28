import * as React from "react";

import debounce from "just-debounce-it";
import { useSelector } from "react-redux";

import type { ShinyUiRootNode } from "../Shiny-Ui-Elements/uiNodeTypes";
import type { RootState } from "../state/store";
import { useSetTree } from "../state/useSetTree";

import { useBackendCallbacks } from "./useBackendMessageCallbacks";

export function useSyncUiWithBackend() {
  const { sendMsg, incomingMsgs: backendMsgs } = useBackendCallbacks();

  const tree = useSelector((state: RootState) => state.uiTree);
  const setTree = useSetTree();
  const currentUiTree = useSelector((state: RootState) => state.uiTree);

  const [errorMsg, setErrorMsg] = React.useState<null | string>(null);
  const lastRecievedRef = React.useRef<ShinyUiRootNode | null>(null);

  // Subscribe to messages from the backend
  React.useEffect(() => {
    const updatedTreeSubscription = backendMsgs.subscribe(
      "UPDATED-TREE",
      (ui_tree: ShinyUiRootNode) => {
        setTree(ui_tree as ShinyUiRootNode);
        lastRecievedRef.current = ui_tree as ShinyUiRootNode;
      }
    );

    const templateChooserSubscription = backendMsgs.subscribe(
      "TEMPLATE-CHOOSER",
      () => {
        setTree("TEMPLATE_CHOOSER");
        lastRecievedRef.current = "TEMPLATE_CHOOSER";
      }
    );

    const parsingErrorSubscription = backendMsgs.subscribe(
      "BACKEND-ERROR",
      setErrorMsg
    );

    // Make sure to do this after subscriptions otherwise the response may be
    // received before subscribers are setup to receive
    sendMsg({ path: "READY-FOR-STATE" });

    return () => {
      updatedTreeSubscription.unsubscribe();
      templateChooserSubscription.unsubscribe();
      parsingErrorSubscription.unsubscribe();
    };
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

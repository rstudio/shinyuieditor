import * as React from "react";

import debounce from "just-debounce-it";
import { useDispatch, useSelector } from "react-redux";

import type { ShinyUiNode } from "../Shiny-Ui-Elements/uiNodeTypes";
import type { RootState } from "../state/store";
import type { MainStateOption } from "../state/uiTree";
import { SET_UI_TREE, SHOW_TEMPLATE_CHOOSER } from "../state/uiTree";

import { useBackendCallbacks } from "./useBackendMessageCallbacks";

export function useSyncUiWithBackend() {
  const { sendMsg, incomingMsgs: backendMsgs } = useBackendCallbacks();

  const tree = useSelector((state: RootState) => state.uiTree);
  const dispatch = useDispatch();

  const currentUiTree = useSelector((state: RootState) => state.uiTree);

  const [errorMsg, setErrorMsg] = React.useState<null | string>(null);
  const lastRecievedRef = React.useRef<MainStateOption | null>(null);

  // Subscribe to messages from the backend
  React.useEffect(() => {
    const updatedTreeSubscription = backendMsgs.subscribe(
      "UPDATED-TREE",
      (ui_tree) => {
        dispatch(SET_UI_TREE({ initialState: ui_tree }));
        lastRecievedRef.current = ui_tree;
      }
    );

    const templateChooserSubscription = backendMsgs.subscribe(
      "TEMPLATE_CHOOSER",
      (mode) => {
        dispatch(SHOW_TEMPLATE_CHOOSER());
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
  }, [backendMsgs, dispatch, sendMsg]);

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
      sendMsg({ path: "ENTERED-TEMPLATE-SELECTOR" });
      return;
    }

    debouncedSendMsg({
      path: "UPDATED-TREE",
      payload: currentUiTree,
    });
  }, [currentUiTree, debouncedSendMsg, sendMsg]);

  return { tree, errorMsg };
}

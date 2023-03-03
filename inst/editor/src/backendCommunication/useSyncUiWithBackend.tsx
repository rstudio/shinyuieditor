import * as React from "react";

import type { MessageToClientByPath } from "communication-types";
import debounce from "just-debounce-it";
import { useDispatch } from "react-redux";

import { generate_full_app_script } from "../ast_parsing/generate_full_app_script";
import { raw_app_info_to_full } from "../ast_parsing/raw_app_info_to_full";
import { useDeleteNode } from "../components/DeleteNodeButton/useDeleteNode";
import type { MainStateOption } from "../state/app_info";
import {
  SET_APP_INFO,
  SHOW_TEMPLATE_CHOOSER,
  useCurrentAppInfo,
} from "../state/app_info";
import { getNamedPath } from "../state/getNamedPath";
import { useCurrentSelection } from "../state/selectedPath";
import { useUndoRedo } from "../state-logic/useUndoRedo";
import { useKeyboardShortcuts } from "../utils/hooks/useKeyboardShortcuts";

import { useBackendConnection } from "./useBackendMessageCallbacks";

export function useSyncUiWithBackend() {
  const { sendMsg, incomingMsgs: backendMsgs, mode } = useBackendConnection();
  const state = useCurrentAppInfo();
  const currentSelection = useCurrentSelection();
  const dispatch = useDispatch();

  const history = useUndoRedo(state);

  const deleteNode = useDeleteNode(currentSelection);

  const [errorInfo, setErrorInfo] = React.useState<
    null | MessageToClientByPath["BACKEND-ERROR"]
  >(null);
  const lastRecievedRef = React.useRef<MainStateOption | null>(null);

  useKeyboardShortcuts([
    {
      key: "z",
      withCmdCtrl: true,
      withShift: false,
      onPress: history.goBackward,
    },
    {
      key: "z",
      withCmdCtrl: true,
      withShift: true,
      onPress: history.goForward,
    },
    {
      key: "Backspace",
      onPress: deleteNode,
      withCmdCtrl: false,
      withShift: false,
    },
  ]);

  // Subscribe to messages from the backend
  React.useEffect(() => {
    const updatedAppSubscription = backendMsgs.subscribe("APP-INFO", (info) => {
      const full_info = "ui_tree" in info ? info : raw_app_info_to_full(info);

      dispatch(SET_APP_INFO(full_info));
      lastRecievedRef.current = { mode: "MAIN", ...full_info };
    });

    const templateChooserSubscription = backendMsgs.subscribe(
      "TEMPLATE_CHOOSER",
      (outputChoices) => {
        dispatch(SHOW_TEMPLATE_CHOOSER({ outputChoices }));
        lastRecievedRef.current = {
          mode: "TEMPLATE_CHOOSER",
          options: { outputChoices },
        };
      }
    );

    const backendErrorSubscription = backendMsgs.subscribe(
      "BACKEND-ERROR",
      setErrorInfo
    );

    // Make sure to do this after subscriptions otherwise the response may be
    // received before subscribers are setup to receive
    sendMsg({ path: "READY-FOR-STATE" });

    return () => {
      updatedAppSubscription.unsubscribe();
      templateChooserSubscription.unsubscribe();
      backendErrorSubscription.unsubscribe();
    };
  }, [backendMsgs, dispatch, sendMsg]);

  const debouncedSendMsg = React.useMemo(
    () => debounce(sendMsg, 500, true),
    [sendMsg]
  );

  // Send named path to the backend if we're in VSCODE mode
  React.useEffect(() => {
    if (mode !== "VSCODE" || !currentSelection || state.mode !== "MAIN") return;
    const namedPath = getNamedPath(currentSelection, state.ui_tree);
    sendMsg({ path: "NODE-SELECTION", payload: namedPath });
  }, [currentSelection, mode, sendMsg, state]);

  // Keep the client-side state insync with the backend by sending update
  // messages
  React.useEffect(() => {
    if (state.mode === "LOADING" || state === lastRecievedRef.current) {
      // Avoiding unnecesary message to backend when the state hasn't changed
      // from the one sent to it
      return;
    }

    if (state.mode === "TEMPLATE_CHOOSER") {
      // The user has gone backward to the template selector, so let the backend
      // know it should clear the existing app
      sendMsg({ path: "ENTERED-TEMPLATE-SELECTOR" });
      return;
    }

    debouncedSendMsg({
      path: "UPDATED-APP",
      payload: generate_full_app_script(state, { include_info: false }),
    });
  }, [state, debouncedSendMsg, sendMsg]);

  return {
    state,
    errorInfo,
    history,
  };
}

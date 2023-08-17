import * as React from "react";

import debounce from "just-debounce-it";
import { useDispatch } from "react-redux";
import { generateFullAppScript } from "ui-node-definitions/src/code_generation/generate_full_app_script";

import { useTsParser } from "../EditorContainer/TSParserProvider";
import { useUndoRedo } from "../HistoryNavigation/useUndoRedo";
import {
  SET_APP_INFO,
  SET_ERROR,
  SHOW_TEMPLATE_CHOOSER,
  useCurrentAppInfo,
} from "../state/app_info";
import { useLanguageMode } from "../state/languageMode";
import { SET_META_DATA } from "../state/metaData";
import { useCurrentSelection } from "../state/selectedPath";
import { useDeleteNode } from "../state/useDeleteNode";
import { useKeyboardShortcuts } from "../utils/useKeyboardShortcuts";

import { useBackendConnection } from "./useBackendMessageCallbacks";

export function useSyncUiWithBackend() {
  const { sendMsg, incomingMsgs: backendMsgs } = useBackendConnection();
  const state = useCurrentAppInfo();
  const currentSelection = useCurrentSelection();
  const language = useLanguageMode();
  const dispatch = useDispatch();
  const parseApp = useTsParser();

  const history = useUndoRedo(state);

  const deleteNode = useDeleteNode(currentSelection);

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
    const subscribe = backendMsgs.subscribe;
    const subscriptions = [
      subscribe("CHECKIN", (info) => {
        dispatch(SET_META_DATA(info));
      }),
      subscribe("APP-INFO", (info) => dispatch(SET_APP_INFO(info))),
      subscribe("APP-SCRIPT-TEXT", (scripts) => {
        if (!parseApp) {
          throw new Error(
            "No parser initialized. Checkin handshake must not have happened."
          );
        }
        parseApp(scripts).then((info) => {
          dispatch(SET_APP_INFO(info));
        });
      }),
      subscribe("TEMPLATE_CHOOSER", (outputChoices) =>
        dispatch(SHOW_TEMPLATE_CHOOSER({ outputChoices }))
      ),
      subscribe("BACKEND-ERROR", (error_info) =>
        dispatch(SET_ERROR(error_info))
      ),
    ];

    // Make sure to do this after subscriptions otherwise the response may be
    // received before subscribers are setup to receive
    sendMsg({ path: "READY-FOR-STATE" });

    return () => {
      subscriptions.forEach((s) => s.unsubscribe());
    };
  }, [backendMsgs.subscribe, dispatch, parseApp, sendMsg]);

  const debouncedSendMsg = React.useMemo(
    () => debounce(sendMsg, 500, true),
    [sendMsg]
  );

  // Keep the client-side state insync with the backend by sending update
  // messages
  React.useEffect(() => {
    if (state.mode === "LOADING" || state.mode === "ERROR") {
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

    const updatedAppScripts = generateFullAppScript(state, {
      include_info: false,
      language,
    });

    debouncedSendMsg({
      path: "UPDATED-APP",
      payload: updatedAppScripts,
    });
  }, [debouncedSendMsg, language, sendMsg, state]);

  return {
    state,
    history,
  };
}

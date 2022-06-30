import React from "react";

import { useSetDisconnectedFromServer } from "state/connectedToServer";
import type { WebsocketMessage } from "useConnectToWebsocket";
import { useWebsocketConnection } from "useConnectToWebsocket";

export type AppLogs = string[];

type WS_MSG =
  | {
      msg: "SHINY_READY";
      payload: string;
    }
  | { msg: "SHINY_LOGS"; payload: string | string[] }
  | { msg: "SHINY_CRASH"; payload: string };

type CommonState = {
  appLogs: AppLogs;
  clearLogs: () => void;
  restartApp: () => void;
  stopApp: () => void;
};

type LoadingState = {
  status: "loading";
  appLoc: null;
  error: null;
};

type SuccessState = {
  status: "finished";
  appLoc: string;
  error: null;
};

type NoPreviewState = {
  status: "no-preview";
  appLoc: null;
};

type CrashState = {
  status: "crashed";
  appLoc: string | null;
  error: string;
};

type CommunicationState = CommonState &
  (LoadingState | SuccessState | NoPreviewState | CrashState);

export function useCommunicateWithWebsocket(): CommunicationState {
  const set_disconnected = useSetDisconnectedFromServer();
  const [appLoc, setAppLoc] = React.useState<string | null>(null);
  const [appLogs, setAppLogs] = React.useState<AppLogs>([]);
  const [noPreview, setNoPreview] = React.useState<boolean>(false);
  const [crashed, setCrashed] = React.useState<string | false>(false);

  const listenForAppStatus = React.useCallback((msg: WebsocketMessage) => {
    const { payload = "" } = msg;

    if (typeof payload !== "string") return;

    switch (msg.msg) {
      case "SHINY_READY":
        setCrashed(false);
        setNoPreview(false);
        setAppLoc(payload);
        break;
      case "SHINY_LOGS":
        setAppLogs(ensureArray(payload));
        break;
      case "SHINY_CRASH":
        setCrashed(payload);
        break;
      default:
        console.warn("Unknown message from websocket. Ignoring", {
          msg,
        });
    }
  }, []);

  const websocketStatusListeners = React.useMemo(
    () => ({
      onConnected: (ws: WebSocket) => {
        ws.send("APP-PREVIEW-CONNECTED");
        setRestartApp(() => () => ws.send("APP-PREVIEW-RESTART"));
        setStopApp(() => () => ws.send("APP-PREVIEW-STOP"));
      },
      onClosed: set_disconnected,
      onFailedToOpen: () => setNoPreview(true),
    }),
    [set_disconnected]
  );

  useWebsocketConnection(websocketStatusListeners, listenForAppStatus);

  const [restartApp, setRestartApp] = React.useState<() => void>(
    () => () => console.log("No app running to reset")
  );
  const [stopApp, setStopApp] = React.useState<() => void>(
    () => () => console.log("No app running to stop")
  );

  const clearLogs = React.useCallback(() => {
    setAppLogs([]);
  }, []);

  const state: CommonState = {
    appLogs,
    clearLogs,
    restartApp,
    stopApp,
  };

  if (noPreview) {
    const error_state: NoPreviewState = {
      status: "no-preview",
      appLoc: null,
    };

    return Object.assign(state, error_state);
  }

  if (crashed) {
    const crash_state: CrashState = {
      status: "crashed",
      error: crashed,
      appLoc: null,
    };

    return Object.assign(state, crash_state);
  }

  if (appLoc) {
    const finished_state: SuccessState = {
      status: "finished",
      appLoc,
      error: null,
    };

    return Object.assign(state, finished_state);
  }

  const loading_state: LoadingState = {
    status: "loading",
    appLoc: null,
    error: null,
  };

  return Object.assign(state, loading_state);
}

function ensureArray<T>(x: T | T[]): T[] {
  if (Array.isArray(x)) return x;

  return [x];
}

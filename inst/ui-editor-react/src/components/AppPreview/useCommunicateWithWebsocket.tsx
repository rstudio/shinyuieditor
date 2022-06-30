import React from "react";

import { useSetDisconnectedFromServer } from "state/connectedToServer";
import { useConnectToWebsocket } from "useConnectToWebsocket";

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

  const wsConnection = useConnectToWebsocket();

  const [restartApp, setRestartApp] = React.useState<() => void>(
    () => () => console.log("No app running to reset")
  );
  const [stopApp, setStopApp] = React.useState<() => void>(
    () => () => console.log("No app running to stop")
  );

  const clearLogs = React.useCallback(() => {
    setAppLogs([]);
  }, []);

  const listenForAppStatus = React.useCallback((event: MessageEvent<any>) => {
    const msg_data = JSON.parse(event.data) as WS_MSG;

    switch (msg_data.msg) {
      case "SHINY_READY":
        setCrashed(false);
        setNoPreview(false);
        setAppLoc(msg_data.payload);
        break;
      case "SHINY_LOGS":
        setAppLogs(ensureArray(msg_data.payload));
        break;
      case "SHINY_CRASH":
        setCrashed(msg_data.payload);
        break;
      default:
        console.warn("Unknown message from websocket. Ignoring", {
          msg_data,
        });
    }
  }, []);

  React.useEffect(() => {
    console.log(wsConnection);
    switch (wsConnection.status) {
      case "connected": {
        wsConnection.ws.send("APP-PREVIEW-CONNECTED");
        setRestartApp(() => () => wsConnection.ws.send("APP-PREVIEW-RESTART"));
        setStopApp(() => () => wsConnection.ws.send("APP-PREVIEW-STOP"));
        wsConnection.ws.addEventListener("message", listenForAppStatus);
        break;
      }
      case "closed":
        set_disconnected();
        break;
      case "failed-to-open":
        setNoPreview(true);
        break;
    }
  }, [listenForAppStatus, set_disconnected, wsConnection]);

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

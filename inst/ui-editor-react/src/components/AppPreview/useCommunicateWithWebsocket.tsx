import React from "react";

import { useSetDisconnectedFromServer } from "state/connectedToServer";
import type { WebsocketMessage } from "websocket_hooks/useConnectToWebsocket";
import {
  listenForWsMessages,
  sendWsMessage,
  useWebsocketBackend,
} from "websocket_hooks/useConnectToWebsocket";

export type AppLogs = string[];

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

type PreviewAppMessage =
  | {
      type: "SHINY_READY" | "SHINY_CRASH";
      payload: string;
    }
  | {
      type: "SHINY_LOGS";
      payload: string[];
    };

function isPreviewAppMessage(x: WebsocketMessage): x is PreviewAppMessage {
  return ["SHINY_READY", "SHINY_CRASH", "SHINY_LOGS"].includes(x.type);
}

export function useCommunicateWithWebsocket(): CommunicationState {
  const set_disconnected = useSetDisconnectedFromServer();
  const [appLoc, setAppLoc] = React.useState<string | null>(null);
  const [appLogs, setAppLogs] = React.useState<AppLogs>([]);
  const [noPreview, setNoPreview] = React.useState<boolean>(false);
  const [crashed, setCrashed] = React.useState<string | false>(false);

  const { status, ws } = useWebsocketBackend();
  React.useEffect(() => {
    if (status === "connected") {
      // const { ws } = wsStatus;

      sendWsMessage(ws, "APP-PREVIEW-CONNECTED");
      setRestartApp(() => () => sendWsMessage(ws, "APP-PREVIEW-RESTART"));
      setStopApp(() => () => sendWsMessage(ws, "APP-PREVIEW-STOP"));

      listenForWsMessages(ws, (msg: WebsocketMessage) => {
        if (!isPreviewAppMessage(msg)) return;

        const { type, payload } = msg;
        switch (type) {
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
      });
    }

    if (status === "closed") {
      set_disconnected();
    }
    if (status === "failed-to-open") {
      setNoPreview(true);
    }
  }, [set_disconnected, status, ws]);

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

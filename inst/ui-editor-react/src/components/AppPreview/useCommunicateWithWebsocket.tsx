import React from "react";

import { useSetDisconnectedFromServer } from "state/connectedToServer";
import { sendWsMessage } from "websocket_hooks/sendWsMessage";
import type { WebsocketMessage } from "websocket_hooks/useConnectToWebsocket";
import {
  listenForWsMessages,
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

export type OutgoingPreviewAppMsg =
  | { path: "APP-PREVIEW-CONNECTED" }
  | { path: "APP-PREVIEW-RESTART" }
  | { path: "APP-PREVIEW-STOP" };

type IncomingPreviewAppMsg =
  | {
      path: "APP-PREVIEW-READY" | "APP-PREVIEW-CRASH";
      payload: string;
    }
  | {
      path: "APP-PREVIEW-LOGS";
      payload: string[];
    };

function isPreviewAppMessage(x: WebsocketMessage): x is IncomingPreviewAppMsg {
  return [
    "APP-PREVIEW-READY",
    "APP-PREVIEW-CRASH",
    "APP-PREVIEW-LOGS",
  ].includes(x.path);
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
      sendWsMessage(ws, { path: "APP-PREVIEW-CONNECTED" });
      setRestartApp(
        () => () => sendWsMessage(ws, { path: "APP-PREVIEW-RESTART" })
      );
      setStopApp(() => () => sendWsMessage(ws, { path: "APP-PREVIEW-STOP" }));

      listenForWsMessages(ws, (msg) => {
        if (!isPreviewAppMessage(msg)) return;

        const { path: type, payload } = msg;
        switch (type) {
          case "APP-PREVIEW-READY":
            setCrashed(false);
            setNoPreview(false);
            setAppLoc(payload);
            break;
          case "APP-PREVIEW-LOGS":
            setAppLogs(ensureArray(payload));
            break;
          case "APP-PREVIEW-CRASH":
            setCrashed(payload);
            break;
          default:
            // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
    () => () => console.warn("No app running to reset")
  );
  const [stopApp, setStopApp] = React.useState<() => void>(
    // eslint-disable-next-line no-console
    () => () => console.warn("No app running to stop")
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

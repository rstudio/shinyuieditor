import React from "react";

import { useSetDisconnectedFromServer } from "state/connectedToServer";

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

type ErrorState = {
  status: "error";
  appLoc: null;
  error: string;
};

type CrashState = {
  status: "crashed";
  appLoc: string | null;
  error: string;
};

type CommunicationState = CommonState &
  (LoadingState | SuccessState | ErrorState | CrashState);

export function useCommunicateWithWebsocket(): CommunicationState {
  const set_disconnected = useSetDisconnectedFromServer();
  const [appLoc, setAppLoc] = React.useState<string | null>(null);
  const [appLogs, setAppLogs] = React.useState<AppLogs>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [crashed, setCrashed] = React.useState<string | false>(false);
  const haveConnectedToWebsocket = React.useRef(false);

  const [restartApp, setRestartApp] = React.useState<() => void>(
    () => () => console.log("No app running to reset")
  );
  const [stopApp, setStopApp] = React.useState<() => void>(
    () => () => console.log("No app running to stop")
  );

  const clearLogs = React.useCallback(() => {
    setAppLogs([]);
  }, []);

  React.useEffect(() => {
    if (!document.location.host) return;

    // If we're using the dev proxy we should just go straight to websocket.
    // Otherwise use the same location as the main app
    const websocket_host =
      process.env.NODE_ENV === "development"
        ? "localhost:8888"
        : window.location.host;

    try {
      const ws = new WebSocket(`ws://${websocket_host}`);

      ws.onerror = (event) => {
        console.error("Failed to connect to websocket", event);
        setError("Failed to connect to shiny app preview");
      };

      ws.onopen = (event) => {
        console.log("Websocket successfully opened with httpuv");
        setRestartApp(() => () => ws.send("RESTART_PREVIEW"));
        setStopApp(() => () => ws.send("STOP_PREVIEW"));
        haveConnectedToWebsocket.current = true;
      };

      ws.onmessage = (event) => {
        const msg_data = JSON.parse(event.data) as WS_MSG;

        switch (msg_data.msg) {
          case "SHINY_READY":
            setCrashed(false);
            setError(null);
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
      };

      ws.onclose = (event) => {
        if (!haveConnectedToWebsocket.current) {
          // Never connected to websocket, so we haven't disconected
          return;
        }
        // Let state know that we've lost connection so we can alert the user
        console.error("Lost connection to httpuv.");
        set_disconnected();
      };

      return () => {
        ws.close();
      };
    } catch {
      console.warn(
        "Failure to initialize websocket at all. Probably on netlify"
      );
      setError("Failed to connect to shiny app preview");
    }
  }, [set_disconnected]);

  const state: CommonState = {
    appLogs,
    clearLogs,
    restartApp,
    stopApp,
  };

  if (error) {
    const error_state: ErrorState = {
      status: "error",
      error,
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

import React from "react";

export type AppLogs = string[];

type WS_MSG =
  | {
      msg: "SHINY_READY";
      payload: string;
    }
  | { msg: "SHINY_LOGS"; payload: string[] }
  | { msg: "SHINY_CRASH"; payload: string };

type CommonState = {
  appLogs: AppLogs;
  clearLogs: () => void;
  restartApp: () => void;
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
  const [appLoc, setAppLoc] = React.useState<string | null>(null);
  const [appLogs, setAppLogs] = React.useState<AppLogs>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [crashed, setCrashed] = React.useState<string | false>(false);

  const [restartApp, setRestartApp] = React.useState<() => void>(() =>
    console.log("No app running to reset")
  );

  const clearLogs = React.useCallback(() => {
    setAppLogs([]);
  }, []);

  React.useEffect(() => {
    if (!document.location.host) return;

    // const websocket_location = `ws://${document.location.host}`;
    const websocket_location = `ws://localhost:8888`;

    console.log("Attempting to connect to websocket at " + websocket_location);
    const ws = new WebSocket(websocket_location);

    ws.onerror = (event) => {
      console.error("Failed to connect to websocket", event);
      setError("Failed to connect to shiny app preview");
    };

    ws.onopen = (event) => {
      console.log("Websocket successfully opened with httpuv");

      setRestartApp(() => () => ws.send("RESTART_PREVIEW"));
      ws.send("Hi from AppPreview");
    };

    ws.onmessage = (event) => {
      const msg_data = JSON.parse(event.data) as WS_MSG;
      console.log("Message from websocket", msg_data);

      switch (msg_data.msg) {
        case "SHINY_READY":
          setCrashed(false);
          setError(null);
          setAppLoc(msg_data.payload);
          break;
        case "SHINY_LOGS":
          setAppLogs(msg_data.payload);
          break;
        case "SHINY_CRASH":
          setCrashed(msg_data.payload);
          break;
        default:
          console.error("Unknown message from websocket. Ignoring", {
            msg_data,
          });
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const state: CommonState = {
    appLogs,
    clearLogs,
    restartApp,
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

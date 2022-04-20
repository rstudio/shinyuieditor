import React from "react";

export type AppLogs = string[];

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
  error: string;
  appLoc: null;
};

export function useCommunicateWithWebsocket(): CommonState &
  (LoadingState | SuccessState | ErrorState) {
  const [appLoc, setAppLoc] = React.useState<string | null>(null);
  const [appLogs, setAppLogs] = React.useState<AppLogs>([]);
  const [error, setError] = React.useState<string | null>(null);

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
          setAppLoc(msg_data.payload);
          break;
        case "SHINY_LOGS":
          setAppLogs(msg_data.payload);
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

  if (error) {
    return {
      status: "error",
      error,
      appLogs,
      clearLogs,
      appLoc: null,
      restartApp,
    };
  }

  if (appLoc) {
    return {
      status: "finished",
      appLoc,
      appLogs,
      clearLogs,
      error: null,
      restartApp,
    };
  }

  return {
    status: "loading",
    appLoc: null,
    appLogs,
    clearLogs,
    error: null,
    restartApp,
  };
}
type WS_MSG =
  | {
      msg: "SHINY_READY";
      payload: string;
    }
  | { msg: "SHINY_LOGS"; payload: string[] };

import React from "react";

import { AiOutlineShrink } from "react-icons/ai";
import { FaExpand } from "react-icons/fa";

import classes from "./AppPreview.module.css";
import Button from "./Inputs/Button";

export default function AppPreview() {
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const { appLoc, appLogs } = useCommunicateWithWebsocket();

  const isLoading = appLoc === null;

  React.useEffect(() => {
    console.log("New logs", appLogs);
  }, [appLogs]);

  if (appLoc === "no-preview") {
    return null;
  }
  return (
    <>
      <h3>App Preview</h3>
      <div className={classes.appViewerHolder}>
        <div
          className={
            classes.container +
            " " +
            (isFullScreen ? classes.fullScreen : classes.previewMode)
          }
        >
          {isLoading ? (
            <h2>Loading app preview...</h2>
          ) : (
            <>
              <Button
                variant="icon"
                className={classes.expandButton}
                title={
                  isFullScreen ? "Shrink app preview" : "Expand app preview"
                }
                onClick={() =>
                  setIsFullScreen((currentlyFullScreen) => !currentlyFullScreen)
                }
              >
                {isFullScreen ? <AiOutlineShrink /> : <FaExpand />}
              </Button>
              <iframe
                className={classes.previewFrame}
                src={appLoc}
                title="Application Preview"
              />
              {/* {error ? (
                <FakeDashboard />
              ) : (
              )} */}
            </>
          )}
        </div>
      </div>
    </>
  );
}

const FakeDashboard = () => {
  return (
    <div className={classes.fakeDashboard + " " + classes.previewFrame}>
      <div className={classes.header}>
        <h1>App preview not available</h1>
      </div>
      <div className={classes.sidebar}></div>
      <div className={classes.top}></div>
      <div className={classes.bottom}></div>
    </div>
  );
};

type WS_MSG =
  | {
      msg: "SHINY_READY";
      payload: string;
    }
  | { msg: "SHINY_LOGS"; payload: string[] };

function useCommunicateWithWebsocket() {
  const [appLoc, setAppLoc] = React.useState<string | null>(null);
  const [appLogs, setAppLogs] = React.useState<string[]>([]);

  const updateLogs = React.useCallback((new_logs: string[]) => {
    console.log("Updating logs with new logs", new_logs);
    setAppLogs((logs) => [...logs, ...new_logs]);
  }, []);

  React.useEffect(() => {
    if (!document.location.host) return;

    // const websocket_location = `ws://${document.location.host}`;
    const websocket_location = `ws://localhost:8888`;

    console.log("Attempting to connect to websocket at " + websocket_location);
    const ws = new WebSocket(websocket_location);

    ws.onopen = (event) => {
      console.log("Websocket successfully opened with httpuv");
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
          updateLogs(msg_data.payload);
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
  }, [updateLogs]);

  return {
    appLoc,
    appLogs,
  };
}

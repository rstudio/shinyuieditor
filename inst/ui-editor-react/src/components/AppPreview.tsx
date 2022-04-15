import React from "react";

import { AiOutlineShrink } from "react-icons/ai";
import { FaExpand } from "react-icons/fa";
import { useGetRunningAppLocQuery } from "state/getInitialState";

import classes from "./AppPreview.module.css";
import Button from "./Inputs/Button";

export default function AppPreview() {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const { isLoading, error, data: appURL } = useGetRunningAppLocQuery("");

  const websocketMsg = useCommunicateWithWebsocket();

  if (error) {
    console.error("Problem in retreiving running app location", error);
  }
  if (appURL === "no-preview") {
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
              {error ? (
                <FakeDashboard />
              ) : (
                <iframe
                  className={classes.previewFrame}
                  src={appURL}
                  title="Application Preview"
                />
              )}
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

function useCommunicateWithWebsocket() {
  const [lastMsg, setLastMsg] = React.useState("Waiting for websocket...");

  React.useEffect(() => {
    if (!document.location.host) return;

    // const websocket_location = `ws://${document.location.host}`;
    const websocket_location = `ws://localhost:8888`;

    console.log("Attempting to connect to websocket at " + websocket_location);
    const ws = new WebSocket(websocket_location);

    ws.onopen = (event) => {
      console.log("Websocket successfully opened with httpuv");
      ws.send("Hi from AppPreview");
      setLastMsg("Connected to websocket!");
    };

    return () => {
      ws.close();
    };
  }, []);

  return lastMsg;
}

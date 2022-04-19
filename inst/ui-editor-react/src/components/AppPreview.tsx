import React from "react";

import { AiOutlineShrink } from "react-icons/ai";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaExpand } from "react-icons/fa";
import { GrClear } from "react-icons/gr";

import classes from "./AppPreview.module.css";
import Button from "./Inputs/Button";

// This could be retreived from the css programatically. The 16*2 accounts for
// the padding
const properties_bar_w_px = 275 - 16 * 2;

export default function AppPreview() {
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const { appLoc, appLogs, clearLogs } = useCommunicateWithWebsocket();
  const { logsExpanded, toggleLogExpansion, unseenLogs } =
    useExpandableLogs(appLogs);
  const previewScale = usePreviewScale();

  const isLoading = appLoc === null;

  if (appLoc === "no-preview") {
    return null;
  }
  return (
    <>
      <h3>App Preview</h3>
      <div
        className={
          classes.appViewerHolder +
          " " +
          (isFullScreen ? classes.fullScreen : classes.previewMode)
        }
        style={
          {
            "--app-scale-amnt": previewScale,
          } as React.CSSProperties
        }
      >
        {isLoading ? (
          <h2>Loading app preview...</h2>
        ) : (
          <>
            <div className={classes.controls}>
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
            </div>

            <div className={classes.container}>
              <iframe
                className={classes.previewFrame}
                src={appLoc}
                title="Application Preview"
              />
            </div>
            <div
              className={
                classes.logs + (logsExpanded ? " " + classes.expandedLogs : "")
              }
            >
              <div className={classes.logsHeader}>
                <Button
                  title={logsExpanded ? "hide logs" : "show logs"}
                  onClick={toggleLogExpansion}
                >
                  {unseenLogs ? "*" : ""}
                  {logsExpanded ? "hide logs" : "show logs"}
                  {logsExpanded ? <BsChevronDown /> : <BsChevronUp />}
                </Button>
              </div>
              <div className={classes.logsContents}>
                <Button
                  variant="icon"
                  title="clear logs"
                  className={classes.clearLogs}
                  onClick={clearLogs}
                >
                  <GrClear />
                </Button>
                {appLogs.join("\n")}
              </div>
            </div>
            {/* {error ? (
                <FakeDashboard />
              ) : (
              )} */}
          </>
        )}
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

type AppLogs = string[];
function useExpandableLogs(appLogs: AppLogs) {
  const [logsExpanded, setLogsExpanded] = React.useState(false);
  const [unseenLogs, setUnseenLogs] = React.useState(false);
  const [logsLastExpanded, setLogsLastExpanded] = React.useState<Date | null>(
    null
  );
  const [logsLastReceived, setLogsLastReceived] = React.useState<Date>(
    new Date()
  );
  const toggleLogExpansion = React.useCallback(() => {
    if (logsExpanded) {
      setLogsExpanded(false);
      setLogsLastExpanded(new Date());
      return;
    }
    setLogsExpanded(true);
    setUnseenLogs(false);
  }, [logsExpanded]);

  React.useEffect(() => {
    setLogsLastReceived(new Date());
  }, [appLogs]);

  React.useEffect(() => {
    if (logsExpanded || appLogs.length === 0) {
      setUnseenLogs(false);
      return;
    }

    if (logsLastExpanded === null || logsLastExpanded < logsLastReceived) {
      setUnseenLogs(true);
      return;
    }
  }, [appLogs.length, logsExpanded, logsLastExpanded, logsLastReceived]);

  return { logsExpanded, toggleLogExpansion, unseenLogs };
}

function useCommunicateWithWebsocket() {
  const [appLoc, setAppLoc] = React.useState<string | null>(null);
  const [appLogs, setAppLogs] = React.useState<AppLogs>([]);

  const clearLogs = React.useCallback(() => {
    setAppLogs([]);
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

  return {
    appLoc,
    appLogs,
    clearLogs,
  };
}

function useGetPageSize() {
  const [pageSize, setPageSize] = React.useState<{
    width: number;
    height: number;
  } | null>(null);

  React.useEffect(() => {
    if (!window) {
      return;
    }

    const { innerWidth, innerHeight } = window;
    setPageSize({
      width: innerWidth,
      height: innerHeight,
    });
  }, []);

  return pageSize;
}

function usePreviewScale() {
  const [previewScale, setPreviewScale] = React.useState(0.2);

  const pageSize = useGetPageSize();
  React.useEffect(() => {
    if (!pageSize) return;
    setPreviewScale(properties_bar_w_px / pageSize.width);
  }, [pageSize]);

  return previewScale;
}

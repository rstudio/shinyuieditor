import React from "react";

import { AiOutlineShrink } from "react-icons/ai";
import { FaExpand } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";

import Button from "../Inputs/Button";

import classes from "./AppPreview.module.css";
import FakeDashboard from "./FakeDashboard";
import { LogsViewer } from "./LogsViewer";
import { useCommunicateWithWebsocket } from "./useCommunicateWithWebsocket";

// This could be retreived from the css programatically. The 16*2 accounts for
// the padding
const properties_bar_w_px = 275 - 16 * 2;

export default function AppPreview() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const { status, appLoc, appLogs, clearLogs, restartApp } =
    useCommunicateWithWebsocket();

  const previewScale = usePreviewScale();

  React.useEffect(() => {
    console.log("Status", status);
  }, [status]);

  const reloadApp = React.useCallback(() => {
    if (!iframeRef.current || !appLoc) return;
    iframeRef.current.src = appLoc;
  }, [appLoc]);

  if (appLoc === "no-preview") {
    return null;
  }
  return (
    <>
      <h3>App Preview</h3>
      <div
        className={classes.appViewerHolder}
        data-expanded={isFullScreen}
        style={
          {
            "--app-scale-amnt": previewScale,
          } as React.CSSProperties
        }
      >
        {status === "loading" ? (
          <h2>Loading app preview...</h2>
        ) : (
          <>
            <Button
              variant="icon"
              className={classes.restartButton}
              title="Restart app session"
              onClick={() => {
                reloadApp();
              }}
            >
              <VscDebugRestart />
            </Button>
            <div className={classes.appContainer}>
              {status === "error" ? (
                <FakeDashboard />
              ) : status === "crashed" ? (
                <>
                  <p>App preview crashed. Try and restart?</p>
                  <Button>Restart app preview</Button>
                </>
              ) : (
                <iframe
                  className={classes.previewFrame}
                  src={appLoc}
                  title="Application Preview"
                  ref={iframeRef}
                />
              )}
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
            <LogsViewer appLogs={appLogs} clearLogs={clearLogs} />
          </>
        )}
      </div>
    </>
  );
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

import React from "react";

import { PROPERTIES_PANEL_WIDTH_PX } from "EditorContainer";
import { AiOutlineShrink } from "react-icons/ai";
import { FaExpand } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";

import Button from "../Inputs/Button";

import classes from "./AppPreview.module.css";
import FakeDashboard from "./FakeDashboard";
import { LogsViewer } from "./LogsViewer";
import { useCommunicateWithWebsocket } from "./useCommunicateWithWebsocket";

export default function AppPreview() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const toggleFullscreen = React.useCallback(() => {
    setIsFullScreen((currentlyFullScreen) => !currentlyFullScreen);
  }, []);

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
          <LoadingMessage />
        ) : status === "crashed" ? (
          <RestartPrompt onClick={restartApp} />
        ) : (
          <>
            <Button
              variant={["transparent", "icon"]}
              className={classes.reloadButton}
              title="Reload app session"
              onClick={reloadApp}
            >
              <VscDebugRestart />
            </Button>
            <div className={classes.appContainer}>
              {status === "error" ? (
                <FakeDashboard />
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
                onClick={toggleFullscreen}
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

function RestartPrompt({ onClick }: { onClick: () => void }) {
  return (
    <div className={classes.appContainer}>
      <p>
        App preview crashed.<br></br> Try and restart?
      </p>
      <Button
        className={classes.restartButton}
        title="Restart app preview"
        onClick={onClick}
      >
        Restart app preview <VscDebugRestart />
      </Button>
    </div>
  );
}

function LoadingMessage() {
  return (
    <div className={classes.loadingMessage}>
      <h2>Loading app preview...</h2>
    </div>
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

function getPreviewScale(page_width_px: number) {
  // This could be retreived from the css programatically. The 16 is added for
  // some reason I can't figure out but is needed.
  return (PROPERTIES_PANEL_WIDTH_PX - 30 * 2 + 16) / page_width_px;
}

function usePreviewScale() {
  const [previewScale, setPreviewScale] = React.useState(0.2);

  const pageSize = useGetPageSize();
  React.useEffect(() => {
    if (!pageSize) return;
    setPreviewScale(getPreviewScale(pageSize.width));
  }, [pageSize]);

  return previewScale;
}

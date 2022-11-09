import React from "react";

import { PanelHeader } from "EditorSkeleton/EditorSkeleton";
import { SHOW_FAKE_PREVIEW } from "env_variables";
import { AiOutlineShrink } from "react-icons/ai";
import { FaExpand } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";

import Button from "../Inputs/Button/Button";

import classes from "./AppPreview.module.css";
import FakeDashboard from "./FakeDashboard";
import { LogsViewer } from "./LogsViewer";
import { useCommunicateWithBackend } from "./useCommunicateWithBackend";
import { usePreviewScale } from "./usePreviewScale";

export const PREVIEW_INSET_HORIZONTAL_PX = 16;
export const EXPANDED_INSET_HORIZONTAL_PX = 55;

export default function AppPreview() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const toggleFullscreen = React.useCallback(() => {
    setIsFullScreen((currentlyFullScreen) => !currentlyFullScreen);
  }, []);

  const { status, appLoc, appLogs, clearLogs, restartApp } =
    useCommunicateWithBackend();

  const previewScale = usePreviewScale();

  const reloadApp = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!iframeRef.current || !appLoc) return;
      iframeRef.current.src = appLoc;

      spinReloadButton(e.currentTarget);
    },
    [appLoc]
  );

  // This is a custom environment variable that is set to "True" in the
  // development testing so we can see a fake app preview window. If we're not
  // in development mode we want to hide the preview window when there's no app
  // preview present to not confuse users

  if (status === "no-preview" && !SHOW_FAKE_PREVIEW) {
    return null;
  }

  return (
    <>
      <PanelHeader className={classes.title}>
        <Button
          variant={["transparent", "icon"]}
          className={classes.reloadButton}
          title="Reload app session"
          onClick={reloadApp}
        >
          <VscDebugRestart />
        </Button>
        App Preview
      </PanelHeader>

      <div
        className={classes.appViewerHolder}
        data-expanded={isFullScreen}
        style={
          {
            "--app-scale-amnt": previewScale,
            "--preview-inset-horizontal": `${PREVIEW_INSET_HORIZONTAL_PX}px`,
            "--expanded-inset-horizontal": `${EXPANDED_INSET_HORIZONTAL_PX}px`,
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
              {status === "no-preview" ? (
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

// Add a class to spin button to demonstrate something is happening. On
// animation finishing the class is removed so it can be retriggered
function spinReloadButton(buttonEl: HTMLButtonElement) {
  buttonEl.classList.add(classes.spin);
  buttonEl.addEventListener(
    "animationend",
    () => buttonEl.classList.remove(classes.spin),
    false
  );
}

import React from "react";

import { AiOutlineShrink } from "react-icons/ai";
import { FaExpand } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";

import { PanelHeader } from "../../EditorLayout/PanelHeader";
import { useLanguageMode } from "../../state/languageMode";
import { onMac } from "../../utils/onMac";
import Button from "../Inputs/Button/Button";
import { PopoverButton } from "../Inputs/PopoverButton";

import classes from "./AppPreview.module.css";
import { LogsViewer } from "./LogsViewer";
import { ShinyLivePreviewExperiment } from "./ShinyLivePreviewExperiment";
import { ShowAppText } from "./ShowAppText";
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [shinyLiveMode, setShinyLiveMode] = React.useState(false);

  const language = useLanguageMode();

  const { appLoc, errors, appLogs, clearLogs, restartApp } =
    useCommunicateWithBackend();

  const previewScale = usePreviewScale();

  const reloadApp = React.useCallback(
    (metaKey: boolean) => {
      if (!iframeRef.current || typeof appLoc === "string") return;
      if (metaKey) {
        restartApp();
      } else {
        iframeRef.current.src = appLoc.url;
      }
    },
    [appLoc, restartApp]
  );

  if (language === "PYTHON" && shinyLiveMode) {
    return <ShinyLivePreviewExperiment />;
  }

  // This is a custom environment variable that is set to "True" in the
  // development testing so we can see a fake app preview window. If we're not
  // in development mode we want to hide the preview window when there's no app
  // preview present to not confuse users
  if (appLoc === "HIDDEN") {
    return <ShowAppText />;
  }

  return (
    <>
      <PanelHeader className={classes.title}>
        <ReloadButton isExpandedMode={false} onClick={reloadApp} />
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
        {errors !== null ? (
          <div className={classes.appContainer}>
            <p>
              App preview crashed.<br></br> Try and restart?
            </p>
            <Button
              className={classes.restartButton}
              title="Restart app preview"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                spinReloadButton(e.currentTarget);
                restartApp();
              }}
            >
              Restart app preview <VscDebugRestart />
            </Button>
            {/* Experimental method to use ShinyLive in case of failure of local preview app */}
            {/* {language === "PYTHON" ? (
              <PopoverButton
                popoverContent="Open in experimental ShinyLive Runtime"
                placement="left"
                onClick={() => setShinyLiveMode(true)}
              >
                Try ShinyLive Runtime
              </PopoverButton>
            ) : null} */}
          </div>
        ) : (
          <>
            <ReloadButton isExpandedMode={true} onClick={reloadApp} />
            <div className={classes.appContainer}>
              {appLoc === "LOADING" ? (
                <LoadingMessage />
              ) : (
                <iframe
                  className={classes.previewFrame}
                  src={appLoc.url}
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

export function ReloadButton({
  isExpandedMode,
  onClick,
}: {
  isExpandedMode: boolean;
  onClick: (metaKey: boolean) => void;
}) {
  return (
    <div className={classes.reloadButtonContainer}>
      <PopoverButton
        popoverContent={`Reload app session (hold ${getMetaKeyOnClient()} to restart app server also)`}
        className={classes.reloadButton}
        variant="transparent"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          spinReloadButton(e.currentTarget);
          onClick(e.metaKey);
        }}
        placement={isExpandedMode ? "right" : "top"}
      >
        <VscDebugRestart />
      </PopoverButton>
    </div>
  );
}

export function LoadingMessage() {
  return (
    <div className={classes.loadingMessage}>
      <h2>Loading app preview...</h2>
    </div>
  );
}

// Add a class to spin button to demonstrate something is happening. On
// animation finishing the class is removed so it can be retriggered
function spinReloadButton(buttonEl: HTMLButtonElement) {
  const reloadIcon = buttonEl.querySelector("svg");
  reloadIcon?.classList.add(classes.spin);
  buttonEl.addEventListener(
    "animationend",
    () => reloadIcon?.classList.remove(classes.spin),
    false
  );
}

function getMetaKeyOnClient(): "\u2318" | "Alt" {
  return onMac() ? "\u2318" : "Alt";
}

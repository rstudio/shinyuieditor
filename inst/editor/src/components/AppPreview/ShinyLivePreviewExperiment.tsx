import React from "react";

import debounce from "just-debounce-it";
import { AiOutlineShrink } from "react-icons/ai";
import { FaExpand } from "react-icons/fa";
import { generate_full_app_script } from "ui-node-definitions/src/code_generation/generate_full_app_script";

import { PanelHeader } from "../../EditorLayout/PanelHeader";
import type { MainStateOption } from "../../state/app_info";
import { useCurrentAppInfo } from "../../state/app_info";
import Button from "../Inputs/Button/Button";

import {
  EXPANDED_INSET_HORIZONTAL_PX,
  PREVIEW_INSET_HORIZONTAL_PX,
  ReloadButton,
} from ".";

import classes from "./AppPreview.module.css";
import { python_app_to_shinylive_url } from "./python_app_to_shinylive_url";
import { usePreviewScale } from "./usePreviewScale";

function useLazyReloadShinyLivePreview() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const appState = useCurrentAppInfo();
  const most_recent_url = React.useRef<string>("");

  React.useEffect(() => {
    most_recent_url.current = AppStateToShinyLiveUrl(appState);
  }, [appState]);

  /**
   * Reload app and debounce it so we don't reload too often
   */
  const reloadApp = React.useMemo(() => {
    return debounce(() => {
      if (!iframeRef.current) return;
      // Clear the iframe src to force a reload
      iframeRef.current.src = "";

      // Wait a tiny bit then fill in the correct url
      setTimeout(() => {
        if (!iframeRef.current || !most_recent_url.current) return;
        iframeRef.current.src = most_recent_url.current;
      }, 10);
    }, 200);
  }, []);

  /**
   * Whenever we get a new appURL, reload the app to reflect the changes
   */
  React.useEffect(reloadApp, [appState, reloadApp]);

  return { iframeRef, reloadApp };
}

export function ShinyLivePreviewExperiment() {
  const { iframeRef, reloadApp } = useLazyReloadShinyLivePreview();
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const previewScale = usePreviewScale();

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
        <ReloadButton isExpandedMode={true} onClick={reloadApp} />
        <div className={classes.appContainer}>
          <iframe
            className={classes.previewFrame}
            src={""}
            title="Application Preview"
            ref={iframeRef}
          />
          <Button
            variant="icon"
            className={classes.expandButton}
            title={isFullScreen ? "Shrink app preview" : "Expand app preview"}
            onClick={() => setIsFullScreen((prev) => !prev)}
          >
            {isFullScreen ? <AiOutlineShrink /> : <FaExpand />}
          </Button>
        </div>
      </div>
    </>
  );
}

function AppStateToShinyLiveUrl(state: MainStateOption): string {
  if (state.mode !== "MAIN") {
    return "";
  }

  const script_text = generate_full_app_script(state, {
    include_info: false,
    language: "PYTHON",
  });

  const url = python_app_to_shinylive_url(
    script_text.app_type === "SINGLE-FILE" ? script_text.app : "",
    "app"
  );

  return url;
}

import React from "react";

import { AiOutlineShrink } from "react-icons/ai";
import { FaExpand } from "react-icons/fa";
import { useGetRunningAppLocQuery } from "state/getInitialState";

import classes from "./AppPreview.module.css";
import Button from "./Inputs/Button";

export default function AppPreview() {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const { isLoading, error, data: appURL } = useGetRunningAppLocQuery("");

  if (error) {
    console.error("Problem in retreiving running app location", error);
  }
  if (appURL === "no-preview") {
    return null;
  }

  return (
    <>
      <h3>App Preview</h3>
      <div className={classes.appViewerHolder + " app-preview"}>
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

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
          ) : error ? (
            <>
              <h2 className={classes.error}>Error loading app preview.</h2>
              <p>Check app server code to make sure it's valid.</p>
            </>
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
                src={appURL}
                title="Application Preview"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

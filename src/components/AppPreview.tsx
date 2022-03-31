import React from "react";

import { AiOutlineShrink } from "react-icons/ai";
import { FaExpand } from "react-icons/fa";
import { useGetRunningAppLocQuery } from "state/getInitialState";

import classes from "./AppPreview.module.css";
import Button from "./Inputs/Button";

export default function AppPreview() {
  const { isLoading, error, data } = useGetRunningAppLocQuery("");

  if (isLoading) {
    console.log("Requesting running app location...");
  }
  if (error) {
    console.error("Problem in retreiving running app location", error);
  }

  const [isFullScreen, setIsFullScreen] = React.useState(false);

  return (
    <div
      className={
        classes.container +
        " " +
        (isFullScreen ? classes.fullScreen : classes.previewMode)
      }
    >
      <Button
        variant="icon"
        className={classes.expandButton}
        title={isFullScreen ? "Shrink app preview" : "Expand app preview"}
        onClick={() =>
          setIsFullScreen((currentlyFullScreen) => !currentlyFullScreen)
        }
      >
        {isFullScreen ? <AiOutlineShrink /> : <FaExpand />}
      </Button>
      <iframe
        className={classes.previewFrame}
        src={data}
        title="Application Preview"
      />
    </div>
  );
}

import React from "react";

import { AiOutlineShrink } from "react-icons/ai";
import { FaExpand } from "react-icons/fa";

import classes from "./AppPreview.module.css";
import Button from "./Inputs/Button";

export default function AppPreview({ url }: { url: string }) {
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
        src={url}
        title="Application Preview"
      />
    </div>
  );
}
